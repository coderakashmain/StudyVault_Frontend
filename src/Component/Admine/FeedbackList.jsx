import React, { useEffect, useState } from "react";
import './adminShared.css';
import { useAdminLogin } from "../../Context/AdminLoginCheck/AdminLoginCheck";
import useApi from "../../hooks/useApi";

const IconMessage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const StarRating = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1, 2, 3, 4, 5].map(star => (
      <span key={star} style={{ color: rating >= star ? '#FFD700' : '#e2e8f0', fontSize: '1rem' }}>★</span>
    ))}
  </div>
);

const FeedbackList = () => {
  const { adminToken } = useAdminLogin();
  const { get, loading } = useApi();
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchFeedbacks = async () => {
    const res = await get("/admin/feedbacks", adminToken);
    if (res) setFeedbacks(res);
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  const filtered = feedbacks.filter(f => 
    String(f.message || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(f.firstname || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(f.gmail || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2><IconMessage /> User Feedback</h2>
        <p>Review suggestions and bug reports from users</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Search feedback..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="admin-search-input"
          style={{
            padding: '0.6rem 1rem',
            fontSize: '0.85rem',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '400px',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map((item) => (
          <div className="admin-card" key={item.id} style={{ borderLeft: `4px solid ${item.feedback_type === 'bug' ? '#ef4444' : '#009bb7'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: item.feedback_type === 'bug' ? '#ef4444' : '#009bb7' }}>
                  {item.feedback_type}
                </span>
                <h4 style={{ margin: '4px 0', fontSize: '0.9rem', color: '#0f172a' }}>
                  {item.firstname ? `${item.firstname} ${item.lastname || ''}` : 'Anonymous'}
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>{item.gmail || 'No email provided'}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <StarRating rating={item.rating} />
                <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.5', margin: '0.5rem 0' }}>
              {item.message}
            </p>
          </div>
        ))}
        {filtered.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            No feedback found
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;
