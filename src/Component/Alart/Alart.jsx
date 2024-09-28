
import React from 'react'
import './Alart.css'

const Alart = (props) => {

  return (
    <div id="alart">
         {props.alart && <div id='alart-box' style={{padding : '0.8rem 1rem', position : 'fixed', top : '10%' , right : '2%', zIndex : '2000',borderRadius : '0.2rem',backgroundColor : props.alart.color ?props.alart.color : 'rgba(33, 73, 219, 0.795)' }}>
           <p style={{fontSize : '1rem',color : '#fff',fontWeight : '500'}}><strong style={{color : '#fff',fontSize : '1rem',fontWeight : '500'}}>{props.alart.type} </strong> {props.alart.msg}</p> 
    </div>}  
    </div>
 
  )
}
 
export default Alart
