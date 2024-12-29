import React, { useEffect, useRef, useState } from 'react'
import './Syllabus.css'
import HomeAdd1 from '../../Component/AddSense/HomeAdd1';
import LongWidthAds from '../../Component/AddSense/LongWidthAds';
import Horizontalads from '../../Component/AddSense/Horizontalads';
import axios from 'axios';
import { useNavigate } from 'react-router';


const Syllabus = (props) => {
const ugbtnRef = useRef();

const navigate = useNavigate();

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
  Educationlavel : '',
  Stream: '',
},[]);

const syllabusdatahandlePg = (e)=>{
  const value = e.target.innerText;
if( syllabusDataPg.Stream !== value){
  setSyllabusDataPg({
    ...syllabusDataPg,
    Educationlavel : 'PG',
    Stream : value
  })
  setSyllabusData({
    ...syllabusData,
    Educationlavel : '',
    Stream : ''
  })
}else{
  setSyllabusDataPg({
    ...syllabusDataPg,
    Educationlavel : '',
    Stream : ''
  })
}
}

const [btnrepositionpg,Setbtnrepositionpg] = useState(false);
useEffect(()=>{
  if(syllabusDataPg.Educationlavel && syllabusDataPg.Stream){
    Setbtnrepositionpg(true)
  }else{
    Setbtnrepositionpg(false);
  }
},[ syllabusDataPg.Stream])


const syllabussubmit = async(e) => {
  e.preventDefault();
 
    try{
      const response = await axios.get('/api/syllabus', {params : syllabusData});

      // if(response.status === 200){
        navigate('/Downloadpdf', { state: { data : response.data } });
     
      // }
    }catch(error){
      if (error.response && error.response.status === 400) {
        console.error(error);
     
      }
      else{
        console.error(error);
    
      }
    
    
  }

}
const syllabussubmitpg = async(e) => {
  e.preventDefault();

    try{
      const response = await axios.get('/api/syllabus', {params : syllabusDataPg});

      if(response.status === 200){
        navigate('/Downloadpdf', { state: { syllabusDataPg } });
     
      }
    }catch(error){
      if (error.response && error.response.status === 400) {
        console.error(error);
        alert("error 404", error);
      }
      else{
        console.error(error);
        alert("error else", error);
      }
  }

}

const  notavialable = () =>{
  props.showAlart('Upload Soon', '', 'cancel')
}



  return (
    <section id='syllabus-component'>
      <div className="syllabus-component-box">
           <h1>Syllabus Ug & Pg</h1>
           <p>The syllabus is an essential tool for every student, guiding you through the subjects and chapters that form the backbone of your academic journey. It serves as your roadmap, detailing thetopics, objectives,
           </p>
           and expectations of each course in your college curriculum.
        <div className="ads-center">
           <HomeAdd1 background = 'var(--newbackcolor)'/>

        </div>

           <div className="syllabus-commout-out-box">
           <div className="syllabu-left-box syllabus-common-box" >
           <h3 style={{textAlign :'center', fontWeight : '500', color : 'red', margin : '0rem 0rem 1rem 0'}}>No syllabus available. Upload Soon</h3>
              <h2>Ug syllabus</h2>
              <p>The Undergraduate (UG) Model Syllabus serves as a vital resource for students pursuing higher education in Odisha. Designed to align with the state's academic guidelines and national educational standards, it ensures a structured and comprehensive learning experience for students across various disciplines.</p>
               <form  onSubmit={syllabussubmit}>
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
                <button   onClick={notavialable} type='submit'  className={`ug-pg-syllabus-button active ${ugbtnreposition && 'ug-btn-reposition'}`}  ref={ugbtnRef}>
                    Click To Get
                </button>
                </form>
                <div className="ads-center">

                <Horizontalads background = "var(--newbackcolor)"/>
                </div>
              <h2>Pg syllabus</h2>
              <p>The Postgraduate (PG) Model Syllabus is an essential academic guide for students pursuing advanced studies in Odisha. It provides a well-structured framework to help students delve deeper into their chosen fields of study while adhering to national and state educational standards.</p>
              <form   onSubmit={syllabussubmitpg}>
                <ul>
                  <li  className={`active ${syllabusDataPg.Educationlavel === 'PG' && syllabusDataPg.Stream === 
                    'SCIENCE' && 'syllabus-btn-true-pg'
                  }`}  onClick={syllabusdatahandlePg}>Science</li>
                  <li  className={`active ${syllabusDataPg.Educationlavel === 'PG' && syllabusDataPg.Stream === 
                    'COMMERCE' && 'syllabus-btn-true-pg'
                  }`}  onClick={syllabusdatahandlePg}>Commerce</li>
                  <li  className={`active ${syllabusDataPg.Educationlavel === 'PG' && syllabusDataPg.Stream === 
                    'ARTS' && 'syllabus-btn-true-pg'
                  }`}  onClick={syllabusdatahandlePg}>Arts</li>
                  
                
                </ul>
                <button  onClick={notavialable} type='submit' className={`ug-pg-syllabus-button active ${btnrepositionpg &&  "pg-btn-reposition"} `}>
                    Click To Get
                </button>
                </form>
           </div>
           <div className="syllabu-right-box syllabus-common-box"></div>
           </div>

      </div>
    </section>
  )
}

export default Syllabus
