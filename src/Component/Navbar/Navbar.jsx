import React, { useEffect, useState } from "react";
import "./Navbar.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NavLink ,Link } from "react-router-dom";




const Navbar = () => {
  useGSAP(() => {
    const hambargar = document.querySelector(".hambargar");
    const crossicon = document.querySelector(".cross-icon i");

    const openTl = gsap.timeline({ paused: true });

    openTl
      .to(".slidebar", {
        left: 0,
        duration: 0.3,
      })
      .from(".slidebar-title", {
        x: 100,
        duration: 0.3,
        stagger: 0.2,
        opacity: 0,
      })
      .from(".cross-icon i", {
        y: -10,
        opacity: 0,
        duration: 0.2,
      })
      .from(".copywrite", {
        opacity: 0,
        duration: 0.15,
      });

    const closeTl = gsap.timeline({ paused: true });

    closeTl.to(".slidebar", {
      left: -950,
      duration: 0.4,
    });

    hambargar.addEventListener("click", () => {
      openTl.restart();
      gsap.to('.slidebar',{
        display:'block',
        duration : 0.01
      })
    });

    crossicon.addEventListener("click", () => {
      closeTl.restart();
    });
    const refrasher = document.querySelectorAll('.slidebar-title');

    refrasher.forEach((e)=>{
      e.addEventListener('click',()=>{
        gsap.to('.slidebar',{
          display : 'none',
          duration: 0.01
        })
      })
    })
   
  });
  const [nav, setNav] = useState(false);
  
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setNav(true);

      } else {
        setNav(false);
      }
    });
    let isScrollingDown = false;
   

    window.addEventListener("wheel", (ele) => {
      if (window.scrollY >= 100) {
        if (ele.deltaY <= 0) {
          if (!isScrollingDown) {
            isScrollingDown = true;
            navbar.style.transform = "translateY(0%)";
          }
        } else {
        
          if (isScrollingDown) {
            isScrollingDown = false;
            navbar.style.transform = "translateY(-100%)";
          }
        }
      } else {
        navbar.style.transform = "translateY(0%)";
      }
    });


  }, []);
  const [homenav, setHomenav] = useState(false);
  const [profilenav, setProfilenav] = useState(false);
  const [contactnav, setContactnav] = useState(false);
  const [aboutnav, setAboutnav] = useState(false);
  const [loginnav, setLoginnav] = useState(false);

  return (
    <>
      <div className={`navbar
        ${nav ? "home-nav" : "black-nav"}
        ${homenav ? (nav ? "home-nav" : "black-nav") : "" }
        ${profilenav ? "profile-nav" : "" }
        ${contactnav ? "contact-nav" : "" }
        ${aboutnav ? "about-nav" : "" }
        ${loginnav ? "login-nav" : "" }
        `}> 
        <div className="navber-box">
          <div className="hambargar">
            <i  className="fa-solid fa-bars"></i>
          </div>
          <div className="nav-list">
            <ul>
              <NavLink className={(e)=>{return e.isActive ? `red ${setHomenav(true)}`  : `${setHomenav(false)}`}} to="/"><li>Home</li></NavLink>
              <NavLink className={(e)=>{return e.isActive ? `red ${setProfilenav(true)}` : ` ${setProfilenav(false)}`}} to="/Profile"><li>Profile</li></NavLink>
              <NavLink className={(e)=>{return e.isActive ? `red ${setContactnav(true)}` : ` ${setContactnav(false)}`}} to="/Contact"><li>Contact Us</li></NavLink>
              <NavLink className={(e)=>{return e.isActive ? `red ${setAboutnav(true)}` :  ` ${setAboutnav(false)}`}} to="/About-us"><li>About us</li></NavLink>
            </ul>
          </div>
          <div className="log-in">
            <NavLink className={(e)=>{return e.isActive ? `red ${setLoginnav(true)}` :  ` ${setLoginnav(false)}`}} to="/LogIn"><li>Log in</li></NavLink>
          </div>
        </div>
      </div>
      <div className="slidebar">
        <div className="cross-icon">
        <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="slidebar-box">
          <h4 className="slidebar-title">
            <Link to="/">
              <i className="fa-solid fa-house-chimney"></i>Home
            </Link>
          </h4>
          <h4 className="slidebar-title">
            <Link to="/Profile">
              <i className="fa-solid fa-user"></i>Profile
            </Link>
          </h4>
          <h4 className="slidebar-title">
            <Link to="#">
              <i className="fa-solid fa-pen"></i>About Us
            </Link>
          </h4>
          <h4 className="slidebar-title">
            <Link to="/Contact">
              <i className="fa-solid fa-paper-plane"></i>Contact Us
            </Link>
          </h4>
        </div>
        <div className="copywrite">
          <p>Copyright 2024 All rights reserved |</p>
          <p>This website is made by</p>
          <p>akashjitu.com </p>
        </div>
        <div className="slidebar-foot-item">
          <p>V.1.0.1</p>
        </div>
      </div>
      <div className="glitchproblem">

      </div>
    </>
  );
};

export default Navbar;
