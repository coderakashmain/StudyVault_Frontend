import React ,{useState} from 'react'
import Preloader from '../Component/Preloader/Preloader'
// import Navbar from '../Component/Navbar/Navbar'
import { Outlet } from 'react-router-dom'


const Allpages = () => {


 


  return (
   <>
      
        <Preloader/>
        <Outlet/>
  
   </>
  )
}

export default Allpages
