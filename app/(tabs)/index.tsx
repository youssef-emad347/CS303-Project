import { Text, View, StyleSheet, ScrollView } from "react-native";
import BookList from "@/components/BookList";
import About from "../screens/about";
import AuthorList from "@/components/AuthorList";

export default function Home() {
  return (
    <ScrollView>
      <BookList />
      <AuthorList />
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
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
