import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../Component/Backbutton/Backbutton";



const Login = (props) => {
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
      e.preventDefault();
      try{
        const response = await axios.post('/api/logIn', loginData);
        if(response.status === 200 ){
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('token', response.data.token);
          navigate('/');
          props.showAlart('Log in Successfull.');
        }else {
          console.error('Invalid credentials');
          alert('Invalid credentials');
          
        }


       } catch(error){
          props.showAlart('Invalid credentials','try again')
       }
    };
 
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
            <input  type="password" onChange={loginChange}  value={loginData.password} name="password" id="loginpassword" placeholder="" />
            <div className="remember-forget-parent">
              <p className="">
                <input type="checkbox" name="logincheckbox" id="" className="mr-2" />
               &nbsp; Remember me
              </p>
              <p>Forget password ?</p>
            </div>
            <div className="submit-parant">
              <input type="submit" value="Login" className="" />
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
