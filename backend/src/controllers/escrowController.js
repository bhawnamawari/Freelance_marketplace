const Task = require('../models/Task');
const Milestone = require('../models/Milestone');
const EscrowTransaction = require('../models/EscrowTransaction');
const escrowService = require('../services/escrowService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const { notify } = require('../services/notificationService');

// 1. POST /api/escrow/tasks/:taskId/milestones - create milestone plan (poster, once matched)
exports.createMilestonePlan = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.taskId);
  if (!task) return next(new AppError('Task not found', 404));
  if (String(task.poster) !== String(req.user._id)) return next(new AppError('Not authorized', 403));
  if (!['matched', 'open'].includes(task.status)) {
    return next(new AppError('Milestones can only be planned before work starts', 400));
  }

  const { milestones } = req.body; // [{ title, description, amount, dueDate }]
  if (!Array.isArray(milestones) || milestones.length === 0) {
    return next(new AppError('Provide at least one milestone', 400));
  }

  const total = milestones.reduce((sum, m) => sum + Number(m.amount), 0);
  if (Math.abs(total - task.budget) > 0.01) {
    return next(new AppError(`Milestone amounts must sum to the task budget ($${task.budget})`, 400));
  }

  const existingCount = await Milestone.countDocuments({ task: task._id });
  const created = await Milestone.insertMany(
    milestones.map((m, idx) => ({
      task: task._id,
      title: m.title,
      description: m.description || '',
      amount: m.amount,
      dueDate: m.dueDate,
      order: existingCount + idx + 1,
    }))
  );

  success(res, 201, 'Milestone plan created', { milestones: created });
});

// 2. GET /api/escrow/tasks/:taskId/milestones - list milestones for a task
exports.listMilestones = catchAsync(async (req, res) => {
  const milestones = await Milestone.find({ task: req.params.taskId }).sort({ order: 1 });
  success(res, 200, 'Milestones fetched', { milestones });
});

// 3. POST /api/escrow/milestones/:milestoneId/fund - poster funds escrow for a milestone
exports.fundMilestone = catchAsync(async (req, res, next) => {
  const { milestone, transaction } = await escrowService.fundMilestone({
    milestoneId: req.params.milestoneId,
    posterId: req.user._id,
  });

  const task = await Task.findById(milestone.task);
  await notify({
    userId: task.assignedFreelancer,
    type: 'milestone_funded',
    title: `Milestone "${milestone.title}" funded`,
    body: `$${milestone.amount} is now held in escrow. You can start work.`,
    relatedTask: task._id,
  });

  success(res, 200, 'Milestone funded successfully', { milestone, transaction });
});

// 4. POST /api/escrow/milestones/:milestoneId/submit - freelancer marks milestone delivered
exports.submitMilestone = catchAsync(async (req, res, next) => {
  const milestone = await Milestone.findById(req.params.milestoneId).populate('task');
  if (!milestone) return next(new AppError('Milestone not found', 404));

  const task = milestone.task;
  if (String(task.assignedFreelancer) !== String(req.user._id)) {
    return next(new AppError('Only the assigned freelancer can submit this milestone', 403));
  }
  if (milestone.status !== 'funded') {
    return next(new AppError('Milestone must be funded before it can be submitted', 400));
  }

  milestone.status = 'submitted';
  milestone.submittedAt = new Date();
  if (req.body.deliverableFileIds) milestone.deliverableFiles = req.body.deliverableFileIds;
  await milestone.save();

  task.status = 'in_review';
  await task.save();

  await notify({
    userId: task.poster,
    type: 'milestone_submitted',
    title: `Milestone "${milestone.title}" delivered`,
    body: 'Review the deliverable and approve to release payment.',
    relatedTask: task._id,
  });

  success(res, 200, 'Milestone submitted for review', { milestone });
});

// 5. POST /api/escrow/milestones/:milestoneId/release - poster approves & releases payment
exports.releaseMilestone = catchAsync(async (req, res, next) => {
  const { milestone, transaction } = await escrowService.releaseMilestone({
    milestoneId: req.params.milestoneId,
    posterId: req.user._id,
  });

  const task = await Task.findById(milestone.task);
  await notify({
    userId: task.assignedFreelancer,
    type: 'payment_released',
    title: `Payment released for "${milestone.title}"`,
    body: `$${transaction.netAmount} has been added to your wallet.`,
    relatedTask: task._id,
  });

  success(res, 200, 'Milestone approved and payment released', { milestone, transaction });
});

// 6. POST /api/escrow/milestones/:milestoneId/refund - refund a funded milestone (cancellation)
exports.refundMilestone = catchAsync(async (req, res, next) => {
  const milestone = await Milestone.findById(req.params.milestoneId).populate('task');
  if (!milestone) return next(new AppError('Milestone not found', 404));
  const task = milestone.task;

  const isPoster = String(task.poster) === String(req.user._id);
  const isAdmin = req.user.role === 'admin';
  if (!isPoster && !isAdmin) return next(new AppError('Not authorized', 403));

  const result = await escrowService.refundMilestone({
    milestoneId: req.params.milestoneId,
    initiatedBy: req.user.role,
    note: req.body.note,
  });

  success(res, 200, 'Milestone refunded to poster', result);
});

// 7. GET /api/escrow/tasks/:taskId/transactions - full transaction history for a task
exports.getTransactionHistory = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.taskId);
  if (!task) return next(new AppError('Task not found', 404));

  const isParticipant =
    String(task.poster) === String(req.user._id) || String(task.assignedFreelancer) === String(req.user._id);
  if (!isParticipant && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to view this transaction history', 403));
  }

  const transactions = await EscrowTransaction.find({ task: task._id })
    .populate('milestone', 'title order')
    .sort({ createdAt: -1 });

  success(res, 200, 'Transaction history fetched', { transactions });
});
