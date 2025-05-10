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

export const getCart = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const cartRef = collection(db, "cart");
    const userQuery = query(cartRef, where("userId", "==", userId));
    const snapshot = await getDocs(userQuery);

    let books: {bookId: string, quantity: number}[] = [];

    if (!snapshot.empty) {
      const docData = snapshot.docs[0].data();
      books = docData.books || [];
    }
    console.log("✅ Cart fetched successfully");
    return books;
    
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const addToCart = async (bookId: string) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const cartRef = collection(db, "cart");
    const userQuery = query(cartRef, where("userId", "==", userId));
    const snapshot = await getDocs(userQuery);

    let existingBooks: {bookId: string, quantity: number}[] = [];

    if (!snapshot.empty) {
      const docData = snapshot.docs[0].data();
      existingBooks = docData.books || [];
    }

    // Check if book already exists
    const existingBookIndex = existingBooks.findIndex(book => book.bookId === bookId);
    
    if (existingBookIndex !== -1) {
      // If exists, increment quantity
      existingBooks[existingBookIndex].quantity += 1;
    } else {
      // If new, add with quantity 1
      existingBooks.push({ bookId, quantity: 1 });
    }

    const docRef = doc(db, "cart", userId);
    await setDoc(docRef, {
      userId,
      books: existingBooks
    }, { merge: true });

    console.log("✅ Item added/updated in cart successfully");
    return { success: true };
    
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
      return { success: false, message: "Cart does not exist" };
    }

    const data = docSnap.data();
    let currentBooks: {bookId: string, quantity: number}[] = data.books || [];

    // Filter out the book to remove
    const updatedBooks = currentBooks.filter(book => book.bookId !== bookId);

    if (updatedBooks.length === 0) {
      // Delete document if no books left
      await deleteDoc(docRef);
      console.log("🗑️ Cart cleared");
    } else {
      // Update document with remaining books
      await setDoc(docRef, { 
        userId, 
        books: updatedBooks 
      }, { merge: true });
      console.log("✅ Book removed from cart");
    }

    return { success: true };
    
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

export const incrementQuantity = async (bookId: string) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);

    let books: { bookId: string; quantity: number }[] = [];

    if (docSnap.exists()) {
      books = docSnap.data().books || [];
    }

    const index = books.findIndex(b => b.bookId === bookId);

    if (index !== -1) {
      books[index].quantity += 1;
    } else {
      // If book not found, add it with quantity 1
      books.push({ bookId, quantity: 1 });
    }

    await setDoc(docRef, { userId, books }, { merge: true });
    console.log("✅ Quantity incremented");
    return { success: true };
    
  } catch (error) {
    console.error("Error incrementing quantity:", error);
    throw error;
  }
};

export const decrementQuantity = async (bookId: string) => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("🚫 Cart does not exist");
      return { success: false, message: "Cart does not exist" };
    }

    let books: { bookId: string; quantity: number }[] = docSnap.data().books || [];
    const index = books.findIndex(b => b.bookId === bookId);

    if (index === -1) {
      console.log("⚠️ Book not in cart");
      return { success: false, message: "Book not in cart" };
    }

    if (books[index].quantity > 1) {
      books[index].quantity -= 1;
    } else {
      // If quantity is 1, remove the item completely
      books.splice(index, 1);
    }

    if (books.length === 0) {
      await deleteDoc(docRef);
      console.log("🗑️ Cart cleared (last item removed)");
    } else {
      await setDoc(docRef, { userId, books }, { merge: true });
      console.log("✅ Quantity decremented");
    }

    return { success: true };
    
  } catch (error) {
    console.error("Error decrementing quantity:", error);
    throw error;
  }
};