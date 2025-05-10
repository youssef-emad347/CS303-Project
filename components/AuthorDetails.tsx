import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from "react-native";
import { Author, Book } from "@/utils/types"
import { backgroundColor } from "@/utils/constants";
import BookCard from "./BookCard";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";

function BookList({ author }: { author: string }) {
  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };
  
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

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.docID}
        renderItem={({ item }) => (
          <BookCard
            {...item}
            />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
}

const AuthorDetails: React.FC<Author> = ({ 
  docID,
  id ,
  name,
  bio,
  image,
  books,
 }) => {


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: image }} 
          style={styles.profileImage} 
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      
      <View style={styles.bioContainer}>
        <Text style={styles.bioTitle}>About</Text>
        <Text style={styles.bioText}>{bio}</Text>
        <BookList author={name} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  nationality: {
    fontSize: 16,
    color: "#666",
  },
  bioContainer: {
    marginTop: 20,
  },
  bioTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default AuthorDetails;