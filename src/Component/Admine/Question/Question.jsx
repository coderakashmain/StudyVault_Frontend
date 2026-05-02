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
    const VITE_API_URL = import.meta.env.VITE_API_URL || '/api';
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
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

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
            const response = await axios.post(`${VITE_API_URL}/Admin/upload`, formData, {
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
                const response = await axios.get(`${VITE_API_URL}/admin/fetchData`, { withCredentials: true });
                if (response.status === 200) {
                    setFetchData(response.data);
                    setPaperList(response.data);
                    setCurrentPage(1); // reset to first page on fresh load
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


                await axios.post(`${VITE_API_URL}/admin/deletepdf`,
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
            await axios.post(`${VITE_API_URL}/admin/request-delete`);
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
            const response = await axios.post(`${VITE_API_URL}/admin/delete/verify-otp`, {

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
                {/* ── Total + Search ── */}
                <div style={{ margin: '1.2rem 0 0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06rem' }}>Total Questions</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, background: '#e0f7fa', color: '#009bb7', padding: '0.15rem 0.55rem', borderRadius: '99px' }}>{fetchData.length}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {/* Per-page selector */}
                    <select
                      value={itemsPerPage}
                      onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                      style={{
                        fontSize: '0.72rem', border: '1px solid #e2e8f0', borderRadius: '6px',
                        padding: '0.38rem 0.6rem', background: '#f8fafc', color: '#475569',
                        fontFamily: 'Inter, sans-serif', outline: 'none', cursor: 'pointer'
                      }}
                    >
                      {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n} / page</option>)}
                    </select>
                    {/* Search */}
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{ position: 'absolute', left: '0.6rem', width: 13, height: 13, color: '#94a3b8', pointerEvents: 'none' }}>
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      <input
                        type="text"
                        placeholder="Search papers…"
                        value={searchQuery}
                        onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        style={{
                          paddingLeft: '1.8rem', paddingRight: searchQuery ? '1.6rem' : '0.7rem',
                          paddingTop: '0.4rem', paddingBottom: '0.4rem',
                          fontSize: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '7px',
                          background: '#f8fafc', color: '#0f172a', outline: 'none',
                          fontFamily: 'Inter, sans-serif', width: '200px', transition: 'border-color 0.2s, box-shadow 0.2s'
                        }}
                        onFocus={e => { e.target.style.borderColor = '#009bb7'; e.target.style.boxShadow = '0 0 0 3px rgba(0,155,183,0.1)'; }}
                        onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                      />
                      {searchQuery && (
                        <button onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                          style={{ position: 'absolute', right: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: 0, fontSize: '1rem', lineHeight: 1 }}
                        >×</button>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Paginated List ── */}
                {(() => {
                  const filtered = fetchData.filter(d =>
                    String(d.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                    String(d.departmentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                    String(d.years || '').toLowerCase().includes(searchQuery.toLowerCase())
                  );
                  const totalPages = Math.ceil(filtered.length / itemsPerPage);
                  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

                  return (
                    <>
                      <div className="fetchBox">
                        {paginated.length > 0 ? (
                          paginated.map((item) => (
                            <li key={item.id}>
                              <div className="pdf-link-flex-box">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                  style={{ width: 14, height: 14, marginRight: '0.5rem', flexShrink: 0 }}>
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                                </svg>
                                <a href={item.url} download target="__blank" style={{ color: '#0f172a', textDecoration: 'none', fontSize: '0.73rem' }}
                                  onMouseOver={e => e.target.style.color = '#009bb7'}
                                  onMouseOut={e => e.target.style.color = '#0f172a'}>
                                  {item.title}
                                </a>
                              </div>
                              {varified ? (
                                deletingurl === item.url ? (
                                  <div className='delete-process'></div>
                                ) : (
                                  <Trash2 size={14} stroke='#ef4444' style={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => deletepdfhandle(item.id, item.url)} />
                                )
                              ) : null}
                            </li>
                          ))
                        ) : (
                          <li style={{ justifyContent: 'center', color: '#94a3b8', padding: '1.5rem' }}>
                            {searchQuery ? `No results for "${searchQuery}"` : 'No papers found'}
                          </li>
                        )}
                      </div>

                      {/* ── Pagination ── */}
                      {totalPages > 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                          <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                            Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}
                          </span>
                          <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                            {/* Prev */}
                            <button
                              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                              disabled={currentPage === 1}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '0.2rem',
                                padding: '0.3rem 0.65rem', fontSize: '0.72rem', fontFamily: 'Inter, sans-serif',
                                border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer',
                                background: currentPage === 1 ? '#f8fafc' : '#fff',
                                color: currentPage === 1 ? '#cbd5e1' : '#475569',
                                transition: 'all 0.15s'
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}><polyline points="15 18 9 12 15 6"/></svg>
                              Prev
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                              .reduce((acc, p, idx, arr) => {
                                if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
                                acc.push(p);
                                return acc;
                              }, [])
                              .map((p, idx) =>
                                p === '...' ? (
                                  <span key={`e${idx}`} style={{ fontSize: '0.72rem', color: '#cbd5e1', padding: '0 0.2rem' }}>…</span>
                                ) : (
                                  <button key={p}
                                    onClick={() => setCurrentPage(p)}
                                    style={{
                                      width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      fontSize: '0.72rem', fontFamily: 'Inter, sans-serif', fontWeight: p === currentPage ? 600 : 400,
                                      border: '1px solid', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.15s',
                                      borderColor: p === currentPage ? '#009bb7' : '#e2e8f0',
                                      background: p === currentPage ? '#e0f7fa' : '#fff',
                                      color: p === currentPage ? '#009bb7' : '#475569',
                                    }}
                                  >{p}</button>
                                )
                              )
                            }

                            {/* Next */}
                            <button
                              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                              disabled={currentPage === totalPages}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '0.2rem',
                                padding: '0.3rem 0.65rem', fontSize: '0.72rem', fontFamily: 'Inter, sans-serif',
                                border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer',
                                background: currentPage === totalPages ? '#f8fafc' : '#fff',
                                color: currentPage === totalPages ? '#cbd5e1' : '#475569',
                                transition: 'all 0.15s'
                              }}
                            >
                              Next
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}><polyline points="9 18 15 12 9 6"/></svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}

            </aside>

        </>
    )
}

export default Question
