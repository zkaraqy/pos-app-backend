# API Documentation - POS App Backend

Base URL: `http://localhost:3000`

## Table of Contents
- [Authentication](#authentication)
- [Products](#products)
- [Transactions](#transactions)
- [Response Format](#response-format)
- [Error Handling](#error-handling)

---

## Authentication

### POST /api/login
Login user dan mendapatkan JWT token.

**Request Body:**
```json
{
  "email": "string (email format, required)",
  "password": "string (required)"
}
```

**Success Response (200):**
```json
{
  "userData": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

**Example Request (Success):**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**Example Request (Failed - Invalid Email):**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "password": "admin123"
  }'
```

**Validation Error Response (400):**
```json
{
  "data": {
    "email": "invalid-email",
    "password": "admin123"
  },
  "error": [
    {
      "code": "invalid_string",
      "validation": "email",
      "path": ["email"],
      "message": "Invalid email"
    }
  ],
  "success": false
}
```

---

## Products

### GET /api/products
Mendapatkan daftar semua produk dengan pagination dan search.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | number | No | 1 | Halaman yang ingin ditampilkan |
| rowsPerPage | number | No | 10 | Jumlah data per halaman |
| search | string | No | - | Pencarian berdasarkan nama produk (LIKE) |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Espresso",
      "description": "Strong black coffee",
      "price": 25000,
      "stock": 100,
      "createdAt": "2025-01-15T10:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z",
      "productCategories": [
        {
          "id": 1,
          "idProduct": 1,
          "idCategory": 1,
          "createdAt": "2025-01-15T10:00:00.000Z",
          "updatedAt": "2025-01-15T10:00:00.000Z",
          "category": {
            "id": 1,
            "name": "Coffee",
            "description": "Coffee beverages",
            "createdAt": "2025-01-15T10:00:00.000Z",
            "updatedAt": "2025-01-15T10:00:00.000Z"
          }
        }
      ],
      "productVarians": [
        {
          "id": 1,
          "idProduct": 1,
          "name": "Hot",
          "price": 25000,
          "stock": 50,
          "createdAt": "2025-01-15T10:00:00.000Z",
          "updatedAt": "2025-01-15T10:00:00.000Z",
          "images": []
        }
      ],
      "images": [
        {
          "id": 1,
          "url": "https://example.com/espresso.jpg",
          "createdAt": "2025-01-15T10:00:00.000Z",
          "updatedAt": "2025-01-15T10:00:00.000Z"
        }
      ]
    }
  ],
  "metadata": {
    "page": 1,
    "rowsPerPage": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

**Example Request (With Pagination):**
```bash
curl -X GET "http://localhost:3000/api/products?page=1&rowsPerPage=5"
```

**Example Request (With Search):**
```bash
curl -X GET "http://localhost:3000/api/products?search=coffee&page=1&rowsPerPage=10"
```

**Example Request (All Parameters):**
```bash
curl -X GET "http://localhost:3000/api/products?page=2&rowsPerPage=5&search=latte"
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Failed to retrieve products",
  "error": "Database connection failed"
}
```

---

### GET /api/products/:id
Mendapatkan detail produk berdasarkan ID.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string/number | Yes | ID produk yang ingin diambil |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": 1,
    "name": "Espresso",
    "description": "Strong black coffee",
    "price": 25000,
    "stock": 100,
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T10:00:00.000Z",
    "productCategories": [
      {
        "id": 1,
        "idProduct": 1,
        "idCategory": 1,
        "category": {
          "id": 1,
          "name": "Coffee",
          "description": "Coffee beverages"
        }
      }
    ],
    "productVarians": [
      {
        "id": 1,
        "idProduct": 1,
        "name": "Hot",
        "price": 25000,
        "stock": 50,
        "images": []
      }
    ],
    "images": [
      {
        "id": 1,
        "url": "https://example.com/espresso.jpg"
      }
    ]
  }
}
```

**Example Request (Success):**
```bash
curl -X GET http://localhost:3000/api/products/1
```

**Example Request (Failed - Not Found):**
```bash
curl -X GET http://localhost:3000/api/products/9999
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## Transactions

### GET /api/transactions
Mendapatkan daftar semua transaksi dengan pagination dan filter.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | number | No | 1 | Halaman yang ingin ditampilkan |
| rowsPerPage | number | No | 10 | Jumlah data per halaman |
| status | enum | No | - | Filter berdasarkan status: `waiting_payment`, `canceled`, `completed` |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Transactions retrieved successfully",
  "data": [
    {
      "id": 1,
      "idCashier": 1,
      "ref": "TRX-20250115-001",
      "type": "makan_ditempat",
      "tableNumber": 5,
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "paymentMethod": "qris",
      "status": "completed",
      "createdAt": "2025-01-15T10:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z",
      "user": {
        "id": 1,
        "name": "Admin User",
        "email": "admin@example.com",
        "role": "admin"
      },
      "transactionDetails": [
        {
          "id": 1,
          "idTransaction": 1,
          "idProduct": 1,
          "idProductVarian": null,
          "price": 25000,
          "quantity": 2,
          "createdAt": "2025-01-15T10:00:00.000Z",
          "updatedAt": "2025-01-15T10:00:00.000Z",
          "product": {
            "id": 1,
            "name": "Espresso",
            "price": 25000
          },
          "productVarian": null
        }
      ]
    }
  ],
  "metadata": {
    "page": 1,
    "rowsPerPage": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

**Example Request (Default):**
```bash
curl -X GET http://localhost:3000/api/transactions
```

**Example Request (With Pagination):**
```bash
curl -X GET "http://localhost:3000/api/transactions?page=2&rowsPerPage=20"
```

**Example Request (With Status Filter):**
```bash
curl -X GET "http://localhost:3000/api/transactions?status=completed"
```

**Example Request (All Parameters):**
```bash
curl -X GET "http://localhost:3000/api/transactions?page=1&rowsPerPage=15&status=waiting_payment"
```

---

### GET /api/transactions/:id
Mendapatkan detail transaksi berdasarkan ID.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string/number | Yes | ID transaksi yang ingin diambil |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Transaction retrieved successfully",
  "data": {
    "id": 1,
    "idCashier": 1,
    "ref": "TRX-20250115-001",
    "type": "makan_ditempat",
    "tableNumber": 5,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "paymentMethod": "qris",
    "status": "completed",
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T10:00:00.000Z",
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    },
    "transactionDetails": [
      {
        "id": 1,
        "idTransaction": 1,
        "idProduct": 1,
        "idProductVarian": null,
        "price": 25000,
        "quantity": 2,
        "product": {
          "id": 1,
          "name": "Espresso",
          "price": 25000
        },
        "productVarian": null
      }
    ]
  }
}
```

**Example Request (Success):**
```bash
curl -X GET http://localhost:3000/api/transactions/1
```

**Example Request (Failed - Not Found):**
```bash
curl -X GET http://localhost:3000/api/transactions/9999
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Transaction not found"
}
```

---

### POST /api/transactions
Membuat transaksi baru.

**Request Body:**
```json
{
  "id_cashier": "number (required, positive)",
  "type": "enum (required): 'makan_ditempat' | 'bawa_pulang'",
  "table_number": "number (optional, nullable)",
  "customer_name": "string (optional, nullable)",
  "customer_email": "string (optional, nullable, email format)",
  "payment_method": "enum (required): 'qris' | 'cash'",
  "status": "enum (optional): 'waiting_payment' | 'canceled' | 'completed'",
  "ref": "string (optional, auto-generated if not provided)",
  "items": [
    {
      "id_product": "number (optional, nullable, positive)",
      "id_product_varian": "number (optional, nullable, positive)",
      "price": "number (required, positive)",
      "quantity": "number (required, positive)"
    }
  ]
}
```

**Constraints:**
- `items` harus memiliki minimal 1 item
- Setiap item harus memiliki `id_product` ATAU `id_product_varian` (salah satu atau keduanya)
- `ref` akan di-generate otomatis jika tidak disediakan (format: `TRX-YYYYMMDD-XXX`)
- `status` default: `waiting_payment`

**Success Response (201):**
```json
{
  "success": true,
  "message": "Transaction created successfully",
  "data": {
    "id": 1,
    "idCashier": 1,
    "ref": "TRX-20250115-001",
    "type": "makan_ditempat",
    "tableNumber": 5,
    "customerName": "Jane Smith",
    "customerEmail": "jane@example.com",
    "paymentMethod": "qris",
    "status": "waiting_payment",
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T10:00:00.000Z",
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    },
    "transactionDetails": [
      {
        "id": 1,
        "idTransaction": 1,
        "idProduct": 1,
        "idProductVarian": null,
        "price": 25000,
        "quantity": 2,
        "product": {
          "id": 1,
          "name": "Espresso",
          "price": 25000
        },
        "productVarian": null
      }
    ]
  }
}
```

**Example Request (Success - Basic):**
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "id_cashier": 1,
    "type": "bawa_pulang",
    "payment_method": "cash",
    "items": [
      {
        "id_product": 1,
        "price": 25000,
        "quantity": 2
      }
    ]
  }'
```

