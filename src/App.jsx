import "./App.css";

import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";

const Filter = lazy(()=> import("./Pages/Home/FilterS/Filter"));
// import Filter from './Pages/Home/FilterS/Filter';
const Departmentlist = lazy(()=> import("./Pages/Home/DepartmentlistS/Departmentlist"));
const Login = lazy(()=> import("./Pages/Login/Login"));
import Downloadpdf from "./Pages/Home/FilterS/Downloadpdf/Downloadpdf";
const ForgatePw = lazy(()=> import("./Pages/Login/ForgatePw/ForgatePw"));
const Allpages = lazy(()=> import("./RoutingFiles/Allpages"));



import DepartmentListContext  from "./Context/DepartmentList/DepartmentListContext";
import UserContextdata from "./Context/UserContext/UserContextdata";
import FilterScrollContex from "./Context/FilterScroll/FilterScrollContex";
import PhoneInfo from "./Context/PhoneInfo/PhoneInfo";
import UserLoginContext from "./Context/UserLoginContext/UserLoginContext";
const Admine = lazy(()=> import("./Component/Admine/Admine"));
const Dashboard = lazy(()=> import("./Component/Admine/Dashboard/Dashboard"));
const Question = lazy(()=> import("./Component/Admine/Question/Question"));

const UserSend = lazy(()=> import("./Component/Admine/UserSend/UserSend"));
const CsUpload = lazy(()=> import("./Component/Admine/CsUpload/CsUpload"));
import FetchData  from "./Context/FretchDataContext/FetchData";
import AdminLoginCheck  from "./Context/AdminLoginCheck/AdminLoginCheck";
const ArticleContainerRouter = lazy(() => import("./RoutingFiles/ArticleContainerRouter"));
const CollegeArticleRouter = lazy(() => import("./Article/CollegeArticle/CollegeArticleRouter"));
import ArticleSubheading  from "./Context/ArticleSubheading/ArticleSubheading";
import Navbar from "./Component/Navbar/Navbar";


const NoteUpload = lazy(() => import("./Component/Admine/NoteUpload/NoteUpload"));
const Alart = lazy(() => import("./Component/Alart/Alart"));
const MaterialRouting = lazy(() => import("./RoutingFiles/MaterialRouting"));
const PaymentStatus = lazy(() => import("./Pages/CashfreePay/PaymentStatus"));
const PaymentRouter = lazy(() => import("./RoutingFiles/PaymentRouter"));
import FallbackLoad from "./Component/Fallbackload/FallbackLoad"
import ErrorBoundary from "./Component/ErrorBoundary/ErrorBoundary";
import Loadingicon from "./Component/Jsonlicon/Loadingicon";

import NavbarpresentRouting from "./RoutingFiles/NavbarpresentRouting";
import IntroLoader from "./Component/IntroLoader/IntroLoader";
import AlartContext from "./Context/AlartContext/AlartContext";
import ThemeProvider from "./Context/ThemeContext/ThemeProvider";





