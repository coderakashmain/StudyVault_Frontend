import React from 'react'
import Scrollbtn from "../Component/Scrollbtn/Scrollbtn"
import Footer from '../Pages/Home/FooterS/Footer'
import HomeT from '../Pages/Home/HomeS/HomeT'
import { Outlet } from 'react-router-dom'
// import Review from '../Pages/Home/Review/Review'

// import Filter from './FilterS/Filter'

const Home = () => {
  return (
   <>
        <Scrollbtn/>
        <HomeT title = {'Your StudyVault'} titlepara = {'Welcome to StudyVault, Get all Previous Year Question Papers of M.P.C Autonomous college. We are try to provides note also. So I gonna help you in your all exams if you make me your exam Bff😊. '}/>
      <Outlet />
      {/* <Review/> */}
        <Footer/>
   </>
  )
}

export default Home
