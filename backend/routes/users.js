const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.use(auth);

// User routes
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/password', userController.updatePassword);
router.get('/favorites', userController.getFavorites);
router.get('/bookings', userController.getBookings);
router.get('/reviews', userController.getReviews);

// Admin routes
router.use(admin);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id/role', userController.updateUserRole);
router.delete('/:id', userController.deleteUser);

module.exports = router; 