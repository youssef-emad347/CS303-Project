import React from "react";
import { Text, Image, Pressable, StyleSheet } from "react-native";
import fallback from "../../assets/FallBack.png";

interface AuthorCardProps {
  name: string;
  bio: string;
  nationality: string;
  image: string;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ name, bio, nationality, image }) => {
  return (
    <Pressable style={styles.card}>
      <Image source={image ? { uri: image } : fallback} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.nationality}>{nationality}</Text>
      <Text style={styles.bio} numberOfLines={2}>{bio}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    margin: 10,
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
