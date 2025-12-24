// FilterChip.js
import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

const FilterChip = ({label, value, selectedValue, onSelect}) => {
  const isSelected = value === selectedValue;

  // Determine styles based on selection state
  const chipStyle = isSelected ? styles.chipSelected : styles.chipUnselected;
  const textStyle = isSelected ? styles.textSelected : styles.textUnselected;

  return (
    <Pressable
      style={[styles.chipBase, chipStyle]}
      onPress={() => onSelect(value)}>
      <Text style={[styles.textBase, textStyle]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chipBase: {
    // Basic styling for all chips
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, // For a pill/oval shape
    marginRight: 10, // Space between chips
    height: 40, // Consistent height
    justifyContent: 'center',
  },
  textBase: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Selected State
  chipSelected: {
    backgroundColor: '#FFA500', // The orange color from your image
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  textSelected: {
    color: '#FFFFFF', // White text on orange background
  },

  // Unselected State
  chipUnselected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC', // Light border for unselected state
  },
  textUnselected: {
    color: '#333333', // Dark text on white background
  },
});

export default FilterChip;
