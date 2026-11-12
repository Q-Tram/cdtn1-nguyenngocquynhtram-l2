\# API Documentation

\*\*Project:\*\* Smart CRM – Mekong Mobile  

\*\*Module:\*\* Warranty Request Reception and Classification  

\*\*Version:\*\* 1.0  

\*\*Base URL:\*\* `http://localhost:3000`  

\*\*API Format:\*\* JSON  

\*\*Content-Type:\*\* `application/json`



\---



\## 1. General Information



\### 1.1. Overview

This document describes the REST API endpoints implemented in the Smart CRM warranty management system. The API supports customer management, warranty ticket management, application health checks, and database connectivity checks.



\### 1.2. Authentication

Authentication is not implemented in the current prototype. All documented endpoints can be accessed without an authentication token.



\### 1.3. Common Response Format

Most customer and ticket endpoints use JSON responses containing:

\- `success`: Indicates whether the request was successful.

\- `message`: A human-readable operation message, when applicable.

\- `data`: Returned resource or resource list.

\- `error`: Error description when an operation fails.



The ticket detail endpoint returns `ticket` and `logs` instead of `data`.



\### 1.4. HTTP Status Codes

| Status Code | Description |

|---|---|

| 200 | Request completed successfully. |

| 201 | Resource created successfully. |

| 400 | Invalid request data or validation error. |

| 404 | Requested resource not found. |

| 409 | Conflict with existing data or database constraints. |

| 500 | Internal server error. |



\---



\# 2. Health Check API



\## 2.1. Check Application Health



\*\*1. Method and Path\*\*



`GET /health`



\*\*2. Business Description\*\*



Checks whether the application server is running and responding to HTTP requests.



\*\*3. Authentication Requirement\*\*



Not applicable. Authentication is not implemented in the current prototype.



\*\*4. Parameters and Request Body\*\*



\- Path parameters: None.

\- Query parameters: None.

\- Request body: None.



\*\*5. Successful Response Body\*\*



HTTP `200 OK`



```json

{

&#x20; "status": "ok"

}

```



\*\*6. Error Codes\*\*



No specific application-level error response is defined for this endpoint.



\*\*7. Limitations and Notes\*\*



This endpoint only checks application availability. It does not verify database connectivity.



\*\*Actual Request and Response Example\*\*



Request:



```http

GET /health HTTP/1.1

Host: localhost:3000

```



Response:



```http

HTTP/1.1 200 OK

Content-Type: application/json; charset=utf-8

```



```json

{

&#x20; "status": "ok"

}

```



\---



\## 2.2. Check Database Connectivity



\*\*1. Method and Path\*\*



`GET /health/db`



\*\*2. Business Description\*\*



Checks whether the application can connect to the PostgreSQL database by executing a database query.



\*\*3. Authentication Requirement\*\*



Not applicable. Authentication is not implemented in the current prototype.



\*\*4. Parameters and Request Body\*\*



\- Path parameters: None.

\- Query parameters: None.

\- Request body: None.



\*\*5. Successful Response Body\*\*



HTTP `200 OK`



```json

{

&#x20; "status": "ok",

&#x20; "database": "connected",

&#x20; "time": "2026-11-12T18:56:36.839Z"

}

```



\*\*6. Error Codes\*\*



| Status | Response |

|---|---|

| 500 | `{"status":"error","database":"disconnected"}` |



\*\*7. Limitations and Notes\*\*



The endpoint verifies database connectivity at the time of the request. It does not perform a complete database integrity check.



\*\*Actual Request and Response Example\*\*



Request:



```http

GET /health/db HTTP/1.1

Host: localhost:3000

```



Response:



```http

HTTP/1.1 200 OK

Content-Type: application/json; charset=utf-8

```



```json

{

&#x20; "status": "ok",

&#x20; "database": "connected",

&#x20; "time": "2026-11-12T18:56:36.839Z"

}

```



\---



\# 3. Customer API



\## 3.1. Get All Customers



