# 2. Danh sách User Story

| Mã   | User Story                                                                                                                              | MoSCoW |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| US01 | Là Nhân viên tiếp nhận, tôi muốn tra cứu khách hàng theo số điện thoại để xác định thông tin khách hàng cần tiếp nhận yêu cầu bảo hành. | MUST   |
| US02 | Là Nhân viên tiếp nhận, tôi muốn ghi nhận thiết bị của khách hàng để xác định thiết bị cần tiếp nhận bảo hành.                          | MUST   |
| US03 | Là Nhân viên tiếp nhận, tôi muốn ghi nhận mô tả lỗi của thiết bị để lưu lại thông tin sự cố cần bảo hành.                               | MUST   |
| US04 | Là Nhân viên tiếp nhận, tôi muốn phân loại nhóm sự cố để xác định loại vấn đề của thiết bị.                                             | MUST   |
| US05 | Là Nhân viên tiếp nhận, tôi muốn xác định mức ưu tiên của yêu cầu bảo hành để xử lý yêu cầu theo mức độ cần thiết.                      | SHOULD |
| US06 | Là Nhân viên tiếp nhận, tôi muốn sinh hạn cam kết cho yêu cầu bảo hành để xác định thời hạn xử lý yêu cầu.                              | MUST   |
| US07 | Là Quản lý trung tâm, tôi muốn xem trạng thái của các yêu cầu bảo hành để theo dõi tình hình tiếp nhận và phân loại yêu cầu.            | SHOULD |
| US08 | Là Quản lý trung tâm, tôi muốn xem lịch sử trạng thái của yêu cầu bảo hành để theo dõi quá trình thay đổi trạng thái của yêu cầu.       | COULD  |

## Acceptance Criteria cho các Story MUST

### US01 — Tra cứu khách hàng theo số điện thoại

#### AC01 – Thành công

* **Given:** Nhân viên tiếp nhận có số điện thoại của khách hàng
* **When:** Nhân viên nhập số điện thoại và thực hiện tra cứu
* **Then:** Hệ thống hiển thị thông tin khách hàng tương ứng.

#### AC02 – Ngoại lệ

* **Given:** Số điện thoại chưa tồn tại trong hệ thống
* **When:** Nhân viên thực hiện tra cứu
* **Then:** Hệ thống thông báo không tìm thấy khách hàng.

### US02 — Ghi nhận thiết bị

#### AC01 – Thành công

* **Given:** Nhân viên đã xác định được khách hàng
* **When:** Nhân viên nhập thông tin thiết bị hợp lệ
* **Then:** Hệ thống ghi nhận thiết bị vào yêu cầu bảo hành.

#### AC02 – Ngoại lệ

* **Given:** Thông tin thiết bị bắt buộc chưa được nhập đầy đủ
* **When:** Nhân viên thực hiện ghi nhận
* **Then:** Hệ thống thông báo thông tin thiết bị chưa đầy đủ và không ghi nhận.

### US03 — Ghi nhận mô tả lổi

#### AC01 – Thành công

* **Given:** Nhân viên đã ghi nhận thiết bị
* **When:** Nhân viên nhập mô tả lỗi của thiết bị
* **Then:** Hệ thống lưu mô tả lỗi vào yêu cầu bảo hành.

#### AC02 – Ngoại lệ

* **Given:** Mô tả lỗi chưa được nhập
* **When:** Nhân viên thực hiện lưu yêu cầu
* **Then:** Hệ thống yêu cầu nhập mô tả lỗi và không hoàn tất việc ghi nhận.

### US04 — Phân loại nhóm sự cố

#### AC01 – Thành công

* **Given:** Yêu cầu bảo hành đã có thông tin mô tả lỗi
* **When:** Nhân viên chọn nhóm sự cố phù hợp
* **Then:** Hệ thống ghi nhận nhóm sự cố cho yêu cầu bảo hành.

#### AC02 – Ngoại lệ

* **Given:** Chưa có nhóm sự cố được chọn
* **When:** Nhân viên thực hiện hoàn tất phân loại
* **Then:** Hệ thống yêu cầu chọn nhóm sự cố.

### US06 — Sinh hạn cam kết

#### AC01 – Thành công

