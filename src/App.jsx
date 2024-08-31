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
import { useState } from "react";
import Downloadpdf from "./Pages/Home/FilterS/Downloadpdf/Downloadpdf";
import ForgatePw from "./Pages/Login/ForgatePw/ForgatePw";
// import Preloader from "./Component/Preloader/Preloader";
import Allpages from "./RoutingFiles/Allpages";
import Alart from "./Component/Alart/Alart";
import DepartmentListContext from "./Context/DepartmentList/DepartmentListContext";
import UserContextdata from "./Context/UserContext/UserContextdata";
import FilterScrollContex from './Context/FilterScroll/FilterScrollContex'
import PhoneInfo from "./Context/PhoneInfo/PhoneInfo";




function App() {
// const locomotiveScroll = new LocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true
// });


const [alart, setAlart] = useState(null);

const showAlart = (type,message)=>{

  setAlart(
    { type : type,
     msg : message}
   )
   setTimeout(() => {
    setAlart(null);
  }, 4000);
};




const router = createBrowserRouter([
  {
    path : '/',
    element : <><UserContextdata><FilterScrollContex> <DepartmentListContext> <Navbar showAlart={showAlart}/><Allpages /><Alart alart={alart}/></DepartmentListContext></FilterScrollContex></UserContextdata></>,
    children : [

      {
        path: '',
        element:( <><Home showAlart={showAlart} /> </>) ,
        children :[
          {
            path : '',
            element : <Departmentlist  showAlart={showAlart}/> 
          },
          {
            path : 'Filter',
            element : <Filter showAlart={showAlart}/>,
          }
    
        ]
      },
      {
        path: "Contact-Us",
        element: ( <><PhoneInfo><Contact showAlart={showAlart}/></PhoneInfo></>  ),
      },
      {
          path : 'Downloadpdf',
         element : ( <><Downloadpdf showAlart={showAlart}/></>  ),
      },
      {
        path: "LogIn",
        element: ( <><Loginsignup /></>  ),
        children : [
          {
            path: "",
            element: <Login showAlart={showAlart}/>
          },
          {
            path: "Signup",
            element: <> <Signup showAlart={showAlart}/></>
          },
          {
            path: "ForgatePw",
            element : <ForgatePw showAlart={showAlart}/>
          },
        ]
      },
      
      {
        path: "Profile",
        element: ( <><Profile  showAlart={showAlart}/></>  ),
      },
      {
        path: "About-us",
        element: ( <><AboutUs showAlart={showAlart}/></>  ),
      },
    ]
  }



]);

  

  
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
