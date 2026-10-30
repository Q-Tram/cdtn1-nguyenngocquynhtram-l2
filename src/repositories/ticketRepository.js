const db = require('../config/database');

const ticketRepository = {
  async findAll({ phone, status, priority } = {}) {
    let query = `
      SELECT t.*, c.full_name AS customer_name, c.phone, d.device_name
      FROM ticket t
      JOIN customer c ON t.customer_id = c.customer_id
      JOIN device d ON t.device_id = d.device_id
      WHERE 1 = 1
    `;
    const params = [];

    if (phone) {
      params.push(`%${phone}%`);
      query += ` AND c.phone LIKE $${params.length}`;
    }

    if (status && status !== 'Tất cả') {
      params.push(status);
      query += ` AND t.status = $${params.length}`;
    }

    if (priority && priority !== 'Tất cả') {
      params.push(priority);
      query += ` AND t.priority = $${params.length}`;
    }

    query += ' ORDER BY t.ticket_id DESC';

    const result = await db.query(query, params);
    return result.rows;
  },

  async findById(ticketId) {
    const result = await db.query(
      `SELECT t.*, c.full_name, c.phone, d.device_name,
              d.serial_number, d.purchase_date, ic.category_name
       FROM ticket t
       JOIN customer c ON t.customer_id = c.customer_id
       JOIN device d ON t.device_id = d.device_id
       JOIN issue_category ic ON t.category_id = ic.category_id
       WHERE t.ticket_id = $1`,
      [ticketId]
    );

    return result.rows[0] || null;
  },

  async findStatusLogs(ticketId) {
    const result = await db.query(
      `SELECT *
       FROM ticket_status_log
       WHERE ticket_id = $1
       ORDER BY changed_at ASC`,
      [ticketId]
    );

    return result.rows;
  },

  async create(data) {
    const client = await db.pool.connect();

    try {
      await client.query('BEGIN');

      let customerResult = await client.query(
        'SELECT customer_id FROM customer WHERE phone = $1',
        [data.phone]
      );

      let customerId;

      if (customerResult.rows.length > 0) {
        customerId = customerResult.rows[0].customer_id;
      } else {
        customerResult = await client.query(
          `INSERT INTO customer (full_name, phone)
           VALUES ($1, $2)
           RETURNING customer_id`,
          [data.full_name || 'Khách lạ', data.phone]
        );

        customerId = customerResult.rows[0].customer_id;
      }

      let deviceResult = await client.query(
        'SELECT device_id FROM device WHERE serial_number = $1',
        [data.serial_number]
      );

      let deviceId;

      if (deviceResult.rows.length > 0) {
        deviceId = deviceResult.rows[0].device_id;
      } else {
        deviceResult = await client.query(
          `INSERT INTO device
             (customer_id, serial_number, device_name, purchase_date)
           VALUES ($1, $2, $3, $4)
           RETURNING device_id`,
          [
            customerId,
            data.serial_number,
            data.device_name || 'Thiết bị bảo hành',
            data.purchase_date || null
          ]
        );

        deviceId = deviceResult.rows[0].device_id;
      }

      const ticketResult = await client.query(
        `INSERT INTO ticket
           (customer_id, device_id, category_id, center_id, issue_desc,
            priority, status, is_verified, due_date)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          customerId,
          deviceId,
          data.category_id,
          data.center_id || 1,
          data.issue_desc,
          data.priority,
          'Mới tiếp nhận',
          Boolean(data.purchase_date),
          data.due_date
        ]
      );

      const ticket = ticketResult.rows[0];

      await client.query(
        `INSERT INTO ticket_status_log
           (ticket_id, from_status, to_status, note)
         VALUES ($1, $2, $3, $4)`,
        [
          ticket.ticket_id,
          null,
          'Mới tiếp nhận',
          'Tiếp nhận yêu cầu bảo hành ban đầu'
        ]
      );

      await client.query('COMMIT');
      return ticket;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  async update(ticketId, data) {
    const result = await db.query(
      `UPDATE ticket
       SET category_id = $1,
           center_id = $2,
           issue_desc = $3,
           priority = $4,
           due_date = $5
       WHERE ticket_id = $6
       RETURNING *`,
      [
        data.category_id,
        data.center_id,
        data.issue_desc,
        data.priority,
        data.due_date,
        ticketId
      ]
    );

    return result.rows[0] || null;
  },

  async delete(ticketId) {
    const client = await db.pool.connect();

    try {
      await client.query('BEGIN');

      await client.query(
        'DELETE FROM ticket_status_log WHERE ticket_id = $1',
        [ticketId]
      );

      const result = await client.query(
        'DELETE FROM ticket WHERE ticket_id = $1 RETURNING ticket_id',
        [ticketId]
      );

      await client.query('COMMIT');
      return result.rowCount > 0;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
};

module.exports = ticketRepository;