import { Text, View, Image, StyleSheet, ScrollView } from "react-native";

import logo from "../../assets/logo.png";
import BookList from "../components/BookList";
import About from "../screens/about";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import AuthorList from "../components/AuthorList";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Image source={logo} style={styles.image} />
        <View style={{ flex: 1 }}>
          <SearchBar onSearch={setSearchQuery} />
        </View>
      </View>
      <BookList searchQuery={searchQuery} />
      <View>
        <Text style={styles.header}> About project</Text>
        <About />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
  },
});
