const mongoose = require('mongoose');

const fileAssetSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalName: { type: String, required: true },
    storedPath: { type: String, required: true }, // path on disk / cloud key
    mimeType: { type: String, required: true },
    sizeBytes: { type: Number, required: true },
    isDeliverable: { type: Boolean, default: false }, // tagged as milestone deliverable
    milestone: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone', default: null },
    version: { type: Number, default: 1 },
    previousVersion: { type: mongoose.Schema.Types.ObjectId, ref: 'FileAsset', default: null },
  },
  { timestamps: true }
);

fileAssetSchema.index({ task: 1, createdAt: -1 });

module.exports = mongoose.model('FileAsset', fileAssetSchema);
