import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import "./Filter.css";
import { useNavigate, useLocation, NavLink } from "react-router-dom";


import { ScrollFilterContext } from "../../../Context/FilterScroll/FilterScrollContex";
import Loadingicon from "../../../Component/Jsonlicon/Loadingicon";
import { Departmentlistdata } from "../../../Context/DepartmentList/DepartmentListContext";
// import Horizontalads from "../../../Component/AddSense/Horizontalads";
// import Verticalads from "../../../Component/AddSense/Verticalads";
import HomeAdd1 from "../../../Component/AddSense/HomeAdd1";
import LongWidthAds from "../../../Component/AddSense/LongWidthAds";
import Horizontalads from "../../../Component/AddSense/Horizontalads";
import AritcleAds from "../../../Component/AddSense/AritcleAds";
import Verticalads from "../../../Component/AddSense/Verticalads";
import Review from "../Review/Review";
import { AlartContectValue } from "../../../Context/AlartContext/AlartContext";


const Filter = (props) => {
const [adsmobileview,setAdsmobileview] = useState(false);


  const filterboxref = useRef();

  const { setFiltersection } = useContext(ScrollFilterContext);
  useEffect(() => {
    setFiltersection(filterboxref.current);
  }, [])




  const navigate = useNavigate();
  const location = useLocation();
  const [ugActive, setUgActive] = useState(false);
  const [pgActive, setPgActive] = useState(false);
  const [yearfirstActive, setYearfirstActive] = useState(false);
  const [yearsecondActive, setYearsecondActive] = useState(false);
  const [yearthirdActive, setYearthirdActive] = useState(false);
  const [yearforthdActive, setYearforthActive] = useState(false);
  const [loader, setLoader] = useState(false);
  const [honors, setHonors] = useState(true);
  const [elective, setElective] = useState(false);
  const [Compulsory, setCompulsory] = useState(false);
  const [eandv, setEandv] = useState(false);
  const [dptnamechange,setdptnamechange ] =useState('');
  const departmentlist = useContext(Departmentlistdata);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const hideeSarchSuggestion = useRef();
  const {showAlart }= useContext(AlartContectValue);


  const initialDepartmentName = location.state?.departmentName || '';
  const initialDepartmentNamesearch = location.state?.searchdpt || '';
  const [dptName, setDptName] = useState('');
  const [buttonDisable,setButtonDisable] =useState(false);
  const [integratedBed,setIntegratedBed] =useState(false);
  const [homebackShow,setHomebackShow] = useState(false);
  const [onlyug,setOnlyug]= useState(false);
  const [message,setmesssage] = useState('');

  useEffect(() => {
   
    props.subheadingtypedata("Question");
  }, []);





  useEffect(() => {

    const newDepartmentname = initialDepartmentName || initialDepartmentNamesearch;
    setDptName(newDepartmentname);

    setFilters((PreFilters) => ({
      ...PreFilters,
      departmentName: newDepartmentname,
    }));

  }, [initialDepartmentName, initialDepartmentNamesearch,dptName])

  const [filters, setFilters] = useState({
    departmentName: dptName,
    educationLevelug: '',
    educationLevelpg: '',
    fromDate: '',
    toDate: '',
    departmentYear: '',
    sem: false,
    midSem: false
  });

// console.log(filters.departmentName)
  const pgdpt = ['MBA','MCA','Micro Biology','Bio-Chemistry','Enviromental Economics','Industrial Chemistry'];
  const onlyugdpt = ['Bca','Itm'];

  useEffect(()=>{
    if(pgdpt.some((dept) => dept.toLowerCase() === filters.departmentName.toLowerCase())){
      setButtonDisable(true);
    }else{
      
      
      setButtonDisable(false);
    }
  },[dptName,dptnamechange,filters.departmentName]);
  useEffect(()=>{
    if(onlyugdpt.some((dept) => dept.toLowerCase() === filters.departmentName.toLowerCase())){
      setOnlyug(true);
    }else{
      
      
      setOnlyug(false);
    }
  },[dptName,dptnamechange,filters.departmentName]);

  useEffect(()=>{
    if(filters.departmentName === 'Integrated B.Ed'){
      setIntegratedBed(true);
    }else{
      setIntegratedBed(false);
    }
  },[dptName,dptnamechange,filters.departmentName]);
  
  useEffect(()=>{
    if(buttonDisable){
      setUgActive(false);
      handleDepartmentYear('');
      setYearthirdActive(false);
      if(filters.educationLevelug){
        
       
        handleEducationLevelug('');

      }
      
    }else{
      handleEducationLevelug('');
    }

  },[buttonDisable]);
  useEffect(()=>{
    if(onlyug){
      setPgActive(false);
      if(filters.educationLevelpg){
        
       
        handleEducationLevelpg('');

      }
      
    }else{
      handleEducationLevelpg('');
    }

  },[onlyug]);

 

  useEffect(()=>{
    if(integratedBed){
      setPgActive(false);
   
      handleEducationLevelpg('');
      
      
    }else{
      setYearforthActive(false);
      handleDepartmentYear('');
    }
  },[integratedBed]);
  
  useEffect(()=>{

      if(integratedBed){
        setFilters((preData)=>({
          ...preData,
          midSem:false,
        }));

     
      }
  },[integratedBed])

  // console.log(filters);


  



const  handlesubjet = (e)=>{
  const value = e.target.innerText
  setFilters({
    ...filters,
    departmentName: value === 'Honors' ? (dptnamechange ? dptnamechange :dptName) : value,
  });
}





  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if(name === 'departmentName'){
      setdptnamechange(value);
      setShowSuggestions(true);
    }
   
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  
    if(name === 'departmentName'){
      const isValid = departmentlist.some(
        (dept) => dept.toLowerCase() === e.target.value.trim().toLowerCase()

      );
  
      if (!isValid) {
        setmesssage("Please Enter Correct Department Name *")
        return;
      } 
      else{
        setmesssage("")
      }
    }
     
  };

  // useEffect(()=>{
    
  // },[filters.departmentName])



  const handleChangenum = (e) => {
    const { name, value } = e.target;
    if (/^\d{0,4}$/.test(value)) {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };


  const handleEducationLevelug = (level) => {

    setFilters({
      ...filters,
      educationLevelug: level
    });


  };
  const handleEducationLevelpg = (level) => {
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
    if (filters.departmentName) {
      const isValid = departmentlist.some((dept) => {
        return (
          dept.toLowerCase() === filters.departmentName.trim().toLowerCase() ||
          filters.departmentName === "Elective" ||
          filters.departmentName === "Compulsory" ||
          filters.departmentName === "E&V"
        );
      });
    
      if (!isValid) {
        showAlart("Please Enter Correct Department Name",'','mark')
        setmesssage("Please Enter Correct Department Name *");
        return;
      } else {
        setmesssage("");
      }
    }

    try {
      setLoader(true);
      const response = await axios.get('/api/Filter', { params: nonEmptyFilters });
      if (response.status === 200) {
        navigate(`/Downloadpdf/${filters.departmentName}`, { state:{  data :  response.data} });
        setLoader(false);
      }
      else {
         showAlart('Try again after some time .', '', 'cancel');
        setLoader(false)
      }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error(error);
        setLoader(false);
         showAlart('No filter parameters provided', '', 'cancel');
      }
      if (error.response && error.response.status === 500) {
        console.error('Internal server error: ', error);
        setLoader(false);
         showAlart('Server Error', '', 'cancel');
      }
      else {
        console.error('Internal Error: ', error);
        setLoader(false);
         showAlart('Server Error', '', 'cancel');
      }

    }
  };





  useEffect(() => {
    const handlehide = (event) => {
        if (hideeSarchSuggestion.current && !hideeSarchSuggestion.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    }
    document.addEventListener("mousedown", handlehide);

    return () => {
        document.removeEventListener("mousedown", handlehide);
    }
});


useEffect(()=>{
  if(location.pathname === '/Filter'){
    setHomebackShow(true);
  }
  else{
    setHomebackShow(false);
  }
},[])



  return (
    <>
    <div ref={filterboxref} className="filter-main-div">
      

    
      <form onSubmit={handleSubmit} className="filteration-container-box" >
        <div className="filteration-container">
          <div className="first-filteration">
          {elective || Compulsory || eandv || (filters.departmentName === 'Integrated B.Ed') ? (<h3>Papers Name :</h3>) :(  <h3>Department Name :</h3>)}
            <div className="department-type">

              <div className="department-name ">
               { message ? (<p style={{color : 'red'}}>{message}</p>): (<p>Please enter valid Name *</p>)}
                <div className="department-name-inside ">
                <input
                  type="text"
                  name="departmentName"
                  value={filters.departmentName}
                  onChange={handleChange}
                  placeholder="Enter deparment name"
                  className={` ${elective || Compulsory || eandv ? 'otherone' : 'otherof'}`}  readOnly ={elective || Compulsory || eandv ? true : false}

                />
              </div>
              {showSuggestions && (<div ref={hideeSarchSuggestion} className="search-suggestion">
                                {dptnamechange ? (
                                    departmentlist && departmentlist.filter((item) => {
                                        const data = item.toLowerCase();
                                        const searchTerm = dptnamechange.toLowerCase();
                                        return data.startsWith(searchTerm);
                                    }).length === 0 ? (
                                        <div className="search-item">
                                            <p>No Departments available</p>
                                        </div>
                                    ) : (
                                        departmentlist.filter((item) => {
                                            const data = item.toLowerCase();
                                            const searchTerm = dptnamechange.toLowerCase();
                                            return data.startsWith(searchTerm) && data !== searchTerm;
                                        }).map((departmentlist, index2) => (
                                            <div onClick={(e) => {
                                                setdptnamechange(departmentlist)
                                                setFilters((preData) => ({
                                                    ...preData,
                                                    departmentName: departmentlist,

                                                }));
                                                setmesssage('');

                                            }} className="search-item" key={index2}>
                                                <p >{departmentlist}</p>
                                            </div>
                                        ))
                                    )
                                ) : null}
                            </div>)}
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
                className={`ug-box active department-box ${ugActive ? 'ug-active-color' : ''}`}
             
                onClick={() => {
                  if (!ugActive && !buttonDisable) {
                    handleEducationLevelug('ug');
                    setUgActive(true);


                  }
                  if (ugActive) {
                    setUgActive(false);
                    handleEducationLevelug('');
                  }
                }
                }
                disabled={buttonDisable }
                style={buttonDisable  ? { opacity : '0.4'} : {}}
              >
                <h1>UG</h1>
              </div>
              <div
                className={`pg-box active department-box ${pgActive ? 'pg-active-color' : ''}`}
                onClick={() => {
                  if (!pgActive && !integratedBed && !onlyug) {
                    handleEducationLevelpg('pg');
                    setPgActive(true);

                  }
                  if (pgActive) {
                    setPgActive(false);
                    handleEducationLevelpg('');
                  }
                }}
                disabled={integratedBed || onlyug}
                style={integratedBed || onlyug ? { opacity : '0.4'} : {}}

              >
                <h1>PG</h1>
              </div>
            </div>
          </div>
          <div className="second-filteration">
            <h3>Department Year :</h3>
            <div className="department-year">
              <ul>
                <li className={` active ${yearfirstActive ? 'active-1st-year' : ''}`} onClick={() => {
                  if (!yearfirstActive) {
                    handleDepartmentYear('1st');
                    setYearsecondActive(false);
                    setYearthirdActive(false);
                    setYearfirstActive(true);
                    setYearforthActive(false);

                  }
                  if (yearfirstActive) {
                    handleDepartmentYear('')
                    setYearfirstActive(false);
                  }
                }
                }>
                  1 <sup>st</sup>
                </li>
                <li className={`active ${yearsecondActive ? 'active-2nd-year' : ''}`} onClick={() => {
                  if (!yearsecondActive) {
                    handleDepartmentYear('2nd')
                    setYearthirdActive(false);
                    setYearfirstActive(false);
                    setYearsecondActive(true);
                    setYearforthActive(false);

                  }
                  if (yearsecondActive) {
                    handleDepartmentYear('')
                    setYearsecondActive(false);
                  }
                }}>
                  2 <sup>nd</sup>
                </li>
                <li className={`active ${yearthirdActive ? 'active-3rd-year' : ''}`} onClick={() => {
                  if (!yearthirdActive && !buttonDisable) {
                    handleDepartmentYear('3rd')
                    setYearfirstActive(false);
                    setYearsecondActive(false);
                    setYearthirdActive(true);
                    setYearforthActive(false);

                  }
                  if (yearthirdActive) {
                    handleDepartmentYear('')
                    setYearthirdActive(false);
                  }
                }}
                disabled={buttonDisable}
                style={buttonDisable ? { opacity : '0.4'} : {}}
                >
                  3 <sup>rd</sup>
                </li>
              { integratedBed && (  <li className={`active ${yearforthdActive ? 'active-4th-year' : ''}`} onClick={() => {
                  if (!yearforthdActive && !buttonDisable) {
                    handleDepartmentYear('4th')
                    setYearfirstActive(false);
                    setYearsecondActive(false);
                    setYearthirdActive(false);
                    setYearforthActive(true);

                  }
                  if (yearforthdActive) {
                    handleDepartmentYear('')
                    setYearforthActive(false);
                  }
                }}
               
                >
                  4 <sup>th</sup>
                </li>)}
              </ul>
            </div>
            <h3>Select paper :</h3>
            <div className="check-paper">
              <div className="first-paper">
                <div className={`active ${filters.midSem && !integratedBed ? 'active-midpaper-year' : ''}`} onClick={() =>{
                  if(!integratedBed){
                    handlePaperType('midSem')}}
                  }
                 disabled={integratedBed}
                 style={integratedBed ? { opacity : '0.4'} : {}}
                >MID SEM</div>

              </div>{" "}
              <div className="second-paper">
                <div className={`active ${filters.sem ? 'active-sempaper-year' : ''}`} onClick={() => handlePaperType('sem')}> SEM</div>
              </div>
            </div>
            <h3>Subjects :</h3>
            <div className="subject-select">
              <div className="subject-select-each active">
                
                  <p onClick={(e)=>{
                    
                    handlesubjet(e);
                    setHonors(!honors);
                    setElective(false);
                    setCompulsory(false);
                    setEandv(false);
                    
                    }} className={`${honors ? 'ok' : 'no'}`}> Honors</p>
              </div>
              <div className="subject-select-each active">
                  <p onClick={(e)=>
                    
                    {setElective(!elective);
                      handlesubjet(e);
                      setCompulsory(false);
                    setEandv(false);
                    setHonors(false);

                    }}
                     className={`${elective ? 'ok' : 'no'}`}>Elective</p>
              
              </div>
              <div className="subject-select-each active">
                  <p onClick={(e)=>
                  
                  {setCompulsory(!Compulsory);
                    handlesubjet(e);
                    setEandv(false);
                    setHonors(false);
                    setElective(false);

                  }}  className={`${Compulsory ? 'ok' : 'no'}`}>Compulsory</p>

              </div>
              <div className="subject-select-each active">
                  <p onClick={
                    (e)=>{
                      if(!buttonDisable){
                        setEandv(!eandv);
                        handlesubjet(e);
                       setCompulsory(false);
                      setHonors(false);
                      setElective(false);
                      }
                    }
                
                } className={`${eandv ? 'ok' : 'no'}`}
                disabled={buttonDisable}
                style={buttonDisable ? { opacity : '0.4'} : {}}
                >E&V</p> 
              
              </div>


            </div>

          </div>
        </div>
        <div className="filter-submission">
          <div className="filter-submission-box">


            {<input disabled={loader} style={{ background: (loader ? 'rgb(15 103 170 / 31%)' : 'var( --submitbutton)') }} type="submit" value='Find' />}
          </div>

        </div>
         <div  className="ads-center">
      <AritcleAds background = "var(--backcolor)"/>
      </div>
      </form>
      <div className="filter-right-ads-div">
       <Verticalads showAlart = { showAlart}/>
        </div> 
     
    </div>
    <Review/>
    </>
  );
};

export default Filter;
