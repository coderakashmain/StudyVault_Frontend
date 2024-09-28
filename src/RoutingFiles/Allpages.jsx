import React, {Suspense}  from 'react'
import { Outlet } from 'react-router-dom'
import Loadingicon from '../Component/Jsonlicon/Loadingicon'
import Preloader from '../Component/Preloader/Preloader'



const Allpages = () => {


 


  return (
   <> 
      <Preloader/>
      <Suspense fallback = {<Loadingicon/>}>   
        <Outlet/>
     </Suspense> 
  
   </>
  )
}

export default Allpages
