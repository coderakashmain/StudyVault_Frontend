import React, { useRef, useState, useEffect, useContext } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import axios from "axios";
import profilelogo from '../../photo/avatar.jpg'
import profilelogow from '../../photo/avatar.webp'
import profilelogoa from '../../photo/avatar.avif'
import Compressor from "compressorjs";
import { Userlogincheckcontext } from "../../Context/UserLoginContext/UserLoginContext";
import { AlartContectValue } from "../../Context/AlartContext/AlartContext";





const Profile = (props) => {
const {showAlart} = useContext(AlartContectValue);
  const [pdfetchfile, setpdfetchfile] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [singletap, setSingletap] = useState(false);
  // const [driveUrl,setdriveUrl] = useState('');
  const [renameFileback, setrenameFileback] = useState('');
  const [isActive, setIsActive] = useState(false);
  const fileInputRef = useRef(null);
  const {setLoginCheck} = useContext(Userlogincheckcontext);



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
        const response = await axios.get('/api/Profile', { withCredentials: true });
        if (response.status === 200) {

          setUser(response.data.user);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          
          console.error('Error fetching profile');
          
          
        }
        setLoginCheck(null);
      } finally {
        setLoading(false);
      }

    };
    fetchProfile();


  }, []);



  useEffect(() => {
    const handlepdffetch = async () => {

      try {
        const userid = user.id;


        const response = await axios.get('/api/Profile/fetchpdf', { params: { userid }, withCredentials: true });

        if (response.status === 200) {
          setpdfetchfile(response.data);
        }
        else {
           showAlart('something error', '', 'cancel');
        }
      }

      catch (error) {

        if (error.response && error.response.status === 400) {
           showAlart('Not send yet', '', 'mark')
        }
      }

    };
    handlepdffetch();
  }, [singletap, user]);




  if (loading) {
    return <p style={{ margin: "100px 0 0 50px" }}>Loading...</p>;

  }


  if (!user) {
    return <div style={{ position: 'absolute', left: '0', top: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center ', justifyContent: 'center', fontSize: '2rem', height: '100vh', width: '100%' }}><i style={{ fontSize: '4rem' }} className="fa-regular fa-face-frown"></i>Oops. Login Fast<Link style={{ color: 'blue', fontSize: '01.4rem' }} to="/LogIn">LogIn </Link></div>;
  };






  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);

    } else {
       showAlart('Failed', 'Please select a pdf file', 'cancel');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handlerenamed = (newFileName) => {
    setrenameFileback(newFileName)
  }

  const handleUpload = () => {
    if (selectedFile) {
      const newFileName = `${filtetuploaddata.departmentName}_${filtetuploaddata.paperName}_${filtetuploaddata.session}_${filtetuploaddata.dptyear}_${filtetuploaddata.semormid}_${filtetuploaddata.paperName}.pdf`;
      handlerenamed(newFileName);
      const renamedFile = new File([selectedFile], newFileName, { type: selectedFile.type });

      return renamedFile;
    }
    return null;
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    setSingletap(true);


    const fileToUpload = handleUpload();


    if (fileToUpload) {


      const formData = new FormData();
      formData.append('file', fileToUpload);
      formData.append('renameFileback', fileToUpload.name);

      formData.append('userid', user.id);

      formData.append('filtetuploaddata', JSON.stringify(filtetuploaddata));


      try {
        const response = await axios.post('/api/Profile/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },

        });

        if (response.status === 200) {
          
          
          setrenameFileback('');

          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
           showAlart(' Successfully send', '', 'check')
          setFiltetuploaddata('');
          setSingletap(false);
        }
        else {
          setSingletap(false);
           showAlart('External error', '', 'cancel')

        }

      } catch (error) {
        console.error('Error uploading file:', error);
         showAlart('Error', 'Failed to upload the file.', 'cancel');
        setSingletap(false);
      }

    } else {

       showAlart('Error', 'Please select  file', 'cancel')
      setSingletap(false);
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
                  <div className="profile-main-photo-img-box">
                    <picture>
                      <img src={ profilelogo}  alt="profile photo" />
                      <source srcSet={profilelogoa}  type="image/avif" />
                      <source srcSet={profilelogow}type="image/webp" />

                    </picture>

                  </div>
               
                  <div className="profile-main-photo-subpart" >
                  </div>

                </div>
              </div>
              <div className="profile-downupload-info">
                <h4> {user.firstname && (<span>{user.firstname}</span>)} {user.lastname && (<span>{user.lastname}</span>)}</h4>

                <hr />
              </div>
              <div className="pdfupload" >

                <form onSubmit={handleSubmit}>



                  <input type="file" accept="application/pdf,image/jpeg" onChange={handleFileChange} ref={fileInputRef} />

                  {selectedFile && (
                    <div className="filterselect">
                      <div className="filterselect-option">
                        <i onClick={handleClose} className="fa-solid fa-xmark"></i>
                        <div className="filterselct-option-box">
                          <div className="leftfilter-select">
                            <h2 ><b></b>PLEASE PROVIDE US FULL INFORMATION ABOUT PAPER*</h2>
                            <p>*</p>
                            <div className="leftfilter-select-item">
                              <input onChange={handlechange} value={filtetuploaddata.departmentName} type="text" name='departmentName' placeholder=" Department Name" required readOnly={singletap ? true : false} />

                            </div>
                            <p>*</p>
                            <div className="leftfilter-select-item">
                              <select onChange={handlechange} value={filtetuploaddata.educationLavel} name="educationLavel" id="dptnameselect" required readOnly={singletap ? true : false} >
                                <option value="" readOnly={singletap ? true : false} >Select Education Level</option>
                                <option value="Ug">Under Graduation(UG)</option>
                                <option value="Pg">Post Graduation(PG)</option>
                              </select>

                            </div>


                            <p>*</p>
                            <div className="leftfilter-select-item">
                              <input onChange={handlechange} value={filtetuploaddata.session || ''} type="number" name='session' placeholder=" Session (2024)" required pattern="[0-9]{4}" readOnly={singletap ? true : false} />

                            </div>

                            <p>*</p>
                            <div className="leftfilter-select-item">
                              <select onChange={handlechange} value={filtetuploaddata.dptyear} name="dptyear" id="dptyear" required readOnly={singletap ? true : false}>
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
                              <select onChange={handlechange} value={filtetuploaddata.semormid} name="semormid" id="semormid" required readOnly={singletap ? true : false}>
                                <option value="">Select Exam type</option>
                                <option value="midsem">Mid Semester</option>
                                <option value="sem">Semester</option>
                              </select>

                            </div>
                            <p>*</p>
                            <div className="leftfilter-select-item">
                              <input onChange={handlechange} value={filtetuploaddata.paperName} type="text" name='paperName' placeholder=" Paper Name (Core-1)" required readOnly={singletap ? true : false} />

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
                              <i className="fa-regular fa-face-grin-hearts"></i>

                              <h2>Thank You for your Contribution 😊</h2>
                            </div>

                          </div>
                        </div>
                        <button disabled={singletap} style={{ background: ` ${singletap ? 'lightblue' : 'blue'}` }} type="submit">Send File</button>
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
              <h3>Papers Send({pdfetchfile.length})</h3>
              <div className="recent-work-box">
                <div className="recent-download recent">

                  {pdfetchfile.length > 0 ? (
                    pdfetchfile.map((pdfetchfile) => (
                      <li key={pdfetchfile.id}>
                        * <a href={pdfetchfile.paperlink} download target='__blank'>{pdfetchfile.papername}<i className="fa-solid fa-file-pdf" style={{ padding: '0rem 0rem 0rem 0.2rem', fontSize: '1.3rem', color: '#ce0d0d' }}></i></a>
                      </li>
                    ))
                  ) : (
                    <p>No papers Uploaded</p>
                  )}
                </div>
                <h3>You Downloaded</h3>
                <div className="recent-upload recent">
                  Update soon...

                </div>
              </div>
            </div>
            <div className="profile-client-info ">
              <h3 onClick={() => setIsActive(!isActive)}><i className={`fa-solid fa-sort-down ${isActive ? '' : 'shut-right'}`}></i>Personal Information</h3>
              <div className={`forwrap-out ${isActive ? 'info-true' : 'info-false'}`}>
                <div className="forwrap">
                  <div className="client-info-name name">
                    <h4>Name</h4>
                    <div className="client-info-name-inside name-insde">
                      <p>{user.firstname && (<span>{user.firstname}</span>)} {user.lastname && (<span>{user.lastname}</span>)}</p>
                      <h5>
                        Name<i className="fa-solid fa-arrow-right"></i>
                      </h5>
                    </div>
                  </div>
                  <div className="client-info-name departmentprofile">
                    <h4>Department</h4>
                    <div className="client-info-name-inside name-insde">
                      <p></p>
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
                      <p>{user.gmail && (<span>{user.gmail}</span>)}</p>
                      <h5>
                        Gmail<i className="fa-solid fa-arrow-right"></i>
                      </h5>
                    </div>
                  </div>
                  <div className="client-info-name rollno">
                    <h4> Roll No</h4>
                    <div className="client-info-name-inside name-insde">
                      <p>{user.rollno && (<span>{user.rollno}</span>)}</p>
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
                  Update Soon....
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
