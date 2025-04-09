import { View, Text, ScrollView } from "react-native";

export default function About() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Why BooXtore ?</Text>
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          BooXtore is designed to streamline the process of purchasing books by
          providing an easy-to-use digital platform. This system aims to offer a
          wide range of books across different genres while ensuring a seamless
          user experience for both customers and administrators. The platform
          allows users to browse books, view detailed information, and make
          purchases online. Additionally, the system enables bookstore
          administrators to manage book inventories, track orders, and maintain
          customer records efficiently.
        </Text>
      </View>

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Problem Statement</Text>
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          Traditional bookstores often face challenges such as limited shelf
          space, difficulty in managing large inventories, and limited reach to
          potential customers. Furthermore, customers may find it inconvenient to
          visit physical stores, especially when specific books are unavailable.
          This project addresses these issues by developing an online bookstore
          that provides a convenient platform for customers to explore and
          purchase books anytime, from anywhere. The system also helps store
          owners efficiently manage their book collections, track sales, and
          provide better customer service.
        </Text>
      </View>

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Who are we ?</Text>
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          We are a dedicated team passionate about improving the accessibility and
          convenience of book shopping. Our mission is to bridge the gap between
          readers and their favorite books by creating a platform that is both
          user-friendly and efficient. By leveraging modern technology, we aim to
          enhance the reading experience, support book enthusiasts, and help
          bookstores thrive in the digital age.{"\n\n"}
          <Text style={{ fontWeight: "bold" }}>Team Members:</Text>{"\n"}
          - Youssef Emad (Team Leader) {"\n"}
          - Menna Ayman{"\n"}
          - Fady monier{"\n"}
          - Sara Sobhy{"\n"}
          - Eman Osama{"\n"}
          - Roaa Ahmed{"\n"}
          - Noura Mostafa{"\n"}
          - Mohrail Milad
        </Text>
      </View>
    </ScrollView>
  );
}
