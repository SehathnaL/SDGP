// LoginPage.js
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './Login.css';

const firebaseConfig = {
    apiKey: "AIzaSyDZJSk1K7GqhcWBqfLCJJH1zC-ZECysy8U",
    authDomain: "int-x-a2ef7.firebaseapp.com",
    projectId: "int-x-a2ef7",
    storageBucket: "int-x-a2ef7.firebasestorage.app",
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
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                navigate('/MainLayout');
            }
        });
    }, [navigate]);

    const handleLogin = (event) => {
        event.preventDefault();
        // Handle login logic here
        navigate('/MainLayout');
    };

    const handleRegister = (event) => {
        event.preventDefault();
        if (username && email && newPassword && confirmPassword) {
            // Handle registration logic here
            navigate('/MainLayout');
        } else {
            alert("Please fill in all fields.");
        }
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result.user);
                navigate('/MainLayout');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleGoogleRegister = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result.user);
                navigate('/MainLayout');
            })
            .catch((error) => {
                console.error(error);
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
                .catch((error) => {
                    console.error("Error sending password reset email:", error);
                    alert("Failed to send password reset email. Please try again.");
                });
        } else {
            alert("Please enter a valid email.");
        }
    };

    const handleResetPassword = (event) => {
        event.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (!token) {
            alert("Invalid or expired reset link.");
            navigate("/forgot-password");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        console.log(`Password successfully reset for token: ${token}`);
        alert("Your password has been reset successfully!");

        setTimeout(() => {
            navigate("/login");
        }, 3000);
    };
    return (
        <div className={`container ${!isLogin ? 'active' : ''}`}>
            {isForgotPassword ? (
                <div className="form-box forgot-password">
                    <h1>Forgot Password</h1>
                    <form onSubmit={handleForgotPassword}>
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
                            <a href="#" onClick={() => setIsForgotPassword(false)}>Back to Login</a>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="form-box login">
                        <div className="form-container">
                            <form onSubmit={handleLogin}>
                                <h1>Login</h1>
                                <div className="input-box">
                                    <input type="text" placeholder="Username" required />
                                    <i className='bx bxs-user'></i>
                                </div>
                                <div className="input-box">
                                    <input type="password" placeholder="Password" required />
                                    <i className='bx bxs-lock-alt'></i>
                                </div>
                                <div className="forgot-link">
                                    <a href="#" onClick={() => setIsForgotPassword(true)}>Forgot password?</a>
                                </div>
                                <button type="submit" className="btn">Login</button>
                                <p>or login with social platforms</p>
                                <div className="social-buttons">
                                    <button type="button" className="social-button google-button" onClick={handleGoogleLogin}>
                                        <i className="fab fa-google"></i>
                                    </button>
                                    <button type="button" className="social-button instagram-button" onClick={() => window.open('https://www.instagram.com/intxapp', '_blank', 'noopener,noreferrer')}>
                                        <i className="fab fa-instagram"></i>
                                    </button>
                                    <button type="button" className="social-button linkedin-button" onClick={() => window.open('https://www.linkedin.com/company/105339682/admin/dashboard/', '_blank', 'noopener,noreferrer')}>
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
                                <button type="submit" className="btn" onClick={handleRegister}>Register</button>
                                <p>or register with social platforms</p>
                                <div className="social-buttons">
                                    <button type="button" className="social-button google-button" onClick={handleGoogleRegister}>
                                        <i className="fab fa-google"></i>
                                    </button>
                                    <button type="button" className="social-button instagram-button" onClick={() => window.open('https://www.instagram.com/intxapp', '_blank', 'noopener,noreferrer')}>
                                        <i className="fab fa-instagram"></i>
                                    </button>
                                    <button type="button" className="social-button linkedin-button" onClick={() => window.open('https://www.linkedin.com/company/105339682/admin/dashboard/', '_blank', 'noopener,noreferrer')}>
                        <i className="fab fa-linkedin-in"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>
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
</>
)}
</div>
);
};

export default LoginPage;