import React, { useState, useEffect } from "react";
import { FaBars, FaSearch, FaUserCircle, FaMicrophone, FaVideo } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check login state on component mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left: Menu & Logo */}
      <div className="nav-left">
        <FaBars className="icon menu-icon" onClick={toggleSidebar} />
        <Link to="/" className="logo">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
            alt="YouTube" 
          />
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="nav-center">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
        <div className="mic-icon">
          <FaMicrophone />
        </div>
      </div>

      {/* Right: Login / User Profile */}
      <div className="nav-right">
        {user ? (
          <div className="user-section">
            <FaVideo className="icon" title="Create" />
            <span className="user-name">{user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            <div className="avatar">
               {user.username.charAt(0).toUpperCase()}
            </div>
          </div>
        ) : (
          <Link to="/login" className="sign-in-btn">
            <FaUserCircle className="user-icon" />
            <span>Sign in</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;