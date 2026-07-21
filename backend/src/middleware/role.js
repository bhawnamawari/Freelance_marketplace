const AppError = require('../utils/AppError');

// Usage: restrictTo('admin'), restrictTo('poster', 'admin'), etc.
const restrictTo = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new AppError('You do not have permission to perform this action.', 403));
  }
  next();
};

module.exports = { restrictTo };
