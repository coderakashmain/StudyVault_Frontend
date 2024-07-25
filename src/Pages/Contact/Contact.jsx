import React from "react";
import "./Contact.css";
import Footer from '../Home/FooterS/Footer';
const Contact = () => {
  const emailAddress = "jitpradhan856@gmail.com"; // Your email address
  const handleEmailButtonClick = () => {
    window.open(`mailto:${emailAddress}`, '_blank');
  };
  return (
    <>
      <div className="contact_main_conatainer">
        <div className="conatct-header">
          <div>
            <h1>Contact Us</h1>
            <p>Feel free to get in touch with us...</p>
          </div>
        </div>
        <div className="contact-main-body">
          <div className="conact-box-body">
            <div className="contact-location-details">
              <div className="first-location-box contact_box">
                <i className="fa-solid fa-street-view"></i>
                <h3>@baripada</h3>
                <ul>
                  <li>hfgjb 4576 6fgjv</li>
                  <li>jbv vjfb fvf</li>
                  <li>+91 1236549870</li>
                </ul>
              </div>
              <div className="second-location-box contact_box">
                <i className="fa-solid fa-street-view"></i>
                <h3>@baripada</h3>
                <ul>
                  <li>hfgjb 4576 6fgjv</li>
                  <li>jbv vjfb fvf</li>
                  <li>+91 1236549870</li>
                </ul>
              </div>
              <div className="third-location-box contact_box">
                <h3>General Contact</h3>
                <ul>
                  <li>
                    inquries <a href="">abcd@efg</a>
                  </li>
                  <li>
                    inquries <a href="">abcd@efg</a>
                  </li>
                  <li>
                    inquries <a href="">abcd@efg</a>
                  </li>
                  <li>
                    inquries <a href="">abcd@efg</a>
                  </li>
                  <li>+91 1236549870</li>
                  <div className="social-contact-icon">
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-linkedin"></i>
                    <i className="fa-brands fa-meta"></i>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <div className="contact-form-body">
            <div className="contact-left-body">
              <h2 className="left-body-heading">Send us a Message</h2>
              <div className="form-data">
                <div className="information">
                  <p>First Name</p>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter your name"
                  />
                </div>
                <div className="information">
                  <p>Last Name</p>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter your name"
                  />
                </div>
                <div className="information">
                  <p>Email</p>
                  <input
                    type="Email"
                    name=""
                    id=""
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="information">
                  <p>Phone Number</p>
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="Enter your name"
                  />
                </div>
                <div className="information message-information">
                  <p>
                    Message , <br />
                    <br />
                    Just wanted to get your inlput when will the new dashboard
                    go live ?
                  </p>
                  <input type="text" name="" id="" /><br /><br />
                  <input type="submit" value="SEND MESSAGE" />
                </div>
              </div>
            </div>
            <div className="contact-right-body">
              <h3>Connect with us :</h3>
              <p onClick={handleEmailButtonClick}>For support or any questions
                Email us at <span>support@mpc.com</span></p>
              <h3>MPC baripada</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, nam.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Contact;
