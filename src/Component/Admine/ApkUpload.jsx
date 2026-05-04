import React, { useContext, useState } from 'react';
import '../adminShared.css';
import { AlartContectValue } from '../../../Context/AlartContext/AlartContext';

const IconSmartphone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/>
  </svg>
);
const IconUpload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ApkUpload = () => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const { showAlart } = useContext(AlartContectValue);
  const [singletap, setSingletap] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const filedata = e.target.files?.[0];
    if (filedata) {
      if (filedata.name.endsWith('.apk')) {
        setFile(filedata);
        setFileName(filedata.name);
      } else {
        showAlart('Failed', 'Please select a valid APK file.', 'cancel');
        setFile(null);
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setSingletap(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('apk', file);

    try {
      const VITE_API_URL = import.meta.env.VITE_API_URL || '/api';
      const axios = (await import('axios')).default;
      const response = await axios.post(`${VITE_API_URL}/Admin/upload-apk`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
        onUploadProgress: ({ loaded, total }) =>
          setUploadProgress(Math.round((loaded * 100) / total)),
      });

      if (response.status === 200) {
        showAlart('Successfully uploaded.', 'The latest APK is now live.', 'check');
        setFile(null); 
        setFileName('');
      } else {
        showAlart('Error', 'Upload failed', 'cancel');
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
        <p>Upload a new version of the StudyVault Campus Android app</p>
      </div>

      <div className="admin-card">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Select APK File</label>
          <div style={{
            border: '2px dashed rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.02)',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <input 
              type="file" 
              accept=".apk" 
              onChange={handleFileChange} 
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: 'pointer'
              }}
              required 
            />
            <IconUpload style={{ width: 40, height: 40, marginBottom: '16px', color: '#009bb7' }} />
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              {fileName ? fileName : 'Click or drag APK file here'}
            </p>
          </div>

          <div className="admin-btn-row" style={{ marginTop: '24px' }}>
            <button type="reset" className="admin-btn admin-btn-ghost" onClick={() => { setFile(null); setFileName(''); }}>
              <IconX /> Clear
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={singletap || !file}>
              <IconUpload /> {singletap ? 'Uploading…' : 'Publish APK'}
            </button>
          </div>
        </form>
      </div>

      {/* Progress Overlay */}
      {singletap && (
        <div className="admin-upload-overlay">
          <p>Uploading to server…</p>
          <div className="admin-progress-bar-track">
            <div className="admin-progress-bar-fill" style={{ width: `${uploadProgress}%` }} />
          </div>
          <span className="admin-progress-pct">{uploadProgress}%</span>
        </div>
      )}
    </div>
  );
};

export default ApkUpload;
