import React, { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Loadingicon from '../Component/Jsonlicon/Loadingicon'
import ReCaptha from '../Component/Captha/ReCaptha'
import TitleSet from '../Component/TitleSet/TitleSet'



const Allpages = (props) => {

  const [isVerified, setIsVerified] = useState(() => {
    // Check if user is already verified in session storage
    return sessionStorage.getItem('isVerified') === 'true';
  });

  const handleVerification = (status) => {
    setIsVerified(status); // Update state after successful verification
    sessionStorage.setItem('isVerified', status); // Persist verification in session storage
  };





  return (

    <>
 
      {!isVerified ? (
       
          <ReCaptha onVerified={handleVerification} />
       

      ) : (
        
        <Suspense fallback={<Loadingicon/>}>
         <TitleSet/>
   
          <Outlet />
          </Suspense>
    
       )}   

    </>
  )
}

export default Allpages
