const express = require('express');
const router = express.Router();
const customerService = require('../services/customerService');

// GET /api/customers - Lấy danh sách khách hàng
router.get('/', async (req, res) => {
  try {
    const data = await customerService.getAll();
    res.json({ success: true, data });
  } catch (err) {
    console.error('Get customers error:', err.message);
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.statusCode ? err.message : 'Không thể lấy danh sách khách hàng.'
    });
  }
});

// GET /api/customers/:id - Xem chi tiết khách hàng
router.get('/:id', async (req, res) => {
  try {
    const data = await customerService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    console.error('Get customer error:', err.message);
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.statusCode ? err.message : 'Không thể lấy thông tin khách hàng.'
    });
  }
});

// POST /api/customers - Thêm khách hàng
router.post('/', async (req, res) => {
  try {
    const data = await customerService.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Thêm khách hàng thành công.',
      data
    });
  } catch (err) {
    console.error('Create customer error:', err.message);
    res.status(err.statusCode || (err.code === '23505' ? 409 : 500)).json({
      success: false,
      error: err.statusCode
        ? err.message
        : err.code === '23505'
          ? 'Số điện thoại đã tồn tại.'
          : 'Không thể thêm khách hàng.'
    });
  }
});

// PUT /api/customers/:id - Cập nhật khách hàng
router.put('/:id', async (req, res) => {
  try {
    const data = await customerService.update(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Cập nhật khách hàng thành công.',
      data
    });
  } catch (err) {
    console.error('Update customer error:', err.message);
    res.status(err.statusCode || (err.code === '23505' ? 409 : 500)).json({
      success: false,
      error: err.statusCode
        ? err.message
        : err.code === '23505'
          ? 'Số điện thoại đã tồn tại.'
          : 'Không thể cập nhật khách hàng.'
    });
  }
});

// DELETE /api/customers/:id - Xóa khách hàng
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await customerService.delete(req.params.id);

    if (!deleted) {
      return res.status(409).json({
        success: false,
        error: 'Không thể xóa khách hàng.'
      });
    }

    res.json({
      success: true,
      message: 'Xóa khách hàng thành công.'
    });
  } catch (err) {
    console.error('Delete customer error:', err.message);

    if (err.code === '23503') {
      return res.status(409).json({
        success: false,
        error: 'Không thể xóa khách hàng đang có thiết bị hoặc phiếu bảo hành.'
      });
    }

    res.status(err.statusCode || 500).json({
      success: false,
      error: err.statusCode ? err.message : 'Không thể xóa khách hàng.'
    });
  }
});

module.exports = router;