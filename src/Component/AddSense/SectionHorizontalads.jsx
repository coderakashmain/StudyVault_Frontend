import React ,{useEffect,useState} from 'react'
import {CloudSun} from "lucide-react"

const SectionHorizontalads = () => {
    const [isLoading, setIsLoading] = useState(true);
 useEffect(() => {
        // Dynamically create and insert the AdSense script

        if(process.env.NODE_ENV === 'production'){
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
            setIsLoading(false);
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
    <div style={{width : '100%' ,display : 'flex',justifyContent : 'center'}}>

{isLoading ? (
             <div
             style={{
               height: '5rem',
               background: 'rgb(235 237 245)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               color: '#888',
               fontSize: '14px',
               width : '95%',
               borderRadius : '0.5rem'
             }}
           >
             <CloudSun />
           </div>
      ) :  (
        <ins class="adsbygoogle"
      style={{display : 'flex', background : '#F2F2FB',justifyContent : 'center'}}
      data-ad-client="ca-pub-9796833231647897"
      data-ad-slot="4000372064"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>)}

    </div>
  )

}

export default SectionHorizontalads
