import React from "react";
import { Text, Image, Pressable, StyleSheet } from "react-native";
import fallback from "@/assets/FallBack.png";
import { Author } from "@/utils/types";
import { router } from "expo-router";
import { backgroundColor } from "@/utils/constants";


const AuthorCard: React.FC<Author> = ({
    docID,
    id ,
    name,
    bio,
    image,
    books,
}) => {

  return (
    <Pressable style={styles.card} onPress={() => router.push(`/author/${docID}`)}>
      <Image source={image ? { uri: image } : fallback} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.bio} numberOfLines={2}>{bio}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: backgroundColor,
    padding: 10,
    margin: 10,
    borderWidth:.3,
    borderRadius: 10,
    alignItems: "center",
    width: 140,
    minHeight: 230,
    alignSelf: "flex-start",
    
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  // nationality: {
  //   fontSize: 12,
  //   color: "#666",
  //   textAlign: "center",
  // },
  bio: {
    fontSize: 12,
    color: "#444",
    textAlign: "center",
    marginTop: 5,
  },
});

export default AuthorCard;
