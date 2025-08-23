// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZG4B9-T3JU8J7MExlVyNDgHkkp9Vn-CI",
  authDomain: "mandos-sportsbook.firebaseapp.com",
  projectId: "mandos-sportsbook",
  storageBucket: "mandos-sportsbook.firebasestorage.app",
  messagingSenderId: "680494738589",
  appId: "1:680494738589:web:7fc2b1a569ed758ea2f874",
  measurementId: "G-56BJNZB2WR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;