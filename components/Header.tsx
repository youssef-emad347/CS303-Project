import {Text , View, Image, StyleSheet, Pressable} from "react-native";
import logo from "@/assets/logo.png";
import {useRouter} from "expo-router";

export default function Header() { 
    const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Pressable style={styles.searchButton} onPress={() => router.push('/screens/search')}>
        <Text>
            Search
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
  },
  logo: {
    width: 50,
    height: 50,
  },
  searchButton: {
    flex : 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});