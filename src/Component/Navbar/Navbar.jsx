import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Departmentlistdata } from "../../Context/DepartmentList/DepartmentListContext";
import { UserContext } from "../../Context/UserContext/UserContextdata";
import { ScrollFilterContext } from "../../Context/FilterScroll/FilterScrollContex";
import { Userlogincheckcontext } from "../../Context/UserLoginContext/UserLoginContext";
import { AdminLoginContext } from '../../Context/AdminLoginCheck/AdminLoginCheck'
import { AlartContectValue } from "../../Context/AlartContext/AlartContext";

import Avatar from '@mui/material/Avatar';

import logo from '../../photo/weblogo.png'
import ModeSwitcher from "../ModeSwitcher/ModeSwitcher";



const Navbar = (props) => {
  const { usernav, setUsernav } = useContext(UserContext);
  let departmentdata = useContext(Departmentlistdata);
  const [departmetvalue, setDartmentvalue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticateduser, setIsAuthenticateduser] = useState(false);
  const [nav, setNav] = useState(false);
  const [locationCollege, setLocationCollege] = useState(false);
  const hideeSarchSuggestion = useRef();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { loginCheck, setCheck } = useContext(Userlogincheckcontext);
  const BothLoginRef = useRef();
  const LoginRef = useRef();
  const [isOn, setIsOn] = useState(false);
  const [authentication, setAuthentication] = useState(false);
  const check = useContext(AdminLoginContext);
  const [logotext, setLogotext] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const notificationref = useRef(null);
  const notificationIconRef = useRef(null);
  const closeNotification = useRef(null);
  const { filtersection } = useContext(ScrollFilterContext);
  const {showAlart} = useContext(AlartContectValue);


  const [logincheckdata, setLogincheckdata] = useState(false);










  useEffect(() => {
    const view = () => {
      if (window.innerWidth < 500) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    }
    view();

    window.addEventListener("resize", view);
    return () => window.removeEventListener('resize', view);
  }, [])



  useEffect(() => {
    const click = () => {

      setIsOn(false);
    }
    window.addEventListener('click', click);

    return () => window.removeEventListener('click', click);
  })

  const clickOn = (e) => {
    e.stopPropagation();
    setIsOn(!isOn);
  };


  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const isAdminLogin = sessionStorage.getItem('isAdminLogin');

  useEffect(() => {


    if (isLoggedIn) {  // Access the actual property
      setLogincheckdata(true);
    } else {

      setLogincheckdata(false);
    }

    if(isAdminLogin){
      setAuthentication(true);
    }else{
      setAuthentication(false);
    }
    
  }, []);
  // console.log(loginCheck);
  // console.log(logincheckdata);





  const deparmentChange = (e) => {
    setDartmentvalue(e.target.value);
    setShowSuggestions(true);
  }

 



  const onSearch = (searchdpt) => {
    // if (loginCheck) {

    setDartmentvalue(searchdpt);
    navigate("Filter", { state: { searchdpt } });
    // gotofilter();
    setDartmentvalue('');




  }





  const handleLogout = async () => {
    if (confirm("Are you sure want to  log out ?")) {

      try {
        const response = await axios.post('/api/logOut', { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticateduser(false);
          sessionStorage.removeItem('isLoggedIn');
          setUsernav('');
          setLogincheckdata(false);
          window.location.href = '/';
           showAlart("Log out", "Back to main page", 'check');
        }
      }
      catch (error) {
        console.error('Error in logout');
      }
    }
  };
  // useEffect(() => {
  //   if (!logincheckdata) {
  //     setIsAuthenticateduser(false);
  //   }
  // }, [logincheckdata, usernav])

  const hambargar = useRef();
  const crossicon = useRef();




  useGSAP(() => {

    const openTl = gsap.timeline({ paused: true });

    openTl
      .to(".slidebar", {
        left: 0,
        borderRadius: 0,
        duration: 0.5,
        ease: "power4.inOut",
      }, 'same')
      .from(".slidebar-title", {
        x: 200,
        duration: 1.5,
        stagger: 0.1,
        // opacity: 0,
        ease: "power2.out"
      }, 'same')
      .from(".cross-icon i", {
        y: -10,
        x: 0,
        opacity: 0,
        duration: 0.2,

      }, 'same')


      .from(".copywrite", {
        opacity: 0,
        duration: 0.15,
      }, 'same');

    const closeTl = gsap.timeline({ paused: true });

    closeTl
      .to(".slidebar", {
        left: '-100%',
        borderRadius: '0%',
        duration: 0.2,
        ease: "power2.out"
      }, 'sameclose');
    closeTl.to(".cross-icon i", {
      x: -100,
      opacity: 0,
      duration: 0.4,

    }, 'sameclose')

    const slideopen = () => {
      openTl.restart();
      gsap.to(".slidebar", {
        display: "block",
        duration: 0.01,
        ease: "power2.out"
      });
      document.body.style.overflow = "hidden";

    }

    hambargar.current.addEventListener("click", slideopen);


    crossicon.current.addEventListener("click", () => {
      closeTl.restart();
      document.body.style.overflow = "scroll";
    });

    const backToPage = () => {
      closeTl.restart();
    }


    const reback = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // glitch.current.addEventListener('click',backToPage);
    const refrasher = document.querySelectorAll(".slidebar-title a ,.slidebar-foot-item a");

    refrasher.forEach((e) => {
      e.addEventListener("click", () => {
        closeTl.restart();
        reback();

      });
    });

    return () => {
      window.removeEventListener('scroll', refrasher)
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

    let lastScrollY = window.scrollY;
    const handleTouchMove = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY >= 100) {
        // Scrolling down
        navbar.current.style.transform = "translateY(-100%)";
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        if(navbar.current){
          navbar.current.style.transform = "translateY(0%)";

        }
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: true });
      window.removeEventListener("scroll", handleTouchMove, { passive: true });
    };
  }, []);


  const getNavClass = (path) => {
    return location.pathname === path ? 'red' : '';
  };

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

  const filterRef = useRef();
  useEffect(() => {
    if (window.innerWidth <= 650) {
      if (location.pathname === '/' || location.pathname === '/Filter') {
        filterRef.current.style.display = 'flex';

      }
      else {
        filterRef.current.style.display = 'none';
      }
      setLogotext(true);
    } else {
      filterRef.current.style.display = 'flex';
      setLogotext(false);
    }

  }, [location.pathname])

  const [mobileScroll, setMobileScroll] = useState(true);

  useEffect(() => {
    const handlemobileScroll = () => {
      if (window.scrollY <= 250) {
        setMobileScroll(true);

      }
      else {
        setMobileScroll(false);
      }
    }
    window.addEventListener('scroll', handlemobileScroll, { passive: true });

    return () => window.removeEventListener('scroll', handlemobileScroll, { passive: true })
  }, [])

  useEffect(() => {
    const handlehide = (event) => {
      if (hideeSarchSuggestion.current && !hideeSarchSuggestion.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handlehide);

    return () => {
      document.removeEventListener("mousedown", handlehide);
    }
  })




  const wholenotificationbackRef = useRef();
  useGSAP(() => {


    const openTl = gsap.timeline({ paused: true });

    openTl
      .to(notificationref.current, {
        height : window.innerWidth <= 650 ? '100%' : '85vh',
        duration: 0.2,
        ease: "ease",
      }, 'same')




    const close = gsap.timeline({ paused: true });


    close.to(notificationref.current, {
      height : '0vh',
      duration: 0.2,
      ease: "power4.inOut",
    }, 'same2')
      // .to(wholenotificationbackRef.current, {
      //   left: "-100%",
      //   duration: 0.5,
      //   ease: "power4.inOut",
      // }, 'same2')


    const handlenotification = () => {
      const data = document.querySelector('#full-notification-back')
        data.style.width =window.innerWidth <= 650 ? '100%' : '85vh';
      openTl.restart();

    };

    const handlenotificationclose = () => {
      close.restart();
    };



    notificationIconRef.current.addEventListener("click", handlenotification);
    closeNotification.current.addEventListener("click", handlenotificationclose);


    return () => {
      notificationIconRef.current.removeEventListener("click", handlenotification);
      closeNotification.current.removeEventListener("click", handlenotificationclose);
    };
  });

  useEffect(() => {
    if (navbar.current) {

      if (props.navrefvalue) {

        props.navrefvalue(navbar.current);
      }
    }
  }, [navbar.current])

  return (
    <>
     <div ref={navbar}
        className={`navbar 
         ${nav ? "home-nav" : "black-nav"}
      ${location.pathname === '' ? (nav ? "home-nav" : "black-nav") : ""}
      ${location.pathname === '/Profile' ? "profile-nav" : ""}
      ${location.pathname === '/Contact-Us' ? "contact-nav" : ""}
      ${location.pathname === '/About-us' ? "about-nav" : ""}
      ${location.pathname === '/LogIn' ? "login-nav" : ""}
        `}
      >
        <div className="navber-box">
          <div ref={hambargar} className="hambargar">
            <i className="fa-solid fa-bars"></i>
          </div>
          {/* <div className="title-logo">
             <img src={titlelogo} alt="title" />
          </div> */}


          <div className="nav-list">
            <ul>
              <NavLink className={getNavClass('/api')} to="/"><li>Home</li></NavLink>
              <NavLink className={getNavClass('/Profile')} to="/Profile"><li>Profile</li></NavLink>
              <NavLink className={getNavClass('/Contact-Us')} to="/Contact-Us"><li>Contact Us</li></NavLink>
              <NavLink className={getNavClass('/About-us')} to="/About-us"><li>About us</li></NavLink>
            </ul>
          </div>



          <form onSubmit={(e) => {
            e.preventDefault();
            if (departmetvalue) {
              const isValid = departmentdata.some(
                (dept) => dept.toLowerCase() === departmetvalue.trim().toLowerCase()
              );

              if (isValid) {
                onSearch(departmetvalue);
              } else {
                 showAlart('Enter a valid department name', '', 'cancel');
              }

            } else {
               showAlart('Please Enter Department Name', '', 'cancel')
            }


          }} ref={filterRef} className={`filter-switch  ${mobileScroll ? "filter-switch-mobile" : "filter-switch-mobile-off"}`}>

            <input
              // ref={searchRef}
              type="text"
              name=""
              id="searchbox"
              placeholder="Search  Department Here"
              onChange={deparmentChange}
              value={departmetvalue}
            />

            <label htmlFor="searchbox" onClick={() => {

              if (departmetvalue) {
                const isValid = departmentdata.some(
                  (dept) => dept.toLowerCase() === departmetvalue.trim().toLowerCase()
                );

                if (isValid) {
                  onSearch(departmetvalue);
                } else {
                   showAlart('Enter a valid department name', '', 'cancel');
                }

              } else {
                 showAlart('Please Enter Department Name', '', 'cancel')
              }
            }}><i className="fa-solid fa-magnifying-glass"></i></label>
            {showSuggestions && (<div ref={hideeSarchSuggestion} className="search-suggestion">
              {departmetvalue ? (
                departmentdata && departmentdata.filter((item) => {
                  const data = item.toLowerCase();
                  const searchTerm = departmetvalue.toLowerCase();
                  return data.startsWith(searchTerm);
                }).length === 0 ? (
                  <div className="search-item">
                    <p>No Departments available</p>
                  </div>
                ) : (
                  departmentdata.filter((item) => {
                    const data = item.toLowerCase();
                    const searchTerm = departmetvalue.toLowerCase();
                    return data.startsWith(searchTerm) && data !== searchTerm;
                  }).map((departmentListdata, index1) => (
                    <div onClick={(e) => {
                      onSearch(departmentListdata)

                    }} className="search-item" key={index1}>
                      <p >{departmentListdata}</p>
                    </div>
                  ))
                )
              ) : null}
            </div>)}

          </form>

          {mobileScroll && logotext && (<h2 style={{ marginLeft: '0.2rem' }} className="logo-top-css" > STUDYVAULT</h2>)}
          <div className="location-login">
            {authentication && (<div className="admin-short" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '0.5rem' }}>
              <i className="fa-solid fa-user-shield" style={{ color: '#fff', fontSize: '1.6rem', cursor: 'pointer', paddingLeft: '0.3rem' }} onClick={() => navigate('/Admin')}></i>

            </div>)}
            {/* <ThemeToggle/> */}
           <select name="name" className={`college-name ${!mobileView ? 'college-box-home-on' : ''}`}>
              {!locationCollege ? (
                <option value="M.P.C autonomous">M.P.C Autonomous</option>

              ) : (<option value="M.P.C autonomous">M.P.C</option>)};

            </select>
            {/* <ModeSwitcher/> */}
   
            <div className="notificatonicon" style={{ margin: '0rem 1.3rem 0rem 0.3rem', userSelect: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ref={notificationIconRef}>
              <i className="fa-solid fa-bell" style={{ color: '#fff', cursor: 'pointer' }}></i>
            </div>


   
            {!logincheckdata ? (
              <div className="log-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div ref={BothLoginRef} onClick={clickOn}><li>Login <div className={`adminLogInBox ${isOn ? 'open' : 'close'} `} ref={LoginRef} >

                  <NavLink className={`${getNavClass('/LogIn')} ${isOn ? 'big' : 'small'}`} to="/LogIn"><i className="fa-solid fa-graduation-cap" ></i>Student LogIn </NavLink>
                  {!authentication ? (<NavLink to="/Admin/AdminLogIn" className={`${isOn ? 'big' : 'small'}`}><i className="fa-solid fa-user-tie"></i>Admin LogIn </NavLink>) : (<NavLink to="/Admin" className={`${isOn ? 'big' : 'small'}`}><i className="fa-solid fa-user-tie"></i>Admin Page</NavLink>)}
                </div>
                </li></div>
              </div>
            ) : (
              <div className="log-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <NavLink onClick={handleLogout} alt='Log Out' ><i className="fa-solid fa-right-from-bracket" style={{ margin: '0rem 0 0 0.5rem', color: '#fff' }}></i></NavLink>
              </div>
            )}
          </div>



        </div>
      </div>
       <div className="navbackcolordiv">

       </div>
      <div className="slidebar">
        <div className="cross-icon">
          <i ref={crossicon} className="fa-solid fa-xmark"></i>
        </div>
        <h3 style={{ margin: '2rem 0 0 0 ' }}>NAVIGATION</h3>
        <hr style={{ margin: '2rem 0' }} />
        <div className="slidebar-box">
          <h4 className="slidebar-title">
            <Link to="/" onClick={() => {
              document.body.style.overflow = "scroll";
            }}>
              <i className="fa-solid fa-house-chimney"></i>Home
            </Link>
          </h4>
          <h4 className="slidebar-title">
            <Link to="/Profile" onClick={() => {
              document.body.style.overflow = "scroll";
            }} >
              <i className="fa-solid fa-user"></i>Profile
            </Link>
          </h4>
          <h4 className="slidebar-title" >
            <Link to="/About-us" onClick={() => {
              document.body.style.overflow = "scroll";
            }}>
              <i className="fa-solid fa-pen"></i>About Us
            </Link>
          </h4>
          <h4 className="slidebar-title" >
            <Link to="/Contact-Us" onClick={() => {
              document.body.style.overflow = "scroll";
            }}>
              <i className="fa-solid fa-paper-plane"></i>Contact Us
            </Link>
          </h4>
        </div>
        <hr style={{ margin: '2rem 0' }} />
        <div className="copywrite">
          <p>Copyright 2024 All rights reserved |</p>
          <p>This website is made by</p>
          <p>Akash and Jitu  </p>
        </div>
        <div className="slidebar-foot-item">
          <NavLink to='/Privacy-Policy' onClick={() => {
            document.body.style.overflow = "scroll";
          }}> Privacy & Policy</NavLink>
          <p>V.1.5.3</p>
        </div>

      </div>
      {/* <div ref={glitch} className="glitchproblem"></div> */}

      
      <aside ref={notificationref} id='full-notification-back'>
        <aside ref={wholenotificationbackRef} id="notification">
          <h2>Notification <s></s>  <i className="fa-solid fa-xmark" style={{ cursor: 'pointer' }} ref={closeNotification}></i></h2>
          <h4>All</h4>
          <hr style={{ margin: '0rem 0rem 1.4rem 0rem' }} />

          <div className="notification-data" style={{ opacity: '1' }}>

            <div style={{ display: 'flex', alignItems: "center", gap: '0.6rem' }} className="each-notification">

              <Avatar alt="Remy Sharp" src={logo} sx={{ width: 24, height: 24, padding: '0rem 0rem 0 0', display: 'inline-block', }} />
              <h3>StudyVault Team</h3>

            </div>
            <p>Join Our <b style={{ fontWeight: '700' }}>Whatsapp Channel</b> to get new updates and type of question uploaded.</p>
          </div>
          <div className="notification-data">

            <div style={{ display: 'flex', alignItems: "center", gap: '0.6rem' }} className="each-notification">

              <Avatar alt="Remy Sharp" src={logo} sx={{ width: 24, height: 24, padding: '0rem 0rem 0 0', display: 'inline-block', }} />
              <h3>StudyVault Team</h3>

            </div>
            <p> Now you can access all <b style={{ fontWeight: '700' }}>Questions papers</b> without login.</p>
          </div>

        </aside>
      </aside>
    </>
  );
};

export default Navbar;


