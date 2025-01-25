import React from 'react'
import Lottie from 'lottie-react'
// import loadinganimation from '../../photo/lottieflow-loading-04-2-000000-easey.json'
import loadinglogo from '../../photo/weblogo.png'
import "./Loadingicon.css"

const Loadingicon = () => {
    
  return (
    <div style={{ minHeight : '100svh', minWidth : '100%', backgroundColor : 'rgb(59 59 59)',display : 'flex', justifyContent :  'center', alignItems : 'center',position : 'fixed', zIndex : '1000000',flexDirection : 'column'}}>
      {/* <Lottie animationData={loadinganimation} loop={true} autoPlay={true} style={{width : '6rem', height : '6rem'}}/> */}
      <div className="mainloading" >
        <img src={loadinglogo} alt="weblogo" />
      </div>
      <p style={{color : '#fff', marginTop : '0.4rem ', fontWeight :'500',userSelect : 'none'}}>Loading..</p>
    </div>
  )
}

export default Loadingicon
