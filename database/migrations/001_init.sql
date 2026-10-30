-- Migration 001: Khoi tao database Smart CRM - Mekong Mobile
-- Tao bang va du lieu mau cho luong tiep nhan, phan loai yeu cau bao hanh.

BEGIN;

-- 1. Khach hang
CREATE TABLE IF NOT EXISTS customer (
    customer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(10) NOT NULL UNIQUE,
    CONSTRAINT chk_customer_phone CHECK (phone ~ '^0[0-9]{9}$')
);

-- 2. Thiet bi
CREATE TABLE IF NOT EXISTS device (
    device_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    serial_number VARCHAR(100) NOT NULL UNIQUE,
    device_name VARCHAR(150) NOT NULL,
    purchase_date DATE,
    CONSTRAINT fk_device_customer
        FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- 3. Nhom su co
CREATE TABLE IF NOT EXISTS issue_category (
    category_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- 4. Phieu bao hanh
CREATE TABLE IF NOT EXISTS ticket (
    ticket_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    device_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    center_id BIGINT NOT NULL,
    issue_desc TEXT NOT NULL,
    priority VARCHAR(20) NOT NULL,
    status VARCHAR(30) NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    approved_by BIGINT NULL,
    due_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ticket_customer
        FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    CONSTRAINT fk_ticket_device
        FOREIGN KEY (device_id) REFERENCES device(device_id),
    CONSTRAINT fk_ticket_category
        FOREIGN KEY (category_id) REFERENCES issue_category(category_id),
    CONSTRAINT chk_ticket_priority
        CHECK (priority IN ('CAO', 'TRUNG_BINH', 'THAP'))
);

-- 5. Lich su trang thai phieu
CREATE TABLE IF NOT EXISTS ticket_status_log (
    log_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ticket_id BIGINT NOT NULL,
    from_status VARCHAR(30),
    to_status VARCHAR(30) NOT NULL,
    changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    note VARCHAR(255),
    CONSTRAINT fk_status_log_ticket
        FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id)
);

-- Du lieu mau: them nhom su co neu chua ton tai.
INSERT INTO issue_category (category_name, description)
VALUES
    ('Lỗi phần cứng', 'Các vấn đề liên quan đến màn hình, nguồn, linh kiện'),
    ('Lỗi phần mềm', 'Các vấn đề liên quan đến hệ điều hành hoặc ứng dụng'),
    ('Lỗi pin và sạc', 'Các vấn đề liên quan đến pin, cổng sạc hoặc bộ sạc')
ON CONFLICT (category_name) DO NOTHING;

COMMIT;