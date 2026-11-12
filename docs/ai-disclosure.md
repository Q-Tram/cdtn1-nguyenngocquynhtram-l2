# KHAI BÁO SỬ DỤNG CÔNG CỤ AI

**Dự án:** Smart CRM – Mekong Mobile  
**Luồng nghiệp vụ:** L2 – Tiếp nhận và phân loại yêu cầu bảo hành  
**Bài tập:** Bài tập 2 và Bài tập 3 – Triển khai, kiểm thử và đóng gói prototype

## 1. Bảng khai báo sử dụng AI

| Công cụ | Dùng vào việc gì | Áp dụng ở tệp hoặc hàm nào | Em đã kiểm chứng thế nào |
|---|---|---|---|
| ChatGPT | Hỗ trợ rà soát và chỉnh sửa tài liệu dự án. | README, `docs/thay-doi-thiet-ke.md`, `docs/ai-disclosure.md`. | Đối chiếu nội dung với yêu cầu bài tập và cấu trúc repository. |
| ChatGPT | Hỗ trợ trao đổi về cấu trúc mã nguồn, nghiệp vụ và cách triển khai mô-đun. | Các thành phần liên quan đến tiếp nhận và quản lý yêu cầu bảo hành. | Kiểm tra mã nguồn thực tế, chạy ứng dụng và kiểm thử khi áp dụng đề xuất. |
| ChatGPT | Hỗ trợ xây dựng và rà soát các trường hợp kiểm thử, bao gồm luồng thành công, dữ liệu biên và dữ liệu không hợp lệ. | `docs/test-plan.md`, `docs/test-report.md`, các kiểm thử trong thư mục `tests/unit/`. | Tự thực hiện kiểm thử, đối chiếu kết quả thực tế PASS/FAIL và lưu ảnh minh chứng. |
| ChatGPT | Hỗ trợ phân tích nguyên nhân lỗi, đề xuất hướng khắc phục và rà soát Bug Log. | `src/routes/ticketRoutes.js`, `docs/bug-log.md`; các lỗi BUG-01, BUG-02 và BUG-03. | Tái hiện lỗi, kiểm tra kết quả sau khi sửa, chạy lại test và đối chiếu phản hồi API thực tế. |
| ChatGPT | Hỗ trợ rà soát hướng dẫn triển khai, cấu hình Docker và quy trình kiểm tra hệ thống. | `Dockerfile`, `docker-compose.yml`, `database/migrations/001_init.sql`, `database/seeds/001_seed.sql`, `docs/deployment-guide.md`. | Thực hiện kiểm thử trên thư mục clone mới, chạy Docker Compose, kiểm tra healthcheck, dữ liệu mẫu và chạy lại migration, seed. |
| ChatGPT | Hỗ trợ soạn và rà soát tài liệu API, tài liệu bảo mật. | `docs/api-documentation.md`, `docs/security-checklist.md`. | Đối chiếu endpoint với mã nguồn, lấy ví dụ request/response từ lần gọi API thực tế và kiểm tra các nội dung bảo mật với hệ thống. |

## 2. Trách nhiệm của người thực hiện

Người thực hiện chịu trách nhiệm xem xét, chỉnh sửa và xác minh nội dung do công cụ AI đề xuất trước khi đưa vào tài liệu hoặc mã nguồn của dự án.

Công cụ AI chỉ đóng vai trò hỗ trợ. Người thực hiện tự chạy các trường hợp kiểm thử, tái hiện và xác minh lỗi, kiểm tra kết quả triển khai Docker, đối chiếu API với hệ thống thực tế và lưu lại minh chứng.

Các kết quả PASS, lỗi đã sửa và nội dung tài liệu chỉ được ghi nhận khi đã được kiểm chứng bằng quá trình thực hiện thực tế. Những đề xuất chưa được áp dụng hoặc chưa được kiểm tra không được xem là kết quả hoàn thành.