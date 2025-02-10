import React, { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Loadingicon from '../Component/Jsonlicon/Loadingicon'

import TitleSet from '../Component/TitleSet/TitleSet'




const Allpages = ({alart}) => {



  return (

    <>
 


        
        <Suspense fallback={<Loadingicon/>}>
         <TitleSet/>
 
   
          <Outlet />
          </Suspense>
    


    </>
  )
}

export default Allpages
