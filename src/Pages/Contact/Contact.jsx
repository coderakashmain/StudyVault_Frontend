import React, { useContext, useEffect } from "react";
import "./Contact.css";
import Footer from '../Home/FooterS/Footer';
import { Photonumdata } from "../../Context/PhoneInfo/PhoneInfo";


const Contact = () => {

  const {akashemailAddress,jituemailAddress} = useContext(Photonumdata);
  
  const handleEmailButtonClick = () => {
    window.open(`mailto:${jituemailAddress}`, '_blank');
  };
  const akahandleEmailButtonClick = () => {
    window.open(`mailto:${akashemailAddress}`, '_blank');
  };
  // const handleEmailButtoncallakashClick = () => {
  //   window.open(`tel:${akashphonenumber}`, '_blank');
  // };
  // const handleEmailButtoncalljituClick = () => {
  //   window.open(`tel:${jituphonenumber}`, '_blank');
  // };  
  const handleteamsupport = ()=>{
    window.open('mailto:studyvaultteam@gmail.com','_blank');
  }
  
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
                <h3>Akash Bindhani</h3>
                <ul>
                  <li>Bahalda,Baripada</li>
                  <li onClick={akahandleEmailButtonClick}>ab791235@gmail.com</li>
                  <li onClick={akahandleEmailButtonClick} style={{cursor : 'pointer',background : 'rgb(235 235 235)',width : '50%',margin : 'auto',padding : '0.2rem 0.3rem',color :''}}>Message</li>
                </ul>
              </div>
              <div className="second-location-box contact_box">
                <i className="fa-solid fa-street-view"></i>
                <h3>Jitu Pradhan</h3>
                <ul>
                  <li>Chikity,Berahampur</li>
                  <li onClick={handleEmailButtonClick} >jitupra73@gmail.com</li>
                  <li onClick={handleEmailButtonClick} style={{cursor : 'pointer',background : 'rgb(235 235 235)',width : '50%',margin : 'auto',padding : '0.2rem 0.3rem',color :''}}>Message</li>
                </ul>
              </div>
              <div className="third-location-box contact_box">
                <h3>General Contact</h3>
                <ul>
                  <li>
                    StudyVault <a href="#">Team</a>
                  </li>
                  <li onClick={handleteamsupport}>
                  support@studyvault.online
                  </li>
                  <li>
                    Message on Social media
                  </li>
                  <li>+91 1236549870</li>
                  <div className="social-contact-icon" style={{margin : '0.2rem 0'}}>
                  {/* <a href="" target="__blank"> <i className="fa-brands fa-facebook"></i></a>  */}
                   <a href="https://x.com/AKASHBIN814" target="__blank">  <i className="fa-brands fa-twitter"></i></a>
                   <a href="https://www.linkedin.com/in/akash-bindhani-7b71b9311/" target="__blank">    <i className="fa-brands fa-linkedin"></i></a>
                   <a href="https://github.com/coderakashmain"><i className="fa-brands fa-github" target='__blank'></i></a>
               
                
                
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
                Email us at <span>support@studyvault.online</span></p>
              <h3>MPC baripada</h3>
              <p>Don’t forget to share your thoughts – together, we can make this journey even more exciting!</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Contact;
