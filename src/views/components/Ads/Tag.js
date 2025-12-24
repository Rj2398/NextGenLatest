import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

// --- Custom Components ---

// Simple Tag Component
const Tag = ({ text }) => (
  <View style={styles.tagPill}>
    <Text style={styles.tagText}>{text}</Text>
    {/* Black close icon */}
    <Ionicons name="close-outline" size={16} color={color.black} style={{ marginLeft: 5 }} />
  </View>
);

// Estilos específicos para el componente Tag
const styles = StyleSheet.create({
  tagPill: {
    flexDirection: 'row',
    backgroundColor: color.white, // Now white
    borderRadius: 5, // Slightly less rounded corners
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginVertical: 4, // Ensures spacing
    alignItems: 'center',
    borderWidth: 1, // Added border
    borderColor: color.borderLight, // Added border color
  },
  tagText: {
    fontSize: 14,
    color: color.textDark,
  },
});

export default Tag;