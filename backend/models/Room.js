const db = require('../config/database');

class Room {
  static async create(roomData) {
    const { category_id, name, description, price, capacity, size, bed_type, image, amenities } = roomData;

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Insert room
      const [result] = await connection.query(
        `INSERT INTO rooms (category_id, name, description, price, capacity, size, bed_type, image)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [category_id, name, description, price, capacity, size, bed_type, image]
      );

      // Add amenities if provided
      if (amenities && amenities.length) {
        const values = amenities.map(amenityId => [result.insertId, amenityId]);
        await connection.query(
          'INSERT INTO room_amenities (room_id, amenity_id) VALUES ?',
          [values]
        );
      }

      await connection.commit();
      return result.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async findById(id) {
    const [room] = await db.query(
      `SELECT r.*, 
        GROUP_CONCAT(DISTINCT a.name) as amenities,
        GROUP_CONCAT(DISTINCT ri.image_url) as images
       FROM rooms r
       LEFT JOIN room_amenities ra ON r.id = ra.room_id
       LEFT JOIN amenities a ON ra.amenity_id = a.id
       LEFT JOIN room_images ri ON r.id = ri.room_id
       WHERE r.id = ?
       GROUP BY r.id`,
      [id]
    );
    return room[0];
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT r.*, c.name as category_name
      FROM rooms r
      LEFT JOIN room_categories c ON r.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.category_id) {
      query += ' AND r.category_id = ?';
      params.push(filters.category_id);
    }

    if (filters.price_min) {
      query += ' AND r.price >= ?';
      params.push(filters.price_min);
    }

    if (filters.price_max) {
      query += ' AND r.price <= ?';
      params.push(filters.price_max);
    }

    if (filters.capacity) {
      query += ' AND r.capacity >= ?';
      params.push(filters.capacity);
    }

    const [rooms] = await db.query(query, params);
    return rooms;
  }

  static async checkAvailability(roomId, checkIn, checkOut) {
    const [bookings] = await db.query(
      `SELECT COUNT(*) as count
       FROM bookings
       WHERE room_id = ?
       AND status != 'cancelled'
       AND ((check_in BETWEEN ? AND ?)
       OR (check_out BETWEEN ? AND ?)
       OR (check_in <= ? AND check_out >= ?))`,
      [roomId, checkIn, checkOut, checkIn, checkOut, checkIn, checkOut]
    );
    return bookings[0].count === 0;
  }

  static async update(id, roomData) {
    const { name, description, price, capacity, size, bed_type, image, status } = roomData;
    const [result] = await db.query(
      `UPDATE rooms
       SET name = ?, description = ?, price = ?, capacity = ?, 
           size = ?, bed_type = ?, image = ?, status = ?
       WHERE id = ?`,
      [name, description, price, capacity, size, bed_type, image, status, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM rooms WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Room; 