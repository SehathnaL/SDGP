import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navigation from '../components/Navigation';
import './MakeYourChoicePage.css'; // Create a separate CSS file for styles

const MakeYourChoicePage = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleButtonClick = () => {
        navigate('/video'); // Navigate to VideoPage
    };

    const handleLoginClick = () => {
        alert('Login button clicked!');
    };

    return (
        <div>
            <Navigation/>
            <p className='p'>Make <span id="span1">Your</span> Choice ✨ </p>
            <fieldset className='choice'>
                <label id='label'>What Type Of Questions You Want To Be Asked? </label>
                <button onClick={handleButtonClick}className='button'>Based On My CV</button>
                <button onClick={handleButtonClick}className='button'>Based On My Projects</button>
            </fieldset>
        </div>
    );
};

export default MakeYourChoicePage;