import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Clear previous messages
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("successMessage").textContent = "";

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Track validation errors
    let hasErrors = false;

    // Email validation
    if (!emailPattern.test(email)) {

        document.getElementById("emailError").textContent =
            "Please enter a valid email address (e.g. name@example.com).";

        hasErrors = true;
    }

    // Password validation
    if (password === "") {

        document.getElementById("passwordError").textContent =
            "Please enter your password.";

        hasErrors = true;
    }

    // Stop only after checking ALL fields
    if (hasErrors) {
        return;
    }

    try {

        await signInWithEmailAndPassword(auth, email, password);

        document.getElementById("successMessage").textContent =
            "✓ Successfully logged in! Redirecting...";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    }

    catch (error) {

        switch (error.code) {

            case "auth/invalid-credential":
                document.getElementById("passwordError").textContent =
                    "Incorrect email or password.";
                break;

            case "auth/wrong-password":
                document.getElementById("passwordError").textContent =
                    "Incorrect password.";
                break;

            case "auth/user-not-found":
                document.getElementById("emailError").textContent =
                    "No account exists with this email address.";
                break;

            case "auth/invalid-email":
                document.getElementById("emailError").textContent =
                    "Please enter a valid email address.";
                break;

            default:
                document.getElementById("passwordError").textContent =
                    error.message;
        }

    }

});