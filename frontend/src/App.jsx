// frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div style={layout.header}>
        <div style={layout.brand}>YT-Clone</div>
        <nav style={layout.nav}>
          <Link to="/" style={layout.link}>Home</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add other routes here (Login, Register, Video page) */}
      </Routes>
    </BrowserRouter>
  );
}

const layout = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    borderBottom: "1px solid #eee",
    marginBottom: 12,
  },
  brand: { fontWeight: 700 },
  nav: {},
  link: { marginLeft: 12, textDecoration: "none", color: "#333" },
};
