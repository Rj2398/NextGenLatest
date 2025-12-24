import React from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';

const UserFilterOption = ({label, icon, value, selectedValue, onSelect}) => {
  const isSelected = value === selectedValue;

  return (
    <Pressable
      // The entire row acts as the selector
      style={[styles.optionContainer, isSelected && styles.selectedOption]}
      onPress={() => onSelect(value)}>
      {/* Local Image Icon */}

      {icon && <Image source={icon} style={styles.icon} resizeMode="center" />}
      <Text style={styles.optionLabel}>{label}</Text>

      {/* --- Radio Button Implementation --- */}
      <View style={styles.radioContainer}>
        {/* Outer Circle (Unchecked state visual) */}
        <View style={styles.radioOuterCircle}>
          {/* Inner Circle (Checked state visual - only shows when isSelected is true) */}
          {isSelected && <View style={styles.radioInnerCircle} />}
        </View>
      </View>
      {/* ----------------------------------- */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15, // Adjusted to match the design's spacing
    paddingHorizontal: 20, // Increased padding for better spacing
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  selectedOption: {
    // You can keep or remove this background if the focus is only on the radio button
    // backgroundColor: '#FFF6E5',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 15,
    resizeMode: 'contain',
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  radioContainer: {
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#FFA500',
  },
});

export default UserFilterOption;
