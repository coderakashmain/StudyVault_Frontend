import LocomotiveScroll from "locomotive-scroll";
import "./App.css";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Home from "./RoutingFiles/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./Pages/Profile/Profile";
import Navbar from "./Component/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import Filter from "./Pages/Home/FilterS/Filter";
import Departmentlist from './Pages/Home/DepartmentlistS/Departmentlist'
import Contact from "./Pages/Contact/Contact";
import Signup from "./Pages/SignUP/Signup";
import Loginsignup from "./RoutingFiles/Loginsignup";
import { useEffect, useState } from "react";
import Alart from "./Component/Alart/Alart";
import Downloadpdf from "./Pages/Home/FilterS/Downloadpdf/Downloadpdf";
import ForgatePw from "./Pages/Login/ForgatePw/ForgatePw";
import Preloader from "./Component/Preloader/Preloader";
import PasswordResetPage from "./RoutingFiles/PasswordResetPage";
import ResetPassword from "./Pages/Login/ForgatePw/ResetPassword/ResetPassword";




function App() {
const locomotiveScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});
const [alart, setAlart] = useState(null);


const showAlart = (type,message)=>{

  setAlart(
    { type : type,
     msg : message}
   )
};
setTimeout(() => {
  setAlart(null);
}, 2200);

const router = createBrowserRouter([
  {
    path: '/',
    element:( <><Preloader/><Navbar/><Alart alart={alart}/><Home/></>) ,
    children :[
      {
        path : '',
        element : <Departmentlist/>
      },
      {
        path : 'Filter',
        element : <Filter  showAlart = {showAlart}/>,
      }

    ]
  },
  {
    path: "/Contact-Us",
    element: ( <><Preloader/><  Navbar/><Alart alart={alart}/><Contact/></>  ),
  },
  {
      path : '/Downloadpdf',
     element : ( <><Preloader/><Alart alart={alart}/><Downloadpdf/></>  ),
  },
  {
    path: "/LogIn",
    element: ( <><Preloader/><Alart alart={alart}/><Loginsignup /></>  ),
    children : [
      {
        path: "",
        element: <Login showAlart = {showAlart}/>
      },
      {
        path: "Signup",
        element: <Signup showAlart = {showAlart}/>
      },
      {
        path: "ForgatePw",
        element: <PasswordResetPage showAlart = {showAlart}/>,
        children :[
          {
            path : '',
            element : <ForgatePw showAlart = {showAlart}/>
          },
          {
            path :'ResetPassword',
            element :<ResetPassword showAlart = {showAlart}/>
          }
        ]
      },
    ]
  },
  
  {
    path: "/Profile",
    element: ( <><Preloader/><Navbar/><Alart alart={alart}/><Profile showAlart = {showAlart} /></>  ),
  },
  {
    path: "/About-us",
    element: ( <><Preloader/><Navbar/><Alart alart={alart}/><AboutUs/></>  ),
  },
]);

  


  
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
