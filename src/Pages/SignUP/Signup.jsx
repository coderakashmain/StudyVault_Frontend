
import React, { useContext, useEffect, useState } from "react"
import "./Signup.css"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import BackButton from "../../Component/Backbutton/Backbutton"
import GoogleAuth from "../../auth/GoogleAuth"
import { AlartContectValue } from "../../Context/AlartContext/AlartContext"
import { UserContext } from "../../Context/UserContext/UserContextdata"


const Signup = (props) => {
  const [signupdata, setSignupdata] = useState({
    firstname: '',
    lastname: '',
    rollno: '',
    gmail: '',
    password: '',
    passwordcheck: ''
  });



  // console.log(signupdata.gmail);
const {showAlart} = useContext(AlartContectValue);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [verifyOtpsubmit, setVerifyOtpsubmit] = useState(false);
  const [message, setMessage] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [submitoff, setSubmitoff] = useState(false);
  const [passwordcheck, setPasswordcheck] = useState(false);
  const [spinner, setSpinner] = useState(false)
  const [disablebtn, setDisablebtn] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const { setUsernav} = useContext(UserContext);

  const signupchange = (e) => {
    const { name, value } = e.target;
    setSignupdata((preData) => ({
      ...preData,
      [name]: value,
    }));

  }
  useEffect(() => {
    if (signupdata.gmail) {

      setOtp(true);
    }
    if (!signupdata.gmail) {

      setOtp(false);
      setVerifyOtp(false);
      setVerifyOtpsubmit(false);
      setOtpValue('');
      setMessage('')
      setSubmitoff(false);
    }

  }, [signupdata.gmail]);

  useEffect(() => {
    if (signupdata.password) {
      setPasswordcheck(true);
    }
    if (!signupdata.password) {
      setPasswordcheck(false);
    }
  }, [signupdata.password])

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp) {
      try {
        setSpinner(true);
        setDisablebtn(true);
        const response = await axios.post('/api/LogIn/Signup/otpVarify', { email: signupdata.gmail })
        if (response.status === 200) {
           showAlart('OTP send Successfully ', '', 'check');
          setVerifyOtp(true);
          setVerifyOtpsubmit(true);
          setSpinner(false);
          setDisablebtn(false);
          setMessage(<p style={{ margin: '0 0 0.45rem 0', fontSize: '0.5rem', color: '#333' }}>OTP valid for 10 minutes.</p>)

        }
        else {
           showAlart('Try again after some time .', '', 'mark');
          setSpinner(false);
          setDisablebtn(false);
        }

      }
      catch (error) {
        if (error.response && error.response.status === 410) {
           showAlart('Internal error ', '', 'cancel');
          setDisablebtn(false);
          setSpinner(false);
        }
        if (error.response && error.response.status === 420) {
          setVerifyOtp(true);
          setVerifyOtpsubmit(true);
          setDisablebtn(false);
           showAlart('Error in genereting OTP', '', 'mark');
          setSpinner(false);

        }
        if (error.response && error.response.status === 500) {
           showAlart('Error in genereting OTP', '', 'mark');
          setDisablebtn(false);
          setSpinner(false);
        }
      }
    }
    else {
       showAlart('Enter your email', '', 'mark');
      setDisablebtn(false);
      setSpinner(false);
    }

  };

  const handlevarifyotpfinal = async (e) => {
    e.preventDefault();
    if (otpValue) {
      try {
        await axios.post('/api/LogIn/Signup/otpVarify/confirm', { email: signupdata.gmail, otp: otpValue });


         showAlart('Email verify successfull', '', 'check');
        setSubmitoff(true);
        setMessage(<p style={{ margin: '0 0 0.45rem 0', fontSize: '0.5rem', color: '#333' }} >Email verify successfull</p>)
        setOtpValue('');
        setVerifyOtp(false);
        setOtp(false);
        setDisablebtn(false);

      }
      catch (error) {
        if (error.response && error.response.status === 410) {
           showAlart('OTP expired', '', 'cancel');
          setDisablebtn(false);
        }
        if (error.response && error.response.status === 409) {
           showAlart('Error updating data ', '', 'mark');
          setDisablebtn(false);
        }
        if (error.response && error.response.status === 405) {
           showAlart('Invalid OTP ', '', 'cancel');
          setMessage(<p style={{ margin: '0 0 0.45rem 0', fontSize: '0.5rem', color: 'red' }} >Invalid OTP</p>)
          setDisablebtn(false);
        }
        else {

           showAlart('Internal error', '', 'mark');
          setDisablebtn(false);
        }

      }
    }
    else {
       showAlart('Please enter  OTP send to your gmail ', '', 'mark');
    }
  };

  const signupsubmit = async (e) => {
    e.preventDefault();
    if (signupdata.password === signupdata.passwordcheck) {
      try {
        await axios.post('/api/LogIn/Signup', signupdata);
        navigate("/LogIn");
         showAlart('Registerd Seccessfull', '', "check")
      }
      catch (error) {
        if (error.response && error.response.status === 409) {
           showAlart('Email id already exist', '', "mark");
        }
        if (error.response && error.response.status === 408) {
           showAlart("Roll no already exist", '', "mark");
        } else {
          console.error('Error registering user', error);

        }
      }

    }
    else {
       showAlart('Mismatched ! Your password is not match', '', "mark");
      return;
    }

  }

  const showalart = () => {
    if (!submitoff) {

       showAlart('Verify your email id first ', '', 'mark');
    }
    if (!passwordcheck && submitoff) {
       showAlart('Please enter your password ', '', 'mark');
    }
  }
  return (
    <div id="signup">
      <BackButton />
      <div className="signup-form">
        <h2>Signup</h2>

        <div className="goolge-auth-btn">
          <GoogleAuth userdata={setUsernav} showAlart={ showAlart}/>
          </div>
        <p style={{textAlign : 'center',margin : '0.5rem 0  '}}>or</p>
        <hr style={{}} />
        <form onSubmit={otp ? (!verifyOtp ? (handleOtpSubmit) : (handlevarifyotpfinal)) : (signupsubmit)} >
          <div className="name-box">
            <div className="first-name-box">
              <label htmlFor="firstname">First Name   </label>
              <input type="text" name="firstname" onChange={signupchange} value={signupdata.firstname} id="firstname" className="singup-form-input" required />
            </div>
            <div className="last-name-box">
              <label htmlFor="secondname"> Last Name   </label>
              <input type="text" name="lastname" onChange={signupchange} value={signupdata.lastname} id="secondname" className="singup-form-input" />

            </div>
          </div>
          <label htmlFor="rollno">College Roll No   </label>
          <input type="text" id="rollno" name="rollno" onChange={signupchange} value={signupdata.rollno} className="singup-form-input"
            pattern="[A-Z]{2}[0-9]{2}-[0-9]{1-5}" required />
          <label htmlFor="gmail">Gmail   </label>

          <div style={{ display: 'flex', gap: '1.3rem' }} className="signup-gmail-box">
            <input type="email" name="gmail" onChange={signupchange} value={signupdata.gmail} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              id="gmail" className="singup-form-input" required readOnly={spinner} />

            {verifyOtp && (<input type="number" onChange={(e) => { setOtpValue(e.target.value) }} value={otpValue} style={{ height: '30%', padding: '0.6rem 0.2rem 0.6rem 0.8rem', margin: 'auto', borderRadius: '0.2rem', width: '60%', fontSize: '0.9rem', flexGrow: '1' ,border : '1px solid #ddd'}} placeholder="OTP" />)}
            {otp && (<button disabled={disablebtn || spinner} type="submit" style={{ textAlign: 'end', padding: '0.6rem 1rem', height: '30%', margin: 'auto', outline: 'none', border: 'none', backgroundColor: "#4B97D5", cursor: 'pointer', borderRadius: '0.2rem', transition: 'all 0.2s ease-in-out' }}>{!verifyOtpsubmit ? (<p style={{ fontSize: '0.9rem' }}>{!spinner ? <span style={{ color: '#fff', fontWeight: '500' }}>Verify</span> : (<box-icon name='loader' flip='vertical' animation='spin' color="#fff" ></box-icon>)}</p>) : (<p style={{ fontSize: '0.9rem', color: '#fff' }} >Confirm</p>)}</button>)}
          </div>
          {message}



          <div className="sigup-password-box">
            <div className="currnet-password-signin">
              <label htmlFor="password">Create Password   </label>
              <div className="show-hide" style={{ position: 'relative' }}>
                <input type={`${showHide ? 'text' : 'password'}`} id="password" name="password" onChange={signupchange} autoComplete="off" value={signupdata.password} className="singup-form-input" />
                {signupdata.password && (<i className={`fa-solid fa-${showHide ? 'eye' : 'eye-slash'}`} style={{ position: 'absolute', right: '4%', top: '45%', color: '#333', fontSize: '01rem', userSelect: 'none' }} onClick={() => { setShowHide(!showHide) }}></i>)}
              </div>
            </div>
            <div className="new-password-signin">

              <label htmlFor="passwordcheck">Confirm password   </label>
              <input type="password" id="passwordcheck" name="passwordcheck" onChange={signupchange} autoComplete="off" value={signupdata.passwordcheck} className="singup-form-input" />
            </div>

          </div>

          <input onClick={showalart} type={passwordcheck ? (!submitoff ? '' : 'submit') : ''} value="Signup" className="signup-btn" autoCorrect="off" readOnly style={{ textAlign: 'center' }} />

        </form>
        
        <hr style={{ margin: '1rem 0' }} />
        <div className="already-account">
          <p>Already have an accout?</p>
          <Link to='/LogIn'>Log In</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
