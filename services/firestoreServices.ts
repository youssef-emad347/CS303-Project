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

export const getDocsByField = async (
  collectionName: string,
  field: string,
  value: any
) => {
  const q = query(collection(db, collectionName), where(field, "==", value));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    docId: doc.id,
  }));
};

export const removeDocById = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};


export const addToCollection = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding to ${collectionName}:`, error);
    throw error;
  }
};



export const getCollectionItems = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const items: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (error) {
    console.error(`Error getting ${collectionName} items:`, error);
    throw error;
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

export const deleteItem = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch (error) {
    console.error(`Error deleting ${collectionName} item:`, error);
    throw error;
  }
};
