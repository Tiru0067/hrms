import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import useTeamApi from "../hooks/useTeamApi";

export default function AssignEmployee() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const employeeId = params.get("employeeId");
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  const { getTeams, assignEmployee, loading } = useTeamApi();

  useEffect(() => {
    getTeams().then(setTeams);
  }, [getTeams]);

  async function handleAssign() {
    if (!selectedTeam) return alert("Please select a team");

    await assignEmployee(selectedTeam, employeeId);

    navigate("/employees");
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Assign Employee</h1>

      <div className="card max-w-lg p-6">
        <p className="mb-4 text-gray-700">
          Pick a team to assign the employee.
        </p>

        <select
          className="input mb-4"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="">Select a team</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <div className="flex gap-3">
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={handleAssign}
          >
            Assign
          </button>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </button>
        </div>
      </div>
    </Layout>
  );
}
