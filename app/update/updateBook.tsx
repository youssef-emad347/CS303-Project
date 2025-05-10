import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { addBook, getBooks, updateBook, deleteBook } from '@/firebase/bookService'; 
import { Book } from '@/utils/types';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const UpdateBook: React.FC<Book> = () => {
  const { id } = useLocalSearchParams();
  
  const [docID, setDocID] = useState('');
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState<string>('');  
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState('');
  const [categories, setCategories] = useState<string>('');  
  const [isbn13, setIsbn13] = useState('');
  
  

   const fetchBook = async () => {
    if (id) {
      try {
        const bookRef = doc(db, 'books', String(id));
        const bookSnap = await getDoc(bookRef);
        if (bookSnap.exists()) {
          const data = bookSnap.data();
         setDocID(bookSnap.id);
          setTitle(data.title ?? '');
          setAuthors(data.authors ?? ''); 
          setPrice((data.price ?? '').toString());
          setDescription(data.description ?? '');
          setCover(data.cover ?? '');
          setCategories(data.categories ?? ''); 
          setIsbn13(data.isbn13 ?? '');
        } else {
          Alert.alert('Error', 'Book not found');
        }
      } catch (err) {
        console.error('Failed to fetch book:', err);
        Alert.alert('Error', 'Could not load book details');
      }
    }
  };

const handleUpdateBook = async () => {
  if (!title  || !price || !description) {
    Alert.alert('Error', 'Please fill all required fields');
    return;
  }

 const updatedData: Partial<Book> = {
      title,
      price: parseFloat(price),
      description,
      cover,
      isbn13,
      
    };



    
  try {
    await updateBook(docID, updatedData);
    Alert.alert('Success', 'Book updated successfully');
  } catch (error) {
    console.error("Error updating book: ", error);
    Alert.alert("Error", "Something went wrong");
  }
};


  // if (authors) {
  //     updatedData.authors = authors;
  //   }

  //   if (categories) {
  //     updatedData.categories = categories; 
  //   }


  useEffect(() => {
    fetchBook();  
  }, [id]);




const fields = [
    { label: 'Title', value: title, onChange: setTitle, placeholder: 'Enter book title' },
    { label: 'Authors (Optional)', value: authors, onChange: setAuthors, placeholder: 'Enter authors (comma separated)' },
    { label: 'Price', value: price, onChange: setPrice, placeholder: 'Enter book price', keyboardType: 'numeric' },
    { label: 'Description', value: description, onChange: setDescription, placeholder: 'Enter book description' },
    { label: 'Cover', value: cover, onChange: setCover, placeholder: 'Enter book cover URL' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fresh Updates</Text>

      <FlatList
        data={fields}
        renderItem={({ item }) => (
          <View key={item.label}>
            <Text style={styles.label}>{item.label}</Text>
            <TextInput
              style={styles.input}
              value={item.value}
              onChangeText={item.onChange}
              placeholder={item.placeholder}
              
            />
          </View>
        )}
        keyExtractor={(item) => item.label}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleUpdateBook}>
        <Text style={styles.buttonText}>Save Updates</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bookContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  bookPrice: {
    fontSize: 16,
    color: '#28a745',
  },
  bookDescription: {
    fontSize: 14,
    color: '#555',
  },
  updateButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
  },
});
export default UpdateBook;