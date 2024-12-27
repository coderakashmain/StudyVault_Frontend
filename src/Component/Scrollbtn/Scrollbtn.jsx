import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Scrollbtn.css"

const Scrollbtn = (props) => {
    const [sticky, setSticky] = useState(false);
    const scrollbtnRef = useRef();
    // const [navvalueforuse,setnavvalueforuse] = useState('');






    useEffect(()=>{

       
    
       const clicktop =  ()=>{
            window.scrollTo({top : 0 , behavior : 'smooth'});

        };

        scrollbtnRef.current.addEventListener('click',clicktop,{passive : true})
       
       const scrollanim = ()=>{
            if(window.scrollY > 50){
               
               setSticky(true);
            }
            else{
               
             setSticky(false);
            }
        };
        window.addEventListener('scroll',scrollanim,{passive : true});

        
        const navback =  ()=>{
            props.navRefvalue.value.style.transform = 'translateX(0)';  
        };
        scrollbtnRef.current.addEventListener('click',navback,{passive : true})

        return ()=> {
            window.removeEventListener('scroll',scrollanim);
            window.removeEventListener('click',clicktop);
            if( scrollbtnRef.current){

                scrollbtnRef.current.removeEventListener('click',navback)
            }
        }
    },[]);

    const whatpchannellink  ='https://whatsapp.com/channel/0029Vaz0nHC2ER6d7N0Ipa3O';

    const handleEmailButtonClick = () => {
        console.log('Worked');
        window.open(whatpchannellink, '_blank');
      };
  return (
    <>
    <div id='scrollbtn' className= {`${sticky ? '' : 'hide-btn'}`} ref={scrollbtnRef}>
        <i className="fa-solid fa-arrow-up"></i>
    </div>
    <div className={`whatsappopen ${sticky ? 'bottomp' : 'originalp'}`} onClick={handleEmailButtonClick}>
        <i className="fa-brands fa-whatsapp"></i>
    </div>

    </>
  )
}

export default Scrollbtn
