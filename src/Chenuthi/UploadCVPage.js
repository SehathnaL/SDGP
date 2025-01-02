import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './UploadCVPage.css';
// import 'font-awesome/css/font-awesome.min.css'; // Ensure you have your CSS file for styles

const UploadCVPage = () => {
    const [fileName1, setFileName1] = useState('No file selected');
    const [fileName2, setFileName2] = useState('No file selected');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleFileInput1Change = (event) => {
        const file = event.target.files[0];
        setFileName1(file ? file.name : 'No file selected');
    };

    const handleFileInput2Change = (event) => {
        const file = event.target.files[0];
        setFileName2(file ? file.name : 'No file selected');
    };

    const handleNextClick = () => {
        navigate('/make-your-choice'); // Navigate to MakeYourChoicePage
    };

    return (
        
        <div>
            <Navigation/>
            <p id="p">Your <span id="span1">Journey</span> To <span id="span1">Success</span> Begins <span id="span1">Here...</span></p>
            <div id="field1">
                <label htmlFor="jobDescription">Enter Your Job Description</label><br/>
                <input type="text" id="jobDescription" placeholder="Intern-Software Engineering"/><br/><br/>
                <label htmlFor="uploadCV">Upload Your CV</label>
                <div className="upload">
                    <label htmlFor="fileInput1" className="upload-label">
                        <i className="fa fa-upload"></i>
                        Drag & Drop Files Here
                    </label>
                    <input
                        type="file"
                        id="fileInput1"
                        name="uploadedFile"
                        required
                        onChange={handleFileInput1Change}
                    />
                    <span className="file-name" id="fileName1">{fileName1}</span>
                </div>
                <br/>
                <label htmlFor="uploadProjects">If You Have Done Any Projects</label>
                <div className="upload">
                    <label htmlFor="fileInput2" className="upload-label">
                        <i className="fa fa-upload"></i>
                        Drag & Drop Files Here
 </label>
                    <input
                        type="file"
                        id="fileInput2"
                        name="uploadedFile"
                        required
                        onChange={handleFileInput2Change}
                    />
                    <span className="file-name" id="fileName2">{fileName2}</span>
                </div>
                <br/>
                <button type="button" id="button1" onClick={handleNextClick}>
                    Next {/* Ensure this is the correct class */}
                </button>
            </div>
        </div>
    );
};

export default UploadCVPage;