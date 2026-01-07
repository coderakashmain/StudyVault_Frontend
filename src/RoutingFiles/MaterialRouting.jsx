import React, { useEffect } from 'react'
import SubNav from '../Component/SubNav/SubNav'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Home/FooterS/Footer'
import ErrorBoundary from '../Component/ErrorBoundary/ErrorBoundary'


  
const MaterialRouting = (props) => {
    useEffect(()=>{
      window.scrollTo(0,0);
    },[])
  
  return (
    <section style={{ position : 'relative', zIndex : '1000'}}>

    <SubNav subheadingtypedata = {props.subheadingtypedata}/>
    <Outlet/>

     <Footer/>
    </section>
  )
}

export default MaterialRouting
