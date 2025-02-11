import React, { useContext, useEffect, useRef, useState } from 'react'
import './Syllabus.css'
import HomeAdd1 from '../../Component/AddSense/HomeAdd1';
import LongWidthAds from '../../Component/AddSense/LongWidthAds';
import Horizontalads from '../../Component/AddSense/Horizontalads';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Review from '../Home/Review/Review';
import { AlartContectValue } from '../../Context/AlartContext/AlartContext';


const Syllabus = (props) => {
const ugbtnRef = useRef();
const [ugloading,setUgloading]= useState(false);
const [pgloading,setPgloading] = useState(false);
const navigate = useNavigate();
const {showAlart} = useContext(AlartContectValue);

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
    Educationlavel : '',
    Stream : ''
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
  setUgloading(true);
    try{
      const response = await axios.get('/api/syllabus', {params : syllabusData});

      // if(response.status === 200){
        navigate(`/Downloadpdf/${syllabusData.Stream}`, { state: { data : response.data } });
        setUgloading(false);
      // }
    }catch(error){
      if (error.response && error.response.status === 400) {
        console.error(error);
     
      }
      else{
        console.error(error);
    
      }
      setUgloading(false);
    
  }

}
const syllabussubmitpg = async(e) => {
  e.preventDefault();
setPgloading(true);
    try{
      const response = await axios.get('/api/syllabus', {params : syllabusDataPg});

      
        navigate(`/Downloadpdf/${syllabusDataPg.Stream}`, { state: { data : response.data } });
    setPgloading(false);
    }catch(error){
      if (error.response && error.response.status === 400) {
        console.error(error);
        alert("error 404", error);
      }
      else{
        console.error(error);
        alert("error else", error);
      }
      setPgloading(false);
  }

}

