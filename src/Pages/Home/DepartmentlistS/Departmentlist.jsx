
import React from "react";
import "../HomeS/HomeT.css";
import { useNavigate } from "react-router-dom";








const HomeT = () => {
  const departments = [
    "Computer Science",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Aeronautical Engineering",
    "Information Technology",
    "Electronics and Communication",
    "Medical Science",
    "Environmental Science",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Statistics",
    "Economics",
    "History",
    "Geography",
    "Political Science",
    "Psychology",
    "Sociology",
    "Philosophy",
    "Literature",
    "Linguistics",
    "Journalism",
    "Law",
    "Business Administration",
    "Education",
    "Nursing",
    "Pharmacy",
  ];
  
  // const [filterScroll, setFilterScroll] = useState(100)
  // useEffect(() => {
  //  if(window.innerWidth < 885){
  //   setFilterScroll(100);
  //  }
  //  if(window.innerWidth < 434){
  //   setFilterScroll(205);
  //  }
  // }, [setFilterScroll])

  const navigate = useNavigate();
  
  const handleDepartmentClick = (departmentName) => {
    navigate('/Filter', { state: { departmentName } });
  };

  return (
    <>
      <div className="main-container">
          
        <div className="inner-main-container">
          <div className="content-container">
            <h2>All departmet :</h2>
            <div  className="department-list">
              {departments.map((department, index) => (
                <div  className="department" key={index}>
                  <p 
                   /* // onClick={()=>{ */
                /* //   window.addEventListener('click',()=>{ */
                /* //     window.scrollTo({top :filterScroll}); */
                /* //   }) */
                /* // }}  */
                onClick={() => handleDepartmentClick(department)}> {department}</p>
                </div>
              ))}
            </div>
          </div>
         
        </div>
      </div>

    </>
  );
};
export default HomeT;
