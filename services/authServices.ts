import { auth, db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  DocumentData,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { Wishlist } from "@/utils/types";
import { signOut } from "firebase/auth";
import { Alert } from "react-native";

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    Alert.alert("Success", "User signed out successfully");
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    return false;
  }
};
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log("✅ Auth ready, user is signed in:", user.uid);
//     // Now safe to call addToWishlist or any function that depends on auth
//   } else {
//     console.log("❌ User not signed in");
//   }
// });

