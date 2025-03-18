const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.validateRegistration = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  handleValidationErrors,
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

exports.validateBooking = [
  body('roomId').isInt().withMessage('Valid room ID is required'),
  body('checkIn').isDate().withMessage('Valid check-in date is required'),
  body('checkOut').isDate().withMessage('Valid check-out date is required'),
  body('guests').isInt({ min: 1 }).withMessage('Number of guests is required'),
  handleValidationErrors,
];

exports.validateReview = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Review must be at least 10 characters'),
  handleValidationErrors,
];

exports.validateRoom = [
  body('name').trim().notEmpty().withMessage('Room name is required'),
  body('category_id').isInt().withMessage('Valid category ID is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be at least 1'),
  handleValidationErrors,
]; 