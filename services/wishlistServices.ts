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

export const getWishlist = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const wishlistRef = collection(db, "wishlist");

    const userQuery = query(wishlistRef, where("userId", "==", userId));

    const snapshot = await getDocs(userQuery);

    let bookId: string[] = [];

    if (!snapshot.empty) {
      const docData = snapshot.docs[0].data();
      bookId = docData.bookIds || [];
    }
    console.log("✅ fetched successfully");
    return bookId;
    
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

export const addToWishlist = async (bookId: string) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error("User not authenticated");
      }
  
      const wishlistRef = collection(db, "wishlist");
  
      const userQuery = query(wishlistRef, where("userId", "==", userId));
  
      const snapshot = await getDocs(userQuery);
  
      let OldbookId: string[] = [];
  
      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data();
        OldbookId = docData.bookIds || [];
      }
  
      if (OldbookId.includes(bookId)) {
        console.log("🚫 Item already exists in wishlist");
        return { exists: true };
      }
  
      const updatedBookIds = [...OldbookId, bookId];
  
      const itemWithUserId = {
        userId,
        bookIds: updatedBookIds,
      };
  
      const docRef = doc(db, "wishlist", userId);
      await setDoc(docRef, itemWithUserId, { merge: true }); 
  
      console.log("✅ Item added to wishlist successfully");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw error;
    }
  };

  export const removeFromWishlist = async (bookId: string) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error("User not authenticated");
      }
  
      const docRef = doc(db, "wishlist", userId);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        console.log("🚫 Wishlist does not exist");
        return;
      }
  
      const data = docSnap.data();
      const currentBookIds: string[] = data.bookIds || [];
  
      if (!currentBookIds.includes(bookId)) {
        console.log("⚠️ Book not in wishlist");
        return;
      }
  
      const updatedBookIds = currentBookIds.filter((id) => id !== bookId);
  
      if (updatedBookIds.length === 0) {
        // delete document if no books left
        await deleteDoc(docRef);
        console.log("🗑️ Wishlist cleared");
      } else {
        await setDoc(docRef, { userId, bookIds: updatedBookIds }, { merge: true });
        console.log("✅ Book removed from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }
  };