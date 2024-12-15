// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import 'firebase/auth';
import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD55b8nF3cy5bJDNks7Xb-qqoRblRN4jJ4",
  authDomain: "biblioteca-6a8e6.firebaseapp.com",
  databaseURL: "https://biblioteca-6a8e6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "biblioteca-6a8e6",
  storageBucket: "biblioteca-6a8e6.firebasestorage.app",
  messagingSenderId: "680933609513",
  appId: "1:680933609513:web:6632916ff0d267bcec8c38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com')
export { app, db, auth, googleProvider, appleProvider};