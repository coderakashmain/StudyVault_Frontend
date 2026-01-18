import React from 'react'
import { useAvatar } from '../../Context/AvatarProvider'
import avatarImage from '../../utils/avatarImage';

const AvatarPhoto = React.memo(({size =12,id}) => {
    const {avatarUrl} = useAvatar();
  return (
      <div  className={`relative cursor-pointer!  w-${size} h-${size} rounded-full bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.75! shadow-lg`}>

                    {/* Inner glass circle */}
                    <div className="w-full h-full rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                      <img
                        src={ avatarImage(avatarUrl,id)}
                        className="w-full h-full object-cover rounded-full transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Online / status dot (optional) */}
                    <span className="absolute bottom-0 right-2 w-3 h-3 rounded-full bg-green-500 ring-2 ring-white"></span>
                  </div>
  )
})

export default AvatarPhoto
