import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import AuthorCard from "./AuthorCard";
import { Author } from "@/utils/types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { backgroundColor } from "@/utils/constants";

export default function AuthorList() {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const authorsRef = collection(db, "authors");

    const unsubscribe = onSnapshot(authorsRef, (snapshot) => {
      const authorsData: Author[] = snapshot.docs.map((doc) => ({
        docID: doc.id,
        ...doc.data(),
      })) as unknown as Author[];
      setAuthors(authorsData);
    }, (error) => {
      console.error("Error fetching books from Firestore:", error);
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
    backgroundColor: backgroundColor
  },
  list: {
    paddingHorizontal: 35,
    backgroundColor: backgroundColor
  },
});
