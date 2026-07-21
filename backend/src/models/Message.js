const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, maxlength: 5000 },
    attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FileAsset' }],
    isSystemMessage: { type: Boolean, default: false }, // e.g. "Milestone 1 funded"
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    editedAt: Date,
    deletedAt: Date,
  },
  { timestamps: true }
);

messageSchema.index({ task: 1, createdAt: 1 });

module.exports = mongoose.model('Message', messageSchema);
