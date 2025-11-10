import React, { useEffect, useState } from "react";
import api from "./api";
import "./index.css";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: 1, notes: "" });

  useEffect(() => { fetchResources(); }, []);
  async function fetchResources() { setResources((await api.get("/resources")).data); }

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post("/resources", form);
    setForm({ name: "", quantity: 1, notes: "" });
    fetchResources();
  }

  async function markAcquired(id) {
    await api.put(`/resources/${id}`, { status: "acquired" });
    fetchResources();
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      await api.delete(`/resources/${id}`);
      fetchResources();
    }
  }

  return (
    <div>
      <h1 className="page-title">Resources</h1>
      <div className="grid">
        <form onSubmit={handleSubmit} className="form-card">
          <input
            placeholder="Resource Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={e => setForm({ ...form, quantity: parseInt(e.target.value || 0) })}
          />
          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
          ></textarea>
          <button type="submit">Add Resource</button>
        </form>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {resources.map(r => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.quantity}</td>
                  <td>{r.status}</td>
                  <td>
                    {r.status !== "acquired" && (
                      <button onClick={() => markAcquired(r.id)}>Mark Acquired</button>
                    )}
                    {/* DELETE BUTTON */}
                    <button
  style={{
    marginLeft: "8px",
    backgroundColor: "#e11d48", 
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  }}
  onClick={() => handleDelete(r.id)}
>
  Delete
</button>
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
