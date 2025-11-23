import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h2 className="text-lg font-semibold">Employees</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Manage all employees in your organisation.
          </p>
          <a href="/employees" className="btn btn-primary mt-4 inline-block">
            View Employees
          </a>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold">Teams</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Create teams and assign employees.
          </p>
          <a href="/teams" className="btn btn-primary mt-4 inline-block">
            View Teams
          </a>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Logs will appear here once logging is integrated.
          </p>
        </div>
      </div>
    </Layout>
  );
}
