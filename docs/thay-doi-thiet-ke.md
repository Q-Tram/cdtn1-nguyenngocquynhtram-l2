# NHẬT KÝ THAY ĐỔI THIẾT KẾ

**Dự án:** Smart CRM – Mekong Mobile  
**Luồng nghiệp vụ:** L2 – Tiếp nhận và phân loại yêu cầu bảo hành

## 1. Mục đích

Ghi nhận các điểm cần điều chỉnh sau khi nhận phản hồi BT1, đảm bảo tính nhất quán giữa yêu cầu, sơ đồ thiết kế, mô hình dữ liệu và mã nguồn triển khai.

## 2. Danh sách thay đổi

### TD-01 – Bổ sung căn cứ cho quyết định kiến trúc

- **Phản hồi:** Các lập luận lựa chọn kiến trúc chưa gắn với mã NFR và ngưỡng đo lường cụ thể.
- **Quyết định:** SỬA.
- **Nội dung:** Liên kết các quyết định kiến trúc với NFR01 (phản hồi không quá 3 giây), NFR02 (tối thiểu 50 người dùng đồng thời) và NFR03 (thời gian hoạt động tối thiểu 99% mỗi tháng).
- **Ảnh hưởng:** Mục giải thích kiến trúc và tài liệu thiết kế.

### TD-02 – Đồng bộ Use Case và bảng truy vết

- **Phản hồi:** UC08 – Xem lịch sử trạng thái chưa được liên kết nhất quán với yêu cầu chức năng.
- **Quyết định:** SỬA.
- **Nội dung:** Giữ US08 và FR08 đã có trong SRS; bổ sung FR08 – US08 – UC08 vào bảng truy vết và kiểm tra lại sơ đồ Use Case.
- **Ảnh hưởng:** SRS, bảng truy vết và Use Case Diagram.

### TD-03 – Bổ sung dữ liệu xác minh bảo hành

- **Phản hồi:** QT05 yêu cầu đánh dấu tình trạng chưa xác minh bảo hành và lưu thông tin quản lý phê duyệt nhưng ERD chưa có trường tương ứng.
- **Quyết định:** SỬA.
- **Nội dung:** Bổ sung thiết kế lưu trạng thái xác minh bảo hành và thông tin phê duyệt. Xác định rõ cách liên kết người phê duyệt trước khi chốt DDL.
- **Ảnh hưởng:** ERD, mô tả bảng dữ liệu và schema.sql.

### TD-04 – Làm rõ phân quyền theo trung tâm

- **Phản hồi:** QT07 quy định giới hạn dữ liệu theo trung tâm/cửa hàng nhưng ERD chưa thể hiện dữ liệu đơn vị và mối liên hệ phân quyền.
- **Quyết định:** SỬA.
- **Nội dung:** Xác định mô hình lưu thông tin trung tâm/cửa hàng, người dùng và phạm vi dữ liệu được phép truy cập trước khi triển khai phân quyền.
- **Ảnh hưởng:** Mô hình dữ liệu, kiến trúc và thiết kế xử lý nghiệp vụ.

### TD-05 – Làm rõ phạm vi ngoài hệ thống

- **Phản hồi:** Mục WON'T chưa liệt kê đầy đủ các nghiệp vụ ngoài phạm vi.
- **Quyết định:** SỬA.
- **Nội dung:** Liệt kê cụ thể các nghiệp vụ không triển khai như thanh toán trực tuyến, ứng dụng di động riêng, chatbot/livechat và xử lý sửa chữa hoặc thay thế linh kiện.
- **Ảnh hưởng:** Mục phạm vi trong SRS.

### TD-06 – Bổ sung tệp thiết kế gốc trong repository

- **Phản hồi:** Repository chưa có đầy đủ tệp thiết kế gốc, wireframe, api-contract.md và schema.sql.
- **Quyết định:** SỬA.
- **Nội dung:** Bổ sung các tệp thiết kế và tài liệu triển khai còn thiếu; kiểm tra nội dung trước khi commit lên GitHub.
- **Ảnh hưởng:** Cấu trúc repository, tài liệu thiết kế và mã nguồn.

## 3. Nguyên tắc thực hiện

Các thay đổi được thực hiện dựa trên phản hồi BT1 và phạm vi luồng L2. Những nội dung chưa được xác định đầy đủ sẽ được làm rõ trước khi chốt mô hình dữ liệu và triển khai mã nguồn. Không mở rộng sang các nghiệp vụ ngoài phạm vi đã thống nhất.