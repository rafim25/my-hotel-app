const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.use(auth, admin);

router.get('/dashboard', adminController.getDashboardStats);
router.get('/analytics', adminController.getBookingAnalytics);
router.get('/reports/revenue', adminController.getRevenueReport);
router.get('/reports/occupancy', adminController.getOccupancyReport);
router.get('/insights/customers', adminController.getCustomerInsights);
router.get('/insights/rooms', adminController.getRoomPerformance);

module.exports = router; 