import React, { useRef, useState, useContext, useEffect } from "react";
import "../HomeS/HomeT.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext/UserContextdata";
import { Departmentlistdata } from '../../../Context/DepartmentList/DepartmentListContext';
import { ScrollFilterContext } from "../../../Context/FilterScroll/FilterScrollContex";
import axios from "axios";
import LongWidthAds from "../../../Component/AddSense/LongWidthAds";
import SectionHorizontalads from "../../../Component/AddSense/SectionHorizontalads";
import AritcleAds from "../../../Component/AddSense/AritcleAds";
import Morenoteabove from "../../../Component/AddSense/Morenoteabove";
// import axios from "axios";


const Departmentlist = (props) => {

  const departmentListdata = useContext(Departmentlistdata);
  const { usernav } = useContext(UserContext);


  const navigate = useNavigate();
  const [moreDepartment, setMoreDepartment] = useState(false);
  const departmentList = useRef();
  const contectContainer = useRef();
  const { setFiltersection } = useContext(ScrollFilterContext);

  const [departmentName,setDepartmentName] = useState("");
  const [courseName,setCourseName] = useState("");
  const [yearName,setYearName] = useState("");  


  const handleDepartmentClick = (departmentName) => {
    navigate("/Filter", { state: { departmentName } });
    // backto();
  }
  const [check, setCheck] = useState(false)

const handleNavigate = ()=>{
  if(departmentName==="" && courseName==="" && yearName===""){
    return;
  }
  navigate("/Filter", { state: { departmentName,courseName,yearName } });
}



  return (
    <>
      <div className="main-container" style={{ paddingTop: '0rem' }}>

        <div className="inner-main-container">
          <div className="container pt-3!" style={{ overflow: 'hidden' ,backgroundColor :'#F4F7FF'}}>
            <Morenoteabove />
          </div>
          <div
            ref={contectContainer}
            className="bg-linear-to-br from-[#F4F7FF] to-[#EEF3FF] p-10 rounded-md content-container"
          >
            {/* Title */}
            <div className=" flex items-center gap-2 mb-2!">
              <h2 className="text-2xl! font-semibold! text-[#1F2A44]">
               Departments
              </h2>
            </div>

            {/* Filters */}
            {/* <div className="grid sm:grid-cols-3 gap-4 mb-10! grid-cols-2 ">
              <select value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} id="departmentname" name="departmentname" className="text-xs md:text-sm col-span-1 bg-white px-5! py-4! rounded-md shadow-lg text-gray-500 outline-none">
                <option value="">Select Department</option>
                {departmentListdata.map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
              </select>

              <select value={courseName} onChange={(e) => setCourseName(e.target.value)} id="course" name="course" className="text-xs md:text-sm col-span-1 bg-white px-5! py-4! rounded-md shadow-lg text-gray-500 outline-none">
                <option value="">Select Course</option>
                <option value="ug">UG</option>
                <option value="pg">PG</option>
              </select>
              <div className="flex  md:col-span-1 col-span-2">

                <select value={yearName} onChange={(e) => setYearName(e.target.value)} id="year" name="year" className="text-xs md:text-sm bg-white px-5! py-4! flex-3 rounded-tl-md rounded-lb-md   shadow-lg text-gray-500 outline-none">
                  <option value="">Select Year</option>
                  <option value='1st'>1st year</option>
                  <option value='2nd'>2nd year</option>
                  <option value='3rd'>3rd year</option>
                </select>
                <button onClick={handleNavigate} className="flex-1 bg-gradient-to-r cursor-pointer from-blue-600 to-blue-500 text-white! px-8 py-4 rounded-tr-md rounded-br-md shadow-xl font-medium hover:scale-[1.02] transition">
                  Search
                </button>
              </div>


            </div> */}

            {/* Departments */}
            <ul>
              <div
                ref={departmentList}
                className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4  sm:grid-cols-3 grid-cols-3 gap-5 pb-3!"
              >
                {departmentListdata
                  .slice(0, check ? departmentListdata.length : 9)
                  .map((department, index) => (
                    <li
                      key={index}
                      onClick={() => handleDepartmentClick(department)}
                      className="bg-[#F8F8FC] border text-xs px-2! sm:text-sm border-blue-100 shadow-sm rounded-md py-3! text-center  font-medium text-gray-700! cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition"
                    >
                      {department}
                    </li>
                  ))}

                {/* View All */}
                <div className="col-span-full flex justify-end mt-4">
                  <button
                    onClick={() => setCheck(!check)}
                    className="bg-linear-to-r cursor-pointer from-blue-600 to-blue-500 text-white! px-6! py-3! rounded-md shadow-lg text-sm font-medium hover:scale-[1.02] transition"
                  >
                    {check ? "See Less" : "View All Departments"}
                  </button>
                </div>
              </div>
            </ul>
          </div>

          <div className="ads-center " style={{ overflow: 'hidden' , backgroundColor :'#EEF3FF'}}>
            <AritcleAds background="#EEF3FF" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Departmentlist;
