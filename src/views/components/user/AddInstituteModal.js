import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const screenHeight = Dimensions.get('window').height;

// 1. Mock data for the institute list shown in the image
const MOCK_INSTITUTES = [
  {
    id: '1',
    name: 'Harvard University',
    location: 'Cambridge, MA',
    type: 'University',
  },
  {
    id: '2',
    name: 'Stanford University',
    location: 'Stanford, CA',
    type: 'University',
  },
  {id: '3', name: 'MIT', location: 'Cambridge, MA', type: 'University'},
  {
    id: '4',
    name: 'Oxford University',
    location: 'Oxford, UK',
    type: 'University',
  },
  // ... more institutes
];

const AddInstituteModal = ({isVisible, onClose, onSave}) => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for selected institute ID
  const [selectedInstituteId, setSelectedInstituteId] = useState(null);

  // Filter institutes based on search query
  const filteredInstitutes = MOCK_INSTITUTES.filter(
    institute =>
      institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institute.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleContinue = () => {
    const selectedInstitute = MOCK_INSTITUTES.find(
      inst => inst.id === selectedInstituteId,
    );
    if (selectedInstitute) {
      // Pass the selected institute data to the parent component
      onSave(selectedInstitute);
      // Reset state after saving
      setSelectedInstituteId(null);
      setSearchQuery('');
    }
  };

  // Adjust modal height for the selection screen
  const modalHeight = screenHeight * 0.9;

  // Component to render a single institute item
  const InstituteItem = ({institute}) => (
    <TouchableOpacity
      style={modalStyles.instituteItem}
      onPress={() => setSelectedInstituteId(institute.id)}>
      <Icon
        name="office-building" // Icon for institute/university
        size={24}
        color={selectedInstituteId === institute.id ? '#ff8c42' : '#ff8c42'} // Highlight the icon
        style={modalStyles.itemIcon}
      />

      <View style={modalStyles.itemTextContainer}>
        <Text style={modalStyles.itemName}>{institute.name}</Text>
        <Text style={modalStyles.itemDetails}>
          {institute.location} • {institute.type}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      // Note: We've removed the onClose from onRequestClose to force selection/cancel behavior,
      // but you might want to re-add it based on desired UX.
      onRequestClose={() => {}}>
      <View style={modalStyles.modalOverlay}>
        <View style={[modalStyles.modalContainer, {height: modalHeight}]}>
          {/* Header */}
          <View style={modalStyles.header}>
            <Text style={modalStyles.headerTitle}>Add New Institute</Text>
            <Text style={modalStyles.headerSubtitle}>
              Select your school, college, or university from the list below
            </Text>
          </View>

          {/* Search Bar Section */}
          <View style={modalStyles.searchSection}>
            <Text style={modalStyles.label}>Select your institute</Text>
            <View style={modalStyles.searchContainer}>
              <TextInput
                style={modalStyles.searchInput}
                placeholder="Search or scroll to choose"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Icon name="magnify" size={24} color="#aaa" />
            </View>
          </View>

          {/* Institute List */}
          <ScrollView contentContainerStyle={modalStyles.listContainer}>
            {filteredInstitutes.length > 0 ? (
              filteredInstitutes.map(institute => (
                <InstituteItem key={institute.id} institute={institute} />
              ))
            ) : (
              <Text style={modalStyles.noResultsText}>
                No institutes found.
              </Text>
            )}
          </ScrollView>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              modalStyles.saveButton,
              !selectedInstituteId && modalStyles.saveButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!selectedInstituteId}>
            <Text style={modalStyles.saveButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddInstituteModal;

// --- Stylesheet Changes ---

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff', // Changed to white as in the image
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    paddingBottom: 20, // Padding for the button at the bottom
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  // Removed closeButton as it's not in the visible header of the image

  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7', // Light background for search bar
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#eee',
    height: 50,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  instituteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemIcon: {
    marginRight: 15,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemDetails: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  // Renamed saveButton to continueButton for better clarity
  saveButton: {
    backgroundColor: '#ff8c42',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc', // Use a lighter grey for disabled state
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
