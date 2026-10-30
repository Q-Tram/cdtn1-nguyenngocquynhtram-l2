# SRS – Smart CRM Mekong Mobile

## Track SE – L2: Tiếp nhận và phân loại yêu cầu bảo hành

# 1. Giới thiệu

## 1.1. Mục đích

Hệ thống Smart CRM – Mekong Mobile hỗ trợ Nhân viên tiếp nhận trong việc tra cứu thông tin khách hàng, ghi nhận thông tin thiết bị, ghi nhận mô tả lỗi, phân loại nhóm sự cố, xác định mức ưu tiên và sinh hạn cam kết xử lý yêu cầu bảo hành.

Hệ thống đồng thời hỗ trợ Quản lý trung tâm theo dõi trạng thái và lịch sử trạng thái của các yêu cầu bảo hành.

Tài liệu này mô tả yêu cầu nghiệp vụ, yêu cầu chức năng, yêu cầu phi chức năng, quy tắc nghiệp vụ, Use Case và API liên quan đến luồng L2. Đây là cơ sở để triển khai, kiểm thử và đánh giá hệ thống trong bài tập 2.

## 1.2. Phạm vi nghiệp vụ

Luồng L2 tập trung vào quy trình tiếp nhận và phân loại yêu cầu bảo hành, giải quyết các vấn đề V2 và V8 theo tài liệu yêu cầu của học phần.

Các nghiệp vụ chính:

- Tra cứu khách hàng bằng số điện thoại.
- Ghi nhận thông tin thiết bị.
- Ghi nhận mô tả lỗi.
- Phân loại nhóm sự cố.
- Xác định mức ưu tiên.
- Sinh hạn cam kết xử lý.
- Theo dõi trạng thái yêu cầu bảo hành.
- Xem lịch sử thay đổi trạng thái của phiếu bảo hành.

## 1.3. Phạm vi hệ thống

### Trong phạm vi

- Tra cứu thông tin khách hàng bằng số điện thoại.
- Ghi nhận thông tin thiết bị cần bảo hành.
- Ghi nhận mô tả lỗi do khách hàng cung cấp.
- Phân loại nhóm sự cố.
- Xác định mức ưu tiên của yêu cầu bảo hành.
- Sinh hạn cam kết xử lý.
- Xem trạng thái yêu cầu bảo hành.
- Xem lịch sử trạng thái yêu cầu bảo hành.

### Ngoài phạm vi

- Thanh toán trực tuyến chi phí dịch vụ hoặc sửa chữa.
- Quản lý chi tiết quy trình sửa chữa thiết bị.
- Quản lý linh kiện thay thế.
- Phát triển ứng dụng di động riêng dành cho khách hàng.
- Tích hợp Chatbot hoặc Livechat hỗ trợ tự động.
- Xử lý các nghiệp vụ sửa chữa kỹ thuật và thay thế linh kiện của kỹ thuật viên.

## 1.4. Người dùng chính

| Actor | Vai trò | Giới hạn |
|---|---|---|
| Nhân viên tiếp nhận | Tra cứu khách hàng, ghi nhận thông tin thiết bị và lỗi, phân loại sự cố, xác định mức ưu tiên và hạn cam kết. | Không phụ trách quản lý lịch sử trạng thái của các phiếu bảo hành. |
| Quản lý trung tâm | Theo dõi trạng thái và lịch sử xử lý phiếu bảo hành. | Không trực tiếp tiếp nhận và ghi nhận yêu cầu bảo hành của khách hàng. |

## 1.5. Thực thể dữ liệu liên quan

| Thực thể | Ý nghĩa |
|---|---|
| `customer` | Lưu trữ thông tin khách hàng. |
| `device` | Lưu trữ thông tin thiết bị của khách hàng. |
| `issue_category` | Lưu trữ danh mục nhóm sự cố. |
| `ticket` | Lưu trữ thông tin phiếu yêu cầu bảo hành. |
| `ticket_status_log` | Lưu trữ lịch sử thay đổi trạng thái của phiếu bảo hành. |

Tên bảng trong cơ sở dữ liệu có thể khác tên tài nguyên được sử dụng trong đường dẫn API. Ví dụ, bảng `customer` có thể được truy cập thông qua một endpoint thuộc `/api/customers/...`.

# 2. Danh sách User Story

| Mã | User Story | MoSCoW |
|---|---|---|
| US01 | Là Nhân viên tiếp nhận, tôi muốn tra cứu khách hàng theo số điện thoại để xác định thông tin khách hàng cần tiếp nhận yêu cầu bảo hành. | MUST |
| US02 | Là Nhân viên tiếp nhận, tôi muốn ghi nhận thiết bị của khách hàng để xác định thiết bị cần tiếp nhận bảo hành. | MUST |
| US03 | Là Nhân viên tiếp nhận, tôi muốn ghi nhận mô tả lỗi của thiết bị để lưu lại thông tin sự cố cần bảo hành. | MUST |
| US04 | Là Nhân viên tiếp nhận, tôi muốn phân loại nhóm sự cố để xác định loại vấn đề của thiết bị. | MUST |
| US05 | Là Nhân viên tiếp nhận, tôi muốn xác định mức ưu tiên của yêu cầu bảo hành để xử lý yêu cầu theo mức độ cần thiết. | SHOULD |
| US06 | Là Nhân viên tiếp nhận, tôi muốn sinh hạn cam kết cho yêu cầu bảo hành để xác định thời hạn xử lý yêu cầu. | MUST |
| US07 | Là Quản lý trung tâm, tôi muốn xem trạng thái của các yêu cầu bảo hành để theo dõi tình hình tiếp nhận và phân loại yêu cầu. | SHOULD |
| US08 | Là Quản lý trung tâm, tôi muốn xem lịch sử trạng thái của yêu cầu bảo hành để theo dõi quá trình thay đổi trạng thái của yêu cầu. | SHOULD |

