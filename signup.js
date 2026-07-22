import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Toast notification
const toast = document.getElementById("toast");

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

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

    // Stop if validation fails
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

        // Show success toast
        showToast("🎉 Successfully signed up! Redirecting to Login...");

        // Redirect after toast
        setTimeout(() => {

            window.location.href = "login.html";

        }, 1500);

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