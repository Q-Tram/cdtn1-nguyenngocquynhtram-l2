# SECURITY CHECKLIST – SMART CRM (MEKONG MOBILE)

**Project:** Smart CRM – Mekong Mobile  
**Track:** Software Engineering (SE) – L2  
**Repository:** cdtn1-nguyenngocquynhtram-l2

## 1. Security Checklist

| STT | Tiêu chí bảo mật | Trạng thái | Minh chứng |
|---|---|---|---|
| 1 | Không có secret nào trong repository | ĐÃ LÀM | `.env` được khai báo trong `.gitignore`; `git ls-files .env` và `git log --all --full-history -- .env` không trả về kết quả; `git check-ignore .env` trả về `.env`. |
| 2 | Dữ liệu đầu vào được kiểm tra ở tầng ứng dụng | ĐÃ LÀM | `src/services/ticketService.js` kiểm tra số điện thoại, serial thiết bị, mô tả sự cố, nhóm sự cố, mức ưu tiên và mã phiếu trước khi thao tác dữ liệu. |
| 3 | Kiểm soát truy cập theo chủ sở hữu | CHƯA LÀM | `src/server.js` chưa triển khai middleware xác thực và phân quyền; các API ticket chưa kiểm tra quyền sở hữu phiếu. |
| 4 | Mật khẩu và dữ liệu xác thực được băm hoặc mã hóa | CHƯA LÀM | Prototype chưa có chức năng đăng nhập; dữ liệu số điện thoại khách hàng đang được lưu trong cơ sở dữ liệu nhưng chưa có cơ chế mã hóa được xác minh. |
| 5 | Thông báo lỗi không làm lộ cấu trúc bên trong hệ thống | ĐÃ LÀM | `src/routes/ticketRoutes.js` và `src/routes/customerRoutes.js` trả thông báo lỗi chung khi xảy ra lỗi 500, không trả trực tiếp chi tiết lỗi nội bộ hoặc stack trace cho client. |
| 6 | Nhật ký không ghi secret hoặc dữ liệu cá nhân không cần thiết | CHƯA LÀM | `src/config/database.js` ghi toàn bộ đối tượng lỗi PostgreSQL bằng `console.error`; các route và `src/api/client.js` cũng ghi thông tin lỗi ra console, chưa có cơ chế lọc hoặc che dữ liệu nhạy cảm. |
| 7 | Dependencies được khóa phiên bản và đã kiểm tra cảnh báo lỗ hổng cơ bản | ĐÃ LÀM | Repository có `package-lock.json`; đã chạy `npm audit fix`, kết quả `found 0 vulnerabilities`; chạy lại `npm test` đạt 10/10 PASS, 0 FAIL. |

## 2. Security Notes

- Đây là prototype phục vụ mục đích học tập và kiểm thử, chưa phải hệ thống sẵn sàng triển khai trong môi trường production.
- Hệ thống chưa có chức năng đăng nhập và phân quyền theo người dùng.
- Cần bổ sung cơ chế xác thực, phân quyền, bảo vệ dữ liệu khách hàng và kiểm soát nhật ký trước khi triển khai thực tế.
- Các thông tin cấu hình nhạy cảm cần được lưu trong biến môi trường và không đưa lên repository.

## 3. Verification Summary

| Kiểm tra | Kết quả |
|---|---|
| Kiểm tra `.env` trong Git | Không tìm thấy |
| Kiểm tra `.env` bị ignore | Có |
| `npm audit` sau khi sửa | 0 vulnerabilities |
| `npm test` | 10/10 PASS |
| Phân quyền theo chủ sở hữu | Chưa triển khai |
| Kiểm soát dữ liệu nhạy cảm trong log | Chưa hoàn thiện |

**Conclusion:** The prototype implements basic input validation and generic client-facing error messages. However, authentication, owner-based access control, and sensitive log filtering remain limitations that should be addressed before production deployment.