const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Cho phép Frontend gọi API
app.use(cors());

// Phân tích dữ liệu JSON từ request
app.use(express.json());

// Phục vụ các file giao diện trong thư mục src/public
app.use(express.static(path.join(__dirname, 'public')));

// Phục vụ các module JavaScript dùng cho frontend
app.use('/api-client', express.static(path.join(__dirname, 'api')));

// Khai báo Routes
const ticketRoutes = require('./routes/ticketRoutes');
const customerRoutes = require('./routes/customerRoutes');

app.use('/api/tickets', ticketRoutes);
app.use('/api/customers', customerRoutes);

// Kiểm tra server
app.get('/health', (req, res) => {
  res.json({
    status: 'ok'
  });
});

// Kiểm tra kết nối PostgreSQL
app.get('/health/db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW() AS current_time');

    res.json({
      status: 'ok',
      database: 'connected',
      time: result.rows[0].current_time
    });
  } catch (err) {
    console.error('Lỗi kết nối database:', err.message);

    res.status(500).json({
      status: 'error',
      database: 'disconnected'
    });
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});