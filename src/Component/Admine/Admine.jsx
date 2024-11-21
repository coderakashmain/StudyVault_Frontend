import React, { useContext, useEffect, useState } from 'react'
import './Admine.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';

import { AdminLoginContext } from '../../Context/AdminLoginCheck/AdminLoginCheck';

const Admine = (props) => {
 const navigate = useNavigate();
 const {check,setCheck} = useContext(AdminLoginContext);
 const {isactive,setIsactive} = useState(false);


 useEffect(() => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
      // If no token, redirect to login page
      navigate('/Admin/AdminLogIn');
      props.showAlart('Unautherized', '', 'mark');
  } else {
      // If token exists, verify it on the server
      const checkAuthorization = async () => {
          try {
              const response = await axios.get('/api/adminPage',{
                headers: {
                  Authorization: `Bearer ${token}` // Include the token in the Authorization header
                },
              }, { withCredentials: true });
              if (response.status === 200) {
                  // Token is valid, show alert for authorized access
                  props.showAlart('Authorized', '', 'check');
              }
          } catch (error) {
              // Handle unauthorized or other errors
              if (error.response && error.response.status === 401) {
                  props.showAlart('Unauthorized', '', 'cancel');
                  
              } else {
                  props.showAlart('Error verifying token', '', 'cancel');
              }
              navigate('/Admin/AdminLogIn');  // Redirect to login page if unauthorized
          }
      };

      checkAuthorization();
  }
}, []);

const handleLogout = () => {
  localStorage.removeItem('admin_token');
  navigate('/Admin/AdminLogIn');
  props.showAlart('Logged out successfully', '', 'check');
  setIsactive(!isactive);
  setCheck(isactive);

};



 
  return (
    <section id="admin">
      <div className="admin-nav">
        <h2><i className="fa-solid fa-gauge-high" style={{ color : '#fff', padding : '0rem 1rem', fontSize : '1.6rem'}}></i>Admin Dashboard</h2>
        <h2 style={{ fontWeight : '500'}}> StudyVault</h2>
       
        <div className="rightAselectbox">
        <i className="fa-solid fa-house-chimney" style={{color : '#fff',cursor : 'pointer', fontSize : '1.1rem' , paddingRight : '1rem'}} onClick={()=> navigate('/')}></i>
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
            <NavLink to= 'Note'><h2><i className="fa-solid fa-book-open"></i>Note</h2></NavLink>
            <NavLink to= 'Usersend'><h2><i className="fa-regular fa-folder-closed"></i>User Send</h2></NavLink>
            <NavLink to= 'CsUpload'><h2><i className="fa-solid fa-computer"></i>Cs Upload</h2></NavLink>
            <NavLink to= 'LogOut'><h2><i className="fa-solid fa-right-from-bracket"></i>Log Out</h2></NavLink>
            

          </div>
          <div className="admin-right-box">
              <Outlet/>
          </div>
      </div>
    </section>
  )
}

export default Admine
