import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import del from "@/assets/del.png";
import { backgroundColor, borderWidth, mainColor } from "@/utils/constants";
import fallback from '@/assets/FallBack.png';
import { router } from "expo-router";

interface ProductProps {
  id: string;
  name: string;
  author: string;
  description: string;
  price: string;
  imageUrl: string;
  quantity: number;
  onDelete: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const CartItem: React.FC<ProductProps> = ({
  id,
  name,
  author,
  price,
  description,
  imageUrl,
  quantity,
  onDelete,
  onIncrement,
  onDecrement
}) => {
  
  return (
    <View style={styles.card}>
      <Image source={ imageUrl ? {uri : imageUrl} : fallback } style={styles.image} />

      <Pressable style={styles.innerContainer} onPress={() => router.push(`/book/${id}`)}>
        <View style={styles.content} >
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>{price} EGP</Text>
          <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => onDecrement}
          >
            <Text style={styles.buttonText}>-</Text>
          </Pressable>

          <Text style={styles.quantity}>{quantity}</Text>

          <Pressable
            style={styles.button}
            onPress={() => onIncrement}
          >
            <Text style={styles.buttonText}>+</Text>
          </Pressable>

        </View>
        
        
      </View>
      </Pressable>
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
    backgroundColor: backgroundColor,
    borderWidth: borderWidth,
    borderRadius: 10,
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
    backgroundColor: backgroundColor,
    borderColor: mainColor,
    borderWidth: 1.5,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    color: mainColor,
    fontWeight: "bold",
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
