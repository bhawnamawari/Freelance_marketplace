const User = require('../models/User');
const Category = require('../models/Category');
const Task = require('../models/Task');
const EscrowTransaction = require('../models/EscrowTransaction');
const Dispute = require('../models/Dispute');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const { notify } = require('../services/notificationService');

// 1. PATCH /api/admin/users/:id/status - ban or suspend a user
exports.updateUserStatus = catchAsync(async (req, res, next) => {
  const { status, reason } = req.body; // 'active' | 'suspended' | 'banned'
  if (!['active', 'suspended', 'banned'].includes(status)) {
    return next(new AppError('status must be active, suspended, or banned', 400));
  }

  const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!user) return next(new AppError('User not found', 404));

  await notify({
    userId: user._id,
    type: 'admin_alert',
    title: `Your account status changed to "${status}"`,
    body: reason || '',
  });

  success(res, 200, `User status updated to "${status}"`, { user: user.toSafeObject() });
});

// 2. GET /api/admin/categories & PATCH - manage categories
exports.manageCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) return next(new AppError('Category not found', 404));
  success(res, 200, 'Category updated', { category });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!category) return next(new AppError('Category not found', 404));
  success(res, 200, 'Category deactivated', { category });
});

// 3. GET /api/admin/analytics - platform-wide analytics
exports.getAnalytics = catchAsync(async (req, res) => {
  const [
    totalUsers,
    totalPosters,
    totalFreelancers,
    totalTasks,
    openTasks,
    completedTasks,
    disputedTasks,
    totalEscrowVolume,
    openDisputes,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'poster' }),
    User.countDocuments({ role: 'freelancer' }),
    Task.countDocuments(),
    Task.countDocuments({ status: 'open' }),
    Task.countDocuments({ status: 'completed' }),
    Task.countDocuments({ status: 'disputed' }),
    EscrowTransaction.aggregate([
      { $match: { type: 'fund', status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Dispute.countDocuments({ status: { $in: ['open', 'under_review'] } }),
  ]);

  success(res, 200, 'Platform analytics fetched', {
    users: { total: totalUsers, posters: totalPosters, freelancers: totalFreelancers },
    tasks: { total: totalTasks, open: openTasks, completed: completedTasks, disputed: disputedTasks },
    escrow: { totalVolume: totalEscrowVolume[0]?.total || 0 },
    disputes: { open: openDisputes },
  });
});

// 4. GET /api/admin/flagged - moderate flagged content (tasks disputed or reported)
exports.getFlaggedContent = catchAsync(async (req, res) => {
  const flaggedTasks = await Task.find({ status: 'disputed' })
    .populate('poster', 'name email')
    .populate('assignedFreelancer', 'name email');

  const suspendedUsers = await User.find({ status: { $in: ['suspended', 'banned'] } }).select(
    'name email role status'
  );

  success(res, 200, 'Flagged content fetched', { flaggedTasks, suspendedUsers });
});

// 5. PATCH /api/admin/disputes/:id/override - admin overrides a dispute's automated/prior resolution
exports.overrideDispute = catchAsync(async (req, res, next) => {
  const { decision, adminNote } = req.body;
  const dispute = await Dispute.findById(req.params.id);
  if (!dispute) return next(new AppError('Dispute not found', 404));

  dispute.resolution = {
    ...dispute.resolution,
    decision,
    adminNote: `[OVERRIDE] ${adminNote || ''}`,
    resolvedBy: req.user._id,
    resolvedAt: new Date(),
  };
  dispute.status = 'resolved';
  await dispute.save();

  success(res, 200, 'Dispute decision overridden', { dispute });
});
