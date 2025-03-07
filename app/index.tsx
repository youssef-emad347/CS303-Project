import { Pressable, Text, View ,Image ,StyleSheet } from "react-native";
import BookList from "./components/bookList";
import logo from "../assets/logo.png";
import About from "../app/about";
import { ScrollView } from "react-native-gesture-handler";
export default function Index() {
  return (
    <ScrollView>
    <View style={styles.headerContainer}>
      <Image source={logo} style={styles.image} />
      <Text> Search Bar</Text>
    </View>
    <BookList />
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