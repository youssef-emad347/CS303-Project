import { FlatList, View } from "react-native";
import React, { useState ,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WishlistItem from "@/components/WishlistItem";
import { WishItem } from "@/components/WishlistItem";
import { backgroundColor } from "@/utils/constants";

const WishList: React.FC = () => {
  
  const [wishList, setWishList] = useState<WishItem[]>([
    {
      title: "دليل النجاه الفردية",
      name: "دو احمد ابوالوفاه",
      details: "خريطة لحياتك النفسية",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9YYh5Fk1u9VsWWr1MhkyQeOzeNbtnnMO96g&s",
    },
    {
      title: "دليل النجاه الفردية",
      name: "دو احمد ابوالوفاه",
      details: "خريطة لحياتك النفسية",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxo2NFiYcR35GzCk5T3nxA7rGlSsXvIfJwg&s",
    },
    {
      title: "دليل النجاه الفردية",
      name: "دو احمد ابوالوفاه",
      details: "خريطة لحياتك النفسية",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxo2NFiYcR35GzCk5T3nxA7rGlSsXvIfJwg&s",
    },{
      title: "Atomic Habbits",
      name: "دو احمد ابوالوفاه",
      details: "خريطة لحياتك النفسية",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxo2NFiYcR35GzCk5T3nxA7rGlSsXvIfJwg&s",
    },{
      title: "دليل النجاه الفردية",
      name: "دو احمد ابوالوفاه",
      details: "خريطة لحياتك النفسية",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxo2NFiYcR35GzCk5T3nxA7rGlSsXvIfJwg&s",
    },
    {
      title: "دليل النجاه الفردية",
      name: "دو احمد ابوالوفاه",
      details: "خريطة لحياتك النفسية",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxo2NFiYcR35GzCk5T3nxA7rGlSsXvIfJwg&s",
    },
  ]);

 
  const handleRemove = (index: number) => {
    setWishList((prevList) => prevList.filter((_, i) => i !== index));
  }

  const [cart, setCart] = useState<WishItem[]>([]); 

  useEffect(() => {
    loadCart(); 
  }, []);

  const saveCart = async (cartItems: WishItem[]) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart", error);
    }
  };

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart)); 
      }
    } catch (error) {
      console.error("Error loading cart", error);
    }
  };

  const handleAddToCart = (item: WishItem) => {

    const itemExists = cart.some(cartItem => cartItem.title === item.title);
    if (!itemExists) { 
      const updatedCart = [...cart, item]; 
      setCart(updatedCart);
      saveCart(updatedCart);
    }
  };

  return (
    <View style={{ flex: 1 ,backgroundColor: backgroundColor}}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={wishList}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item, index }) => (
         
          <WishlistItem item={item} onRemove={() => setWishList((prev) => prev.filter((_, i) => i !== index))}
          onAddToCart={() => handleAddToCart(item)}/>
        )}
      />
    </View>
  );
};

export default WishList;
