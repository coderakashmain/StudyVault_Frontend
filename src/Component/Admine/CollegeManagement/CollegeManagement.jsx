import React, { useEffect, useState } from "react";
import { useAdminLogin } from "../../../Context/AdminLoginCheck/AdminLoginCheck";
import useApi from "../../../hooks/useApi";
import '../adminShared.css';

const API_BASE = import.meta.env.VITE_API_URL || "https://api.studyvault.space";

const IconCollege = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const COLLEGE_TYPES = ["autonomous", "affiliated", "deemed", "central", "other"];

const emptyForm = { name: "", type: "autonomous", city: "", university_affiliation: "" };

const CollegeManagement = () => {
  const { adminToken } = useAdminLogin();
  const { get, post, put, delete: del, loading } = useApi();

  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [paperCounts, setPaperCounts] = useState({});

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchColleges = async () => {
    try {
      const res = await get("/colleges", adminToken);
      if (res) setColleges(res);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPaperCounts = async () => {
    try {
      const res = await get("/admin/college-paper-counts", adminToken);
      if (res) {
        const map = {};
        res.forEach(r => { map[r.college_id] = parseInt(r.count); });
        setPaperCounts(map);
      }
    } catch (_) {}
  };

  useEffect(() => {
    fetchColleges();
    fetchPaperCounts();
  }, []);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditId(c.id);
    setForm({ name: c.name, type: c.type || "autonomous", city: c.city || "", university_affiliation: c.university_affiliation || "" });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return showToast("College name is required", "error");
    setSaving(true);
    try {
      if (editId) {
        await put(`/colleges/admin/colleges/${editId}`, adminToken, form);
        showToast("College updated!");
      } else {
        await post(`/colleges/admin/colleges`, adminToken, form);
        showToast("College added!");
      }
      setShowModal(false);
      fetchColleges();
    } catch (err) {
      showToast(err.response?.data?.error || err.message || "Failed to save college", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await del(`/colleges/admin/colleges/${id}`, adminToken);
      showToast("College deleted");
      setDeleteId(null);
      fetchColleges();
    } catch (err) {
      showToast(err.response?.data?.error || err.message || "Failed to delete college", "error");
    }
  };

  const filtered = colleges.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.city || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.university_affiliation || "").toLowerCase().includes(search.toLowerCase())
  );

  const typeColor = (type) => {
    const map = { autonomous: "#009bb7", affiliated: "#8b5cf6", deemed: "#f59e0b", central: "#10b981", other: "#64748b" };
    return map[type] || "#64748b";
  };

  return (
    <div className="admin-page">
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 9999,
          backgroundColor: toast.type === "error" ? "#ef4444" : "#10b981",
          color: "#fff", padding: "12px 20px", borderRadius: 10,
          fontWeight: 600, fontSize: "0.9rem", boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.2s ease"
        }}>
          {toast.msg}
        </div>
      )}

      <div className="admin-page-header">
        <h2><IconCollege /> College Management</h2>
        <p>Add, edit, and manage colleges linked to papers and user accounts</p>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="admin-search-input"
          style={{ padding: "0.6rem 1rem", fontSize: "0.85rem", border: "1px solid #e2e8f0", borderRadius: 8, flex: 1, minWidth: 200, maxWidth: 400, outline: "none" }}
        />
        <button
          onClick={openAdd}
          style={{
            backgroundColor: "#009bb7", color: "#fff", border: "none",
            borderRadius: 8, padding: "0.6rem 1.4rem", fontWeight: 700,
            fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            whiteSpace: "nowrap"
          }}
        >
          + Add College
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <div className="admin-card" style={{ flex: 1, minWidth: 140, textAlign: "center", padding: "1rem" }}>
          <p style={{ fontSize: "2rem", fontWeight: 800, color: "#009bb7", margin: 0 }}>{colleges.length}</p>
          <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}>Total Colleges</p>
        </div>
        {COLLEGE_TYPES.map(t => {
          const count = colleges.filter(c => c.type === t).length;
          if (count === 0) return null;
          return (
            <div key={t} className="admin-card" style={{ flex: 1, minWidth: 120, textAlign: "center", padding: "1rem" }}>
              <p style={{ fontSize: "1.8rem", fontWeight: 800, color: typeColor(t), margin: 0 }}>{count}</p>
              <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0, textTransform: "capitalize" }}>{t}</p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
              <th style={th}>College Name</th>
              <th style={th}>Type</th>
              <th style={th}>City</th>
              <th style={th}>University Affiliation</th>
              <th style={{ ...th, textAlign: "center" }}>Papers</th>
              <th style={{ ...th, textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>Loading...</td></tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>No colleges found</td></tr>
            )}
            {filtered.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #f1f5f9" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f8fafc"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
                <td style={td}>
                  <div style={{ fontWeight: 700, color: "#0f172a" }}>{c.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>ID: {c.id}</div>
                </td>
                <td style={td}>
                  <span style={{
                    display: "inline-block", padding: "3px 10px", borderRadius: 999,
                    fontSize: "0.72rem", fontWeight: 700, textTransform: "capitalize",
                    backgroundColor: typeColor(c.type) + "18", color: typeColor(c.type)
                  }}>
                    {c.type}
                  </span>
                </td>
                <td style={{ ...td, color: "#475569" }}>{c.city || "—"}</td>
                <td style={{ ...td, color: "#475569", maxWidth: 200 }}>{c.university_affiliation || "—"}</td>
                <td style={{ ...td, textAlign: "center" }}>
                  <span style={{ fontWeight: 700, color: "#009bb7" }}>{paperCounts[c.id] ?? "—"}</span>
                </td>
                <td style={{ ...td, textAlign: "center" }}>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                    <button onClick={() => openEdit(c)} style={editBtn}>Edit</button>
                    <button onClick={() => setDeleteId(c.id)} style={deleteBtn}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={overlay} onClick={() => setShowModal(false)}>
          <div style={modal} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 1.5rem", fontSize: "1.1rem", color: "#0f172a" }}>
              {editId ? "✏️ Edit College" : "🏛️ Add New College"}
            </h3>

            <label style={label}>College Name *</label>
            <input style={input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. MPC Autonomous College" />

            <label style={label}>Type</label>
            <select style={input} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              {COLLEGE_TYPES.map(t => <option key={t} value={t} style={{ textTransform: "capitalize" }}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>

            <label style={label}>City</label>
            <input style={input} value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="e.g. Berhampur" />

            <label style={label}>University Affiliation</label>
            <input style={input} value={form.university_affiliation} onChange={e => setForm(f => ({ ...f, university_affiliation: e.target.value }))} placeholder="e.g. Berhampur University" />

            <div style={{ display: "flex", gap: 10, marginTop: "1.5rem" }}>
              <button onClick={() => setShowModal(false)} style={{ ...editBtn, flex: 1 }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ ...saveBtn, flex: 1 }}>
                {saving ? "Saving..." : editId ? "Update" : "Add College"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div style={overlay} onClick={() => setDeleteId(null)}>
          <div style={{ ...modal, maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: "#ef4444", margin: "0 0 0.5rem" }}>Delete College?</h3>
            <p style={{ color: "#64748b", fontSize: "0.875rem", margin: "0 0 1.5rem" }}>
              This will unlink all papers and users from this college. This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setDeleteId(null)} style={{ ...editBtn, flex: 1 }}>Cancel</button>
              <button onClick={() => handleDelete(deleteId)} style={{ ...deleteBtn, flex: 1, padding: "0.6rem 1rem" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const th = { padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700, fontSize: "0.78rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em" };
const td = { padding: "0.85rem 1rem", verticalAlign: "middle" };
const editBtn = { padding: "0.4rem 0.9rem", borderRadius: 6, border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", color: "#475569", fontWeight: 600, fontSize: "0.78rem", cursor: "pointer" };
const deleteBtn = { padding: "0.4rem 0.9rem", borderRadius: 6, border: "none", backgroundColor: "#fee2e2", color: "#ef4444", fontWeight: 600, fontSize: "0.78rem", cursor: "pointer" };
const saveBtn = { padding: "0.6rem 1rem", borderRadius: 8, border: "none", backgroundColor: "#009bb7", color: "#fff", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" };
const overlay = { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 };
const modal = { backgroundColor: "#fff", borderRadius: 16, padding: "2rem", width: "90%", maxWidth: 500, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" };
const label = { display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#374151", marginBottom: 6, marginTop: 12 };
const input = { width: "100%", boxSizing: "border-box", padding: "0.6rem 0.9rem", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.875rem", outline: "none", fontFamily: "inherit" };

export default CollegeManagement;
