import {
  FontAwesome,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { backgroundColor, disableColor, mainColor } from "@/utils/constants";
import Header from "@/components/Header";

import Home from "@/app/(tabs)/index";
import Categories from "@/app/(tabs)/categories";
import Cart from "@/app/(tabs)/cart";
import Profile from "@/app/(tabs)/profile";
import WishList from "@/app/screens/wishlist";
import Test from "@/app/(tabs)/Test";

const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      
      screenOptions={{
        tabBarStyle: {
          backgroundColor: backgroundColor ,
          height :60, },
        headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarInactiveTintColor: disableColor,
          tabBarActiveTintColor: mainColor,
          tabBarIcon: ({ focused }) => (
            <Entypo
              color={focused ? mainColor : disableColor}
              name="home"
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarInactiveTintColor: disableColor,
          tabBarActiveTintColor: mainColor,
          tabBarIcon: ({ focused }) => (
            <Entypo
              color={focused ? mainColor : disableColor}
              name="grid"
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarInactiveTintColor: disableColor,
          tabBarActiveTintColor: mainColor,
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              color={focused ? mainColor : disableColor}
              name="cart-shopping"
              size={20}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Wishlist"
        component={WishList}
        options={{
          tabBarInactiveTintColor: disableColor,
          tabBarActiveTintColor: mainColor,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={focused ? mainColor : disableColor}
              name="heart"
              size={20}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarInactiveTintColor: disableColor,
          tabBarActiveTintColor: mainColor,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              color={focused ? mainColor : disableColor}
              name="user"
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Test"
        component={Test}
        options={{
          tabBarInactiveTintColor: disableColor,
          tabBarActiveTintColor: mainColor,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              color={focused ? mainColor : disableColor}
              name="user"
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigator;
