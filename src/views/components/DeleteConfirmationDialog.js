import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');


const DeleteConfirmationDialog = ({ isVisible, onCancel, onDelete }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel} 
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          
     
          <Text style={styles.modalTitle}>Delete this Item</Text>
          
        
          <Text style={styles.modalBodyText}>
            Are you sure you want to delete this item ?
          </Text>
      
          <Text style={styles.modalBodyText}>
            This action cannot be undone
          </Text>

        
          <View style={styles.buttonContainer}>
           
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

         
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={onDelete}
            >
        
              <Image source={require('../../assets/images/ic_delete_icon.png')}
              style={{ tintColor: '#fff'}}
              ></Image>
              <Text style={styles.deleteButtonText}>Delete Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  modalView: {
    width: width * 0.85,
    maxWidth: 350,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalBodyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 5,
  },
  // Cancel Button Style
  cancelButton: {
    backgroundColor: '#f5f5f5', 
    marginRight: 5,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  
  deleteButton: {
    backgroundColor: '#f97316', 
    marginLeft: 5,
    flexDirection: 'row',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  deleteIcon: {
    fontSize: 18,
    color: 'white',
    marginRight: 5,
  },
});

export default DeleteConfirmationDialog;