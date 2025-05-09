import { db } from "@/firebase/firebase";
import { Book } from "@/utils/types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export function getBooksbyAuthor(author: string) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const booksRef = collection(db, "books");
    const bookQuery = query(
      booksRef,
      where("authors", "array-contains", author)
    );
    const unsubscribe = onSnapshot(
      bookQuery,
      (snapshot) => {
        const booksData: Book[] = snapshot.docs.map((doc) => ({
          docID: doc.id,
          ...doc.data(),
        })) as Book[];

        const shuffledBooks = shuffleArray(booksData).slice(0, 10);
        setBooks(shuffledBooks);
      },
      (error) => {
        console.error("Error fetching books from Firestore:", error);
      }
    );

    return () => unsubscribe();
  }, []);
}

export function getBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const booksRef = collection(db, "books");

    const unsubscribe = onSnapshot(
      booksRef,
      (snapshot) => {
        const booksData: Book[] = snapshot.docs.map((doc) => ({
          docID: doc.id,
          ...doc.data(),
        })) as Book[];
        setBooks(booksData);
      },
      (error) => {
        console.error("Error fetching books from Firestore:", error);
      }
    );

    return () => unsubscribe();
  }, []);
}
