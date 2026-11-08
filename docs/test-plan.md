# TEST PLAN – SMART CRM MEKONG MOBILE

**Dự án:** Smart CRM – Mekong Mobile  
**Luồng nghiệp vụ:** L2 – Tiếp nhận và phân loại yêu cầu bảo hành  
**Loại kiểm thử:** Kiểm thử chức năng, kiểm thử dữ liệu, kiểm thử tích hợp và kiểm thử khả năng tái lập  
**Môi trường:** Node.js, Express.js, PostgreSQL  
**Phiên bản:** 1.0

---

## 1. Phạm vi kiểm thử (Test Scope)

### 1.1. Trong phạm vi kiểm thử

Tập trung kiểm thử luồng L2 – Tiếp nhận và phân loại yêu cầu bảo hành, bao gồm:

- Chuẩn hóa và kiểm tra thông tin khách hàng thông qua số điện thoại.
- Kiểm tra thông tin thiết bị thông qua số serial.
- Kiểm tra nhóm sự cố và mô tả sự cố.
- Kiểm tra mức độ ưu tiên: CAO, TRUNG_BINH, THAP.
- Kiểm tra việc tự động tính thời hạn cam kết (SLA).
- Kiểm tra tạo phiếu bảo hành và trạng thái ban đầu.
- Kiểm tra ghi nhận lịch sử trạng thái khi tạo phiếu.
- Kiểm tra tra cứu chi tiết và cập nhật phiếu bảo hành.
- Kiểm tra tính toàn vẹn dữ liệu giữa khách hàng, thiết bị, phiếu bảo hành và lịch sử trạng thái.
- Kiểm tra xử lý dữ liệu đầu vào không hợp lệ và mã tham chiếu không tồn tại.
- Kiểm tra khả năng chạy lại migration và seed mà không phát sinh dữ liệu trùng lặp.
- Kiểm tra khả năng tái lập kết quả kiểm thử và kiểm tra lại sau khi sửa lỗi.

### 1.2. Ngoài phạm vi kiểm thử

- Thanh toán phí sửa chữa.
- Quản lý linh kiện và kho phụ tùng.
- Quy trình sửa chữa chi tiết.
- Ứng dụng di động độc lập.
- Tích hợp hệ thống bảo hành của nhà sản xuất.
- Kiểm thử tải và hiệu năng quy mô lớn.
- Kiểm thử phân quyền người dùng do hệ thống chưa triển khai đầy đủ cơ chế xác thực và phân quyền.

## 2. Loại kiểm thử và số lượng dự kiến

Kế hoạch gồm **12 test case**, được chia thành 5 nhóm kiểm thử:

| Loại kiểm thử | Số lượng | Nội dung |
|---|---:|---|
| Happy Path | 3 | Tạo, tra cứu và cập nhật phiếu với dữ liệu hợp lệ |
| Boundary Testing | 2 | Kiểm tra chuẩn hóa số điện thoại có 9 và 10 chữ số |
| Invalid Data | 3 | Kiểm tra thiếu mô tả, số điện thoại sai và mức ưu tiên không hợp lệ |
| Data Quality / Integrity | 2 | Kiểm tra mã nhóm sự cố không tồn tại và tính toàn vẹn dữ liệu |
| Reproducibility | 2 | Kiểm tra chạy lại migration và seed, không phát sinh dữ liệu trùng |
| **Tổng cộng** | **12** | |

### 2.1. Phân bổ theo tầng kiểm thử

| Tầng kiểm thử | Số lượng | Phương pháp |
|---|---:|---|
| Unit Testing | 2 | Node.js Test Runner |
| Integration Testing | 3 | Kiểm tra phối hợp giữa các module và PostgreSQL |
| API Testing | 7 | Gửi HTTP request bằng curl trên Command Prompt |
| **Tổng cộng** | **12** | |

Trong phạm vi 12 test case của Test Report, TC-04 và TC-05 là hai trường hợp đại diện cho việc kiểm tra chuẩn hóa số điện thoại ở tầng Unit Testing.

Ngoài 12 test case trên, dự án có bộ kiểm thử tự động tại thư mục `tests/unit/`, bao gồm:

