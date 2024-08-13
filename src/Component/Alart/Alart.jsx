
import React from 'react'


const Alart = (props) => {

  return (
    <div id="alart">
         {props.alart && <div id='alart'style={{padding : '0.8rem 1rem', background : ' linear-gradient(#5899db, #6e7b959c)', position : 'fixed', top : '13%' , right : '2%', zIndex : '2000',borderRadius : '0.2rem'}}>
           <p style={{fontSize : '0.9rem',color : '#fff'}}><strong style={{color : '#fff',fontSize : '0.9rem',fontWeight : '400'}}>{props.alart.type} :</strong> {props.alart.msg}</p> 
    </div>}  
    </div>
 
  )
}

export default Alart
