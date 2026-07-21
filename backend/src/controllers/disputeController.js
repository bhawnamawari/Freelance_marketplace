const Task = require('../models/Task');
const Dispute = require('../models/Dispute');
const escrowService = require('../services/escrowService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const { notify } = require('../services/notificationService');

// 1. POST /api/disputes/tasks/:taskId - raise a dispute
exports.raiseDispute = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.taskId);
  if (!task) return next(new AppError('Task not found', 404));

  const isPoster = String(task.poster) === String(req.user._id);
  const isFreelancer = String(task.assignedFreelancer) === String(req.user._id);
  if (!isPoster && !isFreelancer) return next(new AppError('Not a participant of this task', 403));

  const { reason, description, milestoneId, evidenceFileIds, evidenceMessageIds } = req.body;
  if (!reason || !description) return next(new AppError('reason and description are required', 400));

  const against = isPoster ? task.assignedFreelancer : task.poster;

  const dispute = await Dispute.create({
    task: task._id,
    milestone: milestoneId || null,
    raisedBy: req.user._id,
    against,
    reason,
    description,
    evidenceFiles: evidenceFileIds || [],
    evidenceMessages: evidenceMessageIds || [],
  });

  task.status = 'disputed';
  await task.save();

  await notify({
    userId: against,
    type: 'dispute_opened',
    title: `A dispute was raised on "${task.title}"`,
    body: reason,
    relatedTask: task._id,
  });

  success(res, 201, 'Dispute raised', { dispute });
});

// 2. POST /api/disputes/:disputeId/evidence - attach additional evidence (chat logs / files)
exports.attachEvidence = catchAsync(async (req, res, next) => {
  const dispute = await Dispute.findById(req.params.disputeId);
  if (!dispute) return next(new AppError('Dispute not found', 404));

  const isParty =
    String(dispute.raisedBy) === String(req.user._id) || String(dispute.against) === String(req.user._id);
  if (!isParty) return next(new AppError('Not authorized', 403));
  if (dispute.status === 'resolved' || dispute.status === 'closed') {
    return next(new AppError('Cannot add evidence to a closed dispute', 400));
  }

  const { evidenceFileIds, evidenceMessageIds } = req.body;
  if (evidenceFileIds) dispute.evidenceFiles.push(...evidenceFileIds);
  if (evidenceMessageIds) dispute.evidenceMessages.push(...evidenceMessageIds);
  await dispute.save();

  success(res, 200, 'Evidence attached', { dispute });
});

// 3. GET /api/disputes/:disputeId - admin (or party) views full dispute detail
exports.getDispute = catchAsync(async (req, res, next) => {
  const dispute = await Dispute.findById(req.params.disputeId)
    .populate('task')
    .populate('raisedBy', 'name email')
    .populate('against', 'name email')
    .populate('evidenceFiles')
    .populate({ path: 'evidenceMessages', populate: { path: 'sender', select: 'name' } });

  if (!dispute) return next(new AppError('Dispute not found', 404));

  const isParty =
    String(dispute.raisedBy._id) === String(req.user._id) || String(dispute.against._id) === String(req.user._id);
  if (!isParty && req.user.role !== 'admin') return next(new AppError('Not authorized', 403));

  success(res, 200, 'Dispute fetched', { dispute });
});

// 3b. GET /api/disputes - admin lists all disputes (queue view)
exports.listDisputes = catchAsync(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const disputes = await Dispute.find(filter)
    .populate('task', 'title budget')
    .populate('raisedBy', 'name')
    .populate('against', 'name')
    .sort({ createdAt: -1 });
  success(res, 200, 'Disputes fetched', { disputes });
});

// 4. PATCH /api/disputes/:disputeId/resolve - admin resolves the dispute
exports.resolveDispute = catchAsync(async (req, res, next) => {
  const dispute = await Dispute.findById(req.params.disputeId);
  if (!dispute) return next(new AppError('Dispute not found', 404));
  if (dispute.status === 'resolved' || dispute.status === 'closed') {
    return next(new AppError('Dispute already resolved', 400));
  }

  const { decision, splitPercentToFreelancer, adminNote } = req.body;
  if (!['refund_poster', 'release_freelancer', 'partial_split', 'no_action'].includes(decision)) {
    return next(new AppError('Invalid decision value', 400));
  }

  const taskForDispute = await Task.findById(dispute.task);

  if (dispute.milestone) {
    if (decision === 'refund_poster') {
      await escrowService.refundMilestone({
        milestoneId: dispute.milestone,
        initiatedBy: 'admin',
        note: `Dispute resolution: ${adminNote || ''}`,
      });
    } else if (decision === 'release_freelancer') {
      const Milestone = require('../models/Milestone');
      const milestone = await Milestone.findById(dispute.milestone);
      if (milestone.status === 'funded') {
        milestone.status = 'submitted';
        await milestone.save();
      }
      await escrowService.releaseMilestone({
        milestoneId: dispute.milestone,
        posterId: taskForDispute.poster,
      });
    } else if (decision === 'partial_split') {
      if (splitPercentToFreelancer === undefined) {
        return next(new AppError('splitPercentToFreelancer is required for a partial split', 400));
      }
      await escrowService.partialReleaseMilestone({
        milestoneId: dispute.milestone,
        freelancerPercent: splitPercentToFreelancer,
        adminId: req.user._id,
      });
    }
  }

  dispute.status = 'resolved';
  dispute.resolution = {
    decision,
    splitPercentToFreelancer,
    adminNote,
    resolvedBy: req.user._id,
    resolvedAt: new Date(),
  };
  await dispute.save();

  if (taskForDispute && taskForDispute.status === 'disputed') {
    taskForDispute.status = 'in_progress';
    await taskForDispute.save();
  }

  await notify({
    userId: dispute.raisedBy,
    type: 'dispute_resolved',
    title: 'Your dispute has been resolved',
    body: `Decision: ${decision}`,
    relatedTask: dispute.task,
  });
  await notify({
    userId: dispute.against,
    type: 'dispute_resolved',
    title: 'A dispute involving you has been resolved',
    body: `Decision: ${decision}`,
    relatedTask: dispute.task,
  });

  success(res, 200, 'Dispute resolved', { dispute });
});

// 5. PATCH /api/disputes/:disputeId/close - close a dispute without financial action
exports.closeDispute = catchAsync(async (req, res, next) => {
  const dispute = await Dispute.findById(req.params.disputeId);
  if (!dispute) return next(new AppError('Dispute not found', 404));

  dispute.status = 'closed';
  await dispute.save();
  success(res, 200, 'Dispute closed', { dispute });
});
