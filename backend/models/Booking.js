const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Booking {
  static async create(bookingData) {
    const { user_id, room_id, check_in, check_out, guests, total_amount, special_requests } = bookingData;
    const booking_reference = uuidv4().substring(0, 8).toUpperCase();

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Create booking
      const [result] = await connection.query(
        `INSERT INTO bookings 
         (user_id, room_id, booking_reference, check_in, check_out, guests, total_amount, special_requests)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, room_id, booking_reference, check_in, check_out, guests, total_amount, special_requests]
      );

      // Update room status
      await connection.query(
        'UPDATE rooms SET status = ? WHERE id = ?',
        ['occupied', room_id]
      );

      await connection.commit();
      return { bookingId: result.insertId, booking_reference };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async findByReference(reference) {
    const [bookings] = await db.query(
      `SELECT b.*, r.name as room_name, r.image, u.name as user_name, u.email
       FROM bookings b
       JOIN rooms r ON b.room_id = r.id
       JOIN users u ON b.user_id = u.id
       WHERE b.booking_reference = ?`,
      [reference]
    );
    return bookings[0];
  }

  static async getUserBookings(userId) {
    const [bookings] = await db.query(
      `SELECT b.*, r.name as room_name, r.image
       FROM bookings b
       JOIN rooms r ON b.room_id = r.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
      [userId]
    );
    return bookings;
  }

  static async updateStatus(id, status) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const [booking] = await connection.query(
        'SELECT room_id FROM bookings WHERE id = ?',
        [id]
      );

      await connection.query(
        'UPDATE bookings SET status = ? WHERE id = ?',
        [status, id]
      );

      if (status === 'cancelled' || status === 'completed') {
        await connection.query(
          'UPDATE rooms SET status = ? WHERE id = ?',
          ['available', booking[0].room_id]
        );
      }

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getBookingStats() {
    const [stats] = await db.query(
      `SELECT 
        COUNT(*) as total_bookings,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed_bookings,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_bookings,
        SUM(total_amount) as total_revenue
       FROM bookings`
    );
    return stats[0];
  }
}

module.exports = Booking; 