\*\*1. Method and Path\*\*



`GET /api/customers`



\*\*2. Business Description\*\*



Retrieves the customer list stored in the system.



\*\*3. Authentication Requirement\*\*



Not applicable. Authentication is not implemented in the current prototype.



\*\*4. Parameters and Request Body\*\*



\- Path parameters: None.

\- Query parameters: None.

\- Request body: None.



\*\*5. Successful Response Body\*\*



HTTP `200 OK`



```json

{

&#x20; "success": true,

&#x20; "data": \[

&#x20;   {

&#x20;     "customer\_id": "3",

&#x20;     "full\_name": "Lê Hoàng Phúc",

&#x20;     "phone": "0912345003"

&#x20;   },

&#x20;   {

&#x20;     "customer\_id": "2",

&#x20;     "full\_name": "Trần Quốc Bảo",

&#x20;     "phone": "0912345002"

&#x20;   },

&#x20;   {

&#x20;     "customer\_id": "1",

&#x20;     "full\_name": "Nguyễn Minh Anh",

&#x20;     "phone": "0912345001"

&#x20;   }

&#x20; ]

}

```



\*\*6. Error Codes\*\*



| Status | Description |

|---|---|

| 500 | Internal server error. |



\*\*7. Limitations and Notes\*\*



The endpoint returns customer information only. It does not include customer devices or warranty ticket history.



\*\*Actual Request and Response Example\*\*



Request:



```http

GET /api/customers HTTP/1.1

Host: localhost:3000

```



Response:



```http

HTTP/1.1 200 OK

Content-Type: application/json; charset=utf-8

```



```json

{

&#x20; "success": true,

&#x20; "data": \[

&#x20;   {

&#x20;     "customer\_id": "3",

&#x20;     "full\_name": "Lê Hoàng Phúc",

&#x20;     "phone": "0912345003"

&#x20;   },

&#x20;   {

&#x20;     "customer\_id": "2",

&#x20;     "full\_name": "Trần Quốc Bảo",

&#x20;     "phone": "0912345002"

&#x20;   },

&#x20;   {

&#x20;     "customer\_id": "1",

&#x20;     "full\_name": "Nguyễn Minh Anh",

&#x20;     "phone": "0912345001"

&#x20;   }

&#x20; ]

}

```



\---



\## 3.2. Get Customer by ID



\*\*1. Method and Path\*\*



`GET /api/customers/{id}`



\*\*2. Business Description\*\*



Retrieves a specific customer using the customer's ID.



\*\*3. Authentication Requirement\*\*



Not applicable. Authentication is not implemented in the current prototype.



\*\*4. Parameters and Request Body\*\*



\- Path parameter:

&#x20; - `id` (integer): Customer ID. Must be a positive integer.

\- Query parameters: None.

\- Request body: None.



\*\*5. Successful Response Body\*\*



HTTP `200 OK`



```json

{

&#x20; "success": true,

&#x20; "data": {

&#x20;   "customer\_id": "1",

&#x20;   "full\_name": "Nguyễn Minh Anh",

&#x20;   "phone": "0912345001"

&#x20; }

}

```



\*\*6. Error Codes\*\*



| Status | Description |

|---|---|

| 400 | Invalid customer ID. |

| 404 | Customer not found. |

| 500 | Internal server error. |



\*\*7. Limitations and Notes\*\*



The endpoint returns one customer record. It does not return the customer's warranty ticket history.



\*\*Actual Request and Response Example\*\*



Request:



```http

GET /api/customers/1 HTTP/1.1

Host: localhost:3000

```



Response:



```http

HTTP/1.1 200 OK

Content-Type: application/json; charset=utf-8

```



```json

{

&#x20; "success": true,

&#x20; "data": {

&#x20;   "customer\_id": "1",

&#x20;   "full\_name": "Nguyễn Minh Anh",

&#x20;   "phone": "0912345001"

&#x20; }

}

```



\*\*Actual Error Example\*\*



Request:



