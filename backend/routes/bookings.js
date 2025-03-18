const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.use(auth);

// User routes
router.post('/', bookingController.createBooking);
router.get('/my-bookings', bookingController.getUserBookings);
router.get('/:reference', bookingController.getBookingByReference);
router.post('/:id/cancel', bookingController.cancelBooking);

// Admin routes
router.use(admin);
router.get('/', bookingController.getAllBookings);
router.put('/:id/status', bookingController.updateBookingStatus);
router.get('/stats', bookingController.getBookingStats);

module.exports = router; 