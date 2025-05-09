import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import AuthorCard from "./AuthorCard";
import { Author } from "@/utils/types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { backgroundColor } from "@/utils/constants";

// Function to shuffle the array
const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function AuthorList() {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const authorsRef = collection(db, "authors");

    const unsubscribe = onSnapshot(authorsRef, (snapshot) => {
      const authorsData: Author[] = snapshot.docs.map((doc) => ({
        docID: doc.id,
        ...doc.data(),
      })) as unknown as Author[];

      // Shuffle the authors and get only 10 random authors
      const shuffledAuthors = shuffleArray(authorsData).slice(0, 7);
      setAuthors(shuffledAuthors);
    }, (error) => {
      console.error("Error fetching authors from Firestore:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={authors}
        renderItem={({ item }) => (
          <AuthorCard
            docID={item.docID}
            id={item.id}
            name={item.name}
            bio={item.bio}
            image={item.image}
            books={item.books}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: backgroundColor,
  },
  list: {
    paddingHorizontal: 35,
    backgroundColor: backgroundColor,
  },
});
