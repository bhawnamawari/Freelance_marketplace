const Task = require('../models/Task');
const Message = require('../models/Message');
const FileAsset = require('../models/FileAsset');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const { notify } = require('../services/notificationService');

async function assertWorkspaceAccess(taskId, userId, userRole) {
  const task = await Task.findById(taskId);
  if (!task) throw new AppError('Task not found', 404);
  const isParticipant = String(task.poster) === String(userId) || String(task.assignedFreelancer) === String(userId);
  if (!isParticipant && userRole !== 'admin') {
    throw new AppError('Not authorized to access this task workspace', 403);
  }
  return task;
}

// 1. GET /api/workspace/tasks/:taskId/messages - fetch chat history (paginated)
exports.getMessages = catchAsync(async (req, res, next) => {
  await assertWorkspaceAccess(req.params.taskId, req.user._id, req.user.role);
  const { page = 1, limit = 50 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const messages = await Message.find({ task: req.params.taskId, deletedAt: null })
    .populate('sender', 'name avatarUrl')
    .populate('attachments')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  success(res, 200, 'Messages fetched', { messages: messages.reverse() });
});

// 2. POST /api/workspace/tasks/:taskId/messages - send a chat message
// (Also emitted over Socket.io in real time; this REST endpoint persists it
//  and works as a fallback / for clients not using websockets.)
exports.sendMessage = catchAsync(async (req, res, next) => {
  const task = await assertWorkspaceAccess(req.params.taskId, req.user._id, req.user.role);
  const { content, attachments } = req.body;
  if (!content && (!attachments || !attachments.length)) {
    return next(new AppError('Message must have content or an attachment', 400));
  }

  const message = await Message.create({
    task: task._id,
    sender: req.user._id,
    content: content || '',
    attachments: attachments || [],
    readBy: [req.user._id],
  });

  const recipientId =
    String(task.poster) === String(req.user._id) ? task.assignedFreelancer : task.poster;
  if (recipientId) {
    await notify({
      userId: recipientId,
      type: 'new_message',
      title: `New message in "${task.title}"`,
      body: content ? content.slice(0, 120) : 'Sent an attachment',
      relatedTask: task._id,
    });
  }

  const populated = await message.populate('sender', 'name avatarUrl');
  success(res, 201, 'Message sent', { message: populated });
});

// 3. PATCH /api/workspace/messages/:messageId/read - mark message(s) as read
exports.markMessageRead = catchAsync(async (req, res, next) => {
  const message = await Message.findById(req.params.messageId);
  if (!message) return next(new AppError('Message not found', 404));
  await assertWorkspaceAccess(message.task, req.user._id, req.user.role);

  if (!message.readBy.some((id) => String(id) === String(req.user._id))) {
    message.readBy.push(req.user._id);
    await message.save();
  }
  success(res, 200, 'Message marked as read', { message });
});

// 4. POST /api/workspace/tasks/:taskId/files - upload a file to the workspace
exports.uploadFile = catchAsync(async (req, res, next) => {
  const task = await assertWorkspaceAccess(req.params.taskId, req.user._id, req.user.role);
  if (!req.file) return next(new AppError('No file uploaded', 400));

  const { isDeliverable, milestoneId, previousVersionId } = req.body;
  let version = 1;
  if (previousVersionId) {
    const prev = await FileAsset.findById(previousVersionId);
    if (prev) version = prev.version + 1;
  }

  const fileAsset = await FileAsset.create({
    task: task._id,
    uploadedBy: req.user._id,
    originalName: req.file.originalname,
    storedPath: req.file.path,
    mimeType: req.file.mimetype,
    sizeBytes: req.file.size,
    isDeliverable: isDeliverable === 'true' || isDeliverable === true,
    milestone: milestoneId || null,
    version,
    previousVersion: previousVersionId || null,
  });

  success(res, 201, 'File uploaded to workspace', { file: fileAsset });
});

// 5. GET /api/workspace/tasks/:taskId/files - list all files in the workspace
exports.listFiles = catchAsync(async (req, res) => {
  await assertWorkspaceAccess(req.params.taskId, req.user._id, req.user.role);
  const { milestoneId, deliverablesOnly } = req.query;

  const filter = { task: req.params.taskId };
  if (milestoneId) filter.milestone = milestoneId;
  if (deliverablesOnly === 'true') filter.isDeliverable = true;

  const files = await FileAsset.find(filter).populate('uploadedBy', 'name').sort({ createdAt: -1 });
  success(res, 200, 'Files fetched', { files });
});

// 6. GET /api/workspace/files/:fileId/download - download a specific file
exports.downloadFile = catchAsync(async (req, res, next) => {
  const file = await FileAsset.findById(req.params.fileId);
  if (!file) return next(new AppError('File not found', 404));
  await assertWorkspaceAccess(file.task, req.user._id, req.user.role);

  res.download(file.storedPath, file.originalName);
});

// 7. PATCH /api/workspace/tasks/:taskId/archive - archive workspace on task completion
exports.archiveWorkspace = catchAsync(async (req, res, next) => {
  const task = await assertWorkspaceAccess(req.params.taskId, req.user._id, req.user.role);
  if (task.status !== 'completed') {
    return next(new AppError('Workspace can only be archived once the task is completed', 400));
  }

  await Message.create({
    task: task._id,
    sender: req.user._id,
    content: 'This task is complete. The workspace is now read-only.',
    isSystemMessage: true,
  });

  success(res, 200, 'Workspace archived (read-only)', { taskId: task._id, archived: true });
});
