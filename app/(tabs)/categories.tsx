import { View, FlatList, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import CategoryCard from "@/components/CategoryCard";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

interface Category {
  id: string;
  name: string;
  icon: string;
  
}

const CategoriesData: Category[] = [
  { id: "1", name: "Business", icon: "briefcase" },
  { id: "2", name: "Arabic Novels", icon: "book" },
  { id: "3", name: "Comic", icon: "smile-o" },
  { id: "4", name: "Economy", icon: "line-chart" },
  { id: "5", name: "ENG", icon: "language" },
  { id: "6", name: "Parenting", icon: "child" },
  { id: "7", name: "Caregivers", icon: "heart" },
  { id: "8", name: "Girl", icon: "female" },
  { id: "9", name: "History", icon: "history" },
  { id: "10", name: "Self Improvement", icon: "lightbulb-o" }
];

export default function CategoriesScreen() {
  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Categories</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={18} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      {/* Categories List */}
      <View style={styles.listContainer}>
        <FlatList
          data={CategoriesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryCard
              name={item.name}
              id={item.id}
              iconComponent={<Icon name={item.icon} size={70} color="#1b5743" />}          
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    margin: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
});