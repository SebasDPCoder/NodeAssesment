# 🚛 FHL Logistics API

Delivery Order Management System

Backend developed in Node.js, Express, Sequelize (PostgreSQL), and TypeScript

# 📖 Project Description

FHL Logistics requires a system to automate the management of delivery orders for its clients.
Currently, the process is handled manually through spreadsheets, leading to data duplication, errors, and slow operations.

This backend implements a RESTful API that allows management of:

Clients and delivery addresses

Products and warehouse stock

Delivery orders with status tracking (pending, in transit, delivered)

User roles (Administrator / Analyst) with JWT authentication

# 🧱 Technologies Used
Technology	Description
Node.js / Express	HTTP server and API routing
TypeScript	Static typing and improved maintainability
Sequelize ORM	Abstraction and management of relational databases
PostgreSQL	Main relational database
JWT (Json Web Token)	Secure authentication and role management
Docker Compose	Container orchestration (API + DB)
Swagger	Interactive API documentation
Class Validator	Validation of DTOs in requests
Bcrypt	Password encryption
# ⚙️ Main Features
### ✅ Authentication & Roles

User registration and login with admin or analyst roles.

Route protection using JWT.

Middleware for role-based authorization.

### ✅ Client Management

Full CRUD for clients.

Search clients by ID number.

Validation to prevent duplicates.

### ✅ Warehouse Management

List of active warehouses.

Activate or deactivate existing warehouses.

View available stock.

### ✅ Product Management

Fetch product by code.

Logical (soft) deletion of products.

Stock control and quantity validation.

### ✅ Order Management

Create orders linked to client, warehouse, and products.

Update order status (pending, in transit, delivered).

Full order history per client.

Automatic stock validation before creating orders.

# 🧩 Project Structure
```
.
├──app/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── dao/
│   ├── data/
│   ├── docs/
│   ├── dto/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   ├── types/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── .dockerignore
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

# 🐳 Run with Docker Compose
### 1️⃣ Prerequisites

Install Docker Desktop or Docker Engine + Docker Compose v2

Clone the repository:

git clone https://github.com/https://github.com/SebasDPCoder/FHL-logistics-api.git

cd FHL-logistics-api

### 2️⃣ Configure Environment Variables

Create a .env file in the project root with the following example:

```
# Node.js App
APP_CONTAINER_NAME=node_app_logistics
APP_PORT=3000
NODE_ENV=development
APP_CPU_LIMIT=0.50
APP_MEM_LIMIT=512M

# PostgreSQL
DB_CONTAINER_NAME=postgres_db

POSTGRES_USER=postgres
POSTGRES_PASSWORD=supersecret123
POSTGRES_HOST=localhost
POSTGRES_DB=logistics
POSTGRES_PORT=5432
POSTGRES_LOCAL=5433
DB_CPU_LIMIT=0.50
DB_MEM_LIMIT=512M

# JWT token and refresh token
JWT_SECRET=be288baf75be999ee0c9a2ddb464cdac
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=refreshbe288baf75be999ee0c9a2ddb464cdac
JWT_REFRESH_EXPIRES_IN=2d
```

### 3️⃣ Start the Application

To build the docker images: `docker-compose build`
 
To up docker containers: `docker compose up -d`


This will start the following services:

app → Express API (port 3000)

db → PostgreSQL database (port 5432)

### 4️⃣ Check Status

API: http://localhost:3000/api

Swagger Docs: http://localhost:3000/api/docs


## 🌱 Populate Database (Seeders)

To load initial data (users, clients, warehouses, products):

`docker exec -it node_app_logistics npm run sync-seed`


This runs the files located in app/src/seeders.

## 🔐 Authentication

Register a user → /api/auth/register

Log in → /api/auth/login

You’ll receive a JWT token to include in the request header:

Authorization: Bearer <token>

# 📚 Main Endpoints
 ### 👤 Users

POST /api/auth/register → Create user (Admin or Analyst)

POST /api/auth/login → Log in

 ### 👥 Clients

GET /api/customers → List clients

POST /api/customers/search → Search client by ID

POST /api/customers → Create new client

 ### 🏢 Warehouses

GET /api/warehouses → List active warehouses

PATCH /api/warehouses/:id/status → Activate/Deactivate warehouse

 ### 📦 Products

GET /api/products/:code → Get product by code

DELETE /api/products/:id → Logical delete

 ### 🚚 Orders

POST /api/orders → Create new order

PATCH /api/orders/:id/status → Update order status

GET /api/orders/history/:customerId → Get client order history

# 🧠 Validations & Middlewares

❌ Cannot create a client with a duplicate ID.

⚠️ Cannot create an order if product stock is insufficient.

🔒 Only authenticated users can access endpoints.

🧍‍♂️ Admin → Full CRUD.

👩‍💻 Analyst → Read-only + order status updates.

# 🧾 Swagger Documentation

Access the full documentation at:
📄 http://localhost:3000/api/docs

Includes:

Available routes

Response codes

Request/response examples

Required roles per endpoint


## ✅ Acceptance Criteria Met

User registration and JWT login

Full CRUD for clients, warehouses, products, and orders

Role-based access control

Business validations (stock, duplicates, status)

Database seeding

Swagger documentation

Modular, scalable structure

## 👨‍💻 Author

**Developed** by Sebastian

**Clan:** Tayrona

*🚀 Be a Coder*.
