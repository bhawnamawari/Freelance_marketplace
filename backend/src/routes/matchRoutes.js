const express = require('express');
const matchController = require('../controllers/matchController');
const { protect } = require('../middleware/auth');
const { restrictTo } = require('../middleware/role');

const router = express.Router();

router.get('/tasks/:taskId/freelancers', protect, restrictTo('poster', 'admin'), matchController.getMatchesForTask);
router.get('/freelancers/me/tasks', protect, restrictTo('freelancer'), matchController.getRecommendedTasks);
router.post('/tasks/:taskId/invite/:freelancerId', protect, restrictTo('poster'), matchController.inviteFreelancer);
router.post('/tasks/:taskId/apply', protect, restrictTo('freelancer'), matchController.applyToTask);
router.post('/tasks/:taskId/select/:freelancerId', protect, restrictTo('poster'), matchController.selectFreelancer);

module.exports = router;