- `tests/unit/businessRules.js`: kiểm tra các quy tắc nghiệp vụ như chuẩn hóa số điện thoại và tính SLA.
- `tests/unit/ticketService.js`: kiểm tra xử lý nghiệp vụ của dịch vụ tạo phiếu, bao gồm trường hợp mã nhóm sự cố không tồn tại.

Toàn bộ kiểm thử tự động được thực hiện bằng lệnh:

```cmd
npm test
```

Kết quả kiểm thử tự động được ghi nhận riêng với kết quả 12 test case trong Test Report. Không cộng số lượng kiểm thử tự động vào tổng số 12 test case của báo cáo.

API Testing tập trung vào các endpoint thuộc luồng L2:

- `POST /api/tickets`: Tạo phiếu bảo hành.
- `GET /api/tickets/:id`: Tra cứu chi tiết phiếu và lịch sử trạng thái.
- `PUT /api/tickets/:id`: Cập nhật phiếu bảo hành.

### 2.2. Danh sách 12 test case

| Mã | Nội dung kiểm thử | Loại kiểm thử | Tầng chính |
|---|---|---|---|
| TC-01 | Tạo phiếu bảo hành với dữ liệu hợp lệ và kiểm tra thời hạn SLA | Happy Path | API |
| TC-02 | Tra cứu chi tiết phiếu bảo hành tồn tại | Happy Path | API |
| TC-03 | Cập nhật thông tin phiếu bảo hành hợp lệ | Happy Path | API |
| TC-04 | Chuẩn hóa số điện thoại có 9 chữ số | Boundary Testing | Unit |
| TC-05 | Chuẩn hóa số điện thoại có 10 chữ số | Boundary Testing | Unit |
| TC-06 | Tạo phiếu khi thiếu mô tả sự cố | Invalid Data | API |
| TC-07 | Tạo phiếu với số điện thoại sai định dạng | Invalid Data | API |
| TC-08 | Tạo phiếu với mức ưu tiên không hợp lệ | Invalid Data | API |
| TC-09 | Tạo phiếu với mã nhóm sự cố không tồn tại | Data Quality | API |
| TC-10 | Kiểm tra tạo phiếu và ghi lịch sử trạng thái trong cùng giao dịch PostgreSQL | Data Quality / Integrity | Integration |
| TC-11 | Chạy lại migration trên cơ sở dữ liệu đã có cấu trúc | Reproducibility | Integration |
| TC-12 | Chạy lại seed và kiểm tra dữ liệu nhóm sự cố không bị nhân đôi | Reproducibility | Integration |

Các test case được xây dựng dựa trên yêu cầu chức năng, tiêu chí chấp nhận, luồng ngoại lệ và quy tắc nghiệp vụ QT02, QT04.

Các kỹ thuật thiết kế kiểm thử được áp dụng:

- **Equivalence Partitioning (Phân vùng tương đương):** chia dữ liệu đầu vào thành nhóm hợp lệ và không hợp lệ. Ví dụ: số điện thoại hợp lệ, số điện thoại sai định dạng; mức ưu tiên hợp lệ và không hợp lệ; mã nhóm sự cố tồn tại và không tồn tại.
- **Boundary Value Analysis (Phân tích giá trị biên):** kiểm tra các trường hợp số điện thoại có 9 và 10 chữ số để xác nhận quy tắc chuẩn hóa và kiểm tra độ dài đầu vào.
- **Negative Testing (Kiểm thử dữ liệu không hợp lệ):** gửi dữ liệu thiếu hoặc sai định dạng để kiểm tra khả năng từ chối dữ liệu của hệ thống.
- **Data Integrity Testing (Kiểm thử toàn vẹn dữ liệu):** đối chiếu dữ liệu trong các bảng liên quan, bảo đảm không phát sinh bản ghi không hợp lệ hoặc dữ liệu tạo dở dang.
- **Reproducibility Testing (Kiểm thử khả năng tái lập):** chạy lại migration và seed trên cơ sở dữ liệu đã tồn tại để xác nhận kết quả ổn định.

Danh sách trên là kế hoạch kiểm thử. Kết quả thực tế PASS/FAIL được ghi nhận trong Test Report sau khi thực thi từng test case.

