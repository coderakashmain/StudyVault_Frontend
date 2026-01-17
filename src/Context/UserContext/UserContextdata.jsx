import React, { createContext, useContext, useState } from 'react'


export const UserContext = createContext();

export const useUserData = ()=> {return useContext(UserContext);}

const UserContextdata = ({children}) => {
  const [usernav, setUsernav] = useState(null);
  const [userData,setUserdata] = useState(null)

 
  return (
    <UserContext.Provider value={{ usernav, setUsernav ,userData,setUserdata}}>
            {children}
        </UserContext.Provider>
  )
}

export default UserContextdata
