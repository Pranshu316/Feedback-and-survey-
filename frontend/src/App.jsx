import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import BlankForm from './components/BlankForm/BlankForm';
import FeedbackFrom from './components/FeedbackForm/FeedbackForm';
import SurveyForm from './components/SurveyForm/SurveyForm';
import ContactForm from './components/ContactForm/ContactForm';
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
          <Route path ="/feedbackfrom" element={<FeedbackFrom />} />
          <Route path ="/surveyform" element={<SurveyForm />} />
          <Route path ="/contactform" element={<ContactForm />} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
