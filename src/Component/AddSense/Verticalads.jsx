import React, { useEffect } from 'react'
    

const Verticalads = () => {
       useEffect(() => {
              // Dynamically create and insert the AdSense script
      
              if(process.env.NODE_ENV === 'production'){

                window.adsbygoogle = window.adsbygoogle || [];

                const existingScript = document.querySelector('script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');

                if (!existingScript) {
                  const script = document.createElement('script');
                  script.async = true;
                  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9796833231647897';
                  script.crossOrigin = 'anonymous';
                  document.head.appendChild(script);
                }
            
              
                const timeout = setTimeout(() => {
                  try {
                    if (window.adsbygoogle) {
                      window.adsbygoogle.push({});
                    }
                  } catch (e) {
                    console.error('AdSense error:', e);
                  }
                }, 500);
          
                return () => clearTimeout(timeout);
              }
            }, []);  
            if (process.env.NODE_ENV !== 'production') {
              return null;
            }
  return (
    <div>
      <ins className="adsbygoogle"
     style={{display : 'block', minWidth: '160px', height: '100%' }}
     data-ad-client="ca-pub-9796833231647897"
     data-ad-slot="4582663326"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
    </div>
  )
}

export default Verticalads
