// Hàm tính hạn cam kết tuân thủ quy tắc QT04
// Chỉ tính ngày làm việc từ Thứ 2 đến Thứ 7
function calculateDueDate(priority, baseDate = new Date()) {
  let hoursToAdd = 24; // CAO: 24 giờ

  if (priority === 'TRUNG_BINH') {
    hoursToAdd = 72;
  } else if (priority === 'THAP') {
    hoursToAdd = 120;
  }

  let currentDate = new Date(baseDate.getTime());
  let hoursAdded = 0;

  while (hoursAdded < hoursToAdd) {
    currentDate.setHours(currentDate.getHours() + 1);

    const dayOfWeek = currentDate.getDay();
    // Chủ Nhật (0) không được tính là ngày làm việc
    if (dayOfWeek !== 0) {
      hoursAdded++;
    }
  }

  return currentDate;
}

// Hàm chuẩn hóa số điện thoại theo QT02
// Kết quả chuẩn hóa về 10 chữ số, bắt đầu bằng số 0
function normalizePhone(phone) {
  if (phone === null || phone === undefined || phone === '') {
    return '';
  }

  // Loại bỏ dấu cách, dấu chấm, dấu + và các ký tự không phải số
  let cleaned = String(phone).replace(/\D/g, '');

  // Chuyển đầu số quốc tế 84 thành 0
  // Ví dụ: 84909123456 -> 0909123456
  if (cleaned.startsWith('84') && cleaned.length === 11) {
    cleaned = '0' + cleaned.slice(2);
  }

  // Bổ sung số 0 nếu số điện thoại có 9 chữ số
  if (cleaned.length === 9) {
    cleaned = '0' + cleaned;
  }

  return cleaned;
}

module.exports = {
  calculateDueDate,
  normalizePhone
};