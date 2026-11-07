# BUG LOG – SMART CRM (L2)

## BUG-01: Không kiểm tra nhóm sự cố tồn tại khi tạo phiếu

1. **Mã lỗi + Mức độ:** BUG-01 – Medium.
2. **Phát hiện bởi:** TC-09 – Kiểm tra category_id không tồn tại.
3. **Triệu chứng:** Khi gửi yêu cầu tạo phiếu bảo hành với category_id không tồn tại (999999), hệ thống trả về HTTP 500 thay vì HTTP 400. Thông báo lỗi chung không thể hiện đúng nguyên nhân.
4. **Cách tái lập:**
   - Gửi POST đến `/api/tickets`.
   - Truyền `category_id = 999999`.
   - Quan sát phản hồi HTTP 500 trước khi sửa.
5. **Nguyên nhân:** Service chỉ kiểm tra category_id là số nguyên dương, chưa kiểm tra nhóm sự cố có tồn tại trong cơ sở dữ liệu hay không. Lỗi khóa ngoại từ PostgreSQL bị chuyển thành lỗi 500.
6. **Cách sửa:** Bổ sung hàm `findCategoryById()` trong repository và kiểm tra nhóm sự cố trong service trước khi tạo phiếu. Nếu không tồn tại, trả về lỗi HTTP 400 với thông báo `Nhóm sự cố không tồn tại.`.
7. **Commit + xác nhận:** Chưa commit. Sau sửa, API trả về HTTP 400; kiểm tra database xác nhận không phát sinh thiết bị mới. Kiểm thử hồi quy và 7 kiểm thử cũ đều PASS (8/8).