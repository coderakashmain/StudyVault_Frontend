import React, {Suspense}  from 'react'
import { Outlet } from 'react-router-dom'
import Loadingicon from '../Component/Jsonlicon/Loadingicon'



const Allpages = () => {


 


  return (
   <> 
      <Suspense fallback = {<Loadingicon/>}>   
        <Outlet/>
     </Suspense> 
  
   </>
  )
}

export default Allpages
