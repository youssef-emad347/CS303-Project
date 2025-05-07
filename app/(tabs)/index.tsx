import { Text, View, StyleSheet, ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import BookList from "@/components/BookList";
import About from "../screens/about";
import AuthorList from "@/components/AuthorList";
import AuthorDetails from "@/components/AuthorDetails";


type Author = {
  name: string;
  bio: string;
  nationality: string;
  image: string;
};

type RootStackParamList = {
  HomeScreen: undefined;
  AuthorDetails: { author: Author };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen() {
  return (
    <ScrollView>
      <BookList />
      <AuthorList />  {/* Ensure AuthorList is correctly rendered here */}
      <View>
        <Text style={styles.header}>About project</Text>
        <About />
      </View>
    </ScrollView>
  );
}

export default function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthorDetails"
          component={AuthorDetails}
          options={{ title: 'Author Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
