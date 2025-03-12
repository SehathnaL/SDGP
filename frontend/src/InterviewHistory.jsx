import React, { useState } from "react";
import "./InterviewHistory.css";
import { Link } from "react-router-dom";
import { FaTrashAlt } from 'react-icons/fa';

function InterviewHistory() {
    const [feedbackPosition, setFeedbackPosition] = useState({
        show: false,
        text: "",
        x: 0,
        y: 0,
    });
    const [selectedInterviews, setSelectedInterviews] = useState([]); // Initialize as an empty array

    const aiInterviews = [
        {
            date: "2023-12-28",
            time: "10:00 AM",
            feedback: "Great job with your introduction! Try to elaborate more on your project experience.",
        },
        {
            date: "2023-12-27",
            time: "2:30 PM",
            feedback: "Excellent communication skills. Focus on explaining technical details more clearly.",
        },
        {
            date: "2023-12-26",
            time: "4:00 PM",
            feedback: "Your enthusiasm is contagious! Remember to maintain eye contact with the interviewer.",
        },
        {
            date: "2023-12-25",
            time: "11:30 AM",
            feedback: "You handled the technical questions well. Practice answering behavioral questions with the STAR method.",
        },
        {
            date: "2023-12-24",
            time: "9:00 AM",
            feedback: "Good overall performance. Research the company and prepare some questions to ask the interviewer.",
        },
        {
            date: "2023-12-23",
            time: "1:00 PM",
            feedback: "Your problem-solving skills are commendable. Work on explaining complex concepts simply.",
        },
        {
            date: "2023-12-22",
            time: "3:45 PM",
            feedback: "You have a solid understanding of the basics. Try to showcase more advanced skills.",
        },
        {
            date: "2023-12-21",
            time: "8:30 AM",
            feedback: "Your resume is impressive! Practice your responses to common interview questions.",
        },
        {
            date: "2023-12-20",
            time: "5:15 PM",
            feedback: "Your passion for the field is evident. Focus on structuring your answers more logically.",
        },
        {
            date: "2023-12-19",
            time: "10:45 AM",
            feedback: "You have a good foundation. Try to demonstrate more initiative and leadership qualities.",
        },
    ];
    const mentorInterviews = [
        {
            date: "2023-12-26",
            time: "11:15 AM",
            mentor: "John Doe",
            feedback: "You demonstrated strong problem-solving abilities. Work on your confidence during the Q&A.",
        },
        {
            date: "2023-12-23",
            time: "3:00 PM",
            mentor: "Jane Smith",
            feedback: "Your coding skills are impressive. Try to explain your thought process more clearly.",
        },
        {
            date: "2023-12-22",
            time: "10:00 AM",
            mentor: "David Lee",
            feedback: "You have a good understanding of the fundamentals. Focus on building projects to showcase your skills.",
        },
        {
            date: "2023-12-21",
            time: "1:30 PM",
            mentor: "Sarah Jones",
            feedback: "Your resume is well-structured. Tailor it to the specific job description for better results.",
        },
        {
            date: "2023-12-20",
            time: "4:00 PM",
            mentor: "Michael Brown",
            feedback: "Your networking skills are excellent. Continue to build connections in your field.",
        },
        {
            date: "2023-12-19",
            time: "2:30 PM",
            mentor: "Emily White",
            feedback: "Your technical knowledge is strong. Focus on improving your soft skills.",
        },
        {
            date: "2023-12-18",
            time: "9:30 AM",
            mentor: "Christopher Green",
            feedback: "Your project portfolio is impressive. Highlight your contributions in each project.",
        },
        {
            date: "2023-12-17",
            time: "12:00 PM",
            mentor: "Jessica Black",
            feedback: "Your communication skills are good. Practice articulating your technical solutions more effectively.",
        },
        {
            date: "2023-12-16",
            time: "3:15 PM",
            mentor: "Kevin Red",
            feedback: "Your understanding of the industry is commendable. Research specific companies before interviews.",
        },
        {
            date: "2023-12-15",
            time: "10:30 AM",
            mentor: "Laura Blue",
            feedback: "Your problem-solving approach is solid. Work on your time management during technical interviews.",
        },
    ];

    const handleFeedbackHover = (event, feedback) => {
        setFeedbackPosition({ show: true, text: feedback, x: event.clientX, y: event.clientY });
    };

    const handleFeedbackLeave = () => {
        setFeedbackPosition({ ...feedbackPosition, show: false });
    };

    const handleCheckboxChange = (id) => {
        if (selectedInterviews.includes(id)) {
            setSelectedInterviews(selectedInterviews.filter((item) => item !== id));
        } else {
            setSelectedInterviews([...selectedInterviews, id]);
        }
    };

    const handleDeleteSelected = () => {
        // Implement your delete logic here
        console.log("Delete selected:", selectedInterviews);
        // Reset selected interviews after deletion
        setSelectedInterviews([]);
    };

    const handleDeleteInterview = (type, index) => {
        // Implement your delete logic here
        console.log(`Delete ${type} interview at index ${index}`);
        // You would typically update your aiInterviews or mentorInterviews arrays here
    };

    return (
        <div className="container">
            <aside className="sidebar">
                <img src="./logo12.png" alt="Logo" className="logo" />
                <ul>
                    <li>
                        <i className="fas fa-home"></i> <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <i className="fas fa-comments"></i> <Link to="/interview-history">Interview History</Link>
                    </li>
                    <li>
                        <i className="fas fa-user"></i> <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <i className="fas fa-cog"></i> <Link to="/settings">Settings</Link>
                    </li>
                </ul>
            </aside>
            <div className="interview-history-container">
                <div className="interview-history-header">
                    <h2>Interview History</h2>
                    {selectedInterviews.length > 0 && (
                        <button className="delete-button" onClick={handleDeleteSelected}>
                            Delete Selected
                        </button>
                    )}
                </div>
                <div className="interview-history-content">
                    <div className="interview-list">
                        <div className="interview-column">
                            <div className="column-header">
                                <h3>AI Avatar Interviews</h3>
                            </div>
                            <table>
                                <thead>
                                    <tr><th></th><th>Date</th><th>Time</th><th>Feedback</th><th></th></tr>
                                </thead>
                                <tbody>
                                    {aiInterviews.map((interview, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedInterviews.includes(`ai-${index}`)}
                                                    onChange={() => handleCheckboxChange(`ai-${index}`)}
                                                />
                                            </td>
                                            <td>{interview.date}</td>
                                            <td>{interview.time}</td>
                                            <td>
                                                <button className="feedback-button"
                                                    onMouseEnter={(e) => handleFeedbackHover(e, interview.feedback)}
                                                    onMouseLeave={handleFeedbackLeave}
                                                >
                                                    View Feedback
                                                </button>
                                            </td>
                                            <td>
                                                <button className="delete-row-button" onClick={() => handleDeleteInterview('ai', index)}>
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="interview-column1">
                            <div className="column-header">
                                <h3>Mentor Interviews</h3>
                            </div>
                            <table className="table1">
                                <thead>
                                    <tr><th></th><th>Date</th><th>Time</th><th>Mentor</th><th>Feedback</th><th></th></tr>
                                </thead>
                                <tbody>
                                    {mentorInterviews.map((interview, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedInterviews.includes(`mentor-${index}`)}
                                                    onChange={() => handleCheckboxChange(`mentor-${index}`)}
                                                />
                                            </td>
                                            <td>{interview.date}</td>
                                            <td>{interview.time}</td>
                                            <td>{interview.mentor}</td>
                                            <td>
                                                <button
                                                    className="feedback-button"
                                                    onMouseEnter={(e) => handleFeedbackHover(e, interview.feedback)}
                                                    onMouseLeave={handleFeedbackLeave}
                                                >
                                                    View Feedback
                                                </button>
                                            </td>
                                            <td>
                                                <button className="delete-row-button" onClick={() => handleDeleteInterview('mentor', index)}>
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {feedbackPosition.show && (
                    <div className="feedback-popup" style={{ top: feedbackPosition.y + 10, left: feedbackPosition.x + 10 }}>
                        {feedbackPosition.text}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InterviewHistory;