import { Pressable, Text, View ,Image ,StyleSheet } from "react-native";
import { WhishListItem } from "@/utils/types";

const WishlistItem: React.FC<{ item: WhishListItem; onRemove: () => void; onAddToCart: () => void; }> = ({ item, onRemove , onAddToCart }) => {
  return (
    <View style={styles.card}>
        <View style={styles.imageView}>
            <Image style={styles.image}
            source={{uri:item.image}}/>
        </View>
        <View style={styles.content}>
            <View style={styles.textView}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>{item.name}</Text>
                <Text style={styles.details}>{item.details}</Text>
            </View>
            <View style={styles.textView}>
                
            </View>

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
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
   
  },
  header:{
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    
  },
  card:{
    flexDirection: "row",  
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center", 
    
  },
  image:{
    flexDirection:"row",
    height:150,
    width:100,
    margin :15,
    paddingTop:12,
    
  }, 
  imageView:{
   
    marginRight: 12,
  
  },
  content:{
    flex: 1,
    width:"100%",
    alignItems: 'flex-end',
     paddingRight: 10
  },
  textView:{
   flex:1,
  
   
  },
  author: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
    marginBottom: 4,
   
  },
  details: {
    fontSize: 12,
    color: "gray",
    marginBottom: 8,
  },
  buttonContainer: { 
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 8,

  },

  
  addButton:{
    backgroundColor: "#1b5743",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    top: 20,

  },
  addText:{
    color: "white",
    fontSize: 14,
    fontWeight: "light",
  },
  removeButton: {
    
    borderWidth: 1,
    borderColor: "#1b5743",
    paddingVertical: 6,
    paddingHorizontal: 15,
    
    borderRadius: 20,
    alignSelf: "center",
    top: 20,
    
  },
  removeText: {
    color: "#1b5743",
    fontSize: 14,
    fontWeight: "semibold",
  },
  
});
export default WishlistItem;