import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Author } from "@/utils/types"
import { backgroundColor } from "@/utils/constants";

const AuthorDetails: React.FC<Author> = ({ 
  docID,
  id ,
  name,
  bio,
  image,
  books,
 }) => {


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: image }} 
          style={styles.profileImage} 
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      
      <View style={styles.bioContainer}>
        <Text style={styles.bioTitle}>About</Text>
        <Text style={styles.bioText}>{bio}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  nationality: {
    fontSize: 16,
    color: "#666",
  },
  bioContainer: {
    marginTop: 20,
  },
  bioTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default AuthorDetails;