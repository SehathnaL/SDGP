// Simulate data for the trainer dashboard
const trainerData = {
    name: "Coach Alex",
    totalClients: 50,
    activeClients: 35,
    completedSessions: 200,
    upcomingSessions: [
      { client: "John Doe", time: "2024-10-27T10:00:00Z" },
      { client: "Jane Smith", time: "2024-10-27T14:30:00Z" },
      { client: "David Lee", time: "2024-10-28T09:00:00Z" },
    ],
    clientProgress: [
      { client: "John Doe", progress: 75 },
      { client: "Jane Smith", progress: 90 },
      { client: "David Lee", progress: 60 },
      { client: "Emily Chen", progress: 85},
      { client: "Michael Brown", progress: 40}
    ],
  
  };
  
  // Function to render the dashboard
  function renderDashboard() {
    const dashboard = document.getElementById("trainerDashboard");
  
    if (!dashboard) {
      console.error("Dashboard element not found.");
      return;
    }
  
    dashboard.innerHTML = `
      <h2>Trainer Dashboard - ${trainerData.name}</h2>
      <div class="metrics">
        <div>Total Clients: ${trainerData.totalClients}</div>
        <div>Active Clients: ${trainerData.activeClients}</div>
        <div>Completed Sessions: ${trainerData.completedSessions}</div>
      </div>
  
      <h3>Upcoming Sessions</h3>
      <ul>
        ${trainerData.upcomingSessions.map(session => `<li>${session.client} - ${new Date(session.time).toLocaleString()}</li>`).join('')}
      </ul>
  
      <h3>Client Progress</h3>
      <ul>
        ${trainerData.clientProgress.map(client => `<li>${client.client}: ${client.progress}%</li>`).join('')}
      </ul>
  
      <h3>Recent Activity</h3>
      <ul>
        ${trainerData.recentActivity.map(activity => `<li>${activity}</li>`).join('')}
      </ul>
    `;
  }
  
  // Example usage (assuming you have a div with id="trainerDashboard" in your HTML)
  document.addEventListener("DOMContentLoaded", renderDashboard);
  
  //Example HTML structure
  /*
  <!DOCTYPE html>
  <html>
  <head>
  <title>Trainer Dashboard</title>
  <style>
  body {font-family: sans-serif;}
  .metrics {display: flex; gap: 20px;}
  </style>
  </head>
  <body>
  <div id="trainerDashboard"></div>
  <script>
  // Paste the JavaScript code here
  </script>
  </body>
  </html>
  */