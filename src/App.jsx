import "./App.css";

import React, { lazy, Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
const Filter = lazy(()=> import("./Pages/Home/FilterS/Filter"));
// import Filter from './Pages/Home/FilterS/Filter';
import Departmentlist from './Pages/Home/DepartmentlistS/Departmentlist'
import Login from "./Pages/Login/Login";
import Downloadpdf from "./Pages/Home/FilterS/Downloadpdf/Downloadpdf";
import ForgatePw from "./Pages/Login/ForgatePw/ForgatePw";
import Allpages from "./RoutingFiles/Allpages";
import Alart from "./Component/Alart/Alart";
import DepartmentListContext from "./Context/DepartmentList/DepartmentListContext";
import UserContextdata from "./Context/UserContext/UserContextdata";
import FilterScrollContex from './Context/FilterScroll/FilterScrollContex'
import PhoneInfo from "./Context/PhoneInfo/PhoneInfo";
import UserLoginContext from "./Context/UserLoginContext/UserLoginContext";
const Admine = lazy(()=> import("./Component/Admine/Admine"));
const Dashboard = lazy(()=> import("./Component/Admine/Dashboard/Dashboard"));
const Question = lazy(()=> import("./Component/Admine/Question/Question"));
const Note = lazy(()=> import("./Component/Admine/Note/Note"));
const UserSend = lazy(()=> import("./Component/Admine/UserSend/UserSend"));
const CsUpload = lazy(()=> import("./Component/Admine/CsUpload/CsUpload"));
import FetchData from "./Context/FretchDataContext/FetchData";
import AdminLoginCheck from "./Context/AdminLoginCheck/AdminLoginCheck";
import ArticleContainerRouter from "./RoutingFiles/ArticleContainerRouter";
import CollegeArticleRouter from "./Article/CollegeArticle/CollegeArticleRouter";
import ArticleSubheading from "./Context/ArticleSubheading/ArticleSubheading";
import Navbar from "./Component/Navbar/Navbar";
import MaterialRouting from "./RoutingFiles/MaterialRouting";
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
    setTimeout(() => {
      setAlart(null);
    }, 4000);
  };


  const subheadingtypedata = (type) => {

    setSubheadingtype(
      {
        type: type,
      }
    )
  };




  const router = createBrowserRouter([
    {
      path: '/',
      element: <><AdminLoginCheck><UserContextdata><UserLoginContext><FilterScrollContex> <DepartmentListContext><Allpages showAlart={showAlart} /> <Alart alart={alart} /></DepartmentListContext></FilterScrollContex></UserLoginContext></UserContextdata></AdminLoginCheck></>,
      children: [

        {
          path: '',
          element: (<><Home  showAlart={showAlart} /> </>),
          children: [
            {
              path: '',
              element: <><Departmentlist showAlart={showAlart} /></>
            },
           

          ]
        },
        {
          path: 'Filter',
          element: <MaterialRouting showAlart={showAlart}  subheadingtypedata = {subheadingtype}/>,
          children : [
            {
              path: '',
              element:<><Suspense fallback  = {<p>Loading...</p>}> <Filter showAlart={showAlart} subheadingtypedata = {subheadingtypedata}/> </Suspense></>,
         
            },
            {
              path: 'syllabus',
              element:<><Suspense fallback  = {<p>Loading...</p>}> <Syllabus showAlart={showAlart}  subheadingtypedata = {subheadingtypedata}/> </Suspense></>,
            },
          ]
        },
      
        {
          path: "Contact-Us",
          element: (<><Navbar showAlart={showAlart}/> <PhoneInfo><Contact showAlart={showAlart} /></PhoneInfo> </>),
        },
        {
          path: 'Downloadpdf',
          element: (<><Downloadpdf showAlart={showAlart} /></>),
        },
        {
          path: "LogIn",
          element: (<><Loginsignup /></>),
          children: [
            {
              path: "",
              element: <Login showAlart={showAlart} />
            },
            {
              path: "Signup",
              element: <> <Signup showAlart={showAlart} /></>
            },
            {
              path: "ForgatePw",
              element: <ForgatePw showAlart={showAlart} />
            },
          ]
        },

        {
          path: "Profile",
          element: (<><Navbar showAlart={showAlart}/> <Profile showAlart={showAlart} /></>),
        },
        {
          path: "About-us",
          element: (<><Navbar showAlart={showAlart}/> <AboutUs showAlart={showAlart} /></>),
        },
        { 
          path: "Privacy-Policy",
          element: (<><Navbar showAlart={showAlart}/> <PrivecyandPolicy showAlart={showAlart} /></>),
        },
        { 
          path: "Terms-Conditions",
          element: (<><Navbar showAlart={showAlart}/> <TermsConditions showAlart={showAlart} /></>),
        },
        {
          path: "Admin",
          element: (<><FetchData><Admine showAlart={showAlart} /></FetchData></>),
          children: [{
            path: '',
            element: <><Suspense fallback  = {<p>Loading...</p>}><Dashboard showAlart={showAlart} /></Suspense>  </>
          },
          {
            path: 'Question',
            element: <><Suspense fallback  = {<p>Loading...</p>}><Question showAlart={showAlart} /></Suspense> </>

          },
          {
            path: 'Note',
            element: <><Suspense fallback  = {<p>Loading...</p>}> <Note showAlart={showAlart} /></Suspense></>

          },
          {
            path: 'Usersend',
            element: <><Suspense fallback  = {<p style={{padding : '2rem'}}>Loading...</p>}><UserSend showAlart={showAlart} /></Suspense> </>

          },
          {
            path: 'CsUpload',
            element: <><Suspense fallback  = {<p>Loading...</p>}> <CsUpload showAlart={showAlart} /></Suspense></>

          },
         
          ]
        },
        {
          path : 'Admin/AdminLogIn',
          element : (<><AdmineLogIn showAlart={showAlart}/></>)
        } ,
         {
          path: 'article-section',
          element: (<><ArticleSubheading><ArticleContainerRouter showAlart={showAlart} /></ArticleSubheading> </>),
          children: [
            {
              path: '',
              element: <><ArticleHome showAlart={showAlart} /></>
            },
            {
              path: 'colleges-article',
           
              element:<><Suspense fallback  = {<p style={{minHeight : '100vh'}}>Loading...</p>}>  <CollegeArticleRouter showAlart={showAlart} /></Suspense></>,
              children : [
                {
                  path : '',
                  element:<><Suspense fallback  = {<p style={{minHeight : '100vh'}}>Loading...</p>}> <CollegeAritcle showAlart={showAlart} /></Suspense></>,
                  
                },{
                  path : 'mpc-article',
                  element:<><Suspense fallback  = {<p style={{minHeight : '100vh'}}>Loading...</p>}> <MpcArticle showAlart={showAlart}/></Suspense></>,
                
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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