## 2.1. Acceptance Criteria cho các User Story MUST

### US01 – Tra cứu khách hàng theo số điện thoại

**AC01 – Thành công**

- **Given:** Nhân viên tiếp nhận có số điện thoại của khách hàng đã tồn tại trong hệ thống.
- **When:** Nhân viên nhập số điện thoại và thực hiện tra cứu.
- **Then:** Hệ thống hiển thị thông tin khách hàng tương ứng.

**AC02 – Ngoại lệ**

- **Given:** Số điện thoại chưa tồn tại trong hệ thống.
- **When:** Nhân viên thực hiện tra cứu.
- **Then:** Hệ thống thông báo không tìm thấy khách hàng.

### US02 – Ghi nhận thiết bị

**AC01 – Thành công**

- **Given:** Nhân viên đã xác định được khách hàng.
- **When:** Nhân viên nhập thông tin thiết bị hợp lệ và thực hiện lưu yêu cầu bảo hành.
- **Then:** Hệ thống ghi nhận thông tin thiết bị và liên kết thiết bị với khách hàng, phiếu bảo hành theo mô hình dữ liệu.

**AC02 – Ngoại lệ**

- **Given:** Thông tin thiết bị bắt buộc chưa được nhập đầy đủ.
- **When:** Nhân viên thực hiện lưu yêu cầu bảo hành.
- **Then:** Hệ thống thông báo thông tin thiết bị chưa đầy đủ và không ghi nhận dữ liệu không hợp lệ.

### US03 – Ghi nhận mô tả lỗi

**AC01 – Thành công**

- **Given:** Nhân viên đã có thông tin thiết bị cần bảo hành.
- **When:** Nhân viên nhập mô tả lỗi hợp lệ và lưu yêu cầu.
- **Then:** Hệ thống lưu mô tả lỗi vào phiếu bảo hành.

**AC02 – Ngoại lệ**

- **Given:** Mô tả lỗi chưa được nhập.
- **When:** Nhân viên thực hiện lưu yêu cầu bảo hành.
- **Then:** Hệ thống thông báo cần nhập mô tả lỗi và không hoàn tất việc ghi nhận.

### US04 – Phân loại nhóm sự cố

**AC01 – Thành công**

- **Given:** Yêu cầu bảo hành có thông tin mô tả lỗi và nhóm sự cố hợp lệ.
- **When:** Nhân viên chọn nhóm sự cố và lưu yêu cầu.
- **Then:** Hệ thống ghi nhận nhóm sự cố cho phiếu bảo hành.

**AC02 – Ngoại lệ**

- **Given:** Nhóm sự cố chưa được chọn hoặc không hợp lệ.
- **When:** Nhân viên thực hiện lưu yêu cầu bảo hành.
- **Then:** Hệ thống thông báo lỗi và không ghi nhận nhóm sự cố không hợp lệ.

### US06 – Sinh hạn cam kết

**AC01 – Thành công**

- **Given:** Yêu cầu bảo hành đã có đầy đủ thông tin cần thiết và mức ưu tiên hợp lệ.
- **When:** Nhân viên hoàn tất tiếp nhận và phân loại.
- **Then:** Hệ thống xác định và lưu hạn cam kết theo quy tắc nghiệp vụ.

**AC02 – Ngoại lệ**

- **Given:** Yêu cầu chưa có đủ thông tin cần thiết hoặc mức ưu tiên không hợp lệ.
- **When:** Nhân viên thực hiện hoàn tất.
- **Then:** Hệ thống không sinh hạn cam kết và thông báo thông tin còn thiếu hoặc không hợp lệ.

# 3. Use Case

## 3.1. Actor

- **Nhân viên tiếp nhận:** Tra cứu khách hàng, ghi nhận thiết bị, ghi nhận mô tả lỗi, phân loại nhóm sự cố, xác định mức ưu tiên và sinh hạn cam kết.
- **Quản lý trung tâm:** Xem trạng thái và lịch sử trạng thái của yêu cầu bảo hành.

## 3.2. Danh sách Use Case

| Use Case ID | Tên Use Case | Actor chính | User Story liên quan |
|---|---|---|---|
| UC01 | Tra cứu khách hàng theo số điện thoại | Nhân viên tiếp nhận | US01 |
| UC02 | Ghi nhận thiết bị | Nhân viên tiếp nhận | US02 |
| UC03 | Ghi nhận mô tả lỗi | Nhân viên tiếp nhận | US03 |
| UC04 | Phân loại nhóm sự cố | Nhân viên tiếp nhận | US04 |
| UC05 | Xác định mức ưu tiên | Nhân viên tiếp nhận | US05 |
| UC06 | Sinh hạn cam kết xử lý | Nhân viên tiếp nhận | US06 |
| UC07 | Xem trạng thái yêu cầu bảo hành | Quản lý trung tâm | US07 |
| UC08 | Xem lịch sử trạng thái | Quản lý trung tâm | US08 |

## 3.3. Use Case Diagram

> [Chèn Use Case Diagram tại đây]

