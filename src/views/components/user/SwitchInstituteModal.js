import React, {useState, useCallback} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

import InstituteCard from './InstituteCard';

// Dimensions for the screen and sheet height
const {height: screenHeight} = Dimensions.get('window');
const SHEET_HEIGHT = screenHeight * 0.85;

const mockInstitutes = [
  {id: 1, name: 'Lincoln School', status: 'Active', icon: '🏛️'},
  {id: 2, name: 'Bishop cotton', status: 'Active', icon: '🏛️'},
  {id: 3, name: 'Jefferson', status: 'Active', icon: '🏛️'},
  {id: 4, name: 'Add Institute', status: 'Add', icon: '➕'},
];

const SwitchInstituteModal = ({isVisible, onClose}) => {
  const [searchTerm, setSearchTerm] = useState('');
  console.log(isVisible, 'sdfsahkfhskdfjhkshfksh');
  const handleSelectAll = useCallback(() => {
    console.log('Select All pressed!');
  }, []);

  const filteredInstitutes = mockInstitutes.filter(institute =>
    institute.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={modalStyles.modalOverlay}>
        {/* The actual sheet container */}
        <View style={modalStyles.sheetContainer}>
          {/* Header */}
          <View style={modalStyles.header}>
            <Text style={modalStyles.title}>Switch Institute</Text>
            <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
              <Text style={modalStyles.closeIcon}>✕ close</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar and Select All */}
          <View style={modalStyles.controlsContainer}>
            <View style={modalStyles.searchBar}>
              <Image
                source={require('../../../assets/images/ic_search_icon.png')}
                style={{height: 19, width: 19}}></Image>
              <TextInput
                style={modalStyles.searchInput}
                placeholder="Search Institute"
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholderTextColor="#999"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSelectAll}
            style={modalStyles.selectAllButton}>
            <Text style={modalStyles.selectAllText}>Select All</Text>
          </TouchableOpacity>

          {/* Institute Grid */}
          <ScrollView contentContainerStyle={modalStyles.grid}>
            {filteredInstitutes.map(item => (
              <InstituteCard
                key={item.id}
                name={item.name}
                status={item.status}
                icon={item.icon}
                onPress={() => console.log(`${item.name} pressed`)}
              />
            ))}
            {/* Add extra padding for better scroll feel */}
            <View style={{height: 20}} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Push the sheet to the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent backdrop
  },
  sheetContainer: {
    backgroundColor: 'white',
    height: SHEET_HEIGHT,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  closeIcon: {
    fontSize: 16,
    color: '#777',
  },

  // Controls Styles
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 2,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
  },
  searchIcon: {
    fontSize: 18,
    color: '#999',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  selectAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF8C00',
    maxWidth: 120,
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  selectAllText: {
    color: '#FF8C00',
    fontWeight: '600',
    fontSize: 15,
  },

  // Grid Styles
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default SwitchInstituteModal;
