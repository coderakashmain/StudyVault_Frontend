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



const Alart = lazy(() => import("./Component/Alart/Alart"));
const MaterialRouting = lazy(() => import("./RoutingFiles/MaterialRouting"));
import FallbackLoad from "./Component/Fallbackload/FallbackLoad"
import ErrorBoundary from "./Component/ErrorBoundary/ErrorBoundary";
import Loadingicon from "./Component/Jsonlicon/Loadingicon";
import PaymentRouter from "./RoutingFiles/PaymentRouter";
import PaymentStatus from "./Pages/CashfreePay/PaymentStatus";
import ThemeContext from "./Context/ThemeContext/ThemeContext";
import NavbarpresentRouting from "./RoutingFiles/NavbarpresentRouting";
import IntroLoader from "./Component/IntroLoader/IntroLoader";
import AlartContext from "./Context/AlartContext/AlartContext";





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
      element : <ErrorBoundary><NotFound/></ErrorBoundary>
    },
    {
      path: '/',
      element: <><ErrorBoundary>    <Suspense fallback={<IntroLoader/>}> <AlartContext><ThemeContext><AdminLoginCheck><UserContextdata><UserLoginContext><FilterScrollContex><DepartmentListContext><Allpages /></DepartmentListContext></FilterScrollContex></UserLoginContext></UserContextdata></AdminLoginCheck></ThemeContext><Alart  /></AlartContext></Suspense></ErrorBoundary></>,
      children: [
        {
          path : '',
          element : <><ErrorBoundary> <Navbar    navrefvalue = {navrefvalue}  /><NavbarpresentRouting/></ErrorBoundary></>,
          children : [
            {
              path: '',
              element: (<><Home     navRefvalue = {navRefvalue} /></>),
              children: [
                {
                  path: '',
                  element: <><ErrorBoundary><Departmentlist   /></ErrorBoundary></>
                },
               
    
              ]
            },
            {
              path: "Contact-Us",
              element: (<><ErrorBoundary><Suspense fallback={<FallbackLoad/>}> <PhoneInfo><Contact   /></PhoneInfo></Suspense></ErrorBoundary> </>),
            },
            {
              path: "Profile",
              element: (<><ErrorBoundary> <Profile   /></ErrorBoundary></>),
            },
            {
              path: "About-us",
              element: (<><ErrorBoundary> <AboutUs   /></ErrorBoundary></>),
            },
            { 
              path: "Privacy-Policy",
              element: (<><ErrorBoundary> <PrivecyandPolicy   /></ErrorBoundary></>),
            },
            { 
              path: "Terms-Conditions",
              element: (<><ErrorBoundary> <TermsConditions   /></ErrorBoundary></>),
            },
          ]
        },

        
        {
          path: 'Filter',
          element:<MaterialRouting    subheadingtypedata = {subheadingtype}/>,
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
          element: (<><ErrorBoundary><Downloadpdf   /></ErrorBoundary></>),
        },
        {
          path: "LogIn",
          element: (<><Suspense fallback  = {<Loadingicon/>}><Loginsignup /></Suspense></>),
          children: [
            {
              path: "",
              element:<ErrorBoundary><Suspense fallback  = {<Loadingicon/>}> <Login   /></Suspense></ErrorBoundary>
            },
            {
              path: "Signup",
              element: <> <ErrorBoundary><Suspense fallback  = {<Loadingicon/>}> <Signup   /></Suspense></ErrorBoundary></>
            },
            {
              path: "ForgatePw",
              element:<ErrorBoundary><Suspense fallback  = {<Loadingicon/>}>  <ForgatePw   /></Suspense></ErrorBoundary>
            },
          ]
        },

        
        {
          path: "payment-donate-us",
          element: (<><ErrorBoundary> <Suspense fallback  = {<Loadingicon/>}> <PaymentRouter   /></Suspense> </ErrorBoundary></>),
          children : [
            {
              index: true,
              path: "",
              element: (<><ErrorBoundary> <Cashfree   /></ErrorBoundary></>),
            },
            {
              path: "payment-response",
              element: (<><ErrorBoundary> <PaymentStatus   /></ErrorBoundary></>),
            },
         
          ]
        },
      
       
        {
          path: "Admin",
          element: (<><FetchData><Admine   /></FetchData></>),
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
         
          ]
        },
        {
          path : 'Admin/AdminLogIn',
          element : (<><ErrorBoundary><AdmineLogIn  /></ErrorBoundary></>)
        } ,
         {
          path: 'article-section',
          element: (<><Suspense fallback  = {<FallbackLoad/>}> <ArticleSubheading><ArticleContainerRouter   /></ArticleSubheading></Suspense> </>),
          children: [
            {
              path: '',
              element: <><ErrorBoundary><ArticleHome   /></ErrorBoundary></>
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
