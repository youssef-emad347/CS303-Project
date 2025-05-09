import { FlatList, View,StyleSheet, Text, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import WishlistItem from "@/components/WishlistItem";
import { Book } from "@/utils/types";
import { backgroundColor } from "@/utils/constants";
import { getWishlist, removeFromWishlist } from "@/services/wishlistServices";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const WishList: React.FC = () => {
  const [bookIDs, setBookIDs] = useState<Book[]>([]);
  const [filtered, setFiltered] = useState<Book[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const ids = await getWishlist(); // string[]
        const bookDocs = await Promise.all(
          ids.map(id => getDoc(doc(db, 'books', id)).then(doc => ({ docID: doc.id, ...doc.data() })))
        );
        setBookIDs(bookDocs as unknown as Book[]);
      } catch (err) {
        console.error('Failed to fetch wishlist books:', err);
      } finally {
      }
      setFiltered(bookIDs as Book[]);
    };
    fetchWishlist();
  }, []);
 
  const handleRemove = async (docID : string) => {
   
    try {
      console.log("Starting to remove item to wishlist...");
      await removeFromWishlist(docID);
      setFiltered(prev => prev.filter(book => book.docID !== docID));
      console.log("Item removed successfully");
    } catch (error) {
      console.error("Error remove:", error);
      Alert.alert("Error", "There was an issue removing");
    } finally {
    }
    
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={filtered}
        keyExtractor={(item) => item.docID || String(Math.random())}
        renderItem={({ item }) => (
          <WishlistItem
            item={item}
            handleRemove={() => handleRemove(item.docID)}
          />
        )}
      />
    </View>
  );
};

export default WishList;
