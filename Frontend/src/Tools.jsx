import React, { useEffect, useState } from "react";
import api from "./api";
import "./index.css";

export default function Tools() {
  const [tools, setTools] = useState([]);
  const [form, setForm] = useState({ name: "", type: "", quantity: 1, notes: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => { fetchTools(); }, []);
  async function fetchTools() { setTools((await api.get("/tools")).data); }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editing) await api.put(`/tools/${editing}`, form);
    else await api.post("/tools", form);
    setForm({ name: "", type: "", quantity: 1, notes: "" });
    setEditing(null);
    fetchTools();
  }

  async function handleDelete(id) {
    if (confirm("Delete this tool?")) {
      await api.delete(`/tools/${id}`);
      fetchTools();
    }
  }

  return (
    <div>
      <h1 className="page-title">Tools</h1>
      <div className="grid">
        <form onSubmit={handleSubmit} className="form-card">
          <h2>{editing ? "Edit Tool" : "Add Tool"}</h2>
          <input placeholder="Tool Name" value={form.name}
                 onChange={e=>setForm({...form,name:e.target.value})} required />
          <input placeholder="Type (e.g. Hand Tool)" value={form.type}
                 onChange={e=>setForm({...form,type:e.target.value})} required />
          <input type="number" placeholder="Quantity" value={form.quantity}
                 onChange={e=>setForm({...form,quantity:parseInt(e.target.value||0)})} />
          <textarea placeholder="Notes" value={form.notes}
                    onChange={e=>setForm({...form,notes:e.target.value})}></textarea>
          <div className="btn-group">
            <button type="submit">{editing ? "Update" : "Add"}</button>
            {editing && <button type="button" onClick={()=>setEditing(null)} className="cancel">Cancel</button>}
          </div>
        </form>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tools.map(t => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.type}</td>
                  <td>{t.quantity}</td>
                  <td>
                    <button onClick={()=>{setEditing(t.id); setForm(t);}}>Edit</button>
                    <button onClick={()=>handleDelete(t.id)} className="delete">Delete</button>
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
