import { Pressable, Text, View, Image, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { backgroundColor, mainColor } from "@/utils/constants";
import { addToCart } from '@/services/cartServices ';
import { Book } from "@/utils/types";
import { useState } from "react";
import { router } from "expo-router";
import { removeFromWishlist } from "@/services/wishlistServices";

interface ButtonProps {
  docID?: string;
  addToCart?: (bookId: string) => Promise<any>;
  removeFromWishlist?: () => void;
}

function CartButton({ docID, addToCart }: ButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (isAdded || loading) return; // prevent duplicate presses

    setLoading(true);
    try {
      console.log("Starting to add item to cart...");
      await addToCart(docID);
      console.log("Item added to cart successfully");
      setIsAdded(true);
    } catch (error) {
      console.error("Error during addToCart:", error);
      Alert.alert("Error", "There was an issue adding the item to the cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      style={[styles.addButton, isAdded && styles.cartButtonAdded]}
      onPress={handleAddToCart}
      disabled={loading || isAdded}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.cartText}>{isAdded ? "Added" : "Add to cart"}</Text>
      )}
    </Pressable>
  );
}

function RemoveButton({ removeFromWishlist }: ButtonProps) {

  return (
    <Pressable
      style={styles.removeButton}
      onPress={removeFromWishlist}
    >
      <Text style={styles.removeText}>Remove</Text>
    </Pressable>
  );
}
const WishlistItem: React.FC<{
  item: Book;
  handleRemove: () => void;
}> = ({ item , handleRemove }) => {
  return (
    <Pressable style={styles.card} onPress={() => router.push(`/book/${item.docID}`)}>
      <View style={styles.imageView}>
        <Image style={styles.image} source={{uri: item.cover }} />
      </View>
      <View style={styles.content}>
        <View style={styles.textView}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>{item.authors}</Text>
          <Text style={styles.details}>{item.description || "No description available"}</Text>
        </View>
        <View style={styles.textView}></View>

        <View style={styles.buttonContainer}>
            <CartButton docID={item.docID} addToCart={addToCart} />
            <RemoveButton removeFromWishlist={handleRemove} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: backgroundColor
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: backgroundColor,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderWidth:.3,
    borderRadius: 10,
    alignItems: "center",
    maxHeight: 190,
  },
  image: {
    flexDirection: "row",
    height: 130,
    width: 90,
    margin: 10,
    borderRadius: 5,
    
    },
  imageView: {
    marginRight: 12,
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  textView: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
    marginBottom: 4,
    textAlign: "right",
  },
  author: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    textAlign: "right",
  },
  details: {
    fontSize: 12,
    color: "gray",
    marginBottom: 8,
    textAlign: "right",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 8,
    bottom: 10,
    justifyContent: "space-evenly",
  },

  addButton: {
    backgroundColor: mainColor,
    borderWidth: 1,
    borderColor: mainColor,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "center",
  },
  addText: {
    color: "white",
    fontSize: 13,
    fontWeight: "light",
  },
  removeButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: mainColor,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "center",
    marginLeft: 10,
  },
  removeText: {
    color: mainColor,
    fontSize: 13,
    fontWeight: "semibold",
  },
  cartButton: {
    backgroundColor: mainColor,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "center",
    marginLeft: 10,
  },
  cartText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 13,
  },
  cartButtonAdded: {
    backgroundColor: mainColor,
    opacity: 0.5, // green
  },
  cartTextAdded: {
    color: "#fff",
  },
});
export default WishlistItem;
