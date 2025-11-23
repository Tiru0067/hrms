# **HRMS Frontend**

This is the React frontend for the HRMS (Human Resource Management System). It connects to the Node.js backend API and provides UI screens for authentication, employees, teams, and assignments.

---

## ✨ **Features**

- Organisation registration
- User login
- Dashboard
- Employee management (CRUD)
- Team management (CRUD)
- Assign employees to teams
- React Router-based navigation
- Axios API integration
- Fully deployed on Vercel

---

## 🛠️ **Tech Stack**

- React (Create React App)
- React Router
- Axios
- Vercel (hosting)

---

## 📁 **Project Structure**

```
frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/api.js
│   └── App.js
│
├── public/
└── package.json
```

---

## ⚙️ **Setup**

### Install dependencies

```
npm install
```

### Run locally

```
npm start
```

## 🔧 **Deployment (Vercel)**

1. Push code to GitHub
2. Create a new Vercel project
3. Select the `/frontend` folder
4. Framework preset: **Create React App**
5. Add environment variable:

   ```
   REACT_APP_API_BASE=...
   ```

6. Add `vercel.json` for routing fix:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

7. Deploy 🚀

---

## 📌 Notes

- API requests automatically include the token using an Axios interceptor.
