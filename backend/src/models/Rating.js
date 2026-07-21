const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ratedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, default: '', maxlength: 1000 },
    communicationScore: { type: Number, min: 1, max: 5 },
    qualityScore: { type: Number, min: 1, max: 5 },
    timelinessScore: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

ratingSchema.index({ task: 1, ratedBy: 1, ratedUser: 1 }, { unique: true });
ratingSchema.index({ ratedUser: 1 });

module.exports = mongoose.model('Rating', ratingSchema);
