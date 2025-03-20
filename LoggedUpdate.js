
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider,onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

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

const user = auth.currentUser;


function updateUserProfile(user) {
    const userName = user.displayName;
    const userEmail = user.email;
    console.log(userEmail)

    document.getElementById("userName").textContent = userName;
    document.getElementById("userEmail").textContent = userEmail;
}

updateUserProfile()

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.id;
        return uid;
    } else {
        alert("Create Login & Account");
    }
});