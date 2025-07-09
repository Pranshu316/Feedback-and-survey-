import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import {
  FaBars,
  FaSearch,
  FaUserCircle,
  FaBell,
  FaSun,
  FaMoon,
} from 'react-icons/fa';
import { HiDocumentReport } from 'react-icons/hi';



const Navbar = ({ darkMode, setDarkMode }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [profileBar, setProfileBarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const toggleProfileBar = () => {
    setProfileBarOpen(!profileBar);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <FaBars className="icon" onClick={toggleSideBar} />
        </div>

        <div className="navbar-center">
          <input type="text" placeholder="Search..." className="search-input" />
          <FaSearch className="search-icon" />
        </div>

        <div className="navbar-right">
          {darkMode ? (
            <FaSun className="icon dark-mode-icon" onClick={toggleDarkMode} />
          ) : (
            <FaMoon className="icon dark-mode-icon" onClick={toggleDarkMode} />
          )}

          <FaBell className="icon" />
          <HiDocumentReport className="icon" />
          <FaUserCircle className="icon" onClick={toggleProfileBar} />
        </div>
      </nav>

      <div className={`sideBar ${sideBarOpen ? 'open' : ''}`}>
        <ul>
          <li>Feedback Form</li>
          <li>Survey Form</li>
          <li>Contact Form</li>
          <li>About</li>
          <li>Help</li>
        </ul>
      </div>

      <div className={`profilebar ${profileBar ? 'open' : ''}`}>
        <ul>
          <li>
            <img
              className="profilePic"
              src="./profile pic.png"
              alt="Profile"
            />
          </li>
          <li>
            <h4>
              <button onClick={() => {
                setProfileBarOpen(false);
                setSideBarOpen(false);
                navigate('/login')
                }}>Sign in</button>
            </h4>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
