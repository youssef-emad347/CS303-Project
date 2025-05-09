import { FlatList, View,StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";
import {collection ,query , where , onSnapshot , getDocs} from "firebase/firestore";
import {addToCollection,getCollectionItems,deleteItem, getDocsByField, removeDocById,} from "../../services/firestoreServices";
import WishlistItem, { WishItem } from "@/components/WishlistItem";
import { auth } from "@/firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../firebase";
import firestore from '@react-native-firebase/firestore';



import WishlistItem from "@/components/WishlistItem";
import { WishItem } from "@/components/WishlistItem";
import { backgroundColor } from "@/utils/constants";

const WishList: React.FC = () => {
  const [wishList, setWishList] = useState<WishItem[]>([]);
  const [cart, setCart] = useState<WishItem[]>([]);
  const userId = auth.currentUser?.uid;



  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem("cart");
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (error) {
      console.error("Error loading cart", error);
    }
  };





  const saveCart = async (cartItems: WishItem[]) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart", error);
    }
  };


  const fetchWishlist = async () => {
    
    if (!userId) return;

    const wishlistRef = collection(db, "wishlist");
    const q = query(wishlistRef, where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: WishItem[] = [];
      snapshot.forEach((doc) => {
        console.log("Found item:", doc.data()); 
        items.push({ id: doc.id, ...doc.data(), docId: doc.id } as WishItem);
      });
      setWishList(items);
    }, (error) => {
      console.error("Error in real-time wishlist:", error);
    });


    loadCart();
    return () => unsubscribe(); 

  };



  
  

  const handleRemove = async (docId?: string) => {
    if (!docId) return;
    try {
      await removeDocById("wishlist", docId);
      setWishList((prev) => prev.filter((item) => item.docId !== docId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  


  const handleAddToCart = (item: WishItem) => {
    const itemExists = cart.some(cartItem => cartItem.id === item.id);
    if (!itemExists) {
      const updatedCart = [...cart, item];
      setCart(updatedCart);
      saveCart(updatedCart);
    }
  };

 
  

  const handleAddToWishlist = async () => {


  if (!userId) return;

 const bookId = "book-002";
  const wishlistRef = collection(db, "wishlist");
  const userQuery = query(
    wishlistRef,
    where("userId", "==", userId),
    where("bookId", "==", bookId) 
  );

  const snapshot = await getDocs(userQuery);

  if (!snapshot.empty) {
    console.log("🚫 Item already exists in wishlist");
    return;
  }



    addToCollection("wishlist", {
      userId,
      bookId,
      title: "Test Book",
      description: "A book just for testing.",
      price: 19.99,
      imageUrl: "https://example.com/book.png",
    })
      .then(() => {
        console.log("✅ Item added to wishlist successfully");
        
      })
      .catch((error) => {
        console.error(" Error adding to wishlist:", error);
        fetchWishlist(); 
      });
  };

  if (!userId) {
    return <Text>Please log in to view your wishlist.</Text>;
  }
  
  return (
    <View style={{ flex: 1 ,backgroundColor: backgroundColor}}>
      {wishList.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No items in your wishlist.</Text>
      ) : (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={wishList}
          keyExtractor={(item) => item.id || String(Math.random())}
          renderItem={({ item }) => (
            <WishlistItem
              item={item}
              onRemove={() => item.id && handleRemove(item.id)}
              onAddToCart={() => handleAddToCart(item)}
            />
          )}
        />
      )}
    </View>
  );
};

export default WishList;
