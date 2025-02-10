
import { useEffect,useRef } from "react";
import axios from "axios";
// import "./ReCaptcha.css"
import './Recapthacloud.css'

const ReCaptcha = ({ onVerified }) => {
  const scriptLoaded = useRef(false); 
  const siteKey = import.meta.env.VITE_ARECAPTCHA_SITE_KEY_CLOUDFIRE;



  useEffect(() => {
    if (!siteKey) {
      console.error("Cloudflare Turnstile site key is missing.");
      return;
    }

    // Load Turnstile script only if it hasn't been loaded yet
    if (!scriptLoaded.current) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Render the Turnstile widget
        if (window.turnstile) {
          window.turnstile?.render("#captcha-container", {
            sitekey: siteKey,
            callback: (token) => {
    

              // Send the token to your backend for validation (optional)
              axios
                .post("/api/verify-turnstile", { token })
                .then((response) => {
                  if (response.data.success) {
                    onVerified(true);
                    
                  } else {
                    onVerified(false);
                    console.error("Turnstile verification failed.");
                  }
                })
                .catch((error) => {
                  console.error("Error verifying Turnstile token:", error);
                  onVerified(false);
                });
            },
          });
        } else {
          console.error("Turnstile is not available.");
        }

        // Mark script as loaded
        scriptLoaded.current = true;
      };

      script.onerror = () => {
        console.error("Failed to load Turnstile script.");
      };

      document.body.appendChild(script);

      return () => {
        // Cleanup on unmount
        document.body.removeChild(script);
      };
    }

  }, [ siteKey]);

  return (
    <div className="captcha">
  {/* <div className="captcha-content"> */}
    {/* <h1>studyvault.online</h1>
    <p>Verifying you  are a human or not.</p> */}
    <div id="captcha-container" className="cf-turnstile"></div>
    {/* <p>StudyVault needs to review the security of your connection before proceeding.</p>
    <p>Protected by <span >Cloudflare</span></p> */}
  {/* </div> */}
</div>

  );
};

export default ReCaptcha;






// import React, { useContext } from 'react';
// import { useEffect } from 'react';
// import './ReCaptha.css'


// import axios from 'axios';

// const ReCaptha = ({onVerified}) => {
 
//   const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  

//   useEffect(() => {
  
//     const loadRecaptcha = () => {
      
//       if (!window.grecaptcha) {
//         const script = document.createElement('script');
//         script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
//         script.async = true;
//         script.defer = true;

//         script.onload = () => {

         
//           window.grecaptcha.ready(() => {

//             window.grecaptcha.execute(siteKey, { action: 'homepage' }).then((token) => {
           
//               axios.post('/api/verify-recaptcha', { token })
//               .then(response => {
//                 if (response.data.success) {
//                   onVerified(true); // Notify parent of successful verification
//                 } else {
//                   onVerified(false); // Notify parent of failed verification
//                   console.error('reCAPTCHA verification failed');
//                 }
//               })
//               .catch(error => {
//                 console.error('Error during reCAPTCHA verification:', error);
//                 onVerified(false);
//               });
//             });
//           });
//         };

//         script.onerror = () => {
//           console.error("Failed to load reCAPTCHA script.");
//         };
      
//         document.body.appendChild(script);
//       }
//       else {
//         window.grecaptcha.ready(() => {
//           window.grecaptcha.execute(siteKey, { action: 'homepage' }).then((token) => {
//             axios.post('/api/verify-recaptcha', { token })
//               .then(response => {
//                 if (response.data.success) {
//                   onVerified(true);
//                   sessionStorage.setItem('isVerified', 'true');
//                 } else {
//                   onVerified(false);
//                   console.error('reCAPTCHA verification failed');
//                 }
//               })
//               .catch(error => {
//                 console.error('Error during reCAPTCHA verification:', error);
//                 onVerified(false);
//               });
//           });
//         });
//       }
//     };

//     if (siteKey) {
//       loadRecaptcha();
//     } else {
//       console.error("ReCAPTCHA site key is not defined");
//     }


//   }, [onVerified,siteKey]);

//   return (
//     <div className='capta-box'>
//       <h1>Welcome to the StudyVault</h1>
//       <div className="capta-box-p">
//       <p> <box-icon name='loader' flip='vertical' animation='spin' color= "#000"  ></box-icon> Verifying reCAPTCHA, please wait...</p>
//       </div>
//     </div>
//   );
// };

// export default ReCaptha;
