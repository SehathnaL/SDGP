import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./MakeYourChoicePage.css";

const MakeYourChoicePage = () => {
  const navigate = useNavigate();

  const handleCVClick = () => {
    navigate('/video');
  };

  const handleProposalClick = () => {
    navigate('/video');
  };

  return (
    <div className='container'>
      <h2>What Type Of Questions You Want To Be Asked?</h2>
      <div className='button-wrapper'>
        <div className="button-container">
          <button className="continue-application" onClick={handleCVClick}></button>
          <p className='label'>Based On My CV</p>
        </div>
        <div className="button-container">
          <button className="continue-application1" onClick={handleProposalClick}></button>
          <p className='label'>Based On My Project Proposal</p>
        </div>
      </div>
    </div>
  );
}

export default MakeYourChoicePage;
