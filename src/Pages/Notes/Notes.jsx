import React, { useEffect } from 'react'
import './Notes.css'

const Notes = (props) => {
      useEffect(() => {
         
        props.subheadingtypedata("Syllabus");
      
      }, []);
  return (
    <section id='notes'>
        Notes section
    </section>
  )
}

export default Notes
