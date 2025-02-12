import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import './Downloadpdf.css'

import LongWidthAds from "../../../../Component/AddSense/LongWidthAds";
import AritcleAds from "../../../../Component/AddSense/AritcleAds";
import Footer from '../../FooterS/Footer';
import PDFViewer from "../../../../Component/PdfViewer/PdfViewer";
import Pdfads from "../../../../Component/AddSense/Pdfads";


const Downloadpdf = (props) => {
    const navigate = useNavigate();
    const {pdfName} = useParams();
    const location = useLocation();

    const [papers, setPapers] = useState([]);
    const searchRef = useRef();
    const [searchbaractivecheck, setsearchbaractivecheck] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [clickCount, setClickCount] = useState(0); // Track clicks for ads
    const [showAd, setShowAd] = useState(false); // Show interstitial ad
    const [networkslow, setNetworkslow] = useState(false);
    const { data } = location.state || { data: [] };
    const [selectedPdf, setSelectedPdf] = useState(null);
    const[donatepopup,setDonatePopup] = useState(false);
    


    useEffect(() => {
      const networkslowtimeout =  setTimeout(() => {
            setNetworkslow(true);
        }, 10000);

        return ()=> clearTimeout(networkslowtimeout)
    }, [loading])

    useEffect(()=>{
        if(data){
            setPapers(data);
        setLoading(true);
        }else{
            setPapers([{ id: "error", title: "Error loading papers, please try again later." }]);
            setLoading(true);
        }
        
    },[])





    const filteredPapers = papers.filter((paper) =>
        paper.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleclicksearch = () => {
        if (!searchbaractivecheck) {
            searchRef.current.style.transform = 'translate(0%) scale(1)';
            searchRef.current.style.margin = ' 1rem 0 2rem 0';
            searchRef.current.style.opacity = ' 1';

            setsearchbaractivecheck(!searchbaractivecheck);
        } else {
            searchRef.current.style.transform = 'translateY(-100%) scale(0)';
            searchRef.current.style.margin = ' 0rem 0';
            searchRef.current.style.opacity = '0';
            setsearchbaractivecheck(!searchbaractivecheck);
        }

    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const backnavigate = () => {
        navigate(-1);
    }



    const handleClickPaper = (paper) => {
        setClickCount((prevCount) => prevCount + 1);

     
        if ((clickCount + 1) % 2 === 0) {
            setShowAd(true);
          const timout =   setTimeout(() => {
                setShowAd(false);
            
            }, 5000); 
            return ()=> clearTimeout(timout)
        // navigate(`/Downloadpdf/${paper.title}`) 
        // setSelectedPdf(paper.url);
   
        } else {
   
            navigate(`/Downloadpdf/${paper.title}`) 
            setSelectedPdf(paper.url);
        }

    };
    const handleCloseViewer = () => {
        setSelectedPdf(null); 
        navigate(-1) 
    };
    useEffect(() => {
        const handleBackButton = (event) => {
            // event.preventDefault();
            setSelectedPdf(null); 
        };

        window.addEventListener("popstate", handleBackButton);

        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [navigate]);

useEffect(()=>{
    if(selectedPdf){
        document.body.style.overflow = 'hidden';
    }else{
        
        document.body.style.overflowY = 'scroll';
    }
},[selectedPdf]);


useEffect(() => {
    const isRepeat = sessionStorage.getItem("donationpopup");
    if (!isRepeat) {
        const timeoutId = setTimeout(() => {
            setDonatePopup(true);
            sessionStorage.setItem("donationpopup", "true");
        }, 30000);  // 10 seconds

        return () => clearTimeout(timeoutId);
    }
}, []);



    return (
        <>
            {/* <BackButton /> */}
            <div id='download-pdf' >

                <header>
                    <div className="back-to-filter active" onClick={backnavigate}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>
                    <h1>StudyVault<sub>Downloads</sub></h1>
                    <div className="search-resources back-to-filter active" onClick={handleclicksearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    {/* <hr /> */}
                </header>

                <div className="download-box">
                    <div className="search-resuorces" ref={searchRef}>
                        <input type="text" name="search" id="search" placeholder="Search Core / Paper Name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <h2>RESULTS</h2>

                    {loading ? (<div className="download-data">
                        {filteredPapers.length > 0 && filteredPapers ? (
                            filteredPapers.map((paper) => (
                                <li key={paper.id} onClick={() => handleClickPaper(paper)} >
                                    <div className="each-paper-box" >{paper.title}<div className="paper-downlon-button"><i className="fa-solid fa-download"></i></div></div>
                                    {/* <hr /> */}
                                </li>
                            ))
                        ) : (
                            <div>
                                <p style={{ color: '#000', fontSize: '1.2rem', fontWeight: '500' }}>Not Available</p>

                            </div>


                        )}
                    </div>) : (
                        <div className="download-data">
                            <p style={{ color: '#000', fontSize: '1rem', fontWeight: '500', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <box-icon name='loader' flip='vertical' animation='spin' color="#000"  ></box-icon>  Loading...</p>
                            {networkslow && !loading && (<p style={{ padding: '5rem 0 0', color: '#000' }}>Slow Network<i className="fa-solid fa-wifi" style={{ padding: '0rem 1rem', color: "red", fontSize: '1rem' }}></i></p>)}
                        </div>
                    )}

                    <LongWidthAds background="rgb(242 244 246)" />

                    {showAd &&  (
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.8)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                zIndex: 999999999999,
                           
                            }}
                        >
                            <button
                                style={{
                                    position: "absolute",
                                    top: "1rem",
                                    right: "1rem",
                                    color: "white",
                                    background: "transparent",
                                    border: "none",
                                    fontSize: "1.5rem",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setShowAd(false)
                                    // setSelectedPdf(null);
                                }}
                            >
                                ×
                            </button>
                            <div>
                               <AritcleAds/>
                            </div>
                        </div>
                    )}
                   { data.length > 0 ? ( <div className="name-instruction">
                        <h3>INSTRUCTION :)</h3>
                        <p style={{ fontWeight: '500' }}>If  you don't understand the naming system then i will guide you to understand. Here is the decode...</p>
                        <p style={{ padding: '0rem 0 0 1rem', color: 'black', fontSize: '0.9rem' }}>Department Name / Paper Name _Student Year _ which Semester _ Core paper Name _ sem / mid _ Ug/Pg _ Session.</p>

                        <p style={{ margin: '4rem 0', color: '#000', fontWeight: '600' }}>Don't Forgate to give feedback.</p>
                    </div>) : (
                        <div className="name-instruction">
                            <h3>Sorry we don't have  resources that you need. </h3>
                            <p>We shall try to upload as soon as possible.</p>
                            <p>Or you can enter session as <strong style={{fontWeight : '600', fontStyle : 'italic'}}>2020-2025</strong> so if their are any resources present during those session, you can get.</p>
                            <p>Check  you have entered correct Department name. If your enter name and search suggestion name aren't same then you can not get any results;</p>
                             </div>
                    )}
                </div>

            
            </div>
            <Footer/>
                {selectedPdf && <PDFViewer pdfUrl={selectedPdf} onClose={handleCloseViewer} />}
           { donatepopup && filteredPapers.length > 0 && ( <div className="donation-popup">
                <div className="donation-popup-box">
                    <h1>Hey Dear User, <br /> Support our growth by Donating to us!</h1>
                    <span>This website is running on our own funds, and we're unsure how far we can take it.  Your support can help us sustain and expand StudyVault to benefit more students!</span>

                    <button className="active" onClick={()=> navigate('/payment-donate-us')}>Donate Us</button>
                    <p onClick={()=>setDonatePopup(false)}> I do it later</p>

                </div>
            </div>)}
        </>
    )
}

export default Downloadpdf
