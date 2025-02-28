import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Welcome to the Online BooXtore
      </Text>

      <Link href="/about" asChild>
        <Pressable
          style={{
            backgroundColor: "blue",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Go to About Us
          </Text>
        </Pressable>
      </Link>

      <Link href="/list" asChild>
        <Pressable
          style={{
            backgroundColor: "blue",
            padding: 12,
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>📖 View Products</Text>
        </Pressable>
      </Link>
    </View>
  );
}
