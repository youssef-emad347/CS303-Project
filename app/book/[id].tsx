import React, { useEffect, useState } from "react"; 
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";  
import { Text } from "react-native";  
import BookDetails from "@/components/BookDetails";

const BookDetailsPage = () => {
  const { id } = useLocalSearchParams();  
  const [book, setBook] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Book Details", 
    });
    
    const fetchBook = async () => {
      if (id) {
        try {
          const bookRef = doc(db, "books", String(id));  
          const bookSnap = await getDoc(bookRef);
          
          if (bookSnap.exists()) {
            setBook(bookSnap.data());
          
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching book: ", error);
        }
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <Text>Loading...</Text>;  
  }

  return <BookDetails docID={id} {...book} />;
};

export default BookDetailsPage;
