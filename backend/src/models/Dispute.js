const mongoose = require('mongoose');

const disputeSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    milestone: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone', default: null },
    raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    against: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    description: { type: String, required: true },
    evidenceFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FileAsset' }],
    evidenceMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], // pulled from workspace
    status: {
      type: String,
      enum: ['open', 'under_review', 'resolved', 'closed'],
      default: 'open',
    },
    resolution: {
      decision: { type: String, enum: ['refund_poster', 'release_freelancer', 'partial_split', 'no_action'] },
      splitPercentToFreelancer: Number, // used only for partial_split
      adminNote: String,
      resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      resolvedAt: Date,
    },
  },
  { timestamps: true }
);

disputeSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Dispute', disputeSchema);
