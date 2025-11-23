import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import useTeamApi from "../hooks/useTeamApi";

export default function TeamDetails() {
  const [team, setTeam] = useState(null);
  const [employees, setEmployees] = useState([]);

  const { id } = useParams();
  const { getTeam, getTeamEmployees, unassignEmployee, loading } = useTeamApi();

  useEffect(() => {
    async function load() {
      // Get team
      const team = await getTeam();
      setTeam(team);

      // 2. Load employees in this team
      const emps = await getTeamEmployees(id);
      setEmployees(emps);
    }

    load();
  }, [id, getTeam, getTeamEmployees]);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          {team ? team.name : "Team Details"}
        </h1>
        {team?.description && (
          <p className="text-gray-600 mt-1">{team.description}</p>
        )}
      </div>

      <div className="card p-6">
        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && (
          <>
            <h2 className="text-lg font-medium mb-4">Employees in this team</h2>

            {employees.length === 0 && (
              <p className="text-gray-500">No employees assigned.</p>
            )}

            <ul className="space-y-2">
              {employees.map((emp) => (
                <li
                  key={emp.id}
                  className="flex justify-between items-center p-3 border rounded-lg bg-gray-50"
                >
                  <span>
                    {emp.first_name} {emp.last_name} —{" "}
                    <span className="text-gray-600 text-sm">{emp.email}</span>
                  </span>

                  <button
                    className="text-red-600 hover:underline"
                    onClick={async () => {
                      await unassignEmployee(id, emp.id);
                      setEmployees((prev) =>
                        prev.filter((e) => e.id !== emp.id)
                      );
                    }}
                  >
                    Unassign
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Layout>
  );
}
