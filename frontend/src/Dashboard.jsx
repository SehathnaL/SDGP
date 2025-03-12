// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Chart, registerables } from 'chart.js';
import dayjs from 'dayjs';
import './Dashboard.css'; // Create this CSS file for styles
import styled from 'styled-components';

Chart.register(...registerables);

const Dashboard = () => {
    const [currentMonth, setCurrentMonth] = useState(dayjs().month());
    const [currentYear, setCurrentYear] = useState(dayjs().year());
    const [scheduledMeetings, setScheduledMeetings] = useState(["2025-03-10", "2025-03-12"]);
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);

    // Static array of month names
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Create an array of years from 2020 to 2030
    const years = Array.from({ length: 11 }, (_, i) => 2020 + i);

    useEffect(() => {
        renderCalendar();
        // Call your chart update functions here
    }, [currentMonth, currentYear]);

    const renderCalendar = () => {
        const monthYear = dayjs().year(currentYear).month(currentMonth).format("MMMM YYYY");
        const startOfMonth = dayjs().year(currentYear).month(currentMonth).startOf("month").day();
        const daysInMonth = dayjs().year(currentYear).month(currentMonth).daysInMonth();

        let calendarDays = "<div class='day day-header'>Sun</div><div class='day day-header'>Mon</div><div class='day day-header'>Tue</div><div class='day day-header'>Wed</div><div class='day day-header'>Thu</div><div class='day day-header'>Fri</div><div class='day day-header'>Sat</div>";

        for (let i = 0; i < startOfMonth; i++) {
            calendarDays += "<div class='day'></div>";
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = dayjs().year(currentYear).month(currentMonth).date(day).format("YYYY-MM-DD");
            const isScheduled = scheduledMeetings.includes(dateStr);
            calendarDays += `<div class='day ${isScheduled ? "highlight" : ""}'>${day}</div>`;
        }

        return { monthYear, calendarDays };
    };

    const { monthYear, calendarDays } = renderCalendar();

    const handleMonthSelect = (month) => {
        setCurrentMonth(month);
        setShowMonthDropdown(false);
    };

    const handleYearSelect = (year) => {
        setCurrentYear(year);
        setShowYearDropdown(false);
    };
    const StyledWrapper = styled.div`
            .button-icon {
            display: flex;
            border: 3px #fff solid;
            width: fit-content;
            height: fit-content;
            cursor: pointer;
        }

        .icon {
            background-color: #fff;
            padding: 10px 10px 5px 10px;
        }

        .icon svg {
            width: 25px;
            height: 25px;
        }

        .cube {
            transition: all 0.4s;
            transform-style: preserve-3d;
            width: 200px;
            height: 20px;
        }

        .button-icon:hover {
            border-color: #FFC107;
        }

        .button-icon:hover .cube {
            transform: rotateX(90deg);
        }

        .side {
            position: absolute;
            height: 47px;
            width: 200px;
            display: flex;
            font-size: 0.8em;
            justify-content: center;
            align-items: center;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: bold;
        }

        .top {
            background: #FFC107;
            color: #fff;
            transform: rotateX(-90deg) translate3d(0, 13.5px, 2em);
        }

        .front {
            background: #222229;
            color: #fff;
            transform: translate3d(0, 0, 1em);
        }`;
    const recentFeedback = [
        {
            session: "AI Avatar Interview",
            date: "2025-03-01",
            criteria: {
                accuracy: 4,
                confidence: 5,
                communication: 3,
            }
        },
        {
            session: "Mentor Interview",
            date: "2025-02-28",
            criteria: {
                accuracy: 3,
                confidence: 4,
                communication: 4,
            }
        }
    ];

    return (
        <div className="dashboard">
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
            <main className="content">
                <header className="top-nav">
                    <h1>Welcome, Sara</h1>
                    <div className="nav-actions">
                        <input type="text" placeholder="Search..." />
                        <button>Schedule Interview</button>
                    </div>
                </header>
                <section className="user-profile">
                    <img src="./profile-pic.jpg" alt="User  Avatar" className="avatar" />
                    <div className="user-info">
                        <h2>Sarah Connor</h2>
                        <p>Undergraduate - Bsc(Hons)Computer Sciense</p>
                    </div>
                    <div className="info-button1">
                        <StyledWrapper>
                            <div className="button-icon">
                                <div className="icon">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                                    </svg>

                                </div>
                                <div className="cube">
                                    <span className="side front">Avatar - Interview</span>
                                    <span className="side top">15 Interviews</span>
                                </div>
                            </div>
                        </StyledWrapper>
                    </div>
                    <div className="info-button1">
                        <StyledWrapper>
                            <div className="button-icon">
                                <div className="icon">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="cube">
                                    <span className="side front">Mentor - Interview</span>
                                    <span className="side top">10 Interviews</span>
                                </div>
                            </div>
                        </StyledWrapper>
                    </div>
                    <div className="info-button2">
                        <StyledWrapper>
                            <div className="button-icon">
                                <div className="icon">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                                    </svg>
                                </div>
                                <div className="cube">
                                    <span className="side front">Performance</span>
                                    <span className="side top">80% - Avg Perfomance</span>
                                </div>
                            </div>
                        </StyledWrapper>
                    </div>
                </section>

                <div className="schedule-container">
                    <div className="calendar-and-table">
                        <div className="calendar">
                            <div className="calendar-header">
                                <div className="month" onClick={() => setShowMonthDropdown(!showMonthDropdown)}>
                                    {months[currentMonth]}
                                </div>
                                {showMonthDropdown && (
                                    <div className="dropdown">
                                        {months.map((month, index) => (
                                            <div key={index} className="dropdown-item" onClick={() => handleMonthSelect(index)}>
                                                {month}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <p className='header1'>Schedule</p>
                                <div className="year" onClick={() => setShowYearDropdown(!showYearDropdown)}>
                                    {currentYear}
                                </div>
                                {showYearDropdown && (
                                    <div className="dropdown">
                                        {years.map((year) => (
                                            <div key={year} className="dropdown-item" onClick={() => handleYearSelect(year)}>
                                                {year}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="calendar-days" id="calendarDays" dangerouslySetInnerHTML={{ __html: calendarDays }}></div>
                        </div>
                        <div className="schedule-table">
                            <h3 className='upcoming'>Upcoming Meetings</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Mentor Name</th>
                                        <th>Scheduled Date</th>
                                        <th>Time</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John Doe</td>
                                        <td>2025-03-10</td>
                                        <td>10:00 AM</td>
                                        <td>
                                            <button className="accept-button">Join</button>
                                            <button className="cancel-button">Cancel</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Jane Smith</td>
                                        <td>2025-03-12</td>
                                        <td>2:00 PM</td>
                                        <td>
                                            <button className="accept-button">Join</button>
                                            <button className="cancel-button">Cancel</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="recent-feedback">
                    <h3>Recent Feedback</h3>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;