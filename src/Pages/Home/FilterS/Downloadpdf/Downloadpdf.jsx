import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './Downloadpdf.css'
import BackButton from '../../../../Component/Backbutton/Backbutton';


const Downloadpdf = () => {

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
                                {paper.title} - <a href={paper.url} download>Download</a>
                            </li>
                        ))
                    ) : (
                        <p>No papers found</p>
                    )}
                    </div>
                   
                </div>
            </div>
        </>
    )
}

export default Downloadpdf
