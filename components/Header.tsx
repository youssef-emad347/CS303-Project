import {Text , View, Image, StyleSheet, Pressable} from "react-native";
import logo from "@/assets/logo.png";
import {useRouter} from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { backgroundColor, mainColor ,borderWidth} from "@/utils/constants";

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
      <Pressable style={styles.WishlistButton} onPress={() => router.push('/screens/wishlist')}>
        <FontAwesome6 name="heart" size={24} color={mainColor} />
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
    backgroundColor: backgroundColor,
  },
  logo: {
    width: 50,
    height: 50,
  },
  searchButton: {
    // flex : 1,
    width: "75%",
    alignSelf: "center",
    borderWidth: borderWidth,
    borderColor: mainColor,
    backgroundColor: backgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  WishlistButton: {
    backgroundColor: backgroundColor,
    borderRadius: 20,
    padding: 7,
  },
});