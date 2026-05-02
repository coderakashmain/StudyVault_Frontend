import React, { createContext, useContext, useEffect,useState } from 'react'
import { UserContext } from '../UserContext/UserContextdata';
import useApi from '../../hooks/useApi';
import { useAvatar } from '../AvatarProvider';

export const Userlogincheckcontext = createContext();

const UserLoginContext = (props) => {
    const {setUsernav,setUserdata} = useContext(UserContext);
    const {setAvatarUrl} = useAvatar();
    const { get } = useApi();
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        const fetchuserlogin = async () => {
            try {
                const response = await get('/user/login-check-context', false);
          
                if (response && response.data) {
                    setUsernav(response.data.token);
                    setAvatarUrl(response.data.avatar_url)
                    setUserdata(response.data)
                    setLoginCheck(true)
                }
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
