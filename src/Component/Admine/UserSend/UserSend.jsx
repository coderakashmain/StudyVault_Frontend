import React from 'react';
import '../adminShared.css';

const IconFolder = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const UserSend = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2><IconFolder /> User Submissions</h2>
        <p>View files submitted by users for review</p>
      </div>
      <div className="admin-card" style={{ textAlign: 'center', padding: '2.5rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>
        No submissions yet
      </div>
    </div>
  );
};

export default UserSend;
