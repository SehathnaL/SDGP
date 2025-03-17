import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadCVPage from "./UploadCVPage";
import MakeYourChoicePage from "./MakeYourChoicePage";
import Success from "./Success";
import Cancel from "./Cancel";
import MainPage from "./MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/upload-cv" element={<UploadCVPage />} /> {/* Add this line */}
        <Route path="/make-your-choice" element={<MakeYourChoicePage />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}

export default App;