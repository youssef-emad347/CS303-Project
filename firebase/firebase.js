// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN1wOwMab4HB4PwdhN9u97f_OSZjLwE_E",
  authDomain: "booxtore-e5bba.firebaseapp.com",
  databaseURL: "https://booxtore-e5bba-default-rtdb.firebaseio.com",
  projectId: "booxtore-e5bba",
  storageBucket: "booxtore-e5bba.firebasestorage.app",
  messagingSenderId: "569244843791",
  appId: "1:569244843791:web:d659883c37cf11dd1b087a",
  measurementId: "G-0ZF7S3D6E5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);