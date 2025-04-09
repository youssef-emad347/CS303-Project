import {
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { disableColor, mainColor } from "@/utils/constants";
import Header from "@/components/Header";

import Home from "@/app/(tabs)/index";
import Categories from "@/app/(tabs)/categories";
import Cart from "@/app/(tabs)/cart";
import Profile from "@/app/(tabs)/profile";
import WishList from "@/app/screens/wishlist";


const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: true , headerTitle: Header }} >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarInactiveTintColor: disableColor,
          tabBarActiveTintColor: mainColor,
          tabBarIcon: ({ focused }) => (
            <Fontisto
              color={focused ? mainColor : disableColor}
              name="home"
              size={20}
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
            <MaterialIcons
              color={focused ? mainColor : disableColor}
              name="category"
              size={20}
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
            <FontAwesome
              color={focused ? mainColor : disableColor}
              name="shopping-cart"
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
            <Ionicons
              color={focused ? mainColor : disableColor}
              name="person"
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigator;
