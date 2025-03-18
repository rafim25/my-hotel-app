const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Public routes
router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoomById);
router.get('/:id/reviews', roomController.getRoomReviews);
router.get('/categories', roomController.getRoomCategories);

// Protected routes
router.use(auth);
router.post('/:id/favorite', roomController.toggleFavorite);
router.get('/check-availability', roomController.checkAvailability);

// Admin routes
router.use(admin);
router.post('/', roomController.createRoom);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);
router.post('/:id/images', roomController.uploadRoomImages);

module.exports = router; 