import BottomNavigator from "./components/bottom_navigation";
import { Stack } from "expo-router";
import React , {useState} from "react";
import{ StyleSheet} from "react-native";
export default function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    
      <BottomNavigator />
     
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