```http

GET /api/customers/99999 HTTP/1.1

Host: localhost:3000

```



Response:



```http

HTTP/1.1 404 Not Found

Content-Type: application/json; charset=utf-8

```



```json

{

&#x20; "success": false,

&#x20; "error": "Không tìm thấy khách hàng."

}

```



\---



\## 3.3. Create Customer



\*\*1. Method and Path\*\*



`POST /api/customers`



\*\*2. Business Description\*\*



Creates a new customer record in the system.



\*\*3. Authentication Requirement\*\*



Not applicable. Authentication is not implemented in the current prototype.



\*\*4. Parameters and Request Body\*\*



\- Path parameters: None.

\- Query parameters: None.

\- Request body:



| Field | Type | Required | Description |

|---|---|---|---|

| `full\_name` | String | Yes | Customer's full name. Maximum 100 characters. |

| `phone` | String | Yes | Customer's phone number. Must contain 10 digits and start with 0. |



\*\*Request Example\*\*



```json

{

&#x20; "full\_name": "Khach hang API test",

&#x20; "phone": "0987654321"

}

```



\*\*5. Successful Response Body\*\*



HTTP `201 Created`



```json

{

&#x20; "success": true,

&#x20; "message": "Thêm khách hàng thành công.",

&#x20; "data": {

&#x20;   "customer\_id": "10",

&#x20;   "full\_name": "Khach hang API test",

&#x20;   "phone": "0987654321"

&#x20; }

}

```



\*\*6. Error Codes\*\*



| Status | Description |

|---|---|

| 400 | Missing or invalid customer information. |

| 409 | Phone number already exists. |

| 500 | Internal server error. |



\*\*7. Limitations and Notes\*\*



Phone numbers are normalized and validated before insertion. Duplicate phone numbers are rejected.



\*\*Actual Request and Response Example\*\*



Request:



```http

POST /api/customers HTTP/1.1

Host: localhost:3000

Content-Type: application/json

```



```json

{

&#x20; "full\_name": "Khach hang API test",

&#x20; "phone": "0987654321"

}

```



Response:



```http

HTTP/1.1 201 Created

Content-Type: application/json; charset=utf-8

```



```json

{

&#x20; "success": true,

&#x20; "message": "Thêm khách hàng thành công.",

&#x20; "data": {

&#x20;   "customer\_id": "10",

&#x20;   "full\_name": "Khach hang API test",

&#x20;   "phone": "0987654321"

&#x20; }

}

```



\---



\## 3.4. Update Customer



\*\*1. Method and Path\*\*



`PUT /api/customers/{id}`



\*\*2. Business Description\*\*



Updates an existing customer's information.



\*\*3. Authentication Requirement\*\*



Not applicable. Authentication is not implemented in the current prototype.



\*\*4. Parameters and Request Body\*\*



\- Path parameter:

&#x20; - `id` (integer): Customer ID.

\- Request body:



| Field | Type | Required | Description |

|---|---|---|---|

| `full\_name` | String | Yes | Updated customer name. |

| `phone` | String | Yes | Updated phone number. Must contain 10 digits and start with 0. |



\*\*Request Example\*\*



```json

{

&#x20; "full\_name": "Khach hang API test",

&#x20; "phone": "0987654321"

}

```



\*\*5. Successful Response Body\*\*



HTTP `200 OK`



```json

{

&#x20; "success": true,

&#x20; "message": "Cập nhật khách hàng thành công.",

&#x20; "data": {

&#x20;   "customer\_id": "10",

&#x20;   "full\_name": "Khach hang API test",

&#x20;   "phone": "0987654321"

&#x20; }

}

```



\*\*6. Error Codes\*\*



| Status | Description |

|---|---|

| 400 | Invalid customer ID or customer information. |

| 404 | Customer not found. |

| 409 | Phone number already exists. |

| 500 | Internal server error. |



\*\*7. Limitations and Notes\*\*



The customer must exist before the update. The phone number must satisfy the system's validation rules.



\*\*Actual Request and Response Example\*\*



