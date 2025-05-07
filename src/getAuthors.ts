import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface Author {
  id: string;
  name: string;
  bio: string;
  image: string;
  books: string[];
}

interface Book {
  title: string;
  authors: string[];
}

export async function getAllAuthorsFromBooks(): Promise<Author[]> {
  console.log("🔍 Fetching all books...");
  const booksRef = collection(db, "books");
  const booksSnap = await getDocs(booksRef);

  const allAuthorNames: Set<string> = new Set();

  booksSnap.forEach((doc) => {
    const data = doc.data() as Book;
    console.log(`📘 Found book: ${data.title}`);
    if (Array.isArray(data.authors)) {
      data.authors.forEach((name) => {
        console.log(`   ➕ Adding author name: ${name}`);
        allAuthorNames.add(name);
      });
    } else {
      console.warn(`⚠️ Book "${data.title}" has no valid 'authors' field`);
    }
  });

  console.log("✅ Unique author names extracted:", Array.from(allAuthorNames));

  const authorsRef = collection(db, "authors");
  const allAuthors: Author[] = [];

  for (const name of allAuthorNames) {
    console.log(`🔎 Querying author: ${name}`);
    const q = query(authorsRef, where("name", "==", name));
    const authorSnap = await getDocs(q);

    if (authorSnap.empty) {
      console.warn(`❌ Author not found in DB: ${name}`);
    }

    authorSnap.forEach((doc) => {
      const data = doc.data() as Omit<Author, "id">;
      console.log(`✅ Author matched: ${data.name} (ID: ${doc.id})`);
      allAuthors.push({ id: doc.id, ...data });
    });
  }

  console.log("🎯 Total authors collected:", allAuthors.length);
  return allAuthors;
}
getAllAuthorsFromBooks().then((authors) => {
  console.log("Returned Authors:", authors);
});