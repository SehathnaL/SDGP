import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './Register.module.css'; // Import the CSS module

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log(formData);

    // After successful registration, navigate to the login page
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles["register-form"]}>
        <h2>Create an Account</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            <br />
            <div className={styles["form-group"]}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <br />
          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <br />
            <div className={styles["form-group"]}>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>
          </div>
          <br />
          <div className={styles["form-terms"]}>
            <label>
              <input
                type="checkbox"
                id="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              I Accept Terms and Conditions and Privacy Policy
            </label>
          </div>
          <br />
          <div className={styles.button}>
            <button type="submit" className={styles["signup-btn"]}>
              Sign Up
            </button>
          </div>
          <div className={styles["social-login"]}>
            <p>or</p>
            <br />
            <div className={styles["social-icons"]}>
            <div className={styles["social-icons"]}>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google"
              >
                <i className="fab fa-google"></i>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
