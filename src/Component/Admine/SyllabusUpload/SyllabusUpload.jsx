import React, { useContext, useState } from 'react'
import './SyllabusUpload.css'
import axios from 'axios';
import { Departmentlistdata } from '../../../Context/DepartmentList/DepartmentListContext';
import { AlartContectValue } from '../../../Context/AlartContext/AlartContext';

const SyllabusUpload = (props) => {
    const [selectedFile, setSelectedFile] = useState('');
    const departmentlistdata = useContext(Departmentlistdata);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { showAlart } = useContext(AlartContectValue);
    const [filtetuploaddata, setFiltetuploaddata] = useState({
        EducationLevel: '',
        Stream: '',
        Subject: ''


    })
    const [singletap, setSingletap] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            showAlart('Failed', 'Please select a valid PDF file.', 'cancel');
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset the file input
            }
        }
    }

    const handleUpload = async () => {
        if (selectedFile) {
            const newFileName = `${filtetuploaddata.Subject}_${filtetuploaddata.Stream}_${filtetuploaddata.EducationLevel}.pdf`;
            // Rename the file
            const renamedFile = new File([selectedFile], newFileName, { type: selectedFile.type });
            return renamedFile;
        }
        return null;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSingletap(true);

        const fileToUpload = await handleUpload(); // Get renamed file
        if (!fileToUpload) {
            showAlart('Selet a File', 'Please select a valid file.', 'cancel');
            setSingletap(false);
            return;
        }

        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('renameFileback', fileToUpload.name);

        formData.append('filtetuploaddata', JSON.stringify(filtetuploaddata));


        try {
            const response = await axios.post('/api/Admin/syllabusUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentage);
                },

            });

            if (response.status === 200) {
                const fileId = response.data.fileId; // Google Drive File ID
                setSelectedFile('');
                setFiltetuploaddata({
                    EducationLevel: '',
                    Stream: '',
                    Subject: ''
                });
                setSingletap(false);
                showAlart('Successfully uploaded.', '', 'check');

            } else {
                showAlart('External Error', 'Failed to upload the file.', 'cancel');
                setSingletap(false);

            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                showAlart('Department does not exist', 'Failed to upload the file.', 'cancel');
                return;

            }
            if (error.response && error.response.status === 400) {
                showAlart('File already present', 'Failed to upload the file.', 'cancel');
                return;

            }
            if (error.response && error.response.status === 500) {
                showAlart('Failed to save file information to the database', 'Failed to upload the file.', 'mark');
                return;

            }
            if (error.response && error.response.status === 502) {
                showAlart('Failed to verify file existence', 'Failed to upload the file.', 'mark');
                return;

            }

            console.error('Error uploading file:', error);
            showAlart('Unexpected Error', 'Failed to upload the file.', 'cancel');
            setSingletap(false);
        } finally {
            setSingletap(false);
        }
    };

    const handlechange = (e) => {
        const { name, value } = e.target;

        setFiltetuploaddata((preData) => ({
            ...preData,
            [name]: value,

        }))
    };
    return (
        <section id='syllbus-upload'>
            <form onSubmit={handleSubmit} >
                <input type="file" accept="application/pdf" name="syllabus-data" onChange={handleFileChange} required />
                <p style={{ padding: '0.4rem 1rem', border: '1px solid rgb(15, 93, 119)', borderRadius: '0.2rem' }}> {selectedFile ? selectedFile.name : 'Please Select a File :'}</p>
                <select name="EducationLevel" id="" onChange={handlechange} value={filtetuploaddata.EducationLevel}>
                    <option value="">Choose EducationLevel</option>
                    <option value="UG">UG</option>
                    <option value="PG">PG</option>
                </select>
                <select name="Stream" id="" onChange={handlechange} value={filtetuploaddata.Stream} required>
                    <option value="">Choose Stream</option>
                    <option value="SCIENCE">Science</option>
                    <option value="COMMERCE">Commerce</option>
                    <option value="ARTS">Arts</option>
                    <option value="AECC">AECC</option>
                    <option value="E&V">E&V</option>
                </select>
                <select name="Subject" id="" onChange={handlechange} value={filtetuploaddata.Subject} required>
                    <option value="">Choose Subjects</option>
                    {(departmentlistdata && departmentlistdata.map((listdata, index) => (
                        <option value={listdata} key={index}> {listdata}</option>
                    )))}
                    <option value="E&V-1">E&V-1</option>
                    <option value="E&V-2">E&V-2</option>
                    <option value="E&V-3">E&V-3</option>
                    <option value="E&V-4">E&V-4</option>
                    <option value="E&V-5">E&V-5</option>
                    <option value="E&V-6">E&V-6</option>
                    <option value="EVS AECC-1 & MIL / Alternative English AECC-2">EVS AECC-1 & MIL / Alternative English AECC-2</option>
                    <option value="Communicative English SECC-1">Communicative English SECC-1</option>
                    <option value="QLT SECC-2">QLT SECC-2</option>
                </select>
                <div style={{ display: 'block', float: 'right' }}>


                    <button type='reset' onClick={() => {
                        setFiltetuploaddata({
                            EducationLevel: '',
                            Stream: '',
                            Subject: ''
                        })
                        showAlart('Cleard', '', 'check')
                    }}>Reset</button>
                    <button type='Submit'>Upload</button>
                </div>
            </form>
            {singletap && (<div className="syllbus-loading">
                Uploading.... <br />
                <div style={{ width: '40rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


                    <meter value={uploadProgress} min="0" max="100" style={{ margin: '0rem 1rem', width: '30rem', height: '2rem' }}></meter>
                    <span style={{ marginBottom: '0.3rem', fontSize: '1.2rem', color: 'white' }}>
                        {uploadProgress}%
                    </span>
                </div>
            </div>)}
        </section>
    )
}

export default SyllabusUpload
