import React  from 'react'
import { Outlet } from 'react-router-dom'
import Preloader from '../Component/Preloader/Preloader'


const Allpages = () => {


 


  return (
   <>
      <Preloader/>
        <Outlet/>
  
   </>
  )
}

export default Allpages
