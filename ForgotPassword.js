document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("forgot-password-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("email").value;

        if (email) {
            // Simulate backend token generation (in reality, this comes from a server)
            const resetToken = "12345"; // Placeholder token
            window.location.href = `reset-password.html?token=${resetToken}`; // Redirect to reset password page
        } else {
            alert("Please enter a valid email.");
        }
    });
});
