const User = require('../models/User');
const NotificationPreference = require('../models/NotificationPreference');
const { signToken } = require('../utils/jwt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, role, skills } = req.body;

  if (!name || !email || !password) {
    return next(new AppError('Name, email, and password are required', 400));
  }
  if (role && !['poster', 'freelancer'].includes(role)) {
    return next(new AppError('Role must be "poster" or "freelancer" (admin is assigned manually)', 400));
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return next(new AppError('An account with this email already exists', 409));

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'freelancer',
    skills: skills || [],
  });

  await NotificationPreference.create({ user: user._id });

  const token = signToken({ id: user._id, role: user.role });
  success(res, 201, 'Account created successfully', { user: user.toSafeObject(), token });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Email and password are required', 400));

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  user.lastActiveAt = new Date();
  await user.save({ validateBeforeSave: false });

  const token = signToken({ id: user._id, role: user.role });
  success(res, 200, 'Logged in successfully', { user: user.toSafeObject(), token });
});

exports.getMe = catchAsync(async (req, res) => {
  success(res, 200, 'Current user fetched', { user: req.user.toSafeObject() });
});
