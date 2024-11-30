import React, { useContext, useEffect, useRef, useState } from "react";
import "./Login.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../Component/Backbutton/Backbutton";
import { UserContext } from "../../Context/UserContext/UserContextdata";





const Login = (props) => {

  const { setUsernav } = useContext(UserContext);
  const [repeatclick, setRepeatclick] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const [loginData, setLoginData] = useState({
    gmail: '',
    password: ''
  });

  const navigate = useNavigate();

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
    try {
      const response = await axios.post('/api/LogIn', loginData, { withCredentials: true });
      if (response.status === 200) {
        props.showAlart('Log in Successfull.', '', 'check');
        setUsernav(response.data.user);
        window.location.href = "/";

        setRepeatclick(false);
      }

      else {
        console.error('Error retrieving data');
        props.showAlart('Error retrieving data', '', 'cancel');
        setRepeatclick(false);

      }


    } catch (error) {
      if (error.response && error.response.status === 300) {
        props.showAlart('Invalid password', 'try again', 'cancel');
        setRepeatclick(false);
      }
      if (error.response && error.response.status === 401) {
        props.showAlart('You are not Resgistered', 'try again', 'cancel');
        setRepeatclick(false);
      }
      if (error.response && error.response.status === 500) {
        props.showAlart('Internal Server Error', '', 'cancel');
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
            <h2 className="main-heading" >Hello</h2>
            <h4 className="main-sub-heading">Login your accounts.......!</h4>
            <h3 className="">Email :-</h3>

            <input type="email" onChange={loginChange} value={loginData.gmail} name="gmail" id="loginemial" placeholder="" required />


            <h3 className="">Password :-</h3>
            <div className="show-hide" style={{ position: 'relative' }}>
              <input type={`${showHide ? 'text' : 'password'}`} onChange={loginChange} autoComplete="off" value={loginData.password} name="password" id="loginpassword" placeholder="" />
              {loginData.password && (<i className={`fa-solid fa-${showHide ?'eye-slash' : 'eye' }` }style={{ position: 'absolute', right: '0%', top: '50%', color: 'lightblue', fontSize: '1rem', userSelect: 'none' }} onClick={() => { setShowHide(!showHide) }}></i>)}
            </div>
            <div className="remember-forget-parent">
              <p className="" style={{ color: '#fff' }}>
                <input type="checkbox" name="logincheckbox" id="" className="mr-2" defaultChecked />
                &nbsp; Remember me
              </p>
              <Link to='ForgatePw' style={{ color: '#4B97D5' }} >Forget password ?</Link>
            </div>
            <div className="submit-parant">
              <input ref={submitRef} disabled={repeatclick} type="submit" value="Login" className="" />
            </div>
          </form>
          <Link to="Signup" className="signup-link">
            Don't have an account?{" "}
            <span className="">Register Now</span>
          </Link>
          <div className="backtohome" style={{ width: '100%', display: "flex", justifyContent: 'center', alignItems: 'center', paddingTop: '0.1rem', textDecoration: 'underline' }}>
            <NavLink to='/' style={{ textAlign: 'center', cursor: 'pointer', color: '#fff', marginTop: '2rem' }}> Back to Home</NavLink>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
