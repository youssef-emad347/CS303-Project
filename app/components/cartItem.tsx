import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import del from "../../assets/del.png";
import { mainColor } from "@/utils/constants";

interface ProductProps {
  id: string;
  name: string;
  author: string;
  description: string;
  price: string;
  imageUrl: string;
  onDelete: (id: string) => void;
}

const CartItem: React.FC<ProductProps> = ({
  id,
  name,
  author,
  price,
  description,
  imageUrl,
  onDelete,
}) => {
  const [quantity, setQuantity] = useState(1);
  // const handleDelete = () => {
  //   Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
  //     {
  //       text: "Cancel",
  //       style: "cancel",
  //     },
  //     { text: "OK", onPress: () => onDelete(id) },
  //   ]);
  // };
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <View style={styles.innerContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>{price} EGP</Text>
          <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Text style={styles.buttonText}>-</Text>
          </Pressable>

          <Text style={styles.quantity}>{quantity}</Text>

          <Pressable
            style={styles.button}
            onPress={() => setQuantity((q) => q + 1)}
          >
            <Text style={styles.buttonText}>+</Text>
          </Pressable>

        </View>
        </View>
        
      </View>
      <Pressable style={styles.deleteButton} onPress={() => onDelete(id)}>
            <Image source={del} style={{ width: 20, height: 20 }}></Image>
          </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
    margin: 10,
    marginRight: 25,
  },
  innerContainer: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    width: "100%",
    
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: mainColor,
  },
  author: {
    fontSize: 14,
    color: mainColor,
    opacity: 0.7,
    marginBottom: 5,
  },
  description: {
    fontSize: 13,
    color: mainColor,
    opacity: 0.5,
    marginBottom: 5,
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: mainColor,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: 5,
    left: 20,
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
    opacity: 0.2,
  },
});

export default CartItem;
