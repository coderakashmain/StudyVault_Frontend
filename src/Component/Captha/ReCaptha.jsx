import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import zIndex from '@mui/material/styles/zIndex';

const ReCaptha = () => {
  const [captchaValue, setCaptchaValue] = useState(null);
  const sitekey = process.env.REACT_APP_SITE_KEY;

  useEffect(() => {
    // Dynamically load the ReCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${sitekey}`;
    script.async = true;
    script.onload = () => {
    //   console.log('ReCAPTCHA script loaded successfully');
    };
    document.body.appendChild(script);
  }, [sitekey]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please verify you're not a bot!");
      return;
    }

    // Send captchaValue (token) to your backend for verification
    const response = await axios.post('/api/verify-captcha', {
      captcha: captchaValue,
    });

    if (response.data.success) {
      alert('Form submitted successfully');
    } else {
      alert('Captcha verification failed');
    }
  };

  const handleCaptcha = async () => {
    // Call ReCAPTCHA and get a token
    window.grecaptcha.execute(sitekey, { action: 'submit' }).then((token) => {
      setCaptchaValue(token);
    });
  };
//   console.log('Captcha token:', captchaValue);
  return (
    <form onSubmit={handleSubmit} style={{position : 'absolute',top : '0',left : '0', zIndex :'-10'}}>
      {/* Your form fields go here */}
      <button type="button" onClick={handleCaptcha}>
        Verify you're not a bot
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReCaptha;
