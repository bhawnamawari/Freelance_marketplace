const mongoose = require('mongoose');

const notificationPreferenceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    email: {
      newMatch: { type: Boolean, default: true },
      payments: { type: Boolean, default: true },
      messages: { type: Boolean, default: false },
      disputes: { type: Boolean, default: true },
    },
    push: {
      newMatch: { type: Boolean, default: true },
      payments: { type: Boolean, default: true },
      messages: { type: Boolean, default: true },
      disputes: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('NotificationPreference', notificationPreferenceSchema);
