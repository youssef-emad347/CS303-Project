
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { db2 } from '@/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome'; 

type Book = {
  name: string;
  author?: string;
  price?: string;
  description?: string;
  image?: string;
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<Book[]>([]);

  const addToRecentSearches = (book: Book) => {
    setRecentSearches((prev) => {
      const isDuplicate = prev.some((b) => b.name === book.name);
      if (isDuplicate) return prev;
      return [book, ...prev].slice(0, 10);
    });
  };

  const searchForBooks = async () => {
    if (searchQuery.trim().length < 1) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const booksRef = collection(db2, 'books');
      const snapshot = await getDocs(booksRef);

      const books = snapshot.docs
        .map((doc) => doc.data() as Book)
        .filter((book) =>
          book.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      setResults(books);
    } catch (error) {
      console.error('Error searching books:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchForBooks();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {/* <Icon name="search" size={16} color="#275745" style={styles.searchIcon} /> */}
        {searchQuery.trim() === '' && (
  <Icon name="search" size={20} color="#275745" style={styles.searchIcon} />
)}

        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => console.log('Voice search')}>
          <Icon name="microphone" size={20} color="#275745" style={styles.voiceIcon} />
        </TouchableOpacity>
      </View>

      {searchQuery.trim() === '' && recentSearches.length > 0 && (
        <>
          <Text style={styles.recentTitle}>Recent searches</Text>
          <FlatList
            data={recentSearches}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recentItem}
                onPress={() => {
                  setSearchQuery(item.name);
                  addToRecentSearches(item);
                }}
              >
                
                <Image
                  source={{ uri: item.image || 'https://via.placeholder.com/100' }} //لسهه
                  style={styles.recentImage}
                />
                
                <Text style={styles.recentText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : results.length === 0 && searchQuery.trim() !== '' ? (
        <Text style={styles.noResults}>
          Sorry, we couldn't find any books matching your search..
        </Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery(item.name);
                  addToRecentSearches(item);
                }}
              >
                <Text style={styles.bookTitle}>{item.name}</Text>
                {item.author && <Text style={styles.bookAuthor}>by {item.author}</Text>}
                {item.price && <Text>price: {item.price}</Text>}
                {item.description && <Text>description: {item.description}</Text>}
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },

 
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  voiceIcon: {
    marginLeft: 8,
  },

  resultItem: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },



  bookTitle: { fontSize: 18 },
  bookAuthor: { fontSize: 14, color: '#666' },
  noResults: { textAlign: 'center', marginTop: 18, color: '#999' },

  recentTitle: { fontSize: 13, padding: 12, fontWeight: '600', marginTop: 20 , color: '#275745' },
  recentItem: { alignItems: 'center', marginRight: 12, marginTop: 12 },
  recentImage: { width: 80, height: 110, borderRadius: 8 },
  recentText: { fontSize: 13, marginTop: 4, maxWidth: 80, textAlign: 'center' },
});

export default Search;
