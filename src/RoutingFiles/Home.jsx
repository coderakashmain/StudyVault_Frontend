import React from 'react'
import Scrollbtn from "../Component/Scrollbtn/Scrollbtn"
import Footer from '../Pages/Home/FooterS/Footer'
import HomeT from '../Pages/Home/HomeS/HomeT'
import { Outlet } from 'react-router-dom'
import Review from '../Pages/Home/Review/Review'

// import Filter from './FilterS/Filter'

const Home = () => {
  return (
   <>
        <Scrollbtn/>
        <HomeT title = {'Your StudyVault'} titlepara = {'Welcome to StudyVault, your one-stop solution for accessing a wide array of academic resources and papers across multiple departments. I am help you in your all exams if you make me your exam Bff😊.'}/>
      <Outlet />
      <Review/>
        <Footer/>
   </>
  )
}

export default Home
