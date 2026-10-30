const test = require('node:test');
const assert = require('node:assert/strict');

const {
    normalizePhone,
    calculateDueDate
} = require('../../src/utils/businessRules');

// QT02 - Happy path
test('QT02: Kiểm tra chuẩn hóa số điện thoại hợp lệ', () => {
    assert.strictEqual(normalizePhone('0909123456'), '0909123456');
});

// QT02 - Boundary
test('QT02: Kiểm tra chuẩn hóa số điện thoại có 9 chữ số', () => {
    assert.strictEqual(normalizePhone('909123456'), '0909123456');
});

// QT02 - Invalid data
test('QT02: Kiểm tra số điện thoại rỗng', () => {
    assert.strictEqual(normalizePhone(''), '');
});

// QT02 - Chuẩn hóa mã quốc gia
test('QT02: Chuyển đầu số 84 thành 0', () => {
    assert.strictEqual(normalizePhone('84909123456'), '0909123456');
});

// QT04 - Mức ưu tiên CAO
test('QT04: Mức CAO có hạn cam kết sau 24 giờ làm việc', () => {
    const base = new Date('2026-01-05T00:00:00');
    const due = calculateDueDate('CAO', base);

    assert.equal((due - base) / (1000 * 60 * 60), 24);
});

// QT04 - Mức ưu tiên TRUNG_BINH
test('QT04: Mức TRUNG_BINH có hạn cam kết sau 72 giờ làm việc', () => {
    const base = new Date('2026-01-05T00:00:00');
    const due = calculateDueDate('TRUNG_BINH', base);

    assert.equal((due - base) / (1000 * 60 * 60), 72);
});

// QT04 - Mức ưu tiên THAP
test('QT04: Mức THAP có hạn cam kết sau 120 giờ làm việc', () => {
    const base = new Date('2026-01-05T00:00:00');
    const due = calculateDueDate('THAP', base);

    assert.equal((due - base) / (1000 * 60 * 60), 120);
});