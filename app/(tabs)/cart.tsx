import { useState, useEffect, useCallback } from "react";
import { FlatList, StyleSheet, View, Text, ActivityIndicator, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CartItem from "@/components/cartItem";
import { backgroundColor } from "@/utils/constants";
import { removeFromCart, getCart, incrementQuantity, decrementQuantity } from "@/services/cartServices";
import { Book } from "@/utils/types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export function Cart() {
  const [books, setBooks] = useState<{ book: Book; quantity: number }[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCartData = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      const cartItems = await getCart();
      console.log('Fetched cart items:', cartItems);
      
      const booksData = await Promise.all(
        cartItems.map(async (item) => {
          const bookDoc = await getDoc(doc(db, 'books', item.bookId));
          if (!bookDoc.exists()) {
            console.warn(`Book ${item.bookId} not found`);
            return null;
          }
          return {
            book: {
              docID: bookDoc.id,
              ...bookDoc.data(),
            } as Book,
            quantity: item.quantity
          };
        })
      );
      
      const filteredBooks = booksData.filter(Boolean) as { book: Book; quantity: number }[];
      setBooks(filteredBooks);
      
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setError("Failed to load cart. Please try again.");
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Fetch data on focus and initial load
  useFocusEffect(
    useCallback(() => {
      fetchCartData();
    }, [fetchCartData])
  );

  const handleDelete = async (bookId: string) => {
    setIsProcessing(true);
    try {
      // Optimistic UI update
      setBooks(prev => prev.filter(item => item.book.docID !== bookId));
      
      const result = await removeFromCart(bookId);
      if (!result?.success) {
        throw new Error(result?.message || "Failed to remove item");
      }
      
      Alert.alert("Success", "Item removed from cart");
    } catch (error) {
      console.error("Delete failed:", error);
      setError("Failed to remove item. Please try again.");
      // Revert if error
      await fetchCartData();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleIncrement = async (bookId: string) => {
    setIsProcessing(true);
    try {
      // Optimistic UI update
      setBooks(prev => prev.map(item => 
        item.book.docID === bookId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
      
      const result = await incrementQuantity(bookId);
      if (!result?.success) {
        throw new Error(result?.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error("Increment failed:", error);
      setError("Failed to update quantity. Please try again.");
      // Revert if error
      await fetchCartData();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecrement = async (bookId: string) => {
    setIsProcessing(true);
    try {
      // Find current quantity for validation
      const currentItem = books.find(item => item.book.docID === bookId);
      if (!currentItem) return;
      
      // Optimistic UI update
      setBooks(prev => prev.map(item => 
        item.book.docID === bookId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
      
      const result = await decrementQuantity(bookId);
      if (!result?.success) {
        throw new Error(result?.message || "Failed to update quantity");
      }
      
      // If quantity was 1 and item should be removed
      if (currentItem.quantity === 1) {
        setBooks(prev => prev.filter(item => item.book.docID !== bookId));
      }
    } catch (error) {
      console.error("Decrement failed:", error);
      setError("Failed to update quantity. Please try again.");
      // Revert if error
      await fetchCartData();
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = () => {
    return books.reduce((total, item) => {
      return total + (item.book.price || 0) * item.quantity;
    }, 0).toFixed(2);
  };

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={fetchCartData}>
          Tap to retry
        </Text>
      </View>
    );
  }

  if (isProcessing) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {books.length === 0 ? (
        <View style={[styles.center, styles.emptyContainer]}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={books}
            refreshing={isRefreshing}
            onRefresh={fetchCartData}
            keyExtractor={(item) => item.book.docID}
            renderItem={({ item }) => (
              <CartItem
                id={item.book.docID}
                imageUrl={item.book.cover}
                name={item.book.title}
                author={item.book.authors || "Unknown Author"}
                price={item.book.price}
                description={
                  item.book.description?.slice(0, 100) + 
                  (item.book.description?.length > 100 ? "..." : "") || 
                  "No description available."
                }
                quantity={item.quantity}
                onDelete={handleDelete}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                disabled={isProcessing}
              />
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  retryText: {
    fontSize: 16,
    color: 'blue',
  },
  totalContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default Cart;