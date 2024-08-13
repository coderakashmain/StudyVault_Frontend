import React, {  useRef, useState,useContext, useEffect } from "react";
import "../HomeS/HomeT.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext/UserContextdata";
import {Departmentlistdata} from '../../../Context/DepartmentList/DepartmentListContext';
// import axios from "axios";


const Departmentlist = (props) => {

const departmentListdata =useContext(Departmentlistdata);
const {usernav} = useContext(UserContext);
// const [isAuthenticateduser, setIsAuthenticateduser] = useState(false);


  const navigate = useNavigate();
  const [moreDepartment, setMoreDepartment] = useState(false);
  const departmentList = useRef();
 

  
//   useEffect(() => {

//     const fetchProfile = async () => {
//       try {
//           const response = await axios.get('/api/dptlist', { withCredentials: true });
//          if (response.status === 200) {
//             setIsAuthenticateduser(true);
//          }
//          else {
//           setIsAuthenticateduser(false);
//       }
//       }  catch (error) {
//         console.error('Error fetching profile:', error);

//         if (error.response && error.response.status === 401) {
//             console.log('User not authenticated.');
//             setIsAuthenticateduser(false);
//         } else {
//             console.error('Unexpected error:', error.response?.data || error.message);
//         }
//     }
     
//   }
//   fetchProfile();
// },[usernav] );

    const contectContainer = useRef();

  const backto = () => {
    contectContainer.current.scrollIntoView({ behavior: "smooth" });
    };
  
  

  const handleDepartmentClick = (departmentName) => {
    if (usernav) {
      navigate("/Filter", { state: { departmentName } });
      backto();
    } else {
      
        props.showAlart('Login first');
        navigate("/Login");
        
        
    }
  };

  window.

      


  return (
    <>
      <div className="main-container">
        <div className="inner-main-container">
          <div ref={contectContainer} className="content-container">
            <div className="department-title-box">
               <h2>All departments :</h2>
               <button>Question Papers<i className="fa-solid fa-not-equal"></i></button>
            </div>
            <div ref={departmentList} className="department-list">
              {departmentListdata.map((departmentListdata, index) => (
                <div className="department" key={index}>
                  <p onClick={() => handleDepartmentClick(departmentListdata)}>
                    {" "}
                    {departmentListdata}
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
                  departmentList.current.style.height =
                    "350vh";
                  setMoreDepartment(true);
                }
                if (moreDepartment) {
                  departmentList.current.style.height =
                    "96vh";
                  setMoreDepartment(false); 
                }
              }}
            >
              {moreDepartment ? (
               
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
