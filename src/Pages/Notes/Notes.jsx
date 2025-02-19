import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./Notes.css";

import axios from 'axios'
// import { useInView } from 'react-intersection-observer';
import throttle from 'lodash/throttle';
import { MousePointerClick, ArrowDownToLine } from 'lucide-react'
import { NavLink, useNavigate } from "react-router-dom";
import Morenoteabove from "../../Component/AddSense/Morenoteabove";
import Adsbetwnotes from "../../Component/AddSense/Adsbetwnotes";
import Adsabovenote from "../../Component/AddSense/Adsabovenote";
import { AlartContectValue } from "../../Context/AlartContext/AlartContext";


import { UserContext } from "../../Context/UserContext/UserContextdata";
import GoogleAuth from "../../auth/GoogleAuth";




const Notes = () => {
  const [inputValue, setInputValue] = useState("");

  const [notelist, setNotelist] = useState([]);
  // const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [activeNote, setActiveNote] = useState(null);
  const [visibleNotes, setVisibleNotes] = useState(10);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const notelistRef = useRef(null);
  const { showAlart } = useContext(AlartContectValue);
  const [loginpop, setLoginpop] = useState(false);
  const navigate = useNavigate();
  const { setUsernav } = useContext(UserContext);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filternote = () => {
    if (inputValue.trim() === "") {
      const notelistdata = notelist.sort((a, b) => a.notefullname.localeCompare(b.notefullname));
      setFilteredNotes(notelistdata);
    } else {
      const filtered = notelist.filter((note) =>
        note.notefullname.toLowerCase().includes(inputValue.toLowerCase())
      ).sort((a, b) => a.notefullname.localeCompare(b.notefullname));


      setFilteredNotes(filtered);
      if (notelistRef.current) {
        notelistRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }


    }
  };
  useEffect(() => {
    if (inputValue.trim() === "") {
      const notelistdata = notelist.sort((a, b) => a.notefullname.localeCompare(b.notefullname));

      setFilteredNotes(notelistdata);
    }

  }, [inputValue])

  useEffect(() => {
    setInputValue('');
    if (notelist.length > 0 && !inputValue) {
      const notelistdata = [...notelist].sort((a, b) =>
        a.notefullname.localeCompare(b.notefullname)
      );
      setFilteredNotes(notelistdata);

    }
  }, [notelist]);



  useEffect(() => {
    const fetchpdf = async () => {
      try {
        const response = await axios.get('/api/notefetch');

        setNotelist(response.data);
        setFilteredNotes(response.data);

      } catch (err) {
        console.error("Error fetching notes", err);
      }
    }
    fetchpdf();

  }, [])
  // const embedUrl = notelist.url.replace('/view', '/preview');
  const handlePreviewClick = throttle(async (id, originalUrl) => {
    setActiveNote(id);
    try {
      const response = await axios.post('/api/noteClickCount', { id });
    } catch (error) {
      console.error("Error updating click count", error);
    }
  }, 5000);

  const handleLoadMore = () => {
    setVisibleNotes((prev) => prev + 10);
  };



  const handledownloadCount = throttle(async (id, filename, unit, fileUrl) => {

    try {
      const response = await axios.post('/api/notedonwloadcount', { id, filename, unit, fileUrl });
    } catch (error) {
      console.error("Error updating click count", error);
    }
  }, 5000);

  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  const handleDownload = (fileUrl, filename, id, unit) => {

    if (isLoggedIn) {
      const fileId = extractDriveFileId(fileUrl);

      if (fileId) {
        const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        const link = document.createElement('a');
        link.href = directDownloadUrl;
        link.download = filename || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showAlart("Download started", '', 'check')
        handledownloadCount(id, filename, unit, fileUrl);
      } else {
        alert('Invalid Google Drive URL');
      }
    } else {
      showAlart('Login First', '', 'mark')
      setLoginpop(true);
    }

  };
  useEffect(() => {
    if (loginpop) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }

  }, [loginpop]);

  // Function to extract file ID from Google Drive URL
  const extractDriveFileId = (url) => {
    const match = url.match(/\/d\/(.*?)\//);
    return match ? match[1] : null;
  };
  const logincancle = () => {
    setLoginpop(false);
  }




  return (
    <section id="notes">
      <div className="notes-box">
        <h1>Notes Section📝</h1>
        {/* <h1>Notes are not available for now 🍳 Working on it...</h1> */}
        <div className="notes-search-box">


          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search here...."
            required
          />
          <motion.button
            onClick={filternote}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ backgroundColor: '#1d3e46' }}
          >
            Search
          </motion.button>

        </div>

        <h2>All notes for free⛓️‍💥</h2>
        <p>📚 Plus 3 Graduation Notes – Get notes from all departments, curated for your success.  Totally free—we provide them to help you excel in your studies and achieve your goals!</p>

        <h3 style={{ marginBottom: '2rem' }}>Subject wise ⬇️</h3>
        <div className="ads-container-box" style={{padding : '20px 0px'}}>
            <Adsabovenote />
          </div>
        <div className="notelistbox" ref={notelistRef}>
         
          {filteredNotes && filteredNotes.length > 0 ? (
            filteredNotes.slice(0, visibleNotes).map((note, index) => (
              <React.Fragment key={note.id}>
                <div style={{ marginBottom: '20px' }} className="notelistboxinside">
                  <h4>{note.notefullname} - {note.unit}</h4>
                  {activeNote === note.id ? (
                    <iframe
                      src={note.url?.replace('/view', '/preview')}
                      width="100%"
                      loading="lazy"
                      style={{
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        height: '12rem'
                      }}
                      title={note.notefullname}
                    />
                  ) : (
                    <button onClick={() => handlePreviewClick(note.id, note.url)}>
                      Preview Note
                    </button>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p>{note.subjectname} 📝</p>
                    <p style={{ userSelect: 'none' }}>
                      {note.totalClicks} <MousePointerClick size={15} style={{ marginRight: '1rem' }} />
                      {note.totaldownload}
                      <span style={{ display: 'inline-block', cursor: 'pointer' }} className="active note-download-btn">
                        <ArrowDownToLine size={20} stroke="#28A745" className="active " style={{ cursor: 'pointer' }} onClick={() => handleDownload(note.url, note.notefullname, note.id, note.unit)} />
                      </span>

                    </p>
                  </div>
                </div>
                {/* Show Ad after every 5 notes */}
                {((index + 1) % 4 === 0) && (
                  <div className="ads-container-box">
                    <Adsbetwnotes />
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <p style={{ margin: '2rem 0rem', textAlign: 'center', color: 'red' }}>No notes available</p>
          )}
        </div>
        <div className="ads-container-box">
              <Morenoteabove />
            </div>
        {visibleNotes < notelist.length && filteredNotes.length > 0 && (
          <>
           
            <button
              onClick={handleLoadMore}
              style={{
                padding: '10px 20px',
                margin: '20px auto',
                backgroundColor: 'rgb(14 85 164)',
                width: '20rem',
                color: '#fff',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'block',

              }}
            >
              Load More Notes
            </button>
          </>
        )}
        <div className="note-footer-link">
          Search for more  <NavLink to='/filter/syllabus'>Syllabus </NavLink> || <NavLink to='/filter'>Questions</NavLink>

        </div>

      </div>
      <div className={`loginpopup ${loginpop ? 'loginpoptrue' : ''}`} >
        <div className={`login-popup ${loginpop ? 'loginpoptruebox' : ''}`}>
          <h3 className="login-popup-title">Login to access and download notes</h3>
          <p className="login-popup-text">
            You need to be logged in to download notes. Please login or sign up to continue.
          </p>
          <div className="login-popup-buttons">
            <button onClick={logincancle} className="cancel-btn">Cancel</button>
            <button onClick={() => navigate('/login')} className="login-btn">Login</button>
          </div>
          <p style={{ color: '#fff', margin: '1rem 0rem' }}>or</p>
          <GoogleAuth userdata={setUsernav} showAlart={showAlart} />
        </div>
      </div>

    </section>
  );
};

export default Notes;