Sơ đồ thể hiện mối liên hệ giữa hai actor chính và các chức năng thuộc luồng L2. Nhân viên tiếp nhận thực hiện các nghiệp vụ tiếp nhận và phân loại yêu cầu bảo hành; Quản lý trung tâm theo dõi trạng thái và lịch sử trạng thái của các phiếu.

## 3.4. Đặc tả Use Case UC01 – Tra cứu khách hàng

| Thuộc tính | Nội dung |
|---|---|
| **Use Case ID** | UC01 |
| **Use Case Name** | Tra cứu khách hàng theo số điện thoại |
| **Primary Actor** | Nhân viên tiếp nhận |
| **Brief Description** | Cho phép nhân viên tiếp nhận tra cứu thông tin khách hàng bằng số điện thoại để xác định khách hàng cần tiếp nhận yêu cầu bảo hành. |
| **Pre-conditions** | Nhân viên đã đăng nhập; có số điện thoại khách hàng; hệ thống đang hoạt động bình thường. |
| **Post-conditions – Thành công** | Thông tin khách hàng tương ứng được hiển thị; nhân viên có thể tiếp tục quá trình tiếp nhận yêu cầu bảo hành. |
| **Post-conditions – Thất bại** | Hệ thống thông báo không tìm thấy khách hàng; nhân viên có thể kiểm tra và nhập lại số điện thoại. |
| **Related User Story** | US01 – Tra cứu khách hàng theo số điện thoại |

### Main Flow – Luồng chính

1. Nhân viên tiếp nhận mở chức năng tra cứu khách hàng.
2. Nhân viên nhập số điện thoại khách hàng.
3. Hệ thống chuẩn hóa số điện thoại theo quy tắc nghiệp vụ.
4. Hệ thống tìm kiếm khách hàng theo số điện thoại.
5. Hệ thống hiển thị thông tin khách hàng nếu tìm thấy.
6. Nhân viên kiểm tra thông tin và tiếp tục quá trình tiếp nhận yêu cầu bảo hành.

### Exception Flow – Luồng ngoại lệ

**E1 – Số điện thoại không hợp lệ**

1. Nhân viên nhập số điện thoại không đúng định dạng.
2. Hệ thống kiểm tra dữ liệu đầu vào.
3. Hệ thống thông báo số điện thoại không hợp lệ.
4. Nhân viên kiểm tra và nhập lại số điện thoại.

**E2 – Không tìm thấy khách hàng**

1. Nhân viên nhập số điện thoại và thực hiện tra cứu.
2. Hệ thống tìm kiếm trong dữ liệu khách hàng.
3. Hệ thống không tìm thấy khách hàng tương ứng.
4. Hệ thống thông báo không tìm thấy khách hàng.
5. Nhân viên kiểm tra lại số điện thoại và thực hiện tra cứu lại.

## 3.5. Đặc tả Use Case UC06 – Sinh hạn cam kết xử lý

| Thuộc tính | Nội dung |
|---|---|
| **Use Case ID** | UC06 |
| **Use Case Name** | Sinh hạn cam kết xử lý |
| **Primary Actor** | Nhân viên tiếp nhận |
| **Brief Description** | Cho phép hệ thống xác định hạn cam kết xử lý yêu cầu bảo hành dựa trên mức ưu tiên đã được xác định. |
| **Pre-conditions** | Nhân viên đã đăng nhập; yêu cầu bảo hành có thông tin cần thiết; mức ưu tiên hợp lệ. |
| **Post-conditions – Thành công** | Hạn cam kết được xác định, lưu và hiển thị trên phiếu bảo hành. |
| **Post-conditions – Thất bại** | Hệ thống thông báo lỗi nếu không thể xác định hoặc lưu hạn cam kết; nhân viên có thể kiểm tra thông tin và thực hiện lại. |
| **Related User Story** | US06 – Sinh hạn cam kết cho yêu cầu bảo hành |

### Main Flow – Luồng chính

1. Nhân viên tiếp nhận hoàn tất việc ghi nhận thông tin yêu cầu bảo hành.
2. Nhân viên xác định mức ưu tiên của yêu cầu.
3. Hệ thống tiếp nhận mức ưu tiên đã được xác định.
4. Hệ thống tính hạn cam kết theo quy tắc nghiệp vụ.
5. Hệ thống lưu hạn cam kết vào phiếu bảo hành.
6. Hệ thống hiển thị hạn cam kết để nhân viên kiểm tra.

### Exception Flow – Luồng ngoại lệ

**E1 – Chưa có mức ưu tiên**

1. Yêu cầu bảo hành chưa có mức ưu tiên.
2. Hệ thống yêu cầu bổ sung mức ưu tiên.
3. Nhân viên xác định mức ưu tiên hợp lệ trước khi tiếp tục.

**E2 – Mức ưu tiên không hợp lệ**

1. Hệ thống nhận mức ưu tiên không thuộc danh sách cho phép.
2. Hệ thống thông báo lỗi.
3. Nhân viên xác định lại mức ưu tiên.

**E3 – Không thể lưu hạn cam kết**

1. Hệ thống không thể lưu hạn cam kết.
2. Hệ thống thông báo lỗi.
3. Nhân viên kiểm tra thông tin và thực hiện lại thao tác.

# 4. Software Requirements Specification (SRS)

## 4.1. Thông tin chung

