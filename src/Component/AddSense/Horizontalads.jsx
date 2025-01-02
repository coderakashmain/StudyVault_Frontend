import React, { useEffect } from 'react'


const Horizontalads = (props) => {
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
      <div style={{overflow : 'hidden' }}>
      <ins className="adsbygoogle"
      
      style={{ display: 'block', width: '100%', minWidth: '250px',overflow : 'hidden', maxHeight: '200px', background : props.background  || '#fff'}} 
      data-ad-client="ca-pub-9796833231647897"
      data-ad-slot="5568441934"
      data-ad-format="horizontal"
      data-full-width-responsive="true"></ins>
    </div>
  )
}

export default Horizontalads
