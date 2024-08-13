import React, { createContext, useState } from 'react'


export const ScrollFilterContext = createContext();

const UserContextdata = ({children}) => {
  const [filtersection, setFiltersection] = useState(null);
  return (
    <ScrollFilterContext.Provider value={{ filtersection, setFiltersection }}>
            {children}
        </ScrollFilterContext.Provider>
  )
}

export default UserContextdata
