import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import AuthorCard from "./AuthorCard";

const authors = [
  {
    name: "J.K. Rowling",
    bio: "British author, best known for the Harry Potter series.",
    nationality: "United Kingdom",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/J._K._Rowling_2010.jpg",
  },
  {
    name: "George Orwell",
    bio: "English novelist, famous for 1984 and Animal Farm.",
    nationality: "United Kingdom",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/George_Orwell_press_photo.jpg",
  },
  {
    name: "Agatha Christie",
    bio: "The Queen of Mystery, wrote Poirot and Miss Marple novels.",
    nationality: "United Kingdom",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Agatha_Christie.png",
  },
  {
    name: "Mark Twain",
    bio: "American writer famous for Tom Sawyer and Huckleberry Finn.",
    nationality: "United States",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Twain1907.jpg",
  },
];

const AuthorList: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={authors}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <AuthorCard {...item} />}
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  list: {
    paddingHorizontal: 35,
  },
});

export default AuthorList;
