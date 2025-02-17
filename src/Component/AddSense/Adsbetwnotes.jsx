import React, { useEffect } from 'react'


const Adsbetwnotes = () => {
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
 <div style={{width: '100%', overflow : 'hidden' }}>
 <ins className="adsbygoogle"
     style={{display : 'block',minWidth : '250px',width  :'100%'}}
     data-ad-format="fluid"
     data-ad-layout-key="-fb+5w+4e-db+86"
     data-ad-client="ca-pub-9796833231647897"
     data-ad-slot="9120643284"></ins>
     </div>
 )
}

export default Adsbetwnotes
