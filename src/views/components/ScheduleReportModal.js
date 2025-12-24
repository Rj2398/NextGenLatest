import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ScheduleReportModal = ({ isVisible, onClose }) => {
  const [deliveryTime, setDeliveryTime] = useState('09:00');
  const [timeZone, setTimeZone] = useState('UTC (Coordinated Universal Time)');
  const [recipients, setRecipients] = useState([
    { id: '1', email: 'admin@school.edu' },
  ]);
  const [newRecipient, setNewRecipient] = useState('');
  const [emailSubject, setEmailSubject] = useState('Daily Sales Report');
  const [reportType, setReportType] = useState('Sales Summary');
  const [frequency, setFrequency] = useState('Daily');

  const handleAddRecipient = () => {
    if (newRecipient.trim() !== '') {
      setRecipients([
        ...recipients,
        { id: Math.random().toString(), email: newRecipient.trim() },
      ]);
      setNewRecipient('');
    }
  };

  const handleRemoveRecipient = (id) => {
    setRecipients(recipients.filter((r) => r.id !== id));
  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Bottom sheet container */}
        <View style={styles.modalContainer}>
          <SafeAreaView>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Schedule New Report</Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.frequencyTabs}>
              {['Daily', 'Weekly', 'Monthly'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.frequencyTab,
                    frequency === item && styles.activeTab,
                  ]}
                  onPress={() => setFrequency(item)}
                >
                  <Text
                    style={[
                      styles.frequencyTabText,
                      frequency === item && styles.activeTabText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Scrollable content */}
            <ScrollView style={styles.formContainer}>
              <Text style={styles.label}>Delivery Time</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={deliveryTime}
                  editable={false}
                />
                <Icon name="access-time" size={24} color="#888" />
              </View>

              <Text style={styles.label}>Time Zone</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={timeZone}
                  editable={false}
                />
                <Icon name="keyboard-arrow-down" size={24} color="#888" />
              </View>

              <Text style={styles.label}>Recipients</Text>
              <View style={styles.recipientsContainer}>
                {recipients.map((recipient) => (
                  <View key={recipient.id} style={styles.recipientTag}>
                    <Text style={styles.recipientText}>{recipient.email}</Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveRecipient(recipient.id)}
                    >
                      <Icon name="close" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
                <TextInput
                  style={styles.recipientInput}
                  placeholder="Add email..."
                  value={newRecipient}
                  onChangeText={setNewRecipient}
                  onSubmitEditing={handleAddRecipient}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <Text style={styles.label}>Email Subject</Text>
            
                   <View style={styles.inputContainer}>              <TextInput
                style={styles.textInput}
                value={emailSubject}
                onChangeText={setEmailSubject}
                placeholder="Enter email subject"
              />
              </View>

              <Text style={styles.label}>Report Type</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={reportType}
                  editable={false}
                />
                <Icon name="keyboard-arrow-down" size={24} color="#888" />
              </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.scheduleButton}
                onPress={() => alert('Report Scheduled!')}
              >
                <Text style={styles.scheduleButtonText}>Schedule Report</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

export default ScheduleReportModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end', // push modal to bottom
    backgroundColor: 'rgba(0,0,0,0.5)', // dimmed background
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  frequencyTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  frequencyTab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  activeTab: { backgroundColor: '#FFF',elevation: 4, // lighter on Android
  shadowColor: '#D3D3D3',
  shadowOffset: { width: 0, height: -1 },
  shadowOpacity: 0.12,
  shadowRadius: 6, },
  frequencyTabText: { fontSize: 14, color: '#666', fontWeight: '500' },
  activeTabText: { color: '#FF7A00' },
  formContainer: { padding: 15 },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 50,
  },
  textInput: { flex: 1, fontSize: 16, color: '#333' },
  recipientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 5,
    minHeight: 50,
    alignItems: 'center',
  },
  recipientTag: {
    flexDirection: 'row',
    backgroundColor: '#FF6600',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 4,
    alignItems: 'center',
  },
  recipientText: { color: '#fff', fontSize: 13, marginRight: 5 },
  recipientInput: {
    flex: 1,
    minWidth: 100,
    fontSize: 16,
    color: '#333',
    padding: 5,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: { fontSize: 16, color: '#555', fontWeight: '600' },
  scheduleButton: {
    flex: 1,
    backgroundColor: '#FF6600',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 10,
  },
  scheduleButtonText: { fontSize: 16, color: '#fff', fontWeight: '600' },
});