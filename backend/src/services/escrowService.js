const EscrowTransaction = require('../models/EscrowTransaction');
const Milestone = require('../models/Milestone');
const Task = require('../models/Task');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const { v4: uuidv4 } = require('uuid');

const COMMISSION_PERCENT = Number(process.env.PLATFORM_COMMISSION_PERCENT || 10);

/**
 * Simulates calling a real payment gateway (Stripe/Razorpay) in test mode.
 * In production this would be an actual API call; here it's deterministic
 * so the whole escrow flow is testable without external credentials.
 */
function simulateGatewayCall() {
  return { success: true, reference: `SIM-${uuidv4()}` };
}

/**
 * Poster funds a milestone. Money is "held" by the platform (represented by
 * an EscrowTransaction of type 'fund' with status success) until released.
 */
async function fundMilestone({ milestoneId, posterId }) {
  const milestone = await Milestone.findById(milestoneId).populate('task');
  if (!milestone) throw new AppError('Milestone not found', 404);

  const task = milestone.task;
  if (String(task.poster) !== String(posterId)) {
    throw new AppError('Only the task poster can fund this milestone', 403);
  }
  if (milestone.status !== 'pending') {
    throw new AppError(`Milestone cannot be funded from status "${milestone.status}"`, 400);
  }
  if (!task.assignedFreelancer) {
    throw new AppError('Task has no assigned freelancer yet', 400);
  }

  const gatewayResult = simulateGatewayCall();
  if (!gatewayResult.success) throw new AppError('Payment gateway declined the charge', 402);

  const txn = await EscrowTransaction.create({
    task: task._id,
    milestone: milestone._id,
    poster: posterId,
    freelancer: task.assignedFreelancer,
    type: 'fund',
    amount: milestone.amount,
    status: 'success',
    gatewayReference: gatewayResult.reference,
    notes: `Escrow funded for milestone "${milestone.title}"`,
  });

  milestone.status = 'funded';
  await milestone.save();

  if (task.status === 'matched') {
    task.status = 'in_progress';
    await task.save();
  }

  return { milestone, transaction: txn };
}

/**
 * Poster approves a submitted milestone -> funds released to freelancer wallet,
 * minus platform commission.
 */
async function releaseMilestone({ milestoneId, posterId }) {
  const milestone = await Milestone.findById(milestoneId).populate('task');
  if (!milestone) throw new AppError('Milestone not found', 404);

  const task = milestone.task;
  if (String(task.poster) !== String(posterId)) {
    throw new AppError('Only the task poster can release this milestone', 403);
  }
  if (milestone.status !== 'submitted') {
    throw new AppError('Milestone must be in "submitted" status to release funds', 400);
  }

  const commission = Math.round((milestone.amount * COMMISSION_PERCENT) / 100 * 100) / 100;
  const netAmount = Math.round((milestone.amount - commission) * 100) / 100;

  const gatewayResult = simulateGatewayCall();

  const txn = await EscrowTransaction.create({
    task: task._id,
    milestone: milestone._id,
    poster: posterId,
    freelancer: task.assignedFreelancer,
    type: 'release',
    amount: milestone.amount,
    commission,
    netAmount,
    status: 'success',
    gatewayReference: gatewayResult.reference,
    notes: `Released for milestone "${milestone.title}"`,
  });

  milestone.status = 'released';
  milestone.approvedAt = new Date();
  milestone.releasedAt = new Date();
  await milestone.save();

  await User.findByIdAndUpdate(task.assignedFreelancer, {
    $inc: { walletBalance: netAmount },
  });

  // If this was the last milestone, mark task completed
  const remaining = await Milestone.countDocuments({
    task: task._id,
    status: { $nin: ['released'] },
  });
  if (remaining === 0) {
    task.status = 'completed';
    await User.findByIdAndUpdate(task.assignedFreelancer, { $inc: { completedTasks: 1 } });
  } else {
    task.status = 'in_progress';
  }
  await task.save();

  return { milestone, transaction: txn };
}

/**
 * Refunds a funded (but not yet released) milestone back to the poster —
 * used for cancellations or dispute resolutions in the poster's favor.
 */
async function refundMilestone({ milestoneId, initiatedBy, note }) {
  const milestone = await Milestone.findById(milestoneId).populate('task');
  if (!milestone) throw new AppError('Milestone not found', 404);
  if (!['funded', 'submitted'].includes(milestone.status)) {
    throw new AppError('Only funded or submitted milestones can be refunded', 400);
  }

  const task = milestone.task;
  const gatewayResult = simulateGatewayCall();

  const txn = await EscrowTransaction.create({
    task: task._id,
    milestone: milestone._id,
    poster: task.poster,
    freelancer: task.assignedFreelancer,
    type: 'refund',
    amount: milestone.amount,
    status: 'success',
    gatewayReference: gatewayResult.reference,
    notes: note || `Refunded by ${initiatedBy}`,
  });

  milestone.status = 'pending';
  await milestone.save();

  return { milestone, transaction: txn };
}

/**
 * Partial split used by admin dispute resolution: portion goes to freelancer
 * wallet, remainder is refunded to poster.
 */
async function partialReleaseMilestone({ milestoneId, freelancerPercent, adminId }) {
  const milestone = await Milestone.findById(milestoneId).populate('task');
  if (!milestone) throw new AppError('Milestone not found', 404);
  if (!['funded', 'submitted'].includes(milestone.status)) {
    throw new AppError('Milestone must be funded or submitted to split', 400);
  }

  const task = milestone.task;
  const freelancerAmount = Math.round((milestone.amount * freelancerPercent) / 100 * 100) / 100;
  const commission = Math.round((freelancerAmount * COMMISSION_PERCENT) / 100 * 100) / 100;
  const netToFreelancer = Math.round((freelancerAmount - commission) * 100) / 100;
  const refundToPoster = Math.round((milestone.amount - freelancerAmount) * 100) / 100;

  const gatewayResult = simulateGatewayCall();

  const txn = await EscrowTransaction.create({
    task: task._id,
    milestone: milestone._id,
    poster: task.poster,
    freelancer: task.assignedFreelancer,
    type: 'partial_release',
    amount: milestone.amount,
    commission,
    netAmount: netToFreelancer,
    status: 'success',
    gatewayReference: gatewayResult.reference,
    notes: `Admin dispute split: ${freelancerPercent}% to freelancer ($${refundToPoster} refunded to poster). Resolved by admin ${adminId}`,
  });

  milestone.status = 'released';
  milestone.releasedAt = new Date();
  await milestone.save();

  await User.findByIdAndUpdate(task.assignedFreelancer, {
    $inc: { walletBalance: netToFreelancer },
  });

  return { milestone, transaction: txn };
}

module.exports = {
  fundMilestone,
  releaseMilestone,
  refundMilestone,
  partialReleaseMilestone,
  COMMISSION_PERCENT,
};
