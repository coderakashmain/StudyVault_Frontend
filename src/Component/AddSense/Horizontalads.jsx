import React, { useEffect } from 'react'


const Horizontalads = () => {
       useEffect(() => {
            // Dynamically create and insert the AdSense script
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9796833231647897';
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
        
            // Push the ad to initialize after the script loads
            script.onload = () => {
              if (window.adsbygoogle) {
                window.adsbygoogle.push({});
              }
            };
        
            return () => {
              // Cleanup the script when the component unmounts
              document.head.removeChild(script);  
            };
          }, []); 
  return (
      <div>
      <ins className="adsbygoogle"
      
      style={{ display: 'block', width: '100%', minWidth: '250px' }} 
      data-ad-client="ca-pub-9796833231647897"
      data-ad-slot="5568441934"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
    </div>
  )
}

export default Horizontalads
