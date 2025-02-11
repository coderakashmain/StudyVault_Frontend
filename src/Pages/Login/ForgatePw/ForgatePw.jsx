import React, { useContext, useEffect, useState } from 'react'
import './ForgatePw.css'
import { Link, useNavigate } from 'react-router-dom'
import BackButton from '../../../Component/Backbutton/Backbutton'
import axios from 'axios';
import { AlartContectValue } from '../../../Context/AlartContext/AlartContext';



const ForgatePw = (props) => {

  const [email, setEmail] = useState('');
  const [otp,setOtp] = useState(false);
  const [otpValue,setOtpValue] = useState('');
  const [loader, setLoader] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
  const [PasswordResetPage, setPasswordResetPage] = useState(false)
  const {showAlart} = useContext(AlartContectValue);
  const backtohome = ()=>{
     navigate('/');
  }

useEffect(()=>{
  let interval ;
  if(timer > 0 ){
    interval = setInterval(() => {
      setTimer((prev)=> prev - 1);
    }, 1000);
  }
  else if(timer === 0 && otpSent){
    setOtpSent(false);
  }

  return ()=> clearInterval(interval);
},[timer, otpSent])

const handleChange = (e)=>{
 setEmail(e.target.value);
}
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(email){
      try{
        setOtpSent(true);
        setLoader(true);
        await axios.post('/api/LogIn/ForgatePw',{email});
         showAlart('OTP sent seccesfully','','check');
        setMessage(<p>Your OTP expired in 10 minutes.</p>);

        setOtp(true);

        setLoader(false);
        setTimer(30);
        setOtpSent(false);
        
      }
      
     catch(error){
      setOtpSent(false);
      if(error.response && error.response.status === 409){
         showAlart('Not Registered','','mark');
        setLoader(false);
      }
      else if (error.response && error.response.status === 429) {
         showAlart('OTP already sent. Please wait 30 seconds before requesting another OTP.','','check');
        setOtp(true);
        setLoader(false);
      }
      
      else {
        console.error('Error to get otp', error);
        setLoader(false);
       
      }
     }
    }
    else{
       showAlart('Please enter your email','','mark');
      setLoader(false);
    }
      
  };


  const handleOtpSubmit = async (e)=>{
    e.preventDefault();
    setOtpSent(false);
    if(otpValue){
      try{
        const response =   await axios.post('/api/LogIn/verifyOtp ',{otp : otpValue , email});
         showAlart('Verify successfull','','check');
        setPasswordResetPage(true);
        
      }
      catch(error){
        if(error.response && error.response.status === 409){
           showAlart('Incorrect OTP','','cancel');

        }
        if(error.response && error.response.status === 410){
           showAlart('OTP expired!','','cancel');
          setOtpValue('');
          setOtp(false);
          setMessage(<p style={{color : 'red'}}>OTP expired!</p>);
        }
        if(error.response && error.response.status === 500){
          alert('Internal error');
           showAlart('Internal error','','cancel');
        }
      };
     
    }
    else{
       showAlart('Please enter OTP sent to your gmail','','mark');
    }
  }


  //password reset page

  const [resetPassword, setResetPassword] = useState('');
    const [reEnterResetPassword, setReEnterResetPassword] = useState('');
    const [timerresetpage, setTimerResetPage] = useState(300);
    const [resetback, setResetback] = useState(true);


    useEffect(() => {
       if(PasswordResetPage){
        let interval;
        if (timerresetpage > 0) {
            interval = setInterval(() => {
              setTimerResetPage((prev) => prev - 1);
                    
           }, 1000);
        }
        else if (timerresetpage === 0 && resetback) {
            setResetback(false);
        }
        return () => clearInterval(interval);
       }
    }, [timerresetpage,resetback,PasswordResetPage]);

    useEffect(()=>{
        if(timerresetpage === 0){
          setResetback(false);
        }
    },[timerresetpage])

  
    // }, [email, navigate]);

   



    const handleSubmitotp = async (e) => {
        e.preventDefault();
        if (resetPassword !== reEnterResetPassword) {
             showAlart('Password do not match', '','mark');
            return;
        }

        if (resetPassword === reEnterResetPassword) {
            try {
                await axios.post('/api/LogIn/ForgatePw/ResetPassword', { email, resetPassword });
                 showAlart('Password Reset succesfully','','check');
                navigate('/LogIn');
            }
            catch (error) {
                if (error.response && error.response.status === 500) {
                     showAlart('Error  inserting in database','','cancel')
                }
                else {
                     showAlart('Internal error','','cancel');
                }
            }
        }
        else {


             showAlart('Please Write a password','','mark');

        }

    }
  return (
    <>
    {!PasswordResetPage ? (<div id='forgatepw'>
      <BackButton/>
      <div className="forgate-box">
        <div className="forgate-logo-box">
          <i className="fa-solid fa-building-lock"></i>
          <h3>Having trouble in Logging in ?</h3>
        </div>
        {!otp ?(<form onSubmit={handleSubmit} >
        <div className="forgate-email-enter-box">
          
          <p>Enter you Email and we'll send you a link to get back into your account.</p>
          <input  onChange={handleChange}  value= {email} type="gmail" name = 'gmail'placeholder='Email'  />
          
          {timer > 0 && <p>OTP  sent. You can request another OTP after <span style={{color : 'blue'}}>
            {timer}
            </span>  seconds.</p>}
          <button disabled = {otpSent} type='submit' >{loader && (<box-icon  name='loader-alt' size = 'sm' flip='horizontal' animation='spin' color='#ffffff' ></box-icon>)}Get OTP</button>
       
        </div>
        </form>) : ( 
          <form onSubmit={handleOtpSubmit} >
          <div className="forgate-email-enter-box">
          <p>Enter OTP send to your gmail account :</p>
          <input onChange={(e)=>{setOtpValue(e.target.value)}}  value={otpValue} type="number" name = 'otpValue'placeholder='OTP'  />
          {otp && (message)}
          <button type='submit'>Verify OTP</button>
        </div></form>)}
        
        
    
      
   
        <hr />
        <div className="back-create">
          <Link  to='/LogIn/Signup' required>Create an Account</Link>
          {!otp ? (<button  onClick={backtohome} className='forgate-btn'>Back to Home page</button>) : (<button  onClick={()=>{setOtp(false)}} className='forgate-btn'>Back to Send OTP page</button>)}
          
        </div>
      </div>
    </div>) : (<div id='reset-password'>

      {resetback ? (
          <div className="reset-password-box">
              <h2>Reset your Password</h2> <form onSubmit={handleSubmitotp}>
                 <p style={ {fontSize : '0.9rem'}}>*Use a combination of uppercase letters, lowercase letters, numbers, and special characters.void common words, phrases, or personal information (e.g., names, birthdates).Use random, unpredictable combinations of characters.</p>
                  <input type="password" name="reset-password" onChange={(e) => { setResetPassword(e.target.value) }} value={resetPassword} placeholder='Reset password' id="" required autoCorrect='none' />
                  <input type="password" name="reenter-reset-password"
                      onChange={(e) => { setReEnterResetPassword(e.target.value) }}
                      value={reEnterResetPassword} placeholder='Re-enter password' required  autoCorrect='none'/>
                  <button type='submit'>Change password</button>
              </form>
              <hr />
              <button onClick={(e)=>{
                navigate('/');
                PasswordResetPage(false);
              }} className=' reset-btn'> Back to Home page</button>
          </div>) : (<div className=' backto-log-in'>
              <h2>Session expired, Back to Login Page!
                  <button onClick={() => {
                      navigate('/LogIn');
                      PasswordResetPage(false);
                      
                  }}>Back</button>
              </h2>
          </div>)}
      </div>)}




      </>


  )
}

export default ForgatePw
