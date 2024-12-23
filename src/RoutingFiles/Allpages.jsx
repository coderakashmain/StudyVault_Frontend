import React, {Suspense, useEffect, useState}  from 'react'
import { Outlet } from 'react-router-dom'
import Loadingicon from '../Component/Jsonlicon/Loadingicon'
import ReCaptha from '../Component/Captha/ReCaptha'
import Navbar from '../Component/Navbar/Navbar'
import SiteKeyContext from '../Context/SiteKeyContextT/SiteKeyContext '






const Allpages = (props) => {

  const [isVerified, setIsVerified] = useState(false); // Track verification status
  
  const handleVerification = (status) => {
   
    setIsVerified(status); // Update state after successful verification
  };
 
  return (

    <>
 
    {!isVerified ? (
     <SiteKeyContext>
      <ReCaptha onVerified={handleVerification} />
      </SiteKeyContext>
  
    ) : (

      <Suspense fallback={<Loadingicon />}>
       
        <Outlet />
      </Suspense>
    )}
   
  </>
  )
}

export default Allpages
