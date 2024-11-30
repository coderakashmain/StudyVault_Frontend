import React from 'react'
import './MessaBox.css'
import { useNavigate } from 'react-router-dom'


const MessageBox = () => {
    const navigate = useNavigate();
  return (
    <aside id = 'message-box'>
        <h3><s>Guys Currently i was working on login problem </s><br /> Now  it has fixed. <br /><b>For one time you have to reset your password again.</b> </h3>
        <button onClick={()=> navigate('/LogIn/ForgatePw')}>Reset Now</button>
    </aside>
  )
}

export default MessageBox
