import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import { Book } from "@/utils/types";
import fallback from "@/assets/FallBack.png";
import { router } from "expo-router";
import { backgroundColor,borderWidth,mainColor } from "@/utils/constants"
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, Pressable, Image } from 'react-native';
import { db } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome'; 

type Book = {
  title: string;
  authors?: string;
  price?: string;
  description?: string;
  cover?: string;
  isbn13?: string;
  categories?: string | string[];
  publishDate?: string;

};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [lastClickedBook, setLastClickedBook] = useState<Book | null>(null);

 
  useEffect(() => {
    const fetchAllBooks = async () => {
      const booksRef = collection(db, 'books');
      const snapshot = await getDocs(booksRef);
      const books = snapshot.docs.map(doc => doc.data() as Book);
      setAllBooks(books);
    };

    fetchAllBooks();
  }, []);

  useEffect(() => {
    if (lastClickedBook) {
      updateSuggestedBooks(lastClickedBook);
    }
  }, [lastClickedBook, allBooks]);

  const updateSuggestedBooks = (book: Book) => {
    if (!book.categories || (Array.isArray(book.categories) && book.categories.length === 0)) {
      setSuggestedBooks([]);
      return;
    }

    const bookCategories = Array.isArray(book.categories) 
      ? book.categories 
      : book.categories.split(',').map(c => c.trim());

    const bySameCategory = allBooks.filter(b => {
      if (!b.categories) return false;
      
      const bCategories = Array.isArray(b.categories)
        ? b.categories
        : b.categories.split(',').map(c => c.trim());
      
      return (
        bCategories.some(category => bookCategories.includes(category)) && 
        b.title !== book.title
      );
    });

    setSuggestedBooks(bySameCategory.slice(0, 5));
  };

  const addToRecentSearches = (book: Book) => {
    setRecentSearches((prev) => {
      const isDuplicate = prev.some((b) => b.title === book.title);
      if (isDuplicate) return prev;
      const newRecent = [book, ...prev].slice(0, 10);
      return newRecent;
    });
    setLastClickedBook(book);
  };

  const searchForBooks = async () => {
    if (searchQuery.trim().length < 1) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const booksRef = collection(db, 'books');

      const snapshot = await getDocs(booksRef);

      const books = snapshot.docs
        .map((doc) => doc.data() as Book)
        .filter((book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

      setResults(books);
    } catch (error) {
      console.error("Error searching books:", error);
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
        {searchQuery.trim() === '' && (
          <Icon name="search" size={20} color="#275745" style={styles.searchIcon} />
        )}

        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable onPress={() => console.log("Voice search")}>
          <Icon
            name="microphone"
            size={20}
            color="#275745"
            style={styles.voiceIcon}
          />
        </Pressable>
      </View>

      {searchQuery.trim() === '' && (
        <>
          {recentSearches.length > 0 && (
            <>
              <Text style={styles.recentTitle}>Recent searches</Text>
              <FlatList
                data={recentSearches}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.recentItem}
                    onPress={() => {
                      setSearchQuery(item.title);
                      addToRecentSearches(item);
                    }}
                  >
                    <Image
                      source={{ uri: item.cover || 'https://via.placeholder.com/100' }}
                      style={styles.recentImage}
                    />
                    <Text style={styles.recentText}>{item.title}</Text>
                  </Pressable>
                )}
              />
            </>
          )}

          {lastClickedBook && recentSearches.length > 0 && suggestedBooks.length > 0 && (
            <>
              <Text style={styles.recentTitle}>Suggested books</Text>
              <FlatList
                data={suggestedBooks}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.recentItem}
                    onPress={() => {
                      setSearchQuery(item.title);
                      addToRecentSearches(item);
                    }}
                  >
                    <Image
                      source={{ uri: item.cover || 'https://via.placeholder.com/100' }}
                      style={styles.recentImage}
                    />
                    <Text style={styles.recentText}>{item.title}</Text>
                  </Pressable>
                )}
              />
            </>
          )}

        </>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : results.length === 0 && searchQuery.trim() !== "" ? (
        <Text style={styles.noResults}>
          Sorry, we couldn't find any books matching your search..
        </Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <SearchItem
                docID={item.docID}
                title={item.title}
                authors={item.authors}
                cover={item.cover}
                onPress={() => {
                  setSearchQuery(item.title);
                  addToRecentSearches(item);
                }}
              >
                <Text style={styles.bookTitle}>{item.title}</Text>
                {item.authors && <Text style={styles.bookAuthor}>by {item.authors}</Text>}
                {item.price && <Text>price: {item.price}</Text>}
                {item.description && <Text>description: {item.description}</Text>}
              </Pressable>

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
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5",
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
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  bookTitle: { fontSize: 18 },
  bookAuthor: { fontSize: 14, color: '#666' },
  noResults: { textAlign: 'center', marginTop: 18, color: '#999' },
  recentTitle: { fontSize: 13, padding: 12, fontWeight: '600', marginTop: 20, color: '#275745' },
  recentItem: { alignItems: 'center', marginRight: 12, marginTop: 12 },
  recentImage: { width: 80, height: 110, borderRadius: 8 },
  recentText: { fontSize: 13, marginTop: 4, maxWidth: 80, textAlign: "center" },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: backgroundColor,
    borderWidth: borderWidth,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
    margin: 10,
    marginRight: 25,
  },
  innerContainer: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: mainColor,
  },
  author: {
    fontSize: 14,
    color: mainColor,
    opacity: 0.7,
    marginBottom: 5,
  },
  description: {
    fontSize: 13,
    color: mainColor,
    opacity: 0.5,
    marginBottom: 5,
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: mainColor,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: 5,
    left: 20,
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColor,
    borderColor: mainColor,
    borderWidth: 1.5,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    color: mainColor,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
    opacity: 0.2,
  },
});

export default Search;
