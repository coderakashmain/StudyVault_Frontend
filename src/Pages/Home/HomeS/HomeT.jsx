import React, { useContext, useEffect, useState } from "react";
import "./HomeT.css";
import "remixicon/fonts/remixicon.css";
import Image from "../../../photo/homelogo3.png";
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../photo/logo-transparent-png.png'
import axios from "axios";
import { UserContext } from "../../../Context/UserContext/UserContextdata";





const HomeT = (props) => {
  const navigate = useNavigate();
  const {usernav} = useContext(UserContext);
  const[userlogincheck,setUserlogincheck] = useState();

  useEffect(()=>{
    const userlogin = async()=>{
      
      try { 
        const response = await axios.get('/api/signup-check',{withCredentials : true});
        
        if(response.status === 200){
          setUserlogincheck(true);
      }
      else{
        setUserlogincheck(false);
      }
    }

      catch (error) {
        console.error('Error fetching profile');
        setUserlogincheck(false);
    }
  }
  userlogin();
  },[usernav]);


  return ( 
    <>
      <div className="main-container">
        <div className="landing-section">
          <div className="inner-landing">
            <div className="home-info">
              <div  className="home-info-h1-logo">
                <h1>Hi! I Am</h1>
                <div className="h1-box">
                 
                    <img src={logo} alt="web logo" loading="lazy"/>
                </div>
              </div>
              <h2>{props.title}</h2>
              <p>
                {props.titlepara}
              </p>
              <div className="live-count">
                <div className="counts">
                  <h3>500K+</h3>
                  <p>Users visite this app</p>
                </div>
                <div className="counts">
                  <h3>20K+</h3>
                  <p>Users use this app</p>
                </div>
                <div className="counts">
                  <h3>1K+</h3>
                  <p>Total Resources download </p>
                </div>
              </div>
              <div className="buttons-home">
                <button onClick={() => {
                  navigate('About-us');
                }}>Read me</button>
               {!userlogincheck && ( <Link to="/LogIn/Signup">
                  Sign Up <i className="fa-solid fa-arrow-right"></i>
                </Link>)}
              </div>
            </div>
            <div className="home-image-section">
              <div className="background-image">
                <img src={Image} alt="not found" loading="lazy"/>
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
