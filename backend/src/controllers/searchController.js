const Task = require('../models/Task');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const { success } = require('../utils/apiResponse');

// In-memory saved searches (fine for a project scope; swap for a SavedSearch
// model + DB persistence if you need it to survive server restarts)
const savedSearchesStore = new Map(); // userId -> [ { name, query, createdAt } ]

// 1. GET /api/search/tasks - full-text + filtered task search
exports.searchTasks = catchAsync(async (req, res) => {
  const { q, category, minBudget, maxBudget, skills, sortBy = 'relevance', page = 1, limit = 20 } = req.query;

  const filter = { status: { $in: ['open', 'matched'] } };
  if (q) filter.$text = { $search: q };
  if (category) filter.category = category;
  if (skills) filter.requiredSkills = { $in: skills.split(',').map((s) => s.trim()) };
  if (minBudget || maxBudget) {
    filter.budget = {};
    if (minBudget) filter.budget.$gte = Number(minBudget);
    if (maxBudget) filter.budget.$lte = Number(maxBudget);
  }

  const sortOptions = {
    relevance: q ? { score: { $meta: 'textScore' } } : { createdAt: -1 },
    newest: { createdAt: -1 },
    budget_high: { budget: -1 },
    budget_low: { budget: 1 },
    deadline: { deadline: 1 },
  };

  const projection = q ? { score: { $meta: 'textScore' } } : {};
  const skip = (Number(page) - 1) * Number(limit);

  const [tasks, total] = await Promise.all([
    Task.find(filter, projection)
      .populate('poster', 'name avatarUrl ratingAvg')
      .populate('category', 'name slug')
      .sort(sortOptions[sortBy] || sortOptions.relevance)
      .skip(skip)
      .limit(Number(limit)),
    Task.countDocuments(filter),
  ]);

  success(res, 200, 'Task search results', { tasks }, { total, page: Number(page), limit: Number(limit) });
});

// 2. GET /api/search/freelancers - search freelancers by skill/rating
exports.searchFreelancers = catchAsync(async (req, res) => {
  const { q, skills, minRating, availability, page = 1, limit = 20 } = req.query;

  const filter = { role: 'freelancer', status: 'active' };
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (skills) filter.skills = { $in: skills.split(',').map((s) => s.trim()) };
  if (minRating) filter.ratingAvg = { $gte: Number(minRating) };
  if (availability) filter.availability = availability;

  const skip = (Number(page) - 1) * Number(limit);
  const [freelancers, total] = await Promise.all([
    User.find(filter)
      .select('name avatarUrl skills ratingAvg ratingCount hourlyRate availability completedTasks verifiedSkills')
      .sort({ ratingAvg: -1 })
      .skip(skip)
      .limit(Number(limit)),
    User.countDocuments(filter),
  ]);

  success(res, 200, 'Freelancer search results', { freelancers }, { total, page: Number(page), limit: Number(limit) });
});

// 3. GET /api/search/trending - trending/featured tasks (by view count & recency)
exports.getTrendingTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find({ status: 'open' })
    .populate('poster', 'name avatarUrl')
    .populate('category', 'name')
    .sort({ viewCount: -1, createdAt: -1 })
    .limit(10);

  success(res, 200, 'Trending tasks fetched', { tasks });
});

// 4. POST /api/search/saved - save a search query for later reuse
exports.saveSearch = catchAsync(async (req, res, next) => {
  const { name, query } = req.body;
  const userId = String(req.user._id);
  const existing = savedSearchesStore.get(userId) || [];
  existing.push({ name: name || `Search ${existing.length + 1}`, query, createdAt: new Date() });
  savedSearchesStore.set(userId, existing);

  success(res, 201, 'Search saved', { savedSearches: existing });
});

// 5. GET /api/search/saved - list the user's saved searches
exports.getSavedSearches = catchAsync(async (req, res) => {
  const savedSearches = savedSearchesStore.get(String(req.user._id)) || [];
  success(res, 200, 'Saved searches fetched', { savedSearches });
});
