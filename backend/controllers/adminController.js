const Booking = require('../models/Booking');
const Room = require('../models/Room');
const User = require('../models/User');
const { generateReport } = require('../utils/reportGenerator');
const VisualizationService = require('../utils/visualizationService');
const PDFGenerator = require('../utils/pdfGenerator');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      bookingStats,
      roomStats,
      userStats,
      revenueStats
    ] = await Promise.all([
      Booking.getStats(),
      Room.getStats(),
      User.getStats(),
      Booking.getRevenueStats()
    ]);

    res.json({
      bookings: bookingStats,
      rooms: roomStats,
      users: userStats,
      revenue: revenueStats
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookingAnalytics = async (req, res, next) => {
  try {
    const { startDate, endDate, groupBy = 'day' } = req.query;
    const analytics = await Booking.getAnalytics(startDate, endDate, groupBy);
    res.json(analytics);
  } catch (error) {
    next(error);
  }
};

exports.getRevenueReport = async (req, res, next) => {
  try {
    const { startDate, endDate, format = 'json' } = req.query;
    const data = await Booking.getRevenueData(startDate, endDate);

    if (format === 'csv') {
      const report = await generateReport(data, 'revenue');
      res.attachment('revenue-report.csv').send(report);
    } else {
      res.json(data);
    }
  } catch (error) {
    next(error);
  }
};

exports.getOccupancyReport = async (req, res, next) => {
  try {
    const { startDate, endDate, format = 'json' } = req.query;
    const data = await Room.getOccupancyData(startDate, endDate);

    if (format === 'csv') {
      const report = await generateReport(data, 'occupancy');
      res.attachment('occupancy-report.csv').send(report);
    } else {
      res.json(data);
    }
  } catch (error) {
    next(error);
  }
};

exports.getVisualizationData = async (req, res, next) => {
  try {
    const { type, startDate, endDate } = req.query;
    const data = await VisualizationService.getChartData(type, startDate, endDate);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.getDashboardData = async (req, res, next) => {
  try {
    const data = await VisualizationService.getDashboardSummary();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.downloadPDFReport = async (req, res, next) => {
  try {
    const { type, startDate, endDate } = req.query;
    const data = await AnalyticsService.getReportData(type, startDate, endDate);
    const doc = await PDFGenerator.generateReport(data, type);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${type}_report.pdf`);
    doc.pipe(res);
    doc.end();
  } catch (error) {
    next(error);
  }
}; 