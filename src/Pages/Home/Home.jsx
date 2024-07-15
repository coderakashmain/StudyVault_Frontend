import React from 'react'
import Departmentlist from './DepartmentlistS/Departmentlist'
import Scrollbtn from "../../Component/Scrollbtn/Scrollbtn"
import Footer from './FooterS/Footer'
import HomeT from './HomeS/HomeT'

const Home = () => {
  return (
   <>
        <Scrollbtn/>
        <HomeT/>
        <Departmentlist/>
        <Footer/>
   </>
  )
}

export default Home
