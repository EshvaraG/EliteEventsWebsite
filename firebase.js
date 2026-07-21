// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcSE_GO1WHGY3WQc3v4rEBaf5t37vKkPI",
  authDomain: "elite-events-af64b.firebaseapp.com",
  projectId: "elite-events-af64b",
  storageBucket: "elite-events-af64b.firebasestorage.app",
  messagingSenderId: "822008494154",
  appId: "1:822008494154:web:e1e3192594d9d0ad9b8eb3",
  measurementId: "G-QCG7QF3PC4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);