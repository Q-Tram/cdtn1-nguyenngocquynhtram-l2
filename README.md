# cdtn1-nguyenngocquynhtram-l2 - Tiếp nhận và phân loại yêu cầu bảo hành

Sinh viên:
Nguyễn Ngọc Quỳnh Trâm - 2374802010511 - Track SE

Học phần:
Chuyên đề Tốt nghiệp 1, HK1 2026-2027

Luồng nghiệp vụ:
L2 – Tiếp nhận và phân loại yêu cầu bảo hành

## 1. Mục tiêu

Hệ thống hỗ trợ nhân viên tiếp nhận trong việc tiếp nhận và phân loại yêu cầu bảo hành của khách hàng.
Nhân viên có thể tra cứu khách hàng theo số điện thoại, ghi nhận thiết bị và mô tả lỗi.
Hệ thống hỗ trợ phân loại nhóm sự cố, xác định mức ưu tiên và sinh hạn cam kết xử lý.
Mục tiêu là giúp thông tin yêu cầu bảo hành được ghi nhận và theo dõi rõ ràng hơn.

## 2. Yêu cầu môi trường

- Node.js 20 LTS
- PostgreSQL 16
- Biến môi trường: xem `.env.example`

## 3. Hướng dẫn chạy (Mỗi bước một lệnh)

1. Tạo file cấu hình môi trường:
   ```bash
   cp .env.example .env
2. Cài đặt các thư viện phụ thuộc:
    npm install
3. Khởi tạo cơ sở dữ liệu:
Chạy đoạn script tạo bảng (Schema) trong pgAdmin hoặc công cụ quản lý PostgreSQL.
4. Khởi động server Backend
node src/server.js
## 4. Cấu trúc thư mục
docs/: Tài liệu dự án và ảnh chụp minh chứng luồng chạy End-to-End.
src/: Mã nguồn ứng dụng (bao gồm api/, routes/, config/, public/, utils/).
tests/: Các bài kiểm thử đơn vị (tests/unit/businessRules.js).
data/: Dữ liệu phục vụ dự án.
.env.example: Mẫu cấu hình biến môi trường.
.gitignore: Danh sách file/thư mục bỏ qua khi push Git.
## 5. Kiểm thử
npm test
## 6. Trạng thái hiện tại
☑ Khởi tạo project, smoke test chạy được (buổi 2)
☑ Module tiếp nhận yêu cầu & Giao diện gọi API thật (buổi 8–10)
☑ Hoàn thành $\ge 5$ unit test kiểm tra quy tắc nghiệp vụ (buổi 10)
□ Module phân công kỹ thuật viên (buổi 10–12)