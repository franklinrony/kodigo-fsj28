// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0Y177_wHFGcSgBamoxN-IF7ZbOCeABzA",
  authDomain: "citas-medicas-kodigo.firebaseapp.com",
  projectId: "citas-medicas-kodigo",
  storageBucket: "citas-medicas-kodigo.firebasestorage.app",
  messagingSenderId: "985326809468",
  appId: "1:985326809468:web:eb053ab53a6f251a33b4f9",
  measurementId: "G-S6SMW4QP0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }; 