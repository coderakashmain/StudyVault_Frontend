import React, { useContext, useEffect, useRef, useState } from "react";
import "./Login.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../Component/Backbutton/Backbutton";
import { UserContext } from "../../Context/UserContext/UserContextdata";
import GoogleAuth from "../../auth/GoogleAuth";
import studyvault from '../../photo/Study⁐Vault-logo-black.png'
import ReCaptcha from '../../Component/Captha/ReCaptha'
import { AlartContectValue } from "../../Context/AlartContext/AlartContext";




const Login = (props) => {
  const {showAlart} = useContext(AlartContectValue);
  const { setUsernav } = useContext(UserContext);
  const [repeatclick, setRepeatclick] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const navigate = useNavigate();
  const shouldVerify = process.env.NODE_ENV === 'production';
  const [isVerified, setIsVerified] = useState(false);
  const [loginData, setLoginData] = useState({
    gmail: '',
    password: ''
  });

  const handleVerification = (status) => {
    setIsVerified(status); 
 
  };

  const loginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((predata) => ({
      ...predata,
      [name]: value
    }));
  };
  const loginSubmit = async (e) => {
    setRepeatclick(true);
    e.preventDefault();

    if (!isVerified && shouldVerify) {
       showAlart("Please complete the CAPTCHA before logging in.",'','cancel');
      setRepeatclick(false);
      return;
    }

    try {
      const response = await axios.post('/api/LogIn', loginData, { withCredentials: true });
      if (response.status === 200) {
         showAlart('Log in Successfull.', '', 'check');
         sessionStorage.setItem('isLoggedIn', 'true');
        setUsernav(response.data.user);
        navigate('/');

        setRepeatclick(false);
      }

      else {
        console.error('Error retrieving data');
         showAlart('Error retrieving data', '', 'cancel');
        setRepeatclick(false);

      }


    } catch (error) {
      if (error.response && error.response.status === 300) {
         showAlart('Invalid password', 'try again', 'cancel');
        setRepeatclick(false);
      }
      if (error.response && error.response.status === 401) {
         showAlart('You are not Resgistered', 'try again', 'cancel');
        setRepeatclick(false);
      }
      if (error.response && error.response.status === 500) {
         showAlart('Internal Server Error', '', 'cancel');
        setRepeatclick(false);
      }
      
      setRepeatclick(false);
    }
  };
 

  const submitRef = useRef();

  useEffect(() => {
    if (repeatclick) {
      submitRef.current.style.opacity = '0.5';
    }
    else {
      submitRef.current.style.opacity = '1';
    }
  }, [repeatclick])

  return (
    <>
      <div className="main-login-container ">
        <BackButton />
        <div className="inner-main-login ">
          <form action="/api/LogIn" method="post" onSubmit={loginSubmit}>
            {/* <h2 className="main-heading" >StudyVault</h2> */}
            <div className="studyvault-logo">
            <img src={studyvault} alt="" />

            </div>
            <h4 className="main-sub-heading">Login to access essential study materials</h4>
            <h3 className="">Email </h3>

            <input type="email" onChange={loginChange} value={loginData.gmail} name="gmail" id="loginemial" placeholder="" required />


            <h3 className="">Password </h3>
            <div className="show-hide" style={{ position: 'relative' }}>
              <input type={`${showHide ? 'text' : 'password'}`} onChange={loginChange} autoComplete="off" value={loginData.password} name="password" id="loginpassword" placeholder="" />
              {loginData.password && (<div className="eye-contro"><i className={`fa-solid fa-${showHide ?'eye' : 'eye-slash' }` } onClick={() => { setShowHide(!showHide) }}></i></div>)}
            </div>
            <div className="remember-forget-parent">
              <p className="" style={{ color: '#333' }}>
                <input type="checkbox" name="logincheckbox" id="" className="mr-2" defaultChecked />
                &nbsp; Remember me
              </p>
              <Link to='ForgatePw' style={{ color: '#007bff' }} >Forget password ?</Link>
            </div>

            {!isVerified && shouldVerify && (  <ReCaptcha onVerified={handleVerification} />)}

            <div className="submit-parant">
              <input ref={submitRef} disabled={repeatclick} type="submit" value={` ${repeatclick ? "Logging in..." : "Login"}`} className="" />
            </div>
          </form>
          <Link to="Signup" className="signup-link">
          Don't have an account?{" "}
            <span className="">Register Now</span>
          </Link>
          <p className="Or-separate">or</p>
          <div style={{margin : "0.8rem 0" , display : 'flex', justifyContent : 'center', alignItems : 'center', width: '100%'}}>
            <div className="goolge-auth-btn">
          <GoogleAuth userdata={setUsernav} showAlart={ showAlart}/>
          </div>
          </div>
          <div className="back-to-home " >
            <NavLink to='/'> Back to Home</NavLink>

          </div>
         
        </div>
      </div>
    </>
  );
};

export default Login;
