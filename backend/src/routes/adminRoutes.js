const express = require('express');
const adminController = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { restrictTo } = require('../middleware/role');

const router = express.Router();

router.use(protect, restrictTo('admin')); // every route below requires admin role

router.patch('/users/:id/status', adminController.updateUserStatus);
router.patch('/categories/:id', adminController.manageCategory);
router.delete('/categories/:id', adminController.deleteCategory);
router.get('/analytics', adminController.getAnalytics);
router.get('/flagged', adminController.getFlaggedContent);
router.patch('/disputes/:id/override', adminController.overrideDispute);

module.exports = router;
