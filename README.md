# 🏨 Hotel Booking API

A RESTful API built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL** for managing users, rooms, and bookings with role-based access control.

---

## 🚀 Features

- ✅ User Registration & Login with JWT
- 🔐 Role-Based Access (ADMIN, OWNER, CUSTOMER)
- 🏠 Room CRUD (create, edit, delete by owner)
- 🔎 Search rooms by check-in/check-out availability
- 📦 Booking system (customer only)
- 📘 Zod validation
- 📄 Swagger API Docs

---

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: JWT
- **Validation**: Zod
- **Docs**: Swagger

---

## 🔑 Roles

- **ADMIN**: Full access (user management, booking data)
- **OWNER**: Can list and manage rooms
- **CUSTOMER**: Can book rooms, view available listings

---

## 📂 API Endpoints

### 🔐 Auth

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| POST   | /api/auth/register | Register new user   |
| POST   | /api/auth/login    | Login and get token |
| GET    | /api/users/me      | Get logged-in user  |

---

### 🏘️ Rooms

| Method | Endpoint               | Description                 |
|--------|------------------------|-----------------------------|
| POST   | /api/rooms             | Create new room (OWNER)     |
| PUT    | /api/rooms/:id         | Update room (OWNER)         |
| DELETE | /api/rooms/:id         | Delete room (OWNER)         |
| GET    | /api/rooms/search      | Search rooms by date range  |

---

### 🛏️ Bookings

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| POST   | /api/bookings    | Book a room (CUSTOMER)    |
| GET    | /api/bookings    | View my bookings          |

---

## 📥 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Install Dependencies
```bash 
npm install 
```

### 3. Set up Environment Variable
```bash 
PORT=3000
DATABASE_URL=postgreSQL_connection_string
JWT_SECRET=your_jwt_secret

```
### 4. Initialize Prisma:
```bash
npx prisma generate
npx prisma migrate dev --name init
```
### 5. Start Server
```bash 
node server.js
# OR
nodemon server.js

```