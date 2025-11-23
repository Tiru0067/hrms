import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import useEmployeeApi from "../hooks/useEmployeeApi";

export default function EmployeeForm() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id"); // if id exists → edit mode

  const {
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    loading,
  } = useEmployeeApi();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      const emp = await getEmployee(id);
      setForm({
        first_name: emp.first_name || "",
        last_name: emp.last_name || "",
        email: emp.email || "",
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isEdit) {
      await updateEmployee(id, form);
    } else {
      await createEmployee(form);
    }

    navigate("/employees");
  }

  async function handleDelete() {
    if (!confirm("Delete this employee?")) return;

    await deleteEmployee(id);
    navigate("/employees");
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {isEdit ? "Edit Employee" : "Add Employee"}
        </h1>

        {isEdit && (
          <button className="btn btn-outline" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="card max-w-lg">
        <div className="mb-4">
          <label className="block text-sm mb-1">First Name</label>
          <input
            className="input"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="John"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Last Name</label>
          <input
            className="input"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Doe"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="input"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {isEdit ? "Save Changes" : "Create Employee"}
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </button>
        </div>
      </form>
    </Layout>
  );
}
