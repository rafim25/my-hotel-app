const cron = require('node-cron');
const AnalyticsService = require('./analyticsService');
const { generateReport } = require('./reportGenerator');
const { sendReportEmail } = require('./emailService');
const User = require('../models/User');

class SchedulerService {
  static init() {
    // Daily reports at 1 AM
    cron.schedule('0 1 * * *', () => this.generateDailyReports());

    // Weekly reports on Monday at 2 AM
    cron.schedule('0 2 * * 1', () => this.generateWeeklyReports());

    // Monthly reports on 1st of month at 3 AM
    cron.schedule('0 3 1 * *', () => this.generateMonthlyReports());
  }

  static async generateDailyReports() {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const [
        occupancyData,
        revenueData,
        bookingTrends
      ] = await Promise.all([
        AnalyticsService.getOccupancyRates(yesterday, yesterday),
        AnalyticsService.getRevenueMetrics(yesterday, yesterday),
        AnalyticsService.getBookingTrends(yesterday, yesterday)
      ]);

      const reportData = {
        date: yesterday.toISOString().split('T')[0],
        occupancy: occupancyData[0],
        revenue: revenueData[0],
        bookings: bookingTrends[0]
      };

      // Generate CSV report
      const report = await generateReport(reportData, 'daily');

      // Send to admin users
      const admins = await User.findByRole('admin');
      for (const admin of admins) {
        await sendReportEmail(admin.email, 'Daily Operations Report', report);
      }
    } catch (error) {
      console.error('Daily report generation failed:', error);
    }
  }

  static async generateWeeklyReports() {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const [
        roomPerformance,
        customerInsights
      ] = await Promise.all([
        AnalyticsService.getRoomPerformance(startDate, endDate),
        AnalyticsService.getCustomerInsights()
      ]);

      const reportData = {
        period: `${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`,
        roomPerformance,
        customerInsights
      };

      const report = await generateReport(reportData, 'weekly');
      const admins = await User.findByRole('admin');
      
      for (const admin of admins) {
        await sendReportEmail(admin.email, 'Weekly Performance Report', report);
      }
    } catch (error) {
      console.error('Weekly report generation failed:', error);
    }
  }

  static async generateMonthlyReports() {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);

      const [
        revenueMetrics,
        occupancyTrends,
        bookingAnalytics
      ] = await Promise.all([
        AnalyticsService.getRevenueMetrics(startDate, endDate),
        AnalyticsService.getOccupancyRates(startDate, endDate),
        AnalyticsService.getBookingTrends(startDate, endDate, 'month')
      ]);

      const reportData = {
        period: `${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`,
        revenue: revenueMetrics,
        occupancy: occupancyTrends,
        bookings: bookingAnalytics
      };

      const report = await generateReport(reportData, 'monthly');
      const admins = await User.findByRole('admin');

      for (const admin of admins) {
        await sendReportEmail(admin.email, 'Monthly Business Report', report);
      }
    } catch (error) {
      console.error('Monthly report generation failed:', error);
    }
  }
}

module.exports = SchedulerService; 