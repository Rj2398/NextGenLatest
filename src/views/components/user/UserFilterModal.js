// FilterModal.js
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import UserFilterOption from './UserFilterOption';

const ALL_FILTERS = [
  {
    value: 'contacts',
    label: 'Contacts',
    icon: require('../../../assets/images/ic_contact_user.png'),
  },
  {
    value: 'events',
    label: 'Events',
    icon: require('../../../assets/images/ic_calendar_user.png'),
  },
  {
    value: 'files',
    label: 'Files',
    icon: require('../../../assets/images/ic_file_user.png'),
  },
  {
    value: 'images',
    label: 'Images',
    icon: require('../../../assets/images/ic_image_user.png'),
  },
  {
    value: 'links',
    label: 'Links',
    icon: require('../../../assets/images/ic_link_user.png'),
  },
  {
    value: 'locations',
    label: 'Locations',
    icon: require('../../../assets/images/ic_location_user.png'),
  },
];

const UserFilterModal = ({
  isVisible,
  onClose,
  showImagesFilter = false,
  onApply,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('contacts');

  const handleApply = () => {
    onApply(selectedFilter);
    onClose();
  };

  const visibleFilters = ALL_FILTERS.filter(
    filter => showImagesFilter || filter.value !== 'images',
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Include Only</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <Image
                source={require('../../../assets/images/ic_cross_icon.png')}></Image>
            </Pressable>
          </View>

          <ScrollView style={styles.optionsList}>
            {visibleFilters.map(filter => (
              <UserFilterOption
                key={filter.value}
                label={filter.label}
                icon={filter.icon}
                value={filter.value}
                selectedValue={selectedFilter}
                onSelect={setSelectedFilter}
              />
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <Pressable
              onPress={onClose}
              style={[styles.button, styles.cancelButton]}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleApply}
              style={[styles.button, styles.applyButton]}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#aaa',
  },
  optionsList: {
    maxHeight: 300,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#FFA500',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserFilterModal;
