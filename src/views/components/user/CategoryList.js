// CategoryList.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const categories = [
  // Sample data for categories
  { id: '1', name: 'Kids', icon: '👦' },
  { id: '2', name: 'Bags', icon: '🎒' },
  { id: '3', name: 'Art Supplies', icon: '🎨' },
  { id: '4', name: 'Study Material', icon: '📚' },
  { id: '5', name: 'Electronics', icon: '💻' },
];

const CategoryItem = ({ item }) => (
  // Component for a single category item (icon + text)
  <TouchableOpacity style={styles.categoryItem}>
    {/* Placeholder for the category icon/image */}
    <View style={styles.iconCircle}>
      <Text style={styles.iconText}>{item.icon}</Text>
    </View>
    {/* Category name */}
    <Text style={styles.categoryName}>{item.name}</Text>
  </TouchableOpacity>
);

const CategoryList = () => {
  // Horizontal scrollable list of category icons
  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => <CategoryItem item={item} />}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  categoryItem: {
    // Container for icon and text
    alignItems: 'center',
    marginHorizontal: 5,
    width: 70, // Fixed width for consistent spacing
  },
  iconCircle: {
    // The yellow/orange circle around the icon
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFCC66', // Light orange/yellow background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconText: {
    fontSize: 24,
  },
  categoryName: {
    // Category name text style
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
});

export default CategoryList;