# cdtn1-nguyenngocquynhtram-l2a# Tiếp nhận và phân loại yêu cầu bảo hành

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

Node.js 20 LTS
PostgreSQL 16

Biến môi trường: xem `.env.example`

## 3. Hướng dẫn chạy

1. `cp .env.example .env` và điền giá trị
2. `npm install`
3. `npm run db:migrate`
4. `npm run dev` → mở `http://localhost:3000/health`

## 4. Cấu trúc thư mục

- `docs/`: tài liệu của dự án.
- `src/`: mã nguồn ứng dụng.
- `tests/`: các bài kiểm thử.
- `data/`: dữ liệu phục vụ dự án.
- `.env.example`: mẫu các biến môi trường.
- `.gitignore`: danh sách các file/thư mục không đưa lên Git.

## 5. Kiểm thử

`npm test` → hiển thị số test PASS.

## 6. Trạng thái hiện tại

☑ Khởi tạo project, smoke test chạy được (buổi 2)

□ Module tiếp nhận yêu cầu (buổi 8–10)

□ Module phân công kỹ thuật viên (buổi 10–12)