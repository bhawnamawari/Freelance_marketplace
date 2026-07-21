const express = require('express');
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, notificationController.listNotifications);
router.patch('/read-all', protect, notificationController.markAllAsRead);
router.patch('/:id/read', protect, notificationController.markAsRead);
router.get('/preferences', protect, notificationController.getPreferences);
router.patch('/preferences', protect, notificationController.updatePreferences);

module.exports = router;
