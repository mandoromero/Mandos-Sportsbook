// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyBZG4B9-T3JU8J7MExlVyNDgHkkp9Vn-CI",
  authDomain: "mandos-sportsbook.firebaseapp.com",
  projectId: "mandos-sportsbook",
  storageBucket: "mandos-sportsbook.appspot.com",
  messagingSenderId: "680494738589",
  appId: "1:680494738589:web:7fc2b1a569ed758ea2f874",
  measurementId: "G-56BJNZB2WR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
