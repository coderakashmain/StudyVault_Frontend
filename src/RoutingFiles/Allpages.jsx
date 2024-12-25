import React, { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Loadingicon from '../Component/Jsonlicon/Loadingicon'
import ReCaptha from '../Component/Captha/ReCaptha'
import Navbar from '../Component/Navbar/Navbar'
import SiteKeyContext from '../Context/SiteKeyContextT/SiteKeyContext '



const Allpages = (props) => {

  const [isVerified, setIsVerified] = useState(false); // Track verification status

  const handleVerification = (status) => {

    setIsVerified(status); // Update state after successful verification
  };



  const location = useLocation();

  const defaultTitle = 'StudyVault - Access all previous years question papers and free notes from M.P.C Autonomous College.';

  useEffect(() => {
    // Set title based on the current route
    switch (location.pathname) {
      case '/Profile':
        document.title = 'Profile- StudyVault'
        break;
      case '/Contact-Us':
        document.title = 'Contact Us -StudyVault'
        break;
      case '/About-us':
        document.title = 'About Us - StudyVault'
        break;
      case '/Filter':
        document.title = 'Find Material- StudyVault'
        break;
      case '/Downloadpdf':
        document.title = 'Download File- StudyVault'
        break;
      case '/LogIn':
        document.title = 'Student Login- StudyVault'
        break;

      case '/LogIn/ForgatePw':
        document.title = 'Reset Your Password- StudyVault'
        break;
      case '/Admin/AdminLogIn':
        document.title = 'Admin Login- StudyVault'
        break;
      case '/Admin':
        document.title = 'Admin Dashboard- StudyVault'
        break;
      case '/article-section':
        document.title = 'Article Section- StudyVault'
        break;
      case '/article-section/colleges-article':
        document.title = 'Article Section - Colleges - StudyVault'
        break;
      case '/Privacy-Policy':
        document.title = 'Privacy Policy  - StudyVault'
        break;
      case '/Terms-Conditions':
        document.title = 'Terms & Conditions  - StudyVault'
        break;
      default:
        document.title = defaultTitle;
        break;
    }
  }, [location]);

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