* **Given:** Yêu cầu bảo hành đã có đầy đủ thông tin cần thiết và mức ưu tiên
* **When:** Nhân viên hoàn tất tiếp nhận và phân loại
* **Then:** Hệ thống sinh hạn cam kết cho yêu cầu bảo hành.

#### AC02 – Ngoại lệ

* **Given:** Yêu cầu chưa có đủ thông tin cần thiết
* **When:** Nhân viên thực hiện hoàn tất
* **Then:** Hệ thống không sinh hạn cam kết và thông báo thông tin còn thiếu.
# 3. Use Case

## Actor

* **Nhân viên tiếp nhận:** Tra cứu khách hàng, ghi nhận thiết bị, ghi nhận mô tả lỗi, phân loại nhóm sự cố, xác định mức ưu tiên và sinh hạn cam kết.
* **Quản lý trung tâm:** Xem trạng thái và lịch sử trạng thái của yêu cầu bảo hành.

## Các Use Case

* **UC01:** Tra cứu khách hàng
* **UC02:** Ghi nhận thiết bị
* **UC03:** Ghi nhận mô tả lỗi
* **UC04:** Phân loại nhóm sự cố
* **UC05:** Xác định mức ưu tiên
* **UC06:** Sinh hạn cam kết
* **UC07:** Xem trạng thái yêu cầu bảo hành
* **UC08:** Xem lịch sử trạng thái

## Use Case Diagram

> [Chèn Use Case Diagram tại đây]

Quy trình tập trung vào việc tiếp nhận thông tin khách hàng, thiết bị, mô tả lỗi, phân loại sự cố, xác định mức ưu tiên và sinh hạn cam kết cho yêu cầu bảo hành.

## Đặc tả Use Case UC01 – Tra cứu khách hàng

| Thuộc tính             | Nội dung                                                                                                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use Case ID:**       | **UC01**                                                                                                                                                                                                                                                                  |
| **Use case Name:**     | Tra cứu khách hàng theo số điện thoại                                                                                                                                                                                                                                     |
| **Primary actor:**     | Nhân viên tiếp nhận                                                                                                                                                                                                                                                       |
| **Brief description:** | Use case này cho phép nhân viên tiếp nhận tra cứu thông tin khách hàng bằng số điện thoại để xác định khách hàng cần tiếp nhận yêu cầu bảo hành.                                                                                                                          |
| **Pre-conditions:**    | • Nhân viên tiếp nhận đã đăng nhập vào hệ thống.<br>• Nhân viên có số điện thoại của khách hàng.<br>• Hệ thống đang hoạt động bình thường.                                                                                                                                |
| **Post-conditions:**   | **Thành công:**<br>✓ Thông tin khách hàng tương ứng được hiển thị.<br>✓ Nhân viên có thể tiếp tục quá trình tiếp nhận yêu cầu bảo hành.<br><br>**Thất bại:**<br>✓ Hệ thống thông báo không tìm thấy khách hàng.<br>✓ Nhân viên có thể kiểm tra và nhập lại số điện thoại. |

### Main Flow – Luồng chính

1. Nhân viên tiếp nhận nhập số điện thoại của khách hàng.
2. Nhân viên thực hiện chức năng tra cứu.
3. Hệ thống kiểm tra số điện thoại trong dữ liệu khách hàng.
4. Hệ thống tìm thấy khách hàng tương ứng.
5. Hệ thống hiển thị thông tin khách hàng.
6. Nhân viên tiếp tục quá trình tiếp nhận yêu cầu bảo hành.

### Exception Flow – Luồng ngoại lệ

**E1 – Không tìm thấy khách hàng**

1. Nhân viên tiếp nhận nhập số điện thoại.
2. Nhân viên thực hiện tra cứu.
3. Hệ thống kiểm tra dữ liệu khách hàng.
4. Hệ thống không tìm thấy khách hàng tương ứng.
5. Hệ thống thông báo “Không tìm thấy khách hàng”.
6. Nhân viên kiểm tra lại số điện thoại và thực hiện tra cứu lại.

# 4. SRS

## 4.1. Giới thiệu

**Tên hệ thống:** Hệ thống tiếp nhận và phân loại yêu cầu bảo hành

**Mục đích:**

