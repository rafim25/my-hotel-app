const db = require('../config/database');
const moment = require('moment');

class AnalyticsService {
  static async getBookingTrends(startDate, endDate, interval = 'day') {
    const query = `
      SELECT 
        DATE_FORMAT(created_at, ?) as period,
        COUNT(*) as total_bookings,
        SUM(total_amount) as revenue,
        AVG(total_amount) as average_booking_value
      FROM bookings
      WHERE created_at BETWEEN ? AND ?
      GROUP BY period
      ORDER BY period
    `;

    const format = interval === 'month' ? '%Y-%m' : '%Y-%m-%d';
    const [results] = await db.query(query, [format, startDate, endDate]);
    return results;
  }

  static async getRoomPerformance(startDate, endDate) {
    const query = `
      SELECT 
        r.id,
        r.name,
        COUNT(b.id) as total_bookings,
        SUM(b.total_amount) as total_revenue,
        AVG(DATEDIFF(b.check_out, b.check_in)) as average_stay_length,
        COUNT(DISTINCT b.user_id) as unique_guests
      FROM rooms r
      LEFT JOIN bookings b ON r.id = b.room_id
      WHERE b.created_at BETWEEN ? AND ?
      GROUP BY r.id
      ORDER BY total_revenue DESC
    `;

    const [results] = await db.query(query, [startDate, endDate]);
    return results;
  }

  static async getCustomerInsights() {
    const query = `
      SELECT 
        u.id,
        COUNT(b.id) as total_bookings,
        SUM(b.total_amount) as total_spent,
        AVG(b.total_amount) as average_booking_value,
        MAX(b.created_at) as last_booking_date
      FROM users u
      LEFT JOIN bookings b ON u.id = b.user_id
      GROUP BY u.id
      ORDER BY total_spent DESC
    `;

    const [results] = await db.query(query);
    return results;
  }

  static async getOccupancyRates(startDate, endDate) {
    const query = `
      SELECT 
        DATE(check_in) as date,
        COUNT(DISTINCT room_id) as rooms_occupied,
        (COUNT(DISTINCT room_id) / (SELECT COUNT(*) FROM rooms)) * 100 as occupancy_rate
      FROM bookings
      WHERE check_in BETWEEN ? AND ?
      GROUP BY date
      ORDER BY date
    `;

    const [results] = await db.query(query, [startDate, endDate]);
    return results;
  }

  static async getRevenueMetrics(startDate, endDate) {
    const query = `
      SELECT 
        payment_method,
        COUNT(*) as transaction_count,
        SUM(total_amount) as total_revenue,
        AVG(total_amount) as average_transaction,
        MIN(total_amount) as min_transaction,
        MAX(total_amount) as max_transaction
      FROM bookings
      WHERE created_at BETWEEN ? AND ?
      GROUP BY payment_method
    `;

    const [results] = await db.query(query, [startDate, endDate]);
    return results;
  }
}

module.exports = AnalyticsService; 