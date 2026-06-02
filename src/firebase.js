// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdJe5j7BZpILyjeETkC-ITbFq1UNLthaM",
  authDomain: "intercomizacia.firebaseapp.com",
  databaseURL: "https://intercomizacia-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "intercomizacia",
  storageBucket: "intercomizacia.firebasestorage.app",
  messagingSenderId: "279787886930",
  appId: "1:279787886930:web:ee80566371852ef7a1428b",
  measurementId: "G-LPLV4WKFZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);