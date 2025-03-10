import { Pressable, Text, View ,Image ,StyleSheet } from "react-native";
import BookList from "./components/bookList";
import logo from "../assets/logo.png";
import About from "./screens/about";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { BottomNavigator } from "./screens/bottom_navigation";


export default function Index() {
  return (
    // <NavigationContainer>
      <BottomNavigator/>
    // </NavigationContainer>
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