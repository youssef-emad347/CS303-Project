import { View, FlatList, StyleSheet } from "react-native";
import CategoryCard from "./CategoryCard";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

const CategoriesData = [
  { id: "1", name: "Business", icon: "briefcase", color: "#1b5743" },
  { id: "2", name: "Arabic Novels", icon: "book", color: "#1b5743" },
  { id: "3", name: "Comic", icon: "smile-o", color: "#1b5743" },
  { id: "4", name: "Economy", icon: "line-chart", color: "#1b5743" },
  { id: "5", name: "Parenting", icon: "child", color: "#1b5743" },
  { id: "6", name: "Caregivers", icon: "heart", color: "#1b5743" },
  { id: "7", name: "Girl", icon: "female", color: "#1b5743" },
];
export default function CategoryList() {
 return (
    <View style={styles.container}>      
      <FlatList
        data={CategoriesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryCard
                id={item.id}
                name={item.name} 
                iconComponent={
              <Icon name={item.icon} size={30} color={item.color} />
            }          
              
         
         />
          )}
       horizontal={true} 
       showsHorizontalScrollIndicator={false} 
       contentContainerStyle={{ paddingHorizontal: 16 }} 
        />
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    maxHeight: 300
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  }
});