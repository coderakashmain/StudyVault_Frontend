import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from "../Pages/Home/FooterS/Footer"
import AritcleHeader from '../Article/AritcleHeader/AritcleHeader'
import ErrorBoundary from '../Component/ErrorBoundary/ErrorBoundary'


const ArticleContainerRouter = () => {
  return (
    <section style={{ position : 'relative', zIndex : '10000000',backgroundColor : 'rgb(242 244 246)'}}>
    
    <ErrorBoundary> <AritcleHeader/></ErrorBoundary> 
   
      <Outlet/>
    <ErrorBoundary>  <Footer/></ErrorBoundary>
    </section>
  )
}

export default ArticleContainerRouter
