import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const welcomeBanner = document.getElementById("welcomeBanner");

const logoutBtn = document.getElementById("logoutBtn");
const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");

onAuthStateChanged(auth, (user) => {

    if (user) {

        // Show welcome banner
        welcomeBanner.style.display = "block";
        welcomeBanner.innerHTML = `
            <h2>Welcome, ${user.email}! 🎉</h2>
        `;

        // Show Logout button
        logoutBtn.style.display = "inline-block";

        // Hide Login & Sign Up
        loginLink.style.display = "none";
        signupLink.style.display = "none";

    }
    else {

        // Hide welcome banner
        welcomeBanner.style.display = "none";

        // Hide Logout button
        logoutBtn.style.display = "none";

        // Show Login & Sign Up
        loginLink.style.display = "inline-block";
        signupLink.style.display = "inline-block";

    }

});

// Logout
logoutBtn.addEventListener("click", async () => {

    try {

        await signOut(auth);

        alert("✅ You have successfully logged out.");

        window.location.href = "login.html";

    }
    catch (error) {

        alert(error.message);

    }

});