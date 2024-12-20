import React, { useEffect, useRef, useState } from 'react'
import './SectionSelector.css'
import { NavLink, useLocation } from 'react-router-dom';

const SectionSelector = (props) => {
    const location = useLocation();
    const sectionRef = useRef();
    // const [questionactive,setQustionactive] = useState(false);

    // useEffect(()=>{
    //     if(location.pathname === '/'){
    //         setQustionactive(true);
    //     }
    // },location.pathname)

    const popup = ()=>{
        props.showAlart('Available Soon', '','mark');
    }
  
  return (
    <aside id="section-selector" ref={sectionRef} >
      <div className="section-selector-inside section-selector-common" >
            <NavLink to= '/' className={` ${location.pathname === '/' ? 'section-on' : 'section-nutral ' } active`}>Questions</NavLink>
            <NavLink to= '' className='section-off active' onClick={popup}>Syllabus</NavLink>
            <NavLink to= ''className='section-off active' onClick={popup}>Notes</NavLink>
            <NavLink to= '' className='section-off active' onClick={popup}>Books</NavLink>
      </div>
      <div className="section-selector-inside-right  section-selector-common">
      <NavLink to= '/article-section' className={` ${location.pathname === '/article-section' ? 'section-on' : 'section-nutral ' } active`}>Article</NavLink>
      </div>
    </aside>
  )
}

export default SectionSelector
