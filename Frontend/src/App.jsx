import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./dashboard";
import Tools from "./tools";
import Resources from "./resources";
import Orders from "./orders";
import "./App.css";
import "./index.css";

// Reusable Navigation Item
const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
  >
    {children}
  </NavLink>
);

export default function App() {
  // 🌙 DARK MODE STATE
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="logo">⚡ VoltTrack</div>
        <div className="nav-links">
          <NavItem to="/">Dashboard</NavItem>
          <NavItem to="/tools">Tools</NavItem>
          <NavItem to="/resources">Resources</NavItem>
          <NavItem to="/orders">Orders</NavItem>
        </div>

        {/* 🌙 Dark Mode Toggle */}
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
