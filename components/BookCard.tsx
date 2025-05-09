import React from "react";
import { Text, Image, Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { addToWishlist ,removeFromWishlist } from "@/services/wishlistServices";
import { auth, db } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import fallback from "@/assets/FallBack.png";
import WishlistButton from "./WishlistButton";
import { Book } from "@/utils/types";
import { backgroundColor } from "@/utils/constants";
import { onAuthStateChanged } from "firebase/auth";

const BookCard: React.FC<Book> = ({
  docID,
  title,
  authors,
  cover,
  price,
}) => {
  const router = useRouter();
  
  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/book/${docID}`)}
    >
      <View style={styles.wishlistContainer}>
        <WishlistButton
          onAddToWishlist={() => addToWishlist(docID)}
          onRemoveFromWishlist={() => removeFromWishlist(docID) }

        />
      </View>
      <Image source={cover ? { uri: cover } : fallback} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.author} numberOfLines={1}>
        {authors}
      </Text>
      <Text style={styles.price}>{price} $</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: backgroundColor,
    padding: 10,
    margin: 10,
    borderWidth: 0.3,
    borderRadius: 10,
    alignItems: "center",
    width: 140,
    minHeight: 230,
    maxHeight: 235,
    alignSelf: "flex-start",
    position: "relative",
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  details: {
    alignItems: "center",
  },

  wishlistContainer: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  author: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1B5743",
    marginTop: 5,
  },
});

export default BookCard;
