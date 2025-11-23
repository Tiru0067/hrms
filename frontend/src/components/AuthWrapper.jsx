import { Navigate } from "react-router-dom";

export default function AuthWrapper({ element, isPublic }) {
  const token = localStorage.getItem("token");

  // If user is logged in and tries to access a public route (login, register)
  if (token && isPublic) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is NOT logged in and tries to access a PROTECTED route
  if (!token && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise allow rendering
  return element;
}