**Example Request (Success - Complete):**
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "id_cashier": 1,
    "type": "makan_ditempat",
    "table_number": 5,
    "customer_name": "Jane Smith",
    "customer_email": "jane@example.com",
    "payment_method": "qris",
    "status": "completed",
    "items": [
      {
        "id_product": 1,
        "price": 25000,
        "quantity": 2
      },
      {
        "id_product_varian": 3,
        "price": 30000,
        "quantity": 1
      }
    ]
  }'
```

**Example Request (Failed - Missing Required Fields):**
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "id_cashier": 1,
    "type": "makan_ditempat"
  }'
```

**Validation Error Response (400):**
```json
{
  "data": {
    "id_cashier": 1,
    "type": "makan_ditempat"
  },
  "error": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["payment_method"],
      "message": "Required"
    },
    {
      "code": "invalid_type",
      "expected": "array",
      "received": "undefined",
      "path": ["items"],
      "message": "Required"
    }
  ],
  "success": false
}
```

**Example Request (Failed - Invalid Type):**
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "id_cashier": 1,
    "type": "invalid_type",
    "payment_method": "qris",
    "items": [
      {
        "id_product": 1,
        "price": 25000,
        "quantity": 2
      }
    ]
  }'
```

**Validation Error Response (400):**
```json
{
  "data": {
    "id_cashier": 1,
    "type": "invalid_type",
    "payment_method": "qris",
    "items": [
      {
        "id_product": 1,
        "price": 25000,
        "quantity": 2
      }
    ]
  },
  "error": [
    {
      "code": "invalid_enum_value",
      "options": ["makan_ditempat", "bawa_pulang"],
      "path": ["type"],
      "message": "Invalid enum value. Expected 'makan_ditempat' | 'bawa_pulang', received 'invalid_type'"
    }
  ],
  "success": false
}
```

**Example Request (Failed - Empty Items Array):**
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "id_cashier": 1,
    "type": "makan_ditempat",
    "payment_method": "qris",
    "items": []
  }'
```

