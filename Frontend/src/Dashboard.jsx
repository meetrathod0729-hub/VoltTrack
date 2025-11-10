import React, { useEffect, useState } from "react";
import api from "./api";
import "./index.css";

export default function Dashboard() {
  const [tools, setTools] = useState([]);
  const [orders, setOrders] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    (async () => {
      const [t, o, r] = await Promise.all([
        api.get("/tools"),
        api.get("/orders"),
        api.get("/resources"),
      ]);
      setTools(t.data);
      setOrders(o.data);
      setResources(r.data);
    })();
  }, []);

  const totalTools = tools.reduce((sum, t) => sum + (t.quantity || 0), 0);
  const pendingOrders = orders.filter((o) => o.status !== "complete").length;
  const neededResources = resources.filter((r) => r.status !== "acquired").length;

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <StatCard icon="🧰" title="Total Tools" value={totalTools} />
        <StatCard icon="⚙️" title="Pending Orders" value={pendingOrders} />
        <StatCard icon="📦" title="Needed Resources" value={neededResources} />
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="stat-card">
      <div className="stat-title">
        <span className="icon">{icon}</span> {title}
      </div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
