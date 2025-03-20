// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZJSk1K7GqhcWBqfLCJJH1zC-ZECysy8U",
    authDomain: "int-x-a2ef7.firebaseapp.com",
    projectId: "int-x-a2ef7",
    storageBucket: "int-x-a2ef7.firebasestorage.app",
    messagingSenderId: "730824636640",
    appId: "1:730824636640:web:f7a0c1906b75ce65a5b885"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

// Handle Google Sign-Up for Register Page
document.addEventListener("DOMContentLoaded", () => {
    const googleRegister = document.getElementById("register-google-btn");

    if (googleRegister) {
        googleRegister.addEventListener("click", function () {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    console.log("Registered via Google:", user);
                    window.location.href = "../logged.html"; // Redirect to logged-in page
                })
                .catch((error) => {
                    console.error("Google Registration Error:", error.code, error.message);
                    alert("Google Registration Failed: " + error.message);
                });
        });
    } else {
        console.error("Google Register Button NOT FOUND");
    }
});

// Authentication State Check
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is registered:", user.email);
    } else {
        console.log("No user is registered.");
    }
});
