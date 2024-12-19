
import React from "react";
import "../HomeS/HomeT.css";

import 'remixicon/fonts/remixicon.css'

import { NavLink } from "react-router-dom";


const HomeT = () => {


  return (
    <>

      <div className="main-container">

        <div className="inner-main-container">

          <footer className="body-footer">
            <div className="mian-footer-body">

              <div className="second-footer-section">
                <ul>
                  <h3 className="footor-update-title">New Updates</h3>
                  {/* <li>
                    <a href="#">Company</a>
                  </li>
                  <li>
                    <a href="#">Clients</a>
                  </li>
                  <li>
                    <a href="#">News</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li> */}
                </ul>
                <ul>
                  <h3 className="footor-departments-title">Content</h3>
                  <li>
                    <NavLink to="#">Question Papers</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Note</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Syllabus</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Books</NavLink>
                  </li>
                 
                </ul>
                <ul>
                  <h3 className="footor-papers-title">Papers</h3>
                  <li>
                    <NavLink to="#" >Integrated B.Ed</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Honors</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Elective</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Compulsory</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">E&V</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Pg Papers</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Ug Papers</NavLink>
                  </li>
                </ul>

                <ul>
                  <h3 className="footor-contact-box-title">Conact Us</h3>
                  <p>WQH8+X8Odisha, 757003, India<br />Takatpur, Baripada, Mayurbhanj, Baripada </p>
                  <p>Email : studyvaultteam@gmail.com</p>
                  <h4>StudyVault Pvt. Ltd.</h4>
                  <div className="sosial-media-link">
                    {/* <div className="social-media-icon">
                      <a href="http://"><i className="fa-brands fa-facebook"></i></a>
                    </div> */}
                    <div className="social-media-icon">
                      <a href="https://www.instagram.com/akash_bindhani_/" target='__blank'><i className="fa-brands fa-instagram"></i></a>
                    </div>
                    <div className="social-media-icon">
                      <a href="https://x.com/AKASHBIN814" target='__blank'><i className="fa-brands fa-square-twitter"></i></a>
                    </div>
                    <div className="social-media-icon">
                      <a href="https://www.linkedin.com/in/akash-bindhani-7b71b9311/" target='__blank'><i className="fa-brands fa-linkedin"></i></a>
                    </div>
                    <div className="social-media-icon">
                      <a href="https://github.com/coderakashmain"><i className="fa-brands fa-github" target='__blank'></i></a>
                    </div>
                  </div>

                </ul>
              </div>
              {/* <hr /> */}
              {/* <div className="third-footer-section">
                
                <div className="apple-store-box">
                  <input
                    type="image"
                    src="https://cdn-icons-png.flaticon.com/512/226/226769.png"
                    alt=""
                  />
                  <div>
                    <p>Download on </p>
                    <h4>App Store</h4>
                  </div>
                </div>
                <div className="play-store-box">
                 
                  <i style={{color: '#D6D5D8',padding : '0 0.9rem 0 0',fontSize: '1.2rem'}} className="fa-brands fa-google-play"></i>
                  <div>
                    <p>Download on </p>
                    <h4>Google Play</h4>
                  </div>
                </div>
             
              </div> */}
              {/* <hr /> */}
              {/* <div className="forth-footer-section">
                  <ul>
                    <li>FAQ</li>
                    <li>News</li>
                    <li>Contact</li>
                  </ul>
                <div>
                <p> Copyright @ 2024 Webpro. privacy policy</p>
                <p>Web Designed by Jitu and Akash</p>
                 </div>
              </div> */}
            </div>
          </footer>
          <footer className="finalFooter">
            <aside className="lastfooter-left">
              <div>
              <NavLink to='/About-us'>About Us</NavLink>
              <NavLink to='/Contact-Us'>Contact Us</NavLink>
              </div>
              <div>
              <NavLink to='/Privacy-Policy'>Privacy Policy</NavLink>
              <NavLink to='/Terms-Conditions'>Terms & Conditions</NavLink>
              </div>
            </aside>
            <aside className="lastfooter-right">
              <p>&copy; Copyright StudyVault  All Rights Reserved </p>
            </aside>
          </footer>
        </div>
      </div>

    </>
  );
};
export default HomeT;
