import React, { useEffect, useRef, useState } from 'react'
import './CollegeArticle.css'
import image5 from '../ArticlePhotoes/Colleges/MPCautoCollege/mpc5.jpg'
import { useNavigate } from 'react-router-dom'

const CollegeAritcle = () => {
  const navigate = useNavigate();
  const collegeContentRef = useRef();
  const collegetitleRef = useRef();
  const collegeimageRef = useRef();

  const gotolink = ()=>{
    navigate('/article-section/colleges-article/mpc-article');
  }

  const handleMouseOver = () => {
    collegetitleRef.current.style.textDecoration = 'underline'
    collegeimageRef.current.style.opacity = "0.7";
  };

  const handleMouseOut = () => {
    collegetitleRef.current.style.textDecoration = 'none'
    collegeimageRef.current.style.opacity = "1";
  };

  return (
    <section id='college-article'>
      <div className="college-article-box">
        <h1>Colleges</h1>
        <div className="college-article-content" onClick={gotolink} ref={collegeContentRef}onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut} >
          <div className="mpc-image-1-college-home">
            <img src={image5}  onClick={gotolink} ref={collegeimageRef} />
          </div>
          <div className="mpc-link-to-read-article">
            <h2 ref={collegetitleRef} onClick={gotolink}>M.P.C Autonomous College : History of Mpc autonomous college
               The Rich Legacy of Maharaja Purna Chandra Autonomous College.</h2>
               <p>Maharaja Purna Chandra Autonomous College, popularly known as MPC Autonomous College, is one of Odisha's oldest and premier institutions of higher education. Established in July 1948 in post-independence India, the college holds a place of pride in the educational landscape of... <strong onClick={gotolink}>more</strong></p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CollegeAritcle
