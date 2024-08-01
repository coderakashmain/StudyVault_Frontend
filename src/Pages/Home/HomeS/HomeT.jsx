import React from "react";
import "./HomeT.css";
import "remixicon/fonts/remixicon.css";
import Image from "./home-image.png";

const HomeT = () => {
  return (
    <>
      <div className="main-container">
        <div className="landing-section">
          <div className="inner-landing">
            <div className="home-info">
              <h1>Hi! I Am</h1>
              <h2>Dharama Pradhan</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                voluptate libero illo ad iure praesentium itaque unde deserunt
                laboriosam porro.
              </p>
              <div className="live-count">
                <div className="counts">
                  <h3>500K+</h3>
                  <p>Users use this app</p>
                </div>
                <div className="counts">
                  <h3>20K+</h3>
                  <p>Users review this app</p>
                </div>
                <div className="counts">
                  <h3>1K+</h3>
                  <p>user review this app</p>
                </div>
              </div>
              <div className="buttons-home">
                <button>Read me</button>
                <a href="">
                  Sign Up <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
            <div className="home-image-section">
              <div className="background-image">
                <img src={Image} alt="not found" />
              </div>
              <div className="overfolw-box box-one">
              <i class="fa-solid fa-cloud"></i>
                <div>
                <h2>Questions</h2>
                <p>We are alwes for you Here</p>
                </div>
              </div>
              <div className="overfolw-box box-two">
              <i class="fa-solid fa-file-pdf"></i>
                <div>
                <h2>Notes</h2>
                <p>We are alwes for you Here</p>
                </div>
              </div>
              <div className="overfolw-box box-three">
              <i class="fa-solid fa-id-card-clip"></i>
                <div>
                <h2>Documnets</h2>
                <p>We are alwes for you Here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomeT;
