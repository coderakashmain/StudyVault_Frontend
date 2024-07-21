
import React, { useEffect, useState } from "react";
import "../HomeS/HomeT.css";
import { NavLink } from "react-router-dom";







const HomeT = () => {
  const departments = [
    "Computer Science",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Aeronautical Engineering",
    "Information Technology",
    "Electronics and Communication",
    "Medical Science",
    "Environmental Science",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Statistics",
    "Economics",
    "History",
    "Geography",
    "Political Science",
    "Psychology",
    "Sociology",
    "Philosophy",
    "Literature",
    "Linguistics",
    "Journalism",
    "Law",
    "Business Administration",
    "Education",
    "Nursing",
    "Pharmacy",
  ];
  
  // const [filterScroll, setFilterScroll] = useState(100)
  // useEffect(() => {
  //  if(window.innerWidth < 885){
  //   setFilterScroll(100);
  //  }
  //  if(window.innerWidth < 434){
  //   setFilterScroll(205);
  //  }
  // }, [setFilterScroll])
  
 

  return (
    <>
      <div className="main-container">
          
        <div className="inner-main-container">
          <div className="content-container">
            <h2>All departmet :</h2>
            <div  className="department-list">
              {departments.map((department, index) => (
                <div  className="department" key={index}>
                  <NavLink 
                   /* // onClick={()=>{ */
                /* //   window.addEventListener('click',()=>{ */
                /* //     window.scrollTo({top :filterScroll}); */
                /* //   }) */
                /* // }}  */
                  to="/Filter"> <p >{department}</p></NavLink>
                 
                 
                </div>
              ))}
            </div>
          </div>
         
        </div>
      </div>

    </>
  );
};
export default HomeT;
