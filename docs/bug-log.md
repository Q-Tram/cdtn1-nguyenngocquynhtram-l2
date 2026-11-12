# BUG LOG – SMART CRM (L2)

## BUG-01: Không kiểm tra nhóm sự cố tồn tại khi tạo phiếu

1. **Mã lỗi + Mức độ:** BUG-01 – Medium.
2. **Phát hiện bởi:** TC-09 – Kiểm tra `category_id` không tồn tại.
3. **Triệu chứng:** Khi gửi yêu cầu tạo phiếu bảo hành với `category_id` không tồn tại (999999), hệ thống trả về HTTP 500 thay vì HTTP 400. Thông báo lỗi chung không thể hiện đúng nguyên nhân.
4. **Cách tái lập:**
   - Gửi POST đến `/api/tickets`.
   - Truyền `category_id = 999999`.
   - Quan sát phản hồi HTTP 500 trước khi sửa.
5. **Nguyên nhân:** Service chỉ kiểm tra `category_id` là số nguyên dương, chưa kiểm tra nhóm sự cố có tồn tại trong cơ sở dữ liệu hay không. Lỗi khóa ngoại từ PostgreSQL bị chuyển thành lỗi 500.
6. **Cách sửa:** Bổ sung hàm `findCategoryById()` trong repository và kiểm tra nhóm sự cố trong service trước khi tạo phiếu. Nếu không tồn tại, trả về lỗi HTTP 400 với thông báo `Nhóm sự cố không tồn tại.`.
7. **Commit + xác nhận:** Commit `8dbabaa`. Sau sửa, API trả về HTTP 400; kiểm tra database xác nhận không phát sinh thiết bị mới. Kiểm thử hồi quy xác nhận chức năng hoạt động đúng.

## BUG-02: Không kiểm tra nhóm sự cố tồn tại khi cập nhật phiếu

1. **Mã lỗi + Mức độ:** BUG-02 – Medium.
2. **Phát hiện bởi:** Kiểm thử chức năng cập nhật phiếu với `category_id` không tồn tại.
3. **Triệu chứng:** Khi cập nhật phiếu bảo hành với `category_id` không tồn tại (999999), hệ thống chưa kiểm tra sự tồn tại của nhóm sự cố trước khi thực hiện cập nhật.
4. **Cách tái lập:**
   - Chọn một phiếu bảo hành đã tồn tại.
   - Gửi yêu cầu cập nhật phiếu với `category_id = 999999`.
   - Quan sát kết quả xử lý trước khi sửa.
5. **Nguyên nhân:** Service cập nhật phiếu chỉ chuyển `category_id` sang kiểu số mà chưa truy vấn kiểm tra nhóm sự cố có tồn tại trong cơ sở dữ liệu hay không.
6. **Cách sửa:** Bổ sung kiểm tra `category_id` là số nguyên dương và gọi `findCategoryById()` trước khi cập nhật. Nếu nhóm sự cố không tồn tại, trả về HTTP 400 với thông báo `Nhóm sự cố không tồn tại.` và không thực hiện cập nhật.
7. **Commit + xác nhận:** Commit `78cbdb0`. Unit test BUG-02 xác nhận service từ chối cập nhật khi nhóm sự cố không tồn tại và hàm cập nhật repository không được gọi.

## BUG-03: Lọc phiếu không đúng khi sử dụng mã trạng thái

1. **Mã lỗi + Mức độ:** BUG-03 – Medium.
2. **Phát hiện bởi:** Kiểm thử chức năng lọc danh sách phiếu theo trạng thái.
3. **Triệu chứng:** Khi lọc phiếu bằng mã trạng thái `MOI_TIEP_NHAN`, hệ thống trả về danh sách rỗng dù trong cơ sở dữ liệu có phiếu mang trạng thái `Mới tiếp nhận`.
4. **Cách tái lập:**
   - Đảm bảo cơ sở dữ liệu có phiếu mang trạng thái `Mới tiếp nhận`.
   - Gửi yêu cầu lấy danh sách phiếu với tham số `status=MOI_TIEP_NHAN`.
   - Quan sát kết quả lọc trước khi sửa.
5. **Nguyên nhân:** Mã trạng thái được gửi từ giao diện không trùng với giá trị trạng thái tiếng Việt được lưu trong cơ sở dữ liệu. Repository sử dụng trực tiếp mã trạng thái làm tham số truy vấn.
6. **Cách sửa:** Bổ sung `statusMap` trong repository để ánh xạ `MOI_TIEP_NHAN` thành `Mới tiếp nhận` và `DANG_XU_LY` thành `Đang xử lý` trước khi truy vấn database.
7. **Commit + xác nhận:** Commit `7633f44`. Unit test BUG-03 xác nhận tham số truy vấn được ánh xạ đúng và điều kiện lọc trạng thái được thêm vào câu SQL.

---

**Tổng kết:** Có 03 lỗi đã được ghi nhận và sửa, mỗi lỗi có commit tương ứng. Bộ kiểm thử tự động hiện tại đạt 10/10 PASS.