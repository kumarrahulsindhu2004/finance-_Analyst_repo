# 💰 Finance Dashboard Backend

## 🚀 Overview

This project is a backend system for a finance dashboard that manages financial records with role-based access control.

It allows different users (Admin, Analyst, Viewer) to interact with financial data based on their permissions and provides summary analytics for dashboard insights.

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* REST API

---

## 🔐 Features

### 👤 User & Role Management

* User Registration & Login
* Roles: Admin, Analyst, Viewer
* Role-Based Access Control (RBAC)

---

### 💰 Financial Records

* Create Record (Admin only)
* View Records (Admin, Analyst)
* Update Record (Admin only)
* Delete Record (Admin only)
* Filtering by type & category

---

### 📊 Dashboard APIs

* Total Income
* Total Expenses
* Net Balance
* Category-wise totals
* Recent activity (last 5 records)
* Monthly trends

---

### 🔒 Security

* JWT Authentication
* Protected Routes
* Role-based authorization middleware

---

## 📡 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Records

* POST `/api/records/create`
* GET `/api/records`
* PUT `/api/records/update/:id`
* DELETE `/api/records/delete/:id`
* GET `/api/records/dashboard`

---

## ⚙️ Setup Instructions

1. Clone the repository:

```
git clone <your-repo-url>
```

2. Install dependencies:

```
npm install
```

3. Create `.env` file:

```
PORT=3000
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
```

4. Run server:

```
npm run dev
```

---

## 🧪 Testing

APIs tested using Postman.

---

## 🧠 Design Decisions

* Used RBAC for secure access control
* Used MongoDB aggregation for dashboard analytics
* Structured project using MVC pattern for scalability

---

## ⚠️ Notes

* Role assignment is currently handled via request body (for simplicity)
* In production, role changes should be restricted to admin-only endpoints

---

## 👨‍💻 Author

Rahul Kumar Sindhu
