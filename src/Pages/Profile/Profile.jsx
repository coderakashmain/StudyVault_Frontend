import React, { useContext, useRef } from "react";
import "./Profile.css";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";





const Profile = (props) => {

  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true)

  const fileInputRef = useRef(null);

  const [filtetuploaddata, setFiltetuploaddata] = useState(
    {
      departmentName: '',
      educationLavel: '',
      session: '',
      dptyear: '',
      semormid: '',
      paperName: ''

    }
  );

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFiltetuploaddata((preData) => ({
      ...preData,
      [name]: value,

    }))
  }
  const handleClose = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFiltetuploaddata('');
  }

  useEffect(() => {

    const fetchProfile = async () => {
      try {
          const response = await axios.get('/api/profile', { withCredentials: true });
          if(response.status === 200){

            setUser(response.data.user);
          }
      } catch (error) {
          console.error('Error fetching profile', error.response.data);
      }finally {
        setLoading(false);
    }
     
  };
  fetchProfile();
  

  }, []);
  if (loading) {
    return <p>Loading...</p>;

}

 
  if (!user) {
    return <div style={{ position: 'absolute', left: '0', top: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center ', justifyContent: 'center', fontSize: '2rem', height: '100vh', width: '100%' }}><box-icon name='log-in' size="cssSize" style={{ fontSize: '10rem', position: 'relative', left: '-2%' }}></box-icon>Oops. Login Fast<Link style={{ color: 'blue', textDecoration: 'underline', fontSize: '01.4rem' }} to="/LogIn">Click here </Link></div>;
  };




  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf,image/jpeg') {
      setSelectedFile(file);

    } else {
      props.showAlart('Failed', 'Please select a pdf file');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };


  const handleUpload = () => {
    if (selectedFile) {
      const newFileName = `${filtetuploaddata.departmentName}_${filtetuploaddata.paperName}_${filtetuploaddata.session}_${filtetuploaddata.dptyear}_${filtetuploaddata.semormid}_${filtetuploaddata.paperName}.pdf`;

      const renamedFile = new File([selectedFile], newFileName, { type: selectedFile.type });

      return renamedFile;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileToUpload = handleUpload();
    if (fileToUpload) {
      console.log('selected file', fileToUpload);

      const formData = new FormData();
      formData.append('file', fileToUpload);

      formData.append('filtetuploaddata', JSON.stringify(filtetuploaddata));

      try {
        const response = axios.post('/api/Profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },

        });
        if (response) {

          props.showAlart(' successfully send');
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          setFiltetuploaddata('');






        }

      } catch (error) {
        console.error('Error uploading file:', error);
        props.showAlert('Error', 'Failed to upload the file.');

      }

    } else {
      console.log('No file selected or invalid file type')
      props.showAlart('Error', 'Please select  file')
      return;
    };

  };





  return (
    <section id="profile">
      <div className="profile-outer-box">
        <div className="profile-left-inner-box">
          <div className="profile-info">
            <div className="upperstyle"></div>
            <div className="profile-photoes">
              <div className="profile-main-photo-box">
                {/* <h2>Profile</h2> */}
                <h3>
                  <i className="fa-solid fa-location-dot"></i>MPC AUTO, BARIPADA
                </h3>
                <div className="profile-main-photo">
                  <div className="profile-main-photo-subpart"></div>
                </div>
              </div>
              <div className="profile-downupload-info">
                <h4> {user.firstname} {user.lastname}</h4>
             
                <hr />
                {/* <div className="download downupload">
                  <h5>6</h5>
                  <h4>Total Download</h4>
                </div>
                <div className="Upload downupload">
                  <h5>54</h5>
                  <h4>Total Uploads</h4>
                </div> */}
              </div>
              <div className="pdfupload" >

                <form action="/api/Prifile" onSubmit={handleSubmit}>



                  <input type="file" accept="application/pdf,image/jpeg" onChange={handleFileChange} ref={fileInputRef} />

                  {selectedFile && (
                    <div className="filterselect">
                      <div className="filterselect-option">
                        <i onClick={handleClose} className="fa-solid fa-xmark"></i>
                        <div className="filterselct-option-box">
                          <div className="leftfilter-select">
                            <p>*</p>
                            <div className="leftfilter-select-item">
                              <input onChange={handlechange} value={filtetuploaddata.departmentName} type="text" name='departmentName' placeholder=" Department Name" required />

                            </div>
                            <p>*</p>
                            <div className="leftfilter-select-item">
                              <select onChange={handlechange} value={filtetuploaddata.educationLavel} name="educationLavel" id="dptnameselect" required >
                                <option value="">Select Education Level</option>
                                <option value="Ug">Under Graduation(UG)</option>
                                <option value="Pg">Post Graduation(PG)</option>
                              </select>

                            </div>


                            <p>*</p>
                            <div className="leftfilter-select-item">
                              <input onChange={handlechange} value={filtetuploaddata.session} type="number" name='session' placeholder=" Session (2024)" required pattern="[0-9]{4}" />

                            </div>

                            <p>*</p>
                            <div className="leftfilter-select-item">
                              <select onChange={handlechange} value={filtetuploaddata.dptyear} name="dptyear" id="dptyear" required>
                                <option value="">Choose Semester</option>
                                <option value="1stsem">1st sem</option>
                                <option value="2ndsem">2nd sem</option>
                                <option value="3rdsem">3rd sem</option>
                                <option value="4thsem">4th sem</option>
                                <option value="5stsem">5th sem</option>
                                <option value="6ndsem">6th sem</option>
                                <option value="7rdsem">7th sem</option>
                                <option value="8thsem">8th sem</option>
                              </select>

                            </div>
                            <p>*</p>
                            <div className="leftfilter-select-item">
                              <select onChange={handlechange} value={filtetuploaddata.semormid} name="semormid" id="semormid" required>
                                <option value="">Select Exam type</option>
                                <option value="midsem">Mid Semester</option>
                                <option value="sem">Semester</option>
                              </select>

                            </div>
                            <p>*</p>
                            <div className="leftfilter-select-item">
                              <input onChange={handlechange} value={filtetuploaddata.paperName} type="text" name='paperName' placeholder=" Paper Name (Core-1)" required />

                            </div>

                          </div>
                          <div className="rightfilter-select">
                            <div className="right-file-box">
                              <h3>Selected File </h3>
                              {<ul>
                                <li>{selectedFile.name} <i className="fa-solid fa-check"></i></li>
                              </ul>}
                            </div>
                            <div className="right-file-logo-box">
                              <i className="fa-solid fa-photo-film"></i>

                              <h2>Thank You for your Contribution 😊</h2>
                            </div>

                          </div>
                        </div>
                        <button type="submit">Send File</button>
                      </div>

                    </div>
                  )}


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
