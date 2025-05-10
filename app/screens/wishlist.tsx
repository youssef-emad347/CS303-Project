import { FlatList, View, StyleSheet, Text, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import WishlistItem from "@/components/WishlistItem";
import { Book } from "@/utils/types";
import { backgroundColor } from "@/utils/constants";
import { getWishlist, removeFromWishlist } from "@/services/wishlistServices";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const WishList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setIsLoading(true);
        const wishlistIds = await getWishlist(); // string[]
        
        const bookPromises = wishlistIds.map(async (id) => {
          const bookDoc = await getDoc(doc(db, 'books', id));
          return {
            docID: bookDoc.id,
            ...bookDoc.data()
          } as Book;
        });

        const fetchedBooks = await Promise.all(bookPromises);
        setBooks(fetchedBooks);
      } catch (err) {
        console.error('Failed to fetch wishlist books:', err);
        Alert.alert("Error", "Failed to load wishlist");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWishlist();
  }, []);

  const handleRemove = async (docID: string) => {
    try {
      await removeFromWishlist(docID);
      setBooks(prev => prev.filter(book => book.docID !== docID));
      Alert.alert("Success", "Item removed from wishlist");
    } catch (error) {
      console.error("Error removing item:", error);
      Alert.alert("Error", "There was an issue removing the item");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading your wishlist...</Text>
      </View>
    );
  }

  if (books.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your wishlist is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={books}
        keyExtractor={(item) => item.docID}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default WishList;