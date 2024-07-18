import "./App.css";
import LocomotiveScroll from "locomotive-scroll";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Home from "./Pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./Pages/Profile/Profile";
// import Filter from "./Component/Home-T/Filter";
import Navbar from "./Component/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import Filter from "./Pages/Home/FilterS/Filter";
import Departmentlist from './Pages/Home/DepartmentlistS/Departmentlist'
import Contact from "./Pages/Contact/Contact";

const router = createBrowserRouter([
  {
    path: '/',
    element:( <><Navbar/><Home/></>) ,
    children :[
      {
        path : '',
        element : <Departmentlist/>
      },
      {
        path : 'Filter',
        element : <Filter/>
      }

    ]
  },
  {
    path: "/contact",
    element: ( <><  Navbar/><Contact/></>  ),
  },
  {
    path: "/LogIn",
    element: ( <><  Navbar/><Login/></>  ),
  },
  {
    path: "/Profile",
    element: ( <><Navbar/><Profile/></>  ),
  },
  {
    path: "/About-us",
    element: ( <><Navbar/><AboutUs/></>  ),
  },
]);

function App() {
  const locomotiveScroll = new LocomotiveScroll();


  return (
    <>
       
      <RouterProvider router={router} />
    </>
  );
}

export default App;
