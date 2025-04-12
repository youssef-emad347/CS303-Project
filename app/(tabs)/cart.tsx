import { useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import CartItem from "@/components/cartItem";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";

const App: React.FC = () => {
  const item = [
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
      image:
        "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "3",
      name: "1984",
      author: "George Orwell",
      description:
        "A dystopian novel by George Orwell that explores the dangers of totalitarianism and extreme political ideology. The novel introduces the concept of Big Brother, mass surveillance, and thought control in a society where the government manipulates truth and reality.",
      price: "$9.99",
      image:
        "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "4",
      name: "Rich Dad Poor Dad",
      author: "",
      description: "", // Missing description
      price: "$8.99",
      image:
        "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "5",
      name: "The Alchemist",
      author: "Paulo Coelho",
      description: "A journey of self-discovery and following one's dreams.",
      price: "$10.99",
      image: "",
    },
    {
      id: "6",
      name: "Atomic Habits",
      author: " James Clear",
      description:
        "This book provides a practical guide to building good habits and breaking bad ones.",
      price: "$12.99",
      image:
        "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "7",
      name: "1984",
      author: "George Orwell",
      description:
        "A dystopian novel by George Orwell that explores the dangers of totalitarianism and extreme political ideology. The novel introduces the concept of Big Brother, mass surveillance, and thought control in a society where the government manipulates truth and reality.",
      price: "$9.99",
      image:
        "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "8",
      name: "Rich Dad Poor Dad",
      author: "",
      description: "", // Missing description
      price: "$8.99",
      image:
        "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "9",
      name: "The Alchemist",
      author: "Paulo Coelho",
      description: "A journey of self-discovery and following one's dreams.",
      price: "$10.99",
      image: "",
    },
    {
      id: "10",
      name: "Atomic Habits",
      author: " James Clear",
      description:
        "This book provides a practical guide to building good habits and breaking bad ones.",
      price: "$12.99",
      image:
        "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "11",
      name: "1984",
      author: "George Orwell",
      description:
        "A dystopian novel by George Orwell that explores the dangers of totalitarianism and extreme political ideology. The novel introduces the concept of Big Brother, mass surveillance, and thought control in a society where the government manipulates truth and reality.",
      price: "$9.99",
      image:
        "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "12",
      name: "Rich Dad Poor Dad",
      author: "",
      description: "", // Missing description
      price: "$8.99",
      image:
        "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "13",
      name: "The Alchemist",
      author: "Paulo Coelho",
      description: "A journey of self-discovery and following one's dreams.",
      price: "$10.99",
      image: "",
    },
    {
      id: "14",
      name: "Atomic Habits",
      author: " James Clear",
      description:
        "This book provides a practical guide to building good habits and breaking bad ones.",
      price: "$12.99",
      image:
        "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "15",
      name: "1984",
      author: "George Orwell",
      description:
        "A dystopian novel by George Orwell that explores the dangers of totalitarianism and extreme political ideology. The novel introduces the concept of Big Brother, mass surveillance, and thought control in a society where the government manipulates truth and reality.",
      price: "$9.99",
      image:
        "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "16",
      name: "Rich Dad Poor Dad",
      author: "",
      description: "", // Missing description
      price: "$8.99",
      image:
        "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
    },
  ];

  const handleDelete = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };
  const [items, setItems] = useState(item);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            padding: 5,
            textAlign: "center",
          }}
        >
          Shopping Cart
        </Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            id={item.id}
            imageUrl={item.image}
            name={item.name}
            author={item.author || "Unknown Author"}
            price={item.price}
            description={
              item.description.length > 100
                ? item.description.slice(0, 100) + "..."
                : item.description || "No description available."
            }
            onDelete={handleDelete}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },

  header: {
    paddingVertical: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 5,
  },
});

export default App;
