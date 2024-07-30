import React from 'react'
import './AboutUs.css'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <>
    <section id="about-us">
     <div className="about-us-back">
        <div className="about-us-back-box1"></div>
     </div>
     <div className="about-us-contain">
        <div className="about-us-box">
            <div className="left-about-box">
            <h2><span>O</span>ver the past two years, we've observed that students have had difficulty obtaining previous exam papers. Being students ourselves, we understand these challenges and want to help...</h2>
            <p>We are also students as you are dear so we hope that the small step from us helps you a little  bit.  If you want say thank you then you definitely give a sweet feedback.</p>
            <button><a href="#both-info-section">Learn more</a></button>
                
            </div>
            
            <div className="right-about-box">
              <div className="right-about-box-in">
                <h3>Here you can get those Benifits~</h3>
                <ul>
                  <li>All Previous Year Question Papers of M.P.C Auto.</li>
                  <li>Easy download in form of pdf.</li>
                  <li>You can also upload question paper for others.</li>
                  <li>Easy Interface.</li>
                  <li>Fast and Secure.</li>
                  
                </ul>
              </div>
                    
            </div>
        </div>
        <div className="our-info-box">
                  <h2>Our Developers</h2>
                  <div className="our-info-box-in">
                  <div className="akash-box self-box">
                    <div className="akash-img-box self-img-box">
                         <img src="https://www.davidchang.ca/wp-content/uploads/2020/09/David-Chang-Photography-Headshots-Toronto-61-1536x1536.jpg" alt="Akash's Photo" />
                    </div>
                      <div className="akash-description self-description">
                        <h3>Aaarav ~</h3>
                        <div className="akash-persional-info persional-info">
                          <p> <span>H</span>ello, I am <b>Akash(Aarav) Bindhani</b>, a passionate <b>Full-Stack Developer</b> and a third-year Computer Science Honors student at <b>M.P.C. Autonomous College.</b>  You can visit my <a  href="">Portfolio</a>. Stay connected with me on <a href="https://www.instagram.com/vanity__heart__81/" target='__blank'>Instagram</a> for updates on my latest work and insights. If you have any questions or would like to collaborate, feel free to reach out.</p>

                         <div className="info-visiting">
                          <p>Visit me ~
                          <a href="https://github.com/coderakashmain" target='__blank'><i className="fa-brands fa-github"></i></a>
                          <a href="https://www.linkedin.com/in/akash-bindhani-7b71b9311/" target='__blank'><i className="fa-brands fa-linkedin"></i></a>
                          <a href="https://www.instagram.com/vanity__heart__81/" target='__blank'><i className="fa-brands fa-instagram"></i></a>
                          </p>
                        </div>
                        
                      </div>
                        </div>
                       
                  </div>
                  <div className="jitu-box self-box">
                  <div className="jitu-img-box self-img-box  ">
                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcECNLzoKBCjC-n_cm8L-Wg4UlqSywIlzZpw&s" alt="Jitu's Photo" />
                    </div>
                      <div className="jitu-description self-description">
                          <h3>Jitu ~</h3>
                        <div className="jitu-persional-info persional-info">
                        <p> This is <b>Jitu Pradhan</b> & I am so happy to share my info with you. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta aspernatur, architecto tempora dolores ad libero labore saepe reiciendis consequatur quae quos, explicabo cumque eum! Eligendi consectetur dignissimos veniam quasi aliquid. Lorem ip .</p>
                          
                        </div>
                        <div className="info-visiting">
                          <p>Visit me ~
                          <a href="" target='__blank'><i className="fa-brands fa-github"></i></a>
                          <a href="" target='__blank'><i className="fa-brands fa-linkedin"></i></a>
                          <a href="" target='__blank'><i className="fa-brands fa-instagram"></i></a>
                          </p>
                        </div>
                      </div>
                  </div>
                </div>
                <hr />
                <div className="both-info" id='both-info-section'>
                  <p><span>O</span>ver the past two years, we've observed that students have had difficulty obtaining previous exam papers. Being students ourselves, we understand these challenges and want to help. That's why we decided to create a website where all past exam papers can be easily accessed by everyone. No matter what challenges we face, our commitment is to assist our fellow students. This platform aims to simplify exam preparation by providing a comprehensive archive of past papers. After all, your success is our success.😊</p>
                  <p>For any query contact with us ~<Link to="/Contact-Us"><button>Contact us</button></Link></p>
                </div>
                </div>
        </div>
    </section>
    </>
  )
}

export default AboutUs
