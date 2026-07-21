const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: [
        'new_match',
        'new_applicant',
        'task_assigned',
        'milestone_funded',
        'milestone_submitted',
        'milestone_approved',
        'payment_released',
        'new_message',
        'dispute_opened',
        'dispute_resolved',
        'new_rating',
        'skill_test_graded',
        'admin_alert',
      ],
      required: true,
    },
    title: { type: String, required: true },
    body: { type: String, default: '' },
    relatedTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
    isRead: { type: Boolean, default: false },
    channel: { type: String, enum: ['in_app', 'email', 'push'], default: 'in_app' },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
