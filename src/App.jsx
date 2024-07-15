import "./App.css";
import LocomotiveScroll from "locomotive-scroll";
import Home from "./Pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./Pages/Profile/Profile";
// import Filter from "./Component/Home-T/Filter";
import Navbar from "./Component/Navbar/Navbar";
import Login from "./Pages/Login/Login";

const router = createBrowserRouter([
  {
    path: '/',
    element:( <><Navbar/><Home/></>) ,
  },
  {
    path: "/LogIn",
    element: ( <><Navbar/><Login/></>  ),
  },
  {
    path: "/Profile",
    element: ( <><Navbar/><Profile/></>  ),
  },
]);

function App() {
  const locomotiveScroll = new LocomotiveScroll();


  return (
    <>
    {/* <Home/> */}
    {/* <Navbar/> */}
    {/* <HomeT/> */}
    {/* <Filter/> */}
    {/* <Profile/> */}

      <RouterProvider router={router} />
    </>
  );
}

export default App;
