const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { calculateDueDate, normalizePhone } = require('../utils/businessRules');

// 1. GET: Lấy danh sách phiếu bảo hành (Phục vụ UC07 - Màn hình 1)
router.get('/', async (req, res) => {
  try {
    const { phone, status, priority } = req.query;
    let queryText = `
      SELECT t.*, c.full_name as customer_name, c.phone, d.device_name 
      FROM ticket t
      JOIN customer c ON t.customer_id = c.customer_id
      JOIN device d ON t.device_id = d.device_id
      WHERE 1=1
    `;
    let queryParams = [];
    let paramIndex = 1;

    if (phone) {
      queryText += ` AND c.phone LIKE $${paramIndex++}`;
      queryParams.push(`%${phone}%`);
    }
    if (status && status !== 'Tất cả') {
      queryText += ` AND t.status = $${paramIndex++}`;
      queryParams.push(status);
    }
    if (priority && priority !== 'Tất cả') {
      queryText += ` AND t.priority = $${paramIndex++}`;
      queryParams.push(priority);
    }

    queryText += ` ORDER BY t.ticket_id DESC`;

    const result = await db.query(queryText, queryParams);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. POST: Tạo mới yêu cầu bảo hành (Phục vụ UC01 -> UC06 - Màn hình 2)
router.post('/', async (req, res) => {
  try {
    const { phone, full_name, serial_number, device_name, purchase_date, category_id, center_id, issue_desc, priority } = req.body;
    
    // Chuẩn hóa số điện thoại theo QT02
    const normalizedPhone = normalizePhone(phone);
    if (!/^0[0-9]{9}$/.test(normalizedPhone)) {
      return res.status(400).json({ success: false, error: 'Số điện thoại không hợp lệ (phải có 10 chữ số và bắt đầu bằng số 0 theo QT02).' });
    }

    // Kiểm tra khách hàng tồn tại hay chưa theo QT01
    let customerResult = await db.query('SELECT * FROM customer WHERE phone = $1', [normalizedPhone]);
    let customerId;

    if (customerResult.rows.length > 0) {
      customerId = customerResult.rows[0].customer_id;
    } else {
      const newCust = await db.query(
        'INSERT INTO customer (full_name, phone) VALUES ($1, $2) RETURNING customer_id',
        [full_name || 'Khách lẻ', normalizedPhone]
      );
      customerId = newCust.rows[0].customer_id;
    }

    // Kiểm tra hoặc thêm thiết bị (QT03) - KHẮC PHỤC LỖI TẠI ĐÂY
    let deviceResult = await db.query('SELECT * FROM device WHERE serial_number = $1', [serial_number]);
    let resolvedDeviceId;

    if (deviceResult.rows.length > 0) {
      resolvedDeviceId = deviceResult.rows[0].device_id;
    } else {
      const newDev = await db.query(
        'INSERT INTO device (customer_id, serial_number, device_name, purchase_date) VALUES ($1, $2, $3, $4) RETURNING device_id',
        [customerId, serial_number, device_name || 'Thiết bị bảo hành', purchase_date || null]
      );
      resolvedDeviceId = newDev.rows[0].device_id;
    }

    // Xác định trạng thái và kiểm tra bảo hành (QT05)
    const isVerified = purchase_date ? true : false;
    const initialStatus = 'Mới tiếp nhận';

    // Tự động tính hạn cam kết theo QT04
    const dueDate = calculateDueDate(priority || 'TRUNG_BINH');

    // Tạo phiếu bảo hành (Ticket)
    const ticketResult = await db.query(
      `INSERT INTO ticket (customer_id, device_id, category_id, center_id, issue_desc, priority, status, is_verified, due_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [customerId, resolvedDeviceId, category_id, center_id || 1, issue_desc, priority || 'TRUNG_BINH', initialStatus, isVerified, dueDate]
    );

    const newTicket = ticketResult.rows[0];

    // Ghi lịch sử trạng thái theo QT06
    await db.query(
      `INSERT INTO ticket_status_log (ticket_id, from_status, to_status, note) VALUES ($1, $2, $3, $4)`,
      [newTicket.ticket_id, null, initialStatus, 'Tiếp nhận yêu cầu bảo hành ban đầu']
    );

    res.status(201).json({ success: true, message: 'Tạo phiếu bảo hành thành công!', data: newTicket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;