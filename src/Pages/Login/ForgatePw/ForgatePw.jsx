import React from 'react'
import './ForgatePw.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from './Fogatepw.png'
import BackButton from '../../../Component/Backbutton/Backbutton'


const ForgatePw = () => {

  const navigate = useNavigate(); 

  const backtohome = ()=>{
     navigate('/');
  }
  return (
    <div id='forgatepw'>
      <BackButton/>
      <div className="forgate-box">
        <div className="forgate-logo-box">
          <img src={logo} alt="" />
          <h3>Having trouble in Logging in ?</h3>
        </div>
        <div className="forgate-email-enter-box">
          <p>Enter you Email and we'll send you a link to get back into your account.</p>
          <input type="gmail" name = 'gmail'placeholder='Email' required />
          <button>Get Link</button>
        </div>
        {/* Otp */}
        {/* <div className="forgate-email-enter-box">
          <p>Enter OTP</p>
          <input type="gmail" name = 'gmail'placeholder='Email' required />
          <button>Done</button>
        </div> */}

        {/* // */}
        <hr />
        <div className="back-create">
          <Link to='/LogIn/Signup'>Create an Account</Link>
          
          <button onClick={backtohome} className='forgate-btn'>Back to Home page</button>
        </div>
      </div>
    </div>
  )
}

export default ForgatePw
