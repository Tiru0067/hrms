import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper";

// Pages
import Login from "./pages/Login";
import RegisterOrganisation from "./pages/RegisterOrganisation";
import Dashboard from "./pages/Dashboard";
import TeamDetails from "./pages/TeamDetails";
import Employees from "./pages/Employees";
import Teams from "./pages/Teams";
import EmployeeForm from "./pages/EmployeeForm";
import TeamForm from "./pages/TeamForm";
import AssignEmployee from "./pages/AssignEmployee";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root always redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={<AuthWrapper isPublic={true} element={<Login />} />}
        />
        <Route
          path="/register"
          element={
            <AuthWrapper isPublic={true} element={<RegisterOrganisation />} />
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={<AuthWrapper isPublic={false} element={<Dashboard />} />}
        />
        <Route
          path="/employees"
          element={<AuthWrapper isPublic={false} element={<Employees />} />}
        />
        <Route
          path="/employee-form"
          element={<AuthWrapper isPublic={false} element={<EmployeeForm />} />}
        />
        <Route
          path="/teams"
          element={<AuthWrapper isPublic={false} element={<Teams />} />}
        />
        <Route
          path="/team-form"
          element={<AuthWrapper isPublic={false} element={<TeamForm />} />}
        />
        <Route
          path="/teams/:id"
          element={<AuthWrapper isPublic={false} element={<TeamDetails />} />}
        />
        <Route
          path="/assign"
          element={
            <AuthWrapper isPublic={false} element={<AssignEmployee />} />
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
