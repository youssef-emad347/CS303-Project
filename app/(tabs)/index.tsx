import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useState } from 'react';
import BookList from "@/components/BookList";
import About from "../screens/about";
import AuthorList from "@/components/AuthorList";
import Search from "@/components/SearchBar"
import React from "react";

export default function Home() {

  const [searchQuery, setSearchQuery] = useState(""); 

  const handleSearch = (query: string) => {
    setSearchQuery(query);  
  }

  return (
    <ScrollView>
      <Search onSearch={handleSearch} />
      
      <View style={styles.container}>
        <Text style={styles.header}>Books</Text>
        <BookList searchQuery={searchQuery} />     
     </View>
      <View>
        <Text style={styles.header}> About project</Text>
        <AuthorList />
        <About />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
