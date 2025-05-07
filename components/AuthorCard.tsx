import React from "react";
import { Text, Image, Pressable, StyleSheet } from "react-native";
import fallback from "@/assets/FallBack.png";
import { Author } from "@/utils/types";


const AuthorCard: React.FC<Author> = ({ name, bio, image }) => {
  return (
    <Pressable style={styles.card}>
      <Image source={image ? { uri: image } : fallback} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.bio} numberOfLines={2}>{bio}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 140, 
    minHeight: 210, 
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
  nationality: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  bio: {
    fontSize: 12,
    color: "#444",
    textAlign: "center",
    marginTop: 5,
  },
});

export default AuthorCard;
