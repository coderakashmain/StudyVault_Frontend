import React from "react";
import "./Filter.css";
const Filter = () => {
  return (
    <div className="filter-main-div">
      <form action="#" className="filteration-container-box">
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
              <input type="number" placeholder="From" />
            </div>
            <div className="hr"></div>
            <div className="year-div">
              <input type="number" placeholder="To" name="" id="" />
            </div>
          </div>
          <h3>Education Lavel :</h3>
          <div className="department-section">
            <div className="ug-box department-box">
              <h1>UG</h1>
            </div>
            <div className="pg-box department-box">
              <h1>PG</h1>
            </div>
          </div>
        </div>
        <div className="second-filteration">
          <h3>Department Year :</h3>
          <div className="department-year">
            <ul>
              <li>
                1 <sup>st</sup>
              </li>
              <li>
                2 <sup>nd</sup>
              </li>
              <li>
                3 <sup>rd</sup>
              </li>
            </ul>
          </div>
          <h3>Select paper :</h3>
          <div className="check-paper">
            <div className="first-paper">
              <div>SEM I</div>
              <div>MID I</div>
            </div>{" "}
            <div className="second-paper">
              <div>SEM II</div>
              <div>MID II</div>
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
        <input type="submit" value= "Find"/>
        </div>
      </form>
    </div>
  );
};

export default Filter;
