import React from 'react'
import './Review.css'

const Review = () => {
  return (
    <section id="review">
      <div className="review-inside">
        <h2>Asked Question & Answers</h2>
        <div className="review-write">
          <span>Leave a Comment</span>
          <div className="review-write-out">
            <div className="reivew-write-left-out">

            <div className="review-input-box">
              <div className="review-input-each-box">
                <input type="text" name='name' id='name' placeholder=" " />
                <label for="name">Name<span style={{ color: 'red' }}>*</span></label>

              </div>
              <div className="review-input-each-box">

                <input type="gmail" name='gmail' id='gmail' placeholder=" " />
                <label for="gmail">Gmail <span style={{ color: 'red' }} >*</span></label>
              </div>
              <div className="review-input-each-box">
                <input type="text" name='gender' id='gender' placeholder=" " />
                <label for="gender">Gender</label>

              </div>


            </div>
            <div className="review-input-each-box">
              <textarea name="message" id="massage" placeholder="Write Comment"></textarea>

            </div>
            </div>
            <div className="reivew-write-right-out"></div>

          </div>



        </div>
      </div>
    </section>
  )
}

export default Review
