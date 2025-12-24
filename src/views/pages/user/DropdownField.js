import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

// --- Sample Data ---
const bankData = [
  { id: '1', name: 'State Bank of India' },
  { id: '2', name: 'HDFC Bank' },
  { id: '3', name: 'ICICI Bank' },
  { id: '4', name: 'Axis Bank' },
  { id: '5', name: 'Punjab National Bank' },
  { id: '6', name: 'Bank of Baroda' },
  { id: '7', name: 'Kotak Mahindra Bank' },
];

// 1. Dropdown Component Definition
const DropdownField = ({ data, placeholder, label }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle selection
  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsVisible(false);
  };

  // Render function for each item in the list
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleSelect(item)}>
      <Text style={styles.modalItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsVisible(true)}>
        <Text style={styles.dropdownText}>
          {selectedItem ? selectedItem.name : placeholder}
        </Text>
        {/* Dropdown Arrow Icon */}
        <Icon name="keyboard-arrow-down" size={24} color="#000" />
      </TouchableOpacity>

      {/* 3. Modal for the options list */}
      <Modal
        transparent={true}
        visible={isVisible}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setIsVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              // Optional: Add a title/close button inside the modal content for better UX
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};



// 3. Styles
const styles = StyleSheet.create({
  // --- Outer Container Styles ---
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    marginBottom: 20,
  },


  label: {
    fontSize: 16,
    color: '#888', // Light gray color
    marginBottom: 5,
  },

  // --- Dropdown Button Style (Mimics the "Select Bank" box) ---
  dropdownButton: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 5, // Slight rounding
    borderWidth: 1,
    borderColor: '#ddd', // Light border
    // Optional: Add shadow for a slight lift effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 2,
  },

  // --- Text Style (Mimics "Select Bank" bold text in image) ---
  dropdownText: {
    fontSize: 18,
    fontWeight: 'bold', // Key to matching the image
    color: '#000',
  },

  // --- Modal Styles (List of options) ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background
    justifyContent: 'flex-end', // Make the list appear from the bottom (common pattern)
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%', // Limit the height of the list
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DropdownField;