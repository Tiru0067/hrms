import { NavLink } from "react-router-dom";

export default function Layout({ children }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const linkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded-md ${
      isActive ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-gray-200 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-semibold mb-6">HRMS</h1>

          <nav className="space-y-2">
            <NavLink to="/dashboard" className={linkClasses}>
              Dashboard
            </NavLink>

            <NavLink to="/employees" className={linkClasses}>
              Employees
            </NavLink>

            <NavLink to="/teams" className={linkClasses}>
              Teams
            </NavLink>
          </nav>
        </div>

        {/* Logout */}
        <button
          className="px-2 py-3 bg-red-500 hover:bg-red-600 rounded-sm cursor-pointer text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
