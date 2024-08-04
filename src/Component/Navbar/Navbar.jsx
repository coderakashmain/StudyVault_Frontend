import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
// import titlelogo from "../../photo/logo-color .png"



const Navbar = (props) => {



  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nav, setNav] = useState(false);
  const [locationCollege, setLocationCollege] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure want to  log out ?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
      props.showAlart("Log out", "Back to main page");
      setIsAuthenticated(false);
    }
  };

  const hambargar = useRef();
  const crossicon = useRef();
  const glitch = useRef();

  useGSAP(() => {

    const openTl = gsap.timeline({ paused: true });

   
    openTl
      .to(".slidebar", {
        left: 0,
        duration: 0.4,

      })
      .from(".slidebar-title", {
        x: 100,
        duration: 0.6,
        stagger: 0.3,
        opacity: 0,
        ease: "power2.out"
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

      const handleopen = ()=>{
        openTl.restart();
  
        gsap.to(".slidebar", {
          display: "block",
          duration: 0.01,
          onComplete: () => {
            // body.style.overflow = 'hidden';
          }
        });
      };
      const hamopensliderbar = ()=>{
          handleopen();
      }


    const closeTl = gsap.timeline({ paused: true });

    const handleclose = ()=>{
      closeTl.restart();
      closeTl.to(".slidebar", {
        left: -950,
        duration: 1.3,
        onComplete: () => {
          // body.style.overflow = '';
        }
      });
  
    }
    const crossbacksliderbar = () => {
      glitch.current.style.display = 'none';
      handleclose();
    };
   
    if(hambargar.current){
      hambargar.current.addEventListener("click",handleopen);
    };
    if(crossicon.current){

      crossicon.current.addEventListener("click", handleclose);
    };

    
    const backfromslidbar = () => {
      glitch.current.style.display = 'none';
      handleclose();
    }
    
    if(glitch.current){

      glitch.current.addEventListener('click', backfromslidbar, { passive: true });
    };




    const refrasher = document.querySelectorAll(".slidebar-title a");

    const backLinkClick  = ()=>{
      glitch.current.style.display = 'none';
        gsap.to(".slidebar", {
          display: "none",
          duration: 0.01,
        });
    }


    refrasher.forEach((e) => {
      e.addEventListener("click",backLinkClick);
    });

    return ()=>{
      
    if(hambargar.current){
      hambargar.current.removeEventListener("click",handleopen);
    };

    if(crossicon.current){

      crossicon.current.removeEventListener("click", crossbacksliderbar);
    };

    if(glitch.current){

      glitch.current.removeEventListener('click', backfromslidbar, { passive: true });
    };
    refrasher.forEach((e) => {
      e.removeEventListener("click", backLinkClick);
    });

    }
  });

  const navbar = useRef();;
  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setNav(true);
      } else {
        setNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let isScrollingDown = false;
    const handleWheel = (ele) => {
      if (window.scrollY >= 100) {
        if (ele.deltaY <= 0) {
          if (!isScrollingDown) {
            isScrollingDown = true;
            navbar.current.style.transform = "translateY(0%)";
          }
        } else {
          if (isScrollingDown) {
            isScrollingDown = false;
            navbar.current.style.transform = "translateY(-100%)";
          }
        }
      } else {
        navbar.current.style.transform = "translateY(0%)";
      }
    };
    window.addEventListener("wheel", handleWheel);



    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: true });
      window.removeEventListener('wheel', handleWheel, { passive: true });
    }
  }, []);
  const glithback = () => {

    setTimeout(() => {
      glitch.current.style.display = 'block';
    }, 350);
    document.body.style.overflow = 'hidden';
  }

  const getNavClass = (path) => {
    return location.pathname === path ? 'red' : '';

  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname],)
  // const searchRef = useRef();
  // const onSearch = ()=>{
  //   const input = searchRef.current;
  //   const filter= input.value.toUpperCase();

  //   const list = document.querySelectorAll('.department p');

  //   list.forEach((el)=>{
  //     const text = el.textContent.toUpperCase();
  //     el.style.display = text.includes(filter)  ? '' : 'none';
  //   });
  // }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setLocationCollege(true);

      }
      else {
        setLocationCollege(false);
      };
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, [])



  return (
    <>
      <div ref={navbar}
        className={`navbar 
         ${nav ? "home-nav" : "black-nav"}
      ${location.pathname === '/' ? (nav ? "home-nav" : "black-nav") : ""}
      ${location.pathname === '/Profile' ? "profile-nav" : ""}
      ${location.pathname === '/Contact-Us' ? "contact-nav" : ""}
      ${location.pathname === '/About-us' ? "about-nav" : ""}
      ${location.pathname === '/LogIn' ? "login-nav" : ""}
        `}
      >
        <div className="navber-box">
          <div ref={hambargar} onClick={glithback} className="hambargar">
            <i className="fa-solid fa-bars"></i>
          </div>
          {/* <div className="title-logo">
             <img src={titlelogo} alt="title" />
          </div> */}


          <div className="nav-list">
            <ul>
              <NavLink className={getNavClass('/')} to="/"><li>Home</li></NavLink>
              <NavLink className={getNavClass('/Profile')} to="/Profile"><li>Profile</li></NavLink>
              <NavLink className={getNavClass('/Contact-Us')} to="/Contact-Us"><li>Contact Us</li></NavLink>
              <NavLink className={getNavClass('/About-us')} to="/About-us"><li>About us</li></NavLink>
            </ul>
          </div>

          <div className="filter-switch">

            <input
              // ref={searchRef}
              type="text"
              name=""
              id="searchbox"
              placeholder="Search your department"
            // onChange={onSearch}
            />
            <label htmlFor="searchbox"><i className="fa-solid fa-magnifying-glass"></i></label>

          </div>

          <div className="location-login">
            <select name="name" id="college-name">
              {!locationCollege ? (
                <option value="M.P.C autonomous">M.P.C Autonomous</option>

              ) : (<option value="M.P.C autonomous">M.P.C</option>)};

            </select>
            {!isAuthenticated ? (
              <div className="log-in">
                <NavLink className={getNavClass('/LogIn')} to="/LogIn"><li>Login</li></NavLink>
              </div>
            ) : (
              <div className="log-in">
                <NavLink onClick={handleLogout} ><li>Logout</li></NavLink>
              </div>
            )}
          </div>

        </div>
      </div>
      <div className="slidebar">
        <div className="cross-icon">
          <i onClick={() => {
            glitch.current.style.display = 'none';

          }} ref={crossicon} className="fa-solid fa-xmark"></i>
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
            <Link to="/About-us">
              <i className="fa-solid fa-pen"></i>About Us
            </Link>
          </h4>
          <h4 className="slidebar-title">
            <Link to="/Contact-Us">
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
      <div ref={glitch} className="glitchproblem"></div>
    </>
  );
};

export default Navbar;

// const [activeStatus,setActiveStatus] = useState(false);

// const handleActive = (e)=>{
//       if(e.isActive){
//         setActiveStatus(true);
//       }
//       else{
//         setActiveStatus(false)
//       }
// }
