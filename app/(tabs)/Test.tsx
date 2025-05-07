import { Pressable, Text, View ,Image ,StyleSheet } from "react-native";
import { useRouter } from "expo-router";
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

});