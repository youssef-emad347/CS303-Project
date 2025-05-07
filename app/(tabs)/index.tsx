import { Text, View, StyleSheet, ScrollView } from "react-native";
import BookList from "@/components/BookList";
import AuthorList from "@/components/AuthorList";

export default function Home() {
  return (
    <ScrollView>
      <BookList />
      <AuthorList />
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
