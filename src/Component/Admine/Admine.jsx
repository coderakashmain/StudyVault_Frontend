import React, { useContext, useEffect, useState } from 'react'
import './Admine.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';

import { AdminLoginContext } from '../../Context/AdminLoginCheck/AdminLoginCheck';
import { AlartContectValue } from '../../Context/AlartContext/AlartContext';


const Admine = (props) => {
 const navigate = useNavigate();
 const {check,setCheck} = useContext(AdminLoginContext);
 const [loading,setLoading]= useState(true);
 const {showAlart} = useContext(AlartContectValue)




 useEffect(() => {



      const checkAuthorization = async (e) => {
       
        try {
            const response = await axios.get("/api/adminPage",{withCredentials : true});
              if (response.status === 200) {
        
                setCheck(true);
                setLoading(false);
                   showAlart('Authorized', '', 'check');
              }
          } catch (error) {
         
              if (error.response && error.response.status === 500) {
                   showAlart('Internal Error', '', 'cancel');
                 
              }  
              if (error.response && error.response.status === 400 || error.response && error.response.status === 401) {
                   showAlart('You are not Autherized', '', 'cancel');
                  
              } 
              if (error.response && error.response.status === 405) {
                   showAlart('Log in expired', '', 'cancel');
                  
              } 
              else {
                   showAlart('Error verifying user', '', 'cancel');
              }
              setCheck(false);
              navigate('/Admin/AdminLogIn');  
          }
      };

      checkAuthorization();

}, []);

const handleLogout = async () => {
  try{
   const response =  await axios.post("/api/Admin/logout");
   
    window.location.href = "/Admin/AdminLogIn";
      sessionStorage.clear('isAdminLogin');
     showAlart('Logged out successfully', '', 'check');

    setCheck(false);
  }catch(error){
    console.error(error);
    //  showAlart('Failed to log out', '', 'cancel');
     showAlart(
      `Unexpected Error (${error.response.status})`,
      error.response.statusText || "",
      'cancel'
  );
  }

};
 if (!check) {
    return <div style={{ background : 'white',position: 'absolute', left: '0', top: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center ', justifyContent: 'center', fontSize: '2rem', height: '100vh', width: '100%',zIndex : '10000' }}>Hey... Are you want to cheat Us ?</div>;
  };
  if (loading) {
    return <p style={{background : 'white', margin: "100px 0 0 50px" ,position : 'relative',zIndex : '10000',display : 'flex', justifyContent : 'center', alignItems : 'center'}}>Loading...</p>;

  }


 
  return (
    <>
    <section id="admin">
      <div className="admin-nav">
        <h2><i className="fa-solid fa-gauge-high" style={{ color : '#fff', padding : '0rem 1rem', fontSize : '1.6rem'}}></i>Admin Dashboard</h2>
        <h2 style={{ fontWeight : '500'}}> StudyVault</h2>
       
        <div className="rightAselectbox">
        <i className="fa-solid fa-house-chimney active" style={{color : '#fff',cursor : 'pointer', fontSize : '1.1rem' , paddingRight : '1rem'}} onClick={()=> navigate('/')}></i>
        <select name="admin-data" id="">
          <option value="">Akash</option>
        </select>
        <i className="fa-solid fa-right-from-bracket" onClick={handleLogout} style={{padding : '0rem 0rem 0rem 1rem', color: "#fff",cursor : 'pointer', fontSize : '1.1rem'}}></i>
        </div>
      </div>
      <div className="admin-box">
          <div className="admin-left-box">
            <NavLink to= ''><h2><i className="fa-solid fa-gauge-high"></i>Dashboard</h2></NavLink>
            <NavLink to= 'Question'><h2><i className="fa-solid fa-newspaper" ></i>Question</h2></NavLink>
            <NavLink to= 'syllabusupload'><h2><i className="fa-solid fa-newspaper" ></i>Syllabus</h2></NavLink>
            <NavLink to= 'Notes'><h2><i className="fa-solid fa-book-open"></i>Note</h2></NavLink>
            <NavLink to= 'Usersend'><h2><i className="fa-regular fa-folder-closed"></i>User Send</h2></NavLink>
            <NavLink to= 'CsUpload'><h2><i className="fa-solid fa-computer"></i>Cs Upload</h2></NavLink>
            <NavLink to= 'LogOut'><h2><i className="fa-solid fa-right-from-bracket"></i>Log Out</h2></NavLink>
            

          </div>
          <div className="admin-right-box">
              <Outlet/>
          </div>
      </div>
    </section>
    </>
  )
}

export default Admine