Hệ thống hỗ trợ nhân viên tiếp nhận trong việc tra cứu khách hàng, ghi nhận thiết bị, ghi nhận mô tả lỗi, phân loại nhóm sự cố, xác định mức ưu tiên và sinh hạn cam kết cho yêu cầu bảo hành.

**Người dùng chính:**

* **Nhân viên tiếp nhận:** Tiếp nhận và phân loại yêu cầu bảo hành.
* **Quản lý trung tâm:** Theo dõi trạng thái và lịch sử trạng thái của yêu cầu bảo hành.

**Phạm vi:**

Hệ thống tập trung vào quy trình tiếp nhận và phân loại yêu cầu bảo hành, bao gồm thông tin khách hàng, thiết bị, lỗi, nhóm sự cố, mức ưu tiên và hạn cam kết.

## 4.2. Phạm vi hệ thống

**Trong phạm vi:**

* Tra cứu khách hàng theo số điện thoại.
* Ghi nhận thông tin thiết bị của khách hàng.
* Ghi nhận mô tả lỗi của thiết bị.
* Phân loại nhóm sự cố.
* Xác định mức ưu tiên của yêu cầu bảo hành.
* Sinh hạn cam kết cho yêu cầu bảo hành.
* Xem trạng thái yêu cầu bảo hành.
* Xem lịch sử trạng thái của yêu cầu bảo hành.

**Ngoài phạm vi:**

* Thanh toán chi phí bảo hành.
* Quản lý sửa chữa chi tiết thiết bị.
* Quản lý linh kiện thay thế.
* Phát triển ứng dụng mobile.

## 4.3. Actor và vai trò

| Actor               | Vai trò                                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Nhân viên tiếp nhận | Tiếp nhận yêu cầu bảo hành, tra cứu khách hàng, ghi nhận thiết bị và mô tả lỗi, phân loại nhóm sự cố, xác định mức ưu tiên và sinh hạn cam kết. |
| Quản lý trung tâm   | Theo dõi trạng thái và lịch sử trạng thái của các yêu cầu bảo hành.                                                                             |

## 4.4. Functional Requirements (FR)

| ID   | Functional Requirement                                                                                       | Trace User Story |
| ---- | ------------------------------------------------------------------------------------------------------------ | ---------------- |
| FR01 | Hệ thống phải cho phép Nhân viên tiếp nhận tra cứu thông tin khách hàng bằng số điện thoại.                  | US01             |
| FR02 | Hệ thống phải cho phép Nhân viên tiếp nhận ghi nhận thông tin thiết bị của khách hàng vào yêu cầu bảo hành.  | US02             |
| FR03 | Hệ thống phải cho phép Nhân viên tiếp nhận ghi nhận mô tả lỗi của thiết bị vào yêu cầu bảo hành.             | US03             |
| FR04 | Hệ thống phải cho phép Nhân viên tiếp nhận phân loại nhóm sự cố cho yêu cầu bảo hành.                        | US04             |
| FR05 | Hệ thống phải cho phép Nhân viên tiếp nhận xác định mức ưu tiên của yêu cầu bảo hành.                        | US05             |
| FR06 | Hệ thống phải tự động sinh hạn cam kết khi yêu cầu bảo hành đã có đầy đủ thông tin cần thiết và mức ưu tiên. | US06             |
| FR07 | Hệ thống phải cho phép Quản lý trung tâm xem trạng thái của các yêu cầu bảo hành.                            | US07             |
| FR08 | Hệ thống phải cho phép Quản lý trung tâm xem lịch sử trạng thái của yêu cầu bảo hành.                        | US08             |

## 4.5. Non-functional Requirements

| ID    | Non-functional Requirement                                                                                                                     |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR01 | Thời gian phản hồi của chức năng tra cứu khách hàng không vượt quá **3 giây** trong điều kiện hệ thống hoạt động bình thường.                  |
| NFR02 | Hệ thống phải đảm bảo **99%** yêu cầu tra cứu khách hàng thành công khi số điện thoại hợp lệ và dữ liệu khách hàng tồn tại.                    |
| NFR03 | Hệ thống phải cho phép **ít nhất 50 người dùng đồng thời** thực hiện các chức năng tiếp nhận và tra cứu mà không làm hệ thống ngừng hoạt động. |

