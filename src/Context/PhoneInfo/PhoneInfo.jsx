import React, { createContext } from 'react'

export const Photonumdata = createContext();
const PhoneInfo = (props) => {

    const akashphonenumber = 8144958844;
    const jituphonenumber = 7735010252;
    const emailAddress = "jitpradhan856@gmail.com"; // Your email address
  return (
    <Photonumdata.Provider value={{akashphonenumber,jituphonenumber,emailAddress}}>
        {props.children}
    </Photonumdata.Provider>
  )
}

export default PhoneInfo
