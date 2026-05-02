import React from 'react';
import '../adminShared.css';

const IconMonitor = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
  </svg>
);

const CsUpload = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2><IconMonitor /> CS Upload</h2>
        <p>Manage computer science course materials</p>
      </div>
      <div className="admin-card" style={{ textAlign: 'center', padding: '2.5rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>
        CS Upload section — coming soon
      </div>
    </div>
  );
};

export default CsUpload;
