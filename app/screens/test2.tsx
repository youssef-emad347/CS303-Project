import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; // تأكد من المسار الصحيح

interface Book {
  id: string;
  title: string;
  image: string;
}

const ImageList = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'books'));
        const bookList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Book[];

        setBooks(bookList);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const renderItem = ({ item }: { item: Book }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />
    </View>
  );

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ImageList;