- **Tên hệ thống:** Smart CRM – Mekong Mobile.
- **Luồng nghiệp vụ:** L2 – Tiếp nhận và phân loại yêu cầu bảo hành.
- **Mục đích:** Hỗ trợ quy trình tiếp nhận và phân loại yêu cầu bảo hành.
- **Người dùng chính:** Nhân viên tiếp nhận và Quản lý trung tâm.

## 4.2. Functional Requirements (FR)

| ID | Yêu cầu chức năng | User Story liên quan |
|---|---|---|
| FR01 | Hệ thống phải cho phép Nhân viên tiếp nhận tra cứu thông tin khách hàng bằng số điện thoại. | US01 |
| FR02 | Hệ thống phải cho phép Nhân viên tiếp nhận ghi nhận thông tin thiết bị của khách hàng vào yêu cầu bảo hành. | US02 |
| FR03 | Hệ thống phải cho phép Nhân viên tiếp nhận ghi nhận mô tả lỗi của thiết bị vào yêu cầu bảo hành. | US03 |
| FR04 | Hệ thống phải cho phép Nhân viên tiếp nhận phân loại nhóm sự cố cho yêu cầu bảo hành. | US04 |
| FR05 | Hệ thống phải cho phép Nhân viên tiếp nhận xác định mức ưu tiên của yêu cầu bảo hành. | US05 |
| FR06 | Hệ thống phải tự động sinh hạn cam kết khi yêu cầu bảo hành có đầy đủ thông tin cần thiết và mức ưu tiên hợp lệ. | US06 |
| FR07 | Hệ thống phải cho phép Quản lý trung tâm xem trạng thái của các yêu cầu bảo hành. | US07 |
| FR08 | Hệ thống phải cho phép Quản lý trung tâm xem lịch sử thay đổi trạng thái của yêu cầu bảo hành. | US08 |

## 4.3. Non-functional Requirements (NFR)

| ID | Yêu cầu phi chức năng | Ngưỡng đo lường |
|---|---|---|
| NFR01 | Hệ thống phải phản hồi chức năng tra cứu khách hàng theo số điện thoại trong thời gian ngắn. | Thời gian phản hồi không quá 3 giây trong điều kiện hoạt động bình thường. |
| NFR02 | Hệ thống phải đảm bảo khả năng xử lý đồng thời các yêu cầu tra cứu và tiếp nhận bảo hành. | Hỗ trợ tối thiểu 50 người dùng đồng thời mà không xảy ra lỗi làm gián đoạn hệ thống. |
| NFR03 | Hệ thống phải đảm bảo tính sẵn sàng để nhân viên thực hiện nghiệp vụ tiếp nhận và phân loại yêu cầu bảo hành. | Thời gian hoạt động đạt tối thiểu 99% mỗi tháng. |

**Lưu ý:** Các ngưỡng NFR trên được giữ theo nội dung BT1 đã cung cấp. Cần có kiểm thử hiệu năng và theo dõi vận hành phù hợp nếu muốn xác nhận hệ thống thực sự đạt các ngưỡng này.

## 4.4. Quy tắc nghiệp vụ

| Mã | Quy tắc nghiệp vụ |
|---|---|
| QT01 | Số điện thoại khách hàng phải là duy nhất. Nếu số điện thoại đã tồn tại, hệ thống phải sử dụng hồ sơ khách hàng hiện có thay vì tạo hồ sơ trùng lặp. |
| QT02 | Số điện thoại phải được chuẩn hóa về dạng 10 chữ số bắt đầu bằng 0 trước khi lưu. |
| QT03 | Thiết bị phải được xác định bằng số serial hoặc IMEI và chỉ thuộc về một khách hàng tại một thời điểm. |
| QT04 | Hạn cam kết được sinh theo mức ưu tiên: CAO là 24 giờ, TRUNG_BINH là 72 giờ, THAP là 120 giờ; chỉ tính ngày làm việc từ thứ Hai đến thứ Bảy. |
| QT05 | Nếu không có ngày mua thiết bị, phiếu phải được đánh dấu chưa xác minh bảo hành (`is_verified = false`) và cần quản lý phê duyệt thông qua trường `approved_by`. |
| QT06 | Mọi lần chuyển trạng thái phiếu bảo hành phải được ghi lại trong `ticket_status_log`. |
| QT07 | Nhân viên chỉ được xem dữ liệu thuộc trung tâm hoặc cửa hàng mình làm việc; quản lý được xem dữ liệu của đơn vị mình phụ trách. |

**Lưu ý triển khai:** Các quy tắc QT01–QT07 là yêu cầu nghiệp vụ từ BT1. Trạng thái triển khai của từng quy tắc phải được xác nhận bằng code và kiểm thử. Không được xem các quy tắc phân quyền hoặc phê duyệt là đã hoạt động nếu chưa có cơ chế tương ứng trong hệ thống.

## 4.5. Traceability

| User Story | Functional Requirement | Use Case | MoSCoW |
|---|---|---|---|
| US01 – Tra cứu khách hàng | FR01 – Tra cứu khách hàng | UC01 – Tra cứu khách hàng | MUST |
| US02 – Ghi nhận thiết bị | FR02 – Ghi nhận thiết bị | UC02 – Ghi nhận thiết bị | MUST |
| US03 – Ghi nhận mô tả lỗi | FR03 – Ghi nhận mô tả lỗi | UC03 – Ghi nhận mô tả lỗi | MUST |
| US04 – Phân loại nhóm sự cố | FR04 – Phân loại nhóm sự cố | UC04 – Phân loại nhóm sự cố | MUST |
| US05 – Xác định mức ưu tiên | FR05 – Xác định mức ưu tiên | UC05 – Xác định mức ưu tiên | SHOULD |
| US06 – Sinh hạn cam kết | FR06 – Sinh hạn cam kết | UC06 – Sinh hạn cam kết | MUST |
| US07 – Xem trạng thái yêu cầu | FR07 – Xem trạng thái yêu cầu | UC07 – Xem trạng thái yêu cầu | SHOULD |
| US08 – Xem lịch sử trạng thái | FR08 – Xem lịch sử trạng thái | UC08 – Xem lịch sử trạng thái | SHOULD |

