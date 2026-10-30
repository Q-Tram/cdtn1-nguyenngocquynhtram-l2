# NHẬT KÝ THAY ĐỔI THIẾT KẾ

**Dự án:** Smart CRM – Mekong Mobile  
**Luồng nghiệp vụ:** L2 – Tiếp nhận và phân loại yêu cầu bảo hành

## 1. Mục đích

Ghi nhận các điểm cần điều chỉnh sau khi nhận phản hồi BT1, đảm bảo tính nhất quán giữa yêu cầu, sơ đồ thiết kế, mô hình dữ liệu và mã nguồn triển khai.

## 2. Danh sách thay đổi

### TD-01 – Bổ sung căn cứ cho quyết định kiến trúc

- **Phản hồi:** Các lập luận lựa chọn kiến trúc chưa gắn với mã NFR và ngưỡng đo lường cụ thể.
- **Quyết định:** SỬA.
- **Nội dung:** Bổ sung liên kết giữa các quyết định kiến trúc và các yêu cầu phi chức năng đã xác định trong SRS, gồm NFR01 (thời gian phản hồi không quá 3 giây), NFR02 (tối thiểu 50 người dùng đồng thời) và NFR03 (thời gian hoạt động tối thiểu 99% mỗi tháng).
- **Ảnh hưởng:** Mục giải thích kiến trúc và tài liệu thiết kế.

### TD-02 – Đồng bộ Use Case và bảng truy vết

- **Phản hồi:** UC08 – Xem lịch sử trạng thái chưa được liên kết nhất quán với yêu cầu chức năng.
- **Quyết định:** SỬA.
- **Nội dung:** Kiểm tra và đồng bộ mối liên hệ FR08 – US08 – UC08 giữa SRS, bảng truy vết và Use Case Diagram; điều chỉnh tài liệu nếu phát hiện nội dung chưa nhất quán.
- **Ảnh hưởng:** SRS, bảng truy vết và Use Case Diagram.

### TD-03 – Bổ sung dữ liệu xác minh bảo hành

- **Phản hồi:** QT05 yêu cầu đánh dấu tình trạng chưa xác minh bảo hành và lưu thông tin quản lý phê duyệt nhưng ERD chưa có trường tương ứng.
- **Quyết định:** SỬA.
- **Nội dung:** Kiểm tra và đồng bộ thiết kế lưu trạng thái xác minh bảo hành (`is_verified`) và thông tin quản lý phê duyệt (`approved_by`) giữa ERD, mô tả bảng dữ liệu và schema.sql. Làm rõ mối liên kết với người phê duyệt trước khi chốt thiết kế.
- **Ảnh hưởng:** ERD, mô tả bảng dữ liệu và schema.sql.

### TD-04 – Làm rõ phân quyền theo trung tâm

- **Phản hồi:** QT07 quy định giới hạn dữ liệu theo trung tâm/cửa hàng nhưng ERD chưa thể hiện dữ liệu đơn vị và mối liên hệ phân quyền.
- **Quyết định:** SỬA.
- **Nội dung:** Rà soát mô hình dữ liệu liên quan đến `center_id`, thông tin người dùng và phạm vi dữ liệu được phép truy cập. Làm rõ các mối liên kết còn thiếu để hỗ trợ quy tắc QT07 trước khi hoàn thiện thiết kế phân quyền.
- **Ảnh hưởng:** Mô hình dữ liệu, kiến trúc và thiết kế xử lý nghiệp vụ.

### TD-05 – Làm rõ phạm vi ngoài hệ thống

- **Phản hồi:** Mục WON'T chưa liệt kê đầy đủ các nghiệp vụ ngoài phạm vi.
- **Quyết định:** SỬA.
- **Nội dung:** Đối chiếu danh sách nghiệp vụ ngoài phạm vi trong SRS với phạm vi đã thống nhất của luồng L2, bảo đảm thể hiện rõ các nghiệp vụ không triển khai, bao gồm thanh toán trực tuyến, ứng dụng di động riêng, chatbot/livechat và xử lý sửa chữa hoặc thay thế linh kiện.
- **Ảnh hưởng:** Mục phạm vi trong SRS.

### TD-06 – Bổ sung tệp thiết kế gốc trong repository

- **Phản hồi:** Repository chưa có đầy đủ tệp thiết kế gốc, wireframe, api-contract.md và schema.sql.
- **Quyết định:** SỬA.
- **Nội dung:** Rà soát repository, bổ sung các tệp thiết kế và tài liệu triển khai còn thiếu; kiểm tra nội dung trước khi commit lên GitHub.
- **Ảnh hưởng:** Cấu trúc repository, tài liệu thiết kế và mã nguồn.

## 3. Nguyên tắc thực hiện

Các thay đổi được thực hiện dựa trên phản hồi BT1 và phạm vi luồng L2. Những nội dung chưa được xác định đầy đủ sẽ được làm rõ trước khi chốt mô hình dữ liệu và triển khai mã nguồn. Không mở rộng sang các nghiệp vụ ngoài phạm vi đã thống nhất.