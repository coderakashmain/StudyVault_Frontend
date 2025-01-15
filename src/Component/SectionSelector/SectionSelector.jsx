import React, { useContext, useEffect, useRef, useState } from 'react'
import './SectionSelector.css'
import { NavLink, useLocation } from 'react-router-dom';
import { ScrollFilterContext } from '../../Context/FilterScroll/FilterScrollContex';

const SectionSelector = (props) => {
    const location = useLocation();
    const sectionRef = useRef();
    const {filtersection} = useContext(ScrollFilterContext);
   
    const popup = ()=>{
        props.showAlart('Available Soon', '','mark');
    }
  
    // const gotofilter = () => {
    //   filtersection.scrollIntoView({ behavior: 'smooth' });
  
  
    // };
  
  
  return (
    <aside id="section-selector" ref={sectionRef} >
      <div className="section-selector-inside section-selector-common" >
            <NavLink to= '/Filter'   className={` ${location.pathname === '/Filter' ? 'section-on' : 'section-nutral ' } active`}>Questions</NavLink>
            <NavLink to= '/Filter/syllabus' className={` ${location.pathname === '/Filter/syllabus' ? 'section-on' : 'section-nutral ' } active`} >Syllabus</NavLink>
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