Request:



```http

PUT /api/customers/10 HTTP/1.1

Host: localhost:3000

Content-Type: application/json

```



```json

{

&#x20; "full\_name": "Khach hang API test",

&#x20; "phone": "0987654321"

}

```



Response:



```http

HTTP/1.1 200 OK

Content-Type: application/json; charset=utf-8

```



```json

{

&#x20; "success": true,

&#x20; "message": "Cập nhật khách hàng thành công.",

&#x20; "data": {

&#x20;   "customer\_id": "10",

&#x20;   "full\_name": "Khach hang API test",

&#x20;   "phone": "0987654321"

&#x20; }

}

```



\---



\## 3.5. Delete Customer



\*\*1. Method and Path\*\*



`DELETE /api/customers/{id}`



\*\*2. Business Description\*\*



Deletes a customer record by customer ID.



\*\*3. Authentication Requirement\*\*



Not applicable. Authentication is not implemented in the current prototype.



\*\*4. Parameters and Request Body\*\*



\- Path parameter:

&#x20; - `id` (integer): Customer ID.

\- Query parameters: None.

\- Request body: None.



\*\*5. Successful Response Body\*\*



HTTP `200 OK`



```json

{

&#x20; "success": true,

&#x20; "message": "Xóa khách hàng thành công."

}

```



\*\*6. Error Codes\*\*



| Status | Description |

|---|---|

| 400 | Invalid customer ID. |

| 404 | Customer not found. |

| 409 | Customer cannot be deleted because of related records or database constraints. |

| 500 | Internal server error. |



\*\*7. Limitations and Notes\*\*



Deletion may be rejected when database relationships prevent the customer from being deleted.



\*\*Actual Request and Response Example\*\*



Request:



```http

DELETE /api/customers/10 HTTP/1.1

Host: localhost:3000

```



Response:



```http

HTTP/1.1 200 OK

Content-Type: application/json; charset=utf-8

```



```json

{

&#x20; "success": true,

&#x20; "message": "Xóa khách hàng thành công."

}

```



\---



\# 4. Warranty Ticket API



\## 4.1. Get All Warranty Tickets



\*\*1. Method and Path\*\*



`GET /api/tickets`



\*\*2. Business Description\*\*



Retrieves warranty tickets with related customer and device information. The endpoint supports filtering by customer phone number, ticket status, and priority.



\*\*3. Authentication Requirement\*\*



Not applicable. Authentication is not implemented in the current prototype.



\*\*4. Parameters and Request Body\*\*



Query parameters:



| Parameter | Type | Required | Description |

|---|---|---|---|

| `phone` | String | No | Filters tickets by a partial customer phone number. |

| `status` | String | No | Filters by ticket status. `MOI\_TIEP\_NHAN` maps to `Mới tiếp nhận`; `DANG\_XU\_LY` maps to `Đang xử lý`. |

| `priority` | String | No | Filters by priority: `CAO`, `TRUNG\_BINH`, or `THAP`. |



Request body: None.



\*\*Request Example\*\*



```http

GET /api/tickets?status=MOI\_TIEP\_NHAN

```



\*\*5. Successful Response Body\*\*



HTTP `200 OK`



```json

{

&#x20; "success": true,

&#x20; "data": \[

&#x20;   {

&#x20;     "ticket\_id": "3",

&#x20;     "customer\_id": "1",

&#x20;     "device\_id": "1",

&#x20;     "category\_id": "1",

&#x20;     "center\_id": "1",

&#x20;     "issue\_desc": "Màn hình xuất hiện sọc ngang khi sử dụng",

&#x20;     "priority": "CAO",

&#x20;     "status": "Mới tiếp nhận",

&#x20;     "is\_verified": false,

&#x20;     "approved\_by": null,

&#x20;     "due\_date": "2026-11-08T17:00:00.000Z",

&#x20;     "created\_at": "2026-11-05T09:00:00.000Z",

&#x20;     "customer\_name": "Nguyễn Minh Anh",

&#x20;     "phone": "0912345001",

&#x20;     "device\_name": "iPhone 15"

&#x20;   }

&#x20; ]

}

```



