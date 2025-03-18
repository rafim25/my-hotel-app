const db = require('../config/database');

class Review {
  static async create(reviewData) {
    const { user_id, room_id, booking_id, rating, comment } = reviewData;

    const [result] = await db.query(
      'INSERT INTO reviews (user_id, room_id, booking_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
      [user_id, room_id, booking_id, rating, comment]
    );

    return result.insertId;
  }

  static async getRoomReviews(roomId) {
    const [reviews] = await db.query(
      `SELECT r.*, u.name as user_name
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.room_id = ?
       ORDER BY r.created_at DESC`,
      [roomId]
    );
    return reviews;
  }

  static async getUserReviews(userId) {
    const [reviews] = await db.query(
      `SELECT r.*, rm.name as room_name, rm.image
       FROM reviews r
       JOIN rooms rm ON r.room_id = rm.id
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC`,
      [userId]
    );
    return reviews;
  }

  static async getRoomRatingStats(roomId) {
    const [stats] = await db.query(
      `SELECT 
        COUNT(*) as total_reviews,
        AVG(rating) as average_rating,
        COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star,
        COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star,
        COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star,
        COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star,
        COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star
       FROM reviews
       WHERE room_id = ?`,
      [roomId]
    );
    return stats[0];
  }
}

module.exports = Review; 