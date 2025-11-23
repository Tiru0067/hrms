import { useState, useCallback } from "react";
import api from "../services/api";

export default function useTeamApi() {
  const [loading, setLoading] = useState(false);

  // GET all teams
  const getTeams = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/teams");
      return res.data;
    } finally {
      setLoading(false);
    }
  }, []);

  // GET team
  const getTeam = useCallback(async (teamId) => {
    setLoading(true);
    try {
      const res = await api.get(`/teams/`);
      const team = res.data.find((t) => t.id === Number(teamId));
      console.log(team);
      return team;
    } finally {
      setLoading(false);
    }
  }, []);

  // GET a single team (with employees)
  const getTeamEmployees = useCallback(async (teamId) => {
    setLoading(true);
    try {
      const res = await api.get(`/teams/${teamId}/employees`);
      return res.data;
    } finally {
      setLoading(false);
    }
  }, []);

  // CREATE team
  const createTeam = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/teams", data);
      return res.data;
    } finally {
      setLoading(false);
    }
  }, []);

  // UPDATE team
  const updateTeam = useCallback(async (teamId, data) => {
    setLoading(true);
    try {
      const res = await api.put(`/teams/${teamId}`, data);
      return res.data;
    } finally {
      setLoading(false);
    }
  }, []);

  // DELETE team
  const deleteTeam = useCallback(async (teamId) => {
    setLoading(true);
    try {
      await api.delete(`/teams/${teamId}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // ASSIGN one employee to team
  const assignEmployee = useCallback(async (teamId, employeeId) => {
    setLoading(true);
    try {
      await api.post(`/teams/${teamId}/assign`, { employee_id: employeeId });
    } finally {
      setLoading(false);
    }
  }, []);

  // UNASSIGN one employee from team
  const unassignEmployee = useCallback(async (teamId, employeeId) => {
    setLoading(true);
    try {
      await api.delete(`/teams/${teamId}/unassign`, {
        data: { employee_id: employeeId },
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,

    // CRUD
    getTeams,
    getTeam,
    getTeamEmployees,
    createTeam,
    updateTeam,
    deleteTeam,

    // assignment
    assignEmployee,
    unassignEmployee,
  };
}
