import React from 'react'
import SubNav from '../Component/SubNav/SubNav'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Home/FooterS/Footer'

const MaterialRouting = (props) => {
  return (
    <>

    <SubNav showAlart = {props.showAlart} subheadingtypedata = {props.subheadingtypedata}/>
    <Outlet/>
      <Footer/>
    </>
  )
}

export default MaterialRouting
