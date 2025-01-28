import React, { createContext, useState, useContext, useEffect } from 'react';

 export const ThemeProvider = createContext();


 const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);  // Save the theme in localStorage
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeProvider.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeProvider.Provider>
  );
};

export default ThemeContext 