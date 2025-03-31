import React, { useContext, useState } from 'react'
import './AdmineLogIn.css'
import BackButton from '../../Backbutton/Backbutton'
import back from '../../../photo/rb_6256.png'
import logo from '../../../photo/weblogo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AdminLoginContext } from '../../../Context/AdminLoginCheck/AdminLoginCheck'
import { AlartContectValue } from '../../../Context/AlartContext/AlartContext'
import ReCaptcha from '../../Captha/ReCaptha'



const AdmineLogIn = (props) => {
const [userid,setUserid] = useState('');
const [password,setPassword] = useState('');
const [isactive,setIsactive] = useState(false);
const {setCheck} = useContext(AdminLoginContext);
const {showAlart} = useContext(AlartContectValue);
   const shouldVerify = process.env.NODE_ENV === 'production';
   const [isVerified, setIsVerified] = useState(false);


const navigate = useNavigate();

const handleVerification = (status) => {
    setIsVerified(status); 
 
  };


const handleSubmit = async (e)=>{
    setIsactive(true);
    e.preventDefault();
    if (!isVerified && shouldVerify) {
        showAlart("Please complete the CAPTCHA before logging in.",'','cancel');
       setRepeatclick(false);
       setIsactive(false)

       return;
     }
    try{
        // alert();
        const response = await axios.post("/api/Admin/AdminLogIn", { userid, password ,withCredentials: true });
        
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

  return (
    <aside id = 'adMineLogIn'>
        <BackButton/>
        <div className="adMineLogIn-box">
            <img src={back} alt="BackLogo"  loading='lazy'/>
            <div className="leftAlogin ">

                <h2>Welcome Admin</h2> 
                <img src={logo} alt="Web Logo"  loading='lazy'/>

                <div className="adminloginlefttext">
                    <h3>We are Very Happy👏 <br /> Please Log in Into admin Panel (●'◡'●)</h3>
                </div>
                <button onClick={()=> navigate('/')}><i className="fa-solid fa-arrow-left" style={{color :'#fff' , padding : '0rem 0.6rem 0 0',fontSize : '1rem'}}></i>Back</button>
            </div>
            <div className="rightAlogin">
                <form  onSubmit={handleSubmit}>
                    <h3>Welcome Back Admin</h3>

                    <div className="useridlogin">
                        <label htmlFor="userid">User ID</label>
                        <input type="text" name = 'userid' id = 'userid' autoComplete='username' value={userid} onChange={(e)=>setUserid(e.target.value)}/>
                    </div>
                    <div className="useridlogin">
                        <label htmlFor="password">Password</label>
                        <input type="password" name = 'password' id = 'password' autoComplete="current-password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    </div>
                    {!isVerified && shouldVerify && (  <ReCaptcha onVerified={handleVerification} />)}
                    <button type="submit" disabled = {isactive} className={`${isactive ? 'blur' : 'clear' }`}>Sign In</button>
                    <NavLink> Forgate Password?</NavLink>
                     <button onClick={()=> navigate('/')}><i className="fa-solid fa-arrow-left" style={{color :'#fff' , padding : '0rem 0.6rem 0 0',fontSize : '1rem'}}></i>Back to Home</button>
                    </form>
            </div>

           

        </div>
    </aside>
  )
}

export default AdmineLogIn