# 5. Track SE – API và kiểm thử

## 5.1. Nguyên tắc mô tả API

Tài liệu phân biệt hai nhóm API:

- **API đã có trong code:** Endpoint được xác định từ mã nguồn hiện tại.
- **API theo thiết kế nghiệp vụ:** Endpoint đề xuất cho nghiệp vụ nhưng chưa được xác nhận là đã triển khai.

Việc mô tả endpoint trong SRS không đồng nghĩa endpoint đã hoạt động. Chỉ xác nhận chức năng hoàn thành sau khi kiểm tra mã nguồn và kết quả kiểm thử.

## 5.2. API hiện có trong code

Theo cấu trúc đã xác định của `src/routes/ticketRoutes.js`, các endpoint dưới đây là những endpoint cần đối chiếu với mã nguồn thực tế trước khi chốt tài liệu.

| API ID | Method | Endpoint | Mục đích | User Story liên quan |
|---|---|---|---|---|
| IMPL01 | GET | `/api/tickets` | Lấy danh sách phiếu bảo hành và các dữ liệu lọc được hỗ trợ. | US07 |
| IMPL02 | GET | `/api/tickets/:id` | Lấy chi tiết phiếu bảo hành và dữ liệu lịch sử trạng thái nếu được trả về bởi service. | US07, US08 |
| IMPL03 | POST | `/api/tickets` | Tạo phiếu bảo hành. | US02, US03, US04, US05, US06 |
| IMPL04 | PUT | `/api/tickets/:id` | Cập nhật thông tin phiếu bảo hành. | US03, US04, US05, US06 |
| IMPL05 | DELETE | `/api/tickets/:id` | Xóa phiếu bảo hành. | Quản lý dữ liệu |

Các endpoint này không chứng minh rằng mọi yêu cầu liên quan đã được đáp ứng đầy đủ. Ví dụ, việc có endpoint tạo phiếu không tự động chứng minh hệ thống có chức năng tra cứu khách hàng độc lập hoặc có đầy đủ validation cho từng trường.

## 5.3. API theo thiết kế nghiệp vụ

Các endpoint sau đây là phương án thiết kế tham khảo. Chỉ chuyển sang danh sách API đã triển khai sau khi chức năng tương ứng được bổ sung và kiểm thử.

| API ID | Method | Endpoint dự kiến | Mục đích | User Story |
|---|---|---|---|---|
| API01 | GET | `/api/customers/search?phone={phone}` | Tra cứu khách hàng theo số điện thoại. | US01 |
| API02 | POST | `/api/tickets/{ticketId}/device` | Ghi nhận hoặc cập nhật thông tin thiết bị. | US02 |
| API03 | PATCH | `/api/tickets/{ticketId}/issue-description` | Ghi nhận hoặc cập nhật mô tả lỗi. | US03 |
| API04 | PATCH | `/api/tickets/{ticketId}/issue-category` | Phân loại nhóm sự cố. | US04 |
| API05 | POST | `/api/tickets/{ticketId}/commitment-deadline` | Sinh hạn cam kết xử lý. | US06 |

Các endpoint dự kiến không bắt buộc phải được triển khai thành từng API riêng nếu thiết kế thực tế sử dụng một API tạo hoặc cập nhật phiếu bảo hành để xử lý nhiều trường cùng lúc. Khi đó, cần cập nhật SRS để phản ánh đúng thiết kế và implementation cuối cùng.

## 5.4. Mẫu Request/Response JSON tham khảo

Các JSON dưới đây chỉ minh họa dữ liệu đầu vào và đầu ra mong muốn cho thiết kế nghiệp vụ. Chúng không phải bằng chứng về response thực tế của hệ thống.

### API01 – Tra cứu khách hàng

**Request tham khảo:**

```http
GET /api/customers/search?phone=0909123456
```

**Response thành công tham khảo:**

```json
{
  "customerId": 1,
  "fullName": "Nguyễn Văn An",
  "phone": "0909123456"
}
```

**Response không tìm thấy tham khảo:**

```json
{
  "success": false,
  "error": "Không tìm thấy khách hàng."
}
```

### API02 – Ghi nhận thiết bị

**Request tham khảo:**

```http
POST /api/tickets/1/device
Content-Type: application/json
```

```json
{
  "deviceName": "Điện thoại Samsung Galaxy A55",
  "serialNumber": "SN123456789",
  "purchaseDate": "2026-01-15"
}
```

**Response thành công tham khảo:**

```json
{
  "success": true,
  "message": "Ghi nhận thiết bị thành công."
}
```

### API03 – Ghi nhận mô tả lỗi

**Request tham khảo:**

```http
PATCH /api/tickets/1/issue-description
Content-Type: application/json
```

```json
{
  "issueDescription": "Thiết bị không lên nguồn."
}
```

**Response thành công tham khảo:**

```json
{
  "success": true,
  "message": "Ghi nhận mô tả lỗi thành công."
}
```

