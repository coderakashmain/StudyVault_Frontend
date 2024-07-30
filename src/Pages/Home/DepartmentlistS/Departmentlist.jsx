import React, { useState } from "react";
import "../HomeS/HomeT.css";
import { useNavigate } from "react-router-dom";

const HomeT = () => {
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
            <h2>All departmet :</h2>
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
                width: "20%",
                cursor: "pointer",
                padding: "0.7rem 0",
                border: "none",
                background: "#4B97D5",
                borderRadius: "0.1rem",
                margin: "0.9rem 0 0 0 ",
              }}
              onClick={() => {
                if (!moreDepartment) {
                  document.querySelector(".department-list").style.maxHeight =
                    "1000vh";
                  setMoreDepartment(true);
                }
                if (moreDepartment) {
                  document.querySelector(".department-list").style.maxHeight =
                    "96vh";
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
                  All Departments
                </p>
              ) : (
                <p
                  style={{
                    color: "#fff",
                    fontSize: "1.1rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  See less
                </p>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomeT;
