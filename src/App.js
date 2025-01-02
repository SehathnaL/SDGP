import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/sections/LandingPage';
import TrainerSelection from './Chenuthi/TrainerSelection';
import UploadCV from './Chenuthi/UploadCVPage';
import MakeYourChoicePage from './Chenuthi/MakeYourChoicePage';

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
    </Routes>
  );
}

export default App;
