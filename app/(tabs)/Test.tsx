import { Pressable, Text, View ,Image ,StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import map from '../../components/map';
export default function Test() {
  const router = useRouter();
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <Pressable style={styles.button} onPress={() => router.push(`../screens/wishlist`)} >
          <Text style={styles.buttonText}> Go to Wishlist </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.push(`/auth/login`)}>
          <Text style={styles.buttonText}> Go to login </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.push(`../screens/camera`)}>
          <Text style={styles.buttonText}> Go to camira</Text>
        </Pressable>
        
        <Pressable style={styles.button} onPress={() => router.push(`../screens/test`)}>
          <Text style={styles.buttonText}> Go to camira</Text>
        </Pressable>
        
        <Pressable style={styles.button} onPress={() => router.push(`../screens/test2`)}>
          <Text style={styles.buttonText}> Go to camira</Text>
        </Pressable>
        
        
        <Pressable style={styles.button} onPress={() => router.push(`../screens/chat`)}>
          <Text style={styles.buttonText}> Go to chat</Text>
        </Pressable>
        
        
        <Pressable style={styles.button} onPress={() => router.push(`../../components/map`)}>
          <Text style={styles.buttonText}> Go to map</Text>
        </Pressable>
        
        <Pressable style={styles.button} onPress={() => router.push(`../../components/map`)}>
          <Text style={styles.buttonText}> Go to map</Text>
        </Pressable>

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
button: {
  backgroundColor: "#007BFF",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  alignItems: "center",
},
buttonText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "bold",
},
map: {
  width: '100%',
  height: '100%',
  marginTop: 20,
},

});