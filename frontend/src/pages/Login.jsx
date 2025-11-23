import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  }

  return (
    <div className="h-screen flex-center bg-gray-50">
      <form onSubmit={handleLogin} className="card w-96">
        <h1 className="text-2xl font-semibold mb-6">Sign in</h1>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">Email</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1 text-gray-700">Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button className="btn btn-primary w-full">Login</button>

        <p className="mt-4 text-sm text-gray-600 text-center">
          No account?{" "}
          <a href="/register" className="text-black underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
