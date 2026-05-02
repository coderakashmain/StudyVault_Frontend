import React, { useEffect, useState } from "react";
import './adminShared.css';
import { useAdminLogin } from "../../Context/AdminLoginCheck/AdminLoginCheck";
import useApi from "../../hooks/useApi";

/* ── SVG Icons ── */
const IconUpload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const IconFileText = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);
const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconEdit = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconAlertTriangle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const AdmineControl = () => {
  const { adminToken } = useAdminLogin();
  const { get, post, loading } = useApi();

  const [pending, setPending] = useState([]);
  const [remarkMap, setRemarkMap] = useState({});
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchPending = async () => {
    const res = await get("/Admin/pending-uploads", adminToken);
    if (res?.status) setPending(res.data);
  };

  useEffect(() => { fetchPending(); }, []);

  const handleApprove = async (id) => {
    setActionLoadingId(id);
    const res = await post(`/Admin/submissions/${id}/approve`, adminToken);
    if (res?.status) setPending(prev => prev.filter(p => p.id !== id));
    setActionLoadingId(null);
  };

  const handleReject = async (id) => {
    const remark = remarkMap[id];
    if (!remark || remark.trim().length < 5) { alert("Remark must be at least 5 characters"); return; }
    setActionLoadingId(id);
    const res = await post(`/Admin/submissions/${id}/reject`, adminToken, { remark });
    if (res?.status) setPending(prev => prev.filter(p => p.id !== id));
    setActionLoadingId(null);
  };

  const handleUpdateRemark = async (id) => {
    const remark = remarkMap[id];
    if (!remark || remark.trim().length < 5) { alert("Remark must be at least 5 characters"); return; }
    setActionLoadingId(id);
    const res = await post(`/Admin/submissions/${id}/update-remark`, adminToken, { remark });
    if (res?.status) alert("Remark updated successfully");
    setActionLoadingId(null);
  };

  const openPdf = (url) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2><IconUpload /> User Uploads</h2>
        <p>Review and moderate pending paper submissions</p>
      </div>

      {/* ── Header row with Search + Per-page ── */}
      <div style={{ margin: '0 0 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <select
            value={itemsPerPage}
            onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            style={{
              fontSize: '0.72rem', border: '1px solid #e2e8f0', borderRadius: '6px',
              padding: '0.38rem 0.6rem', background: '#ffffff', color: '#475569',
              fontFamily: 'Inter, sans-serif', outline: 'none', cursor: 'pointer'
            }}
          >
            {[10, 20, 50].map(n => <option key={n} value={n}>{n} / page</option>)}
          </select>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: '0.6rem', width: 13, height: 13, color: '#94a3b8', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search uploads…"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              style={{
                paddingLeft: '1.8rem', paddingRight: searchQuery ? '1.6rem' : '0.7rem',
                paddingTop: '0.4rem', paddingBottom: '0.4rem',
                fontSize: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '7px',
                background: '#ffffff', color: '#0f172a', outline: 'none',
                fontFamily: 'Inter, sans-serif', width: '200px', transition: 'border-color 0.2s'
              }}
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                style={{ position: 'absolute', right: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0, fontSize: '1rem' }}
              >×</button>
            )}
          </div>
        </div>
        {!loading && pending.length > 0 && (
          <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 500 }}>
            {pending.length} pending submissions
          </span>
        )}
      </div>

      {pending.length === 0 && !loading && (
        <div className="admin-card" style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8', fontSize: '0.78rem' }}>
          🎉 No pending submissions
        </div>
      )}

      {(() => {
        const filtered = pending.filter(item => 
          String(item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(item.uploaded_by_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(item.uploaded_by_email || '').toLowerCase().includes(searchQuery.toLowerCase())
        );
        const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        const totalPages = Math.ceil(filtered.length / itemsPerPage);

        return (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {paginated.map((item) => (
                <div className="admin-card" key={item.id}>
                  {/* Header row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.6rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>{item.title}</span>
                        <button
                          onClick={() => openPdf(item.url)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#009bb7', display: 'flex' }}
                          title="View PDF"
                        >
                          <IconFileText />
                        </button>
                      </div>
                      <p style={{ fontSize: '0.7rem', color: '#64748b', margin: '0 0 0.15rem' }}>
                        {item.departmentName} · {item.years} · {item.semester}
                      </p>
                      <p style={{ fontSize: '0.68rem', color: '#94a3b8', margin: 0 }}>
                        By: {item.uploaded_by_name} ({item.uploaded_by_email})
                      </p>
                    </div>
                    <span style={{ fontSize: '0.62rem', color: '#cbd5e1', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>

                  {/* Duplicate warning */}
                  {item.is_duplicate === 1 && Array.isArray(item.duplicate_titles) && item.duplicate_titles.length > 0 && (
                    <div style={{
                      background: '#fff5f5', border: '1px solid #fecaca',
                      borderRadius: '7px', padding: '0.6rem 0.8rem', marginBottom: '0.6rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem' }}>
                        <IconAlertTriangle />
                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#ef4444' }}>Possible duplicates found</span>
                      </div>
                      <ul style={{ margin: 0, padding: '0 0 0 1rem' }}>
                        {item.duplicate_titles.map((t, idx) => (
                          <li key={idx} style={{ fontSize: '0.68rem', color: '#ef4444', opacity: 0.8, marginBottom: '0.1rem' }}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Remark textarea */}
                  <textarea
                    placeholder="Add a remark (required to reject)"
                    rows={2}
                    value={remarkMap[item.id] || ""}
                    onChange={(e) => setRemarkMap({ ...remarkMap, [item.id]: e.target.value })}
                    style={{
                      width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0',
                      borderRadius: '7px', padding: '0.5rem 0.75rem', fontSize: '0.75rem',
                      color: '#0f172a', fontFamily: 'Inter, sans-serif',
                      outline: 'none', resize: 'vertical', marginBottom: '0.75rem', boxSizing: 'border-box'
                    }}
                  />

                  {/* Action buttons */}
                  <div className="admin-btn-row">
                    <button className="admin-btn admin-btn-primary" onClick={() => handleApprove(item.id)} disabled={actionLoadingId === item.id}>
                      <IconCheck /> Approve
                    </button>
                    <button className="admin-btn admin-btn-danger" onClick={() => handleReject(item.id)} disabled={actionLoadingId === item.id}>
                      <IconX /> Reject
                    </button>
                    <button className="admin-btn admin-btn-ghost" onClick={() => handleUpdateRemark(item.id)} disabled={actionLoadingId === item.id}>
                      <IconEdit /> Update Remark
                    </button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && searchQuery && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontSize: '0.75rem' }}>
                  No matches for "{searchQuery}"
                </div>
              )}
            </div>

            {/* ── Pagination controls ── */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="admin-btn admin-btn-ghost"
                  style={{ padding: '0.35rem 0.7rem' }}
                >Prev</button>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="admin-btn admin-btn-ghost"
                  style={{ padding: '0.35rem 0.7rem' }}
                >Next</button>
              </div>
            )}
          </>
        );
      })()}

      {loading && (
        <p style={{ marginTop: '1rem', fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
          Processing…
        </p>
      )}
    </div>
  );
};

export default AdmineControl;
