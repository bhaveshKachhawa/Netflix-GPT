// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGsnPJEB4HG66K28yOhcajF70hvnIzMI8",
  authDomain: "netflixgpt-8abfd.firebaseapp.com",
  projectId: "netflixgpt-8abfd",
  storageBucket: "netflixgpt-8abfd.firebasestorage.app",
  messagingSenderId: "810746096836",
  appId: "1:810746096836:web:40519f4f619682d3126d91",
  measurementId: "G-ZLGKNDC7N0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();