## 3. Tiêu chí thành công (Success Criteria)

Một test case được đánh giá PASS khi kết quả thực tế đáp ứng kết quả mong đợi và có bằng chứng kiểm thử tương ứng.

| STT | Tiêu chí | Kết quả mong đợi |
|---|---|---|
| 1 | Tạo phiếu hợp lệ | API trả HTTP 201 và phiếu được lưu trong PostgreSQL |
| 2 | Tra cứu phiếu tồn tại | API trả HTTP 200 và thông tin phiếu, lịch sử trạng thái chính xác |
| 3 | Cập nhật phiếu hợp lệ | API trả HTTP 200 và dữ liệu được cập nhật chính xác |
| 4 | Thiếu dữ liệu bắt buộc | API trả HTTP 400 và không tạo phiếu |
| 5 | Số điện thoại không hợp lệ | Hệ thống từ chối dữ liệu không đáp ứng quy tắc chuẩn hóa |
| 6 | Mức ưu tiên không hợp lệ | API trả HTTP 400 và không tạo phiếu |
| 7 | Mã nhóm sự cố không tồn tại | API trả HTTP 400 với thông báo phù hợp và không tạo dữ liệu thiết bị hoặc phiếu mới |
| 8 | Tính thời hạn cam kết | SLA được tính đúng theo mức ưu tiên và quy tắc nghiệp vụ |
| 9 | Ghi nhận lịch sử trạng thái | Có bản ghi lịch sử tương ứng với phiếu vừa tạo |
| 10 | Tính toàn vẹn dữ liệu | Không để lại dữ liệu tạo dở dang khi giao dịch thất bại |
| 11 | Chạy lại migration | Không phát sinh lỗi làm gián đoạn cấu trúc cơ sở dữ liệu hiện có |
| 12 | Chạy lại seed | Không tạo dữ liệu nhóm sự cố trùng lặp |

### 3.1. Điều kiện đánh giá PASS/FAIL

- **PASS:** kết quả thực tế đáp ứng đầy đủ kết quả mong đợi, dữ liệu được kiểm tra đúng và có ảnh chụp màn hình minh chứng.
- **FAIL:** kết quả thực tế không đáp ứng một hoặc nhiều điều kiện mong đợi. Phải ghi rõ hiện tượng, kết quả thực tế và bằng chứng.
- **BUG:** lỗi được xác nhận sau khi đối chiếu kết quả thực tế với yêu cầu hoặc tiêu chí chấp nhận. Mỗi bug phải có mã định danh, mức độ nghiêm trọng, bước tái hiện, nguyên nhân, cách sửa và commit tương ứng.

### 3.2. Điều kiện hoàn thành kiểm thử

- Thực thi đầy đủ 12 test case theo kế hoạch.
- Ghi nhận kết quả PASS/FAIL trung thực trong Test Report.
- Mỗi test case có ảnh chụp màn hình minh chứng trong `docs/screenshots/`.
- Ghi nhận tối thiểu 3 bug được phát hiện và xác nhận trong Bug Log.
- Có ít nhất một bug thuộc mức Critical hoặc Major nếu kết quả kiểm thử thực tế xác nhận mức độ nghiêm trọng đó.
- Mỗi bug được sửa có commit riêng để truy vết thay đổi.
- Thực hiện kiểm thử lại sau khi sửa lỗi và cập nhật kết quả retest.
- Các test case có thể được chạy lại theo tiền điều kiện và dữ liệu đã mô tả.

## 4. Môi trường và dữ liệu kiểm thử (Test Environment & Data)

### 4.1. Môi trường phần mềm

| Thành phần | Công nghệ |
|---|---|
| Hệ điều hành | Microsoft Windows 11 |
| Runtime | Node.js 24.12.0 |
| Package Manager | npm 11.6.2 |
| Backend | Express.js |
| Database | PostgreSQL 16 |
| Database driver | pg |
| Ngôn ngữ lập trình | JavaScript |
| Kiểm thử đơn vị | Node.js Test Runner |
| Kiểm thử API | curl trên Command Prompt |
| Cổng mặc định | 3000 |

### 4.2. Cấu hình cơ sở dữ liệu

