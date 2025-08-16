import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const AvatarPic = ({ username, userphoto, size = "1.5rem" }) => {
   
const dpname = (username) ? username.slice(0,2).toUpperCase() : '';
    return (
        <Stack>
            <Avatar  src={userphoto} children={dpname}  alt={username} sx={{height : size, width : size ,bgcolor : 'lightblue', fontSize : '1rem'}} />
        </Stack>
    );
}


export default AvatarPic;