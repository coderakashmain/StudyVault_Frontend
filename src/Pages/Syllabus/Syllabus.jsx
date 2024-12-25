import React, { useEffect } from 'react'
import './Syllabus.css'



const Syllabus = (props) => {
  useEffect(() => {
      // Calling the function passed as a prop
      props.subheadingtypedata("Syllabus");
    }, []);
  
  return (
    <section id='syllbus-component'>
      <h1>We are working on It</h1>
    </section>
  )
}

export default Syllabus
