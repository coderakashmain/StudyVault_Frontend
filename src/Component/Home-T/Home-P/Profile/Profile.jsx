import React from 'react'
import './Profile.css'

const Profile = () => {
  return (
    <section id="profile">
      <div className="profile-outer-box">
        <div className="profile-info">
          <div className="profile-photoes">
          <div className="profile-cover-photo">
             {/* <img src="https://images.pexels.com/photos/1045535/pexels-photo-1045535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
          </div>
          <div className="profile-main-photo">
            {/* <img src="https://images.pexels.com/photos/2027394/pexels-photo-2027394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Profile
