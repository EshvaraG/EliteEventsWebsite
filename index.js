import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Welcome banner
const welcomeBanner = document.getElementById("welcomeBanner");

// Mobile menu buttons
const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");
const logoutBtn = document.getElementById("logoutBtn");

// Desktop buttons
const headerLoginBtn = document.getElementById("headerLoginBtn");
const headerSignupBtn = document.getElementById("headerSignupBtn");
const headerLogoutBtn = document.getElementById("headerLogoutBtn");

onAuthStateChanged(auth, (user) => {

    if (user) {

        // Show welcome banner
        welcomeBanner.style.display = "block";
        welcomeBanner.innerHTML = `
            <h2>Welcome, ${user.email}! 🎉</h2>
        `;

        // Show logout buttons
        logoutBtn.style.display = "inline-block";
        headerLogoutBtn.style.display = "inline-block";

        // Hide login/sign up buttons
        loginLink.style.display = "none";
        signupLink.style.display = "none";

        headerLoginBtn.style.display = "none";
        headerSignupBtn.style.display = "none";
    }

    else {

        // Hide welcome banner
        welcomeBanner.style.display = "none";

        // Hide logout buttons
        logoutBtn.style.display = "none";
        headerLogoutBtn.style.display = "none";

        // Show login/sign up buttons
        loginLink.style.display = "inline-block";
        signupLink.style.display = "inline-block";

        headerLoginBtn.style.display = "inline-block";
        headerSignupBtn.style.display = "inline-block";
    }

});

// Logout function
async function logoutUser() {

    try {

        await signOut(auth);

        alert("✅ You have successfully logged out.");

        window.location.href = "login.html";

    }

    catch (error) {

        alert(error.message);

    }

}

// Logout button inside hamburger menu
logoutBtn.addEventListener("click", logoutUser);

// Logout button next to hamburger icon
headerLogoutBtn.addEventListener("click", logoutUser);