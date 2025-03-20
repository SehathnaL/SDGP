document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');

    // Toggle Functionality
    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });

    // LOGIN PAGE SOCIAL MEDIA BUTTONS
    const googleLoginBtn = document.getElementById('google-login-btn');
    const instagramLoginBtn = document.getElementById('instagram-login-btn');
    const linkedinLoginBtn = document.getElementById('linkedin-login-btn');

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
        });
    }

    if (instagramLoginBtn) {
        instagramLoginBtn.addEventListener('click', () => {
            window.open('https://www.instagram.com/intxapp', '_blank', 'noopener,noreferrer');
        });
    }

    if (linkedinLoginBtn) {
        linkedinLoginBtn.addEventListener('click', () => {
            window.open('https://www.linkedin.com/company/105339682/admin/dashboard/', '_blank', 'noopener,noreferrer');
        });
    }

    // REGISTER PAGE SOCIAL MEDIA BUTTONS
    const googleRegisterBtn = document.getElementById('register-google-btn');
    const instagramRegisterBtn = document.getElementById('register-instagram-btn');
    const linkedinRegisterBtn = document.getElementById('register-linkedin-btn');

    if (googleRegisterBtn) {
        googleRegisterBtn.addEventListener('click', () => {
        });
    }

    if (instagramRegisterBtn) {
        instagramRegisterBtn.addEventListener('click', () => {
            window.open('https://www.instagram.com/intxapp', '_blank', 'noopener,noreferrer');
        });
    }

    if (linkedinRegisterBtn) {
        linkedinRegisterBtn.addEventListener('click', () => {
            window.open('https://www.linkedin.com/company/105339682/admin/dashboard/', '_blank', 'noopener,noreferrer');
        });
    }
});
