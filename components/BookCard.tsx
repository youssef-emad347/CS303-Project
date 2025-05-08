import React from "react";
import { Text, Image, Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { addToCollection } from "@/services/firestoreServices";
import { auth ,db} from "@/firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import fallback from "@/assets/FallBack.png";
import WishlistButton from "./WishlistButton";


interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  image: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  price,
  image,
}) => {
  const router = useRouter();
  const handleAddToWishlist =  async() => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.log(" No user logged in");
      return;
    }

      const wishlistRef = collection(db, "wishlist");
      const userQuery = query(
        wishlistRef,
        where("userId", "==", userId),
        where("bookId", "==", id)
      );
    
      try {
      const snapshot = await getDocs(userQuery);
      if (!snapshot.empty) {
        console.log("🚫 Book already in wishlist");
        return;
      }
  
    addToCollection("wishlist", {
      id,
      title,
      author,
      price,
      imageUrl: image,
      userId,
    })
      .then(() => console.log(` ${title} added to wishlist`))
      .catch((err) => console.error(" Error adding to wishlist:", err));
    } catch (error) {
      console.error("❌ Error fetching wishlist:", error);
    }
  };
  
  return (
    <Pressable style={styles.card} onPress={() => router.push(`/book/${id}`)}>
      <View style={styles.wishlistContainer}>
      <WishlistButton
  onAddToWishlist={handleAddToWishlist}
  onToggle={(isWishlisted) =>
    console.log(`${title} wishlist status:`, isWishlisted)
  }
/>







      </View>
      <Image source={image ? { uri: image } : fallback} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.author} numberOfLines={1}>
        {author}
      </Text>
      <Text style={styles.price}>{price}</Text>
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
    shadowColor: "#0D1110",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 13,
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
