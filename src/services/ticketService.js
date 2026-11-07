
const ticketRepository = require('../repositories/ticketRepository');
const { calculateDueDate, normalizePhone } = require('../utils/businessRules');

const VALID_PRIORITIES = ['CAO', 'TRUNG_BINH', 'THAP'];

const ticketService = {
  async getAll(filters) {
    return ticketRepository.findAll(filters);
  },

  async getById(ticketId) {
    if (!/^\d+$/.test(String(ticketId)) || Number(ticketId) <= 0) {
      const error = new Error('Mã phiếu bảo hành không hợp lệ.');
      error.statusCode = 400;
      throw error;
    }

    const ticket = await ticketRepository.findById(ticketId);

    if (!ticket) {
      const error = new Error('Không tìm thấy phiếu bảo hành.');
      error.statusCode = 404;
      throw error;
    }

    const logs = await ticketRepository.findStatusLogs(ticketId);

    return { ticket, logs };
  },

  async create(input = {}) {
    const phone = normalizePhone(input.phone);

    if (!/^0[0-9]{9}$/.test(phone)) {
      const error = new Error(
        'Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.'
      );
      error.statusCode = 400;
      throw error;
    }

    if (!input.serial_number || !String(input.serial_number).trim()) {
      const error = new Error('Vui lòng nhập số serial của thiết bị.');
      error.statusCode = 400;
      throw error;
    }

    if (!input.category_id || !Number.isInteger(Number(input.category_id)) ||
        Number(input.category_id) <= 0) {
      const error = new Error('Nhóm sự cố không hợp lệ.');
      error.statusCode = 400;
      throw error;
    }

    const category = await ticketRepository.findCategoryById(
      Number(input.category_id)
    );

    if (!category) {
      const error = new Error('Nhóm sự cố không tồn tại.');
      error.statusCode = 400;
      throw error;
    }

    if (!input.issue_desc || !String(input.issue_desc).trim()) {
      const error = new Error('Vui lòng nhập mô tả sự cố.');
      error.statusCode = 400;
      throw error;
    }

    const priority = input.priority || 'TRUNG_BINH';

    if (!VALID_PRIORITIES.includes(priority)) {
      const error = new Error('Mức ưu tiên không hợp lệ.');
      error.statusCode = 400;
      throw error;
    }

    const dueDate = calculateDueDate(priority);

    return ticketRepository.create({
      ...input,
      phone,
      serial_number: String(input.serial_number).trim(),
      issue_desc: String(input.issue_desc).trim(),
      category_id: Number(input.category_id),
      priority,
      due_date: dueDate
    });
  },

  async update(ticketId, input = {}) {
    if (!/^\d+$/.test(String(ticketId)) || Number(ticketId) <= 0) {
      const error = new Error('Mã phiếu bảo hành không hợp lệ.');
      error.statusCode = 400;
      throw error;
    }

    if (!input.issue_desc || !String(input.issue_desc).trim()) {
      const error = new Error('Vui lòng nhập mô tả sự cố.');
      error.statusCode = 400;
      throw error;
    }

    if (!VALID_PRIORITIES.includes(input.priority)) {
      const error = new Error('Mức ưu tiên không hợp lệ.');
      error.statusCode = 400;
      throw error;
    }

    const existingTicket = await ticketRepository.findById(ticketId);

    if (!existingTicket) {
      const error = new Error('Không tìm thấy phiếu bảo hành.');
      error.statusCode = 404;
      throw error;
    }

    const dueDate = calculateDueDate(input.priority);

    const updatedTicket = await ticketRepository.update(ticketId, {
      category_id: Number(input.category_id || existingTicket.category_id),
      center_id: Number(input.center_id || existingTicket.center_id),
      issue_desc: String(input.issue_desc).trim(),
      priority: input.priority,
      due_date: dueDate
    });

    return updatedTicket;
  },

  async delete(ticketId) {
    if (!/^\d+$/.test(String(ticketId)) || Number(ticketId) <= 0) {
      const error = new Error('Mã phiếu bảo hành không hợp lệ.');
      error.statusCode = 400;
      throw error;
    }

    const existingTicket = await ticketRepository.findById(ticketId);

    if (!existingTicket) {
      const error = new Error('Không tìm thấy phiếu bảo hành.');
      error.statusCode = 404;
      throw error;
    }

    return ticketRepository.delete(ticketId);
  }
};

module.exports = ticketService;
