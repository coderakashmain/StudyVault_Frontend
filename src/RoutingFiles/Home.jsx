import React, { useEffect } from 'react'
import Scrollbtn from "../Component/Scrollbtn/Scrollbtn"
import Footer from '../Pages/Home/FooterS/Footer'
import HomeT from '../Pages/Home/HomeS/HomeT'
import { Outlet } from 'react-router-dom'
import MessageBox from '../Pages/MessageBox/MessageBox'
import Review from '../Pages/Home/Review/Review'
import UploadSection from '../Pages/Home/UploadSection/UploadSection'
import SectionSelector from '../Component/SectionSelector/SectionSelector'
import CollegeInfo from '../CollegeInfo/CollegeInfo'
import Navbar from '../Component/Navbar/Navbar'

// import Filter from './FilterS/Filter'

const Home = (props) => {


  

  return (
   <>
   <Navbar showAlart={props.showAlart} />
        <Scrollbtn/>
        <HomeT title = {'Your StudyVault'} titlepara = {'Welcome to StudyVault, Get all Previous Year Question Papers of M.P.C Autonomous college. We shall try to provides note also. So I gonna help you in your all exams if you make me your exam Bff😊. '}/>
        <SectionSelector showAlart={props.showAlart}/>
        {/* <MessageBox /> */}
      <Outlet />
      <UploadSection showAlart={props.showAlart}/>
      {/* <Review/> */}
      <CollegeInfo/>
        <Footer/>
   </>
  )
}

export default Home
