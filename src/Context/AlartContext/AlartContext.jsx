import React, { createContext, useState } from 'react'

export const AlartContectValue = createContext('');

const AlartContext = ({children}) => {

      const [alart, setAlart] = useState(null);
      
    
      const showAlart = (type, message, state) => {
       
        setAlart({ type, msg: message, state });
    
        
          const timeout = setTimeout(() => {
            setAlart(null);
          }, 4000);
      
          return () => clearTimeout(timeout);
       
      };
      


  return (
    <AlartContectValue.Provider value={{alart,showAlart}}>
      {children}
    </AlartContectValue.Provider>
  )
}

export default AlartContext
