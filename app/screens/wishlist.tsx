import { FlatList, View } from "react-native";
import React, { useState } from "react";
import RenderWhishList from "../components/renderWhishList";

const WishList: React.FC = () => {
  
  const [wishList, setWishList] = useState<WhishListItem[]>([
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
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={wishList}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item, index }) => (
         
          <RenderWhishList item={item} onRemove={() => handleRemove(index)} />
        )}
      />
    </View>
  );
};

export default WishList;
