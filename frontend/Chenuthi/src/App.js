import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import TrainerSelection from "./TrainerSelection";
import UploadCVPage from "./UploadCVPage";
import MakeYourChoicePage from "./MakeYourChoicePage";
import VideoPage from "./VideoPage";
import ServiceChoicePage from "./ServiceChoicePage";
import PaymentPage from "./PaymentPage";
import Navigation from "./components/Navigation";

function App() {
    return (
        <Router>
            <Navigation/>
            <Routes>
                {/* Main Layout with all sections on a single page */}
                <Route path="/" element={<MainLayout />} />
                
                {/* Other separate pages */}
                <Route path="trainer-selection" element={<TrainerSelection />} />
                <Route path="upload-cv" element={<UploadCVPage />} />
                <Route path="make-your-choice" element={<MakeYourChoicePage />} />
                <Route path="video" element={<VideoPage />} />
                <Route path="service-choice" element={<ServiceChoicePage />} />
                <Route path="payment" element={<PaymentPage />} />
            </Routes>
        </Router>
    );
}

export default App;
