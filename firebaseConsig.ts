// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSg67bEmT1tZYsw7tiaLj4kpdyEXPeew8",
  authDomain: "learning-trail-64cd1.firebaseapp.com",
  projectId: "learning-trail-64cd1",
  storageBucket: "learning-trail-64cd1.firebasestorage.app",
  messagingSenderId: "988726282577",
  appId: "1:988726282577:web:c12b9940b5e58ad4e76b70",
  measurementId: "G-ZKJXS9L9Z0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
