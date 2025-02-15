import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import "./GoogleAuth.css"
import { useNavigate } from "react-router";


const  GoogleAuth = ({userdata , showAlart})=> {
    const googleClientId = import.meta.env.VITE_AUTH_CLIENTID_GOOGLE;
  
    const navigate = useNavigate();
    
    

   
  const handleSuccess = async (response) => {
  
    
    try {
      const res = await axios.post('/api/auth/google', {
        token: response.credential,
      
      },{  withCredentials : true});

      showAlart("Login Seccessfull","","check");
      sessionStorage.setItem('isLoggedIn', 'true');
      userdata(res.data);
     
        navigate("/", { replace: true });
 

    } catch (error) {
      showAlart("Error","","mark");
      console.error("Error sending token to backend:", error);
    }
  };

  const handleFailure = () => {
    console.error("Google login failed");
  
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId} >
      <div className="google-auth" >
      <div className="custom-google-btn">
      <GoogleLogin 
      onSuccess={handleSuccess}
       onError={handleFailure}
       flow="redirect" // ← Forces redirect mode
        redirectUri="https://studyvault.online"
        />
    </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;
