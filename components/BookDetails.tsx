import { View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator, StyleSheet } from "react-native";
import { mainColor } from "@/utils/constants";

interface BookDetailsProps {
  id: string;
}

      const BookDetails: React.FC<BookDetailsProps> = ({ id }) => {
        const Books = [
          {
            id: "1",
            name: "The Alchemist",
            author: "Paulo Coelho",
            description: "A journey of self-discovery and following one's dreams.",
            price: "$10.99",
            image: "",
          },
          {
            id: "2",
            name: "Atomic Habits",
            author: " James Clear",
            description:
              "This book provides a practical guide to building good habits and breaking bad ones.",
            price: "$12.99",
            image: "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
          },
          {
            id: "3",
            name: "1984",
            author: "George Orwell",
            description:
              "A dystopian novel by George Orwell that explores the dangers of totalitarianism and extreme political ideology. The novel introduces the concept of Big Brother, mass surveillance, and thought control in a society where the government manipulates truth and reality.",
            price: "$9.99",
            image: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
          },
          {
            id: "4",
            name: "Rich Dad Poor Dad",
            author: "",
            description: "", // Missing description
            price: "$8.99",
            image: "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
          },
        ];
        const book = Books.find((book) => book.id === id);
        if (!book) {
          return (
            <View>
              <Text style={styles.errorText}>Book not found.</Text>
            </View>
          );
        }

        return (
          <View style={styles.container}>
            <Image style={styles.image} source={{ uri: book.image }} />
            <Text style={styles.title}>{book.name}</Text>
            <Text style={styles.author}>Author: {book.author || "Unknown"}</Text>
            <Text style={styles.description}>{book.description || "No description available."}</Text>
            <Text style={styles.price}>Price: {book.price}</Text>
          </View>
        );
      };

      const styles = StyleSheet.create({
        container: {
                  flex: 1,
        padding: 25,
        justifyContent: 'center',
        backgroundColor: '#FDF5E6',

        },
        title: {
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 12,
          color: "#333",
          textAlign: "center",
        },
        author: {
          fontSize: 20,
          marginBottom: 8,
          color: "#555",
          textAlign: "center",
        },
        description: {
          fontSize: 16,
          lineHeight: 24,
          color: "#444",
          marginBottom: 12,
          textAlign: "center",
          paddingHorizontal: 10,
        },
        errorText: {
          fontSize: 18,
          color: "red",
          textAlign: "center",
          marginTop: 20,
        },
        image: {
          width: 220,
          height: 330,
          resizeMode: "cover",
          margin: 15,
          alignSelf: "center",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#ccc",
        },
        price: {
          fontSize: 18,
          fontWeight: "bold",
          color: mainColor,
          marginBottom: 10,
          textAlign: "center",
        },
      });
  
export default BookDetails;
