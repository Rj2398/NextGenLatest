// SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet ,Text,Image} from 'react-native';

// --- Color Palette defined together as requested ---
const Colors = {
    // Standard colors used in this component
    LightGrey: '#f5f5f5',
    PlaceholderGrey: '#888',
    Black: '#000',
};
// ---------------------------------------------------

const SearchBar = () => {
  // Component for the search input field
  return (
    <View style={styles.searchContainer}>
      {/* Search Icon Placeholder */}
      <Image
          source={require('../../../assets/search_icon.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      {/* Text input for search query */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search order ID, email, SKU..."
        placeholderTextColor={Colors.PlaceholderGrey} // Using defined color constant
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    // Rounded container for the search bar
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.LightGrey, // Using defined color constant
    borderRadius: 10,
  },
  searchIcon: {
    // Styling for the search icon
    fontSize: 16,
    marginRight: 8,
    color: Colors.PlaceholderGrey, // Using defined color constant
  },
  searchInput: {
    // Styling for the actual text input area
    flex: 1,
    fontSize: 14,
    color: Colors.Black, // Using defined color constant
    padding: 0, // Reset default padding
    marginStart:10,
  },
  logoImage: {
    width: 16,
    height: 16,
  }
});

export default SearchBar;