import React, { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Loadingicon from '../Component/Jsonlicon/Loadingicon'

import TitleSet from '../Component/TitleSet/TitleSet'
import IntroLoader from '../Component/IntroLoader/IntroLoader'




const Allpages = ({alart}) => {



  return (

    <>
 


        
        <Suspense fallback={<Loadingicon/>}>
         <TitleSet/>
         {/* <IntroLoader/> */}
 
   
          <Outlet />
          </Suspense>
    


    </>
  )
}

export default Allpages
