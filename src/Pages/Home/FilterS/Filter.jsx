import React,{useState} from "react";
import "./Filter.css";
const Filter = (props) => {
  const [ inputfromValue, setInputfromValue ] = useState('');
  const [inputtoValue, setInputtoValue] = useState('');
  const filterData = {
    departmentName: props,
    educationLavel: null,
    fromDate: inputfromValue,
    toDate: inputtoValue,
    departmentYear: null,
    midOne:false,
    midTwo:false,
    semOne:false,
    semTwo:false,
    
  };
  const seteducationLavelug = () => {
    filterData.educationLavel = "ug";
    alert(filterData.educationLavel);
  };
  const seteducationLavelpg = () => {
    filterData.educationLavel = "pg";
    alert(filterData.educationLavel);
  };
  const setFromDate = (e) => {
    setInputfromValue(e.target.value);
  }
  const setToDate = (e) => {
    setInputtoValue(e.target.value);
  }
  const setDepartmentYearfirst = () => {
    filterData.departmentYear="1st"
  }
  const setDepartmentYearsecond = () => {
    filterData.departmentYear="2nd"
  }
  const setDepartmentYearthird = () => {
    filterData.departmentYear="3rd"
  }
  const setSelectPapermidone = () => {
    filterData.midOne=true
  }
  const setSelectPapermidtwo = () => {
    filterData.midTwo=true
  }
  const setSelectPapersemone= () => {
    filterData.semOne=true
  }
  const setSelectPapersemtwo = () => {
    filterData.semTwo=true
  }
  return (
    <div className="filter-main-div">
      {/* <form action="#" className="filteration-container-box"> */}
        <div className="filteration-container">
          <div className="first-filteration">
            <h3>Department Name :</h3>
            <div className="department-type">
              <div className="department-name">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Department Name"
                />
              </div>
            </div>
            <h3>Enter year's :</h3>
            <div className="year-to-year">
              <div className="year-div">
                <input type="number" placeholder="From"
                   value={inputfromValue}
                  onChange={setFromDate} />
              </div>
              <div className="hr"></div>
              <div className="year-div">
                <input type="number" placeholder="To" name="" id=""
                                   value={inputtoValue}
                                   onChange={setToDate}/>
              </div>
            </div>
            <p>{filterData.educationLavel}</p>
            <h3>Education Lavel :</h3>
            <div className="department-section">
              <div
                className="ug-box department-box"
                onClick={seteducationLavelug}
              >
                <h1>UG</h1>
              </div>
              <div
                className="pg-box department-box"
                onClick={seteducationLavelpg}
              >
                <h1>PG</h1>
              </div>
            </div>
          </div>
          <div className="second-filteration">
            <h3>Department Year :</h3>
            <div className="department-year">
              <ul>
                <li onClick={setDepartmentYearfirst }>
                  1 <sup>st</sup>
                </li>
                <li onClick={setDepartmentYearsecond}>
                  2 <sup>nd</sup>
                </li>
                <li onClick={setDepartmentYearthird }>
                  3 <sup>rd</sup>
                </li>
              </ul>
            </div>
            <h3>Select paper :</h3>
            <div className="check-paper">
              <div className="first-paper">
                <div onClick={setSelectPapersemone}>SEM I</div>
                <div onClick={setSelectPapermidone}>MID I</div>
              </div>{" "}
              <div className="second-paper">
                <div onClick={setSelectPapersemtwo}> SEM II</div>
                <div onClick={setSelectPapermidtwo}>MID II</div>
              </div>
            </div>
            <h3>Select Subject :</h3>
            <div className="subjects">
              <div className="subject">
                <p>subject one</p>
                <input type="checkbox" name="" id="" />
              </div>
              <div className="subject">
                <p>subject one</p>
                <input type="checkbox" name="" id="" />
              </div>
              <div className="subject">
                <p>subject one</p>
                <input type="checkbox" name="" id="" />
              </div>
              <div className="subject">
                <p>subject one</p>
                <input type="checkbox" name="" id="" />
              </div>
              <div className="subject">
                <p>subject one</p>
                <input type="checkbox" name="" id="" />
              </div>
              <div className="subject">
                <p>subject one</p>
                <input type="checkbox" name="" id="" />
              </div>
            </div>
          </div>
        </div>
        <div className="filter-submission">
          <input type="submit" value="Find" />
        </div>
      {/* </form> */}
    </div>
  );
};

export default Filter;
