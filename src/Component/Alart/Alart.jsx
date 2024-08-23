
import React from 'react'
import './Alart.css'

const Alart = (props) => {

  return (
    <div id="alart">
         {props.alart && <div id='alart-box' style={{padding : '0.8rem 1rem', background : 'purple', position : 'fixed', top : '10%' , right : '2%', zIndex : '2000',borderRadius : '0.2rem'}}>
           <p style={{fontSize : '1rem',color : '#fff',fontWeight : '500'}}><strong style={{color : '#fff',fontSize : '1rem',fontWeight : '500'}}>{props.alart.type} </strong> {props.alart.msg}</p> 
    </div>}  
    </div>
 
  )
}
 
export default Alart
