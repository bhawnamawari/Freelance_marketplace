const Task = require('../models/Task');
const User = require('../models/User');
const { rankFreelancersForTask, rankTasksForFreelancer } = require('../services/matchingEngine');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const { notify } = require('../services/notificationService');

// 1. GET /api/match/tasks/:taskId/freelancers - AI-ranked freelancers for a task (poster view)
exports.getMatchesForTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.taskId);
  if (!task) return next(new AppError('Task not found', 404));
  if (String(task.poster) !== String(req.user._id) && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to view matches for this task', 403));
  }

  const candidates = await User.find({
    role: 'freelancer',
    status: 'active',
    skills: { $in: task.requiredSkills },
  }).limit(200);

  const ranked = rankFreelancersForTask(task, candidates).slice(0, 20);

  success(res, 200, 'Ranked freelancer matches fetched', {
    taskId: task._id,
    matches: ranked.map((r) => ({
      freelancer: {
        _id: r.freelancer._id,
        name: r.freelancer.name,
        avatarUrl: r.freelancer.avatarUrl,
        ratingAvg: r.freelancer.ratingAvg,
        skills: r.freelancer.skills,
      },
      score: r.score,
      breakdown: r.breakdown,
    })),
  });
});

// 2. GET /api/match/freelancers/me/tasks - AI-recommended tasks for logged-in freelancer
exports.getRecommendedTasks = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'freelancer') {
    return next(new AppError('Only freelancers can view task recommendations', 403));
  }

  const openTasks = await Task.find({ status: 'open' })
    .populate('category', 'name')
    .limit(200);

  const ranked = rankTasksForFreelancer(req.user, openTasks).slice(0, 20);

  success(res, 200, 'Recommended tasks fetched', {
    recommendations: ranked.map((r) => ({
      task: r.task,
      score: r.score,
      breakdown: r.breakdown,
    })),
  });
});

// 3. POST /api/match/tasks/:taskId/invite/:freelancerId - poster invites a matched freelancer
exports.inviteFreelancer = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.taskId);
  if (!task) return next(new AppError('Task not found', 404));
  if (String(task.poster) !== String(req.user._id)) {
    return next(new AppError('Not authorized', 403));
  }
  if (task.status !== 'open') return next(new AppError('Task is not open for invitations', 400));

  await notify({
    userId: req.params.freelancerId,
    type: 'new_match',
    title: `You've been invited to a task: "${task.title}"`,
    body: `${req.user.name} thinks you're a great fit based on your skills.`,
    relatedTask: task._id,
  });

  success(res, 200, 'Freelancer invited');
});

// 4. POST /api/match/tasks/:taskId/apply - freelancer applies to a task
exports.applyToTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.taskId);
  if (!task) return next(new AppError('Task not found', 404));
  if (task.status !== 'open') return next(new AppError('Task is not accepting applications', 400));

  const alreadyApplied = task.applicants.some((a) => String(a.freelancer) === String(req.user._id));
  if (alreadyApplied) return next(new AppError('You already applied to this task', 409));

  const { score } = require('../services/matchingEngine').scoreFreelancerForTask(task, req.user);

  task.applicants.push({
    freelancer: req.user._id,
    coverNote: req.body.coverNote || '',
    proposedBudget: req.body.proposedBudget || task.budget,
    matchScore: score,
  });
  await task.save();

  await notify({
    userId: task.poster,
    type: 'new_applicant',
    title: `New applicant for "${task.title}"`,
    body: `${req.user.name} applied (match score: ${score}/100)`,
    relatedTask: task._id,
  });

  success(res, 201, 'Application submitted', { matchScore: score });
});

// 5. POST /api/match/tasks/:taskId/select/:freelancerId - poster finalizes freelancer selection
exports.selectFreelancer = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.taskId);
  if (!task) return next(new AppError('Task not found', 404));
  if (String(task.poster) !== String(req.user._id)) {
    return next(new AppError('Not authorized', 403));
  }
  if (task.status !== 'open') return next(new AppError('Task already matched or unavailable', 400));

  task.assignedFreelancer = req.params.freelancerId;
  task.status = 'matched';
  await task.save();

  await notify({
    userId: req.params.freelancerId,
    type: 'task_assigned',
    title: `You've been selected for "${task.title}"`,
    body: 'Waiting for the poster to fund the first milestone to begin work.',
    relatedTask: task._id,
  });

  success(res, 200, 'Freelancer selected for task', { task });
});
