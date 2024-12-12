import React, { useEffect, useRef, useState } from 'react'
import './SectionSelector.css'
import { NavLink, useLocation } from 'react-router-dom';

const SectionSelector = (props) => {
    const location = useLocation();
    const sectionRef = useRef();
    const [questionactive,setQustionactive] = useState(false);

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
      <div className="section-selector-inside">
            <NavLink to= '/' className='sectoin-on active'>Questions</NavLink>
            <NavLink to= '#' className='sectoin-off active' onClick={popup}>Syllabus</NavLink>
            <NavLink to= '#'className='sectoin-off active' onClick={popup}>Notes</NavLink>
            <NavLink to= '#' className='sectoin-off active' onClick={popup}>Books</NavLink>
      </div>
    </aside>
  )
}

export default SectionSelector
