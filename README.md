# cdtn1-nguyenngocquynhtram-l2 – Tiếp nhận và phân loại yêu cầu bảo hành

**Sinh viên:** Nguyễn Ngọc Quỳnh Trâm – 2374802010511 – Track SE

**Học phần:** Chuyên đề Tốt nghiệp 1, HK1 2026–2027

**Luồng nghiệp vụ:** L2 – Tiếp nhận và phân loại yêu cầu bảo hành

## 1. Mục tiêu

Hệ thống hỗ trợ nhân viên tiếp nhận trong việc tiếp nhận và phân loại yêu cầu bảo hành của khách hàng.

Nhân viên có thể tra cứu khách hàng theo số điện thoại, ghi nhận thông tin thiết bị và mô tả lỗi. Hệ thống hỗ trợ phân loại nhóm sự cố, xác định mức ưu tiên và sinh hạn cam kết xử lý.

Mục tiêu là giúp thông tin yêu cầu bảo hành được ghi nhận và theo dõi rõ ràng hơn.

## 2. Yêu cầu môi trường

- Node.js 20 LTS
- PostgreSQL 16
- Git
- Các biến môi trường được khai báo trong file `.env.example`

## 3. Hướng dẫn cài đặt và chạy

### Bước 1. Tải mã nguồn

Clone repository và di chuyển vào thư mục dự án:

```bash
git clone https://github.com/Q-Tram/cdtn1-nguyenngocquynhtram-l2.git
cd cdtn1-nguyenngocquynhtram-l2
```

### Bước 2. Cài đặt thư viện

```bash
npm install
```

### Bước 3. Tạo file cấu hình môi trường

Trên Windows CMD, chạy:

```cmd
copy .env.example .env
```

Mở file `.env` và cập nhật các biến môi trường theo cấu hình PostgreSQL trên máy.

**Lưu ý:** Không đưa file `.env` chứa thông tin bí mật lên GitHub.

### Bước 4. Khởi tạo cơ sở dữ liệu

1. Khởi động PostgreSQL.
2. Tạo database theo cấu hình của dự án.
3. Mở pgAdmin hoặc công cụ quản lý PostgreSQL.
4. Chạy script SQL tạo bảng của dự án nếu đã có.
5. Kiểm tra lại thông tin kết nối trong file `.env`.

**Lưu ý:** Repository hiện chưa tìm thấy tệp có tên chứa `schema`. Cần bổ sung hoặc xác định script SQL khởi tạo cơ sở dữ liệu trước khi hoàn thiện hướng dẫn này.

### Bước 5. Khởi động backend

```bash
node src/server.js
```

### Bước 6. Kiểm tra ứng dụng

Sau khi server khởi động:

- Kiểm tra kết nối cơ sở dữ liệu.
- Kiểm tra các API đã triển khai.
- Mở giao diện theo địa chỉ và cổng được cấu hình trong ứng dụng.
- Thử các chức năng tiếp nhận, xem danh sách và xem chi tiết yêu cầu bảo hành.

## 4. Cấu trúc thư mục

```text
cdtn1-nguyenngocquynhtram-l2/
├── data/
├── docs/
│   ├── srs.md
│   ├── thay-doi-thiet-ke.md
│   └── ai-disclosure.md
├── src/
│   ├── api/
│   ├── config/
│   ├── middleware/
│   ├── public/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
├── tests/
│   └── unit/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 5. Kiểm thử

Chạy các bài kiểm thử bằng lệnh:

```bash
npm test
```

Kiểm tra kết quả đầu ra để xác nhận các bài kiểm thử đã thực hiện thành công.

Các bài kiểm thử tập trung vào việc xác minh quy tắc nghiệp vụ và tính hợp lệ của dữ liệu đầu vào.

## 6. Phạm vi module

Module cốt lõi tập trung vào luồng L2 – Tiếp nhận và phân loại yêu cầu bảo hành, bao gồm:

- Tra cứu khách hàng bằng số điện thoại.
- Ghi nhận thông tin thiết bị.
- Ghi nhận mô tả lỗi.
- Phân loại nhóm sự cố.
- Xác định mức độ ưu tiên.
- Sinh hạn cam kết xử lý.
- Theo dõi thông tin yêu cầu bảo hành theo các chức năng đã triển khai.

Module phân công kỹ thuật viên chưa thuộc phạm vi module cốt lõi đang tập trung trong tài liệu này.

## 7. Trạng thái dự án

- [x] Khởi tạo project và thực hiện smoke test.
- [x] Xây dựng module tiếp nhận yêu cầu bảo hành và giao diện kết nối API.
- [ ] Xác minh đầy đủ các yêu cầu kiểm thử của BT2.
- [ ] Hoàn thiện tài liệu và kiểm tra khả năng chạy dự án từ repository sạch.
- [ ] Hoàn thiện các nội dung còn thiếu theo yêu cầu BT2.

Trạng thái cần được cập nhật dựa trên kết quả triển khai, kiểm thử và đối chiếu với yêu cầu bài tập.

## 8. Tài liệu liên quan

Các tài liệu dự án được lưu trong thư mục `docs/`, bao gồm:

- `srs.md`: Đặc tả yêu cầu phần mềm.
- `thay-doi-thiet-ke.md`: Nhật ký thay đổi thiết kế sau phản hồi BT1.
- `ai-disclosure.md`: Khai báo việc sử dụng công cụ AI trong quá trình thực hiện dự án.
- Các ảnh chụp minh chứng API và luồng chạy của ứng dụng.