import React, { useContext, useState, useRef, useEffect } from 'react'
import { FetchDataContext } from '../../../Context/FretchDataContext/FetchData'
import { degrees, error, PDFDocument, rgb } from 'pdf-lib';


import './Question.css'
import { Departmentlistdata } from '../../../Context/DepartmentList/DepartmentListContext'
import axios from 'axios'
import { AlartContectValue } from '../../../Context/AlartContext/AlartContext';
import { Trash2, ShieldAlert, ShieldCheck, Verified, History } from 'lucide-react'
import UploadProgressPopup from './UploadProgressPopup';


const Question = (props) => {
    const departmentlist = useContext(Departmentlistdata);
    const { setPaperList } = useContext(FetchDataContext);
    const [selectedFile, setSelectedFile] = useState('');
    const [departmetvalue, setDartmentvalue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showSuggestionspaper, setShowSuggestionspaper] = useState(false);
    const [singletap, setSingletap] = useState(false);
    const hideeSarchSuggestion = useRef();
    const [fetchData, setFetchData] = useState([]);
    const [honors, setHonors] = useState(true);
    const [elective, setElective] = useState(false);
    const [Compulsory, setCompulsory] = useState(false);
    const [eandv, setEandv] = useState(false);
    const [updatedata, setUpdatedata] = useState('');
    const paperboxhide = useRef();
    const fileInputRef = useRef();
    const [uploadProgress, setUploadProgress] = useState(() => {
        const savedUploads = localStorage.getItem("uploadHistory");
        return savedUploads ? JSON.parse(savedUploads) : [];
    });
    const { showAlart } = useContext(AlartContectValue);
    const [varified, setVerified] = useState(false);
    const [otpop, setOtppop] = useState(false);

    const [deletingurl, setDeletingurl] = useState('');
    const [otpsent, setOtpsent] = useState(false);
    const [otpvalue, setOtpvalue] = useState('');
    const [load, setLoad] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const[clearall,setClearall] = useState(false);
    const [filtetuploaddata, setFiltetuploaddata] = useState(
        {
            departmentName: '',
            educationLavel: '',
            session: '',
            dptyear: '',
            semormid: '',
            paperName: '',
            studentyear: ''

        }
    );



    useEffect(() => {
        const yearMap = {
            '1stsem': '1st',
            '2ndsem': '1st',
            '3rdsem': '2nd',
            '4thsem': '2nd',
            '5thsem': '3rd',
            '6thsem': '3rd',
            '7thsem': '4th',
            '8thsem': '4th'
        };

        const studentyear = yearMap[filtetuploaddata.dptyear] || '';

        setFiltetuploaddata((prevData) => ({
            ...prevData,
            studentyear
        }));
    }, [filtetuploaddata.dptyear]);


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
    };


    const addWatermark = async (file, watermarkText) => {
        const pdfBytes = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();

        pages.forEach((page) => {
            const { width, height } = page.getSize();
            page.drawText(watermarkText, {
                x: width / 2 - 100,
                y: height / 2,
                size: 40,
                color: rgb(0.75, 0.75, 0.75),
                opacity: 0.4,
                rotate: degrees(45),
            });
        });

        const watermarkedPdfBytes = await pdfDoc.save();
        const watermarkedFile = new File([watermarkedPdfBytes], file.name, { type: file.type });
        return watermarkedFile;
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const newFileName = `${filtetuploaddata.departmentName}_${filtetuploaddata.studentyear}_${filtetuploaddata.dptyear}_${filtetuploaddata.paperName}_${filtetuploaddata.semormid}_${filtetuploaddata.educationLavel}_${filtetuploaddata.session}.pdf`;
            // Rename the file
            const renamedFile = new File([selectedFile], newFileName, { type: selectedFile.type });
            const watermarkedFile = await addWatermark(renamedFile, 'StudyVault - Protected');
            return watermarkedFile;
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
        // Prepare FormData for the POST request
        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('renameFileback', fileToUpload.name);
        // formData.append('userid', user.id);
        formData.append('filtetuploaddata', JSON.stringify(filtetuploaddata));

        setSelectedFile('');

        if(clearall){
            setFiltetuploaddata(prev => ({
                ...prev,          
                departmentName: '',
                paperName: ''
            }));
        }else{
            setFiltetuploaddata({
                departmentName: '',
                educationLavel: '',
                session: '',
                dptyear: '',
                semormid: '',
                paperName: '',
                studentyear: ''
            });
        }
        
        setDartmentvalue('');
        
        
        setElective(false);
        setCompulsory(false);
        setEandv(false);
        setHonors(true);
        
        
        const uploadId = Date.now(); // Unique ID for this file
        const newUpload = { id: uploadId, name: fileToUpload.name, progress: 0, status: "Uploading..." };
        
        setUploadProgress(prev => {
            const updated = [...prev, newUpload];
            localStorage.setItem("uploadHistory", JSON.stringify(updated)); // Save to localStorage
            return updated;
        });

        setShowPopup(true);
        try {
            const response = await axios.post('/api/Admin/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(prev => {
                        const updated = prev.map(upload =>
                            upload.id === uploadId ? { ...upload, progress: percentage } : upload
                        );
                        localStorage.setItem("uploadHistory", JSON.stringify(updated)); // Save progress
                        return updated;
                    });
                },

            });

            if (response.status === 200) {
                const fileId = response.data.fileId;

                setUploadProgress(prev => {
                    const updated = prev.map(upload =>
                        upload.id === uploadId ? { ...upload, progress: 100, status: "Success" } : upload
                    );
                    localStorage.setItem("uploadHistory", JSON.stringify(updated)); // Save success
                    return updated;
                });
                setShowPopup(false)
                setSingletap(false);
                showAlart('Successfully uploaded.', '', 'check');
            } else {
                showAlart('External Error', 'Failed to upload the file.', 'cancel');
                setSingletap(false);
                setShowPopup(false)

            }
        } catch (error) {

            setShowPopup(false)
            if (error.response && error.response.status === 401) {
                showAlart('Department does not exist', 'Failed to upload the file.', 'cancel');
                setUploadProgress(prev => {
                    const updated = prev.map(upload =>
                        upload.id === uploadId ? { ...upload, status: `Failed : Department does not exist` } : upload
                    );
                    localStorage.setItem("uploadHistory", JSON.stringify(updated)); // Save failure
                    return updated;
                });
                return;

            }
            if (error.response && error.response.status === 400) {
                showAlart('File already present', 'Failed to upload the file.', 'cancel');
                setUploadProgress(prev => {
                    const updated = prev.map(upload =>
                        upload.id === uploadId ? { ...upload, status: `Failed : File already present` } : upload
                    );
                    localStorage.setItem("uploadHistory", JSON.stringify(updated)); // Save failure
                    return updated;
                });
                return;

            }
            if (error.response && error.response.status === 500) {
                showAlart('Failed to save file information to the database', 'Failed to upload the file.', 'mark');
                setUploadProgress(prev => {
                    const updated = prev.map(upload =>
                        upload.id === uploadId ? { ...upload, status: `Failed : Failed to save file information to the database` } : upload
                    );
                    localStorage.setItem("uploadHistory", JSON.stringify(updated)); // Save failure
                    return updated;
                });
                return;

            }
            if (error.response && error.response.status === 502) {
                showAlart('Failed to verify file existence', 'Failed to upload the file.', 'mark');
                setUploadProgress(prev => {
                    const updated = prev.map(upload =>
                        upload.id === uploadId ? { ...upload, status: `Failed : Failed to verify file existence` } : upload
                    );
                    localStorage.setItem("uploadHistory", JSON.stringify(updated)); // Save failure
                    return updated;
                });
                return;

            } else {
                setUploadProgress(prev => {
                    const updated = prev.map(upload =>
                        upload.id === uploadId ? { ...upload, status: `Failed : ${error}` } : upload
                    );
                    localStorage.setItem("uploadHistory", JSON.stringify(updated)); // Save failure
                    return updated;
                });
                console.error('Error uploading file:', error);
                showAlart('Unexpected Error', 'Failed to upload the file.', 'cancel');
                setSingletap(false);
                return;
            }


        } finally {
            setSingletap(false);
        }
    };






    const deparmentChange = (e) => {
        setDartmentvalue(e.target.value);
        setUpdatedata(e.target.value);
        setShowSuggestions(true);
        handlechange(e);

    }
    useEffect(() => {
        const handlehide = (event) => {
            if (hideeSarchSuggestion.current && !hideeSarchSuggestion.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        const paperhide = (event) => {
            if (paperboxhide.current && !paperboxhide.current.contains(event.target)) {
                setShowSuggestionspaper(false);
            }
        }
        document.addEventListener("mousedown", handlehide);
        document.addEventListener("mousedown", paperhide);

        return () => {
            document.removeEventListener("mousedown", handlehide);
            document.removeEventListener("mousedown", paperhide);
        }
    });

    const handlechange = (e) => {
        const { name, value } = e.target;
        if (name === 'paperName') {
            setShowSuggestionspaper(true);
        }
        setFiltetuploaddata((preData) => ({
            ...preData,
            [name]: value,

        }))
    };
    useEffect(() => {
        if (!filtetuploaddata.paperName)
            setShowSuggestionspaper(false);
    }, [filtetuploaddata.paperName]);


    useEffect(() => {
        const fatchData = async () => {
            try {
                const response = await axios.get('/api/admin/fetchData', { withCredentials: true });
                if (response.status === 200) {
                    setFetchData(response.data);
                    setPaperList(response.data);
                }
            } catch (err) {

                console.error("Error fetching Data", err);
            }
        }
        fatchData();
    }, [singletap, deletingurl]);

    const handlesubjet = (e) => {
        const value = e.target.innerText

        if (value !== 'Honors') {

            setDartmentvalue(value);
        }
        else {
            setDartmentvalue(updatedata);
        }
        setFiltetuploaddata({
            ...filtetuploaddata,
            departmentName: value === 'Honors' ? updatedata : value,
        });
    }


    const subjectlist = [
        'C-1',
        'C-2',
        'C-3',
        'C-4',
        'C-5',
        'C-6',
        'C-7',
        'C-8',
        'C-9',
        'C-10',
        'C-11',
        'C-12',
        'C-13',
        'C-14',
        'C-101',
        'C-102',
        'C-103',
        'C-104',
        'C-105',
        'C-201',
        'C-202',
        'C-203',
        'C-204',
        'C-205',
        'C-301',
        'C-302',
        'C-303',
        'C-304',
        'C-305',
        'C-1.1',
        'C-1.2',
        'C-1.3',
        'C-1.4',
        'C-1.5',
        'C-2.1',
        'C-2.2',
        'C-2.3',
        'C-2.4',
        'C-2.5',
        'PHY GE-1',
        'MATH GE-1',
        'MATH GE-2',
        'MATH GE-3',
        'PHY GE-3',
        'MATH GE-4',
        'CHEM GE-1',
        'CHEM GE-2',
        'CHEM GE-3',
        'CHEM GE-4',
        'HIST GE-2',
        'HIST GE-4',
        'P.SC GE-1',
        'P.SC GE-3',
        'BCA GE-1',
        'BCA GE-2',
        'BCA GE-2 (STAT)',
        'BBA GE-1 (G.E)',
        'BBA GE-2 ',
        'COM GE-1',
        'COM GE-2',
        'COM GE-3',
        'COM GE-4',
        'ZOOL GE-2',
        'ZOOL GE-4',
        'ODIA GE-2',
        'ODIA GE-4',
        'AECC-1(EVS)',
        'AECC-2(ODIA)',
        'AECC-2(HINDI)',
        'AECC-2(ENGLISH)',
        'AECC-2(SANSKRIT)',
        'SEC-1(CE)',
        'SEC-2(QLT)',
        'DSE-1',
        'DSE-2',
        'DSE-3',
        'DSE-4',
        'E&V-1',
        'E&V-2',
        'E&V-3',
        'E&V-4',
        'E&V-5',
        'E&V-6',
    ]


    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        if (token) {
            setVerified(true);
        } else {
            setVerified(false)
        }
    }, [token])


    const extractFileId = (url) => {
        const fileRegex = /drive\.google\.com\/file\/d\/([^/?]+)/;
        const match = url.match(fileRegex);

        if (match) {
            return match[1]; // Extracted File ID
        } else {
            return null; // No File ID found
        }
    };

    const deletepdfhandle = async (id, urlid) => {
        setDeletingurl(urlid);
        const urlpdfid = extractFileId(urlid);
        const sureDelete = window.confirm("Are you sure you want to delete the PDF? , This will delete permantly!");
        if (sureDelete) {
            try {
                const token = localStorage.getItem("adminToken");


                await axios.post('/api/admin/deletepdf',
                    { id, urlpdfid },
                    { headers: { Authorization: `Bearer ${token}` } }

                );

                showAlart("Deleted successfully", '', 'check');
                setDeletingurl('');

            } catch (error) {
                showAlart("Deleted Faild", '', 'cancel');
                setDeletingurl('');
                console.error({ 'Deleted Faild': error })
            }

        }
        else {
            showAlart('Delete cancel', '', 'check');
            setDeletingurl('');
        }
    }

    const requestDeleteotp = async () => {
        setLoad(true)
        try {
            await axios.post("/api/admin/request-delete");
            showAlart("OTP sent to your email", '', 'check');
            setOtpsent(true);
            setLoad(false)
        } catch (error) {
            console.error("Error sending OTP:", error);
            showAlart("Failed to send OTP", '', 'cancel');
            setLoad(false)
        }
    };


    const verifyOtp = async () => {
        setLoad(true);
        if (!otpvalue) {
            showAlart("Please enter otp", '', 'mark')
            setLoad(false);
            return;
        }
        try {
            const response = await axios.post("/api/admin/delete/verify-otp", {

                otpvalue,
            });

            const token = response.data.token;
            if (token) {
                localStorage.setItem("adminToken", token);
                setVerified(true);
                showAlart("OTP verified! You can delete PDFs now.", '', 'check');
            }
            setLoad(false);
        } catch (error) {
            console.error("OTP verification failed:", error);
            setLoad(false);
            showAlart("Invalid OTP", '', 'cancel');
        }
    };

    const handleinputclear = (e)=>{
        setClearall(prev => !prev);
    }


    return (
        <>
            <aside id='question'>
            {showPopup && <UploadProgressPopup uploads={uploadProgress} onClose={() => setShowPopup(false)} />}
                {otpop && (<div className="otpop">
                    <div className="otppop-box">
                        <p onClick={() => {
                            setOtppop(false);
                            setOtpsent(false);
                            setLoad(false);
                            setOtpvalue('');
                        }}>X</p>
                        <big>Verify Your Self</big>

                        {!otpsent ? (<button className='active' onClick={requestDeleteotp} style={load ? { opacity: '0.5' } : { opacity: '1' }} disabled={load} >{(!load ? "Verify" : 'Sending Otp')}</button>) : (<div className='verified-dltbtn'>
                            {!varified && (<input type="number" value={otpvalue} onChange={(e) => setOtpvalue(e.target.value)} name="otp" id="otp" placeholder='Enter Otp ...' required />)}

                            {!varified ? (<button className='active' disabled={load} style={load ? { opacity: '0.5' } : { opacity: '1' }} onClick={verifyOtp} >{(!load ? "Verify Otp" : 'verifying...')}</button>) : (
                                <button className='active' onClick={() => setOtppop(false)} >Close</button>

                            )}
                        </div>)}

                    </div>
                </div>)}
                <h2 className='question-headline'>
                    <span>Question Papers<i className="fa-solid fa-clipboard-question" style={{ margin: '0 0.5rem' }}></i>
                    </span>
                 
                 <p className="question-headline-right-box" style={{ display : 'flex', gap :'1rem'}}>

                    <History size={28} onClick={() => setShowPopup(true)}
                        style={{ cursor: "pointer", marginLeft: "10px" }} />


                 
                    <span>{!varified ? (<ShieldAlert stroke='red' size="2rem" onClick={() => setOtppop(true)} />) : (<ShieldCheck stroke='green' size="2rem" />)}</span>
                        </p>
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="question-box">

                        <input type="file" accept="application/pdf" name="ApaperUpload" id="" onChange={handleFileChange} />
                        <div className="filestorebox">

                            <input type="text" value={selectedFile ? selectedFile.name : 'Please Select a File :'} readOnly={true} />
                            <button onClick={() => {
                                setSelectedFile(null)
                                showAlart('Cleard', '', 'check');

                            }}>Clear</button>
                        </div>

                        <div className="inputQuestinBox">
                            <div className="inputQuestinBox-each inputQuestinBox-in">
                                <input type="text" id='Asearch' name='departmentName' placeholder='Department Name' onChange={deparmentChange} value={departmetvalue} required readOnly={Compulsory || elective || eandv ? true : false}
                                    className={`${Compulsory || elective || eandv ? 'paperdis' : 'paperen'}`} />
                                {showSuggestions && (<div ref={hideeSarchSuggestion} className="search-suggestion">
                                    {departmetvalue ? (
                                        departmentlist && departmentlist.filter((item) => {
                                            const data = item.toLowerCase();
                                            const searchTerm = departmetvalue.toLowerCase();
                                            return data.startsWith(searchTerm);
                                        }).length === 0 ? (
                                            <div className="search-item">
                                                <p>No Departments available</p>
                                            </div>
                                        ) : (
                                            departmentlist.filter((item) => {
                                                const data = item.toLowerCase();
                                                const searchTerm = departmetvalue.toLowerCase();
                                                return data.startsWith(searchTerm) && data !== searchTerm;
                                            }).map((departmentlist, index4) => (
                                                <div onClick={(e) => {
                                                    setShowSuggestionspaper(false);
                                                    setDartmentvalue(departmentlist);
                                                    setUpdatedata(departmentlist);
                                                    setFiltetuploaddata((preData) => ({
                                                        ...preData,
                                                        departmentName: departmentlist,

                                                    }))

                                                }} className="search-item" key={index4}>
                                                    <p >{departmentlist}</p>
                                                </div>
                                            ))
                                        )
                                    ) : null}
                                </div>)}
                            </div>

                            <div className="leftfilter-select-item inputQuestinBox-in">
                                <select onChange={handlechange} value={filtetuploaddata.educationLavel} name="educationLavel" id="dptnameselect" required >
                                    <option value="" readOnly={singletap ? true : false}>Select Education Level</option>
                                    <option value="ug">Under Graduation(UG)</option>
                                    <option value="pg">Post Graduation(PG)</option>
                                </select>

                            </div>

                            <div className="leftfilter-select-item inputQuestinBox-in">
                                <input onChange={handlechange} value={filtetuploaddata.session || ''} type="number" name='session' placeholder=" Session (2024)" required pattern="[0-9]{4}" />

                            </div>

                            <div className="leftfilter-select-item inputQuestinBox-in">
                                <select onChange={handlechange} value={filtetuploaddata.dptyear} name="dptyear" id="dptyear" required >
                                    <option value="">Choose Semester</option>
                                    <option value="1stsem">1st sem</option>
                                    <option value="2ndsem">2nd sem</option>
                                    <option value="3rdsem">3rd sem</option>
                                    <option value="4thsem">4th sem</option>
                                    <option value="5thsem">5th sem</option>
                                    <option value="6thsem">6th sem</option>
                                    <option value="7thsem">7th sem</option>
                                    <option value="8thsem">8th sem</option>
                                </select>

                            </div>


                            <div className="leftfilter-select-item inputQuestinBox-in">
                                <select onChange={handlechange} value={filtetuploaddata.semormid} name="semormid" id="semormid" required >
                                    <option value="">Select Exam type</option>
                                    <option value="midSem">Mid Semester</option>
                                    <option value="sem">Semester</option>
                                </select>

                            </div>

                            <div className="leftfilter-select-item inputQuestinBox-in">
                                <input onChange={handlechange} value={filtetuploaddata.paperName} type="text" name='paperName' placeholder=" Paper Name (Core-1)" required />

                                {showSuggestionspaper && (<div ref={paperboxhide} className="search-suggestion">
                                    {filtetuploaddata.paperName ? (
                                        subjectlist && subjectlist.filter((item) => {
                                            const data = item.toLowerCase();
                                            const searchTerm = filtetuploaddata.paperName.toLowerCase();
                                            return data.startsWith(searchTerm);
                                        }).length === 0 ? (
                                            <div className="search-item">
                                                <p>No paper type available</p>
                                            </div>
                                        ) : (
                                            subjectlist.filter((item) => {
                                                const data = item.toLowerCase();
                                                const searchTerm = filtetuploaddata.paperName.toLowerCase();
                                                return data.startsWith(searchTerm) && data !== searchTerm;
                                            }).map((subjectlist, index5) => (
                                                <div onClick={(e) => {
                                                    setFiltetuploaddata((preData) => ({
                                                        ...preData,
                                                        paperName: subjectlist,

                                                    }))

                                                }} className="search-item" key={index5}>
                                                    <p >{subjectlist}</p>
                                                </div>
                                            ))
                                        )
                                    ) : null}
                                </div>)}

                            </div>
                            <div className="subject-select">
                                <div className="subject-select-each">

                                    <p onClick={(e) => {

                                        handlesubjet(e);
                                        setHonors(!honors);
                                        setElective(false);
                                        setCompulsory(false);
                                        setEandv(false);

                                    }} className={`${honors ? 'ok' : 'no'}`}>Honors</p>
                                </div>
                                <div className="subject-select-each">
                                    <p onClick={(e) => {
                                        setElective(!elective);
                                        handlesubjet(e);
                                        setCompulsory(false);
                                        setEandv(false);
                                        setHonors(false);

                                    }}
                                        className={`${elective ? 'ok' : 'no'}`}>Elective</p>

                                </div>
                                <div className="subject-select-each">
                                    <p onClick={(e) => {
                                        setCompulsory(!Compulsory);
                                        handlesubjet(e);
                                        setEandv(false);
                                        setHonors(false);
                                        setElective(false);

                                    }} className={`${Compulsory ? 'ok' : 'no'}`}>Compulsory</p>

                                </div>
                                <div className="subject-select-each">
                                    <p onClick={
                                        (e) => {
                                            setEandv(!eandv);
                                            handlesubjet(e);
                                            setCompulsory(false);
                                            setHonors(false);
                                            setElective(false);

                                        }

                                    } className={`${eandv ? 'ok' : 'no'}`}>E&V</p>

                                </div>
                                <div className="clear-input-btn-box">
                                    <input type="radio" checked={clearall} id='clear-input-box' onClick={handleinputclear} readOnly/>
                                    <label htmlFor="clear-input-box">Save Inputs </label>
                                </div>

                            </div>

                        </div>
                            
                        <div className="AUploadusubmit">
                       
                            <button onClick={() => {
                                setDartmentvalue('');
                                setFiltetuploaddata({
                                    departmentName: '',
                                    educationLavel: '',
                                    session: '',
                                    dptyear: '',
                                    semormid: '',
                                    paperName: '',
                                    studentyear: ''
                                });
                                setSingletap(false);
                                showAlart('Cleard', '', 'check')
                            }}>Reset All</button>
                            <button type='submit'>Upload</button>
                        </div>


                    </div>
                </form>
                <h3 style={{ margin: '1rem 0rem', display: 'flex', padding: '0.8rem 1rem', backgroundColor: 'rgb(1 69 110)', color: '#fff', borderRadius: '0.2rem', justifyContent: 'space-between', userSelect: 'none' }}>Total Quesitons <span style={{ color: '#fff', borderRadius: '50%' }}>{fetchData && fetchData.length}</span></h3>
                <hr style={{ margin: '0rem 0rem 0.5rem' }} />
                <div className="fetchBox">

                    {fetchData.length > 0 ? (
                        fetchData.map((fetchData) => (
                            <li key={fetchData.id}>
                                <div className="pdf-link-flex-box">
                                    <i className="fa-solid fa-file-pdf" style={{ padding: '0rem 1rem', fontSize: '1.3rem', color: '#ce0d0d' }}></i> <a href={fetchData.url} download target='__blank'>{fetchData.title}</a></div> {varified ? (
                                        deletingurl === fetchData.url ? (
                                            <div className='delete-process'></div>
                                        ) : (
                                            <Trash2 size={20} stroke='red' onClick={() => deletepdfhandle(fetchData.id, fetchData.url)} />
                                        )
                                    ) : null}
                            </li>
                        ))
                    ) : (
                        <p>No papers found</p>
                    )}
                </div>

            </aside>

        </>
    )
}

export default Question