The actual response returned three matching records.



\*\*6. Error Codes\*\*



| Status | Description |

|---|---|

| 500 | Internal server error. |



\*\*7. Limitations and Notes\*\*



The endpoint only supports the implemented filters. It does not provide pagination parameters in the current implementation.



\*\*Actual Request and Response Example\*\*



Request:



```http

GET /api/tickets?status=MOI\_TIEP\_NHAN HTTP/1.1

Host: localhost:3000

```



Response:



```http

HTTP/1.1 200 OK

Content-Type: application/json; charset=utf-8

```



```json

{

&#x20; "success": true,

&#x20; "data": \[

&#x20;   {

&#x20;     "ticket\_id": "3",

&#x20;     "customer\_id": "1",

&#x20;     "device\_id": "1",

&#x20;     "category\_id": "1",

&#x20;     "center\_id": "1",

&#x20;     "issue\_desc": "Màn hình xuất hiện sọc ngang khi sử dụng",

&#x20;     "priority": "CAO",

&#x20;     "status": "Mới tiếp nhận",

&#x20;     "is\_verified": false,

&#x20;     "approved\_by": null,

&#x20;     "due\_date": "2026-11-08T17:00:00.000Z",

&#x20;     "created\_at": "2026-11-05T09:00:00.000Z",

&#x20;     "customer\_name": "Nguyễn Minh Anh",

&#x20;     "phone": "0912345001",

&#x20;     "device\_name": "iPhone 15"

&#x20;   },

&#x20;   {

&#x20;     "ticket\_id": "2",

&#x20;     "customer\_id": "3",

&#x20;     "device\_id": "3",

&#x20;     "category\_id": "2",

&#x20;     "center\_id": "1",

&#x20;     "issue\_desc": "Thiết bị thường xuyên bị treo khi mở ứng dụng",

&#x20;     "priority": "THAP",

&#x20;     "status": "Mới tiếp nhận",

&#x20;     "is\_verified": false,

&#x20;     "approved\_by": null,

&#x20;     "due\_date": "2026-11-10T17:00:00.000Z",

&#x20;     "created\_at": "2026-11-05T11:00:00.000Z",

&#x20;     "customer\_name": "Lê Hoàng Phúc",

&#x20;     "phone": "0912345003",

&#x20;     "device\_name": "Xiaomi Redmi Note 13"

&#x20;   },

&#x20;   {

&#x20;     "ticket\_id": "1",

&#x20;     "customer\_id": "2",

&#x20;     "device\_id": "2",

&#x20;     "category\_id": "3",

&#x20;     "center\_id": "1",

&#x20;     "issue\_desc": "Thiết bị sạc chậm và nhanh hết pin",

&#x20;     "priority": "TRUNG\_BINH",

&#x20;     "status": "Mới tiếp nhận",

&#x20;     "is\_verified": false,

&#x20;     "approved\_by": null,

&#x20;     "due\_date": "2026-11-09T17:00:00.000Z",

&#x20;     "created\_at": "2026-11-05T10:00:00.000Z",

&#x20;     "customer\_name": "Trần Quốc Bảo",

&#x20;     "phone": "0912345002",

&#x20;     "device\_name": "Samsung Galaxy S24"

&#x20;   }

&#x20; ]

}

```



\---



\## 4.2. Get Warranty Ticket Details



\*\*1. Method and Path\*\*



`GET /api/tickets/{id}`



\*\*2. Business Description\*\*



Retrieves detailed information about a warranty ticket, including customer information, device information, issue category, and status change history.



\*\*3. Authentication Requirement\*\*



Not applicable. Authentication is not implemented in the current prototype.



\*\*4. Parameters and Request Body\*\*



\- Path parameter:

&#x20; - `id` (integer): Warranty ticket ID. Must be a positive integer.

\- Query parameters: None.

