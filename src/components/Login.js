import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./Login.module.css"; // Import the CSS module
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Add a class to the body when the component mounts
        document.body.classList.add(styles.centeredPage);
    
        // Remove the class when the component unmounts
        return () => {
          document.body.classList.remove(styles.centeredPage);
        };
      }, []);

      const handleSignUpClick = () => {
        navigate("/register"); // Navigate to the /register route when clicked
      };

  return (
    <div className={styles.container}>
      <div className={styles["left-panel"]}>
        <div className={styles["welcome-text"]}>
          <h2>Hi there,</h2>
          <h1>Welcome Back</h1>
        </div>
        <img src="Avatar.jpg" alt="Avatar" className={styles.avatar} />
        <div className={styles["logo-container"]}>
          <img src="logo.jpg" alt="intX Logo" className={styles.logo} />
        </div>
      </div>
      <div className={styles["right-panel"]}>
        <form className={styles["login-form"]}>
          <h2>Log in to your account</h2>
          <div className={styles["form-group"]}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className={styles["form-options"]}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className={styles["forgot-password"]}>
              Forgot Password?
            </a>
          </div>
          <div className={styles["button-container"]}>
            <button type="submit" className={styles["login-btn"]}>
              Log In
            </button>
          </div>
          <p className={styles.signup}>
            New member?{" "}
            <span
              onClick={handleSignUpClick} // Trigger navigation on click
              style={{ color:"#f9b234", cursor: "pointer" }}
            >
              Create an account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
