import React,{useState} from "react";
import axios from 'axios';
import "./Filter.css";
import { useNavigate,useLocation } from "react-router-dom";


const Filter = (props) => {

  const navigate = useNavigate();
  const location = useLocation();
  const initialDepartmentName = location.state?.departmentName || '';
  
  const [filters, setFilters] = useState({
    departmentName: initialDepartmentName,
    educationLevel: '',
    fromDate: '',
    toDate: '',
    departmentYear: '',
    Sem: false,
    midSem: false
  });
  // const [results, setResults] = useState([]);

  
  

  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEducationLevel = (level) => {
    setFilters({
      ...filters,
      educationLevel: level
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
      const response = await axios.get('/api/Filter', { params: nonEmptyFilters });
      // setResults(response.data);
      navigate('/Downloadpdf',{ state: { filters } })

      
    } catch (error) {
      console.error('Error fetching papers:', error);
     
      props.showAlart('Not selected','Please provide at least one filter criteria.');
    }
  };


  return (
    <div className="filter-main-div">
      <form onSubmit={handleSubmit} className="filteration-container-box">
        <div className="filteration-container">
          <div className="first-filteration">
            <h3>Department Name :</h3>
            <div className="department-type">
              <div className="department-name">
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
                onChange={handleChange} />
              </div>

              <div className="hr"></div>
              <div className="year-div">
                <input type="number"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleChange}
                  placeholder="To"/>
              </div>
            </div>
            <h3>Education Lavel :</h3>
            <div className="department-section">
              <div
                className="ug-box department-box"
                onClick={() => handleEducationLevel('ug')}
              >
                <h1>UG</h1>
              </div>
              <div
                className="pg-box department-box"
                onClick={() => handleEducationLevel('pg')}
              >
                <h1>PG</h1>
              </div>
            </div>
          </div>
          <div className="second-filteration">
            <h3>Department Year :</h3>
            <div className="department-year">
              <ul>
                <li  onClick={() => handleDepartmentYear('1st')}>
                  1 <sup>st</sup>
                </li>
                <li onClick={() => handleDepartmentYear('2nd')}>
                  2 <sup>nd</sup>
                </li>
                <li onClick={() => handleDepartmentYear('3rd')}>
                  3 <sup>rd</sup>
                </li>
              </ul>
            </div>
            <h3>Select paper :</h3>
            <div className="check-paper">
              <div className="first-paper">
                <div onClick={() => handlePaperType('midSem')}>MID SEM</div>
              </div>{" "}
              <div className="second-paper">
                <div onClick={() => handlePaperType('Sem')}> SEM</div>
              </div>
            </div>
            <h3>Select Subject :</h3>
            
          </div>
        </div>
        <div className="filter-submission">
          <input type="submit" value="Find" />
        </div>
      </form>
    </div>
  );
};

export default Filter;
