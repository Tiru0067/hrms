# **HRMS – Human Resource Management System**

A simple full-stack HR management tool built with **Node.js**, **Express**, **PostgreSQL**, and a **React** frontend.
The project lets an organisation manage employees, teams, and assignments with authentication and detailed activity logs.

This was built as part of a full-stack assignment to demonstrate API design, authentication, frontend integration, and basic DevOps.

---

## 🚀 **Features**

### **Authentication**

- Create organisation account
- Register admin user
- Login + JWT-based session

### **Employees**

- Add, edit, delete employees
- View list of all employees

### **Teams**

- Create and manage teams
- Assign employees to multiple teams
- Remove assignments

### **Logging**

The backend keeps a log of important actions:

- login/logout
- employee CRUD
- team CRUD
- assignments

---

## 🏗️ **Tech Stack**

### **Backend**

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT authentication
- CORS + dotenv

### **Frontend**

- React (Create React App)
- React Router
- Axios

### **Deployment**

- Frontend → Vercel
- Backend → (Railway / Render / VPS depending on your setup)

---

## 📦 **Project Structure**

```
hrms/
│
├── backend/        # Node/Express API
│
└── frontend/       # React client
```

---

## ⚙️ **Setup**

### **Backend**

```
cd backend
npm install
npx sequelize-cli db:migrate
npm run dev
```

### **Frontend**

```
cd frontend
npm install
npm start
```

---

## 🌐 **Environment Variables**

Backend (`.env`):

```
PORT=5000
DB_HOST=localhost
DB_USER=youruser
DB_PASS=yourpass
DB_PORT=5432
DB_NAME=hrms_db
JWT_SECRET=your_secret
```

Frontend (`.env`):

```
REACT_APP_API_BASE=https://your-backend-domain/api
```

---

## 🚀 Deployment Notes

### **Frontend**

- Hosted on Vercel
- Added `vercel.json` to enable client-side routing
- Build command: `npm run build`

### **Backend**

- Add Vercel domain to CORS origin list
- Redeploy after updating CORS

---

## 📜 License

This project is for educational/testing purposes.

---
