
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBSiobECIgQtumLU7W53VhrOx9LuUhi1AI",
  authDomain: "booxtore-final.firebaseapp.com",
  projectId: "booxtore-final",
  storageBucket: "booxtore-final.firebasestorage.app",
  messagingSenderId: "475951267270",
  appId: "1:475951267270:web:a1f59a9e89188f604f46c7"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Auth with AsyncStorage for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ Export initialized services
export { app, auth, db };