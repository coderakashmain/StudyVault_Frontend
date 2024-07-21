import React from "react";
import "./Profile.css";
import{ useEffect, useState } from 'react';



const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);
  if (!user) {
    return <div>Loading...</div>;
  }

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
                  <h5>54</h5>
                  <h4>Total Download</h4>
                </div>
                <div className="Upload downupload">
                  <h5>54</h5>
                  <h4>Total Uploads</h4>
                </div>
              </div>
              <div className="pdfupload" >
                <button  type="file" style={{position : 'relative'}} >
                  Upload Now
                  <input type="file" multiple style={{position : 'absolute', top : '0', left : '0',width : "100%", height : '100%',opacity : '0',}}/>
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
                </button>
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
                <div className="recent-download recent"></div>
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
                <button onClick={() => {
                      localStorage.removeItem('user');
                      localStorage.removeItem('token');
                      navigate('/LogIn');
                    }} >
                  Log out
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
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
