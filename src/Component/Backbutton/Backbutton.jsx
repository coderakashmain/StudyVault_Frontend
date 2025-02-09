import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Backbutton.css'

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div  className="back-button" style={{zIndex : 1000}}>
        <i onClick={handleBackClick} style={{color : '#333'}} className="fa-solid fa-angle-left"></i>
        </div>
  );
};

export default BackButton;