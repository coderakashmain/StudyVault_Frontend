import React,{createContext, useContext, useEffect, useRef, useState} from "react";
import axios from 'axios';
import "./Filter.css";
import { useNavigate,useLocation } from "react-router-dom";


import { ScrollFilterContext } from "../../../Context/FilterScroll/FilterScrollContex";
import Loadingicon from "../../../Component/Jsonlicon/Loadingicon";


const Filter = (props) => {

   const filterboxref = useRef();

   const {setFiltersection} = useContext(ScrollFilterContext);
   useEffect(()=>{
    setFiltersection(filterboxref.current);
   },[])
   

  const navigate = useNavigate();
  const location = useLocation();

  const [ugActive,setUgActive]= useState(false);
  const [pgActive, setPgActive]= useState(false);
  const [yearfirstActive, setYearfirstActive]= useState(false);
  const [yearsecondActive, setYearsecondActive]= useState(false);
  const [yearthirdActive, setYearthirdActive]= useState(false);
  const [loader,setLoader] = useState(false);
  
  const initialDepartmentName = location.state?.departmentName || '';
  const initialDepartmentNamesearch = location.state?.searchdpt || '';
const [dptName, setDptName] = useState('');

useEffect(()=>{

  const newDepartmentname = initialDepartmentName || initialDepartmentNamesearch;
  setDptName(newDepartmentname);

  setFilters((PreFilters) => ({
    ...PreFilters,
    departmentName : newDepartmentname,
  }));

},[initialDepartmentName,initialDepartmentNamesearch])
  
  const [filters, setFilters] = useState({
    departmentName:dptName,
    educationLevelug: '',
    educationLevelpg: '',
    fromDate: '',
    toDate: '',
    departmentYear: '',
    sem: false,
    midSem: false
  });


 

  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleChangenum = (e) => {
    const { name, value } = e.target;
    if (/^\d{0,4}$/.test(value)) {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
    };
   

  const handleEducationLevelug= (level) => {

    setFilters({
      ...filters,
      educationLevelug: level
    });
    

  };
  const handleEducationLevelpg= (level) => {
    setFilters({
      ...filters,
      educationLevelpg: level
    });
    

  };


  const handleDepartmentYear = (year) => {
    setFilters({
      ...filters,
      departmentYear: year
    });
  
  };

  const handlePaperType = (type) => {
    setFilters({
      ...filters,
      [type]: !filters[type],
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const nonEmptyFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value !== "" && value !== false)
    );
   
    if (Object.keys(nonEmptyFilters).length === 0) {
       alert("Please provide at least one filter criteria.");
      return;
    }
    try {
      setLoader(true);
      const response = await axios.get('/api/Filter', { params: nonEmptyFilters });
      if(response.status === 200){
        navigate('/Downloadpdf',{ state: { filters } });
        setLoader(false);
      }
      else{
        props.showAlart('Try again after some time .');
        setLoader(false)
      }
      
    } catch (error) {
      if(error.response && error.response.status === 400){
        console.error(error);
        setLoader(false);
        props.showAlart('No filter parameters provided');
      }
      if(error.response && error.response.status === 500){
        console.error('Internal server error: ', error);
        setLoader(false);
        props.showAlart('Server Error');
      }
      else{
        console.error('Internal Error: ', error);
        setLoader(false);
        props.showAlart('Server Error');
      }
    
    }
  };


  return (
    <div ref={filterboxref} className="filter-main-div">
      <form onSubmit={handleSubmit} className="filteration-container-box" >
        <div className="filteration-container">
          <div className="first-filteration">
            <h3>Department Name :</h3>
            <div className="department-type">
              <div className="department-name">
                <p>Please enter valid Name *</p>
                <input
                  type="text"
                  name="departmentName"
                  value={filters.departmentName}
                  onChange={handleChange}
                  placeholder="Enter deparment name"
                  
                />
              </div>
            </div>
            <h3>Enter Session :</h3>
            <div className="year-to-year">
              <div className="year-div">
                <input type="number" 
                placeholder="From"
                name="fromDate"
                value={filters.fromDate}
                onChange={handleChangenum} 
                pattern="2 0 [0-9]{2}"
                required
                />
              </div>

              <div className="hr"></div>
              <div className="year-div">
                <input type="number"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleChangenum}
                  placeholder="To"
                  pattern="2 0 [0-9]{2}"
                  required
                  />
                  
              </div>
            </div>
            <h3>Education Lavel :</h3>
            <div className="department-section">
              <div
                className={`ug-box department-box ${ugActive ? 'ug-active-color': ''}`}
                onClick={() => 
                {
                  if(!ugActive){
                    handleEducationLevelug('ug');
                    setUgActive(true);

                    
                  }
                  if(ugActive){
                    setUgActive(false);
                    handleEducationLevelug('');
                  }
                }
                }
              >
                <h1>UG</h1>
              </div>
              <div
                className={`pg-box department-box ${pgActive ? 'pg-active-color': ''}`}
                onClick={() =>{
                  if(!pgActive){
                    handleEducationLevelpg('pg');
                    setPgActive(true);
                    
                  }
                  if(pgActive){
                    setPgActive(false);
                    handleEducationLevelpg('');
                  }
                }}
              >
                <h1>PG</h1>
              </div>
            </div>
          </div>
          <div className="second-filteration">
            <h3>Department Year :</h3>
            <div className="department-year">
              <ul>
                <li className={` ${yearfirstActive ? 'active-1st-year': ''}`}  onClick={() => {
                       if(!yearfirstActive){
                         handleDepartmentYear('1st');
                         setYearsecondActive(false);
                         setYearthirdActive(false);
                         setYearfirstActive(true);

                       }
                       if(yearfirstActive){
                         handleDepartmentYear('')
                        setYearfirstActive(false);
                       }
                }
                   }>
                  1 <sup>st</sup>
                </li>
                <li className={` ${yearsecondActive ? 'active-2nd-year': ''}`}  onClick={() =>{
                       if(!yearsecondActive){
                         handleDepartmentYear('2nd')
                         setYearthirdActive(false);
                        setYearfirstActive(false);
                         setYearsecondActive(true);

                       }
                       if(yearsecondActive){
                         handleDepartmentYear('')
                         setYearsecondActive(false);
                       }
                } }>
                  2 <sup>nd</sup>
                </li>
                <li className={` ${yearthirdActive ? 'active-3rd-year': ''}`} onClick={() => {
                       if(!yearthirdActive){
                         handleDepartmentYear('3rd')
                        setYearfirstActive(false);
                        setYearsecondActive(false);
                         setYearthirdActive(true);

                       }
                       if(yearthirdActive){
                         handleDepartmentYear('')
                         setYearthirdActive(false);
                       }
                } }>
                  3 <sup>rd</sup>
                </li>
              </ul>
            </div>
            <h3>Select paper :</h3>
            <div className="check-paper">
              <div className="first-paper">
                <div className={` ${filters.midSem ? 'active-midpaper-year': ''}`} onClick={() =>handlePaperType('midSem')}>MID SEM</div>
                
              </div>{" "}
              <div className="second-paper">
                <div className={` ${filters.sem ? 'active-sempaper-year': ''}`} onClick={() => handlePaperType('sem')}> SEM</div>
              </div>
            </div>
            {/* <h3>Select Subject :</h3> */}
            
          </div>
        </div>
        <div className="filter-submission">
          <div className="filter-submission-box">
            
              
              {<input disabled= {loader} style={{ background :( loader  ? 'lightblue' : '#4c98d9' )}}  type="submit" value='Find' />}
          </div>
       
        </div>
      </form>
    </div>
  );
};

export default Filter;
