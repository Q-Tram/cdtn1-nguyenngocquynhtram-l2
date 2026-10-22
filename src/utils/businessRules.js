// Hàm tính hạn cam kết tuân thủ quy tắc QT04 (chỉ tính ngày làm việc từ Thứ 2 đến Thứ 7)
function calculateDueDate(priority, baseDate = new Date()) {
  let hoursToAdd = 24; // Mặc định CAO
  if (priority === 'TRUNG_BINH') {
    hoursToAdd = 72;
  } else if (priority === 'THAP') {
    hoursToAdd = 120;
  }

  let currentDate = new Date(baseDate.getTime());
  let hoursAdded = 0;

  while (hoursAdded < hoursToAdd) {
    currentDate.setHours(currentDate.getHours() + 1);
    const dayOfWeek = currentDate.getDay(); // 0 là Chủ Nhật, 1-6 là Thứ 2 đến Thứ 7

    // Nếu không phải Chủ Nhật thì mới tính giờ làm việc
    if (dayOfWeek !== 0) {
      hoursAdded++;
    }
  }

  return currentDate;
}

// Hàm chuẩn hóa số điện thoại theo QT02 (10 chữ số, bắt đầu bằng số 0)
function normalizePhone(phone) {
  if (!phone) return '';
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 9 && !cleaned.startsWith('0')) {
    cleaned = '0' + cleaned;
  }
  return cleaned;
}

module.exports = { calculateDueDate, normalizePhone };