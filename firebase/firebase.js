// import { initializeApp } from "firebase/app";

// import { getFirestore } from "firebase/firestore";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyDN1wOwMab4HB4PwdhN9u97f_OSZjLwE_E",
//   authDomain: "booxtore-e5bba.firebaseapp.com",
//   databaseURL: "https://booxtore-e5bba-default-rtdb.firebaseio.com",
//   projectId: "booxtore-e5bba",
//   storageBucket: "booxtore-e5bba.firebasestorage.app",
//   messagingSenderId: "569244843791",
//   appId: "1:569244843791:web:d659883c37cf11dd1b087a",
//   measurementId: "G-0ZF7S3D6E5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig); // أو أضف 'app1' لو كنت تحتاج ذلك
// const db = getFirestore(app);

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// export { app, auth, db };
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';  // إضافة Firebase Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase config
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
const db = getFirestore(app);
const storage = getStorage(app);  // إضافة Firebase Storage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth, db, storage };
