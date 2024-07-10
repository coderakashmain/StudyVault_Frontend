import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <>
      <div className="main-login-container ">
        <div className="inner-main-login ">
          <form action="">
            <h2 className="main-heading" >Hello</h2>
            <h4 className="main-sub-heading">Login your accounts.......!</h4>
            <h3 className="">Email :-</h3>
            <input type="email" name="" id="" placeholder="" />
            <h3 className="">Password :-</h3>
            <input type="password" name="" id="" placeholder="" />
            <div className="remember-forget-parent">
              <p className="">
                <input type="checkbox" name="" id="" className="mr-2" />
               &nbsp; Remember me
              </p>
              <p>Forget password ?</p>
            </div>
            <div className="submit-parant">
              <input type="submit" value="Login" className="" />
            </div>
          </form>
          <a href="" className="signup-link">
            Don't have an account{" "}
            <span className="">Register Now</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