### API04 – Phân loại nhóm sự cố

**Request tham khảo:**

```http
PATCH /api/tickets/1/issue-category
Content-Type: application/json
```

```json
{
  "categoryId": 1
}
```

**Response thành công tham khảo:**

```json
{
  "success": true,
  "message": "Phân loại nhóm sự cố thành công."
}
```

### API05 – Sinh hạn cam kết

**Request tham khảo:**

```http
POST /api/tickets/1/commitment-deadline
Content-Type: application/json
```

```json
{
  "priority": "CAO"
}
```

**Response thành công tham khảo:**

```json
{
  "success": true,
  "message": "Sinh hạn cam kết thành công.",
  "dueDate": "2026-10-05T17:00:00"
}
```

Thời điểm trong response chỉ là ví dụ định dạng. Hạn cam kết thực tế phải được xác định bằng quy tắc tính hạn trong hệ thống, không sử dụng cố định ngày giờ của ví dụ.

## 5.5. HTTP Status Code và Validation

### 5.5.1. HTTP Status Code dự kiến

| HTTP Status | Ý nghĩa | Trường hợp sử dụng dự kiến |
|---|---|---|
| 200 OK | Xử lý thành công. | Tra cứu, lấy dữ liệu hoặc cập nhật thành công. |
| 201 Created | Tạo mới thành công. | Tạo phiếu bảo hành hoặc tài nguyên mới. |
| 400 Bad Request | Dữ liệu yêu cầu không hợp lệ. | Thiếu trường bắt buộc hoặc sai định dạng. |
| 404 Not Found | Không tìm thấy dữ liệu. | Không tìm thấy khách hàng hoặc phiếu bảo hành. |
| 409 Conflict | Dữ liệu xung đột với quy tắc nghiệp vụ. | Trùng dữ liệu hoặc thao tác không phù hợp trạng thái. |
| 500 Internal Server Error | Lỗi máy chủ. | Lỗi không dự kiến trong quá trình xử lý. |

Bảng này mô tả cách xử lý mong muốn. Mã trạng thái thực tế cần được xác nhận từ route, service và kết quả kiểm thử.

### 5.5.2. Validation dự kiến

| API hoặc chức năng | Trường dữ liệu | Quy tắc kiểm tra |
|---|---|---|
| Tra cứu khách hàng | `phone` | Bắt buộc nhập, không để trống và phải được chuẩn hóa theo quy tắc số điện thoại. |
| Ghi nhận thiết bị | `deviceName` | Bắt buộc nhập, không để trống. |
| Ghi nhận thiết bị | `serialNumber` | Bắt buộc nhập, không để trống và không được trùng theo quy tắc nghiệp vụ. |
| Ghi nhận mô tả lỗi | `issueDescription` | Bắt buộc nhập, không để trống. |
| Phân loại nhóm sự cố | `categoryId` | Bắt buộc chọn nhóm sự cố tồn tại trong danh mục. |
| Xác định mức ưu tiên | `priority` | Chỉ chấp nhận `CAO`, `TRUNG_BINH` hoặc `THAP`. |
| Ghi nhận hoặc cập nhật phiếu | `ticketId` | Phiếu phải tồn tại khi thao tác yêu cầu một phiếu có sẵn. |

Các quy tắc trên cần được triển khai hoặc xác nhận trong code. Không coi validation đã hoàn thành chỉ vì nó được liệt kê trong tài liệu.

## 5.6. Trace API → User Story

| API hoặc chức năng | Endpoint | User Story | Mục đích |
|---|---|---|---|
| Tra cứu khách hàng | `GET /api/customers/search?phone={phone}` (dự kiến) | US01 | Tra cứu thông tin khách hàng theo số điện thoại. |
| Ghi nhận thiết bị | `POST /api/tickets` (luồng tạo phiếu hiện có) | US02 | Ghi nhận thông tin thiết bị trong quy trình tạo phiếu. |
| Ghi nhận mô tả lỗi | `POST /api/tickets`, `PUT /api/tickets/:id` | US03 | Ghi nhận hoặc cập nhật mô tả lỗi. |
| Phân loại nhóm sự cố | `POST /api/tickets`, `PUT /api/tickets/:id` | US04 | Ghi nhận hoặc cập nhật nhóm sự cố. |
| Xác định mức ưu tiên | `POST /api/tickets`, `PUT /api/tickets/:id` | US05 | Ghi nhận hoặc cập nhật mức ưu tiên. |
| Sinh hạn cam kết | `POST /api/tickets`, `PUT /api/tickets/:id` | US06 | Ghi nhận hoặc cập nhật hạn cam kết theo logic thực tế. |
| Xem trạng thái | `GET /api/tickets`, `GET /api/tickets/:id` | US07 | Xem trạng thái phiếu bảo hành. |
| Xem lịch sử trạng thái | `GET /api/tickets/:id` nếu response có lịch sử | US08 | Theo dõi các lần thay đổi trạng thái. |

Bảng này là ánh xạ nghiệp vụ cần được kiểm chứng. Nếu code thay đổi endpoint hoặc cách xử lý, cập nhật bảng theo implementation thực tế.

# 6. Quy tắc nghiệp vụ chi tiết

## 6.1. Chuẩn hóa số điện thoại

Số điện thoại được chuẩn hóa trước khi lưu để bảo đảm tính nhất quán và hỗ trợ tra cứu khách hàng.

Quy tắc mong muốn:

