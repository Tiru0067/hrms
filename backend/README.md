# **HRMS Backend (Node.js + Express + PostgreSQL)**

This is the backend for a small HR management system built with Node.js, Express, Sequelize, and PostgreSQL.
It handles basic organisation setup, authentication, employee management, team management, and logging.

The project is split into a clean folder structure, with controllers, routes, models, and middleware separated for clarity.

---

## **Features**

### **🔐 Authentication**

- Register a new organisation + admin user
- Login with email + password
- JWT-based authentication
- Password hashing with bcrypt

---

### **👥 Employees**

- Create, read, update, delete employees
- Each employee belongs to a specific organisation
- Email and phone number are unique **per organisation**
- Basic validation + error handling built-in

---

### **🧩 Teams**

- Create, read, update, delete teams
- Team names are unique **within the same organisation**
- Assign and unassign employees to/from teams
- Many-to-many relation using a join table

---

### **📝 Logs**

Every important action is recorded:

- Organisation created
- User login
- Employee added/updated/deleted
- Team created/updated/deleted
- Employee assigned/unassigned to teams

Logs can be fetched per organisation.

---

## **Tech Stack**

- **Node.js / Express** for API
- **PostgreSQL** as the database
- **Sequelize** ORM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Docker** for running PostgreSQL locally

---

## **Folder Structure**

```
src/
  controllers/
  routes/
  models/
  middlewares/
  helpers/
  db.js
  index.js
```

Everything is kept modular — routes just route, controllers hold logic, models define DB tables, and middleware handles auth + errors.

---

## **API Overview**

### **Auth**

`POST /api/auth/register` – Create organisation + admin user
`POST /api/auth/login` – Login and get JWT

### **Employees**

`GET /api/employees`
`GET /api/employees/:id`
`POST /api/employees`
`PUT /api/employees/:id`
`DELETE /api/employees/:id`

### **Teams**

`GET /api/teams`
`POST /api/teams`
`PUT /api/teams/:id`
`DELETE /api/teams/:id`
`POST /api/teams/:id/assign`
`DELETE /api/teams/:id/unassign`

### **Logs**

`GET /api/logs`

All protected routes require:

```
Authorization: Bearer <token>
```

---

## **Running Locally**

### **1. Install dependencies**

```
npm install
```

### **2. Create a `.env` file**

```
DB_HOST=localhost
DB_PORT=5433
DB_USER=your_user
DB_PASS=your_pass
DB_NAME=hrms_db
JWT_SECRET=your_secret_key
```

### **3. Start PostgreSQL (Docker example)**

```
docker compose up -d
```

### **4. Start the server**

```
npm run dev
```

API runs at:

```
http://localhost:5000
```

---

## **Notes**

- User emails are globally unique (one account per email).
- Organisations can have the same name.
- All data is isolated by organisation through JWT authentication.
- The backend focuses on clarity and correctness rather than over-engineering.
