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