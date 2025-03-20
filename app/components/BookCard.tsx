import React from "react";
import { Text, Image, Pressable, StyleSheet , View} from "react-native";
import { useRouter } from "expo-router";
import fallback from "../../assets/FallBack.png"
import WishlistButton from "./WishlistButton";



interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  image: string;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, price, image }) => {
  const router = useRouter();

  return (
    <Pressable style={styles.card} 
    onPress={() => router.push(`/book/${id}`)}>
      <Image source={image ? { uri: image } : fallback} style={styles.image} />
      
      <View style={styles.wishlistContainer}>  
        <WishlistButton onToggle={(isWishlisted) => console.log(`${title} wishlist status:`, isWishlisted)} /> 
      </View>  

      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.author} numberOfLines={1}>{author}</Text>
      <Text style={styles.price}>{price}</Text>
    </Pressable>
  );
  
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 140, 
    minHeight: 230, 
    alignSelf: "flex-start", 
    shadowColor: "#0D1110",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 13,
    position: "relative",
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  details: {
    alignItems: "center",
  },


  wishlistContainer: { 
    position: "absolute",
    bottom : -2,
    right: -1,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  author: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1B5743",
    marginTop: 5,
  },
});

export default BookCard;