- Host: `localhost`.
- Port: `5432`.
- Database: `cdtn1_nguyenngocquynhtram_l2`.
- User: `postgres`.
- Thông tin kết nối được cấu hình trong file `.env`.
- Các bảng sử dụng: `customer`, `device`, `issue_category`, `ticket`, `ticket_status_log`.

Không đưa mật khẩu hoặc thông tin bí mật trong file `.env` vào Test Plan, Test Report hoặc GitHub.

### 4.3. Dữ liệu kiểm thử

Sử dụng dữ liệu giả lập, không sử dụng thông tin cá nhân thật.

| Nhóm dữ liệu | Dữ liệu kiểm thử |
|---|---|
| Số điện thoại 9 chữ số | `901234567` |
| Số điện thoại 10 chữ số | `0901234567` |
| Số điện thoại sai định dạng | `12345` |
| Serial thiết bị | `SERIAL-TEST-001` |
| Nhóm sự cố | Lỗi phần cứng, lỗi phần mềm, lỗi pin và sạc |
| Mã nhóm sự cố không tồn tại | `999999` |
| Mức ưu tiên hợp lệ | `CAO`, `TRUNG_BINH`, `THAP` |
| Mức ưu tiên không hợp lệ | `KHAN_CAP` |
| Mô tả sự cố hợp lệ | Màn hình xuất hiện sọc ngang khi sử dụng |
| Mô tả sự cố bị thiếu | Chuỗi rỗng hoặc không gửi trường `issue_desc` |

Quy tắc SLA trong `src/utils/businessRules.js`:

- CAO: 24 giờ.
- TRUNG_BINH: 72 giờ.
- THAP: 120 giờ.

Hàm tính SLA bỏ qua Chủ Nhật khi cộng giờ; Thứ Bảy vẫn được tính. Kết quả thực tế được đối chiếu với quy tắc trong mã nguồn.

### 4.4. Công cụ hỗ trợ

- Visual Studio Code: đọc và chỉnh sửa mã nguồn.
- Command Prompt: khởi động ứng dụng và thực hiện kiểm thử.
- PostgreSQL: lưu trữ và kiểm tra dữ liệu.
- curl: gửi HTTP request để kiểm thử API.
- Node.js Test Runner: thực hiện kiểm thử đơn vị.
- Git và GitHub: quản lý phiên bản và lưu commit.
- Trình duyệt: kiểm tra giao diện và kết quả hoạt động của ứng dụng.

### 4.5. Chuẩn bị và làm sạch dữ liệu

- Kiểm tra kết nối PostgreSQL và bảo đảm ứng dụng sử dụng đúng cơ sở dữ liệu kiểm thử.
- Chuẩn bị dữ liệu theo đúng tiền điều kiện của từng test case.
- Kiểm tra dữ liệu hiện có trước khi thực hiện kiểm thử.
- Ghi nhận dữ liệu trong PostgreSQL trước và sau khi chạy test case.
- Sử dụng serial riêng cho từng test case để tránh trùng dữ liệu.
- Chỉ làm sạch các bản ghi kiểm thử đã xác định, không xóa dữ liệu mẫu hoặc dữ liệu không thuộc phạm vi kiểm thử.
- Migration và seed được thực hiện trên cơ sở dữ liệu đã chuẩn bị phù hợp; không tự động xóa toàn bộ database.
- Kiểm tra lại dữ liệu sau khi chạy migration hoặc seed để xác nhận không phát sinh bản ghi trùng lặp.
- Lưu ảnh chụp màn hình vào `docs/screenshots/` theo mã test case tương ứng.

---

## Kết luận

Test Plan xác định phạm vi, phương pháp, 12 test case, tiêu chí đánh giá, môi trường và dữ liệu kiểm thử cho luồng L2 – Tiếp nhận và phân loại yêu cầu bảo hành của hệ thống Smart CRM – Mekong Mobile.

Kết quả PASS/FAIL và các bug phát hiện được chỉ được ghi nhận sau khi thực thi kiểm thử thực tế. Mục tiêu của đợt kiểm thử là phát hiện, xác nhận và xử lý tối thiểu 3 bug, bảo đảm mỗi lỗi có bằng chứng, hướng sửa, commit riêng và kết quả kiểm thử lại tương ứng.