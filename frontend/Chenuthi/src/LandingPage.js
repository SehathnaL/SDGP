import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Move styles into a CSS file for better organization

const LandingPage = () => {
    const navigate = useNavigate();

    // Optional: Uncomment this if you want to redirect after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home"); // Navigate to Home after 5 seconds
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    const handleLogoClick = () => {
        navigate("/home"); // Navigate to Home when the logo is clicked
    };

    return (
        <div className="landing-page">
            <img 
                src="Images/logo12.png" 
                alt="The Logo" 
                className="logo" 
                onClick={handleLogoClick} // Navigate on logo click
            />
        </div>
    );
};

export default LandingPage;
