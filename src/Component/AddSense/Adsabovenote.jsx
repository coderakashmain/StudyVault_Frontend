import React, { useEffect } from 'react'

const Adsabovenote = () => {
    useEffect(() => {
  

        if (process.env.NODE_ENV === 'production') {
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
        }
    }, []);
    if (process.env.NODE_ENV !== 'production') {
        return null;
    }
    return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
            <ins className="adsbygoogle"
                style={{display : 'block'}}
                data-ad-client="ca-pub-9796833231647897"
                data-ad-slot="7991394440"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    )
}

export default Adsabovenote
