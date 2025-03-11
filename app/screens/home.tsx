import { Pressable, Text, View ,Image ,StyleSheet } from "react-native";

import logo from "../../assets/logo.png";

import { ScrollView } from "react-native-gesture-handler";
import BookList from "../components/bookList";
import About from "./about";

import { useState } from "react";
import SearchBar from "../components/SearchBar"; 

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScrollView>
    <View style={styles.headerContainer}>
      {/* <Image source={logo} style={styles.image} />
      <Text> Search Bar</Text> */}
    </View>
    <SearchBar onSearch={setSearchQuery} />
    <BookList searchQuery={searchQuery} />
    {/* <BookList /> */}
    <View>
    <Text style= {styles.header}> About project</Text>
    <About />
    </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  contianer:{
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
  header:{
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,}
});