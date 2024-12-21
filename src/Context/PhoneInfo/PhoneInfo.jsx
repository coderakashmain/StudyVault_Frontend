import React, { createContext } from 'react'

export const Photonumdata = createContext();
const PhoneInfo = (props) => {


    const jituemailAddress = "jitpradhan856@gmail.com"; // Your email address
    const akashemailAddress = "akashbindhani8144@gmail.com"; // Your email address

  return (
    <Photonumdata.Provider value={{jituemailAddress,akashemailAddress}}>
        {props.children}
    </Photonumdata.Provider>
  )
}

export default PhoneInfo
