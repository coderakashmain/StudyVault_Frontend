import React, { useEffect, useState } from 'react'
import "./Scrollbtn.css"
import Navbar from '../../Navbar/Navbar'
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

        scrollbtn.addEventListener('click',()=>{
            console.log('hle');
            console.log(Navbar.navbar);
        })
    },[])
  return (
    <div id='scrollbtn' className= {`${sticky ? '' : 'hide-btn'}`}>
        <i className="fa-solid fa-arrow-up"></i>
    </div>
  )
}

export default Scrollbtn
