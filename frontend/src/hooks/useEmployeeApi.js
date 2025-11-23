import { useState } from "react";
import api from "../services/api";

export default function useEmployeeApi() {
  const [loading, setLoading] = useState(false);

  // Fetch a single employee (for edit form)
  async function getEmployee(id) {
    setLoading(true);
    try {
      const res = await api.get(`/employees/${id}`);
      return res.data;
    } finally {
      setLoading(false);
    }
  }

  // Fetch all employees (optional, used in Employees.jsx)
  async function getEmployees() {
    setLoading(true);
    try {
      const res = await api.get("/employees");
      return res.data;
    } finally {
      setLoading(false);
    }
  }

  // Create new employee
  async function createEmployee(data) {
    setLoading(true);
    try {
      await api.post("/employees", data);
    } finally {
      setLoading(false);
    }
  }

  // Update existing employee
  async function updateEmployee(id, data) {
    setLoading(true);
    try {
      await api.put(`/employees/${id}`, data);
    } finally {
      setLoading(false);
    }
  }

  // Delete employee
  async function deleteEmployee(id) {
    setLoading(true);
    try {
      await api.delete(`/employees/${id}`);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    getEmployee,
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
}
