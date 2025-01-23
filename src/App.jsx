import "./App.css";

import React, { lazy, Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
const Filter = lazy(()=> import("./Pages/Home/FilterS/Filter"));
// import Filter from './Pages/Home/FilterS/Filter';
const Departmentlist = lazy(()=> import("./Pages/Home/DepartmentlistS/Departmentlist"));
const Login = lazy(()=> import("./Pages/Login/Login"));
import Downloadpdf from "./Pages/Home/FilterS/Downloadpdf/Downloadpdf";
const ForgatePw = lazy(()=> import("./Pages/Login/ForgatePw/ForgatePw"));
import Allpages from "./RoutingFiles/Allpages";
const Alart = lazy(()=> import("./Component/Alart/Alart"));
import DepartmentListContext  from "./Context/DepartmentList/DepartmentListContext";
import UserContextdata from "./Context/UserContext/UserContextdata";
import FilterScrollContex from "./Context/FilterScroll/FilterScrollContex";
import PhoneInfo from "./Context/PhoneInfo/PhoneInfo";
import UserLoginContext from "./Context/UserLoginContext/UserLoginContext";
const Admine = lazy(()=> import("./Component/Admine/Admine"));
const Dashboard = lazy(()=> import("./Component/Admine/Dashboard/Dashboard"));
const Question = lazy(()=> import("./Component/Admine/Question/Question"));
const Note = lazy(()=> import("./Component/Admine/Note/Note"));
const UserSend = lazy(()=> import("./Component/Admine/UserSend/UserSend"));
const CsUpload = lazy(()=> import("./Component/Admine/CsUpload/CsUpload"));
import FetchData  from "./Context/FretchDataContext/FetchData";
import AdminLoginCheck  from "./Context/AdminLoginCheck/AdminLoginCheck";
const ArticleContainerRouter = lazy(() => import("./RoutingFiles/ArticleContainerRouter"));
const CollegeArticleRouter = lazy(() => import("./Article/CollegeArticle/CollegeArticleRouter"));
import ArticleSubheading  from "./Context/ArticleSubheading/ArticleSubheading";
import Navbar from "./Component/Navbar/Navbar";


const MaterialRouting = lazy(() => import("./RoutingFiles/MaterialRouting"));
import FallbackLoad from "./Component/Fallbackload/FallbackLoad"
import ErrorBoundary from "./Component/ErrorBoundary/ErrorBoundary";
import Loadingicon from "./Component/Jsonlicon/Loadingicon";
import PaymentRouter from "./RoutingFiles/PaymentRouter";
import PaymentStatus from "./Pages/CashfreePay/PaymentStatus";


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


  const [alart, setAlart] = useState(null);
  const [subheadingtype, setSubheadingtype] = useState('');

  const showAlart = (type, message, state) => {

    setAlart(
      {
        type: type,
        msg: message,
        state: state
      }
    )
 const timeout =    setTimeout(() => {
      setAlart(null);
    }, 4000);

    return ()=> clearTimeout(timeout);
  };


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
      element: <><ErrorBoundary><AdminLoginCheck><UserContextdata><UserLoginContext><FilterScrollContex><DepartmentListContext><Allpages showAlart={showAlart} /> <Navbar showAlart={showAlart}  navrefvalue = {navrefvalue}  /><Alart alart={alart} /></DepartmentListContext></FilterScrollContex></UserLoginContext></UserContextdata></AdminLoginCheck></ErrorBoundary></>,
      children: [

        {
          path: '',
          element: (<><Home  showAlart={showAlart}  navRefvalue = {navRefvalue} /></>),
          children: [
            {
              path: '',
              element: <><ErrorBoundary><Departmentlist showAlart={showAlart} /></ErrorBoundary></>
            },
           

          ]
        },
        {
          path: 'Filter',
          element:<MaterialRouting showAlart={showAlart}  subheadingtypedata = {subheadingtype}/>,
          children : [
            {
              path: '',
              element:<><Suspense fallback  = {<FallbackLoad/>}><Filter showAlart={showAlart} subheadingtypedata = {subheadingtypedata}/> </Suspense></>,
         
            },
            {
              path: 'syllabus',
              element:<><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}> <Syllabus showAlart={showAlart}  subheadingtypedata = {subheadingtypedata}/> </Suspense></ErrorBoundary></>,
            },
          ]
        },
      
        {
          path: "Contact-Us",
          element: (<><ErrorBoundary><Suspense fallback={<FallbackLoad/>}> <PhoneInfo><Contact showAlart={showAlart} /></PhoneInfo></Suspense></ErrorBoundary> </>),
        },
        {
          path: 'Downloadpdf',
          element: (<><ErrorBoundary><Downloadpdf showAlart={showAlart} /></ErrorBoundary></>),
        },
        {
          path: "LogIn",
          element: (<><Suspense fallback  = {<Loadingicon/>}><Loginsignup /></Suspense></>),
          children: [
            {
              path: "",
              element:<ErrorBoundary><Suspense fallback  = {<Loadingicon/>}> <Login showAlart={showAlart} /></Suspense></ErrorBoundary>
            },
            {
              path: "Signup",
              element: <> <ErrorBoundary><Suspense fallback  = {<Loadingicon/>}> <Signup showAlart={showAlart} /></Suspense></ErrorBoundary></>
            },
            {
              path: "ForgatePw",
              element:<ErrorBoundary><Suspense fallback  = {<Loadingicon/>}>  <ForgatePw showAlart={showAlart} /></Suspense></ErrorBoundary>
            },
          ]
        },

        {
          path: "Profile",
          element: (<><ErrorBoundary> <Profile showAlart={showAlart} /></ErrorBoundary></>),
        },
        {
          path: "payment-donate-us",
          element: (<><ErrorBoundary> <PaymentRouter showAlart={showAlart} /></ErrorBoundary></>),
          children : [
            {
              path: "",
              element: (<><ErrorBoundary> <Cashfree showAlart={showAlart} /></ErrorBoundary></>),
            },
         
          ]
        },
        {
          path: "payment-response",
          element: (<><ErrorBoundary> <PaymentStatus showAlart={showAlart} /></ErrorBoundary></>),
        },
        {
          path: "About-us",
          element: (<><ErrorBoundary> <AboutUs showAlart={showAlart} /></ErrorBoundary></>),
        },
        { 
          path: "Privacy-Policy",
          element: (<><ErrorBoundary> <PrivecyandPolicy showAlart={showAlart} /></ErrorBoundary></>),
        },
        { 
          path: "Terms-Conditions",
          element: (<><ErrorBoundary> <TermsConditions showAlart={showAlart} /></ErrorBoundary></>),
        },
        {
          path: "Admin",
          element: (<><FetchData><Admine showAlart={showAlart} /></FetchData></>),
          children: [{
            path: '',
            element: <><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}><Dashboard showAlart={showAlart} /></Suspense>  </ErrorBoundary></>
          },
          {
            path: 'Question',
            element: <><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}><Question showAlart={showAlart} /></Suspense> </ErrorBoundary></>

          },
          {
            path: 'syllabusupload',
            element: <><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}><SyllabusUpload showAlart={showAlart} /></Suspense> </ErrorBoundary></>

          },
          {
            path: 'Note',
            element: <><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}> <Note showAlart={showAlart} /></Suspense></ErrorBoundary></>

          },
          {
            path: 'Usersend',
            element: <><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}><UserSend showAlart={showAlart} /></Suspense></ErrorBoundary> </>

          },
          {
            path: 'CsUpload',
            element: <><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}> <CsUpload showAlart={showAlart} /></Suspense></ErrorBoundary></>

          },
         
          ]
        },
        {
          path : 'Admin/AdminLogIn',
          element : (<><ErrorBoundary><AdmineLogIn showAlart={showAlart}/></ErrorBoundary></>)
        } ,
         {
          path: 'article-section',
          element: (<><Suspense fallback  = {<FallbackLoad/>}> <ArticleSubheading><ArticleContainerRouter showAlart={showAlart} /></ArticleSubheading></Suspense> </>),
          children: [
            {
              path: '',
              element: <><ErrorBoundary><ArticleHome showAlart={showAlart} /></ErrorBoundary></>
            },
            {
              path: 'colleges-article',
           
              element:<><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}>  <CollegeArticleRouter showAlart={showAlart} /></Suspense></ErrorBoundary></>,
              children : [
                {
                  path : '',
                  element:<><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}> <CollegeAritcle showAlart={showAlart} /></Suspense></ErrorBoundary></>,
                  
                },{
                  path : 'mpc-article',
                  element:<><ErrorBoundary><Suspense fallback  = {<FallbackLoad/>}> <MpcArticle showAlart={showAlart}/></Suspense></ErrorBoundary></>,
                
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