// const  notavialable = () =>{
//    showAlart('Upload Soon', '', 'cancel')
// }




  return (
    <>
    <section id='syllabus-component'>
      <div className="syllabus-component-box">
           <h1>Syllabus Ug & Pg</h1>
           <p>The syllabus is an essential tool for every student, guiding you through the subjects and chapters that form the backbone of your academic journey. It serves as your roadmap, detailing thetopics, objectives,
           </p>
           and expectations of each course in your college curriculum.
        <div className="ads-center">
        <Horizontalads background = "var(--newbackcolor)"/>

        </div>

           <div className="syllabus-commout-out-box">
           <div className="syllabu-left-box syllabus-common-box" >
           {/* <h3 style={{textAlign :'center', fontWeight : '500', color : 'red', margin : '0rem 0rem 1rem 0'}}>No syllabus are available. Upload Soon</h3> */}
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
                <button  disabled={ugloading}  type='submit'  className={`ug-pg-syllabus-button active ${ugbtnreposition && 'ug-btn-reposition'} ${ugloading && 'syllabus-loading'}`}  ref={ugbtnRef}>
                    Show
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
                <button disabled={pgloading}   type='submit' className={`ug-pg-syllabus-button active ${btnrepositionpg &&  "pg-btn-reposition" } ${pgloading && 'syllabus-loading'}`}>
                   Show
                </button>
                </form>
           </div>
           <div className="syllabu-right-box syllabus-common-box">
              <h2>Some important Questions</h2>
              <aside className="prepare-summary">

              <details className='prepare-detail'>
                <summary className='prepare-detail-summary'>↪ Computer Science</summary>
                <div className="prepare-detail-summary-box">
                  <h3> Sem -1 || Core-1 || Unit-1 (Introduction to Computer Science & Python Programming.)</h3>
                  <h4>Long type Possible Questions</h4>

                  <details>
                    <summary>1. Explain the generations of computers with examples and characteristics ?</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li>Ans : First Generation (1940-1956): Used vacuum tubes; large, consumed high power, slow, unreliable, used punched cards.</li>
                      <li>Second Generation (1956-1963): Used transistors; smaller, faster, more reliable, less heat generation.</li>
                      <li>Third Generation (1964-1971): Used integrated circuits; smaller, cost-effective, more reliable.</li>
                      <li>Fourth Generation (1971-Present): Used microprocessors; personal computers developed, smaller, cheaper, and faster.</li>
                      <li>Fifth Generation (Present and Beyond): Focuses on AI, robotics, and quantum computing.</li>
                    </ul>
                  </details>
                  <details>
                    <summary>2. Describe the types of computers.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li>Ans : Analog Computers: Process continuous data like temperature or speed.</li>
                      <li>Digital Computers: Perform calculations and logical operations, e.g., desktops, laptops.</li>
                      <li>Hybrid Computers: Combine features of analog and digital, used in scientific applications.</li>
                      <li>Supercomputers: High-speed performance for scientific research, e.g., weather prediction.</li>
                      <li>Mainframe Computers: Handle large-scale data processing, e.g., banking systems.</li>
                      <li>Personal Computers: For personal use, e.g., desktops, laptops.</li>
                    </ul>
                  </details>
                  <details>
                    <summary>3. Draw and explain the block diagram of a computer system, detailing each component.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li>Diagram: Include Input Unit, CPU, Memory Unit, and Output Unit.
                      </li>
                      <li>Explanation : </li>
                      <li>Input Unit: Accepts data (e.g., keyboard, mouse).</li>
                      <li>CPU: Processes data using the Control Unit, ALU, and Registers.</li>
                      <li>Memory Unit: Stores data (primary, secondary, and cache memory).</li>
                      <li>Output Unit: Displays results (e.g., monitor, printer).</li>
                    </ul>
                  </details>
                  <details>
                    <summary>4. What is CPU? Explain its components: Control Unit, ALU, and Registers.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans : CPU (Central Processing Unit): The brain of the computer responsible for processing data
                      </li>
                      <li>Control Unit (CU): Directs data flow and manages instructions.</li>
                      <li>Arithmetic Logic Unit (ALU): Performs mathematical and logical operations.</li>
                      <li>Registers: Temporary storage within the CPU for immediate data access.</li>
                     
                    </ul>
                  </details>
                  <details>
                    <summary>5. Explain the memory hierarchy with examples and a diagram.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans : Memory Hierarchy:
                        <ul>
                          <li>Registers: Smallest and fastest, inside the CPU.</li>
                          <li>Cache Memory: High-speed memory close to the CPU.</li>
                          <li>Primary Memory (RAM & ROM): RAM for temporary data; ROM for permanent data.</li>
                          <li>Secondary Memory: HDDs, SSDs for large storage.</li>
                        </ul>
                      </li>
                      <li>Diagram: Pyramid showing Registers -) Cache -) RAM -) Secondary Memory.
                      </li>
                     
                    </ul>
                  </details>
                
                  <details>
                    <summary>6. Describe the functions of input and output devices with examples.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans : Input Devices: Capture data for processing.
                        <ul>
                          <li>Examples: Keyboard (text input), Mouse (cursor control), Scanner (image capture).</li>
                        
                        </ul>
                      </li>
                      <li>Output Devices: Display or deliver processed data.
                        <ul>
                          <li>Examples: Monitor (visual display), Printer (hard copy), Speakers (audio output).</li>
                        </ul>
                      </li>
                     
                    </ul>
                  </details>
                
                  <details>
                    <summary>7. Explain the types of software with their functions and examples.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans : System Software: Manages hardware, e.g., Operating Systems (Windows, Linux).
                      </li>
                      <li>Application Software: Performs specific tasks, e.g., MS Word, Photoshop.</li>
                      <li>Utility Software: Enhances system performance, e.g., Antivirus, Disk Cleanup.</li>
                      <li>Firmware: Embedded software for hardware, e.g., BIOS.</li>
                     
                    </ul>
                  </details>
                  <details>
                    <summary>8. Discuss the importance of computer networking and its applications, including LAN, MAN, and WAN.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans : Importance: Enables resource sharing, remote communication, and online services.
                      </li>
                      <li>LAN: Covers a small area, e.g., home or office networks.</li>
                      <li>MAN: Covers a city or region, e.g., cable TV networks.</li>
                      <li>WAN: Covers large areas, e.g., the Internet.</li>
                      <li>Applications: Email, video conferencing, cloud storage, e-commerce.</li>
                     
                    </ul>
                  </details>
                  <details>
                    <summary>9. Write about the functions of network devices.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans : Repeater: Boosts weak signals.
                      </li>
                      <li>Bridge: Connects and filters traffic between LANs.</li>
                      <li>Hub: Broadcasts data to all devices in a network.</li>
                      <li>Switch: Directs data to specific devices within a network.</li>
                      <li>Router: Connects different networks, routes data packets.</li>
                      <li>Gateway: Translates between different network protocols.</li>
                     
                    </ul>
                  </details>
                  <h4 style={{marginTop : '3rem'}}> Short type Possible Questions</h4>

                  <details>
                    <summary>1. Define Computers.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans : A computer is an electronic device that processes, stores, and retrieves data to perform tasks using instructions.
                      </li>
                  
                     
                    </ul>
                  </details>
                  <details>
                    <summary>2. Characteristics of the First Generation of Computers.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans : Used vacuum tubes, were large, slow, unreliable, and consumed high power.
                      </li>
                  
                     
                    </ul>
                  </details>
                  <details>
                    <summary>3. What is cache memory?</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans :  Cache memory is a small, high-speed memory that stores frequently accessed data for faster processing.
                      </li>
                  
                     
                    </ul>
                  </details>
                  <details>
                    <summary>4. Name two input and two output devices.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans :  Input Devices: Keyboard, Mouse. </li>
                      <li> Output Devices: Monitor, Printer. </li>
                  
                    </ul>
                  </details>
                  <details>
                    <summary>5. Differentiate between LAN and WAN.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans :  LAN: Covers a small area, e.g., a home network. </li>
                      <li> WAN: Covers large areas, e.g., the Internet. </li>
                  
                    </ul>
                  </details>
                  <details>
                    <summary>6. Examples of System Software.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans : Examples: Operating Systems (Windows, Linux), Utility Programs (Disk Cleanup). </li>
                 
                  
                    </ul>
                  </details>
                  <details>
                    <summary>7. What are utility software and firmware?</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans : Utility Software: Programs that optimize system performance, e.g., antivirus.      </li>
                      <li>Firmware: Pre-installed software in hardware, e.g., BIOS.</li>
                 
                  
                    </ul>
                  </details>
                  <details>
                    <summary>8. Name any two network devices and mention their functions.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans : Router: Connects networks, routes data packets.     </li>
                      <li>Switch: Directs data to specific devices in a network.</li>
                 
                  
                    </ul>
                  </details>
                  <details>
                    <summary>9. List any three types of computers.</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans : Analog Computers, Digital Computers, Hybrid Computers.     </li>
                 
                  
                    </ul>
                  </details>
                  <details>
                    <summary>10. What is the role of the ALU in the CPU?</summary>
                    <ul>
                      <li>*These are the key points you have to write more.</li>
                      <li> Ans : The Arithmetic Logic Unit (ALU) performs mathematical operations and logical comparisons.    </li>
                 
                  
                    </ul>
                  </details>

                  </div>
              </details>
                </aside>
              
           </div>
           </div>

      </div>
    </section>
    <Review showAlart = { showAlart}/>
    </>
  )
}

export default Syllabus
