const express = require('express');
const cors = require('cors'); // <-- Thêm dòng này
require('dotenv').config();

const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Thêm dòng kích hoạt CORS ở đây để Frontend (cổng 8080/5500) gọi sang không bị chặn
app.use(cors()); 

// 1. Phải đặt app.use(express.json()) ở trên cùng để phân tích cú pháp JSON trước
app.use(express.json());

// 2. Sau đó mới khai báo các Routes
const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/health/db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW() AS current_time');

    res.json({
      status: 'ok',
      database: 'connected',
      time: result.rows[0].current_time,
    });
  } catch (err) {
    console.error('Lỗi kết nối database:', err.message);

    res.status(500).json({
      status: 'error',
      database: 'disconnected',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});