const express = require('express');
const router = express.Router();
const ticketService = require('../services/ticketService');

// GET /api/tickets - Lấy danh sách phiếu bảo hành
router.get('/', async (req, res) => {
  try {
    const data = await ticketService.getAll(req.query);
    res.json({ success: true, data });
  } catch (err) {
    console.error('Get tickets error:', err.message);
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.statusCode ? err.message : 'Không thể lấy danh sách phiếu bảo hành.'
    });
  }
});

// GET /api/tickets/:id - Lấy chi tiết và lịch sử trạng thái
router.get('/:id', async (req, res) => {
  try {
    const result = await ticketService.getById(req.params.id);

    res.json({
      success: true,
      ticket: result.ticket,
      logs: result.logs
    });
  } catch (err) {
    console.error('Get ticket detail error:', err.message);
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.statusCode ? err.message : 'Không thể lấy chi tiết phiếu bảo hành.'
    });
  }
});

// POST /api/tickets - Tạo phiếu bảo hành
router.post('/', async (req, res) => {
  try {
    const data = await ticketService.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Tạo phiếu bảo hành thành công!',
      data
    });
  } catch (err) {
    console.error('Create ticket error:', err.message);
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.statusCode ? err.message : 'Không thể tạo phiếu bảo hành.'
    });
  }
});

// PUT /api/tickets/:id - Cập nhật phiếu bảo hành
router.put('/:id', async (req, res) => {
  try {
    const data = await ticketService.update(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Cập nhật phiếu bảo hành thành công!',
      data
    });
  } catch (err) {
    console.error('Update ticket error:', err.message);
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.statusCode ? err.message : 'Không thể cập nhật phiếu bảo hành.'
    });
  }
});

// DELETE /api/tickets/:id - Xóa phiếu bảo hành
router.delete('/:id', async (req, res) => {
  try {
    await ticketService.delete(req.params.id);

    res.json({
      success: true,
      message: 'Xóa phiếu bảo hành thành công!'
    });
  } catch (err) {
    console.error('Delete ticket error:', err.message);
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.statusCode ? err.message : 'Không thể xóa phiếu bảo hành.'
    });
  }
});

module.exports = router;