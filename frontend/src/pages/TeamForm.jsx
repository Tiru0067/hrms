import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import useTeamApi from "../hooks/useTeamApi";

export default function TeamForm() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  const isEdit = Boolean(id);

  const { getTeam, createTeam, updateTeam, deleteTeam, loading } = useTeamApi();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (isEdit) {
      getTeam(id).then((team) => {
        setForm({
          name: team.name || "",
          description: team.description || "",
        });
      });
    }
  }, [id, isEdit, getTeam]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isEdit) {
      await updateTeam(id, form);
    } else {
      await createTeam(form);
    }

    navigate("/teams");
  }

  async function handleDelete() {
    if (!confirm("Delete this team?")) return;

    await deleteTeam(id);
    navigate("/teams");
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {isEdit ? "Edit Team" : "Add Team"}
        </h1>

        {isEdit && (
          <button className="btn btn-outline" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="card max-w-lg">
        <div className="mb-4">
          <label className="block text-sm mb-1">Team Name</label>
          <input
            name="name"
            className="input"
            value={form.name}
            onChange={handleChange}
            placeholder="Design, Backend, Sales..."
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            className="input"
            rows="3"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional description..."
          ></textarea>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {isEdit ? "Save Changes" : "Create Team"}
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/teams")}
          >
            Cancel
          </button>
        </div>
      </form>
    </Layout>
  );
}
