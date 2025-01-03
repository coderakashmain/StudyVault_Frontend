import React from 'react'
import './MessaBox.css'
import { useNavigate } from 'react-router-dom'

import addanimation from '../../photo/addanimation.json'
import Lottie from 'lottie-react'
import LongWidthAds from '../../Component/AddSense/LongWidthAds'


const MessageBox = () => {
    const navigate = useNavigate();
  return (
    <aside id = 'message-box'>
              {/* <div className="ads-center">
               <LongWidthAds background = "var(--backcolor)"/>
               
              </div> */}
      <div className="message-inside-box">
          <div className="message-item-box">
             <h2>Free Papers!!</h2>
             <Lottie animationData={addanimation} loop={true} autoPlay={true} style={{width : '10rem', height : '10rem', transform : 'scale(3) translateX(10%)'}}/>
             <p>You can enter session as <br/> 2020-2025</p>
          </div>

      </div>
    </aside>
  )
}

export default MessageBox
