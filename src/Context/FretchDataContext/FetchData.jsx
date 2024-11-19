import React, { createContext,useState } from 'react'

export const FetchDataContext = createContext();

const FetchData = ({children}) => {
    const [paperList, setPaperList] = useState([]);
  
  return (
   <FetchDataContext.Provider value={{ paperList, setPaperList }}>
    {children}
   </FetchDataContext.Provider>
  )
}

export default FetchData
