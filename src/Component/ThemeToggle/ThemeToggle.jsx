import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider } from '../../Context/ThemeContext/ThemeContext';
import './ThemeToggle.css'

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeProvider);
    const [light,setLight] = useState(false);

    useEffect(() => {
        document.body.className = theme; 
        if(theme === "light"){
          setLight(true);
        }else{
          setLight(false);
        }
      }, [theme]);


  return (
    <div>
    {/* <h1>{theme === 'light' ? 'Light Theme' : 'Dark Theme'}</h1> */}
    {/* <button >Toggle Theme</button> */}
    <div id="switchmode" className={` mode ${light ? "backlight" : "backdard"} `} onClick={toggleTheme} >
      <div className={`toggle-switch ${light ? "lightTheme" : "darkTheme"}`} >
      <i className="fa-solid fa-moon"></i>
      <i class="fa-solid fa-sun"></i>
      </div>
    </div>
  </div>
  )
}

export default ThemeToggle
