const AnalyticsService = require('./analyticsService');
const moment = require('moment');

class VisualizationService {
  static async getChartData(type, startDate, endDate) {
    switch (type) {
      case 'revenue':
        return await this.getRevenueChartData(startDate, endDate);
      case 'occupancy':
        return await this.getOccupancyChartData(startDate, endDate);
      case 'bookings':
        return await this.getBookingsChartData(startDate, endDate);
      case 'roomPerformance':
        return await this.getRoomPerformanceChartData(startDate, endDate);
      default:
        throw new Error('Invalid chart type');
    }
  }

  static async getRevenueChartData(startDate, endDate) {
    const data = await AnalyticsService.getRevenueMetrics(startDate, endDate);
    return {
      labels: data.map(item => item.payment_method),
      datasets: [{
        label: 'Revenue by Payment Method',
        data: data.map(item => item.total_revenue),
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#FFC107',
          '#F44336'
        ]
      }]
    };
  }

  static async getOccupancyChartData(startDate, endDate) {
    const data = await AnalyticsService.getOccupancyRates(startDate, endDate);
    return {
      labels: data.map(item => moment(item.date).format('MMM DD')),
      datasets: [{
        label: 'Occupancy Rate (%)',
        data: data.map(item => item.occupancy_rate),
        borderColor: '#2196F3',
        fill: false
      }]
    };
  }

  static async getBookingsChartData(startDate, endDate) {
    const data = await AnalyticsService.getBookingTrends(startDate, endDate);
    return {
      labels: data.map(item => moment(item.period).format('MMM DD')),
      datasets: [
        {
          label: 'Number of Bookings',
          data: data.map(item => item.total_bookings),
          borderColor: '#4CAF50',
          fill: false
        },
        {
          label: 'Average Booking Value',
          data: data.map(item => item.average_booking_value),
          borderColor: '#FFC107',
          fill: false
        }
      ]
    };
  }

  static async getDashboardSummary() {
    const endDate = new Date();
    const startDate = moment().subtract(30, 'days').toDate();

    const [
      revenueData,
      occupancyData,
      bookingData
    ] = await Promise.all([
      this.getRevenueChartData(startDate, endDate),
      this.getOccupancyChartData(startDate, endDate),
      this.getBookingsChartData(startDate, endDate)
    ]);

    return {
      revenue: revenueData,
      occupancy: occupancyData,
      bookings: bookingData
    };
  }
}

module.exports = VisualizationService; 