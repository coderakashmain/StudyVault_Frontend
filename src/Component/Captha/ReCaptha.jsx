import React, { useContext } from 'react';
import { useEffect } from 'react';
import './ReCaptha.css'

import { SiteKeyContextProvider } from '../../Context/SiteKeyContextT/SiteKeyContext ';
import axios from 'axios';

const ReCaptha = ({onVerified}) => {
  const siteKey = useContext(SiteKeyContextProvider);
  

  useEffect(() => {
    
  
    const loadRecaptcha = () => {
      
      if (!window.grecaptcha) {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;

        script.onload = () => {

         
          window.grecaptcha.ready(() => {

            window.grecaptcha.execute(siteKey, { action: 'homepage' }).then((token) => {
           
              axios.post('/api/verify-recaptcha', { token })
              .then(response => {
                if (response.data.success) {
                  onVerified(true); // Notify parent of successful verification
                } else {
                  onVerified(false); // Notify parent of failed verification
                  console.error('reCAPTCHA verification failed');
                }
              })
              .catch(error => {
                console.error('Error during reCAPTCHA verification:', error);
                onVerified(false);
              });
            });
          });
        };

        script.onerror = () => {
          console.error("Failed to load reCAPTCHA script.");
        };
      
        document.body.appendChild(script);
      }
      else {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(siteKey, { action: 'homepage' }).then((token) => {
            axios.post('/api/verify-recaptcha', { token })
              .then(response => {
                if (response.data.success) {
                  onVerified(true);
                  sessionStorage.setItem('isVerified', 'true');
                } else {
                  onVerified(false);
                  console.error('reCAPTCHA verification failed');
                }
              })
              .catch(error => {
                console.error('Error during reCAPTCHA verification:', error);
                onVerified(false);
              });
          });
        });
      }
    };

    if (siteKey) {
      loadRecaptcha();
    } else {
      console.error("ReCAPTCHA site key is not defined");
    }


  }, [onVerified,siteKey]);

  return (
    <div className='capta-box'>
      <h1>Welcome to the StudyVault</h1>
      <div className="capta-box-p">
      <p> <box-icon name='loader' flip='vertical' animation='spin' color= "#000"  ></box-icon> Verifying reCAPTCHA, please wait...</p>
      </div>
    </div>
  );
};

export default ReCaptha;
