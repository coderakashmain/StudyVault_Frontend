import React, { createContext } from 'react';

// Create the context
export const SiteKeyContextProvider = createContext();

// Create a provider component
 const SiteKeyContext = ({ children }) => {
  const siteKey = '6LfdIaIqAAAAAIies2mqiKx_M8ENpWaC2hQ2dBIE';

  if (!siteKey) {
    console.error("Site key is not defined in the environment variables.");
  }

  return (
    <SiteKeyContextProvider.Provider value={siteKey}>
      {children}
    </SiteKeyContextProvider.Provider>
  );
};

// Custom hook to use the SiteKeyContext
export default SiteKeyContext