\- Request body: None.



\*\*5. Successful Response Body\*\*



HTTP `200 OK`



The response contains:

\- `ticket`: Warranty ticket details.

\- `logs`: Status change history.



\*\*6. Error Codes\*\*



| Status | Description |

|---|---|

| 400 | Invalid ticket ID. |

| 404 | Warranty ticket not found. |

| 500 | Internal server error. |



\*\*7. Limitations and Notes\*\*



The endpoint returns the existing status history. It does not provide repair execution details or spare-part information.



\*\*Actual Request and Response Example\*\*



Request:



```http

GET /api/tickets/1 HTTP/1.1

Host: localhost:3000

```



Response:



```http

HTTP/1.1 200 OK

Content-Type: application/json; charset=utf-8

```



```json

{

&#x20; "success": true,

&#x20; "ticket": {

&#x20;   "ticket\_id": "1",

&#x20;   "customer\_id": "2",

&#x20;   "device\_id": "2",

&#x20;   "category\_id": "3",

&#x20;   "center\_id": "1",

&#x20;   "issue\_desc": "Thiết bị sạc chậm và nhanh hết pin",

&#x20;   "priority": "TRUNG\_BINH",

&#x20;   "status": "Mới tiếp nhận",

&#x20;   "is\_verified": false,

&#x20;   "approved\_by": null,

&#x20;   "due\_date": "2026-11-09T17:00:00.000Z",

&#x20;   "created\_at": "2026-11-05T10:00:00.000Z",

&#x20;   "full\_name": "Trần Quốc Bảo",

&#x20;   "phone": "0912345002",

&#x20;   "device\_name": "Samsung Galaxy S24",

&#x20;   "serial\_number": "SEED\_SN\_002",

&#x20;   "purchase\_date": "2025-02-20T00:00:00.000Z",

&#x20;   "category\_name": "Lỗi pin và sạc"

&#x20; },

&#x20; "logs": \[

&#x20;   {

&#x20;     "log\_id": "1",

&#x20;     "ticket\_id": "1",

&#x20;     "from\_status": null,

&#x20;     "to\_status": "Mới tiếp nhận",

&#x20;     "changed\_at": "2026-11-12T17:31:23.198Z",

&#x20;     "note": "Tiếp nhận yêu cầu từ dữ liệu mẫu"

&#x20;   }

&#x20; ]

}

```



\---



\## 4.3. Create Warranty Ticket



\*\*1. Method and Path\*\*



`POST /api/tickets`



\*\*2. Business Description\*\*



Creates a new warranty ticket based on customer phone number, device serial number, issue category, issue description, and priority. The system creates or finds the related customer and device, assigns an initial status, calculates the SLA due date, and records the initial status log.



\*\*3. Authentication Requirement\*\*



Not applicable. Authentication is not implemented in the current prototype.



\*\*4. Parameters and Request Body\*\*



\- Path parameters: None.

\- Query parameters: None.

\- Request body:



| Field | Type | Required | Description |

|---|---|---|---|

| `phone` | String | Yes | Customer phone number. Must contain 10 digits and start with 0. |

| `serial\_number` | String | Yes | Device serial number. |

| `category\_id` | Integer | Yes | Existing issue category ID. |

| `issue\_desc` | String | Yes | Description of the reported issue. |

| `priority` | String | No | `CAO`, `TRUNG\_BINH`, or `THAP`. Defaults to `TRUNG\_BINH`. |



\*\*Request Example\*\*



```json

{

&#x20; "phone": "0912345002",

&#x20; "serial\_number": "SEED\_SN\_002",

&#x20; "category\_id": 3,

&#x20; "issue\_desc": "API documentation test - charging issue",

&#x20; "priority": "TRUNG\_BINH"

}

```



\*\*5. Successful Response Body\*\*



HTTP `201 Created`



