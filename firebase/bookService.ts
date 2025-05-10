import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, setDoc} from "firebase/firestore";
import { db } from "./firebase";
import { Book } from "@/utils/types";


export const addBook = async (book: Book): Promise<void> => {
  try {
    const docRef = await addDoc(collection(db, "books"), book);
    await setDoc(docRef, { ...book, docID: docRef.id }); 
    console.log("Book added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding book: ", e);
  }
};
    export const getBooks = async (): Promise<Book[]> => {
        try {
          const querySnapshot = await getDocs(collection(db, "books"));
          const books: Book[] = [];
          querySnapshot.forEach((doc) => {
            books.push({ id: doc.id, ...doc.data() } as Book);
          });
          return books;
        } catch (e) {
          console.error("Error getting books: ", e);
          return [];
        }
      };
      
      export const updateBook = async (id: string, updatedData: Partial<Book>): Promise<void> => {
        try {
          const bookRef = doc(db, "books", id);
          await updateDoc(bookRef, updatedData);
          console.log("Book updated");
        } catch (e) {
          console.error("Error updating book: ", e);
        }
      };

      export const deleteBook = async (id: string): Promise<void> => {
        try {
          const bookRef = doc(db, "books", id);
          await deleteDoc(bookRef);
          console.log("Book deleted");
        } catch (e) {
          console.error("Error deleting book: ", e);
        }
      };
      