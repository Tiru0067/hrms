import { useState } from "react";
import api from "../services/api";

export default function RegisterOrganisation() {
  const [orgName, setOrgName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const res = await api.post("/auth/register", {
      orgName,
      adminName,
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  }

  return (
    <div className="h-screen flex-center bg-gray-50">
      <form onSubmit={handleRegister} className="card w-96">
        <h1 className="text-2xl font-semibold mb-6">Create Organisation</h1>

        <div className="mb-4">
          <label className="text-sm block mb-1">Organisation Name</label>
          <input
            className="input"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm block mb-1">Admin Name</label>
          <input
            className="input"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm block mb-1">Email</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="text-sm block mb-1">Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-full">Create</button>
      </form>
    </div>
  );
}
