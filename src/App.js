import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/sections/LandingPage';
import TrainerSelection from './Chenuthi/TrainerSelection';


function App() {
  return (
    <Routes>
      {/* Default route for the landing page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Trainer selection route */}
      <Route path="/trainer-selection" element={<TrainerSelection />} />
    </Routes>
  );
}

export default App;
