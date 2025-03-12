import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadCVPage.css';


const UploadCVPage = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [cvFile, setCvFile] = useState(null);
    const [projectProposalFile, setProjectProposalFile] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [isExiting, setIsExiting] = useState(false); // State to control exit animation
    const navigate = useNavigate();

    const handleJobTitleChange = (event) => {
        setJobTitle(event.target.value);
    };

    const handleCVChange = (event) => {
        setCvFile(event.target.files[0]);
    };

    const handleProjectProposalChange = (event) => {
        setProjectProposalFile(event.target.files[0]);
    };

    const handleNextClick = () => {
        // Prevent going to the next step if required fields are empty
        if (currentStep === 1 && !jobTitle) return; // Job title is required
        if (currentStep === 2 && !cvFile) return; // CV upload is required

        setIsExiting(true); // Trigger exit animation
        setTimeout(() => {
            setCurrentStep(currentStep + 1);
            setIsExiting(false); // Reset exit state after transition
        }, 500); // Match this duration with the animation duration
    };

    const handleBackClick = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleContinueClick = () => {
        // Here you would typically send the data to your backend
        console.log("Job Title:", jobTitle);
        console.log("CV File:", cvFile);
        console.log("Project Proposal File:", projectProposalFile);

        // After successful submission, you might navigate:
        navigate('/make-your-choice'); // Replace '/confirmation' with your desired route
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className={`step ${isExiting ? 'step-exit' : ''}`}>
                        <label htmlFor="jobTitle">Enter Your Job Title</label>
                        <input type="text" id="jobTitle" value={jobTitle} onChange={handleJobTitleChange} />
                        <button type="button" className="next-button" onClick={handleNextClick} disabled={!jobTitle}>Next</button>
                    </div>
                );
            case 2:
                return (
                    <div className={`step ${isExiting ? 'step-exit' : ''}`}>
                        <label htmlFor="uploadCV">Upload Your CV here</label>
                        
                            <div className="header">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                                <p>Browse File to upload!</p>
                            </div>
                            <label htmlFor="file" className="footer">
                                <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M15.331 6H8.5v20h15V14.154h-8.169z" />
                                        <path d="M18.153 6h-.009v5.342H23.5v-.002z" />
                                    </g>
                                </svg>
                                <span className="file-name">{cvFile ? cvFile.name : 'Not selected file'}</span>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" strokeWidth={2} />
                                        <path d="M19.5 5H4.5" stroke="#000000" strokeWidth={2} strokeLinecap="round" />
                                        <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth={2} />
                                    </g>
                                </svg>
                            </label>
                            <input id="file" type="file" onChange={handleCVChange} />
                        
                        <button type="button" className="back-button" onClick={handleBackClick}>Back</button>
                        <button type="button" className="next-button" onClick={handleNextClick} disabled={!cvFile}>Next</button>
                    </div>
                );
            case 3:
                return (
                    <div className={`step ${isExiting ? 'step-exit' : ''}`}>
                        <label htmlFor="uploadProposal">Upload Your Project Proposal(Optional)</label>
                            <div className="header">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                                <p>Browse File to upload!</p>
                            </div>
                            <label htmlFor="file" className="footer">
                                <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M15.331 6H8.5v20h15V14.154h-8.169z" />
                                        <path d="M18.153 6h-.009v5.342H23.5v-.002z" />
                                    </g>
                                </svg>
                                <span className="file-name">{projectProposalFile ? projectProposalFile.name : 'Not selected file'}</span>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" strokeWidth={2} />
                                        <path d="M19.5 5H4.5" stroke="#000000" strokeWidth={2} strokeLinecap="round" />
                                        <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth={2} />
                                    </g>
                                </svg>
                            </label>
                            <input id="file" type="file" onChange={handleProjectProposalChange} />
                        
                        <button type="button" className="back-button" onClick={handleBackClick}>Back</button>
                        <button type="button" className="next-button" onClick={handleNextClick} disabled={!cvFile}>Next</button>
                    </div>
                );
            case 4:
                return (
                    <div className={`step ${isExiting ? 'step-exit' : ''}`}>
                        <h2>Review Information</h2>
                        <p><strong>Job Title:</strong> {jobTitle}</p>
                        <p><strong>CV:</strong> {cvFile ? cvFile.name : 'No file selected'}</p>
                        <p><strong>Project Proposal:</strong> {projectProposalFile ? projectProposalFile.name : 'No file selected'}</p>
                        <button type="button" className="back-button" onClick={handleBackClick}>Back</button>
                        <button type="button" className="continue-button" onClick={handleContinueClick}>Continue</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="upload-container">

            <div className="form-wrapper">
                {renderStep()}
            </div>
        </div>
    );
};

export default UploadCVPage;
