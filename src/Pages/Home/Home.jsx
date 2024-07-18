import React from 'react'
import Scrollbtn from "../../Component/Scrollbtn/Scrollbtn"
import Footer from './FooterS/Footer'
import HomeT from './HomeS/HomeT'
import { Outlet } from 'react-router-dom'

// import Filter from './FilterS/Filter'

const Home = () => {
  return (
   <>
        <Scrollbtn/>
        <HomeT/>
        <Outlet/>
        <Footer/>
   </>
  )
}

export default Home
