import React, { useContext, useState } from 'react';
import '../adminShared.css';
import axios from 'axios';
import { Departmentlistdata } from '../../../Context/DepartmentList/DepartmentListContext';
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

const SyllabusUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const departmentlistdata = useContext(Departmentlistdata);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { showAlart } = useContext(AlartContectValue);
  const VITE_API_URL = import.meta.env.VITE_API_URL || '/api';
  const [filtetuploaddata, setFiltetuploaddata] = useState({ EducationLevel: '', Stream: '', Subject: '' });
  const [singletap, setSingletap] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      showAlart('Failed', 'Please select a valid PDF file.', 'cancel');
      setSelectedFile(null);
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFiltetuploaddata(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) { showAlart('Select a File', '', 'cancel'); return; }
    setSingletap(true);
    setUploadProgress(0);

    const newFileName = `${filtetuploaddata.Subject}_${filtetuploaddata.Stream}_${filtetuploaddata.EducationLevel}.pdf`;
    const renamedFile = new File([selectedFile], newFileName, { type: selectedFile.type });

    const formData = new FormData();
    formData.append('file', renamedFile);
    formData.append('renameFileback', renamedFile.name);
    formData.append('filtetuploaddata', JSON.stringify(filtetuploaddata));

    try {
      const response = await axios.post(`${VITE_API_URL}/Admin/syllabusUpload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
        onUploadProgress: ({ loaded, total }) => setUploadProgress(Math.round((loaded * 100) / total)),
      });

      if (response.status === 200) {
        setSelectedFile(null);
        setFiltetuploaddata({ EducationLevel: '', Stream: '', Subject: '' });
        showAlart('Successfully uploaded.', '', 'check');
      }
    } catch (error) {
      const status = error.response?.status;
      const messages = { 401: 'Department does not exist', 400: 'File already present', 500: 'Database error', 502: 'Verification failed' };
      showAlart(messages[status] || 'Unexpected error', '', 'cancel');
    } finally {
      setSingletap(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2><IconBook /> Upload Syllabus</h2>
        <p>Add a new syllabus PDF to the platform</p>
      </div>

      <div className="admin-card">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Education Level</label>
          <select name="EducationLevel" onChange={handlechange} value={filtetuploaddata.EducationLevel} required>
            <option value="">Select Level</option>
            <option value="UG">UG</option>
            <option value="PG">PG</option>
          </select>

          <label>Stream</label>
          <select name="Stream" onChange={handlechange} value={filtetuploaddata.Stream} required>
            <option value="">Select Stream</option>
            <option value="SCIENCE">Science</option>
            <option value="COMMERCE">Commerce</option>
            <option value="ARTS">Arts</option>
            <option value="AECC">AECC</option>
            <option value="E&V">E&V</option>
          </select>

          <label>Subject</label>
          <select name="Subject" onChange={handlechange} value={filtetuploaddata.Subject} required>
            <option value="">Select Subject</option>
            {departmentlistdata && departmentlistdata.map((item, i) => (
              <option value={item} key={i}>{item}</option>
            ))}
            <option value="E&V-1">E&V-1</option>
            <option value="E&V-2">E&V-2</option>
            <option value="E&V-3">E&V-3</option>
            <option value="E&V-4">E&V-4</option>
            <option value="E&V-5">E&V-5</option>
            <option value="E&V-6">E&V-6</option>
            <option value="EVS AECC-1 & MIL / Alternative English AECC-2">EVS AECC-1 & MIL / Alt. English AECC-2</option>
            <option value="Communicative English SECC-1">Communicative English SECC-1</option>
            <option value="QLT SECC-2">QLT SECC-2</option>
          </select>

          <label>Upload PDF</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} required />
          {selectedFile && <span className="admin-file-tag">📄 {selectedFile.name}</span>}

          <div className="admin-btn-row">
            <button type="reset" className="admin-btn admin-btn-ghost" onClick={() => { setSelectedFile(null); setFiltetuploaddata({ EducationLevel: '', Stream: '', Subject: '' }); }}>
              <IconX /> Reset
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={singletap}>
              <IconUpload /> {singletap ? 'Uploading…' : 'Upload Syllabus'}
            </button>
          </div>
        </form>
      </div>

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

export default SyllabusUpload;
