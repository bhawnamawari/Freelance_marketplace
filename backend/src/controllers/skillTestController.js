const { SkillTest, SkillTestAttempt } = require('../models/SkillTest');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { success } = require('../utils/apiResponse');
const { notify } = require('../services/notificationService');

const RETAKE_COOLDOWN_DAYS = 14;

// 1. GET /api/skill-tests/:skill - fetch the test for a given skill (questions, no correct answers)
exports.getTestForSkill = catchAsync(async (req, res, next) => {
  const test = await SkillTest.findOne({ skill: req.params.skill, isActive: true });
  if (!test) return next(new AppError('No active test found for this skill', 404));

  // Strip correct answers before sending to the freelancer
  const sanitized = {
    _id: test._id,
    skill: test.skill,
    title: test.title,
    description: test.description,
    durationMinutes: test.durationMinutes,
    passingScorePercent: test.passingScorePercent,
    badgeLevel: test.badgeLevel,
    questions: test.questions.map((q) => ({
      _id: q._id,
      questionText: q.questionText,
      type: q.type,
      options: q.options,
      points: q.points,
    })),
  };

  success(res, 200, 'Skill test fetched', { test: sanitized });
});

// 2. POST /api/skill-tests/:testId/attempts - freelancer submits answers
exports.submitAttempt = catchAsync(async (req, res, next) => {
  const test = await SkillTest.findById(req.params.testId);
  if (!test) return next(new AppError('Test not found', 404));

  // Enforce retake cooldown
  const lastAttempt = await SkillTestAttempt.findOne({
    test: test._id,
    freelancer: req.user._id,
  }).sort({ createdAt: -1 });

  if (lastAttempt?.nextRetakeAllowedAt && lastAttempt.nextRetakeAllowedAt > new Date()) {
    return next(
      new AppError(
        `You can retake this test after ${lastAttempt.nextRetakeAllowedAt.toDateString()}`,
        429
      )
    );
  }

  const { answers } = req.body; // [{ questionId, selectedOptionIndex, practicalSubmissionUrl }]
  if (!Array.isArray(answers)) return next(new AppError('answers array is required', 400));

  const hasPractical = test.questions.some((q) => q.type === 'practical');

  let scorePercent = null;
  let status = 'submitted';

  if (!hasPractical) {
    // Auto-grade MCQ-only test
    let earned = 0;
    let total = 0;
    test.questions.forEach((q) => {
      total += q.points;
      const answer = answers.find((a) => String(a.questionId) === String(q._id));
      if (answer && answer.selectedOptionIndex === q.correctOptionIndex) {
        earned += q.points;
      }
    });
    scorePercent = total > 0 ? Math.round((earned / total) * 10000) / 100 : 0;
    status = scorePercent >= test.passingScorePercent ? 'passed' : 'failed';
  } else {
    status = 'pending_admin_review';
  }

  const attempt = await SkillTestAttempt.create({
    test: test._id,
    freelancer: req.user._id,
    answers,
    scorePercent,
    status,
    submittedAt: new Date(),
    nextRetakeAllowedAt:
      status === 'failed'
        ? new Date(Date.now() + RETAKE_COOLDOWN_DAYS * 24 * 60 * 60 * 1000)
        : undefined,
  });

  if (status === 'passed') {
    await awardBadge(req.user._id, test.skill, test.badgeLevel);
  }

  success(res, 201, 'Test attempt submitted', { attempt });
});

// 3. GET /api/skill-tests/attempts/me - freelancer views their own attempt history
exports.getMyAttempts = catchAsync(async (req, res) => {
  const attempts = await SkillTestAttempt.find({ freelancer: req.user._id })
    .populate('test', 'skill title badgeLevel passingScorePercent')
    .sort({ createdAt: -1 });
  success(res, 200, 'Attempt history fetched', { attempts });
});

// 4. PATCH /api/skill-tests/attempts/:attemptId/grade - admin grades a practical attempt
exports.gradeAttempt = catchAsync(async (req, res, next) => {
  const { scorePercent, notes } = req.body;
  const attempt = await SkillTestAttempt.findById(req.params.attemptId).populate('test');
  if (!attempt) return next(new AppError('Attempt not found', 404));
  if (attempt.status !== 'pending_admin_review') {
    return next(new AppError('This attempt is not awaiting admin review', 400));
  }
  if (scorePercent === undefined) return next(new AppError('scorePercent is required', 400));

  attempt.scorePercent = scorePercent;
  attempt.gradedBy = req.user._id;
  attempt.status = scorePercent >= attempt.test.passingScorePercent ? 'passed' : 'failed';
  if (attempt.status === 'failed') {
    attempt.nextRetakeAllowedAt = new Date(Date.now() + RETAKE_COOLDOWN_DAYS * 24 * 60 * 60 * 1000);
  }
  await attempt.save();

  if (attempt.status === 'passed') {
    await awardBadge(attempt.freelancer, attempt.test.skill, attempt.test.badgeLevel);
  }

  await notify({
    userId: attempt.freelancer,
    type: 'skill_test_graded',
    title: `Your "${attempt.test.skill}" test has been graded`,
    body: `Result: ${attempt.status} (${scorePercent}%). ${notes || ''}`,
  });

  success(res, 200, 'Attempt graded', { attempt });
});

// 5. GET /api/skill-tests - admin/browse: list all available tests (also used by admin to create/manage)
exports.listTests = catchAsync(async (req, res) => {
  const tests = await SkillTest.find({ isActive: true }).select(
    'skill title durationMinutes passingScorePercent badgeLevel'
  );
  success(res, 200, 'Skill tests fetched', { tests });
});

exports.createTest = catchAsync(async (req, res, next) => {
  const { skill, title, description, durationMinutes, passingScorePercent, questions, badgeLevel } = req.body;
  if (!skill || !title || !questions?.length) {
    return next(new AppError('skill, title, and at least one question are required', 400));
  }

  const test = await SkillTest.create({
    skill,
    title,
    description,
    durationMinutes,
    passingScorePercent,
    questions,
    badgeLevel,
  });
  success(res, 201, 'Skill test created', { test });
});

// Helper: award/upgrade a verified-skill badge on the user profile
async function awardBadge(userId, skill, badgeLevel) {
  const user = await User.findById(userId);
  const existingIdx = user.verifiedSkills.findIndex(
    (v) => v.skill.toLowerCase() === skill.toLowerCase()
  );
  const levelRank = { basic: 1, intermediate: 2, expert: 3 };

  if (existingIdx === -1) {
    user.verifiedSkills.push({ skill, badgeLevel, earnedAt: new Date() });
  } else if (levelRank[badgeLevel] > levelRank[user.verifiedSkills[existingIdx].badgeLevel]) {
    user.verifiedSkills[existingIdx] = { skill, badgeLevel, earnedAt: new Date() };
  }
  if (!user.skills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
    user.skills.push(skill);
  }
  await user.save({ validateBeforeSave: false });
}
