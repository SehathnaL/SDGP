document.addEventListener("DOMContentLoaded", () => {
    // Create Container
    const container = document.createElement("div");
    container.classList.add("container");

    // Create Login Form
    const loginBox = document.createElement("div");
    loginBox.classList.add("form-box", "login");

    loginBox.innerHTML = `
        <div class="form-container">
            <form id="login-form">
                <h1>Login</h1>
                <div class="input-box">
                    <input type="text" id="login-username" placeholder="Username" required>
                    <i class='bx bxs-user'></i>
                </div>
                <div class="input-box">
                    <input type="password" id="login-password" placeholder="Password" required>
                    <i class='bx bxs-lock-alt'></i>
                </div>
                <div class="forgot-link">
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit" class="btn">Login</button>
                <p>or login with social platforms</p>
                <div class="social-buttons">
                    <button id="google-login-btn" class="social-button google-button"><i class="fab fa-google"></i></button>
                    <button id="instagram-login-btn" class="social-button instagram-button"><i class="fab fa-instagram"></i></button>
                    <button id="linkedin-login-btn" class="social-button linkedin-button"><i class="fab fa-linkedin-in"></i></button>
                </div>
            </form>
        </div>
    `;

    // Create Register Form
    const registerBox = document.createElement("div");
    registerBox.classList.add("form-box", "register");

    registerBox.innerHTML = `
        <div class="form-container">
            <form id="register-form">
                <h1>Register</h1>
                <div class="input-box">
                    <input type="text" id="register-username" placeholder="Username" required>
                    <i class='bx bxs-user'></i>
                </div>
                <div class="input-box">
                    <input type="email" id="register-email" placeholder="Email" required>
                    <i class='bx bxs-envelope'></i>
                </div>
                <div class="input-box">
                    <input type="password" id="register-password" placeholder="Password" required>
                    <i class='bx bxs-lock-alt'></i>
                </div>
                <button type="submit" class="btn">Register</button>
                <p>or register with social platforms</p>
                <div class="social-buttons">
                    <button id="register-google-btn" class="social-button google-button"><i class="fab fa-google"></i></button>
                    <button id="register-instagram-btn" class="social-button instagram-button"><i class="fab fa-instagram"></i></button>
                    <button id="register-linkedin-btn" class="social-button linkedin-button"><i class="fab fa-linkedin-in"></i></button>
                </div>
            </form>
        </div>
    `;

    // Create Toggle Panel
    const toggleBox = document.createElement("div");
    toggleBox.classList.add("toggle-box");

    toggleBox.innerHTML = `
        <div class="toggle-panel toggle-left">
            <h1>Hello, there!</h1>
            <p>Welcome to intX</p>
            <button class="btn register-btn">Register</button>
        </div>
        <div class="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button class="btn login-btn">Login</button>
        </div>
    `;

    // Append elements to container
    container.appendChild(loginBox);
    container.appendChild(registerBox);
    container.appendChild(toggleBox);

    // Append container to body
    document.body.appendChild(container);

    // Handle Form Submissions
    document.getElementById("login-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;
        alert(`Login Attempt: Username - ${username}, Password - ${password}`);
    });

    document.getElementById("register-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("register-username").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        alert(`Registration Attempt: Username - ${username}, Email - ${email}, Password - ${password}`);
    });

    // Toggle Forms
    document.querySelector(".register-btn").addEventListener("click", () => {
        loginBox.style.display = "none";
        registerBox.style.display = "block";
    });

    document.querySelector(".login-btn").addEventListener("click", () => {
        registerBox.style.display = "none";
        loginBox.style.display = "block";
    });

    // Initialize with Login Form
    registerBox.style.display = "none";
});
