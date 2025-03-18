const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const roomRoutes = require('./rooms');
const bookingRoutes = require('./bookings');
const userRoutes = require('./users');
const reviewRoutes = require('./reviews');

router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router; 