## 4.6. Traceability

| User Story                    | Functional Requirement        | Use Case                      |
| ----------------------------- | ----------------------------- | ----------------------------- |
| **US01** – Tra cứu khách hàng | FR01 – Tra cứu khách hàng     | UC01 – Tra cứu khách hàng     |
| US02 – Ghi nhận thiết bị      | FR02 – Ghi nhận thiết bị      | UC02 – Ghi nhận thiết bị      |
| US03 – Ghi nhận mô tả lỗi     | FR03 – Ghi nhận mô tả lỗi     | UC03 – Ghi nhận mô tả lỗi     |
| US04 – Phân loại nhóm sự cố   | FR04 – Phân loại nhóm sự cố   | UC04 – Phân loại nhóm sự cố   |
| US05 – Xác định mức ưu tiên   | FR05 – Xác định mức ưu tiên   | UC05 – Xác định mức ưu tiên   |
| US06 – Sinh hạn cam kết       | FR06 – Sinh hạn cam kết       | UC06 – Sinh hạn cam kết       |
| US07 – Xem trạng thái yêu cầu | FR07 – Xem trạng thái yêu cầu | UC07 – Xem trạng thái yêu cầu |
| US08 – Xem lịch sử trạng thái | FR08 – Xem lịch sử trạng thái | UC08 – Xem lịch sử trạng thái |

# 5. Track SE

## 5.1. Danh sách API Endpoint

Các API dưới đây phục vụ các User Story được ưu tiên **MUST** trong hệ thống tiếp nhận và phân loại yêu cầu bảo hành.

| API ID | Method | Endpoint                                      | Mục đích                                          | User Story |
| ------ | ------ | --------------------------------------------- | ------------------------------------------------- | ---------- |
| API01  | GET    | `/api/customers/search?phone={phone}`         | Tra cứu thông tin khách hàng theo số điện thoại.  | US01       |
| API02  | POST   | `/api/tickets/{ticketId}/device`              | Ghi nhận thông tin thiết bị vào yêu cầu bảo hành. | US02       |
| API03  | PATCH  | `/api/tickets/{ticketId}/issue-description`   | Ghi nhận hoặc cập nhật mô tả lỗi của thiết bị.    | US03       |
| API04  | PATCH  | `/api/tickets/{ticketId}/issue-category`      | Phân loại nhóm sự cố cho yêu cầu bảo hành.        | US04       |
| API05  | POST   | `/api/tickets/{ticketId}/commitment-deadline` | Sinh hạn cam kết xử lý cho yêu cầu bảo hành.      | US06       |

**Quy ước:**

* `ticketId`: mã định danh của yêu cầu bảo hành.
* `phone`: số điện thoại của khách hàng cần tra cứu.

## 5.2. Mẫu Request/Response JSON

### API01 – Tra cứu khách hàng

**Request:**

```http
GET /api/customers/search?phone=0909123456
```

**Response – Thành công (200):**

```json
{
  "customerId": "CUS001",
  "fullName": "Nguyễn Văn An",
  "phone": "0909123456"
}
```

**Response – Không tìm thấy (404):**

```json
{
  "message": "Không tìm thấy khách hàng"
}
```

### API02 – Ghi nhận thiết bị

**Request:**

```http
POST /api/tickets/TK001/device
```

```json
{
  "deviceName": "Điện thoại Samsung Galaxy A55",
  "serialNumber": "SN123456789"
}
```

**Response – Thành công (201):**

```json
{
  "ticketId": "TK001",
  "deviceName": "Điện thoại Samsung Galaxy A55",
  "serialNumber": "SN123456789",
  "message": "Ghi nhận thiết bị thành công"
}
```

### API03 – Ghi nhận mô tả lỗi

**Request:**

```http
PATCH /api/tickets/TK001/issue-description
```

```json
{
  "issueDescription": "Thiết bị không lên nguồn"
}
```

**Response – Thành công (200):**

```json
{
  "ticketId": "TK001",
  "issueDescription": "Thiết bị không lên nguồn",
  "message": "Ghi nhận mô tả lỗi thành công"
}
```

### API04 – Phân loại nhóm sự cố