const Notes = lazy(() => import("./Pages/Notes/Notes"));
const Cashfree = lazy(() => import("./Pages/CashfreePay/Cashfree"));
const SyllabusUpload = lazy(() => import("./Component/Admine/SyllabusUpload/SyllabusUpload"));
const NotFound = lazy(() => import("./Component/NotFound/NotFound"));
const Syllabus = lazy(() => import("./Pages/Syllabus/Syllabus"));
const MpcArticle = lazy(() => import("./Article/CollegeArticle/MpcAritcle/MpcArticle"));
const CollegeAritcle = lazy(() => import("./Article/CollegeArticle/CollegeAritcle"));
const ArticleHome = lazy(() => import("./Article/ArticleHome/ArticleHome"));
const TermsConditions = lazy(() => import("./Pages/TermsandConditions/TermsConditions"));
const PrivecyandPolicy = lazy(() => import("./Pages/Home/Privecy&Policy/PrivecyandPolicy"));
const AdmineLogIn = lazy(() => import("./Component/Admine/AdmineLogIn/AdmineLogIn"));
const AboutUs = lazy(() => import("./Pages/AboutUs/AboutUs"));
const Home = lazy(() => import("./RoutingFiles/Home"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const Signup = lazy(() => import("./Pages/SignUP/Signup"));
const Loginsignup = lazy(() => import("./RoutingFiles/Loginsignup"));


function App() {
 


  const [subheadingtype, setSubheadingtype] = useState('');
 
  
  
 

  const subheadingtypedata = (type) => {

    setSubheadingtype(
      {
        type: type,
      }
    )
  };

  const [navRefvalue,setNavref] = useState();


const navrefvalue = (value) => {

  setNavref(
    {
      value: value,
    
    }
  );
};



  const router = createBrowserRouter([

    {
      path : '*',
      element: <ErrorBoundary><Suspense fallback={<IntroLoader />}><NotFound /></Suspense></ErrorBoundary>
    },
    {
      path: '/',
      element: <><ErrorBoundary>    <Suspense fallback={<IntroLoader/>}> <AlartContext><ThemeProvider><AdminLoginCheck><UserContextdata><UserLoginContext><FilterScrollContex><DepartmentListContext><Allpages /></DepartmentListContext></FilterScrollContex></UserLoginContext></UserContextdata></AdminLoginCheck></ThemeProvider><Alart  /></AlartContext></Suspense></ErrorBoundary></>,
      children: [
        {
          path : '',
          element : <><ErrorBoundary> <Navbar    navrefvalue = {navrefvalue}  /><NavbarpresentRouting/></ErrorBoundary></>,
          children : [
            {
              path: '',
              element: (<><Suspense fallback={<IntroLoader/>}> <Home     navRefvalue = {navRefvalue} /></Suspense></>),
              children: [
                {
                  path: '',
                  element: <><ErrorBoundary><Departmentlist   /></ErrorBoundary></>
                },
               
    
              ]
            },
            {
              path: "Contact-Us",
              element: (<><ErrorBoundary><Suspense fallback={<IntroLoader/>}><PhoneInfo><Contact   /></PhoneInfo></Suspense></ErrorBoundary> </>),
            },
            {
              path: "Profile",
              element: (<><ErrorBoundary><Suspense fallback={<IntroLoader/>}> <Profile   /></Suspense></ErrorBoundary></>),
            },
            {
              path: "About-us",
              element: (<><ErrorBoundary> <Suspense fallback={<IntroLoader/>}> <AboutUs   /></Suspense></ErrorBoundary></>),
            },
            { 
              path: "Privacy-Policy",
              element: (<><ErrorBoundary><Suspense fallback={<IntroLoader/>}> <PrivecyandPolicy   /></Suspense></ErrorBoundary></>),
            },
            { 
              path: "Terms-Conditions",
              element: (<><ErrorBoundary><Suspense fallback={<IntroLoader/>}> <TermsConditions   /></Suspense></ErrorBoundary></>),
            },
          ]
        },

        
        {
          path: 'Filter',
          element: <><Suspense fallback={<IntroLoader/>}><MaterialRouting    subheadingtypedata = {subheadingtype}/></Suspense></>,
          children : [
            {
              path: '',
              element:<><Suspense fallback  = {<FallbackLoad/>}><Filter   subheadingtypedata = {subheadingtypedata}/> </Suspense></>,
         
            },
            {
              path: 'syllabus',
              element:<><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}> <Syllabus    subheadingtypedata = {subheadingtypedata}/> </Suspense></ErrorBoundary></>,
            },
            {
              path: 'Notes',
              element:<><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}> <Notes    subheadingtypedata = {subheadingtypedata}/> </Suspense></ErrorBoundary></>,
            },
          ]
        },
      
     
        {
          path: '/Downloadpdf/:fName',
          element: (<><ErrorBoundary><Suspense fallback={<IntroLoader/>}><Downloadpdf   /></Suspense></ErrorBoundary></>),
        },
        {
          path: "LogIn",
          element: (<><Suspense fallback  = {<IntroLoader/>}><Loginsignup /></Suspense></>),
          children: [
            {
              path: "",
              element:<ErrorBoundary><Suspense fallback  = {<IntroLoader/>}> <Login   /></Suspense></ErrorBoundary>
            },
            {
              path: "Signup",
              element: <> <ErrorBoundary><Suspense fallback  = {<IntroLoader/>}> <Signup   /></Suspense></ErrorBoundary></>
            },
            {
              path: "ForgatePw",
              element:<ErrorBoundary><Suspense fallback  = {<IntroLoader/>}>  <ForgatePw   /></Suspense></ErrorBoundary>
            },
          ]
        },

        
        {
          path: "payment-donate-us",
          element: (<><ErrorBoundary> <Suspense fallback  = {<IntroLoader/>}> <PaymentRouter   /></Suspense> </ErrorBoundary></>),
          children : [
            {
              index: true,
              path: "",
              element: (<><ErrorBoundary><Suspense fallback  = {<IntroLoader/>}> <Cashfree   /></Suspense> </ErrorBoundary></>),
            },
            {
              path: "payment-response",
              element: (<><ErrorBoundary><Suspense fallback  = {<IntroLoader/>}> <PaymentStatus   /></Suspense></ErrorBoundary></>),
            },
         
          ]
        },
      
       
        {
          path: "Admin",
          element: (<><Suspense fallback  = {<IntroLoader/>}><FetchData><Admine   /></FetchData></Suspense></>),
          children: [{
            path: '',
            element: <><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}><Dashboard   /></Suspense>  </ErrorBoundary></>
          },
          {
            path: 'Question',
            element: <><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}><Question   /></Suspense> </ErrorBoundary></>

          },
          {
            path: 'syllabusupload',
            element: <><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}><SyllabusUpload   /></Suspense> </ErrorBoundary></>

          },
        
          {
            path: 'Usersend',
            element: <><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}><UserSend   /></Suspense></ErrorBoundary> </>

          },
          {
            path: 'CsUpload',
            element: <><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}> <CsUpload   /></Suspense></ErrorBoundary></>

          },
          {
            path: 'Notes',
            element: <><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}> <NoteUpload   /></Suspense></ErrorBoundary></>

          },
         
          ]
        },
        {
          path : 'Admin/AdminLogIn',
          element : (<><ErrorBoundary><Suspense fallback  = {<IntroLoader/>}><AdmineLogIn  /></Suspense></ErrorBoundary></>)
        } ,
         {
          path: 'article-section',
          element: (<><Suspense fallback  = {<IntroLoader/>}> <ArticleSubheading><ArticleContainerRouter   /></ArticleSubheading></Suspense> </>),
          children: [
            {
              path: '',
              element: <><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}> <ArticleHome   /></Suspense></ErrorBoundary></>
            },
            {
              path: 'colleges-article',
           
              element:<><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}>  <CollegeArticleRouter   /></Suspense></ErrorBoundary></>,
              children : [
                {
                  path : '',
                  element:<><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}> <CollegeAritcle   /></Suspense></ErrorBoundary></>,
                  
                },{
                  path : 'mpc-article',
                  element:<><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}> <MpcArticle  /></Suspense></ErrorBoundary></>,
                
                }
              ]
            }
    
          ]
        },
      ]
    },
  
   



  ]);







  return (
    <>
    {/* <ErrorBoundary> */}
      <RouterProvider router={router} />
      {/* </ErrorBoundary> */}
    </>
  );
}

export default App;
