const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true },
    poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    requiredSkills: [{ type: String, trim: true }], // matching engine reads this
    budget: { type: Number, required: true, min: 1 },
    budgetType: { type: String, enum: ['fixed', 'hourly'], default: 'fixed' },
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: [
        'open',           // posted, awaiting matches/applications
        'matched',        // freelancer selected, awaiting escrow funding
        'in_progress',    // first milestone funded, work started
        'in_review',      // final milestone delivered, awaiting approval
        'completed',      // all milestones approved & paid
        'disputed',
        'cancelled',
      ],
      default: 'open',
    },
    assignedFreelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    applicants: [
      {
        freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        coverNote: String,
        proposedBudget: Number,
        matchScore: Number, // filled in by AI matching engine when relevant
        appliedAt: { type: Date, default: Date.now },
      },
    ],
    attachments: [{ type: String }], // reference files provided by poster
    isUrgent: { type: Boolean, default: false },
    tags: [{ type: String }],
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

taskSchema.index({ requiredSkills: 1, status: 1 });
taskSchema.index({ title: 'text', description: 'text', tags: 'text' });
taskSchema.index({ category: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model('Task', taskSchema);
