const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    type: { type: String, enum: ['mcq', 'practical'], default: 'mcq' },
    options: [{ type: String }], // for mcq
    correctOptionIndex: { type: Number }, // for mcq, hidden from freelancer at fetch time
    points: { type: Number, default: 1 },
  },
  { _id: true }
);

const skillTestSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true, trim: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    durationMinutes: { type: Number, default: 30 },
    passingScorePercent: { type: Number, default: 70 },
    questions: [questionSchema],
    badgeLevel: { type: String, enum: ['basic', 'intermediate', 'expert'], default: 'basic' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const skillTestAttemptSchema = new mongoose.Schema(
  {
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillTest', required: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [
      {
        questionId: mongoose.Schema.Types.ObjectId,
        selectedOptionIndex: Number, // mcq
        practicalSubmissionUrl: String, // practical, needs admin grading
      },
    ],
    scorePercent: { type: Number, default: null },
    status: {
      type: String,
      enum: ['submitted', 'auto_graded', 'pending_admin_review', 'graded', 'passed', 'failed'],
      default: 'submitted',
    },
    gradedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    startedAt: { type: Date, default: Date.now },
    submittedAt: Date,
    nextRetakeAllowedAt: Date, // cooldown enforcement
  },
  { timestamps: true }
);

skillTestAttemptSchema.index({ freelancer: 1, test: 1, createdAt: -1 });

const SkillTest = mongoose.model('SkillTest', skillTestSchema);
const SkillTestAttempt = mongoose.model('SkillTestAttempt', skillTestAttemptSchema);

module.exports = { SkillTest, SkillTestAttempt };
