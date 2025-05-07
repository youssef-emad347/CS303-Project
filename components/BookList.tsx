import { View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseBooks";
import { collection, onSnapshot } from "firebase/firestore";
import BookCard from "./BookCard";

interface Book {
  id: string;
  title: string;
  author: string;
  newCopyPrice: string;
  imageUrl: string;
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const booksRef = collection(db, "books");

    const unsubscribe = onSnapshot(booksRef, (snapshot) => {
      const booksData: Book[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];
      setBooks(booksData);
    }, (error) => {
      console.error("Error fetching books from Firestore:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard
            id={item.id}
            title={item.title}
            author={item.author || "Unknown Author"}
            price={`${item.newCopyPrice} EGP`}

            image={item.imageUrl}
          />
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
    backgroundColor: "#f5f5f5",
    maxHeight: 300,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  }
});
