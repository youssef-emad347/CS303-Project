import BottomNavigator from "./components/bottom_navigation";
import SearchBar from "./components/SearchBar";
import logo from "../assets/logo.png";
import { useState } from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
     <View style={styles.headerContainer}>
        <Image source={logo} style={styles.image} />
        <View style={{ flex: 1 }}>
          <SearchBar onSearch={setSearchQuery} />
        </View>
      </View>
      <BottomNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
});