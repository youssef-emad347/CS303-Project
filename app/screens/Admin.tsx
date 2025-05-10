import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { addBook, getBooks, updateBook, deleteBook } from '@/services/bookService'; 
import { Book } from '@/utils/types';
import { RelativePathString, useRouter } from 'expo-router';

export default function AdminPanel() {
  const router = useRouter();
  const [books, setBooks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState([""]);
  const [category, setCategory] = useState([]);
  const [cover, setCover] = useState("");
  
  
  

  const fetchBooks = async () => {
    const fetchedBooks = await getBooks();
    setBooks(fetchedBooks);
  };

  const handleAddBook = async () => {
    const newBook: Book = {
      docID:"",
      isbn13: "",
      title:title,
      authors:author,
      cover:cover,
      price:parseInt(price),
      categories:category,
      description:description,


       
      };
    if (!newBook.title || !author || !newBook.price || !newBook.description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    await addBook(newBook);  
  
    fetchBooks();  
  };

  const handleUpdateBook = async (id: string, updatedData: any) => {
    await updateBook(id, updatedData);  
        fetchBooks(); 
  };

  const handleDeleteBook = async (id: string) => {
    Alert.alert(
      'Delete Book',
      'Are you sure you want to delete this book?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => deleteBook(id).then(fetchBooks) }  
      ]
    );
  };

  useEffect(() => {
    fetchBooks();  
  }, []);
  let id= '';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel - Manage Books</Text>

   
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter book title"
      />
      {/* <Text style={styles.label}>Author</Text> */}
      {/* <TextInput
        style={styles.input}
        value={authors}
        onChangeText={setTitle}
        placeholder="Enter author name"
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price.toString()}
        onChangeText={setPrice}
        placeholder="Enter book price"
        keyboardType="numeric"
      /> */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter book description"
      />
    


      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter book Price"
      />


        <Text style={styles.label}>Cover</Text>
      <TextInput
        style={styles.input}
        value={cover}
        onChangeText={setCover}
        placeholder="Enter book Cover"
      />
       
      
      <TouchableOpacity style={styles.addButton} onPress={handleAddBook}>
        <Text style={styles.buttonText}>Add Book</Text>
      </TouchableOpacity>

   
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>By {item.author}</Text>
            <Text style={styles.bookPrice}>${item.price}</Text>
            <Text style={styles.bookDescription}>{item.description}</Text>

            
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() =>{
                const path = `/update/${item.id}` as RelativePathString ;
                router.push(path)
              }

              }
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteBook(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

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
