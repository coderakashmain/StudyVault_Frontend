import React, { useEffect } from 'react'
import './AboutUs.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import akashlogo from '../../photo/Akash2.jpg'
import akashlogoa from '../../photo/Akash2.avif'
import akashlogow from '../../photo/Akash2.webp'
import jituphoto from '../../photo/jitupp.jpg'
import jituphotoa from '../../photo/jitupp.avif'
import jituphotow from '../../photo/jitupp.webp'
import Footer from '../Home/FooterS/Footer'

const AboutUs = () => {

  const navigate = useNavigate();
  const handletopscroll = () => {

    window.scrollTo({ top: 0 });


  }
 
  return (
    <>
      <section id="about-us">
      <div className="aboutusheader"><header>About Us</header></div>
        <div className="about-us-contain">
          
          <div className="about-us-box">
            <div className="left-about-box">
             
              <h2><span style={{ fontWeight: '600' }}>O</span>ver the past few years, we've observed that students have had difficulty to obtaining notes and papers..In order to overcome these consequences
                we've been trying to provide all the essential
                exam related materials through this website
                ..</h2>
             
              <p>We are also students as you are . so we hope that the small step from us helps you a little  bit.  If you want say thank you then you definitely give a sweet feedback.</p>
              <button><a href="#both-info-section">Learn more</a></button>

            </div>
         

            <div className="right-about-box">
            <div className="back-to-homepage " >
              <p>Go Back to Home Page</p>
              <button className='active' onClick={()=>navigate('/')}> Click</button>

              </div>
              <div className="right-about-box-in">
                <h3>Here you can get those Benifits~</h3>
                <ul>
                  <li>All Previous Year Question Papers of M.P.C Auto.</li>
                  <li>Easy download in form of pdf.</li>
                  <li>You can  send us question papers for others.</li>
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
                  <picture>
                  <source srcSet={akashlogoa} type="image/avif"/>
                  <source srcSet={akashlogow} type="image/webp"/>
                  <img src={akashlogo} alt="Akash's Photo" loading="lazy" />
                  </picture>
                </div>
                <div className="akash-description self-description">
                  <h3>Akash ~</h3>
                  <div className="akash-persional-info persional-info">
                    <p> <span>H</span>ello, I am <b>Akash(Aarav) Bindhani</b>, a passionate <b>Full-Stack Developer</b> and a third-year Computer Science Honors student at <b>M.P.C. Autonomous College.</b>  You can visit my <a href="https://codermainakashportfolio.netlify.app/" target='__blank'>Portfolio</a>. You can visit or stay connected with me on <a href="https://www.instagram.com/akash_bindhani_/" target='__blank'>Instagram</a> for more updates on my latest work and insights. If you have any questions or would like to collaborate, feel free to reach out.</p>

                    <div className="info-visiting">
                      <p>Visit me ~
                        <a href="https://github.com/coderakashmain" target='__blank'><i className="fa-brands fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/akash-bindhani-7b71b9311/" target='__blank'><i className="fa-brands fa-linkedin"></i></a>
                        <a href="https://www.instagram.com/akash_bindhani_/" target='__blank'><i className="fa-brands fa-instagram"></i></a>
                      </p>
                    </div>

                  </div>
                </div>

              </div>
              <div className="jitu-box self-box">
                <div className="jitu-img-box self-img-box  ">
                  <picture>
                  <source srcSet={jituphotoa} type="image/avif"/>
                  <source srcSet={jituphotow} type="image/webp"/>
                  </picture>
                  <img src={jituphoto} alt="Jitu's Photo" loading='lazy' />
                </div>
                <div className="jitu-description self-description">
                  <h3>Jitu ~</h3>
                  <div className="jitu-persional-info persional-info">
                    <p> Hello, I am <b>Jitu Pradhan</b>, a passionate <b>Full-Stack Developer</b> and a second-year MCA department student at <b>M.P.C. Autonomous College</b> . I am dedicated to crafting innovative web applications.
                      You can check out my latest projects on my <a href="#">Portfolio</a> , and stay connected with me through <a href="https://www.instagram.com/jitu._pradhan._99/">Instagram</a> and  <a href="https://www.linkedin.com/in/jitupradhan99/">LinkedIn</a>. Feel free to reach out if you'd like to collaborate or discuss ideas!
                    </p>

                  </div>
                  <div className="info-visiting">
                    <p>Visit me ~
                      <a href="https://github.com/Jitupra9" target='__blank'><i className="fa-brands fa-github"></i></a>
                      <a href="https://www.linkedin.com/in/jitupradhan99/" target='__blank'><i className="fa-brands fa-linkedin"></i></a>
                      <a href="https://www.instagram.com/jitu._pradhan._99/" target='__blank'><i className="fa-brands fa-instagram"></i></a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="both-info" id='both-info-section'>
              <p><span>O</span>ver the past two years, we've observed that students have had difficulty obtaining previous exam papers. Being students ourselves, we understand these challenges and want to help. That's why we decided to create a website where all past exam papers can be easily accessed by everyone. No matter what challenges we face, our commitment is to assist our fellow students. This platform aims to simplify exam preparation by providing a comprehensive archive of past papers. After all, your success is our success.😊</p>
              <p>For any query contact with us ~<Link to="/Contact-Us" ><button onClick={handletopscroll}>Contact us</button></Link></p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default AboutUs
