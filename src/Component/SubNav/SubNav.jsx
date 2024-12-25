import React from 'react'
import './SubNav.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'



const SubNav = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const backnavigate = () => {
        navigate('/');
    }

    const availablesoon = ()=>{
        props.showAlart("Available soon", '','mark')
    }
    return (
        
     
            <nav id='sub-nav-component'>
                <section id='sub-nav'>
                <div className="back-to-home-nav same active" onClick={backnavigate}>
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
                <h1>StudyVault<sub>{props.subheadingtypedata.type ? props.subheadingtypedata.type : 'Resources'}</sub></h1>
                <div className="search-metatrila same active" onClick={()=>navigate('/LogIn')} >
                <i className="fa-solid fa-right-to-bracket"></i>
                </div>
                </section>
                <section className="sub-to-sub-nav">
                <NavLink to ='/Filter' className={location.pathname === '/Filter' ? 'sub-nav-active'  : ''} >Question</NavLink>
                <NavLink to ='/Filter/syllabus'  className={location.pathname === '/Filter/syllabus' ? 'sub-nav-active'  : ''}>Syllabus</NavLink>
                <NavLink to ='/Filter' onClick={availablesoon}>Notes</NavLink>
                <NavLink to ='/Filter' onClick={availablesoon}>Books</NavLink>
                <NavLink to ='/article-section' className={location.pathname === '/article-section' ? 'sub-nav-active'  : ''} >Article</NavLink>
                </section>

       </nav>

       
    )
}

export default SubNav
