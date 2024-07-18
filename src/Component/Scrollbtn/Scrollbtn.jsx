import React, { useEffect, useState } from 'react'
import "./Scrollbtn.css"
const Scrollbtn = () => {
    const [sticky, setSticky] = useState(false)
    useEffect(()=>{

        const scrollbtn = document.querySelector('#scrollbtn');
    
        scrollbtn.addEventListener('click',()=>{
            window.scrollTo({top : 0 , behavior : 'smooth'})

        })
        window.addEventListener('scroll',()=>{
            if(window.scrollY > 50){
               
               setSticky(true);
            }
            else{
               
             setSticky(false);
            }
        })
        const navbarscroll = document.querySelector(".navbar");
        scrollbtn.addEventListener('click',()=>{
            navbarscroll.style.transform = 'translate(0)';  
        })
    },[])
  return (
    <div id='scrollbtn' className= {`${sticky ? '' : 'hide-btn'}`}>
        <i className="fa-solid fa-arrow-up"></i>
    </div>
  )
}

export default Scrollbtn
