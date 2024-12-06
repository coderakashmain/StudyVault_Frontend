import React, { useEffect, useState } from 'react'
import "./Scrollbtn.css"

const Scrollbtn = () => {
    const [sticky, setSticky] = useState(false)
    
    useEffect(()=>{

        const scrollbtn = document.querySelector('#scrollbtn');
    
       const clicktop =  ()=>{
            window.scrollTo({top : 0 , behavior : 'smooth'});

        };

        scrollbtn.addEventListener('click',clicktop,{passive : true})
       
       const scrollanim = ()=>{
            if(window.scrollY > 50){
               
               setSticky(true);
            }
            else{
               
             setSticky(false);
            }
        };
        window.addEventListener('scroll',scrollanim,{passive : true});

        const navbarscroll = document.querySelector(".navbar");
        const navback =  ()=>{
            navbarscroll.style.transform = 'translate(0)';  
        };
        scrollbtn.addEventListener('click',navback,{passive : true})

        return ()=> {
            window.removeEventListener('scroll',scrollanim);
            window.removeEventListener('click',clicktop);
            scrollbtn.removeEventListener('click',navback)
        }
    },[]);

    const whatpchannellink  ='https://whatsapp.com/channel/0029Vaz0nHC2ER6d7N0Ipa3O';

    const handleEmailButtonClick = () => {
        console.log('Worked');
        window.open(whatpchannellink, '_blank');
      };
  return (
    <>
    <div id='scrollbtn' className= {`${sticky ? '' : 'hide-btn'}`}>
        <i className="fa-solid fa-arrow-up"></i>
    </div>
    <div className={`whatsappopen ${sticky ? 'bottomp' : 'originalp'}`} onClick={handleEmailButtonClick}>
        <i className="fa-brands fa-whatsapp"></i>
    </div>

    </>
  )
}

export default Scrollbtn