```json

{

&#x20; "success": true,

&#x20; "message": "Tạo phiếu bảo hành thành công!",

&#x20; "data": {

&#x20;   "ticket\_id": "4",

&#x20;   "customer\_id": "2",

&#x20;   "device\_id": "2",

&#x20;   "category\_id": "3",

&#x20;   "center\_id": "1",

&#x20;   "issue\_desc": "API documentation test - charging issue",

&#x20;   "priority": "TRUNG\_BINH",

&#x20;   "status": "Mới tiếp nhận",

&#x20;   "is\_verified": false,

&#x20;   "approved\_by": null,

&#x20;   "due\_date": "2026-11-16T18:57:56.688Z",

&#x20;   "created\_at": "2026-11-12T18:57:56.688Z"

&#x20; }

}

```



\*\*6. Error Codes\*\*



| Status | Description |

|---|---|

| 400 | Missing or invalid request data; invalid or nonexistent issue category. |

| 500 | Internal server error. |



\*\*7. Limitations and Notes\*\*



The endpoint creates the initial status log as part of the ticket creation transaction. It does not perform payment processing or detailed repair management.



\*\*Actual Request and Response Example\*\*



Request:



```http

POST /api/tickets HTTP/1.1

Host: localhost:3000

Content-Type: application/json

```



```json

{

&#x20; "phone": "0912345002",

&#x20; "serial\_number": "SEED\_SN\_002",

&#x20; "category\_id": 3,

&#x20; "issue\_desc": "API documentation test - charging issue",

&#x20; "priority": "TRUNG\_BINH"

}

```



Response:



```http

HTTP/1.1 201 Created

Content-Type: application/json; charset=utf-8

```



```json

{

&#x20; "success": true,

&#x20; "message": "Tạo phiếu bảo hành thành công!",

&#x20; "data": {

&#x20;   "ticket\_id": "4",

&#x20;   "customer\_id": "2",

&#x20;   "device\_id": "2",

&#x20;   "category\_id": "3",

&#x20;   "center\_id": "1",

&#x20;   "issue\_desc": "API documentation test - charging issue",

&#x20;   "priority": "TRUNG\_BINH",

&#x20;   "status": "Mới tiếp nhận",

&#x20;   "is\_verified": false,

&#x20;   "approved\_by": null,

&#x20;   "due\_date": "2026-11-16T18:57:56.688Z",

&#x20;   "created\_at": "2026-11-12T18:57:56.688Z"

&#x20; }

}

```



\---



\## 4.4. Update Warranty Ticket



\*\*1. Method and Path\*\*



`PUT /api/tickets/{id}`



\*\*2. Business Description\*\*



Updates an existing warranty ticket's issue description, priority, issue category, and service center when provided.



\*\*3. Authentication Requirement\*\*



Not applicable. Authentication is not implemented in the current prototype.



\*\*4. Parameters and Request Body\*\*



\- Path parameter:

&#x20; - `id` (integer): Warranty ticket ID.

\- Request body:



| Field | Type | Required | Description |

|---|---|---|---|

| `issue\_desc` | String | Yes | Updated issue description. |

| `priority` | String | Yes | `CAO`, `TRUNG\_BINH`, or `THAP`. |

| `category\_id` | Integer | No | Existing issue category ID. If omitted, the current category is retained. |

| `center\_id` | Integer | No | Service center ID. If omitted, the current center is retained. |



\*\*Request Example\*\*



```json

{

&#x20; "category\_id": 3,

&#x20; "issue\_desc": "API documentation test - updated charging issue",

&#x20; "priority": "CAO"

}

```



\*\*5. Successful Response Body\*\*



HTTP `200 OK`



```json

{

&#x20; "success": true,

&#x20; "message": "Cập nhật phiếu bảo hành thành công!",

&#x20; "data": {

&#x20;   "ticket\_id": "4",

&#x20;   "customer\_id": "2",

&#x20;   "device\_id": "2",

&#x20;   "category\_id": "3",

&#x20;   "center\_id": "1",

&#x20;   "issue\_desc": "API documentation test - updated charging issue",

&#x20;   "priority": "CAO",

&#x20;   "status": "Mới tiếp nhận",

&#x20;   "is\_verified": false,

&#x20;   "approved\_by": null,

&#x20;   "due\_date": "2026-11-13T18:58:10.663Z",

&#x20;   "created\_at": "2026-11-12T18:57:56.688Z"

&#x20; }

}

```