**Request:**

```http
PATCH /api/tickets/TK001/issue-category
```

```json
{
  "issueCategory": "Nguồn"
}
```

**Response – Thành công (200):**

```json
{
  "ticketId": "TK001",
  "issueCategory": "Nguồn",
  "message": "Phân loại nhóm sự cố thành công"
}
```

### API05 – Sinh hạn cam kết

**Request:**

```http
POST /api/tickets/TK001/commitment-deadline
```

```json
{
  "priority": "Cao"
}
```

**Response – Thành công (200):**

```json
{
  "ticketId": "TK001",
  "commitmentDeadline": "2026-10-05T17:00:00",
  "message": "Sinh hạn cam kết thành công"
}
```

## 5.3. HTTP Status Code và Validation

### 5.3.1. HTTP Status Code

| HTTP Status         | Ý nghĩa                      | Trường hợp sử dụng                                                                     |
| ------------------- | ---------------------------- | -------------------------------------------------------------------------------------- |
| **200 OK**          | Xử lý thành công             | Tra cứu khách hàng, cập nhật mô tả lỗi, phân loại sự cố, sinh hạn cam kết thành công.  |
| **201 Created**     | Tạo mới thành công           | Ghi nhận thiết bị vào yêu cầu bảo hành thành công.                                     |
| **400 Bad Request** | Dữ liệu yêu cầu không hợp lệ | Thiếu trường bắt buộc hoặc dữ liệu nhập không đúng định dạng.                          |
| **404 Not Found**   | Không tìm thấy dữ liệu       | Không tìm thấy khách hàng hoặc yêu cầu bảo hành tương ứng.                             |
| **409 Conflict**    | Dữ liệu bị xung đột          | Yêu cầu bảo hành đã tồn tại hoặc trạng thái yêu cầu không cho phép thực hiện thao tác. |

### 5.3.2. Validation

| API         | Trường dữ liệu     | Quy tắc kiểm tra                                                         |
| ----------- | ------------------ | ------------------------------------------------------------------------ |
| API01       | `phone`            | Bắt buộc nhập, không được để trống và phải đúng định dạng số điện thoại. |
| API02       | `deviceName`       | Bắt buộc nhập, không được để trống.                                      |
| API02       | `serialNumber`     | Bắt buộc nhập, không được để trống.                                      |
| API03       | `issueDescription` | Bắt buộc nhập, không được để trống.                                      |
| API04       | `issueCategory`    | Bắt buộc chọn nhóm sự cố.                                                |
| API05       | `priority`         | Bắt buộc nhập và phải thuộc mức ưu tiên được hệ thống hỗ trợ.            |
| API02–API05 | `ticketId`         | Bắt buộc tồn tại trong hệ thống trước khi thực hiện thao tác.            |

## 5.4. Trace API → User Story

| API       | Endpoint                                           | User Story                      | Mục đích                                          |
| --------- | -------------------------------------------------- | ------------------------------- | ------------------------------------------------- |
| **API01** | `GET /api/customers/search?phone={phone}`          | **US01** – Tra cứu khách hàng   | Tra cứu thông tin khách hàng theo số điện thoại.  |
| **API02** | `POST /api/tickets/{ticketId}/device`              | **US02** – Ghi nhận thiết bị    | Ghi nhận thông tin thiết bị vào yêu cầu bảo hành. |
| **API03** | `PATCH /api/tickets/{ticketId}/issue-description`  | **US03** – Ghi nhận mô tả lỗi   | Ghi nhận hoặc cập nhật mô tả lỗi của thiết bị.    |
| **API04** | `PATCH /api/tickets/{ticketId}/issue-category`     | **US04** – Phân loại nhóm sự cố | Phân loại nhóm sự cố cho yêu cầu bảo hành.        |
| **API05** | `POST /api/tickets/{ticketId}/commitment-deadline` | **US06** – Sinh hạn cam kết     | Sinh hạn cam kết xử lý cho yêu cầu bảo hành.      |

**Kết luận:** Các API trong Track SE đều được ánh xạ trực tiếp với các User Story thuộc mức ưu tiên **MUST**, bảo đảm tính truy vết giữa yêu cầu người dùng và thiết kế API.
