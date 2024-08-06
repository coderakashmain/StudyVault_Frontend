import React, { useEffect, useState } from 'react'
import './ForgatePw.css'
import { Link, useNavigate } from 'react-router-dom'
import BackButton from '../../../Component/Backbutton/Backbutton'
import axios from 'axios';



const ForgatePw = (props) => {

  const [email, setEmail] = useState('');
  const [otp,setOtp] = useState(false);
  const [otpValue,setOtpValue] = useState('');
  const [loader, setLoader] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
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
        props.showAlart('OTP sent seccesfully');
        setMessage(<p>Your OTP expired in 10 minutes.</p>);

        setOtp(true);

        setLoader(false);
        setTimer(30);
        setOtpSent(false);
        
      }
      
     catch(error){
      setOtpSent(false);
      if(error.response && error.response.status === 409){

        props.showAlart('Email not found');
        setLoader(false);
      }
      else if (error.response && error.response.status === 429) {
        props.showAlart('OTP already sent. Please wait 30 seconds before requesting another OTP.');
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
      props.showAlart('Please enter your email');
      setLoader(false);
    }
      
  };


  const handleOtpSubmit = async (e)=>{
    e.preventDefault();
    setOtpSent(false);
    if(otpValue){
      try{
        const response =   await axios.post('/api/LogIn/verifyOtp ',{otp : otpValue , email});
        props.showAlart('Verify successfull');
        if(response.status === 200){
          navigate('/LogIn/ForgatePw/ResetPassword',{state : {email}});

        }
        
      }
      catch(error){
        if(error.response && error.response.status === 409){
          props.showAlart('Incorrect OTP');

        }
        if(error.response && error.response.status === 410){
          props.showAlart('OTP expired!');
          setOtpValue('');
          setOtp(false);
          setMessage(<p style={{color : 'red'}}>OTP expired!</p>);
        }
        if(error.response && error.response.status === 500){
          alert('Internal error');
          props.showAlart('Internal error');
        }
      };
     
    }
    else{
      props.showAlart('Please enter OTP sent to your gmail');
    }
  }
  return (
    <div id='forgatepw'>
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
          <button disabled = {otpSent} type='submit' >{loader && (<box-icon name='loader-alt' size = 'sm' flip='horizontal' animation='spin' color='#ffffff' ></box-icon>)}Get OTP</button>
       
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
    </div>
  )
}

export default ForgatePw
