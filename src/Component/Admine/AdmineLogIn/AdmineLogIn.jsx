import React, { useContext, useState } from 'react'
import './AdmineLogIn.css'
import BackButton from '../../Backbutton/Backbutton'
import back from '../../../photo/rb_6256.png'
import logo from '../../../photo/weblogo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AdminLoginContext } from '../../../Context/AdminLoginCheck/AdminLoginCheck'


const AdmineLogIn = (props) => {
const [userid,setUserid] = useState('');
const [password,setPassword] = useState('');
const [isactive,setIsactive] = useState(false);
const {setCheck} = useContext(AdminLoginContext);

const navigate = useNavigate();

const handleSubmit = async (e)=>{
    setIsactive(true);
    e.preventDefault();
    try{
        const respone = await axios.post('/api/Admin/AdminLogIn',  {  userid, password  },{withCredentials : true});
        if(respone.status === 200){
            const token = respone.data.token;
            localStorage.setItem('admin_token', token);
            props.showAlart('LogIn Seccessfully',"","check");
            setUserid('');
            setPassword('');
            setIsactive(false);
            navigate('/Admin');
            setCheck(isactive);
        }
    }catch(error){
        if(error.response && error.response.status === 400){
            props.showAlart('Invalid Credentials', "",'mark');
            setIsactive(false);
        }
        if(error.response && error.response.status === 500){
            props.showAlart('Internal Server Error', "",'cancel');
            setIsactive(false);
        }
        else{
            props.showAlart('Invalid Credentials',"",'cancel');
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
                    <h3>We are Very Happy👏 <br /> Pleas Log in Into admin Panel (●'◡'●)</h3>
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
