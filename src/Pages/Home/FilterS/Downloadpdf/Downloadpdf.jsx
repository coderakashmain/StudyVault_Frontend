import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './Downloadpdf.css'
import BackButton from '../../../../Component/Backbutton/Backbutton';


const Downloadpdf = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [papers, setPapers] = useState([]);
    

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


    

    return (
        <>
            <BackButton />
            <div id='download-pdf' >
              
                <div className="download-box">
                    <h2>Download here</h2>
                    <div className="download-data">
                    {papers.length > 0 ? (
                        papers.map((paper) => (
                            <li key={paper.id}>
                                 <a href={paper.url} download target='__blank'>{paper.title} 😊<i className="fa-solid fa-download"></i></a>
                                 <hr />
                            </li>
                        ))
                    ) : (
                        <p>No papers available 😞</p>
                    )}
                    </div>
                   
                </div>
            </div>
        </>
    )
}

export default Downloadpdf
