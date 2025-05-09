import { Text, View, StyleSheet, ScrollView } from "react-native";
import BookList from "@/components/BookList";
import AuthorList from "@/components/AuthorList";
import { backgroundColor } from "@/utils/constants";
import HomeBanner from "@/components/HomeBanner";


export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <HomeBanner />
      <BookList />
      <AuthorList />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: backgroundColor
  },
});
