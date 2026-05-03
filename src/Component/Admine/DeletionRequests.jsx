import React, { useEffect, useState } from "react";
import './adminShared.css';
import { useAdminLogin } from "../../Context/AdminLoginCheck/AdminLoginCheck";
import useApi from "../../hooks/useApi";

const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const DeletionRequests = () => {
  const { adminToken } = useAdminLogin();
  const { get, post, loading } = useApi();
  const [requests, setRequests] = useState([]);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchRequests = async () => {
    const res = await get("/admin/deletion-requests", adminToken);
    if (res) setRequests(res);
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleAction = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this request?`)) return;
    setActionLoadingId(id);
    const res = await post(`/admin/deletion-requests/${id}/update`, adminToken, { status });
    if (res?.status) {
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    }
    setActionLoadingId(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2><IconTrash /> Data Deletion Requests</h2>
        <p>Manage user requests to permanently delete their accounts and data</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {requests.map((item) => (
          <div className="admin-card" key={item.id} style={{ opacity: item.status !== 'pending' ? 0.7 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', color: '#0f172a' }}>
                  {item.firstname} {item.lastname}
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0' }}>{item.gmail}</p>
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    fontWeight: 700, 
                    padding: '3px 8px', 
                    borderRadius: '5px',
                    backgroundColor: item.status === 'pending' ? '#fff7ed' : (item.status === 'completed' ? '#f0fdf4' : '#f1f5f9'),
                    color: item.status === 'pending' ? '#c2410c' : (item.status === 'completed' ? '#166534' : '#475569'),
                    textTransform: 'uppercase'
                  }}>
                    {item.status}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    Requested on {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              {item.status === 'pending' && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => handleAction(item.id, 'completed')}
                    disabled={actionLoadingId === item.id}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: '#10b981',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Mark Completed
                  </button>
                  <button 
                    onClick={() => handleAction(item.id, 'rejected')}
                    disabled={actionLoadingId === item.id}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
            {item.reason && (
              <div style={{ marginTop: '1rem', padding: '0.8rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Reason provided:</span>
                <p style={{ fontSize: '0.85rem', color: '#334155', margin: '4px 0' }}>{item.reason}</p>
              </div>
            )}
          </div>
        ))}
        {requests.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            No deletion requests found
          </div>
        )}
      </div>
    </div>
  );
};

export default DeletionRequests;
