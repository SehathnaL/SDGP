import React from 'react';

const Success = () => {
  const calendarUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2DVsfhOpmRwU1n7Cs5rgvrDdLlMLTJDarDR1alHZhnPd1MTNi1hqgECgVGI3WvidJwH4VFuDwL?gv=true';
  
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Payment Successful!</h1>
        <p style={styles.paragraph}>Thank you for your booking. You're one step closer to success!</p>
        <p style={styles.warning}>Please Upload Your CV to Your Drive Before Scheduling Your Appointment</p>
        <a href={calendarUrl} style={styles.button} target="_blank" rel="noopener noreferrer">
          Book an Appointment
        </a>
        <div style={styles.footer}>
          <p style={styles.footerText}>Need assistance? Contact us at info.intxapp@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

// CSS Styles (Inline)
const styles = {
  container: {
    width: '800px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
    fontFamily: 'Sora, sans-serif',
    marginTop: '30px',
    position: 'fixed',
    marginLeft: '380px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '80%',
    maxWidth: '600px',
    transition: 'transform 0.3s ease-in-out',
  },
  heading: {
    color: '#28a745',
    marginBottom: '20px',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  paragraph: {
    color: '#555',
    fontSize: '1.1rem',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  warning: {
    color: "red",
    fontSize: '1rem',
    marginBottom: '20px',
  },
  button: {
    border: '2px solid #EAC42D', // Added yellow border, increased width for visibility
    display: 'inline-block',
    padding: '15px 25px',
    marginTop: '20px',
    backgroundColor: 'rgb(255, 255, 255)',
    color: '#000',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    borderRadius: '40px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#c9a32a',
  },
  footer: {
    marginTop: '30px',
    borderTop: '1px solid #ddd',
    paddingTop: '20px',
  },
  footerText: {
    color: '#777',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  
};

export default Success;
