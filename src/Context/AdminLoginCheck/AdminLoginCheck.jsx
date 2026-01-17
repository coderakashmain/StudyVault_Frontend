import React, { createContext } from 'react'
import { useState } from 'react';
import useApi from '../../hooks/useApi';

export const AdminLoginContext = createContext();

export  const useAdminLogin = () =>{return React.useContext(AdminLoginContext);}

const AdminLoginCheck = (props) => {
  const {get,loading,error} = useApi();
  const [check, setCheck] = useState('');
  const [adminToken,setAdminToken] = useState('');

  const checkAdminLogin = async () => {
    try {
      const response = await get("/Admin/admin-login-check",false);
      setCheck(response.status);

      setAdminToken(response.data.admintoken || '');
    } catch (err) {
      console.error("Error checking admin login:", err);
    }
  };
  React.useEffect(() => {
    checkAdminLogin();
  }, []);

  return (
   <AdminLoginContext.Provider value={{check,setCheck,adminToken,setAdminToken}}>
        {props.children}
   </AdminLoginContext.Provider>
  )
}

export default AdminLoginCheck
