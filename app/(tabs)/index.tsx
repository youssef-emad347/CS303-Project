import { Text, View, StyleSheet, ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookList from "@/components/BookList";
import AuthorList from "@/components/AuthorList";
import AuthorDetails from "@/components/AuthorDetails";


function HomeScreen() {
  return (
    <ScrollView>
      <BookList />
      <AuthorList />
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
