import React, { useEffect } from 'react'


const Morenoteabove = () => {
  useEffect(() => {
    // Dynamically create and insert the AdSense script

    if (process.env.NODE_ENV === 'production') {

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
    <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: "50%", transform: 'translate(-50%,-50%)', opacity: '0.5' }}
        role="status"
        aria-label="Loading"
      >Loading...</div>
      <ins className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center', minWidth: '250px', width: '100%' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-9796833231647897"
        data-ad-slot="6534271728"></ins>
    </div>
  )
}

export default Morenoteabove