- Số điện thoại sau chuẩn hóa có 10 chữ số.
- Chữ số đầu tiên là `0`.
- Số điện thoại đã tồn tại phải được dùng lại hồ sơ khách hàng hiện có, tránh tạo dữ liệu trùng lặp.

## 6.2. Xác định thiết bị

Thiết bị được nhận diện bằng số serial hoặc mã IMEI theo nghiệp vụ. Trong mô hình dữ liệu của BT1, trường `serial_number` được sử dụng để lưu định danh thiết bị.

Quy tắc mong muốn:

- Thiết bị phải được liên kết với khách hàng.
- Định danh thiết bị phải tuân thủ ràng buộc duy nhất.
- Thông tin thiết bị phải được kiểm tra trước khi lưu phiếu bảo hành.

Nếu implementation chỉ hỗ trợ `serial_number`, không mô tả IMEI là trường dữ liệu riêng đã triển khai.

## 6.3. Mức ưu tiên

Hệ thống sử dụng ba mức ưu tiên:

| Mức ưu tiên | Ý nghĩa |
|---|---|
| `CAO` | Yêu cầu có mức ưu tiên cao. |
| `TRUNG_BINH` | Yêu cầu có mức ưu tiên trung bình. |
| `THAP` | Yêu cầu có mức ưu tiên thấp. |

Giá trị mức ưu tiên cần được thống nhất giữa giao diện, API, service và cơ sở dữ liệu.

## 6.4. Hạn cam kết xử lý

Hạn cam kết được xác định dựa trên mức ưu tiên:

| Mức ưu tiên | Thời gian mục tiêu |
|---|---:|
| `CAO` | 24 giờ |
| `TRUNG_BINH` | 72 giờ |
| `THAP` | 120 giờ |

Theo quy tắc nghiệp vụ của BT1, chỉ tính ngày làm việc từ thứ Hai đến thứ Bảy.

Cách xác định ngày và giờ kết thúc phải tuân theo logic tính hạn thực tế trong code. Không được suy ra rằng hệ thống có lịch nghỉ lễ, khung giờ làm việc cụ thể hoặc cơ chế tạm dừng SLA nếu những chức năng đó chưa được định nghĩa và triển khai.

## 6.5. Trạng thái ban đầu

Khi tạo phiếu bảo hành, trạng thái ban đầu theo thiết kế là `Mới tiếp nhận`.

Hệ thống cần ghi nhận trạng thái ban đầu trong `ticket_status_log`. Các lần thay đổi trạng thái tiếp theo cũng phải được lưu theo quy tắc QT06.

## 6.6. Xác minh bảo hành

Theo QT05 của BT1:

- Nếu không có ngày mua thiết bị, phiếu cần được đánh dấu chưa xác minh bảo hành.
- Giá trị `is_verified` cần là `false` trong trường hợp chưa xác minh.
- Trường `approved_by` được dùng để lưu mã người quản lý phê duyệt khi cần.

Cần kiểm tra implementation trước khi kết luận luồng phê duyệt đã hoạt động. Nếu hệ thống chưa có đăng nhập, phân quyền và xử lý phê duyệt tương ứng, đây vẫn là yêu cầu nghiệp vụ chưa hoàn thành.

## 6.7. Phân quyền theo trung tâm

Theo QT07 của BT1:

- Nhân viên chỉ được xem dữ liệu thuộc trung tâm hoặc cửa hàng mình làm việc.
- Quản lý được xem dữ liệu thuộc đơn vị mình phụ trách.

Quy tắc này yêu cầu cơ chế xác thực và phân quyền ở phía máy chủ. Việc chỉ ẩn dữ liệu trên giao diện không đủ để bảo đảm phân quyền.

Trạng thái triển khai cần được xác minh từ middleware, route, service và các bài kiểm thử liên quan.

# 7. Traceability và trạng thái triển khai

## 7.1. Chuỗi truy vết

Các yêu cầu được liên kết theo chuỗi:

**User Story → Functional Requirement → Use Case → API → Kiểm thử**

Mỗi chức năng cần có mối liên hệ rõ ràng giữa nhu cầu người dùng, yêu cầu chức năng, cách triển khai và bằng chứng kiểm thử.

## 7.2. Trạng thái triển khai cần xác minh

| Nhóm chức năng | Thành phần liên quan | Nội dung cần xác minh |
|---|---|---|
| Tra cứu khách hàng | `customer`, `normalizePhone`, API liên quan | Có chức năng tra cứu theo số điện thoại hay chưa; xử lý số điện thoại không hợp lệ và không tìm thấy khách hàng như thế nào. |
| Ghi nhận thiết bị | `device`, quy trình tạo phiếu | Thiết bị có được tạo hoặc liên kết đúng với khách hàng hay không; kiểm tra serial trùng lặp. |
| Ghi nhận mô tả lỗi | `ticket.issue_desc` | Trường mô tả lỗi có được kiểm tra trước khi lưu hay không. |
| Phân loại nhóm sự cố | `ticket.category_id`, `issue_category` | Nhóm sự cố có được kiểm tra tồn tại trước khi lưu hay không. |
| Xác định mức ưu tiên | `ticket.priority` | Có validation cho ba giá trị ưu tiên hay không. |
| Sinh hạn cam kết | `calculateDueDate`, `ticket.due_date` | Quy tắc tính hạn có đúng mức ưu tiên và ngày làm việc hay không; kết quả có được lưu vào database hay không. |
| Xem trạng thái | `GET /api/tickets`, `GET /api/tickets/:id` | Response có trả về trạng thái phiếu và giao diện có hiển thị đúng hay không. |
| Xem lịch sử trạng thái | `ticket_status_log` | Lịch sử có được tạo khi lập phiếu và ghi nhận mỗi lần thay đổi trạng thái hay không. |
| Xác minh bảo hành | `is_verified`, `approved_by` | Có xử lý trường hợp thiếu ngày mua và yêu cầu phê duyệt hay chưa. |
| Phân quyền | Middleware và các route liên quan | Có giới hạn dữ liệu theo trung tâm và vai trò người dùng ở phía máy chủ hay chưa. |

