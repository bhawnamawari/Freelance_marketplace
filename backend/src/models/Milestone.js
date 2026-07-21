const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    amount: { type: Number, required: true, min: 0 },
    order: { type: Number, required: true }, // sequence: 1, 2, 3...
    status: {
      type: String,
      enum: [
        'pending',        // not yet funded
        'funded',         // escrow holds the money
        'submitted',      // freelancer marked work as delivered
        'approved',       // poster approved -> triggers payout
        'rejected',       // poster rejected -> back to in-progress or dispute
        'released',       // funds released to freelancer wallet
      ],
      default: 'pending',
    },
    deliverableFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FileAsset' }],
    submittedAt: Date,
    approvedAt: Date,
    releasedAt: Date,
    dueDate: Date,
  },
  { timestamps: true }
);

milestoneSchema.index({ task: 1, order: 1 }, { unique: true });

module.exports = mongoose.model('Milestone', milestoneSchema);
