import React, { useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { Book } from "@/utils/types"
import { backgroundColor, mainColor } from '@/utils/constants';
import Reviews from './Reviews';
import WishlistButton from './WishlistButton';
import { addToWishlist, removeFromWishlist } from '@/services/wishlistServices';
import { addToCart } from '@/services/cartServices';
import CartButton from './CartButton'

const BookDetails: React.FC<Book> = ({
  docID,
  isbn13,
  title,
  authors,
  cover,
  price,
  description
  }) => {
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: cover }} style={styles.image} />
      <View style={styles.wishlistContainer}>
        <WishlistButton
          onAddToWishlist={() => addToWishlist(docID)}
          onRemoveFromWishlist={() => removeFromWishlist(docID) }

        />
      </View>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.priceContainer}>
        <Pressable style={styles.priceButton}>
          <Text style={styles.priceText}>New{'\n'}{price} $</Text>
        </Pressable>
        <Pressable style={styles.priceButton}>
          <Text style={styles.priceText}>Used{'\n'}{Math.ceil(.75 * price)} $</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.text}>{description || "No description available"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Author</Text>
        <Text style={styles.text}>{authors}</Text>
      </View>

      <CartButton docID={docID} addToCart={addToCart} />
      <Reviews bookId={docID} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    backgroundColor: backgroundColor,
    flex: 1
  },
  image: {
     width: '100%',
     height: 250, 
     resizeMode: 'contain', 
     marginBottom: 20
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0D1110',
    fontFamily: 'Almarai-Bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  priceButton: {
    borderWidth: 1,
    borderColor: '#1B5743',
    borderRadius: 12,
    padding: 15,
    width: '40%',
    backgroundColor: '#FFFFFF',
  },
  priceText: {
    textAlign: 'center',
    fontFamily: 'Almarai-Regular',
    color: '#1B5743',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: '700',
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#0D1110',
    marginBottom: 5,
  },
  text: {
    fontFamily: 'Almarai-Regular',
    fontSize: 14,
    color: '#0D1110',
  },
  seeMore: {
    color: '#1B5743',
  },
  
  wishlistContainer: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    right: 10,
  },
});

export default BookDetails;
