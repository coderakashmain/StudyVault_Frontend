import React, { useContext, useEffect, useState } from "react";
import "./HomeT.css";
import "remixicon/fonts/remixicon.css";
import Image from "../../../photo/homelogo3.png";
import Imagew from "../../../photo/homelogo3.webp";
import Imagea from "../../../photo/homelogo3.avif";
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../photo/weblogo.png'
import logow from '../../../photo/weblogo.webp'
import logoa from '../../../photo/weblogo.avif'
import axios from "axios";
import { UserContext } from "../../../Context/UserContext/UserContextdata";
import { Userlogincheckcontext } from "../../../Context/UserLoginContext/UserLoginContext";





const HomeT = (props) => {
  
  const navigate = useNavigate();
  const {usernav} = useContext(UserContext);
  const[userlogincheck,setUserlogincheck] = useState();
  const  loginCheck = useContext(Userlogincheckcontext);

  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  useEffect(()=>{
  //   const userlogin = async()=>{
      
  //     try { 
  //       const response = await axios.get('/api/signup-check',{withCredentials : true});
        
  //       if(response.status === 200){
  //         setUserlogincheck(true);
  //     }
  //     else{
  //       setUserlogincheck(false);
  //     }
  //   }

  //     catch (error) {
  //       console.error('Error fetching profile');
  //       setUserlogincheck(false);
  //   }
  // }
  // userlogin();

  if(isLoggedIn){
    setUserlogincheck(true);
  }else{
    setUserlogincheck(false);
  }
  },[isLoggedIn]);


  return ( 
    <>
      <div className="main-container">
        <div className="landing-section">
          <div className="inner-landing">
            <div className="home-info">
              <div  className="home-info-h1-logo">
             
              <h1 style={{position : 'absolute', top : '-100%',left : '-100%', opacity : '0'}} >All Previous Year Question Papers of M.P.C Auto.</h1>

                <h1>Hi! I Am</h1>
                <div className="h1-box">
                 <picture >
                  <source srcSet={logoa} type="image/avif"/>
                  <source srcSet={logow} type="image/webp"/>
                  <img  src={logo} alt="web logo" loading="lazy"/>
                 </picture>
                </div>
              </div>
              <h1 className="header-sub-head">{props.title}</h1>
              <p>
                {props.titlepara}
              </p>
              <div className="live-count">
                <div className="counts">
                  <h3>91.3K+</h3>
                  <p>Users visite this app</p>
                </div>
                <div className="counts">
                  <h3>8K+</h3>
                  <p>Users use this app</p>
                </div>
                <div className="counts">
                  <h3>1K+</h3>
                  <p>Total Resources downloaded </p>
                </div>
              </div>
              <div className="buttons-home">
                <button onClick={() => {
                  navigate('About-us');
                }}>Read me</button>
               { !userlogincheck && ( <Link to="/LogIn/Signup">
                  Sign Up <i className="fa-solid fa-arrow-right"></i>
                </Link>)}
              </div>
            </div>
            <div className="home-image-section">
              <div className="background-image">
                <picture>
                <source srcSet={Imagea} type="image/avif"/>
                <source srcSet={Imagew} type="image/webp"/>
                <img src={Image} alt="not found" loading="lazy"/>
                
                </picture>
             
              </div>
              <div className="overfolw-box box-one">
                <i className="fa-solid fa-cloud"></i>
                <div>
                  <h2>Questions Papers</h2>
                  <p>I am always for you Here</p>
                </div>
              </div>
              <div className="overfolw-box box-two">
                <i className="fa-solid fa-file-pdf"></i>
                <div>
                  <h2>Notes</h2>
                  <p>I also provide you Notes</p>
                </div>
              </div>
              <div className="overfolw-box box-three">
                <i className="fa-solid fa-id-card-clip"></i>
                <div>
                  <h2>Documnets</h2>
                  <p>You can save you college document Securly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomeT;
