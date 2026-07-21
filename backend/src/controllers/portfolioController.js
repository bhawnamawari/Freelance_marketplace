const Portfolio = require('../models/Portfolio');
const Rating = require('../models/Rating');
const Task = require('../models/Task');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const { notify } = require('../services/notificationService');

// 1. POST /api/portfolio - create/add a portfolio item (freelancer)
exports.addPortfolioItem = catchAsync(async (req, res, next) => {
  const { title, description, skillsUsed, mediaUrls, linkedTask, externalLink } = req.body;
  if (!title) return next(new AppError('title is required', 400));

  const item = await Portfolio.create({
    freelancer: req.user._id,
    title,
    description,
    skillsUsed,
    mediaUrls,
    linkedTask,
    externalLink,
  });

  success(res, 201, 'Portfolio item added', { item });
});

// 2. PATCH /api/portfolio/:itemId - edit a portfolio item
exports.updatePortfolioItem = catchAsync(async (req, res, next) => {
  const item = await Portfolio.findById(req.params.itemId);
  if (!item) return next(new AppError('Portfolio item not found', 404));
  if (String(item.freelancer) !== String(req.user._id)) return next(new AppError('Not authorized', 403));

  ['title', 'description', 'skillsUsed', 'mediaUrls', 'externalLink'].forEach((f) => {
    if (req.body[f] !== undefined) item[f] = req.body[f];
  });
  await item.save();
  success(res, 200, 'Portfolio item updated', { item });
});

// 3. GET /api/portfolio/:freelancerId - fetch a freelancer's full portfolio
exports.getPortfolio = catchAsync(async (req, res) => {
  const items = await Portfolio.find({ freelancer: req.params.freelancerId }).sort({ createdAt: -1 });
  success(res, 200, 'Portfolio fetched', { items });
});

// 4. POST /api/ratings/tasks/:taskId - submit a rating/review after task completion
exports.submitRating = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.taskId);
  if (!task) return next(new AppError('Task not found', 404));
  if (task.status !== 'completed') return next(new AppError('Can only rate completed tasks', 400));

  const isPoster = String(task.poster) === String(req.user._id);
  const isFreelancer = String(task.assignedFreelancer) === String(req.user._id);
  if (!isPoster && !isFreelancer) return next(new AppError('Not a participant of this task', 403));

  const ratedUser = isPoster ? task.assignedFreelancer : task.poster;
  const { stars, review, communicationScore, qualityScore, timelinessScore } = req.body;
  if (!stars) return next(new AppError('stars rating (1-5) is required', 400));

  const rating = await Rating.create({
    task: task._id,
    ratedBy: req.user._id,
    ratedUser,
    stars,
    review,
    communicationScore,
    qualityScore,
    timelinessScore,
  });

  // Recompute aggregate rating for the rated user
  const agg = await Rating.aggregate([
    { $match: { ratedUser: ratedUser } },
    { $group: { _id: '$ratedUser', avg: { $avg: '$stars' }, count: { $sum: 1 } } },
  ]);
  if (agg.length) {
    await User.findByIdAndUpdate(ratedUser, {
      ratingAvg: Math.round(agg[0].avg * 100) / 100,
      ratingCount: agg[0].count,
    });
  }

  // Auto-link portfolio for freelancers when the poster rates them positively
  if (isPoster && stars >= 4) {
    await Portfolio.create({
      freelancer: task.assignedFreelancer,
      title: task.title,
      description: `Completed via marketplace: ${task.description.slice(0, 200)}`,
      skillsUsed: task.requiredSkills,
      linkedTask: task._id,
    }).catch(() => {}); // non-critical, ignore duplicate/edge errors
  }

  await notify({
    userId: ratedUser,
    type: 'new_rating',
    title: `You received a ${stars}-star rating`,
    body: review || '',
    relatedTask: task._id,
  });

  success(res, 201, 'Rating submitted', { rating });
});

// 5. GET /api/ratings/:userId - fetch all reviews for a user + aggregate
exports.getRatings = catchAsync(async (req, res) => {
  const [ratings, user] = await Promise.all([
    Rating.find({ ratedUser: req.params.userId })
      .populate('ratedBy', 'name avatarUrl')
      .populate('task', 'title')
      .sort({ createdAt: -1 }),
    User.findById(req.params.userId).select('ratingAvg ratingCount name'),
  ]);

  success(res, 200, 'Ratings fetched', {
    ratingAvg: user?.ratingAvg || 0,
    ratingCount: user?.ratingCount || 0,
    ratings,
  });
});
