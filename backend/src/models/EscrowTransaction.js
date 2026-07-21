const mongoose = require('mongoose');

const escrowTransactionSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    milestone: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone', required: true },
    poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['fund', 'release', 'refund', 'partial_release'],
      required: true,
    },
    amount: { type: Number, required: true },
    commission: { type: Number, default: 0 }, // platform cut, deducted on release
    netAmount: { type: Number, default: 0 }, // amount freelancer actually receives
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    gatewayReference: { type: String, default: '' }, // simulated payment gateway txn id
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

escrowTransactionSchema.index({ task: 1, createdAt: -1 });

module.exports = mongoose.model('EscrowTransaction', escrowTransactionSchema);
