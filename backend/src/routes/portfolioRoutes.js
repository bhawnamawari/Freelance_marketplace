const express = require('express');
const portfolioController = require('../controllers/portfolioController');
const { protect } = require('../middleware/auth');
const { restrictTo } = require('../middleware/role');

const router = express.Router();

router.post('/portfolio', protect, restrictTo('freelancer'), portfolioController.addPortfolioItem);
router.patch('/portfolio/:itemId', protect, restrictTo('freelancer'), portfolioController.updatePortfolioItem);
router.get('/portfolio/:freelancerId', portfolioController.getPortfolio);

router.post('/ratings/tasks/:taskId', protect, portfolioController.submitRating);
router.get('/ratings/:userId', portfolioController.getRatings);

module.exports = router;
