import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const products = [
  {
    id: "1",
    name: "The Alchemist",
    description: "A journey of self-discovery and following one's dreams.",
    price: "$10.99",
    image: "https://example.com/alchemist.jpg",
  },
  {
    id: "2",
    name: "Atomic Habits",
    description:
      "This book provides a practical guide to building good habits and breaking bad ones.",
    price: "$12.99",
    image: "",
  },
  {
    id: "3",
    name: "1984",
    description:
      "A dystopian novel by George Orwell that explores the dangers of totalitarianism and extreme political ideology. The novel introduces the concept of Big Brother, mass surveillance, and thought control in a society where the government manipulates truth and reality.",
    price: "$9.99",
    image: "https://example.com/1984.jpg",
  },
  {
    id: "4",
    name: "Rich Dad Poor Dad",
    description: "", // Missing description
    price: "$8.99",
    image: "https://example.com/richdad.jpg",
  },
];

export default function Products() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📚 Available Books</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image
              source={{uri : item.image}}
              style={styles.productImage}
              resizeMode="cover"
            />
            <Text style={styles.productName}>{item.name}</Text>

            <Text style={styles.productDescription}>
              {item.description}
            </Text>

            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    marginTop: 10,
  },
});
