import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useLocation } from "react-router";


const  GoogleAuth = ({userdata , showAlart})=> {
    const googleClientId = import.meta.env.VITE_AUTH_CLIENTID_GOOGLE;
    const location = useLocation();
    

   
  const handleSuccess = async (response) => {
    // console.log("Google login successful:", response);
    
    try {
      const res = await axios.post("/api/auth/google", {
        token: response.credential,
      });
      // console.log("Backend Response:", res.data);
      showAlart("Login Seccessfull","","check");
      userdata(res.data);
      window.location.href = "/";
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
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;
