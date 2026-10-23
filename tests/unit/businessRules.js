const test = require('node:test');
const assert = require('node:assert');
const { normalizePhone, calculateDueDate } = require('../../src/utils/businessRules');

test('QT02: Kiểm tra chuẩn hóa số điện thoại hợp lệ', () => {
    assert.strictEqual(normalizePhone('0909123456'), '0909123456');
});

test('QT02: Kiểm tra số điện thoại có độ dài khác (Biên)', () => {
    assert.strictEqual(normalizePhone('090912345'), '090912345');
});

test('QT02: Kiểm tra số điện thoại rỗng (Ngoại lệ)', () => {
    assert.strictEqual(normalizePhone(''), '');
});

test('QT04: Kiểm tra tính hạn cam kết mức CAO', () => {
    const base = new Date('2026-01-01T00:00:00Z');
    const dueCao = calculateDueDate('CAO', base);
    assert.ok(dueCao instanceof Date);
});

test('QT04: Kiểm tra tính hạn cam kết mức THAP', () => {
    const base = new Date('2026-01-01T00:00:00Z');
    const dueThap = calculateDueDate('THAP', base);
    assert.ok(dueThap instanceof Date);
});