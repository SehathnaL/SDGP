import React, { useState } from 'react';
import './BookSession.css'; // Import external CSS file (same as your original styles)

const BookSession = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cv, setCv] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [fileName, setFileName] = useState('No file selected');

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setCv(file);
        setFileName(file ? file.name : 'No file selected');
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent page refresh on submit

        // Check if all required fields are filled
        if (!name || !email || !date || !time || !cv) {
            alert('Please fill all the required fields and upload your CV.');
            return;
        }

        // Show success modal
        console.log("Form submitted, opening modal...");
        setModalOpen(true);  // Ensure this triggers a state change

    };

    // Close the modal
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="form-container">
            <h1>Book a Session</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Your Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <label htmlFor="cv" className="full-width">Upload Your CV:</label>
                <div
                    className="file-input-container"
                    onClick={() => document.getElementById('cv').click()}
                >
                    <span className="upload-emoji">📎 Upload CV</span>
                    <span id="file-name-display" className="file-name-display">
                        {fileName}
                    </span>
                </div>
                <input
                    type="file"
                    id="cv"
                    name="cv"
                    accept=".pdf,.doc,.docx,.txt"
                    required
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                <div className="form-group">
                    <label htmlFor="date">Select Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Select Time:</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ width: '100%' }}>
                    <label htmlFor="message">Message (Optional):</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="Enter any message or request"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit">Submit Booking</button>
            </form>

            {modalOpen && (
                <div id="successModal" className={`modal ${modalOpen ? 'open' : ''}`}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="success-icon">✔️</div>
                        <h2>Your session has been successfully booked!</h2>
                        <button className="ok-button" onClick={closeModal}>
                            OK
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default BookSession;
