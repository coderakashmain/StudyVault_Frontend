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
        <HomeT title = {'Your StudyVault'} titlepara = {'Welcome to StudyVault, your one-stop solution for accessing a wide array of academic resources and papers across multiple departments. I am help you in your all exams if you make me your exam Bff😊.'}/>
      <Outlet />
      <Reviews/>
        <Footer/>
   </>
  )
}

export default Home
