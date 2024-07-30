import React from "react";
import "./Profile.css";
import{ useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";





const Profile = (props) => {
  
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);


 
  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
 
  }, []);



  useEffect(() => {
    let fetchFiles = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get('/api/Profile');
        setUploadedFiles(response);
      } catch (error) {
        console.error('Error fetching files:', error);
        setUploadedFiles([]);
      }
    };

  fetchFiles();
  }, []);
  

  const handleFileChange = async (e)=>{
    const file = e.target.files[0];
    if(file && file.type === 'application/pdf'){
      setSelectedFile(file);
    
    }else{
      setMessage('Please select a valid PDF file');
      props.showAlart('Failed','Please select a pdf file');
      setSelectedFile(null);
    }
  };

    const handleSubmit = async (e)=>{
    e.preventDefault();
    if(selectedFile){
      console.log('selected file',selectedFile);

      const formData = new FormData();
      formData.append('file', selectedFile);
        
      try {
         const response =  axios.post('/api/Profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
      
        });
        if(response){
        setMessage('Upload successful');
        props.showAlart('Upload successfull');
        setSelectedFile(null);

        }

        
       
        
      } catch (error) {
        console.error('Error uploading file:', error);
        setMessage('Failed to upload the file.');
        props.showAlert('Error', 'Failed to upload the file.');
        
      }
     
      // incrementPdfCount();
   
      
    }else{
      console.log('No file selected or invalid file type')
      props.showAlart('Error', 'Please select  file')
      return;
    };

   

  
  };

  if (!user) {
    return <div style={{position : 'absolute', left : '0', top : '0px',display : 'flex',flexDirection: 'column', alignItems : 'center ', justifyContent : 'center',fontSize : '2rem',height : '100vh' , width : '100%'}}>Oops..Log In fast<Link style = {{color : 'blue',textDecoration : 'underline'}} to="/LogIn">Click here </Link></div>;
  };




  return (
    <section id="profile">
      <div className="profile-outer-box">
        <div className="profile-left-inner-box">
          <div className="profile-info">
            <div className="upperstyle"></div>
            <div className="profile-photoes">
              <div className="profile-main-photo-box">
                <h2>{user.firstname} {user.lastname}</h2>
                <h3>
                  <i className="fa-solid fa-location-dot"></i>MPC AUTO, BARIPADA
                </h3>
                <div className="profile-main-photo">
                  <div className="profile-main-photo-subpart"></div>
                </div>
              </div>
              <div className="profile-downupload-info">
                <div className="download downupload">
                  <h5>6</h5>
                  <h4>Total Download</h4>
                </div>
                <div className="Upload downupload">
                  <h5>54</h5>
                  <h4>Total Uploads</h4>
                </div>
              </div>
              <div className="pdfupload" >
              
                <form action="/api/Prifile" onSubmit={handleSubmit}>
                
                <button  type="file" style={{position : 'relative'}} >
                  Select file
                  <input type="file" multiple accept="application/pdf" onChange={handleFileChange}   style={{position : 'absolute', top : '0', left : '0',width : "100%", height : '100%',opacity : '0',}}/>
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
                </button>
                <button type="submit">Send File</button>
                </form>
              </div>
              <p
                style={{
                  textAlign: "center",
                  paddingTop: "1.2rem",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1rem",
                  fontWeight: "800",
                }}
              >
                ACHE SE PADHO, BACK MAT LAGNE DENA
              </p>
            </div>
            <div className="recent-work profilecontain">
              <h3>Recent work</h3>
              <div className="recent-work-box">
                <div className="recent-download recent">
                {uploadedFiles.length > 0 ? (
                    <ul>
                      {uploadedFiles.map((file) => (
                        <li key={file.id}>
                          <a href={`/${file.filepath}`} target="_blank" rel="noopener noreferrer">{file.filename}</a>
                        </li>
                      ))}
                        </ul>
                      ) : (
                        <p>No files uploaded yet.</p>
                      )}
                </div>
                <div className="recent-upload recent"></div>
              </div>
            </div>
            <div className="profile-client-info profilecontain">
              <h3>Personal Information</h3>
              <div className="forwrap">
                <div className="client-info-name name">
                  <h4>Name</h4>
                  <div className="client-info-name-inside name-insde">
                    <p>{user.firstname} {user.lastname}</p>
                    <h5>
                      Name<i className="fa-solid fa-arrow-right"></i>
                    </h5>
                  </div>
                </div>
                <div className="client-info-name departmentprofile">
                  <h4>Department</h4>
                  <div className="client-info-name-inside name-insde">
                    <p>Computer Science</p>
                    <h5>
                      Department<i className="fa-solid fa-arrow-right"></i>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="forwrap">
                <div className="client-info-name gmail">
                  <h4>Gmail</h4>
                  <div className="client-info-name-inside name-insde">
                    <p>{user.gmail}</p>
                    <h5>
                      Gmail<i className="fa-solid fa-arrow-right"></i>
                    </h5>
                  </div>
                </div>
                <div className="client-info-name rollno">
                  <h4> Roll No</h4>
                  <div className="client-info-name-inside name-insde">
                    <p>{user.rollno}</p>
                    <h5>
                      Roll No<i className="fa-solid fa-arrow-right"></i>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="edit">
                
                <button>
                  Edit profile<i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-right-inner-box">
              <div className="latest-updates">
                <h2>Latest Updates</h2>
                <div className="latest-updates-files">
                  <div className="latest-updates-files-text">
                  <i className="fa-solid fa-square-pen"></i>
                  <h3>Now available</h3>
                  </div>
                 
                  <div className="files-items">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in.🍫
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in.🍫
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in🍫.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in🍫.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in🍫.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in🍫.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in🍫.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in🍫.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in🍫.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in🍫.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in🍫.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in🍫.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in🍫.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in🍫.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid officia in🍫.
                    </p>
                  </div>
                </div>
            
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default Profile;
