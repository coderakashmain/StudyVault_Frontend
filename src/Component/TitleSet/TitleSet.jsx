import React,{useEffect} from 'react'
import { useLocation } from 'react-router-dom';


const TitleSet = () => {
    let location;
    try {
      location = useLocation();
    } catch {
      console.warn('useLocation() called outside a <Router>');
      location = { pathname: '/' }; // Default to the home route
    }
  

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
  return  null
}

export default TitleSet
