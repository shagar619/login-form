// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1ljsmUVsQf1wqa9v3SMglXglO_TWQ9Ic",
  authDomain: "login-form-499d2.firebaseapp.com",
  projectId: "login-form-499d2",
  storageBucket: "login-form-499d2.firebasestorage.app",
  messagingSenderId: "974369762890",
  appId: "1:974369762890:web:0d5a2d82fd4742427200b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app); 