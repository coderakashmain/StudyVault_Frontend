import React from 'react'
import HomeT from '../Pages/Home/HomeS/HomeT'
import SectionSelector from '../Component/SectionSelector/SectionSelector'
import { Outlet } from 'react-router-dom'
import Footer from "../Pages/Home/FooterS/Footer"
import AritcleHeader from '../Article/AritcleHeader/AritcleHeader'


const ArticleContainerRouter = () => {
  return (
    <section style={{ position : 'relative', zIndex : '10000000',backgroundColor : 'var(--notificationbackcolor)'}}>
      {/* <HomeT title = {'Your StudyVault'} titlepara = {'Welcome to StudyVault, Get all Previous Year Question Papers of M.P.C Autonomous college. We shall try to provides note also. So I gonna help you in your all exams if you make me your exam Bff😊. '}/> */}
      <AritcleHeader/>
      {/* <SectionSelector/> */}
      <Outlet/>
      <Footer/>
    </section>
  )
}

export default ArticleContainerRouter
