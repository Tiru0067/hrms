import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import useEmployeeApi from "../hooks/useEmployeeApi";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const { getEmployees, deleteEmployee } = useEmployeeApi();

  const navigate = useNavigate();

  // Load employees once on mount
  useEffect(() => {
    getEmployees().then(setEmployees);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this employee?")) return;

    await deleteEmployee(id);

    // refresh list
    const updated = await getEmployees();
    setEmployees(updated);
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Employees</h1>

        <a href="/employee-form" className="btn btn-primary">
          Add Employee
        </a>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  {emp.first_name} {emp.last_name}
                </td>
                <td className="px-4 py-2">{emp.email}</td>

                <td className="px-4 py-2 space-x-3">
                  <a
                    href={`/employee-form?id=${emp.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </a>

                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => navigate(`/assign?employeeId=${emp.id}`)}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && (
          <p className="p-6 text-gray-500 text-center">No employees found.</p>
        )}
      </div>
    </Layout>
  );
}
