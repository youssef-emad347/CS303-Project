import { View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import BookCard from "./BookCard";
import { Book } from "@/utils/types";
import { backgroundColor } from "@/utils/constants";

// Function to shuffle the array
const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const booksRef = collection(db, "books");

    const unsubscribe = onSnapshot(booksRef, (snapshot) => {
      const booksData: Book[] = snapshot.docs.map((doc) => ({
        docID: doc.id,
        ...doc.data(),
      })) as Book[];

      const shuffledBooks = shuffleArray(booksData).slice(0, 10);
      setBooks(shuffledBooks);
    }, (error) => {
      console.error("Error fetching books from Firestore:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.docID}
        renderItem={({ item }) => (
          <BookCard {...item} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: backgroundColor,
    maxHeight: 300,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