**Validation Error Response (400):**
```json
{
  "data": {
    "id_cashier": 1,
    "type": "makan_ditempat",
    "payment_method": "qris",
    "items": []
  },
  "error": [
    {
      "code": "too_small",
      "minimum": 1,
      "type": "array",
      "inclusive": true,
      "path": ["items"],
      "message": "Array must contain at least 1 element(s)"
    }
  ],
  "success": false
}
```

---

### POST /api/transactions/bulk
Membuat multiple transaksi sekaligus (bulk insert).

**Request Body:**
```json
{
  "transactions": [
    {
      "id_cashier": "number (required, positive)",
      "type": "enum (required): 'makan_ditempat' | 'bawa_pulang'",
      "table_number": "number (optional, nullable)",
      "customer_name": "string (optional, nullable)",
      "customer_email": "string (optional, nullable, email format)",
      "payment_method": "enum (required): 'qris' | 'cash'",
      "status": "enum (optional): 'waiting_payment' | 'canceled' | 'completed'",
      "ref": "string (optional, auto-generated if not provided)",
      "items": [
        {
          "id_product": "number (optional, nullable, positive)",
          "id_product_varian": "number (optional, nullable, positive)",
          "price": "number (required, positive)",
          "quantity": "number (required, positive)"
        }
      ]
    }
  ]
}
```

**Constraints:**
- `transactions` harus memiliki minimal 1 transaksi
- Setiap transaksi mengikuti aturan yang sama dengan POST `/api/transactions`
- Jika salah satu transaksi gagal, transaksi lainnya tetap diproses (partial success)
- Duplicate `ref` akan di-skip

**Success Response (201):**
```json
{
  "success": true,
  "message": "Bulk transaction processing completed",
  "data": {
    "total": 3,
    "successful": 2,
    "failed": 1,
    "results": {
      "success": [
        {
          "ref": "TRX-20250115-001",
          "id": 1
        },
        {
          "ref": "TRX-20250115-002",
          "id": 2
        }
      ],
      "failed": [
        {
          "ref": "TRX-20250115-001",
          "error": "Transaction with this reference already exists"
        }
      ]
    }
  }
}
```

