const express = require('express');
const escrowController = require('../controllers/escrowController');
const { protect } = require('../middleware/auth');
const { restrictTo } = require('../middleware/role');

const router = express.Router();

router.post('/tasks/:taskId/milestones', protect, restrictTo('poster'), escrowController.createMilestonePlan);
router.get('/tasks/:taskId/milestones', protect, escrowController.listMilestones);
router.get('/tasks/:taskId/transactions', protect, escrowController.getTransactionHistory);

router.post('/milestones/:milestoneId/fund', protect, restrictTo('poster'), escrowController.fundMilestone);
router.post('/milestones/:milestoneId/submit', protect, restrictTo('freelancer'), escrowController.submitMilestone);
router.post('/milestones/:milestoneId/release', protect, restrictTo('poster'), escrowController.releaseMilestone);
router.post(
  '/milestones/:milestoneId/refund',
  protect,
  restrictTo('poster', 'admin'),
  escrowController.refundMilestone
);

module.exports = router;
