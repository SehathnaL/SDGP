import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/sections/LandingPage';
import TrainerSelection from './Chenuthi/TrainerSelection';
import UploadCV from './Chenuthi/UploadCVPage';
import MakeYourChoicePage from './Chenuthi/MakeYourChoicePage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';

import MeetingPage from './Isula/meeting';
import "../src/Isula/meeting.css"

import Feedback from './components/sections/Feedback';


function App() {
  return (
<Routes>
      {/* Default route for the landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Trainer selection route */}
      <Route path="/trainer-selection" element={<TrainerSelection />} />

      {/* Upload CV route */}
      <Route path="/upload-cv" element={<UploadCV />} />

      {/* choice route */}
      <Route path="/make-your-choice" element={<MakeYourChoicePage />} />

      {/* choice route */}
      <Route path="/sign-up" element={<Login />} />

      {/* choice route */}
      <Route path="/register" element={<Register />} />

      {/* choice route */}
      <Route path="/Avatar-Meeting" element={<MeetingPage />} /> 
      {/* feedback route */}
      <Route path="/feedback" element={<Feedback />} />

    </Routes>

  );
}


export default App;
