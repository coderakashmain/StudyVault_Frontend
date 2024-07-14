import React, { useEffect, useState } from "react";
import "./Navbar.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


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
    });

    crossicon.addEventListener("click", () => {
      closeTl.restart();
    });
  });
  const [nav, setNav] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setNav(true);
      } else {
        setNav(false);
      }
    });
    const navbar = document.querySelector(".navbar");
    let isScrollingDown = false;
   

    window.addEventListener("wheel", (ele) => {
      if (window.scrollY >= 200) {
        // document.querySelector('.log-in a').style.color = 'red';
        // document.querySelector('.nav-list a').style.color = 'red';
        if (ele.deltaY >= 0) {
          // Scrolling down
          if (!isScrollingDown) {
            isScrollingDown = true;
            navbar.style.transform = "translateY(-100%)";
          }
        } else {
          // Scrolling up
          if (isScrollingDown) {
            isScrollingDown = false;
            navbar.style.transform = "translateY(0)";
          }
        }
      } else {
        navbar.style.transform = "translateY(0)";
      }
    });
  }, []);
  return (
    <>
      <div className={`navbar ${nav ? "nav-blur" : ""}`}>
        <div className="navber-box">
          <div className="hambargar">
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="nav-list">
            <ul>
              <li><a  href="/">Home</a></li>
              <li><a  href="/ContactUs">Contact Us</a></li>
              <li><a  href="/AboutUs">About us</a></li>
            </ul>
          </div>
          <div className="log-in">
            <a href="/Profile">Log in</a>
          </div>
        </div>
      </div>
      <div className="slidebar">
        <div className="cross-icon">
          <i className="ri-close-line"></i>
        </div>
        <div className="slidebar-box">
          <h4 className="slidebar-title">
            <a href="/">
              <i className="fa-solid fa-house-chimney"></i>Home
            </a>
          </h4>
          <h4 className="slidebar-title">
            <a href="/Profile">
              <i className="fa-solid fa-user"></i>Profile
            </a>
          </h4>
          <h4 className="slidebar-title">
            <a href="#">
              <i className="fa-solid fa-pen"></i>About Us
            </a>
          </h4>
          <h4 className="slidebar-title">
            <a href="#">
              <i className="fa-solid fa-paper-plane"></i>Contact Us
            </a>
          </h4>
        </div>
        <div className="copywrite">
          <p>Copyright 2024 All rights reserved |</p>
          <p>This website is made by</p>
          <p>akashjitu.com</p>
        </div>
        <div className="slidebar-foot-item">
          <p>V.1.0.1</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
