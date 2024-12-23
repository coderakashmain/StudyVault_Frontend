import React, { useEffect } from 'react';

const HomeAdd1 = () => {
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
  }, []);  // Empty array ensures the effect runs only once when the component mounts

  
  return (
    <div>

<ins class="adsbygoogle"
     style={{ display: 'block', width: '100%', minWidth: '250px' }} 
     data-ad-format="fluid"
     data-ad-layout-key="-f9+4w+7x-eg+3a"
     data-ad-client="ca-pub-9796833231647897"
     data-ad-slot="7860403674"></ins>
    </div>
  );
};

export default HomeAdd1;
