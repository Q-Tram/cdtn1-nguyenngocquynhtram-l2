

\# TEST REPORT – SMART CRM (L2)



\## 1. Thông tin kiểm thử



\- Dự án: Smart CRM – Mekong Mobile.

\- Luồng nghiệp vụ: L2 – Tiếp nhận và phân loại yêu cầu bảo hành.

\- Tài liệu kế hoạch kiểm thử: `docs/test-plan.md`.

\- Tổng số test case: 12.

\- Kết quả kiểm thử tự động: 10/10 PASS (`npm test`).



\## 2. Kết quả kiểm thử



\### 2.1. Happy Path



| Mã | Tiền điều kiện | Các bước | Dữ liệu thử | Kết quả mong đợi | Mức ưu tiên | Kết quả thực tế | PASS/FAIL |

|---|---|---|---|---|---|---|---|

| TC-01 | Server hoạt động, dữ liệu danh mục hợp lệ | Gửi POST `/api/tickets` để tạo phiếu | Thông tin khách hàng, thiết bị, mô tả lỗi và nhóm sự cố hợp lệ | Tạo phiếu thành công, trả về thông tin phiếu | High | API tạo phiếu thành công, có thông tin phiếu trả về | PASS |

| TC-02 | Có phiếu bảo hành đã tồn tại | Gửi GET `/api/tickets/:id` | ID phiếu hợp lệ | Trả về đúng thông tin chi tiết phiếu | High | API trả về thông tin chi tiết phiếu | PASS |

| TC-03 | Có phiếu bảo hành đã tồn tại | Gửi PUT `/api/tickets/:id` để cập nhật | ID phiếu hợp lệ và dữ liệu cập nhật hợp lệ | Cập nhật thành công, dữ liệu được lưu | High | API cập nhật phiếu thành công | PASS |



\### 2.2. Boundary Testing



| Mã | Tiền điều kiện | Các bước | Dữ liệu thử | Kết quả mong đợi | Mức ưu tiên | Kết quả thực tế | PASS/FAIL |

|---|---|---|---|---|---|---|---|

| TC-04 | Server hoạt động | Gửi yêu cầu tạo phiếu với số điện thoại 9 chữ số | Số điện thoại 9 chữ số | Từ chối dữ liệu không đủ độ dài | Medium | Hệ thống từ chối số điện thoại không hợp lệ | PASS |

| TC-05 | Server hoạt động | Gửi yêu cầu tạo phiếu với số điện thoại 10 chữ số | Số điện thoại 10 chữ số hợp lệ | Chấp nhận dữ liệu hợp lệ | Medium | Hệ thống chấp nhận số điện thoại hợp lệ | PASS |



\### 2.3. Invalid Data



| Mã | Tiền điều kiện | Các bước | Dữ liệu thử | Kết quả mong đợi | Mức ưu tiên | Kết quả thực tế | PASS/FAIL |

|---|---|---|---|---|---|---|---|

| TC-06 | Server hoạt động | Gửi POST `/api/tickets` thiếu trường mô tả lỗi | Không gửi `issue\_desc` | Từ chối yêu cầu và trả lỗi phù hợp | High | Hệ thống từ chối dữ liệu thiếu | PASS |

| TC-07 | Server hoạt động | Gửi POST `/api/tickets` với số điện thoại sai định dạng | Số điện thoại không hợp lệ | Từ chối dữ liệu đầu vào | High | Hệ thống từ chối số điện thoại không hợp lệ | PASS |

| TC-08 | Server hoạt động | Gửi yêu cầu với mức ưu tiên không hợp lệ | Giá trị priority không thuộc danh sách cho phép | Từ chối dữ liệu không hợp lệ | Medium | Hệ thống từ chối mức ưu tiên không hợp lệ | PASS |



\### 2.4. Data Quality / Integrity



| Mã | Tiền điều kiện | Các bước | Dữ liệu thử | Kết quả mong đợi | Mức ưu tiên | Kết quả thực tế | PASS/FAIL |

|---|---|---|---|---|---|---|---|

| TC-09 | Server hoạt động, nhóm sự cố không tồn tại | Gửi POST `/api/tickets` | `category\_id = 999999` | Trả HTTP 400, thông báo nhóm sự cố không tồn tại và không tạo phiếu | High | Sau khi sửa BUG-01, API trả HTTP 400 và không phát sinh dữ liệu thiết bị mới | PASS |

| TC-10 | Database hoạt động | Tạo phiếu và kiểm tra bản ghi lịch sử trạng thái | Dữ liệu tạo phiếu hợp lệ | Phiếu và lịch sử trạng thái được ghi nhận nhất quán | High | Kiểm tra API và database cho kết quả phù hợp | PASS |



\### 2.5. Reproducibility



| Mã | Tiền điều kiện | Các bước | Dữ liệu thử | Kết quả mong đợi | Mức ưu tiên | Kết quả thực tế | PASS/FAIL |

|---|---|---|---|---|---|---|---|

| TC-11 | Database đã khởi tạo | Chạy lại migration | Các file migration hiện có | Migration chạy lại không gây lỗi hoặc làm hỏng cấu trúc dữ liệu | Medium | Migration được chạy lại và có ảnh minh chứng | PASS |

| TC-12 | Database đã có dữ liệu mẫu | Chạy lại seed | Các file seed hiện có | Seed chạy lại không tạo dữ liệu trùng lặp ngoài dự kiến | Medium | Seed được chạy lại và có ảnh minh chứng | PASS |



\## 3. Tổng kết



\- Tổng số test case: 12.

\- PASS: 12.

\- FAIL: 0.

\- Tỷ lệ PASS: 100%.

\- Các lỗi BUG-01, BUG-02 và BUG-03 đã được ghi nhận, sửa chữa và có commit tương ứng.

\- Bộ kiểm thử tự động `npm test`: 10/10 PASS.



\## 4. Minh chứng kiểm thử



Ảnh minh chứng được lưu tại `docs/screenshots/`.



\- TC-01: `TC-01.png`, `TC-01-API.png`

\- TC-02: `TC-02.png`

\- TC-03: `TC-03-API.png`, `TC-03-DB.png`

\- TC-04: `TC-04.png`

\- TC-05: `TC-05.png`

\- TC-06: `TC-06-API.png`, `TC-06-DB.png`

\- TC-07: `TC-07-API.png`, `TC-07-DB.png`

\- TC-08: `TC-08-API.png`, `TC-08-DB.png`

\- TC-09: `TC-09-API.png`, `TC-09-DB.png`

\- TC-10: `TC-10-API.png`, `TC-10-DB.png`

\- TC-11: `TC-11.png`

\- TC-12: `TC-12-DB.png`, `TC-12-SEED.png`



\- BUG-01: `BUG-01-fixed-API.png`, `BUG-01-fixed-DB.png`, `BUG-01-fixed-test.png`

\- BUG-02: Các ảnh minh chứng BUG-02 trong thư mục `docs/screenshots/`.

\- BUG-03: `BUG-03-before.png`, `BUG-03-after.png`, `BUG-03-fixed-test.png`



