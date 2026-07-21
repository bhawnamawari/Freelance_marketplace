const express = require('express');
const taskController = require('../controllers/taskController');
const { protect, optionalAuth } = require('../middleware/auth');
const { restrictTo } = require('../middleware/role');

const router = express.Router();

router.get('/categories', taskController.listCategories);
router.post('/categories', protect, restrictTo('admin'), taskController.createCategory);

router.get('/', optionalAuth, taskController.listTasks);
router.post('/', protect, restrictTo('poster'), taskController.createTask);
router.get('/:id', optionalAuth, taskController.getTask);
router.patch('/:id', protect, restrictTo('poster'), taskController.updateTask);
router.delete('/:id', protect, restrictTo('poster', 'admin'), taskController.deleteTask);

module.exports = router;
