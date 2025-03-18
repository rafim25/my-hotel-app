const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { UnauthorizedError, ForbiddenError } = require('../utils/errors');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedError('Not authorized to access this route');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);

    if (!req.user) {
      throw new UnauthorizedError('User not found');
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('Not authorized to access this route');
    }
    next();
  };
}; 