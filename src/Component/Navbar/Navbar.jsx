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
  const loginCheck = useContext(Userlogincheckcontext);
  const [logincheckdata, setLogincheckdata] = useState()
  useEffect(()=>{
    if(loginCheck){

      setLogincheckdata(true);
    }
    else{
      
      setLogincheckdata(false);
    }
    
  },[loginCheck]);
  console.log("hello ",loginCheck);


  
 


  const deparmentChange = (e) => {
    setDartmentvalue(e.target.value);
    setShowSuggestions(true);
  }

  const {filtersection} = useContext(ScrollFilterContext);
  const gotofilter = () => {
    
      filtersection.scrollIntoView({ behavior: 'smooth' });
   

  };





  useEffect(() => {

    const fetchProfile = async () => {

      try {
        const response = await axios.get('/api', { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticateduser(true);
        }
        else {
          setIsAuthenticateduser(false);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);

        if (error.response && error.response.status === 401) {
          setIsAuthenticateduser(false);
        } else {
          console.error('Unexpected error:', error.response?.data || error.message);
        }
      }

    }
    fetchProfile();
  }, [usernav]);



  const onSearch = (searchdpt) => {
    // if (isAuthenticateduser) {

      setDartmentvalue(searchdpt);
      navigate("Filter", { state: { searchdpt } });
      gotofilter();
      setDartmentvalue('');
    // }
    // else {
    //   props.showAlart('Login first');
    //   navigate("/Login");
    // }

  } 

 
   


  const handleLogout = async () => {
    if (confirm("Are you sure want to  log out ?")) {

      try {
        const response = await axios.post('/api/logOut', { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticateduser(false);
          setUsernav(null);
          navigate("/");
          props.showAlart("Log out", "Back to main page");
        }
      }
      catch (error) {
        console.error('Error in logout');
      }
    }
  };
  useEffect(()=>{
    if(!logincheckdata){
      setIsAuthenticateduser(false);
    }
  },[logincheckdata])

  const hambargar = useRef();
  const crossicon = useRef();




  useGSAP(() => {

    const openTl = gsap.timeline({ paused: true });

    openTl
      .to(".slidebar", {
        left: 0,
        borderRadius : 0,
        duration: 0.5,
        ease: "power4.inOut",
      },'same')
      .from(".slidebar-title", {
        x: 200,
        duration: 1.5,
        stagger: 0.1,
        // opacity: 0,
        ease: "power2.out"
      },'same')
      .from(".cross-icon i", {
        y: -10,
        x: 0,
        opacity: 0,
        duration: 0.2,
        
      },'same')
     
      
      .from(".copywrite", {
        opacity: 0,
        duration: 0.15,
      },'same');

    const closeTl = gsap.timeline({ paused: true });

    closeTl
    .to(".slidebar", {
      left: -1000,
      borderRadius : 50,
      duration: 1.3,
      ease: "power2.out"
    },'sameclose');
    closeTl.to(".cross-icon i", {
      x: -100,
      opacity:0,
      duration: 0.4,
      
    },'sameclose')

    const slideopen = () => {
      openTl.restart();
      gsap.to(".slidebar", {
        display: "block",
        duration: 0.01,
        ease: "power2.out"
      });


    }

    hambargar.current.addEventListener("click", slideopen);


    crossicon.current.addEventListener("click", () => {
      closeTl.restart();
    });

    const backToPage = () => {
      closeTl.restart();
    }


    const reback = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // glitch.current.addEventListener('click',backToPage);
    const refrasher = document.querySelectorAll(".slidebar-title a");

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
        navbar.current.style.transform = "translateY(0%)";
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
  useEffect(()=>{
    if(window.innerWidth <= 650){
      if(location.pathname === '/' || location.pathname === '/Filter'){
        filterRef.current.style.display = 'flex';
      }
      else{
        filterRef.current.style.display = 'none';
      }
    }else{
      filterRef.current.style.display = 'flex';
    }
   
  },[location.pathname])

  const [mobileScroll , setMobileScroll] = useState(true);

  useEffect(()=>{
    const handlemobileScroll = ()=>{
      if(window.scrollY <= 250){
        setMobileScroll(true);

      }
      else{
        setMobileScroll(false);
      }
    }
    window.addEventListener('scroll',handlemobileScroll,{passive : true});

    return ()=> window.removeEventListener('scroll',handlemobileScroll,{passive : true})
  },[])

  useEffect(()=>{
    const handlehide = (event)=>{
      if(hideeSarchSuggestion.current && !hideeSarchSuggestion.current.contains(event.target)){
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handlehide);

    return ()=>{
      document.removeEventListener("mousedown", handlehide);
    }
  })


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

          <div ref={filterRef} className={`filter-switch ${mobileScroll && "filter-switch-mobile"}`}>
            <input
              // ref={searchRef}
              type="text"
              name=""
              id="searchbox"
              placeholder="Search  Department Here"
              onChange={deparmentChange}
              value={departmetvalue}
            />

            <label htmlFor="searchbox"><i className="fa-solid fa-magnifying-glass"></i></label>
          { showSuggestions && (<div ref={hideeSarchSuggestion} className="search-suggestion">
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
                  }).map((departmentListdata, index) => (
                    <div onClick={(e) => {
                      onSearch(departmentListdata)

                    }} className="search-item" key={index}>
                      <p >{departmentListdata}</p>
                    </div>
                  ))
                )
              ) : null}
            </div>)}

          </div>

          <div className="location-login">
            <select name="name" id="college-name">
              {!locationCollege ? (
                <option value="M.P.C autonomous">M.P.C Autonomous</option>

              ) : (<option value="M.P.C autonomous">M.P.C</option>)};

            </select>
            {!isAuthenticateduser ? (
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
          <i ref={crossicon} className="fa-solid fa-xmark"></i>
        </div>
        <h3 style={{margin : '2rem 0 0 0 '}}>NAVIGATION</h3>
        <hr style={{margin : '2rem 0'}}/>
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
        <hr style={{margin : '2rem 0'}}/>
        <div className="copywrite">
          <p>Copyright 2024 All rights reserved |</p>
          <p>This website is made by</p>
          <p>Akash and Jitu  </p>
        </div>
        <div className="slidebar-foot-item">
          <p>V.1.0.1</p>
        </div>
      </div>
      {/* <div ref={glitch} className="glitchproblem"></div> */}
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
