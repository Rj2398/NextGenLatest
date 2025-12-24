// components/DropdownSelect.js
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

const DropdownSelect = ({ label, placeholder, data, onSelect, selectedValue }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (item) => {
    onSelect(item.value);
    setIsVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleSelect(item)}>
      <Text style={styles.modalItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const displayValue = selectedValue ? data.find(item => item.value === selectedValue)?.label : placeholder;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsVisible(true)}>
        <Text style={[styles.dropdownText, !selectedValue && styles.placeholderText]}>
          {displayValue}
        </Text>
        <Icon name="keyboard-arrow-down" size={24} color="#000" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isVisible}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setIsVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={renderItem}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  dropdownButton: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '80%',
    maxHeight: '40%',
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

export default DropdownSelect;