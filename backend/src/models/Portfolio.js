const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema(
  {
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    skillsUsed: [{ type: String }],
    mediaUrls: [{ type: String }],
    linkedTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null }, // auto-linked on completion
    externalLink: { type: String, default: '' },
  },
  { timestamps: true }
);

portfolioItemSchema.index({ freelancer: 1 });

module.exports = mongoose.model('Portfolio', portfolioItemSchema);
