import React, { useContext, useState } from 'react'
import './AdmineLogIn.css'
import BackButton from '../../Backbutton/Backbutton'
import back from '../../../photo/rb_6256.png'
import logo from '../../../photo/weblogo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import useApi from '../../../hooks/useApi'
import { AdminLoginContext } from '../../../Context/AdminLoginCheck/AdminLoginCheck'
import { AlartContectValue } from '../../../Context/AlartContext/AlartContext'
import ReCaptcha from '../../Captha/ReCaptha'



const AdmineLogIn = (props) => {
const [userid,setUserid] = useState('');
const [password,setPassword] = useState('');
const [isactive,setIsactive] = useState(false);
const {setCheck,setAdminToken} = useContext(AdminLoginContext);

const {showAlart} = useContext(AlartContectValue);
   const shouldVerify = process.env.NODE_ENV === 'production';
   const [isVerified, setIsVerified] = useState(false);

const { post } = useApi();
const navigate = useNavigate();

const handleVerification = (status) => {
    setIsVerified(status); 
 
  };


const handleSubmit = async (e)=>{
    setIsactive(true);
    e.preventDefault();
    if (!isVerified && shouldVerify) {
        showAlart("Please complete the CAPTCHA before logging in.",'','cancel');
       setIsactive(false);

       return;
     }
    try{
        const response = await post('/admin/login', false, { userid, password });
            setAdminToken(response.admintoken);
             showAlart('LogIn Seccessfully',"","check");
            setUserid('');
            setPassword('');
            sessionStorage.setItem('isAdminLogin','true'); 
            setIsactive(false);
            window.location.href = "/Admin";
            setCheck(isactive);
 
    }catch (error) {
        console.log('Error object:', error); 
    
        if (error.response) {
            if (error.response.status === 400) {
                 showAlart('Invalid Credentials', "", 'cancel');
                setIsactive(false);
                return; 
            }
            if (error.response.status === 500) {
                 showAlart('Internal Server Error', "", 'cancel');
                setIsactive(false);
                return; 
            }
            else {
            
                 showAlart(
                    `Unexpected Error (${error.response.status})`,
                    error.response.statusText || "",
                    'cancel'
                );
                setIsactive(false);
            }
        } else {
             showAlart('An unknown error occurred', "", 'cancel');
            setIsactive(false);
        }
    }

};

  const IconShield = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );

  return (
    <aside id='adMineLogIn'>
        <div className="adMineLogIn-box">
            <div className="rightAlogin">
                <div className="admin-login-brand">
                  <IconShield />
                  <span>StudyVault Admin</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <h3>Welcome back</h3>
                    <span className="admin-login-sub">Sign in to your admin panel</span>

                    <div className="useridlogin">
                        <label htmlFor="userid">User ID</label>
                        <input type="text" name = 'userid' id = 'userid' autoComplete='username' value={userid} onChange={(e)=>setUserid(e.target.value)}/>
                    </div>
                    <div className="useridlogin">
                        <label htmlFor="password">Password</label>
                        <input type="password" name = 'password' id = 'password' autoComplete="current-password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    </div>
                    {!isVerified && shouldVerify && (<ReCaptcha onVerified={handleVerification} />)}
                    <button type="submit" disabled={isactive} className={`${isactive ? 'blur' : 'clear'}`}>Sign In</button>
                    <NavLink>Forgot Password?</NavLink>
                    <button onClick={() => navigate('/')}>← Back to Home</button>
                    </form>
            </div>
        </div>
    </aside>
  )
}

export default AdmineLogIn
