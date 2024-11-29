// firebase.config.js
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export { database };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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