## 7.3. Nguyên tắc xác nhận hoàn thành

Một yêu cầu chỉ được xác nhận là hoàn thành khi có bằng chứng phù hợp, chẳng hạn:

- Mã nguồn thực hiện đúng yêu cầu.
- Bài kiểm thử tương ứng chạy thành công.
- API trả về kết quả đúng trong trường hợp thành công và ngoại lệ.
- Giao diện thể hiện dữ liệu và thông báo phù hợp.
- Các bước khởi tạo cơ sở dữ liệu và dữ liệu mẫu được ghi lại để người khác có thể chạy lại dự án.

Không sử dụng trạng thái “đã hoàn thành” chỉ dựa trên việc mô tả chức năng trong tài liệu.

# 8. Phạm vi triển khai bài tập 2 – Track SE

Bài tập 2 tập trung chuyển đổi thiết kế của bài tập 1 thành hệ thống có thể chạy và kiểm thử được.

## 8.1. Module nghiệp vụ

Module nghiệp vụ cốt lõi là quản lý phiếu yêu cầu bảo hành (`ticket`), liên kết với khách hàng (`customer`), thiết bị (`device`), nhóm sự cố (`issue_category`) và lịch sử trạng thái (`ticket_status_log`).

Phạm vi triển khai cần được đối chiếu với code hiện có để xác định chính xác các chức năng đã hoàn thành.

## 8.2. Kiến trúc mã nguồn

Cấu trúc mã nguồn dự kiến theo kiến trúc phân lớp:

- `src/routes/`: Tiếp nhận request và định tuyến API.
- `src/services/`: Xử lý nghiệp vụ.
- `src/repositories/`: Truy cập và thao tác dữ liệu.
- `src/config/`: Cấu hình kết nối cơ sở dữ liệu.
- `src/utils/`: Các hàm tiện ích và quy tắc nghiệp vụ.
- `src/api/`: Các hàm gọi API từ giao diện.
- `src/public/`: Các màn hình giao diện người dùng.
- `tests/`: Các bài kiểm thử.

Cấu trúc trên phản ánh cách tổ chức mã nguồn hiện có đã được xác định. Các chức năng cụ thể bên trong từng tầng cần được kiểm tra từ file thực tế.

## 8.3. Kiểm thử

Các bài kiểm thử cần bao phủ ít nhất những nhóm sau:

1. **Happy path:** Dữ liệu hợp lệ, thao tác thực hiện thành công.
2. **Boundary:** Dữ liệu ở giới hạn hợp lệ hoặc trường hợp biên của quy tắc nghiệp vụ.
3. **Invalid data:** Dữ liệu không hợp lệ, thiếu trường bắt buộc hoặc vi phạm quy tắc nghiệp vụ.

Kết quả kiểm thử cần được chạy lại từ môi trường sạch theo hướng dẫn trong README. Không ghi kết quả PASS nếu chưa thực sự chạy kiểm thử.

## 8.4. Khởi tạo cơ sở dữ liệu

Dự án cần có hướng dẫn và tệp cần thiết để tạo cơ sở dữ liệu từ trạng thái ban đầu, bao gồm:

- Cấu trúc bảng và các ràng buộc.
- Khóa chính và khóa ngoại.
- Các quy tắc kiểm tra dữ liệu.
- Dữ liệu mẫu cần thiết cho việc chạy và kiểm thử.

Tên tệp migration, seed và lệnh chạy phải khớp với những gì thực sự có trong repository. Không mô tả tệp hoặc lệnh chưa được tạo.

## 8.5. Giao diện

Các màn hình chính của hệ thống cần sử dụng API thực tế, bao gồm:

- Màn hình danh sách yêu cầu bảo hành.
- Màn hình tạo mới yêu cầu bảo hành.
- Màn hình chi tiết yêu cầu bảo hành.

Giao diện cần xử lý trạng thái tải dữ liệu, danh sách rỗng, không có kết quả tìm kiếm và lỗi tải dữ liệu phù hợp với yêu cầu BT2.

## 8.6. Tài liệu và khả năng chạy lại

Repository cần có README hướng dẫn cài đặt và chạy dự án, tệp `.env.example`, các tệp cần thiết để khởi tạo database và dữ liệu mẫu, hướng dẫn chạy kiểm thử, cùng tài liệu ghi nhận thay đổi thiết kế và khai báo sử dụng AI theo yêu cầu của học phần.

# 9. Tài liệu liên quan

- `README.md`: Hướng dẫn cài đặt, cấu hình, chạy hệ thống và kiểm thử.
- `docs/srs.md`: Đặc tả yêu cầu hệ thống.
- `docs/thay-doi-thiet-ke.md`: Ghi nhận các thay đổi thiết kế so với BT1.
- `docs/ai-disclosure.md`: Khai báo việc sử dụng công cụ AI.
- `src/`: Mã nguồn triển khai.
- `tests/`: Các bài kiểm thử.


