import "./App.css";
import { lazy, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Filter from './Pages/Home/FilterS/Filter';
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
const AboutUs = lazy(()=> import ("./Pages/AboutUs/AboutUs" ) );
const Home = lazy(()=> import ("./RoutingFiles/Home" ) );
const Profile = lazy(()=> import ("./Pages/Profile/Profile" ) );
const Contact = lazy(()=> import ("./Pages/Contact/Contact" ) );
const Signup = lazy(()=> import ("./Pages/SignUP/Signup" ) );
const Loginsignup = lazy(()=> import ("./RoutingFiles/Loginsignup" ) );





function App() {


const [alart, setAlart] = useState(null);

const showAlart = (type,message,state)=>{

  setAlart(
    { type : type,
     msg : message,
    state : state}
   )
   setTimeout(() => {
    setAlart(null);
  }, 4000);
};




const router = createBrowserRouter([
  {
    path : '/',
    element : <><UserContextdata><UserLoginContext><FilterScrollContex> <DepartmentListContext> <Navbar showAlart={showAlart}/><Allpages /><Alart alart={alart}/></DepartmentListContext></FilterScrollContex></UserLoginContext></UserContextdata></>,
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
