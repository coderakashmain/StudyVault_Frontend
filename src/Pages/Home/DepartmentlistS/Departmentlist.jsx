import React, { useState } from "react";
import "../HomeS/HomeT.css";
import { useNavigate } from "react-router-dom";

const Departmentlist = () => {
  const departments = [
    "Computer Science",
    "Bachelor of Computer Application",
    "Botany",
    "Chemistry",
    "Data Science",
    "Geology",
    "Itm",
    "Mathmatics",
    "Physics",
    "Sericalture",
    "Statistics",
    "Zoology",

    "Commerce",

    "Anthropoloy",
    "Economics",
    "Education",
    "English",
    "Geography",
    "Hindi",
    "History",
    "Sociology",
    "Odia",
    "Philosophy",
    "Political Science",
    "Psychology",
    "Sanskrit",
    "Santali",

    "Master of Business Administration",
    "Master of Computer Applications",
    "Micro Biology",
    "Bio-Chemistry",
    "Enviromental Economics",
    "Industrial Chemistry",
  ];
  const sortedDepartments = departments.sort((a, b) => a.localeCompare(b));

  const navigate = useNavigate();
  const [moreDepartment, setMoreDepartment] = useState(false);
 

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const handleDepartmentClick = (departmentName) => {
    if (user && token) {
      navigate("/Filter", { state: { departmentName } });
    } else {
      navigate("/Login");
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="inner-main-container">
          <div className="content-container">
            <div className="department-title-box">
               <h2>All departments :</h2>
               <button>Question Papers<i className="fa-solid fa-not-equal"></i></button>
            </div>
            <div className="department-list">
              {sortedDepartments.map((department, index) => (
                <div className="department" key={index}>
                  <p onClick={() => handleDepartmentClick(department)}>
                    {" "}
                    {department}
                  </p>
                </div>
              ))}
            </div>
            <button
              style={{
                // width: "20%",
                cursor: "pointer",
                padding: "0.7rem 1rem",
                border: "none",
                background: "#4B97D5",
                borderRadius: "0.1rem",
                margin: "0.9rem 0 0 0 ",
              }}
              onClick={() => {
                if (!moreDepartment) {
                  document.querySelector(".department-list").style.maxHeight =
                    "96vh";
                  setMoreDepartment(true);
                }
                if (moreDepartment) {
                  document.querySelector(".department-list").style.maxHeight =
                    "1000vh";
                  setMoreDepartment(false); 
                }
              }}
            >
              {!moreDepartment ? (
               
              <p
              style={{
                color: "#fff",
                fontSize: "1.1rem",
                whiteSpace: "nowrap",
              }}
            >
              See less
            </p>
              ): ( 
               
                <p
                style={{
                  color: "#fff",
                  fontSize: "1.1rem",
                  // whiteSpace: "nowrap",
                }}
              >
                More Departments
              </p> 
               
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Departmentlist;
