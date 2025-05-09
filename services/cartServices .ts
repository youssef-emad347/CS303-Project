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

export const addToCart = async (bookId: string) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error("User not authenticated");
      }
  
      const cartRef = collection(db, "cart");
  
      const userQuery = query(cartRef, where("userId", "==", userId));
  
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
  
      const docRef = doc(db, "cart", userId);
      await setDoc(docRef, itemWithUserId, { merge: true }); 
  
      console.log("✅ Item added to cart successfully");
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  export const removeFromCart = async (bookId: string) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error("User not authenticated");
      }
  
      const docRef = doc(db, "cart", userId);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        console.log("🚫 Cart does not exist");
        return;
      }
  
      const data = docSnap.data();
      const currentBookIds: string[] = data.bookIds || [];
  
      if (!currentBookIds.includes(bookId)) {
        console.log("⚠️ Book not in cart");
        return;
      }
  
      const updatedBookIds = currentBookIds.filter((id) => id !== bookId);
  
      if (updatedBookIds.length === 0) {
        // delete document if no books left
        await deleteDoc(docRef);
        console.log("🗑️ cart cleared");
      } else {
        await setDoc(docRef, { userId, bookIds: updatedBookIds }, { merge: true });
        console.log("✅ Book removed from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  };