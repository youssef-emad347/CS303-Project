import { auth,db } from "../firebase";
import {  collection,  addDoc, getDocs, deleteDoc, doc, query, where, DocumentData 
} from "firebase/firestore";






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


export const removeDocById = async (
  collectionName: string,
  docId: string
) => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};


export const addToWishlist = async (bookData: any) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    
    const wishlistRef = collection(db, "wishlist");
    const userQuery = query(
      wishlistRef,
      where("userId", "==", userId),
      where("bookId", "==", bookData.bookId)
    );

    const snapshot = await getDocs(userQuery);

    
    if (!snapshot.empty) {
      console.log("🚫 Item already exists in wishlist");
      return { exists: true };
    }

    const itemWithUserId = {
      ...bookData,
      userId,
    };
    
    const docRef = await addDoc(collection(db, "wishlist"), itemWithUserId);
    console.log("✅ Item added to wishlist successfully");
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
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


export const deleteItem = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch (error) {
    console.error(`Error deleting ${collectionName} item:`, error);
    throw error;
  }
};