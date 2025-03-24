import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import './Login.css';

const firebaseConfig = {
    apiKey: "AIzaSyDZJSk1K7GqhcWBqfLCJJH1zC-ZECysy8U",
    authDomain: "int-x-a2ef7.firebaseapp.com",
    projectId: "int-x-a2ef7",
    storageBucket: "int-x-a2ef7.appspot.com",
    messagingSenderId: "730824636640",
    appId: "1:730824636640:web:f7a0c1906b75ce65a5b885"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        // Instead of navigating, show the popup
        setShowPopup(true);
    };

    const handleRegister = (event) => {
        event.preventDefault();
        if (username && email && newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
            // Handle registration logic here
            setShowPopup(true);
        } else {
            alert("Please fill in all fields.");
        }
    };

    const handleGoogleAuth = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // Show the popup on successful login
                setShowPopup(true);
            })
            .catch((error) => {
                alert("Google authentication failed.");
            });
    };

    const handleForgotPassword = (event) => {
        event.preventDefault();
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Password reset email sent!");
                    setIsForgotPassword(false);
                })
                .catch(() => {
                    alert("Failed to send password reset email.");
                });
        } else {
            alert("Please enter your email.");
        }
    };

    return (
        <div className='full-version'>
            <div className={`container ${!isLogin ? 'active' : ''}`}>
                {isForgotPassword ? (
                    <div className="form-box forgot-password">
                        <div className="form-container">
                            <form onSubmit={handleForgotPassword}>
                                <h1>Forgot Password</h1>
                                <div className="input-box">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <i className='bx bxs-envelope'></i>
                                </div>
                                <button type="submit" className="btn">Send Reset Link</button>
                                <div className="forgot-link">
                                    <button type="button" onClick={() => setIsForgotPassword(false)}>Back to Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="form-box login">
                            <div className="form-container">
                                <form onSubmit={handleLogin}>
                                    <h1>Login</h1>
                                    <div className="input-box">
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                        <i className='bx bxs-user'></i>
                                    </div>
                                    <div className="input-box">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <i className='bx bxs-lock-alt'></i>
                                    </div>
                                    <div className="forgot-link">
                                        <button type="button" onClick={() => setIsForgotPassword(true)}>Forgot password?</button>
                                    </div>
                                    <button type="submit" className="btn">Login</button>
                                    <p>or login with social platforms</p>
                                    <div className="social-buttons">
                                        <button type="button" className="social-button" onClick={handleGoogleAuth}>
                                            <i className="fab fa-google"></i>
                                        </button>
                                        <button type="button" className="social-button" onClick={() => window.open('https://www.instagram.com/intxapp', '_blank', 'noopener,noreferrer')}>
                                            <i className="fab fa-instagram"></i>
                                        </button>
                                        <button type="button" className="social-button" onClick={() => window.open('https://www.linkedin.com/company/105339682/admin/dashboard/', '_blank', 'noopener,noreferrer')}>
                                            <i className="fab fa-linkedin-in"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="form-box register">
                            <div className="form-container">
                                <form onSubmit={handleRegister}>
                                    <h1>Register</h1>
                                    <div className="input-box">
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                        <i className='bx bxs-user'></i>
                                    </div>
                                    <div className="input-box">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <i className='bx bxs-envelope'></i>
                                    </div>
                                    <div className="input-box">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                        <i className='bx bxs-lock-alt'></i>
                                    </div>
                                    <div className="input-box">
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <i className='bx bxs-lock-alt'></i>
                                    </div>
                                    <button type="submit" className="btn">Register</button>
                                    <p>or register with social platforms</p>
                                    <div className="social-buttons">
                                        <button type="button" className="social-button" onClick={handleGoogleAuth}>
                                            <i className="fab fa-google"></i>
                                        </button>
                                        <button type="button" className="social-button" onClick={() => window.open('https://www.instagram.com/intxapp', '_blank', 'noopener,noreferrer')}>
                                            <i className="fab fa-instagram"></i>
                                        </button>
                                        <button type="button" className="social-button" onClick={() => window.open('https://www.linkedin.com/company/105339682/admin/dashboard/', '_blank', 'noopener,noreferrer')}>
                                            <i className="fab fa-linkedin-in"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )}

                {/* Toggle box (outside of conditional) */}
                <div className="toggle-box">
                    <div className="toggle-panel toggle-left">
                        <h1>Hello, there!</h1>
                        <p>Welcome to intX</p>
                        <button className="btn register-btn" onClick={() => setIsLogin(false)}>Register</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Welcome Back!</h1>
                        <p>Already have an account?</p>
                        <button className="btn login-btn" onClick={() => setIsLogin(true)}>Login</button>
                    </div>
                </div>
            </div>

            {/* Popup for successful login or registration */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>{isLogin ? 'Login Successful!' : 'Registration Successful!'}</h2>
                        <p>{isLogin ? `Welcome back, ${username}!` : `Welcome, ${username}!`}</p>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;