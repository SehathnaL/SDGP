document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reset-password-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token"); // Get token from URL
        const newPassword = document.getElementById("new-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (!token) {
            alert("Invalid or expired reset link.");
            window.location.href = "forgot-password.html"; // Redirect if no token
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        // Simulate password update (Replace with backend API call)
        console.log(`Password successfully reset for token: ${token}`);
        alert("Your password has been reset successfully!");

        // Redirect to login page after successful reset
        setTimeout(() => {
            window.location.href = "Login.html";
        }, 3000);
    });
});
