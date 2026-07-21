const express = require('express');
const skillTestController = require('../controllers/skillTestController');
const { protect } = require('../middleware/auth');
const { restrictTo } = require('../middleware/role');

const router = express.Router();

router.get('/', skillTestController.listTests);
router.post('/', protect, restrictTo('admin'), skillTestController.createTest);
router.get('/attempts/me', protect, restrictTo('freelancer'), skillTestController.getMyAttempts);
router.patch('/attempts/:attemptId/grade', protect, restrictTo('admin'), skillTestController.gradeAttempt);
router.get('/:skill', skillTestController.getTestForSkill);
router.post('/:testId/attempts', protect, restrictTo('freelancer'), skillTestController.submitAttempt);

module.exports = router;
