import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import BookCard from "./BookCard";

const Books = [
  {
    id: "1",
    name: "The Alchemist",
    author: "Paulo Coelho",
    description: "A journey of self-discovery and following one's dreams.",
    price: "$10.99",
    image: "",
  },
  {
    id: "2",
    name: "Atomic Habits",
    author: " James Clear",
    description:
      "This book provides a practical guide to building good habits and breaking bad ones.",
    price: "$12.99",
    image: "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: "3",
    name: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel by George Orwell that explores the dangers of totalitarianism and extreme political ideology. The novel introduces the concept of Big Brother, mass surveillance, and thought control in a society where the government manipulates truth and reality.",
    price: "$9.99",
    image: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: "4",
    name: "Rich Dad Poor Dad",
    author: "",
    description: "", // Missing description
    price: "$8.99",
    image: "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
  },
];

export default function BookList() {
  return (
    <View style={styles.container}>      
      <FlatList
        data={Books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard
            id={item.id}
            title={item.name}
            author={item.author || "Unknown Author"}
            price={item.price}
            image={item.image} 
       />
          )}
       horizontal={true} 
       showsHorizontalScrollIndicator={false} 
       contentContainerStyle={{ paddingHorizontal: 16 }} 
        />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    maxHeight: 300
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  }
});
