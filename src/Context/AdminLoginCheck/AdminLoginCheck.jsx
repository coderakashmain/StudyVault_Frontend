import React, { createContext } from 'react'
import { useState } from 'react';

export const AdminLoginContext = createContext();

const AdminLoginCheck = (props) => {

  const [check, setCheck] = useState('');
  return (
   <AdminLoginContext.Provider value={{check,setCheck}}>
        {props.children}
   </AdminLoginContext.Provider>
  )
}

export default AdminLoginCheck
