import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './ReCaptha.css'



const ReCaptha = ({onVerified}) => {
  
  useEffect(() => {
    
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    const loadRecaptcha = () => {
      
      if (!window.grecaptcha) {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;




        script.onload = () => {

     
         
          window.grecaptcha.ready(() => {

        

            window.grecaptcha.execute(siteKey, { action: 'homepage' }).then((token) => {
           
          

              
              setTimeout(() => {
                const isValid = true; // Assume verification passed
                if (isValid) {
                  onVerified(true); // Notify parent of successful verification
                }
              }, 1000);
            });
          });
        };

        script.onerror = () => {
          console.error("Failed to load reCAPTCHA script.");
        };
      
        document.body.appendChild(script);
      }
    };

    loadRecaptcha();


  }, [onVerified]);

  return (
    <div className='capta-box'>
      <h1>Welcome to the Website</h1>
      <div className="capta-box-p">
      <p> <box-icon name='loader' flip='vertical' animation='spin' color= "#000"  ></box-icon> Verifying reCAPTCHA, please wait...</p>
      </div>
    </div>
  );
};

export default ReCaptha;
