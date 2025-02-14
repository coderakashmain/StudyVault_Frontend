import React, { useContext, useEffect, useState } from 'react'
import './SubNav.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Userlogincheckcontext } from '../../Context/UserLoginContext/UserLoginContext'
import {User,LogIn} from 'lucide-react'
import { AlartContectValue } from '../../Context/AlartContext/AlartContext'


const SubNav = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const loginCheck = useContext(Userlogincheckcontext);
    const [usercheck, setUsercheck] = useState('');
    const {showAlart} = useContext(AlartContectValue);
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const backnavigate = () => {
        navigate('/');
    }

    const availablesoon = () => {
         showAlart("Available soon", '', 'mark')
    }

    useEffect(() => {
        if (isLoggedIn) {
            setUsercheck(true);
        }
        else {
            setUsercheck(false);
        }
    }, [])


    return (


        <nav id='sub-nav-component'>
            <section id='sub-nav'>
                <div className="back-to-home-nav same active" onClick={backnavigate}>
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
                <h1>StudyVault<sub>{props.subheadingtypedata.type ? props.subheadingtypedata.type : 'Resources'}</sub></h1>
              
                {!usercheck ? (<div className="search-metatrila same active" onClick={() => navigate('/LogIn')} >
                <LogIn  className='i'/>
                </div>) :
                    (<div className="search-metatrila same active" onClick={() => navigate('/Profile')} >
                   <User className='i'/> 
                    </div>)}
            </section>
            <section className="sub-to-sub-nav">
                <NavLink to='/Filter' className={location.pathname === '/Filter' ? 'sub-nav-active' : ''} >Question</NavLink>
                <NavLink to='/Filter/syllabus'className={location.pathname === '/Filter/syllabus' ? 'sub-nav-active' : ''}>Syllabus</NavLink>
                <NavLink to='/Filter/Notes' >Notes</NavLink>
                <NavLink to='/Filter' onClick={availablesoon}>Books</NavLink>
                <NavLink to='/article-section' className={location.pathname === '/article-section' ? 'sub-nav-active' : ''} >Article</NavLink>
            </section>

        </nav>


    )
}

export default SubNav
