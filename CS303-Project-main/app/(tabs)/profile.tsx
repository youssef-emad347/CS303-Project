import { Pressable, Text, View ,Image ,StyleSheet } from "react-native";



export default function Profile() {
  return (
    <View>
        <Text style={styles.header}>Profile</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  contianer:{
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
});