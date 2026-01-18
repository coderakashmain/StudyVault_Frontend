
  const avatarImage=(url,id) =>{
    
    const image = url
    ? `https://models.readyplayer.me/${url.split("/").pop().replace(".glb", ".png")}`
    : `https://api.dicebear.com/7.x/lorelei/svg?seed=${id}`;
    return image;
    } 

    export default avatarImage;