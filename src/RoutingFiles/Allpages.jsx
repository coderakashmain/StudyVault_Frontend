import React, {Suspense, useEffect, useState}  from 'react'
import { Outlet } from 'react-router-dom'
import Loadingicon from '../Component/Jsonlicon/Loadingicon'
import Admine from '../Component/Admine/Admine'
import ReCaptha from '../Component/Captha/ReCaptha'




const Allpages = () => {

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
 
  useEffect(() => {
    // Logic to check if captcha is verified, for example by checking a cookie or local storage
    const captchaStatus = localStorage.getItem('captchaVerified');
    if (captchaStatus === 'true') {
      setIsCaptchaVerified(true);
    }
  }, []);

  const handleCaptchaSuccess = () => {
    // Handle the success of captcha verification
    setIsCaptchaVerified(true);
    localStorage.setItem('captchaVerified', 'true');
  };

  return (


   <> 
    {!isCaptchaVerified && <ReCaptha onCaptchaSuccess={handleCaptchaSuccess} />}

      <Suspense fallback = {<Loadingicon/>}>   

        <Outlet/>
     </Suspense> 
  
   </>
  )
}

export default Allpages
