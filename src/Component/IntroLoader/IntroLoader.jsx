import React from "react";
import { motion } from "framer-motion";
import "./IntroLoader.css";

const IntroLoader = () => {
  const text = "StudyVault".split("");



  return (
    <div id="introloader">
      {/* <motion.h1>
        {text.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ y: -40, opacity: 0.4 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{
              delay: index * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1> */}
      <motion.h2
        className="loading-text"
        initial={{  opacity: 0.4 }}
            animate={{  opacity: 0.9 }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        Loading...
      </motion.h2>
    </div>
  );
};

export default IntroLoader;
