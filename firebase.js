// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlauWucuX4nV1g4_Me0IJSUFRDnUjIFCM",
  authDomain: "react-native-dream-69377.firebaseapp.com",
  projectId: "react-native-dream-69377",
  storageBucket: "react-native-dream-69377.firebasestorage.app",
  messagingSenderId: "1044361744327",
  appId: "1:1044361744327:web:b93bafa94b99243d5653e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app,auth,db};