\*\*6. Error Codes\*\*



| Status | Description |

|---|---|

| 400 | Invalid ticket ID or invalid request data. |

| 404 | Warranty ticket not found. |

| 500 | Internal server error. |



\*\*7. Limitations and Notes\*\*



The SLA due date is recalculated when the ticket is updated. The endpoint does not change the ticket status.



\*\*Actual Request and Response Example\*\*



Request:



```http

PUT /api/tickets/4 HTTP/1.1

Host: localhost:3000

Content-Type: application/json

```



```json

{

&#x20; "category\_id": 3,

&#x20; "issue\_desc": "API documentation test - updated charging issue",

&#x20; "priority": "CAO"

}

```



Response:



```http

HTTP/1.1 200 OK

Content-Type: application/json; charset=utf-8

```



```json

{

&#x20; "success": true,

&#x20; "message": "Cập nhật phiếu bảo hành thành công!",

&#x20; "data": {

&#x20;   "ticket\_id": "4",

&#x20;   "customer\_id": "2",

&#x20;   "device\_id": "2",

&#x20;   "category\_id": "3",

&#x20;   "center\_id": "1",

&#x20;   "issue\_desc": "API documentation test - updated charging issue",

&#x20;   "priority": "CAO",

&#x20;   "status": "Mới tiếp nhận",

&#x20;   "is\_verified": false,

&#x20;   "approved\_by": null,

&#x20;   "due\_date": "2026-11-13T18:58:10.663Z",

&#x20;   "created\_at": "2026-11-12T18:57:56.688Z"

&#x20; }

}

```



\---



\## 4.5. Delete Warranty Ticket



\*\*1. Method and Path\*\*



`DELETE /api/tickets/{id}`



\*\*2. Business Description\*\*



Deletes a warranty ticket by ticket ID. The associated status history records are also removed within the deletion transaction.



\*\*3. Authentication Requirement\*\*



Not applicable. Authentication is not implemented in the current prototype.



\*\*4. Parameters and Request Body\*\*



\- Path parameter:

&#x20; - `id` (integer): Warranty ticket ID.

\- Query parameters: None.

\- Request body: None.



\*\*5. Successful Response Body\*\*



HTTP `200 OK`



```json

{

&#x20; "success": true,

&#x20; "message": "Xóa phiếu bảo hành thành công!"

}

```



\*\*6. Error Codes\*\*



| Status | Description |

|---|---|

| 400 | Invalid ticket ID. |

| 404 | Warranty ticket not found. |

| 500 | Internal server error. |



\*\*7. Limitations and Notes\*\*



Deleting a ticket also deletes its status history. The related customer and device records are not deleted by this endpoint.



\*\*Actual Request and Response Example\*\*



Request:



```http

DELETE /api/tickets/4 HTTP/1.1

Host: localhost:3000

```



Response:



```http

HTTP/1.1 200 OK

Content-Type: application/json; charset=utf-8

```



```json

{

&#x20; "success": true,

&#x20; "message": "Xóa phiếu bảo hành thành công!"

}

```



\---



\# 5. API Limitations and Security Notes



1\. Authentication and authorization are not implemented in the current prototype.

2\. All endpoints are accessible without an access token.

3\. The API uses HTTP and JSON for local development.

4\. Customer phone numbers are personal data and should be protected before production deployment.

5\. The current API focuses on customer records and warranty ticket reception/classification.

6\. Payment processing, detailed repair workflows, spare-part management, and native mobile application APIs are outside the current project scope.

7\. API responses and error messages reflect the current implementation and may be changed in future versions.



\---



\*\*Document Version:\*\* 1.0  

\*\*Last Updated:\*\* November 2026

