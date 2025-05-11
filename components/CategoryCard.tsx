import React, { useEffect, useState } from "react";
import { Text, Image, Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface Category{
  id:string;
  name: string;
  iconComponent:React.ReactNode;
}
const [categories, setCategories] = useState<Category[]>([]);

useEffect(() => {
  const categoriesRef = collection(db, "categories");
  const unsubscribe = onSnapshot(
    categoriesRef,
    (snapshot) => {
      const categoriesData: Category[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];

      setCategories(categoriesData);
    },
    (error) => {
      console.error("Error fetching categories from Firestore:", error);
    }
  );

  return () => unsubscribe();
}, []);




const CategoryCard: React.FC<Category> = ({
   id,
  name,
  iconComponent,
}) => {
  console.log(id)
  const router = useRouter();

  return (
    <Pressable style={styles.card}>
    <View style={styles.iconContainer}>
        {iconComponent}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 210,
    height: 210,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 7,
    paddingHorizontal: 16,         
    paddingVertical: 8,  
     alignItems: 'center',
     margin: 10,
     position: 'relative',
    
  },
  iconContainer: {
    position: 'absolute',
    //top: 10,
    //right: 10,
    //left:30,
    backgroundColor: 'transparent',
    borderRadius: 12,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
     //marginTop: 20,
     //marginBottom: 10,
    
  },
  icon: {
    fontSize: 12,
    color: '#555',
    marginTop: 40,
     marginBottom: 40,
     justifyContent: 'center',
    alignItems: 'center',
  },
    name: {
      fontSize: 15,
      color: '#000000',
      textAlign: 'center',
      paddingHorizontal: 8,
      marginTop: 160,
      fontWeight: 'bold',
        
      },
});

export default CategoryCard;