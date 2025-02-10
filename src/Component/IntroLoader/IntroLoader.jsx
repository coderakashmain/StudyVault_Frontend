import React from "react";
import { motion } from "framer-motion";
import "./IntroLoader.css";

const IntroLoader = () => {
  const text = "StudyVault".split("");

  const circles = Array.from({ length: 5 }, (_, index) => (
    <motion.div
      key={index}
      className="circle"
      animate={{
        x: [0, Math.random() * 200 - 100, Math.random() * -200 + 100, 0],
        y: [0, Math.random() * 200 - 100, Math.random() * -200 + 100, 0],
        scale: [1, 1.5, 1],
        rotate: [0, 360],
      }}
      transition={{
        duration: 4 + Math.random() * 2, // Random duration
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ));

  return (
    <div id="introloader">
   {circles}
      <motion.h1>
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
      </motion.h1>
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
