const customerRepository = require('../repositories/customerRepository');
const { normalizePhone } = require('../utils/businessRules');

const customerService = {
  // Lấy danh sách khách hàng
  async getAll() {
    return customerRepository.findAll();
  },

  // Lấy chi tiết khách hàng
  async getById(customerId) {
    if (!/^\d+$/.test(String(customerId)) || Number(customerId) <= 0) {
      const error = new Error('Mã khách hàng không hợp lệ.');
      error.statusCode = 400;
      throw error;
    }

    const customer = await customerRepository.findById(customerId);

    if (!customer) {
      const error = new Error('Không tìm thấy khách hàng.');
      error.statusCode = 404;
      throw error;
    }

    return customer;
  },

  // Thêm khách hàng
  async create(input = {}) {
    const fullName = String(input.full_name || '').trim();
    const phone = normalizePhone(input.phone);

    if (!fullName) {
      const error = new Error('Vui lòng nhập họ tên khách hàng.');
      error.statusCode = 400;
      throw error;
    }

    if (fullName.length > 100) {
      const error = new Error('Họ tên không được vượt quá 100 ký tự.');
      error.statusCode = 400;
      throw error;
    }

    if (!/^0[0-9]{9}$/.test(phone)) {
      const error = new Error(
        'Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.'
      );
      error.statusCode = 400;
      throw error;
    }

    return customerRepository.create({
      full_name: fullName,
      phone
    });
  },

  // Cập nhật khách hàng
  async update(customerId, input = {}) {
    if (!/^\d+$/.test(String(customerId)) || Number(customerId) <= 0) {
      const error = new Error('Mã khách hàng không hợp lệ.');
      error.statusCode = 400;
      throw error;
    }

    const fullName = String(input.full_name || '').trim();
    const phone = normalizePhone(input.phone);

    if (!fullName) {
      const error = new Error('Vui lòng nhập họ tên khách hàng.');
      error.statusCode = 400;
      throw error;
    }

    if (fullName.length > 100) {
      const error = new Error('Họ tên không được vượt quá 100 ký tự.');
      error.statusCode = 400;
      throw error;
    }

    if (!/^0[0-9]{9}$/.test(phone)) {
      const error = new Error(
        'Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.'
      );
      error.statusCode = 400;
      throw error;
    }

    await this.getById(customerId);

    return customerRepository.update(customerId, {
      full_name: fullName,
      phone
    });
  },

  // Xóa khách hàng
  async delete(customerId) {
    await this.getById(customerId);
    return customerRepository.delete(customerId);
  }
};

module.exports = customerService;