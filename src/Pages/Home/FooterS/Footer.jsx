
import React from "react";
import "../HomeS/HomeT.css";

import 'remixicon/fonts/remixicon.css'




const HomeT = () => {
 
  
  return (
    <>
    
      <div className="main-container">
          
        <div className="inner-main-container">
          
          <footer>
            <div className="mian-footer-body">
              <div className="first-footer-section">
                <h3>Join Witih us to recive updates, news & events!</h3>
                <form action="#">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter your email adress"
                  />
                  <input type="submit" value="Join" />
                </form>
              </div>
              <hr />
              <div className="second-footer-section">
                <ul>
                  <h3 className="ct-footer-list-header">Learn More</h3>
                  <li>
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
                  </li>
                </ul>
                <ul>
                  <h3 className="ct-footer-list-header">Services</h3>
                  <li>
                    <a href="#">Design</a>
                  </li>
                  <li>
                    <a href="#">Marketing</a>
                  </li>
                  <li>
                    <a href="#">Sales</a>
                  </li>
                  <li>
                    <a href="#">Programming</a>
                  </li>
                  <li>
                    <a href="#">Support</a>
                  </li>
                </ul>
                <ul>
                  <h3 className="ct-footer-list-header">The industry</h3>
                  <li>
                    <a href="#">Thought Leadership</a>
                  </li>
                  <li>
                    <a href="#">Webinars</a>
                  </li>
                  <li>
                    <a href="#">Events</a>
                  </li>
                  <li>
                    <a href="#">Sponsorships</a>
                  </li>
                  <li>
                    <a href="#">Advisors</a>
                  </li>
                  <li>
                    <a href="#">Training Program</a>
                  </li>
                  <li>
                    <a href="#">Activities & Campaigns</a>
                  </li>
                </ul>
                <ul>
                  <h3 className="ct-footer-list-header">Public Reactions</h3>
                  <li>
                    <a href="#">WebCorpCo Blog</a>
                  </li>
                  <li>
                    <a href="#">Hackathons</a>
                  </li>
                  <li>
                    <a href="#">Videos</a>
                  </li>
                  <li>
                    <a href="#">News Releases</a>
                  </li>
                  <li>
                    <a href="#">Newsletters</a>
                  </li>
                </ul>
                <ul>
                  <h3 className="ct-footer-list-header">About</h3>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Our Board</a>
                  </li>
                  <li>
                    <a href="#">Our Staff</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="third-footer-section">
                {/* <div className="footer-comany-logo"></div>
                <p>
                  Lorem ipsum dolor <br /> sit amet consectetur <br />{" "}
                  adipisicing elit.
                  <br />
                  Officiis, illum.
                </p> */}
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
                  {/* <input
                    type="image"
                    src="https://e7.pngegg.com/pngimages/530/733/png-clipart-goggle-playstore-icon-google-play-computer-icons-android-play-button-angle-rectangle.pn"
                    alt=""
                  /> */}
                  <i style={{color: '#D6D5D8',padding : '0 0.9rem 0 0',fontSize: '1.2rem'}} className="fa-brands fa-google-play"></i>
                  <div>
                    <p>Download on </p>
                    <h4>Google Play</h4>
                  </div>
                </div>
                <div className="sosial-media-link">
                  <div className="social-media-icon">
                    <a href="http://"><i className="fa-brands fa-facebook"></i></a>
                  </div>
                  <div className="social-media-icon">
                    <a href="http://"><i className="fa-brands fa-instagram"></i></a>
                  </div>
                  <div className="social-media-icon">
                    <a href="http://"><i className="fa-brands fa-square-twitter"></i></a>
                  </div>
                  <div className="social-media-icon">
                    <a href="http://"><i className="fa-brands fa-linkedin"></i></a>
                  </div>
                  <div className="social-media-icon">
                    <a href="http://"><i className="fa-brands fa-square-threads"></i></a>
                  </div>
                </div>
              </div>
              <hr />
              <div className="forth-footer-section">
                  <ul>
                    <li>FAQ</li>
                    <li>News</li>
                    <li>Contact</li>
                  </ul>
                <div>
                <p> Copyright @ 2024 Webpro. privacy policy</p>
                <p>Web Designed by Jitu and Akash</p>
                 </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

    </>
  );
};
export default HomeT;
