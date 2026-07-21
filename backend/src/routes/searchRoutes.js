const express = require('express');
const searchController = require('../controllers/searchController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/tasks', searchController.searchTasks);
router.get('/freelancers', searchController.searchFreelancers);
router.get('/trending', searchController.getTrendingTasks);
router.post('/saved', protect, searchController.saveSearch);
router.get('/saved', protect, searchController.getSavedSearches);

module.exports = router;
