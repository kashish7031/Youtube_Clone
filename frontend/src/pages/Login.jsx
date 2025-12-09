// frontend/src/pages/Login.jsx
import React, { useContext, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      // res.data contains token and userId
      const { token, userId } = res.data;
      if (!token) throw new Error("No token from server");
      // save via context (context also persists to localStorage)
      login({ token, userId, username: res.data.username, email: res.data.email });
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setErr(error.response?.data?.message || error.message || "Login failed");
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{ maxWidth: 420 }}>
        <div>
          <label>Username or Email</label>
          <input value={form.usernameOrEmail} onChange={(e) => setForm(f => ({ ...f, usernameOrEmail: e.target.value }))} required />
        </div>
        <div>
          <label>Password</label>
          <input value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} type="password" required />
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading}>{loading ? "Logging in…" : "Login"}</button>
        </div>
        {err && <div style={{ color: "crimson", marginTop: 8 }}>{err}</div>}
      </form>
    </div>
  );
}
