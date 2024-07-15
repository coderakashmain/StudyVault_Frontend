
import React from "react";
import "./HomeT.css";
import 'remixicon/fonts/remixicon.css'




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
  
 
  
  return (
    <>
    
      <div className="main-container">
          
        <div className="inner-main-container">
          
          <div className="main-header">
            <div className="header">
            
          
            
              <div className="filter-switch">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search your department"
                />
              </div>
              
            </div>
            <h3 className="header-title">Proud to be a MPC ' ian</h3>
            <p className="header-subtitle">PADHLE BHAI PADHLE</p>
          </div>
          <div className="department-logo"></div>
        </div>
      </div>

    </>
  );
};
export default HomeT;
