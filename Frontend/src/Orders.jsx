import React, { useEffect, useState } from "react";
import api from "./api";
import "./index.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [tools, setTools] = useState([]);
  const [form, setForm] = useState({
    client_name: "",
    address: "",
    deadline: "",
    required_tools: [],
    notes: ""
  });

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    const [o, t] = await Promise.all([api.get("/orders"), api.get("/tools")]);
    setOrders(o.data);
    setTools(t.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post("/orders", form);
    setForm({
      client_name: "",
      address: "",
      deadline: "",
      required_tools: [],
      notes: ""
    });
    fetchAll();
  }

  const toggleTool = (id) =>
    setForm((f) => ({
      ...f,
      required_tools: f.required_tools.includes(id)
        ? f.required_tools.filter((x) => x !== id)
        : [...f.required_tools, id],
    }));

  //FUNCTION: mark order complete
  async function markComplete(id) {
    await api.put(`/orders/${id}`, { status: "complete" });
    fetchAll();
  }

  return (
    <div>
      <h1 className="page-title">Orders</h1>
      <div className="grid">
        <form onSubmit={handleSubmit} className="form-card">
          <input
            placeholder="Client Name"
            value={form.client_name}
            onChange={(e) => setForm({ ...form, client_name: e.target.value })}
            required
          />
          <input
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
          <div>
            <p className="text-sm mb-2">Select Required Tools:</p>
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => toggleTool(t.id)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    form.required_tools.includes(t.id)
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-50"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          ></textarea>
          <button className="bg-blue-600 text-white">Add Order</button>
        </form>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.client_name}</td>
                  <td>{o.deadline || "-"}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        o.status === "complete"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td>
                    {o.status !== "complete" && (
                      <button
                        style={{
                          backgroundColor: "#16a34a",
                          color: "white",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                        onClick={() => markComplete(o.id)}
                      >
                        Mark Complete ✅
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
