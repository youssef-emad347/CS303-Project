import { Pressable, Text, View ,Image ,StyleSheet } from "react-native";


const RenderWhishList: React.FC<{ item: WhishListItem; onRemove: () => void }> = ({ item, onRemove }) => {
  return (
    <View style={styles.card}>
        <View style={styles.imageView}>
            <Image style={styles.image}
            source={{uri:item.image}}/>
        </View>
        <View style={styles.content}>
            <View style={styles.textView}>
                <Text>{item.title}</Text>
                <Text>{item.details}</Text>
            </View>
            <View style={styles.textView}>
                
            </View>
            <Pressable style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeText}>Remove</Text>
        </Pressable>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header:{
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  card:{
    backgroundColor:'white',
    flexDirection:'row',
    margin:5,
    marginHorizontal:10,
    height:150,
    width:"100%"
  },
  image:{
    height:140,
    width:100,
    
  },
  imageView:{
    justifyContent:'center',
    height:"100%",
    padding: 5,
  },
  content:{
    flex: 1,
    width:"100%",
    alignItems: 'flex-end',
     paddingRight: 10
  },
  textView:{
   flex:1,
   paddingLeft: 20,
   paddingRight: 30
   
  },
  title: {
    fontSize: 100,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "gray",
  },
  removeButton: {
    
    borderWidth: 1,
    borderColor: "#1b5743",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "center",
    top: -15,
    
  },
  removeText: {
    color: "#1b5743",
    fontSize: 14,
    fontWeight: "bold",
  },
  
});
export default RenderWhishList;