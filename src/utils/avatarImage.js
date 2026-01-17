
  const avatarImage=(user) =>{
    
    const image = user?.avatar_url
    ? `https://models.readyplayer.me/${user?.avatar_url.split("/").pop().replace(".glb", ".png")}`
    : `https://api.dicebear.com/7.x/lorelei/svg?seed=${user?.id}`;
    return image;
    } 

    export default avatarImage;