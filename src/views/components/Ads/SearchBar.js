import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { color } from '../constants/colors'; // Import removido

// --- Definición de colores movida dentro del archivo ---
const color = {
  white: '#FFFFFF',
  black: '#000000',
  greyBackground: '#F5F5F5',
  orangePrimary: '#FF8719',
  textDark: '#1E1E1E',
  textGrey: '#757575',
  textLightGrey: '#A0A0A0',
  borderLight: '#E0E0E0',
  orangeLight: '#FFF6EE',
  filterButtonBg: '#F0F0F0',
};

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search...", // Placeholder por defecto
  onFilterPress,
  showFilterButton = true, // Mostrar el botón por defecto
}) => {
  return (
    <View style={styles.searchFilterRow}>
      <View style={[styles.searchBox, showFilterButton && { marginRight: 10 }]}>
        <Ionicons name="search" size={20} color={color.textGrey} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={color.textLightGrey}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {showFilterButton && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Ionicons name="funnel-outline" size={20} color={color.textDark} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.borderLight,
    paddingHorizontal: 15,
    height: 50,
    flex: 1,
    // marginRight: 10, // Se aplica condicionalmente arriba
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: color.textDark,
    paddingVertical: 10,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: color.filterButtonBg,
    borderWidth: 1,
    borderColor: color.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;