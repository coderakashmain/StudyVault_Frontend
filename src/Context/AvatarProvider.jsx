import React, { createContext, useContext, useMemo, useState } from "react";

export const AvatarProviderContext = createContext(null);

export const useAvatar = () => {
  return useContext(AvatarProviderContext);
};

const AvatarProvider = ({ children }) => {
  const [avatarUrl, setAvatarUrl] = useState("");

  const value = useMemo(
    () => ({
      avatarUrl,
      setAvatarUrl,
    }),
    [avatarUrl]
  );

  return (
    <AvatarProviderContext.Provider value={value}>
      {children}
    </AvatarProviderContext.Provider>
  );
};

export default AvatarProvider;
