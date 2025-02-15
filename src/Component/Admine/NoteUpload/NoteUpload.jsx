import React, { useContext, useState } from 'react';
import './NoteUpload.css';
import axios from 'axios';
import { AlartContectValue } from '../../../Context/AlartContext/AlartContext';


const NoteUpload = () => {
  const [fileName, setFileName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [noteFullName, setNoteFullName] = useState('');
  const [unit, setUnit] = useState('');
  const [file, setFile] = useState(null);
  const { showAlart } = useContext(AlartContectValue);
  const [singletap, setSingletap] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  const handleUpload = async () => {
    if (file) {
        const newFileName = `${noteFullName} ${unit}.pdf`;
        // Rename the file
        const renamedFile = new File([file], newFileName, { type: file.type });

        return renamedFile;
    }
    return null;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileToUpload = await handleUpload();

    setSingletap(true);
    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('subjectName', subjectName);
    formData.append('noteFullName', noteFullName);
    formData.append('unit', unit);

    try {
      const response = await axios.post('/api/Admin/noteUpload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: ({ loaded, total }) =>
          setUploadProgress(Math.round((loaded * 100) / total)),
      });

      if(response.status && response.status === 200){
        showAlart('Successfully uploaded.', '', 'check')
        setFile(null);
        setSubjectName('');
        setNoteFullName('');
        setUnit('');
        setFileName('');

      }else{
        showAlart('Error', 'Upload failed', 'cancel');
      }
    
       
    } catch (error) {
      const status = error.response?.status;
      const messages = {
        401: 'Department does not exist',
        400: 'File already present',
        500: 'Database error',
        502: 'Verification failed',
      };
      showAlart(messages[status] || 'Unexpected error', 'Upload failed', 'cancel');
    } finally {
      setSingletap(false);
    }
  };

  return (
    <section id="upload-note">
      <form onSubmit={handleSubmit} className="upload-form-note">
      <label>Note Full Name:</label>
        <input type="text" placeholder="Note Full Name" value={noteFullName} onChange={(e) => setNoteFullName(e.target.value)} required />

        <label>Subject Name:</label>
        <input type="text" placeholder="Subject Name" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required />

        <label>Unit:</label>
        <input type="text" placeholder="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} required />

        <label>Upload PDF:</label>
        <input type="file" accept="application/pdf" onChange={handleFileChange} required />
        {fileName && <p className="file-name-note">Selected File: {fileName}</p>}
        <button style={{padding : '0.4rem',border : '1px solid #cdcdcd'}} type='reset'>Clear</button>
        <button type="submit" className="upload-btn-note" disabled={singletap}>Upload</button>
      </form>
      {singletap && (<div className="note-loading">
                Uploading.... <br />
                <div style={{ width: '40rem', display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop : '1rem' }}>


                    <meter value={uploadProgress} min="0" max="100" style={{ margin: '0rem 1rem', width: '30rem', height: '2rem' }}></meter>
                    <span style={{ marginBottom: '0.3rem', fontSize: '1.2rem', color: 'white' }}>
                        {uploadProgress}%
                    </span>
                </div>
            </div>)}
    </section>
  );
};

export default NoteUpload;
