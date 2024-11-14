
import React from 'react'
import './Alart.css'
import check from '../../photo/check2.png'
import mark from '../../photo/mark.png'
import cancel from '../../photo/close.png'

const Alart = (props) => {

  return (
    <div id="alart">
         {props.alart && <div id='alart-box' style={{padding : '0.8rem 1.5rem 0.8rem 1rem', position : 'fixed', top : '10%' , right : '2%', zIndex : '2000',borderRadius : '0.7rem' }}>
           <p style={{fontSize : '1rem',color : '#fff',fontWeight : '600'}}> <img  src={cancel} alt="succes button" /><strong style={{color : '#000',fontSize : '1rem',fontWeight : '600'}}>{props.alart.type} </strong> {props.alart.msg}</p> 
    </div>}  
   
    </div>
 
  )
}
 
export default Alart
