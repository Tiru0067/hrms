export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-gray-200 p-4">
        <h1 className="text-xl font-semibold mb-6">HRMS</h1>

        <nav className="space-y-2">
          <a
            href="/dashboard"
            className="block px-3 py-2 hover:bg-gray-100 rounded-md"
          >
            Dashboard
          </a>
          <a
            href="/employees"
            className="block px-3 py-2 hover:bg-gray-100 rounded-md"
          >
            Employees
          </a>
          <a
            href="/teams"
            className="block px-3 py-2 hover:bg-gray-100 rounded-md"
          >
            Teams
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
