import React, { useEffect, useState ,useRef} from 'react'
import './CollegeInfo.css'
import logo6 from '../Article/ArticlePhotoes/Colleges/MPCautoCollege/mpc5.jpg'
import logo2 from './College Photoes/unnamed.jpg'
import logo3 from './College Photoes/College3.jpg'
import logo4 from './College Photoes/College4.jpg'
import logo5 from './College Photoes/College5.jpg'
import { NavLink, useNavigate } from 'react-router-dom'
import HomeAdd1 from '../Component/AddSense/HomeAdd1'
import AritcleAds from '../Component/AddSense/AritcleAds'
const CollegeInfo = () => {
    var [count,setCount] = useState(0);
    const sliderRef = useRef(null);

    const image = [
        logo6,
        logo3,
        logo5,
        logo4,
        logo2,
    ]
    
    useEffect(()=>{
        const slides = sliderRef.current.querySelectorAll('.slide');
        slides.forEach((slide,index)=>{
            slide.style.left = `${index * 100}%`;
        });

        const interval = setInterval(() => {
            setCount((prevCount) => {
              if (prevCount >= slides.length - 1) {
                return 0; // Reset to the first slide
              }
              return prevCount + 1; // Move to the next slide
            });
          }, 5000);
      
          // Cleanup interval
          return () => clearInterval(interval);
    },[])   

    useEffect(() => {
        const slides = sliderRef.current.querySelectorAll(".slide");
    
        // Apply the sliding effect
        slides.forEach((slide) => {
          slide.style.transform = `translateX(-${count * 100}%)`;
        });
      }, [count]);

      

    
   
  return (
    <>
    {/* <hr  /> */}
    <section id='college-info-out-box'>
      <div className="ads-center">
      {/* <HomeAdd1/> */}

      </div>
      <div id='college-info'>
        <aside className="college-photos college-info-boxes">
            <div className="college-photos-box" ref={sliderRef}>
                {image.map((image,index)=>(
                       <img src={image} alt="college photo" className='slide' key={index}  />
                ))}
                
            </div>
           
        </aside>
        <aside className="college-detail college-info-boxes">
            <h1>M.P.C Autonomous College </h1>
            <p>Curious about the rich history of our college? This article unveils its rich history, remarkable milestones, and enduring impact on generations of learners.</p>
            <br />
            <p>Named in honor of the visionary Maharaja Purna Chandra Bhanja Deo, the progressive ruler of the former princely state of Mayurbhanj, our college has been a beacon of higher education since July 1948. For decades, it has not only served the educational aspirations of Odisha but also welcomed learners from neighboring states, fostering a vibrant and diverse academic community.

</p>
            <br />
            <p>Over the years, the institution has flourished, reaching new heights of excellence and adding countless accolades to its ever-growing legacy of success....</p>
             <NavLink to="/article-section/colleges-article/mpc-article" >Explore <span style={{color : '#fff', fontWeight : '900'}}>↗</span></NavLink>
        </aside>
             </div>
             <div className="ads-center">

          <AritcleAds background = "var( --notificationbackcolor )"/>
             </div>
    </section>
    </>
  )
}

export default CollegeInfo


