import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
// --- IMPORTANT CHANGE: Use specific icon imports from react-native-vector-icons ---
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- Component Start ---
const RemoveModal = ({
  isVisible,
  onClose,
  onConfirm,
  instituteName,
  instituteLocation,
  instituteType,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Header and Title */}
          <Text style={styles.modalTitle}>Remove Institute?</Text>

          {/* Alert Icon - Using FontAwesome5 (Icon) */}
          <View style={styles.alertIconContainer}>
            <Icon name="exclamation-triangle" size={32} color="#f44336" solid />
            {/* Note: 'solid' prop is often needed for FontAwesome5 filled icons */}
          </View>

          {/* Institute Details Card */}
          <View style={styles.instituteCard}>
            <View style={styles.iconBackground}>
              {/* Education Icon - Using MaterialCommunityIcons (MaterialCommunityIcon) */}
              <MaterialCommunityIcon name="school" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.instituteTextContainer}>
              <Text style={styles.instituteName}>
                {instituteName || 'Harvard University'}
              </Text>
              <Text style={styles.instituteDetails}>
                {instituteLocation || 'Cambridge, MA'} •{' '}
                {instituteType || 'University'}
              </Text>
            </View>
          </View>

          {/* Description Text */}
          <Text style={styles.descriptionText}>
            This will remove your association with this institute. You can
            re-add it anytime.
          </Text>

          {/* Buttons Container */}
          <View style={styles.buttonContainer}>
            {/* Cancel Button */}
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* Delete Button */}
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={onConfirm}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

// --- Stylesheet (Same as before) ---
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
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  alertIconContainer: {
    backgroundColor: '#ffebee',
    borderRadius: 50,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instituteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 25,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6F30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  instituteTextContainer: {
    flex: 1,
  },
  instituteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  instituteDetails: {
    fontSize: 14,
    color: '#666',
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#EBEBEB',
  },
  deleteButton: {
    backgroundColor: '#FF6F30',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RemoveModal;