**Example Request (Success - Multiple Transactions):**
```bash
curl -X POST http://localhost:3000/api/transactions/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "transactions": [
      {
        "id_cashier": 1,
        "type": "makan_ditempat",
        "table_number": 5,
        "payment_method": "qris",
        "items": [
          {
            "id_product": 1,
            "price": 25000,
            "quantity": 2
          }
        ]
      },
      {
        "id_cashier": 2,
        "type": "bawa_pulang",
        "customer_name": "Bob",
        "payment_method": "cash",
        "items": [
          {
            "id_product": 2,
            "price": 30000,
            "quantity": 1
          }
        ]
      }
    ]
  }'
```

**Example Request (Failed - Empty Array):**
```bash
curl -X POST http://localhost:3000/api/transactions/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "transactions": []
  }'
```

**Validation Error Response (400):**
```json
{
  "data": {
    "transactions": []
  },
  "error": [
    {
      "code": "too_small",
      "minimum": 1,
      "type": "array",
      "inclusive": true,
      "path": ["transactions"],
      "message": "Array must contain at least 1 element(s)"
    }
  ],
  "success": false
}
```

---

### PUT /api/transactions/:id
Mengupdate transaksi yang sudah ada (hanya field tertentu yang bisa diupdate).

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string/number | Yes | ID transaksi yang ingin diupdate |

**Request Body:**
```json
{
  "status": "enum (optional): 'waiting_payment' | 'canceled' | 'completed'",
  "table_number": "number (optional, nullable)",
  "customer_name": "string (optional, nullable)",
  "customer_email": "string (optional, nullable, email format)",
  "payment_method": "enum (optional): 'qris' | 'cash'"
}
```

**Notes:**
- Semua field adalah optional
- Hanya field yang dikirim yang akan diupdate
- Field `items`, `id_cashier`, `type`, dan `ref` **TIDAK** bisa diupdate

**Success Response (200):**
```json
{
  "success": true,
  "message": "Transaction updated successfully",
  "data": {
    "id": 1,
    "idCashier": 1,
    "ref": "TRX-20250115-001",
    "type": "makan_ditempat",
    "tableNumber": 7,
    "customerName": "John Updated",
    "customerEmail": "john.updated@example.com",
    "paymentMethod": "cash",
    "status": "completed",
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T11:30:00.000Z",
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    },
    "transactionDetails": [
      {
        "id": 1,
        "idTransaction": 1,
        "idProduct": 1,
        "idProductVarian": null,
        "price": 25000,
        "quantity": 2,
        "product": {
          "id": 1,
          "name": "Espresso",
          "price": 25000
        },
        "productVarian": null
      }
    ]
  }
}
```

**Example Request (Success - Update Status):**
```bash
curl -X PUT http://localhost:3000/api/transactions/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

**Example Request (Success - Update Multiple Fields):**
```bash
curl -X PUT http://localhost:3000/api/transactions/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed",
    "table_number": 7,
    "customer_name": "John Updated",
    "payment_method": "cash"
  }'
```

**Example Request (Success - Clear Nullable Field):**
```bash
curl -X PUT http://localhost:3000/api/transactions/1 \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": null,
    "customer_email": null
  }'
```

**Example Request (Failed - Not Found):**
```bash
curl -X PUT http://localhost:3000/api/transactions/9999 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Transaction not found"
}
```

**Example Request (Failed - Invalid Status):**
```bash
curl -X PUT http://localhost:3000/api/transactions/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "invalid_status"
  }'
