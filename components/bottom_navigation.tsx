import {
  FontAwesome,
  FontAwesome6,
  Entypo,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { backgroundColor, disableColor, mainColor } from "@/utils/constants";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import Home from "@/app/(tabs)/home";
import Categories from "@/app/(tabs)/categories";
import Cart from "@/app/(tabs)/cart";
import Profile from "@/app/(tabs)/profile";
import Admin from "@/app/screens/Admin"; // Make sure this import is correct

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if user is admin
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setIsAdmin(userDoc.exists() && userDoc.data()?.role === "admin");
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null; // Or return a loading spinner
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: backgroundColor,
          height: 60,
        },
        headerShown: false
      }}
    >
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
      {isAdmin && (
        <Tab.Screen
          name="Admin"
          component={Admin}
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
      )}
    </Tab.Navigator>
  );
};

export default BottomNavigator;