import React, { useEffect, useRef, useState } from 'react'
import './Syllabus.css'



const Syllabus = (props) => {
const ugbtnRef = useRef();



  useEffect(() => {
     
    props.subheadingtypedata("Syllabus");
  
  }, []);


  const[ syllabusData , setSyllabusData] = useState({
    Educationlavel : '',
    Stream : '',


  },[]);


const syllabusdatahandle = (e)=>{
const value = e.target.innerText;
if( syllabusData.Stream !== value){
  setSyllabusData({
    ...syllabusData,
    Educationlavel : 'UG',
    Stream : value
  })
  setSyllabusDataPg({
    ...syllabusDataPg,
    EducationlavelPg : '',
    StreamPg : ''
  })
}else{
  setSyllabusData({
    ...syllabusData,
    Educationlavel : '',
    Stream : ''
  })
}

}
const [ugbtnreposition,Setugbtnreposition] = useState(false);
useEffect(()=>{
  if(syllabusData.Educationlavel && syllabusData.Stream){
    Setugbtnreposition(true)
  }else{
    Setugbtnreposition(false);
  }
},[ syllabusData.Stream])

const[ syllabusDataPg , setSyllabusDataPg] = useState({
  EducationlavelPg : '',
  StreamPg : '',
},[]);

const syllabusdatahandlePg = (e)=>{
  const value = e.target.innerText;
if( syllabusDataPg.StreamPg !== value){
  setSyllabusDataPg({
    ...syllabusDataPg,
    EducationlavelPg : 'PG',
    StreamPg : value
  })
  setSyllabusData({
    ...syllabusData,
    Educationlavel : '',
    Stream : ''
  })
}else{
  setSyllabusDataPg({
    ...syllabusDataPg,
    EducationlavelPg : '',
    StreamPg : ''
  })
}
}

  return (
    <section id='syllabus-component'>
      <div className="syllabus-component-box">
           <h1>Syllabus Ug & Pg</h1>
           <p>The syllabus is an essential tool for every student, guiding you through the subjects and chapters that form the backbone of your academic journey. It serves as your roadmap, detailing thetopics, objectives,
           and expectations of each course in your college curriculum.

           </p>
           <div className="syllabus-commout-out-box">
           <div className="syllabu-left-box syllabus-common-box" >
              <h2>Ug syllabus</h2>
                <ul>
                  <li  className={`active ${syllabusData.Educationlavel === 'UG' && syllabusData.Stream === 
                    'SCIENCE' && 'syllabus-btn-true'
                  }`} onClick={syllabusdatahandle}>Science</li>
                  <li className={`active ${syllabusData.Educationlavel === 'UG' && syllabusData.Stream === 
                    'COMMERCE' && 'syllabus-btn-true'
                  }`} onClick={syllabusdatahandle}>Commerce</li>
                  <li  className={`active ${syllabusData.Educationlavel === 'UG' && syllabusData.Stream === 
                    'ARTS' && 'syllabus-btn-true'
                  }`} onClick={syllabusdatahandle}>Arts</li>
                  <li className={`active ${syllabusData.Educationlavel === 'UG' && syllabusData.Stream === 
                    'AECC' && 'syllabus-btn-true'
                  }`}onClick={syllabusdatahandle}>AECC</li>
                  <li  className={`active ${syllabusData.Educationlavel === 'UG' && syllabusData.Stream === 
                    'E&V' && 'syllabus-btn-true'
                  }`} onClick={syllabusdatahandle}>E&V</li>
                </ul>
                <button   className={`ug-pg-syllabus-button active ${ugbtnreposition && 'ug-btn-reposition'}`}  ref={ugbtnRef}>
                    Click To Get
                </button>
              <h2>Pg syllabus</h2>
                <ul>
                  <li  className={`active ${syllabusDataPg.EducationlavelPg === 'PG' && syllabusDataPg.StreamPg === 
                    'SCIENCE' && 'syllabus-btn-true-pg'
                  }`}  onClick={syllabusdatahandlePg}>Science</li>
                  <li  className={`active ${syllabusDataPg.EducationlavelPg === 'PG' && syllabusDataPg.StreamPg === 
                    'COMMERCE' && 'syllabus-btn-true-pg'
                  }`}  onClick={syllabusdatahandlePg}>Commerce</li>
                  <li  className={`active ${syllabusDataPg.EducationlavelPg === 'PG' && syllabusDataPg.StreamPg === 
                    'ARTS' && 'syllabus-btn-true-pg'
                  }`}  onClick={syllabusdatahandlePg}>Arts</li>
                  <li  className={`active ${syllabusDataPg.EducationlavelPg === 'PG' && syllabusDataPg.StreamPg === 
                    'AECC' && 'syllabus-btn-true-pg'
                  }`}  onClick={syllabusdatahandlePg}> AECC</li>
                
                </ul>
                <button  className="ug-pg-syllabus-button active">
                    Click To Get
                </button>
           </div>
           <div className="syllabu-right-box syllabus-common-box"></div>
           </div>

      </div>
    </section>
  )
}

export default Syllabus