```

**Validation Error Response (400):**
```json
{
  "data": {
    "status": "invalid_status"
  },
  "error": [
    {
      "code": "invalid_enum_value",
      "options": ["waiting_payment", "canceled", "completed"],
      "path": ["status"],
      "message": "Invalid enum value. Expected 'waiting_payment' | 'canceled' | 'completed', received 'invalid_status'"
    }
  ],
  "success": false
}
```

---

## Response Format

### Success Response Structure
```json
{
  "success": true,
  "message": "string",
  "data": "any",
  "metadata": {
    "page": "number (optional, for paginated responses)",
    "rowsPerPage": "number (optional, for paginated responses)",
    "total": "number (optional, for paginated responses)",
    "totalPages": "number (optional, for paginated responses)"
  }
}
```

### Error Response Structure
```json
{
  "success": false,
  "message": "string",
  "error": "string (optional, detail error message)"
}
```

### Validation Error Response Structure
```json
{
  "data": "object (original request data)",
  "error": [
    {
      "code": "string (error code: invalid_type, invalid_enum_value, too_small, etc.)",
      "path": ["string (field path)"],
      "message": "string (error message)",
      "expected": "string (optional, expected type)",
      "received": "string (optional, received type)",
      "options": ["array (optional, valid enum options)"],
      "minimum": "number (optional, minimum value/length)",
      "type": "string (optional, data type)"
    }
  ],
  "success": false
}
```

---

## Error Handling

### HTTP Status Codes
| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request berhasil |
| 201 | Created | Resource berhasil dibuat |
| 400 | Bad Request | Validation error atau request tidak valid |
| 401 | Unauthorized | Authentication gagal |
| 404 | Not Found | Resource tidak ditemukan |
| 500 | Internal Server Error | Server error |

### Common Error Scenarios

#### 1. Validation Error (400)
Terjadi ketika request body atau query parameters tidak sesuai dengan schema yang didefinisikan.

**Example:**
```json
{
  "data": {
    "email": "invalid-email",
    "items": []
  },
  "error": [
    {
      "code": "invalid_string",
      "validation": "email",
      "path": ["email"],
      "message": "Invalid email"
    },
    {
      "code": "too_small",
      "minimum": 1,
      "type": "array",
      "inclusive": true,
      "path": ["items"],
      "message": "Array must contain at least 1 element(s)"
    }
  ],
  "success": false
}
```

#### 2. Not Found Error (404)
Terjadi ketika resource yang diminta tidak ditemukan di database.

**Example:**
```json
{
  "success": false,
  "message": "Product not found"
}
```

#### 3. Authentication Error (401)
Terjadi ketika credential yang diberikan tidak valid.

**Example:**
```json
{
  "message": "Invalid email or password"
}
```

#### 4. Server Error (500)
Terjadi ketika ada error di sisi server (database error, unhandled exception, dll).

**Example:**
```json
{
  "success": false,
  "message": "Failed to retrieve products",
  "error": "Connection timeout"
}
```

---

## Data Types Reference

### Transaction Types
- `makan_ditempat`: Dine-in transaction
- `bawa_pulang`: Takeaway transaction

### Payment Methods
- `qris`: QRIS payment
- `cash`: Cash payment

### Transaction Status
- `waiting_payment`: Menunggu pembayaran
- `canceled`: Transaksi dibatalkan
- `completed`: Transaksi selesai

### User Roles
- `admin`: Administrator role
- `cashier`: Kasir role
- `kitchen`: Dapur role

---

## Notes & Best Practices

1. **Pagination**: Untuk GET endpoints yang mengembalikan list data, gunakan `page` dan `rowsPerPage` untuk mengoptimalkan performance.

2. **Search**: Gunakan parameter `search` pada `/api/products` untuk pencarian produk berdasarkan nama. Search menggunakan `LIKE` operator (case-insensitive).

3. **Transaction Reference**: Jika tidak menyediakan `ref` saat membuat transaksi, sistem akan otomatis generate dengan format `TRX-YYYYMMDD-XXX`.

4. **Bulk Operations**: Gunakan `/api/transactions/bulk` untuk membuat multiple transaksi sekaligus. Operasi ini bersifat partial success - jika ada transaksi yang gagal, transaksi lainnya tetap diproses.

5. **Update Limitations**: PUT `/api/transactions/:id` hanya bisa mengupdate field-field tertentu. Field seperti `items`, `id_cashier`, `type`, dan `ref` tidak bisa diupdate setelah transaksi dibuat.

6. **Nullable Fields**: Field yang nullable (seperti `customer_name`, `customer_email`, `table_number`) bisa di-set ke `null` untuk menghapus nilainya.

7. **Email Validation**: Field email akan di-validasi menggunakan format email standar. Pastikan format email valid sebelum mengirim request.

8. **Positive Numbers**: Field yang bertipe number dan marked as "positive" harus lebih besar dari 0.

---

## Getting Started

1. **Start Server:**
   ```bash
   npm run dev
   ```

2. **Setup Database:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

3. **Test API:**
   ```bash
   # Login
   curl -X POST http://localhost:3000/api/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"admin123"}'

   # Get Products
   curl -X GET http://localhost:3000/api/products

   # Get Transactions
   curl -X GET http://localhost:3000/api/transactions
   ```

---

**Last Updated:** November 27, 2025  
**API Version:** 1.0.0  
**Base URL:** `http://localhost:3000`
