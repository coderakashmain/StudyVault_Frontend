import React, { useEffect, useRef } from 'react'
import './Preloader.css'
const Preloader = () => {
    const preloaderRef = useRef();

    useEffect(()=>{
    
        const preloader =()=>{
            preloaderRef.current.style.display = 'none';
        }
        window.addEventListener('load',preloader);

        return ()=>{
            window.removeEventListener('load',preloader);
        }
    },[])
  return (
    <div ref={preloaderRef} id='preloader' style={{background : '#fff',position : 'fixed',height  :'100vh',width : '100%',zIndex : '1000',display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
            <div className="preloader-box">
                <div className="preloader-circle"></div>
            </div>
    </div>
  )
}

export default Preloader
