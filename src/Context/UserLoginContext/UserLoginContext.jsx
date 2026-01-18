import React, { createContext, useContext, useEffect,useState } from 'react'
import { UserContext } from '../UserContext/UserContextdata';
import axios from 'axios';
import { useAvatar } from '../AvatarProvider';

export const Userlogincheckcontext = createContext();

const UserLoginContext = (props) => {
    const {setUsernav,setUserdata} = useContext(UserContext);
    const {setAvatarUrl} = useAvatar();
   
    const  [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        const fetchuserlogin = async () => {
            try {
                const response = await axios.get('/api/user/login-check-context');
          
                setUsernav(response.data.data.token);
                setAvatarUrl(response?.data?.data.avatar_url)
                setUserdata(response?.data?.data)
                   setLoginCheck(true)
               
            }
            catch (error) {
                if (error.response && error.response.status === 500) {
                    setLoginCheck(false);
                    console.error('Internal error',error)
                }
                if (error.response && error.response.status === 401) {
                    setLoginCheck(false);
                    console.error('User not found')
                }
                else {
                    setLoginCheck(false);
                    console.error('Internal error',error);
                }
            }
        }
        fetchuserlogin();
    }, []);
    return (
        <Userlogincheckcontext.Provider value  = {{loginCheck,setLoginCheck}}>
            {props.children}
        </Userlogincheckcontext.Provider>
    )
}

export default UserLoginContext
