const Task = require('../models/Task');
const Category = require('../models/Category');
const Milestone = require('../models/Milestone');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');

// 1. POST /api/tasks - create a task (Task Poster)
exports.createTask = catchAsync(async (req, res, next) => {
  const { title, description, category, requiredSkills, budget, budgetType, deadline, isUrgent, tags, attachments } =
    req.body;

  if (!title || !description || !category || !budget || !deadline) {
    return next(new AppError('title, description, category, budget, and deadline are required', 400));
  }

  const categoryDoc = await Category.findById(category);
  if (!categoryDoc) return next(new AppError('Invalid category', 400));

  const task = await Task.create({
    title,
    description,
    poster: req.user._id,
    category,
    requiredSkills: requiredSkills || [],
    budget,
    budgetType,
    deadline,
    isUrgent,
    tags,
    attachments,
  });

  categoryDoc.taskCount += 1;
  await categoryDoc.save();

  success(res, 201, 'Task created successfully', { task });
});

// 2. GET /api/tasks/:id - fetch single task detail
exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id)
    .populate('poster', 'name avatarUrl ratingAvg')
    .populate('category', 'name slug')
    .populate('assignedFreelancer', 'name avatarUrl ratingAvg');

  if (!task) return next(new AppError('Task not found', 404));

  task.viewCount += 1;
  await task.save();

  success(res, 200, 'Task fetched', { task });
});

// 3. PATCH /api/tasks/:id - edit a task (poster only, before it's matched)
exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) return next(new AppError('Task not found', 404));
  if (String(task.poster) !== String(req.user._id)) {
    return next(new AppError('Only the task owner can edit this task', 403));
  }
  if (!['open'].includes(task.status)) {
    return next(new AppError('Task can only be edited while status is "open"', 400));
  }

  const allowedFields = [
    'title',
    'description',
    'requiredSkills',
    'budget',
    'budgetType',
    'deadline',
    'isUrgent',
    'tags',
    'attachments',
  ];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) task[field] = req.body[field];
  });

  await task.save();
  success(res, 200, 'Task updated', { task });
});

// 4. DELETE /api/tasks/:id - cancel/delete a task
exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) return next(new AppError('Task not found', 404));
  if (String(task.poster) !== String(req.user._id) && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to delete this task', 403));
  }
  if (['in_progress', 'in_review'].includes(task.status)) {
    return next(new AppError('Cannot delete a task with active milestones. Cancel it instead.', 400));
  }

  task.status = 'cancelled';
  await task.save();
  success(res, 200, 'Task cancelled', { task });
});

// 5. GET /api/tasks - list tasks with filters (paginated)
exports.listTasks = catchAsync(async (req, res) => {
  const { status, category, minBudget, maxBudget, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  else filter.status = { $in: ['open', 'matched'] }; // default: browsable tasks
  if (category) filter.category = category;
  if (minBudget || maxBudget) {
    filter.budget = {};
    if (minBudget) filter.budget.$gte = Number(minBudget);
    if (maxBudget) filter.budget.$lte = Number(maxBudget);
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .populate('poster', 'name avatarUrl')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Task.countDocuments(filter),
  ]);

  success(res, 200, 'Tasks fetched', { tasks }, { total, page: Number(page), limit: Number(limit) });
});

// 6. GET /api/categories - list categories & subcategories
exports.listCategories = catchAsync(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ name: 1 });
  success(res, 200, 'Categories fetched', { categories });
});

// Bonus/admin helper: create category (used by admin module too, exposed here for completeness)
exports.createCategory = catchAsync(async (req, res, next) => {
  const { name, slug, description, parentCategory, icon } = req.body;
  if (!name || !slug) return next(new AppError('name and slug are required', 400));

  const category = await Category.create({ name, slug, description, parentCategory, icon });
  success(res, 201, 'Category created', { category });
});
