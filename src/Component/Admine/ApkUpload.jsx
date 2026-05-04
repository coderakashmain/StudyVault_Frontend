import React, { useContext, useState } from 'react';
import './adminShared.css';
import { AlartContectValue } from '../../Context/AlartContext/AlartContext';

const IconSmartphone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/>
  </svg>
);
const IconLink = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);
const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ApkUpload = () => {
  const [apkUrl, setApkUrl] = useState('');
  const { showAlart } = useContext(AlartContectValue);
  const [singletap, setSingletap] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apkUrl.trim()) return;

    if (!apkUrl.includes('drive.google.com') && !apkUrl.startsWith('http')) {
      showAlart('Failed', 'Please enter a valid Google Drive URL.', 'cancel');
      return;
    }

    setSingletap(true);

    try {
      const VITE_API_URL = import.meta.env.VITE_API_URL || '/api';
      const axios = (await import('axios')).default;
      const response = await axios.post(`${VITE_API_URL}/admin/upload-apk`, { apkUrl }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.status === 200) {
        showAlart('Successfully updated.', 'The latest APK link is now live.', 'check');
        setApkUrl('');
      } else {
        showAlart('Error', 'Update failed', 'cancel');
      }
    } catch (error) {
      console.error(error);
      showAlart('Error', error.response?.data?.message || 'Server error', 'cancel');
    } finally {
      setSingletap(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2><IconSmartphone /> Update Application APK</h2>
        <p>Update the Google Drive link for the StudyVault Campus Android app</p>
      </div>

      <div className="admin-card">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Google Drive Shareable Link</label>
          <div style={{ position: 'relative', marginTop: '8px' }}>
            <input 
              type="url" 
              placeholder="https://drive.google.com/file/d/..."
              value={apkUrl}
              onChange={(e) => setApkUrl(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.2)',
                color: '#fff',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              required 
            />
            <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#009bb7', display: 'flex' }}>
              <IconLink />
            </div>
          </div>
          
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '12px', fontSize: '13px' }}>
            Upload the APK file to your Google Drive, set its access to "Anyone with the link", and paste the link here.
          </p>

          <div className="admin-btn-row" style={{ marginTop: '24px' }}>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setApkUrl('')}>
              <IconX /> Clear
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={singletap || !apkUrl}>
              <IconLink /> {singletap ? 'Updating…' : 'Update APK Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApkUpload;
