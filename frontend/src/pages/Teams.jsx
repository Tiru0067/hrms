import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import useTeamApi from "../hooks/useTeamApi";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const { getTeams, getTeamEmployees, deleteTeam } = useTeamApi();

  useEffect(() => {
    async function load() {
      // load teams
      const data = await getTeams();
      setTeams(data);
    }

    load();
  }, [getTeams, getTeamEmployees]);

  async function handleDelete(teamId) {
    if (!confirm("Delete this team?")) return;
    await deleteTeam(teamId);

    // Refresh teams list
    const res = await api.get("/teams");
    setTeams(res.data);
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Teams</h1>

        <a href="/team-form" className="btn btn-primary">
          Add Team
        </a>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b border-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">Team Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {teams.map((team) => (
              <tr
                key={team.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-4 py-2">
                  <a
                    href={`/teams/${team.id}`}
                    className="text-black hover:text-blue-600 hover:underline"
                  >
                    {team.name}
                  </a>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {team.description || "no description"}
                </td>
                <td className="px-4 py-2 space-x-3">
                  <a
                    className="text-black hover:text-blue-600 hover:underline"
                    href={`/team-form?id=${team.id}`}
                  >
                    Edit
                  </a>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(team.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {teams.length === 0 && (
          <p className="p-6 text-gray-500 text-center">No teams found.</p>
        )}
      </div>
    </Layout>
  );
}
