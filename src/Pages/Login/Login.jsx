import React, { useContext, useEffect, useRef, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../Component/Backbutton/Backbutton";
import { UserContext } from "../../Context/UserContext/UserContextdata";
const API_URL = import.meta.env.VITE_API_URL;



const Login = (props) => {

  const {setUsernav} = useContext(UserContext);
  const [repeatclick,setRepeatclick] =useState(false);
  const [loginData, setLoginData] = useState({
    gmail : '',
    password : ''
  });

  const navigate = useNavigate();

  const loginChange = (e)=>{
    const {name,value} = e.target;
    setLoginData((predata)=>({
      ...predata,
      [name] : value
    }));
  };
    const loginSubmit =async (e)=>{
      setRepeatclick(true);
      e.preventDefault();
      try{
        const response = await axios.post(`${API_URL}/LogIn`, loginData, { withCredentials: true });
        if(response.status === 200 ){
          setUsernav(response.data.user);
          navigate('/');
          props.showAlart('Log in Successfull.');
          setRepeatclick(false);
        }
       
        else {
          console.error('Invalid credentials');
          props.showAlart('Invalid credentials');
          setRepeatclick(false);
          
        }


       } catch(error){
        setRepeatclick(false);
          props.showAlart('Invalid credentials','try again');
          
        
       }
    };

    const submitRef  = useRef();

    useEffect(()=>{
      if(repeatclick){
        submitRef.current.style.opacity = '0.5';
      }
      else{
        submitRef.current.style.opacity = '1';
      }
    },[repeatclick])
 
  return (
    <>
      <div className="main-login-container ">
        <BackButton/>
        <div className="inner-main-login ">
          <form action="/api/LogIn" method="post" onSubmit={loginSubmit}>
            <h2 className="main-heading" >Hello</h2>
            <h4 className="main-sub-heading">Login your accounts.......!</h4>
            <h3 className="">Email :-</h3>
            <input type="email" onChange={loginChange} value={loginData.gmail} name="gmail" id="loginemial" placeholder=""  required/>
            <h3 className="">Password :-</h3>
            <input  type="password" onChange={loginChange} autoComplete="off" value={loginData.password} name="password" id="loginpassword" placeholder="" />
            <div className="remember-forget-parent">
              <p className="">
                <input type="checkbox" name="logincheckbox" id="" className="mr-2" />
               &nbsp; Remember me
              </p>
              <Link to='ForgatePw' style={{color : '#4B97D5'} } >Forget password ?</Link>
            </div>
            <div className="submit-parant">
              <input ref={submitRef} disabled={repeatclick} type="submit" value="Login" className="" />
            </div>
          </form>
          <Link to="Signup" className="signup-link">
            Don't have an account?{" "}
            <span className="">Register Now</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
