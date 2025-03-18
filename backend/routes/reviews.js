const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Public routes
router.get('/room/:roomId', reviewController.getRoomReviews);

// Protected routes
router.use(auth);
router.post('/', reviewController.createReview);
router.get('/my-reviews', reviewController.getUserReviews);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

// Admin routes
router.use(admin);
router.get('/', reviewController.getAllReviews);
router.delete('/:id/admin', reviewController.adminDeleteReview);

module.exports = router; 