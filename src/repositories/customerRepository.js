const db = require('../config/database');

const customerRepository = {
  // Lấy danh sách khách hàng
  async findAll() {
    const result = await db.query(
      `SELECT customer_id, full_name, phone
       FROM customer
       ORDER BY customer_id DESC`
    );

    return result.rows;
  },

  // Lấy chi tiết khách hàng theo ID
  async findById(customerId) {
    const result = await db.query(
      `SELECT customer_id, full_name, phone
       FROM customer
       WHERE customer_id = $1`,
      [customerId]
    );

    return result.rows[0] || null;
  },

  // Thêm khách hàng
  async create(data) {
    const result = await db.query(
      `INSERT INTO customer (full_name, phone)
       VALUES ($1, $2)
       RETURNING customer_id, full_name, phone`,
      [data.full_name, data.phone]
    );

    return result.rows[0];
  },

  // Cập nhật khách hàng
  async update(customerId, data) {
    const result = await db.query(
      `UPDATE customer
       SET full_name = $1,
           phone = $2
       WHERE customer_id = $3
       RETURNING customer_id, full_name, phone`,
      [data.full_name, data.phone, customerId]
    );

    return result.rows[0] || null;
  },

  // Xóa khách hàng
  async delete(customerId) {
    const result = await db.query(
      `DELETE FROM customer
       WHERE customer_id = $1
       RETURNING customer_id`,
      [customerId]
    );

    return result.rowCount > 0;
  }
};

module.exports = customerRepository;