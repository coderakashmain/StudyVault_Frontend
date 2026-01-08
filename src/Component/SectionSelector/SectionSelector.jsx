import React, { useContext, useEffect, useRef, useState } from 'react'
import './SectionSelector.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ScrollFilterContext } from '../../Context/FilterScroll/FilterScrollContex';
import { AlartContectValue } from '../../Context/AlartContext/AlartContext';

const SectionSelector = (props) => {
    const location = useLocation();
    const sectionRef = useRef();
    const {filtersection} = useContext(ScrollFilterContext);
    const{showAlart} = useContext(AlartContectValue);
    const navigate = useNavigate();
   
    const popup = ()=>{
         showAlart('Available Soon', '','mark');
    }
  
    // const gotofilter = () => {
    //   filtersection.scrollIntoView({ behavior: 'smooth' });
  
  
    // };
  
    
  
  return (
  <section id="section-selector">
  <div className="w-full">

    {/* Header */}
    <div className="flex items-center gap-4 mb-10!">
      <h2 className="text-2xl font-semibold text-[#1F2A44]">
        What We Offer
      </h2>

      {/* <div className="flex bg-[#EEF3FF] rounded-full p-1 text-xs">
        <span className="px-4 py-1 rounded-full bg-white shadow text-[#1F2A44] font-medium">
          Recently
        </span>
        <span className="px-4 py-1 text-gray-500">
          Added
        </span>
        <span className="px-4 py-1 text-gray-500">
          New
        </span>
      </div> */}
    </div>

    {/* Cards */}
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 sm:grid-cols-2">

      {/* Question Papers */}
      <div className="bg-[#FFF3E6] rounded-2xl p-4! sm:p-6! shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-[#FFB74D] flex items-center justify-center mb-4!">
          <svg width="18" height="18" fill="white"><rect width="18" height="18" rx="3"/></svg>
        </div>
        <h3 className="font-semibold text-[#1F2A44] mb-1!">
          Question Papers
        </h3>
        <p className="text-xs text-gray-600 mb-5!">
          Previous year exam papers for all departments.
        </p>
        <button onClick={()=>navigate('/Filter')} className="px-4! py-1.5! rounded-md bg-white border border-gray-300 cursor-pointer text-sm font-medium text-[#1F2A44] shadow">
          Browse →
        </button>
      </div>

      {/* Notes */}
      <div className="bg-[#EEF6FF] rounded-2xl p-6! shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-[#4D8DFF] flex items-center justify-center mb-4!">
          <svg width="18" height="18" fill="white"><rect width="18" height="18" rx="3"/></svg>
        </div>
        <h3 className="font-semibold text-[#1F2A44] mb-1!">
          Notes
        </h3>
        <p className="text-xs text-gray-600 mb-5!">
          Examination notes curated by toppers.
        </p>
        <button onClick={()=>navigate("/Filter/Notes")} className="px-4!  py-1.5! rounded-md bg-white border border-gray-300 cursor-pointer text-sm font-medium text-[#1F2A44] shadow">
          Browse →
        </button>
      </div>

      {/* Syllabus */}
      <div className="bg-[#FFF8E8] rounded-2xl p-6! shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-[#FFC94D] flex items-center justify-center mb-4!">
          <svg width="18" height="18" fill="white"><rect width="18" height="18" rx="3"/></svg>
        </div>
        <h3 className="font-semibold text-[#1F2A44] mb-1!">
          Syllabus
        </h3>
        <p className="text-xs text-gray-600 mb-5!">
          Updated syllabus for different courses.
        </p>
        <button onClick={()=>navigate('/Filter/syllabus')} className="px-4! py-1.5! rounded-md bg-white border  border-gray-300 cursor-pointer text-sm font-medium text-[#1F2A44] shadow">
          Browse →
        </button>
      </div>

      {/* Upload Question Papers */}
      <div className="bg-gradient-to-br from-[#EAF4FF] to-[#DCEBFF] rounded-2xl p-6! shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-[#1F2A44] mb-2!">
            Upload Question Papers
          </h3>
          <p className="text-xs text-gray-600">
            Help others by uploading your question papers.
          </p>
        </div>

        <button onClick={()=>navigate("/global-upload-question-paper")} className="mt-6! bg-[#F6C23E] cursor-pointer hover:bg-[#eab62f] text-[#1F2A44]! font-medium py-3! rounded-xl shadow">
          Upload
        </button>
      </div>

    </div>
  </div>
</section>

    
  )
}

export default SectionSelector
