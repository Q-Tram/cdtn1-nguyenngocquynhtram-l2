
const test = require('node:test');
const assert = require('node:assert/strict');

const ticketRepository = require('../../src/repositories/ticketRepository');
const ticketService = require('../../src/services/ticketService');

test('BUG-01: Từ chối tạo phiếu khi nhóm sự cố không tồn tại', async () => {
  const originalFindCategoryById = ticketRepository.findCategoryById;
  const originalCreate = ticketRepository.create;

  let createCalled = false;

  ticketRepository.findCategoryById = async () => null;

  ticketRepository.create = async () => {
    createCalled = true;
  };

  try {
    await assert.rejects(
      ticketService.create({
        phone: '0912345678',
        serial_number: 'SERIAL-UNIT-BUG01',
        category_id: 999999,
        issue_desc: 'Test category missing',
        priority: 'TRUNG_BINH'
      }),
      (error) =>
        error.statusCode === 400 &&
        error.message === 'Nhóm sự cố không tồn tại.'
    );

    assert.equal(createCalled, false);
  } finally {
    ticketRepository.findCategoryById = originalFindCategoryById;
    ticketRepository.create = originalCreate;
  }
});

test('BUG-02: Từ chối cập nhật phiếu khi nhóm sự cố không tồn tại', async () => {
  const originalFindById = ticketRepository.findById;
  const originalFindCategoryById = ticketRepository.findCategoryById;
  const originalUpdate = ticketRepository.update;

  let updateCalled = false;

  ticketRepository.findById = async () => ({
    ticket_id: 17,
    category_id: 1,
    center_id: 1,
    issue_desc: 'Loa dien thoai phat am thanh khong ro',
    priority: 'TRUNG_BINH'
  });

  ticketRepository.findCategoryById = async () => null;

  ticketRepository.update = async () => {
    updateCalled = true;
  };

  try {
    await assert.rejects(
      ticketService.update(17, {
        category_id: 999999,
        center_id: 1,
        issue_desc: 'Loa dien thoai phat am thanh khong ro',
        priority: 'TRUNG_BINH'
      }),
      (error) =>
        error.statusCode === 400 &&
        error.message === 'Nhóm sự cố không tồn tại.'
    );

    assert.equal(updateCalled, false);
  } finally {
    ticketRepository.findById = originalFindById;
    ticketRepository.findCategoryById = originalFindCategoryById;
    ticketRepository.update = originalUpdate;
  }
});
