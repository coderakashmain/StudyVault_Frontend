import "./App.css";
import LocomotiveScroll from "locomotive-scroll";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Profile from "./Component/Home-T/Home-P/Profile/Profile";
import HomeT from "./Component/Home-T/HomeT";
import Navbar from "./Component/Navbar/Navbar";

// const router = createBrowserRouter([
//   {
//     Path: "/",
//     elememt: <>  <Navbar/><HomeT /></>,
//   },
//   {
//     Path: "/Profile",
//     elememt:<><Navbar/><Profile /></> 
//   }
// ]);

function App() {
  const locomotiveScroll = new LocomotiveScroll();


  return (
    <>
    <Navbar/>
    <HomeT/>

      {/* <RouterProvider router={router} /> */}
    </>
  );
}

export default App;
