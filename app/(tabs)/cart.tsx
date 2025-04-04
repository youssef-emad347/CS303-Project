import { Text, View, FlatList, Image,StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {WhishListItem} from "../../utils/types";

export default function Cart() {
  const [cart, setCart] = useState<WhishListItem[]>([]);
  useEffect(() => {
    loadCart(); 
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart)); 
      }
    } catch (error) {
      console.error("Error loading cart", error);
    }
  };
  return (
    <View style={styles.container}>
    <Text style={styles.header}>Cart</Text>
    {cart.length === 0 ? (
      <Text style={styles.emptyText}>Your cart is empty</Text> // <-- Added: Display empty message if cart is empty
    ) : (
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.title}</Text>
          </View>
        )}
      />
    )}
  </View>
);
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header:{
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
  item: {  
    flex :1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  image: {  
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
});