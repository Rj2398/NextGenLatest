// ../../components/CreateDeals/BothButtons.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Colors = {
  primaryOrange: '#FF8719',
  white: '#fff',
  borderColor: '#ddd',
  darkText: '#161B25',
};

const BothButtons = ({ field, onButtonClick }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.buttonBase, styles.primaryButton]}
        onPress={() => onButtonClick(field)}
      >
        <Text style={styles.primaryButtonText}>{field.displayName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
    alignItems: 'flex-start',
  },
  buttonBase: {
    minWidth: 120,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.primaryOrange,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});

export default BothButtons;
