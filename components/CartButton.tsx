import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { backgroundColor, mainColor } from "@/utils/constants";

interface ButtonProps {
  docID: string;
  addToCart: (bookId: string) => Promise<any>;
}

export default function CartButton({ docID, addToCart }: ButtonProps) {
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
      style={[styles.cartButton, isAdded && styles.cartButtonAdded]}
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
const styles = StyleSheet.create({
  cartButton: {
    backgroundColor: "#1B5743",
    padding: 15,
    borderRadius: 24,
    marginTop: 30,
  },
  cartText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Almarai-Bold",
    fontSize: 16,
  },
  cartButtonAdded: {
    backgroundColor: mainColor,
    opacity: 0.5, // green
  },
  cartTextAdded: {
    color: "#fff",
  },
});
