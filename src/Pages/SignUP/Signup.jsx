
import { useState } from "react"
import "./Signup.css"
import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'
import BackButton from "../../Component/Backbutton/Backbutton"



const Signup = (props) => {
  const [signupdata, setSignupdata] = useState({
    firstname : '',
    lastname : '',
    rollno : '',
    gmail : '',
    password : '',
    passwordcheck : ''
  });

  const navigate = useNavigate();

  const signupchange = (e) =>{
    const {name,value} = e.target;
    setSignupdata((preData) =>({
      ...preData,
      [name] : value,
    }))
  }

  const signupsubmit = async (e)=>{
    e.preventDefault();
    if(signupdata.password === signupdata.passwordcheck){
      try {
        const response =  await axios.post('/api/LogIn/Signup',signupdata);
        console.log(response.data);
        navigate("/LogIn");
        props.showAlart('Registerd Seccessfull')
      }
      catch (error) {
        if (error.response && error.response.status === 409) {
          props.showAlart('Email id', 'already exist');
        } else {
          console.error('Error registering user', error);
          props.showAlart("Roll no already exist");
        }
      }
      
    }
    else{
      props.showAlart('Mismatched', 'Your password is not match')
    }
    
  }
  return (
    <div id="signup">
      <BackButton/>
      <div className="signup-form">
        <h2>Signup</h2>
        <form action="/api/LogIn/signup"  id="form" onSubmit={signupsubmit} method="post" >
          <div className="name-box">    
            <div className="first-name-box">
            <label htmlFor="firstname"> First Name :-</label>
            <input type="text" name="firstname" onChange={signupchange}    value={signupdata.firstname}  id="firstname" placeholder="First name" className="singup-form-input" required/>
            </div>
            <div className="last-name-box">
            <label htmlFor="secondname"> Last Name :-</label>
            <input type="text" name="lastname" onChange={signupchange}   value={signupdata.lastname}  id="secondname" placeholder="Last name" className="singup-form-input"/>

            </div>
          </div>
            <label htmlFor="rollno">Enter your College RollNo :-</label>
            <input type="text" id="rollno" name="rollno"onChange={signupchange}   value={signupdata.rollno}  placeholder="ZA22-540 " className="singup-form-input" 
              pattern="[A-Z]{2}[0-9]{2-3} [A-Z]{0-100}-[0-9]{0-5}"   required/>

           <label htmlFor="gmail">Enter your gmail :-</label>
            <input type="email" name="gmail" onChange={signupchange} value={signupdata.gmail}  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
         id="gmail" placeholder="yourname@gmail.com" className="singup-form-input" required/>
            <div className="sigup-password-box">
              <div className="currnet-password-signin">
                <label htmlFor="password">Create password :-</label>
                <input type="password" id="password" name="password"onChange={signupchange}   value={signupdata.password} placeholder="Create a password" className="singup-form-input" required/>

              </div>
              <div className="new-password-signin">

                <label htmlFor="passwordcheck">Confirm password :-</label>
                <input type="password" id="passwordcheck" name="passwordcheck" onChange={signupchange}   value={signupdata.passwordcheck} placeholder="Re-enter your password"className="singup-form-input" />
              </div>
           
            </div>
            
            <input type="submit" value="Signup" className="signup-btn" />

        </form> 
        <hr style={{margin : '1rem 0'}} />
        <div className="already-account">
          <p>Already have an accout?</p>
           <Link to='/LogIn'>Log In</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
