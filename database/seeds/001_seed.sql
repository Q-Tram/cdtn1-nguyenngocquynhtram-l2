BEGIN;

-- 1. Dữ liệu mẫu khách hàng
INSERT INTO customer (full_name, phone)
VALUES
    ('Nguyễn Minh Anh', '0912345001'),
    ('Trần Quốc Bảo', '0912345002'),
    ('Lê Hoàng Phúc', '0912345003')
ON CONFLICT (phone) DO NOTHING;

-- 2. Dữ liệu mẫu thiết bị
INSERT INTO device (customer_id, serial_number, device_name, purchase_date)
SELECT c.customer_id, v.serial_number, v.device_name, v.purchase_date::DATE
FROM (
    VALUES
        ('0912345001', 'SEED_SN_001', 'iPhone 15', '2025-01-15'),
        ('0912345002', 'SEED_SN_002', 'Samsung Galaxy S24', '2025-02-20'),
        ('0912345003', 'SEED_SN_003', 'Xiaomi Redmi Note 13', '2025-03-10')
) AS v(phone, serial_number, device_name, purchase_date)
JOIN customer c ON c.phone = v.phone
ON CONFLICT (serial_number) DO NOTHING;

-- 3. Bổ sung danh mục lỗi
INSERT INTO issue_category (category_name, description)
VALUES
    ('Lỗi phần cứng', 'Các vấn đề liên quan đến màn hình, nguồn, linh kiện'),
    ('Lỗi phần mềm', 'Các vấn đề liên quan đến hệ điều hành hoặc ứng dụng'),
    ('Lỗi pin và sạc', 'Các vấn đề liên quan đến pin, cổng sạc hoặc bộ sạc')
ON CONFLICT (category_name) DO NOTHING;

-- 4. Dữ liệu mẫu yêu cầu bảo hành
INSERT INTO ticket (
    customer_id, device_id, category_id, center_id,
    issue_desc, priority, status, is_verified, due_date, created_at
)
SELECT
    c.customer_id,
    d.device_id,
    ic.category_id,
    1,
    v.issue_desc,
    v.priority,
    'Mới tiếp nhận',
    FALSE,
    v.due_date::TIMESTAMP,
    v.created_at::TIMESTAMP
FROM (
    VALUES
        ('0912345001', 'SEED_SN_001', 'Lỗi phần cứng',
         'Màn hình xuất hiện sọc ngang khi sử dụng',
         'CAO', '2026-11-08 17:00:00', '2026-11-05 09:00:00'),

        ('0912345002', 'SEED_SN_002', 'Lỗi pin và sạc',
         'Thiết bị sạc chậm và nhanh hết pin',
         'TRUNG_BINH', '2026-11-09 17:00:00', '2026-11-05 10:00:00'),

        ('0912345003', 'SEED_SN_003', 'Lỗi phần mềm',
         'Thiết bị thường xuyên bị treo khi mở ứng dụng',
         'THAP', '2026-11-10 17:00:00', '2026-11-05 11:00:00')
) AS v(phone, serial_number, category_name, issue_desc,
       priority, due_date, created_at)
JOIN customer c ON c.phone = v.phone
JOIN device d ON d.serial_number = v.serial_number
JOIN issue_category ic ON ic.category_name = v.category_name
WHERE NOT EXISTS (
    SELECT 1
    FROM ticket t
    WHERE t.device_id = d.device_id
      AND t.issue_desc = v.issue_desc
      AND t.created_at = v.created_at::TIMESTAMP
);

-- 5. Ghi nhận lịch sử trạng thái
INSERT INTO ticket_status_log (ticket_id, from_status, to_status, note)
SELECT t.ticket_id, NULL, 'Mới tiếp nhận', 'Tiếp nhận yêu cầu từ dữ liệu mẫu'
FROM ticket t
JOIN device d ON d.device_id = t.device_id
WHERE d.serial_number IN ('SEED_SN_001', 'SEED_SN_002', 'SEED_SN_003')
AND NOT EXISTS (
    SELECT 1
    FROM ticket_status_log l
    WHERE l.ticket_id = t.ticket_id
      AND l.to_status = 'Mới tiếp nhận'
      AND l.note = 'Tiếp nhận yêu cầu từ dữ liệu mẫu'
);

COMMIT;