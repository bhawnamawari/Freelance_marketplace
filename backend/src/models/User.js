const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    role: {
      type: String,
      enum: ['poster', 'freelancer', 'admin'],
      default: 'freelancer',
    },
    avatarUrl: { type: String, default: '' },
    bio: { type: String, default: '', maxlength: 1000 },
    skills: [{ type: String, trim: true }], // used heavily by the AI matching engine
    hourlyRate: { type: Number, default: 0 },
    availability: {
      type: String,
      enum: ['available', 'busy', 'unavailable'],
      default: 'available',
    },
    location: { type: String, default: '' },
    status: {
      type: String,
      enum: ['active', 'suspended', 'banned'],
      default: 'active',
    },
    ratingAvg: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    verifiedSkills: [
      {
        skill: String,
        badgeLevel: { type: String, enum: ['basic', 'intermediate', 'expert'] },
        earnedAt: Date,
      },
    ],
    walletBalance: { type: Number, default: 0 }, // freelancer earnings after escrow release
    lastActiveAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.index({ skills: 1 });
userSchema.index({ role: 1, status: 1 });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
