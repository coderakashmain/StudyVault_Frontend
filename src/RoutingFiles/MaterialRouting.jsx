import React, { useEffect } from 'react'
import SubNav from '../Component/SubNav/SubNav'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Home/FooterS/Footer'
import ErrorBoundary from '../Component/ErrorBoundary/ErrorBoundary'
import Review from '../Pages/Home/Review/Review'

  
const MaterialRouting = (props) => {
    useEffect(()=>{
      window.scrollTo(0,0);
    },[])
  
  return (
    <section style={{ position : 'relative', zIndex : '1000'}}>

   <ErrorBoundary> <SubNav showAlart = {props.showAlart} subheadingtypedata = {props.subheadingtypedata}/></ErrorBoundary>
    <Outlet/>
    <Review showAlart = {props.showAlart}/>
    <ErrorBoundary>  <Footer/></ErrorBoundary>
    </section>
  )
}

export default MaterialRouting
