import React from "react";
import "./Review.css";

const Rewvies = () => {
  return (
    <div className="main-reviews">
      <div className="reviews-header">
        <i className="fa-solid fa-snowflake"></i>
        <div className="first-full-header">
          <div className="first-half-header">
            <div className="first-third-half-header">
              <div>
                <h2>
                  Intern{" "}
                  <sup>
                    <i className="fa-solid fa-certificate"></i>
                  </sup>
                </h2>
                <p>
                  Note-Taking <i className="fa-solid fa-angle-right"></i>Evenote
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  Toolfinder Score{" "}
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </p>
                <p>
                  <strong>7.5</strong>/10
                </p>
              </div>
            </div>
            <div className="rating-div">
              <h3>Rateing</h3>
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
      <div className="all-reviews">
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
  );
};

export default Rewvies;
