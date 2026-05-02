import React, { useContext, useState } from 'react';
import '../adminShared.css';
import useApi from '../../../hooks/useApi';
import { AlartContectValue } from '../../../Context/AlartContext/AlartContext';

const IconBook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
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

const NoteUpload = () => {
  const [fileName, setFileName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [noteFullName, setNoteFullName] = useState('');
  const [unit, setUnit] = useState('');
  const [file, setFile] = useState(null);
  const { showAlart } = useContext(AlartContectValue);
  const [singletap, setSingletap] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { postForm } = useApi();

  const handleFileChange = (e) => {
    const filedata = e.target.files?.[0];
    if (filedata && filedata.type === 'application/pdf') {
      setFile(filedata);
      setFileName(filedata.name);
    } else {
      showAlart('Failed', 'Please select a valid PDF file.', 'cancel');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const newFileName = `${noteFullName} ${unit}.pdf`;
    const renamedFile = new File([file], newFileName, { type: file.type });

    setSingletap(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', renamedFile);
    formData.append('subjectName', subjectName);
    formData.append('noteFullName', noteFullName);
    formData.append('unit', unit);

    try {
      const VITE_API_URL = import.meta.env.VITE_API_URL || '/api';
      const axios = (await import('axios')).default;
      const response = await axios.post(`${VITE_API_URL}/Admin/noteUpload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
        onUploadProgress: ({ loaded, total }) =>
          setUploadProgress(Math.round((loaded * 100) / total)),
      });

      if (response.status === 200) {
        showAlart('Successfully uploaded.', '', 'check');
        setFile(null); setSubjectName(''); setNoteFullName(''); setUnit(''); setFileName('');
      } else {
        showAlart('Error', 'Upload failed', 'cancel');
      }
    } catch (error) {
      const status = error.response?.status;
      const messages = { 401: 'Folder not found', 400: 'Already exists', 500: 'Server error' };
      showAlart(messages[status] || 'Unexpected error', '', 'cancel');
    } finally {
      setSingletap(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2><IconBook /> Upload Note</h2>
        <p>Add a new note PDF to the platform</p>
      </div>

      <div className="admin-card">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Note Full Name</label>
          <input type="text" placeholder="e.g. Data Structures Complete Notes" value={noteFullName} onChange={e => setNoteFullName(e.target.value)} required />

          <label>Subject Name</label>
          <input type="text" placeholder="e.g. Computer Science" value={subjectName} onChange={e => setSubjectName(e.target.value)} required />

          <label>Unit</label>
          <input type="text" placeholder="e.g. Unit 1" value={unit} onChange={e => setUnit(e.target.value)} required />

          <label>Upload PDF</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} required />
          {fileName && <span className="admin-file-tag">📄 {fileName}</span>}

          <div className="admin-btn-row">
            <button type="reset" className="admin-btn admin-btn-ghost" onClick={() => { setFile(null); setFileName(''); }}>
              <IconX /> Clear
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={singletap}>
              <IconUpload /> {singletap ? 'Uploading…' : 'Upload Note'}
            </button>
          </div>
        </form>
      </div>

      {/* Progress Overlay */}
      {singletap && (
        <div className="admin-upload-overlay">
          <p>Uploading to Google Drive…</p>
          <div className="admin-progress-bar-track">
            <div className="admin-progress-bar-fill" style={{ width: `${uploadProgress}%` }} />
          </div>
          <span className="admin-progress-pct">{uploadProgress}%</span>
        </div>
      )}
    </div>
  );
};

export default NoteUpload;
