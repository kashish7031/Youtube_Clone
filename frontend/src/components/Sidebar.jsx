import React from "react";
import { FaHome, FaCompass, FaPlayCircle, FaHistory } from "react-icons/fa"; // Ensure npm install react-icons
import "../App.css";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-item active">
        <FaHome size={20} />
        <span>Home</span>
      </div>
      <div className="sidebar-item">
        <FaCompass size={20} />
        <span>Explore</span>
      </div>
      <div className="sidebar-item">
        <FaPlayCircle size={20} />
        <span>Shorts</span>
      </div>
      <div className="sidebar-item">
        <FaHistory size={20} />
        <span>History</span>
      </div>
    </div>
  );
};

export default Sidebar;