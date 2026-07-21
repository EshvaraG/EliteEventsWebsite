import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Clear previous errors
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Variable to keep track of validation errors
    let hasErrors = false;

    // Name validation
    if (name === "") {
        document.getElementById("nameError").textContent =
            "Please enter your full name.";
        hasErrors = true;
    }

    // Email validation
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent =
            "Please enter a valid email address (e.g. name@example.com).";
        hasErrors = true;
    }

    // Password validation
    if (password.length < 6) {
        document.getElementById("passwordError").textContent =
            "Password must be at least 6 characters long.";
        hasErrors = true;
    }

    // Stop if any validation errors exist
    if (hasErrors) {
        return;
    }

    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            fullName: name,
            email: email,
            createdAt: new Date()
        });

        alert("🎉 Successfully signed up!");

        window.location.href = "login.html";

    }

    catch (error) {

        switch (error.code) {

            case "auth/email-already-in-use":
                document.getElementById("emailError").textContent =
                    "This email address is already registered.";
                break;

            case "auth/invalid-email":
                document.getElementById("emailError").textContent =
                    "Please enter a valid email address.";
                break;

            case "auth/weak-password":
                document.getElementById("passwordError").textContent =
                    "Password is too weak. Please use at least 6 characters.";
                break;

            default:
                document.getElementById("passwordError").textContent =
                    error.message;
        }

    }

});