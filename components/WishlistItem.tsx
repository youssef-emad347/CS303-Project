import { Pressable, Text, View, Image, StyleSheet } from "react-native";
import { mainColor } from "@/utils/constants";

export interface WishItem {
  id?: string;
  title: string;
  name: string;
  docId?: string; 
  bookId: string;
  details: string;
  imageUrl: string;
  userId?: string;
};

const WishlistItem: React.FC<{
  item: WishItem;
  onRemove: () => void;
  onAddToCart: () => void;
}> = ({ item, onRemove, onAddToCart }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageView}>
        <Image style={styles.image} source={{uri: item.imageUrl }} />
      </View>
      <View style={styles.content}>
        <View style={styles.textView}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>{item.name}</Text>
          <Text style={styles.details}>{item.details}</Text>
        </View>
        <View style={styles.textView}></View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.addButton} onPress={onAddToCart}>
            <Text style={styles.addText}>Add to Cart</Text>
          </Pressable>
          <Pressable style={styles.removeButton} onPress={onRemove}>
            <Text style={styles.removeText}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
    height: 160,
  },
  image: {
    flexDirection: "row",
    height: 130,
    width: 90,
    margin: 10,
    borderRadius: 5,
    
    },
  imageView: {
    marginRight: 12,
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  textView: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
    marginBottom: 4,
    textAlign: "right",
  },
  author: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    textAlign: "right",
  },
  details: {
    fontSize: 12,
    color: "gray",
    marginBottom: 8,
    textAlign: "right",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 8,
    bottom: 10,
    justifyContent: "space-evenly",
  },

  addButton: {
    backgroundColor: mainColor,
    borderWidth: 1,
    borderColor: mainColor,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "center",
  },
  addText: {
    color: "white",
    fontSize: 13,
    fontWeight: "light",
  },
  removeButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: mainColor,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "center",
    marginLeft: 10,
  },
  removeText: {
    color: mainColor,
    fontSize: 13,
    fontWeight: "semibold",
  },
});
export default WishlistItem;
