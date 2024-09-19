import React, { useContext, useEffect, useState } from "react";
import "./Review.css";
import axios from "axios";
import { UserContext } from "../../../Context/UserContext/UserContextdata";


const Review = () => {

  const [feedbackActive, setFeedbackActive] = useState(false);
  const { usernav } = useContext(UserContext);
  const [feedbackActiveagain, setFeedbackActiveagain] = useState();
  const [userdata, setUserData] = useState(null);
  const [gamilcheck, setGmailcheck] = useState('');


  const [feedbackData, setFeedbackData] = useState({
    star: '',
    feedbackmessage: '',
    gmail: gamilcheck
  });
// console.log(feedbackData);

  useEffect(() => {
    if (userdata) {
      const newGmail = userdata.gmail;
      setGmailcheck(newGmail);
      setFeedbackData((prevData) => ({
        ...prevData,
        gmail: newGmail
      }));
    }
    else {
      const newGmail = '';
      setGmailcheck('');
      setFeedbackData((prevData) => ({
        ...prevData,
        gmail: newGmail
      }));
    }
  }, [usernav])
  


  const handlestardata = (stardata) => {
    const starvalue = stardata.target.value;
    setFeedbackData({
      ...feedbackData,
      star: starvalue
    })

  };
  const handlefeedbackdata = (feedbackdata) => {
    const feedvalue = feedbackdata.target.value;
    setFeedbackData({
      ...feedbackData,
      feedbackmessage: feedvalue
    })
  }

  const handlefeedbackdatasubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/feedback-submission', feedbackData, { withCredentials: true });
      // console.log(response.data);

      if (response.status === 200) {
        alert('Post successfully');
      }
      if (response.status === 404) {
        alert('Session Expired you have to log in first');
        setFeedbackActiveagain(false);
        setFeedbackActive(false);
      }
    } catch (error) {
      alert('Session Expired you have to log in first');
      setFeedbackActiveagain(false);
      setFeedbackActive(false);
    }

  };

  const handlecheckuser = async () => {

    try {
      const response = await axios.get('/api/feedback-check', { withCredentials: true });

      if (response.status === 200) {
        setFeedbackActive(true);
        setUserData(response.data);
      }
      else {
        setFeedbackActive(false);
      }
    }

    catch (error) {
      alert('You have to log in First');
      console.error('Error fetching profile');
      setFeedbackActive(false);
    }
  }




  useEffect(() => {

    const handlelogotcheck = async () => {
      try {
        const response = await axios.get('/api/feedback-check', { withCredentials: true });


        if (response.status === 200) {
          setFeedbackActiveagain(true);

        }
        else {
          setFeedbackActiveagain(false);
          setFeedbackActive(false);
        }
      }

      catch (error) {
        console.error('Error fetching profile');
        setFeedbackActiveagain(false);
        setFeedbackActive(false);
        setUserData(null);

      }
    }
    handlelogotcheck();
  }, [usernav]);
  return (
    <div className="main-reviews">
      <div className="reviews-header">
        <i className="fa-solid fa-snowflake"></i>
        <div className="first-full-header">
          <div className="first-half-header">
            <div className="first-third-half-header">
              <div>
                <h2>
                  StudyVault{" "}
                  <sup>
                    <i className="fa-solid fa-certificate"></i>
                  </sup>
                </h2>
                <p>
                  Papers-Notes <i className="fa-solid fa-angle-right"></i>Downloader
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  Tool Quality Score {" "}
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </p>
                <p>
                  <strong>7.5</strong>/10
                </p>
              </div>
            </div>
            <div className="rating-div">
              <h3>Rating</h3>
              <p>
                <i className="fa-solid fa-star"></i>
                <strong>4.8</strong>/5 <u>120 Rating</u>
              </p>
            </div>
          </div>
          <div className="buton-div-header-review">
            <button className="getlink">
              Get link <i className="fa-solid fa-location-arrow"></i>
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="total-average-review">
        <h3>User Reviews</h3>
        <div className="section-one-review">
          <div className="section-half-one">
            <button>Very Good</button>
            <p>
              <strong>
                4.85 <sub>Out of 5</sub>
              </strong>
            </p>
            <p className="star-rating">
              <i className="fa-solid fa-star"></i>
              <span>120 Rating</span>
            </p>
          </div>
          <div className="sectionn-half-two">
            <div>
              <label htmlFor="">Design</label>
              <input type="range" name="" id="" min={0} max={5} />
              <label>3.7</label>
            </div>
            <div>
              <label htmlFor="">Practicalty</label>
              <input type="range" name="" id="" min={0} max={5} />
              <label>3.7</label>
            </div>
            <div>
              <label htmlFor="">Features</label>
              <input type="range" name="" id="" min={0} max={5} />
              <label>3.7</label>
            </div>
            <div>
              <label htmlFor="">value</label>
              <input type="range" name="" id="" min={0} max={5} />
              <label>3.7</label>
            </div>
            <div>
              <label htmlFor="">Perfomance</label>
              <input type="range" name="" id="" min={0} max={5} />
              <label>3.7</label>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="all-reviews-box">
        <div className="all-reviews-givefeedback">
          <h4>Please provide your feedback to us .</h4>
          {!feedbackActive && (<button onClick={handlecheckuser}>Give your Feedback</button>)}
        </div>
        <div className="all-reviews-box-feedback">

          {feedbackActive && feedbackActiveagain && (<div className="feedback-form">
            <form onSubmit={handlefeedbackdatasubmit}>
              <div className="feedback-form-headline">
                <h2>Share your feedback</h2>
                <div className="feedback-user-info">
                  <h4> {userdata.firstname} </h4>
                  <div className="feedback-user-image">
                    <img src="" alt="" />

                  </div>
                </div>
              </div>
              <div className="feedback-rating-box">
                <h4>Rating *</h4>
                <div className="start-box" >
                  <input value='5' onChange={handlestardata} type="radio" name="star" id="star-1" />
                  <label htmlFor="star-1" className="fas fa-star"></label>
                  <input value='4' onChange={handlestardata} type="radio" name="star" id="star-5" />
                  <label htmlFor="star-5" className="fas fa-star"></label>
                  <input value='3' onChange={handlestardata} type="radio" name="star" id="star-4" />
                  <label htmlFor="star-4" className="fas fa-star"></label>
                  <input value='2' onChange={handlestardata} type="radio" name="star" id="star-3" />
                  <label htmlFor="star-3" className="fas fa-star"></label>
                  <input value='1' onChange={handlestardata} type="radio" name="star" id="star-2" />
                  <label htmlFor="star-2" className="fas fa-star"></label>

                </div>
              </div>

              <div className="feedback-area">
                <h4>Please provide your opinion about this app and Do you have any suggestion  ?</h4>
                <textarea onChange={handlefeedbackdata} value={feedbackData.feedbackmessage} id="textarea" name="message" rows='15' placeholder="Type here..." cols='110' required />
              </div>
              <button onClick={() => { setFeedbackActive(false) }} style={{ outline: 'none', border: 'none', background: '', padding: '0.4rem 1rem', cursor: 'pointer' }}>cancal</button>
              <button type="submit"  >Post</button>
            </form>
          </div>)}


          <div style={{ width: `${feedbackActive ? '30%' : ''}` }} className="all-reviews">


            <div className="review-box">
              <div className="review-user-details">
                <div className="review-box-header">
                  <div className="profile-picture"></div>
                  <div className="user-details">
                    <h4>Jitu pradhan</h4>
                    <p>24-dec-2024</p>
                  </div>
                </div>
                <div className="review-star">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <div className="review-text">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non qui
                  aut tempora molestiae quam delectus ex ea veniam quae optio!
                </p>
              </div>
            </div>
            <div className="review-box">
              <div className="review-user-details">
                <div className="review-box-header">
                  <div className="profile-picture"></div>
                  <div className="user-details">
                    <h4>Jitu pradhan</h4>
                    <p>24-dec-2024</p>
                  </div>
                </div>
                <div className="review-star">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <div className="review-text">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non qui
                  aut tempora molestiae quam delectus ex ea veniam quae optio!
                </p>
              </div>
            </div>
            <div className="review-box">
              <div className="review-user-details">
                <div className="review-box-header">
                  <div className="profile-picture"></div>
                  <div className="user-details">
                    <h4>Jitu pradhan</h4>
                    <p>24-dec-2024</p>
                  </div>
                </div>
                <div className="review-star">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>

              </div>
              <div className="review-text">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non qui
                  aut tempora molestiae quam delectus ex ea veniam quae optio!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
