import React, { useContext, useEffect, useRef, useState } from 'react'
import './UploadSection.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { AlartContectValue } from '../../../Context/AlartContext/AlartContext';


const UploadSection = (props) => {

  const {showAlart} = useContext(AlartContectValue);
  const fileInputRef = useRef();
  const [selectedFile,setSelectedFile] = useState(null);
  const falsepdffinalref = useRef();
  const [falsepdffinal,setFalsepdffinal]= useState(false);
  const [previewdata,setPreviewdata] = useState([]);
  const [singletap,setSingletap]  = useState(false);
  const[message,setMessage] = useState('');

const [uploadProgress, setUploadProgress] = useState(0);
  const blockref = useRef();
const location = useLocation();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));
  
    if (validFiles.length > 0) {
      const fileData = validFiles.map((file) => {
        const preview = file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null;
        return { file, preview };
      });
  
      setPreviewdata(fileData); // Set previews for display
      setSelectedFile(validFiles); // Save the files for upload
      setFalsepdffinal(true);
    } else {
      setMessage("Failed: Please select valid files (PDF, JPEG, PNG)");
      
      setPreviewdata([]); // Clear previous previews
      setSelectedFile(null);
      setFalsepdffinal(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  

  useEffect(()=>{ 
    if(falsepdffinal){
      document.body.style.overflowY = "hidden";
      blockref.current.style.bottom = '0%'
      
    }
    else{
      document.body.style.overflowY = "scroll";
      blockref.current.style.bottom = '-100%'

    }
  },[falsepdffinal])







  useEffect(()=>{
    if(selectedFile){
      falsepdffinalref.current.style.bottom = '0%';
    }

  },[selectedFile])


  // const handleUpload = () => {
  //   if (selectedFile) {
     

  //     const renamedFile = new File([selectedFile], { type: selectedFile.type });

  //     return renamedFile;
  //   }
  //   return null;
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setSingletap(true);

    if (selectedFile && selectedFile.length > 0) {
      const formData = new FormData();


      
      selectedFile.forEach((file) => {
        formData.append("files", file); // Append each file to FormData
      });
  
      try {
        const response = await axios.post("/api/Profile/upload/non-user", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentage);
          },
        });
  
        if (response.status === 200) {
          setUploadProgress(0);
          setMessage(<p style={{color : 'green'}}>Files uploaded successfully</p>);
          setPreviewdata([]);
          setSelectedFile(null);
          setSingletap(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
           showAlart('Successfully send', '', 'check');
            falsepdffinalref.current.style.bottom = '-100%';
            setMessage('');
         
          setFalsepdffinal(false);
      
        } else {
          setMessage(<p style={{color : 'red'}}>Error: Failed to upload files</p>);
           showAlart('Error: Failed to upload files', '', 'cancel');
            setMessage('')
          setSingletap(false);
        }
      } catch (error) {
        console.error("Error uploading files:", error);
         showAlart('Error uploading files:', '', 'cancel');
        setMessage('')

        setMessage(<p style={{color : 'red'}}>Error: Failed to upload files</p>);
        setSingletap(false);
      }
    } else {
      setMessage(<p style={{color : 'red'}} >No files selected for upload</p>);

      setSingletap(false);
      setMessage('');
    }
  };
  


  return (
    <aside id='upload-section'>
      <div className="left-upload-section">
      <h3>Have you any Questions Papers? <br /> Share it with us—it only takes a moment!</h3>       
     
      </div>
      <div className="right-upload-section">
        <h4>Send Us!</h4>
        <input type="file" name= 'Qupload' accept='application/pdf,image/jpeg,image/png' className='active'  multiple  onChange={handleFileChange} ref={fileInputRef} disabled={falsepdffinal}/>

        {singletap && (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' ,gap : '2rem', margin : '2rem 0 1rem 0'}}>
          <span style={{ marginTop: '1rem', fontSize: '1.2rem', color: '#333' }}>
          {uploadProgress}%
        </span>
        <meter value={uploadProgress} min="0" max="100" style={{width : '100%'}}></meter>
        
      </div>)}
        
        <article>Click the button  to send Question papers. Every bit counts.</article>
      </div>
      <form  onSubmit={handleSubmit}>
     <aside className='papers-submit' ref={falsepdffinalref}>
      <div className="papers-head-submit"><h1>Final Step</h1> <i className="fa-solid fa-xmark" style={{ cursor: 'pointer' }} onClick={()=>
      {  
        falsepdffinalref.current.style.bottom = '-100%';
        setSelectedFile(null);
        setFalsepdffinal(false)
      }
        } ></i></div>
        
     
      <div className="file-item-box">
       {previewdata.map(({ file, preview }, index) => (
            <div key={index} className="file-item">
                {preview && <img src={preview} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />}
                <p><strong>File Name:</strong> {file.name}</p>
                <p><strong>File Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
                {/* <p><strong>File Type:</strong> {file.type}</p> */}
            </div>
        ))}
        </div>
      <div className=' final-submit-btn' style={{ width : '100%', display : 'flex', flexDirection : 'column',gap : '0.9rem',justifyContent : 'center', alignItems : 'center'}}>
        {message}
       { !singletap ? ( <button  type='submit' style={ singletap ? {opacity : 0.5} : {}} disabled = {singletap}>Send</button>) : 
       (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%' }}>
        <span style={{ marginBottom: '0.3rem', fontSize: '1.2rem', color: '#333' }}>
          {uploadProgress}%
        </span>
        <meter value={uploadProgress} min="0" max="100"></meter>
      </div>
       )}
        </div>
     </aside>
     <div className="block" ref={blockref} >

     </div>
     </form>

    </aside>
  )
}

export default UploadSection
