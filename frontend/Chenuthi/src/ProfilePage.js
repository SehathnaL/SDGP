// ProfilePage.js
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import "./ProfilePage.css";

function ProfilePage() {
  const [profilePic, setProfilePic] = useState("Images/avatar1.png");
  let performanceChart = null;
  let rankingChart = null;

  const updateProfilePic = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePic(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const performanceCtx = document
      .getElementById("performance-pie-chart")
      .getContext("2d");
    const rankingCtx = document
      .getElementById("ranking-bar-chart")
      .getContext("2d");

    // Initialize Performance Pie Chart
    performanceChart = new Chart(performanceCtx, {
      type: "pie",
      data: {
        labels: ["Overall Performance"],
        datasets: [
          {
            data: [85, 15],
            backgroundColor: ["#EAC42D", "rgba(255, 255, 255, 0)"],
            borderColor: "rgba(234, 196, 45, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: { responsive: true },
    });

    // Initialize Ranking Bar Chart
    rankingChart = new Chart(rankingCtx, {
      type: "bar",
      data: {
        labels: ["100", "80", "60", "40", "20", "10"],
        datasets: [
          {
            label: "Ranking Progress",
            data: [10, 20, 30, 40],
            backgroundColor: "#EAC42D",
            borderColor: "#EAC42D",
            borderWidth: 1,
          },
        ],
      },
      options: { responsive: true },
    });

    return () => {
      // Cleanup charts on component unmount or re-render
      if (performanceChart) performanceChart.destroy();
      if (rankingChart) rankingChart.destroy();
    };
  }, []);

  return (
    <div className="container">
        <Navigation/>
      <div className="profile-box">
        <label htmlFor="profile-pic-input">
          <img src={profilePic} alt="Profile" id="profile-pic" />
        </label>
        <button
          className="edit-icon"
          onClick={() => document.getElementById("profile-pic-input").click()}
        >
          ✎
        </button>
        <input
          type="file"
          id="profile-pic-input"
          accept="image/*"
          onChange={updateProfilePic}
          style={{ display: "none" }}
        />
        <h1>Jane Doe</h1>
        <p>Intern-Software Engineer</p>
        <h2>About Me</h2>
        <ul className="info-list">
          <li>
            <strong>Education:</strong> Informatics Institute Of Technology
          </li>
          <li>
            <strong>Email:</strong> jane.doe@example.com
          </li>
          <li>
            <strong>Phone:</strong> +123-456-7890
          </li>
          <li>
            <strong>Location:</strong> New York, USA
          </li>
          <li>
            <strong>Skills:</strong> JavaScript, Python, HTML/CSS, React
          </li>
        </ul>
        <button
          className="edit-info-icon"
          onClick={() => (window.location.href = "editprofile.html")}
        >
          ✎
        </button>
      </div>

      <div className="performance-container">
        <h2>Performance Overview</h2>
        <fieldset>
          <legend>Virtual Meetings 💻</legend>
          <div className="unique-stats">
            <p style={{ color: "#b29006" }}>15</p>
          </div>
        </fieldset>
        <fieldset>
          <legend>Trainer Sessions 👨‍💼</legend>
          <div className="unique-stats">
            <p style={{ color: "#b29006" }}>10</p>
          </div>
        </fieldset>
        <div className="chart-container">
          <canvas id="performance-pie-chart"></canvas>
        </div>
        <div className="chart-container">
          <canvas id="ranking-bar-chart" style={{ height: "228px" }}></canvas>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ProfilePage;
