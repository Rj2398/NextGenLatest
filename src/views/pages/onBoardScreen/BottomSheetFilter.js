

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions, 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

import COLORS from '../../../config/colors';

const { height: screenHeight } = Dimensions.get('window');

// --- CustomSelect Component (Using Colors Object) ---
const CustomSelect = ({ placeholder }) => (
  <View style={styles.selectBox}>
    <Text style={styles.selectText}>{placeholder}</Text>
    <Ionicons name="chevron-down" size={20} color={COLORS.black} /> 
  </View>
);

// --- Bottom Sheet Filter Component ---
const BottomSheetFilter = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null; 
  }

  return (
    // Full-screen overlay to dim the background
    <View style={styles.overlay}>
      
      {/* Backdrop: Touchable area to close the sheet */}
      <TouchableOpacity 
        style={styles.backdrop} 
        onPress={onClose} 
        activeOpacity={1} 
      />

      {/* The Actual Filter Sheet Card */}
      <View style={styles.sheetCard}>
        
        {/* --- Header Section --- */}
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={() => { console.log('Filters reset'); onClose(); }}>
            <Text style={styles.resetText}>Reset all</Text>
          </TouchableOpacity>
        </View>

        {/* --- Filter Inputs Section --- */}
        <Text style={styles.categoryLabel}>Category</Text>

        <CustomSelect placeholder="All Categories" />
        <CustomSelect placeholder="Suppliers" />

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <CustomSelect placeholder="Min. Price" />
          </View>
          <View style={styles.halfWidth}>
            <CustomSelect placeholder="Max. Price" /> 
          </View>
        </View>

        <CustomSelect placeholder="Select Date" />

        {/* --- Apply Filters Button --- */}
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => { console.log('Filters applied'); onClose(); }}
          activeOpacity={0.8}
        >
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Stylesheet for Bottom Sheet (Using Colors Object) ---
const styles = StyleSheet.create({
  // Styles for the full-screen transparent container
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlayDark, // Using color variable
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  // Backdrop 
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: screenHeight * 0.4, 
  },
  // The sheet card styling
  sheetCard: {
    backgroundColor: COLORS.white, // Using color variable
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.darkText, // Using color variable
        shadowOffset: { width: 0, height: -5 }, 
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  
  // --- Inner Component Styles ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily:'Roboto',
    color: COLORS.darkText, // Using color variable
  },
  resetText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily:'Roboto',
    color: COLORS.LIGHT_GRAY_BG, // Using color variable
  },
  categoryLabel: {
    fontSize: 14,
    color: COLORS.mediumText, // Using color variable
    marginBottom: 8,
    marginTop: 5,
    fontWeight: '500',
    fontFamily:'Roboto'
  },
  // Custom Select Box Styles
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR, // Using color variable
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    backgroundColor: COLORS.white, // Using color variable
  },
  selectText: {
    fontSize: 12,
    color: COLORS.darkGray, // Using color variable
  },
  // Styles for the two-column layout
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%', 
    marginBottom: 15, 
  },
  // Apply Button Styles
  applyButton: {
    backgroundColor: COLORS.PRIMARY_COLOR, // Using color variable
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: COLORS.white, // Using color variable
    fontSize: 18,
    fontWeight: '700',
    fontFamily:'Roboto'
  },
});

export default BottomSheetFilter;