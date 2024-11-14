import React, {Suspense}  from 'react'
import { Outlet } from 'react-router-dom'
import Loadingicon from '../Component/Jsonlicon/Loadingicon'
import Admine from '../Component/Admine/Admine'



const Allpages = () => {


 


  return (
   <> 
   {/* <Admine/> */}
      <Suspense fallback = {<Loadingicon/>}>   
        <Outlet/>
     </Suspense> 
  
   </>
  )
}

export default Allpages
