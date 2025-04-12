import { View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator, StyleSheet } from "react-native";
import { mainColor } from "@/utils/constants";

interface AuthorDetailProps {
  name: string;
}

      const AuthorDetails: React.FC<AuthorDetailProps> = ({ name }) => {
        const authors = [
            {
              name: "J.K. Rowling",
              bio: "British author, best known for the Harry Potter series.",
              nationality: "United Kingdom",
              image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/J._K._Rowling_2010.jpg",
            },
            {
              name: "George Orwell",
              bio: "English novelist, famous for 1984 and Animal Farm.",
              nationality: "United Kingdom",
              image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/George_Orwell_press_photo.jpg",
            },
            {
              name: "Agatha Christie",
              bio: "The Queen of Mystery, wrote Poirot and Miss Marple novels.",
              nationality: "United Kingdom",
              image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Agatha_Christie.png",
            },
            {
              name: "Mark Twain",
              bio: "American writer famous for Tom Sawyer and Huckleberry Finn.",
              nationality: "United States",
              image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Twain1907.jpg",
            },
          ];

        const author = authors.find((author) => author.name === name);
        if (!author) {
          return (
            <View>
              <Text style={styles.errorText}>author not found.</Text>
            </View>
          );
        }

        return (
          <View style={styles.container}>
            <Image style={styles.image} source={{ uri: author.image }} />
            <Text style={styles.title}>{author.name}</Text>
            <Text style={styles.author}>Author: {author.bio || "Unknown"}</Text>
            <Text style={styles.description}>{author.nationality || "No description available."}</Text>
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
  
export default AuthorDetails;
