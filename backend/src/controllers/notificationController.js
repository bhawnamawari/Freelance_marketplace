const Notification = require('../models/Notification');
const NotificationPreference = require('../models/NotificationPreference');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');

// 1. GET /api/notifications - fetch notification list for logged-in user (paginated)
exports.listNotifications = catchAsync(async (req, res) => {
  const { unreadOnly, page = 1, limit = 30 } = req.query;
  const filter = { user: req.user._id };
  if (unreadOnly === 'true') filter.isRead = false;

  const skip = (Number(page) - 1) * Number(limit);
  const [notifications, unreadCount] = await Promise.all([
    Notification.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Notification.countDocuments({ user: req.user._id, isRead: false }),
  ]);

  success(res, 200, 'Notifications fetched', { notifications }, { unreadCount });
});

// 2. PATCH /api/notifications/:id/read - mark a single notification as read
exports.markAsRead = catchAsync(async (req, res, next) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { isRead: true },
    { new: true }
  );
  if (!notification) return next(new AppError('Notification not found', 404));
  success(res, 200, 'Notification marked as read', { notification });
});

// 3. PATCH /api/notifications/read-all - mark all as read
exports.markAllAsRead = catchAsync(async (req, res) => {
  await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true });
  success(res, 200, 'All notifications marked as read');
});

// 4. GET /api/notifications/preferences - fetch notification preferences
exports.getPreferences = catchAsync(async (req, res) => {
  let prefs = await NotificationPreference.findOne({ user: req.user._id });
  if (!prefs) prefs = await NotificationPreference.create({ user: req.user._id });
  success(res, 200, 'Preferences fetched', { preferences: prefs });
});

// 5. PATCH /api/notifications/preferences - update notification preferences
exports.updatePreferences = catchAsync(async (req, res) => {
  const { email, push } = req.body;
  const prefs = await NotificationPreference.findOneAndUpdate(
    { user: req.user._id },
    { ...(email && { email }), ...(push && { push }) },
    { new: true, upsert: true }
  );
  success(res, 200, 'Preferences updated', { preferences: prefs });
});
