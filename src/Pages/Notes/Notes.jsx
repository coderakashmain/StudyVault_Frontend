import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Notes.css";
import { FaBook, FaFileAlt, FaVideo, FaPenFancy } from "react-icons/fa";


const features = [
  { id: 1, icon: <FaBook  />, title: "Notes", description: "Detailed study notes covering all topics." },
  { id: 2, icon: <FaFileAlt />, title: "Previous Papers", description: "Access past exam papers for better preparation." },
  { id: 3, icon: <FaPenFancy className="icon" />, title: "Syllabus", description: "Get the latest syllabus for your course." },
  { id: 4, icon: <FaBook className="icon" />, title: "Books", description: "Find recommended books for your subjects." },
];

const Notes = () => {
  const [inputValue, setInputValue] = useState("");
  const [logs, setLogs] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addLog = () => {
    if (inputValue.trim() !== "") {
      setLogs([...logs, inputValue]);
      setInputValue("");
    }
  };

  return (
    <section id="notes">
      <div className="notes-box">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search here...."
          required
        />
        <motion.button
          onClick={addLog}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Add Note
        </motion.button>

        <h1>Notes are not available for now 🍳 Working on it...</h1>

        <div className="notes-logs">
          {logs.length === 0 ? (
            <p className="empty">No logs yet...</p>
          ) : (
            logs.map((log, index) => (
              <motion.div
                key={index}
                className="log-entry"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                📝 {log}
              </motion.div>
            ))
          )}
        </div>
      </div>
      <div className="features-container">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            className="feature-box"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Notes;
