import React from 'react';

import { Button } from '@mui/material';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../Context/ThemeContext/ThemeProvider';

const ModeSwitcher = () => {
    const { theme, toggleTheme } = React.useContext(ThemeContext);

    return (
      <div className="theme-swither" style={{ padding: "0rem" ,display :"flex", justifyContent: "center", alignItems: "center"}}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          <Button
            onClick={toggleTheme}
            variant="contained"

            style={{
              background: "none",
              boxShadow: "none",
              color: "var(--text-color)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
          >
            {theme === 'light' ? <Moon size= "1.5rem"  color= "var(--text-color)" /> : <Sun  size= "1.5rem" color= "var(--text-color)" />}
         
          </Button>
        </motion.div>
      </div>
    );
  };
export default ModeSwitcher
