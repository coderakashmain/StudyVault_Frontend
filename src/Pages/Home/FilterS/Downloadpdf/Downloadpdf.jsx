import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './Downloadpdf.css'
import BackButton from '../../../../Component/Backbutton/Backbutton';
import LongWidthAds from "../../../../Component/AddSense/LongWidthAds";


const Downloadpdf = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [papers, setPapers] = useState([]);
    const searchRef = useRef();
    const [searchbaractivecheck,setsearchbaractivecheck] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

 

    useEffect(() => {
        
        const fetchPapers = async () => {
            try {
         
                    const response = await axios.get('/api/Filter', { params: state.filters });
                setPapers(response.data);
           
                
            } catch (error) {
                console.error('Error fetching papers:', error);
                alert('Error fetching papers');
            }
        };

        fetchPapers();
    }, [state.filters]);

    const filteredPapers = papers.filter((paper) =>
        paper.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    

    const handleclicksearch = ()=>{
     if(!searchbaractivecheck){
        searchRef.current.style.transform = 'translate(0%) scale(1)';
        searchRef.current.style.margin = ' 2rem 0';
        searchRef.current.style.opacity = ' 1';
      
        setsearchbaractivecheck(!searchbaractivecheck);
     }else{
        searchRef.current.style.transform = 'translateY(-100%) scale(0)';
        searchRef.current.style.margin = ' 0rem 0';
        searchRef.current.style.opacity = '0';
        setsearchbaractivecheck(!searchbaractivecheck);
     }
           
    }

    useEffect(() => {
        window.scrollTo(0, 0); 
      }, []);
    
      const backnavigate = ()=>{
        navigate(-1); 
      }

    return (
        <>
            {/* <BackButton /> */}
            <div id='download-pdf' >
               <header>
                <div className="back-to-filter active" onClick={backnavigate}>
                <i className="fa-solid fa-arrow-left"></i>
                </div>
                <h1>StudyVault<sub>Downloads</sub></h1>
                <div className="search-resources back-to-filter active"  onClick={handleclicksearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
            {/* <hr /> */}
               </header>
               
                <div className="download-box">
                <div className="search-resuorces" ref={searchRef}>
                <input type="text" name="search" id="search" placeholder="Search Subject Name"  value={searchQuery}  onChange={(e) => setSearchQuery(e.target.value)}/>
               </div>
                    <h2>RESULTS</h2>
                    
                    <div className="download-data">
                    {filteredPapers.length  > 0 && filteredPapers? (
                        filteredPapers.map((paper) => (
                            <li key={paper.id}>
                              <a href={paper.url} download target='__blank'>{paper.title}<div className="paper-downlon-button"><i className="fa-solid fa-download"></i></div></a>
                                 {/* <hr /> */}
                            </li>
                        ))
                    ) : (
                        <div>
                             <p style={{color : '#000',fontSize : '1.2rem' , fontWeight : '500'}}>Not Available</p>
                           
                        </div>
                    
                        
                    )}
                    </div>
                <LongWidthAds/>
                    <div className="name-instruction">
                        <h3>INSTRUCTION :)</h3>
                    <p style={{fontWeight : '500'}}>If  you don't understand the naming system then i will guide you to understand. Here is the decode...</p>
                    <p style={{padding : '0rem 0 0 1rem', color : 'black', fontSize : '0.9rem'} }>Department Name / Paper Name --Student Year -- which Semester -- Core paper Name -- sem / mid -- Ug/Pg -- Session.</p>

                    <p style={{margin : '4rem 0', color : '#000',fontWeight : '600' }}>Don't Forgate to give feedback.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Downloadpdf
