const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { name, email, password, phone } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, phone]
    );

    return result.insertId;
  }

  static async findByEmail(email) {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return users[0];
  }

  static async findById(id) {
    const [users] = await db.query(
      'SELECT id, name, email, role, phone, created_at FROM users WHERE id = ?',
      [id]
    );
    return users[0];
  }

  static async update(id, userData) {
    const { name, email, phone } = userData;
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
      [name, email, phone, id]
    );
    return result.affectedRows > 0;
  }

  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await db.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return result.affectedRows > 0;
  }

  static async getFavoriteRooms(userId) {
    const [rooms] = await db.query(
      `SELECT r.*, f.created_at as favorited_at
       FROM rooms r
       JOIN favorites f ON r.id = f.room_id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
      [userId]
    );
    return rooms;
  }
}

module.exports = User; 