import React, { createContext, useContext, useEffect, useState } from "react";
import useApi from "../hooks/useApi";

const TopContributorsContext = createContext(null);

export const TopContributorsProvider = ({ children }) => {
  const { get, loading, error } = useApi();

  const [contributors, setContributors] = useState([]);

  const fetchTopContributors = async () => {
    const res = await get("/user/contributer-list",false);
    if (res?.status) {
      setContributors(res.data);
    }
  };

  useEffect(() => {
    fetchTopContributors();
  }, []);

  return (
    <TopContributorsContext.Provider
      value={{
        contributors,
        loading,
        error,
        refreshContributors: fetchTopContributors,
      }}
    >
      {children}
    </TopContributorsContext.Provider>
  );
};

// custom hook
export const useTopContributors = () => {
  const context = useContext(TopContributorsContext);
  if (!context) {
    throw new Error(
      "useTopContributors must be used within TopContributorsProvider"
    );
  }
  return context;
};
