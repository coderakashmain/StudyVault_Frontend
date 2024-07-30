import React from 'react'
import Scrollbtn from "../Component/Scrollbtn/Scrollbtn"
import Footer from '../Pages/Home/FooterS/Footer'
import HomeT from '../Pages/Home/HomeS/HomeT'
import Reviews from '../Pages/Home/Review/Rewvies'
import { Outlet } from 'react-router-dom'

// import Filter from './FilterS/Filter'

const Home = () => {
  return (
   <>
        <Scrollbtn/>
        <HomeT/>
      <Outlet />
      <Reviews/>
        <Footer/>
   </>
  )
}

export default Home
