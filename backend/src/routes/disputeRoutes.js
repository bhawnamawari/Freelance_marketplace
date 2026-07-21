const express = require('express');
const disputeController = require('../controllers/disputeController');
const { protect } = require('../middleware/auth');
const { restrictTo } = require('../middleware/role');

const router = express.Router();

router.get('/', protect, restrictTo('admin'), disputeController.listDisputes);
router.post('/tasks/:taskId', protect, restrictTo('poster', 'freelancer'), disputeController.raiseDispute);
router.get('/:disputeId', protect, disputeController.getDispute);
router.post('/:disputeId/evidence', protect, disputeController.attachEvidence);
router.patch('/:disputeId/resolve', protect, restrictTo('admin'), disputeController.resolveDispute);
router.patch('/:disputeId/close', protect, restrictTo('admin'), disputeController.closeDispute);

module.exports = router;
