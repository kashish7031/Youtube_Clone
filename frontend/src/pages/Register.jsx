// frontend/src/pages/Register.jsx
import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      // success — go to login
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setErr(error.response?.data?.message || error.message);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Register</h2>
      <form onSubmit={submit} style={{ maxWidth: 420 }}>
        <div>
          <label>Username</label>
          <input value={form.username} onChange={(e) => setForm(s => ({ ...s, username: e.target.value }))} required />
        </div>
        <div>
          <label>Email</label>
          <input value={form.email} onChange={(e) => setForm(s => ({ ...s, email: e.target.value }))} type="email" required />
        </div>
        <div>
          <label>Password</label>
          <input value={form.password} onChange={(e) => setForm(s => ({ ...s, password: e.target.value }))} type="password" required />
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading}>{loading ? "Registering…" : "Register"}</button>
        </div>
        {err && <div style={{ color: "crimson", marginTop: 8 }}>{err}</div>}
      </form>
    </div>
  );
}
