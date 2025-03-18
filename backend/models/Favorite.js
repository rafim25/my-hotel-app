const db = require('../config/database');

class Favorite {
  static async toggleFavorite(userId, roomId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Check if already favorited
      const [existing] = await connection.query(
        'SELECT * FROM favorites WHERE user_id = ? AND room_id = ?',
        [userId, roomId]
      );

      if (existing.length > 0) {
        // Remove from favorites
        await connection.query(
          'DELETE FROM favorites WHERE user_id = ? AND room_id = ?',
          [userId, roomId]
        );
        await connection.commit();
        return { action: 'removed' };
      } else {
        // Add to favorites
        await connection.query(
          'INSERT INTO favorites (user_id, room_id) VALUES (?, ?)',
          [userId, roomId]
        );
        await connection.commit();
        return { action: 'added' };
      }
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getUserFavorites(userId) {
    const [favorites] = await db.query(
      `SELECT r.*, f.created_at as favorited_at
       FROM rooms r
       JOIN favorites f ON r.id = f.room_id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
      [userId]
    );
    return favorites;
  }

  static async checkIsFavorite(userId, roomId) {
    const [result] = await db.query(
      'SELECT COUNT(*) as count FROM favorites WHERE user_id = ? AND room_id = ?',
      [userId, roomId]
    );
    return result[0].count > 0;
  }
}

module.exports = Favorite; 