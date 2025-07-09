import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import BlankForm from './components/BlankForm/BlankForm';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [profileBar, setProfileBarOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark' : ''}`}>
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          sideBarOpen={sideBarOpen}
          setSideBarOpen={setSideBarOpen}
          profileBar={profileBar}
          setProfileBarOpen={setProfileBarOpen}
        />
        <Routes>
          <Route path="/" element={<Home 
          darkMode={darkMode}
          setSideBarOpen={setSideBarOpen}
          setProfileBarOpen={setProfileBarOpen}
           />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blankform" element={<BlankForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
