import React, { createContext, useState } from 'react'


export const UserContext = createContext();

const UserContextdata = ({children}) => {
  const [usernav, setUsernav] = useState(null);
  return (
    <UserContext.Provider value={{ usernav, setUsernav }}>
            {children}
        </UserContext.Provider>
  )
}

export default UserContextdata
