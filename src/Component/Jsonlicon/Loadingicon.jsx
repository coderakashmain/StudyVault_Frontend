import React from 'react'
import Lottie from 'lottie-react'
import loadinganimation from '../../photo/lottieflow-loading-04-2-000000-easey.json'

const Loadingicon = () => {
    
  return (
    <div style={{ minHeight : '100svh', minWidth : '100%', backgroundColor : '#fff',display : 'flex', justifyContent :  'center', alignItems : 'center',position : 'fixed', zIndex : '1000000'}}>
      <Lottie animationData={loadinganimation} loop={true} autoPlay={true} style={{width : '6rem', height : '6rem'}}/>
    </div>
  )
}

export default Loadingicon
