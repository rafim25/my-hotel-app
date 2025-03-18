const User = require('../models/User');
const { NotFoundError, ForbiddenError } = require('../utils/errors');
const { sendWelcomeEmail } = require('../utils/emailService');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const success = await User.update(req.user.userId, { name, email, phone });
    
    if (!success) {
      throw new NotFoundError('User not found');
    }

    const updatedUser = await User.findById(req.user.userId);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new ForbiddenError('Current password is incorrect');
    }

    await User.updatePassword(req.user.userId, newPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const favorites = await User.getFavoriteRooms(req.user.userId);
    res.json(favorites);
  } catch (error) {
    next(error);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await User.getBookings(req.user.userId);
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await User.getReviews(req.user.userId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

// Admin controllers
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const success = await User.updateRole(req.params.id, role);
    
    if (!success) {
      throw new NotFoundError('User not found');
    }

    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const success = await User.delete(req.params.id);
    if (!success) {
      throw new NotFoundError('User not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 