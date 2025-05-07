import React, { useEffect, useState } from "react"; 
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";  
import { Text } from "react-native";  
import AuthorDetails from "@/components/AuthorDetails";

const AuthorDetailsPage = () => {
  const { id } = useLocalSearchParams();  
  const [author, setAuthor] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Author Details", 
    });
    
    const fetchAuthor = async () => {
      if (id) {
        try {
          const authorRef = doc(db, "authors", String(id));  
          const authorSnap = await getDoc(authorRef);
          
          if (authorSnap.exists()) {
            setAuthor(authorSnap.data());
          
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching book: ", error);
        }
      }
    };

    fetchAuthor();
  }, [id]);

  if (!author) {
    return <Text>Loading...</Text>;  
  }

  return <AuthorDetails {...author} />;
};

export default AuthorDetailsPage;
