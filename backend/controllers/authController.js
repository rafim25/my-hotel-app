const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const User = require('../models/User');
const { ValidationError } = require('../utils/errors');
const { sendWelcomeEmail } = require('../utils/emailService');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone
    });

    // Send welcome email
    await sendWelcomeEmail(user);

    // Generate token
    const token = user.getSignedToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      throw new ValidationError('Please provide email and password');
    }

    // Check user exists
    const user = await User.findByEmail(email);
    if (!user) {
      throw new ValidationError('Invalid credentials');
    }

    // Check password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new ValidationError('Invalid credentials');
    }

    // Generate token
    const token = user.getSignedToken();

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}; 