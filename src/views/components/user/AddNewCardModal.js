import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  SafeAreaView,
} from 'react-native';
// Assuming you have 'react-native-vector-icons/Feather' for the help icon
import Icon from 'react-native-vector-icons/Feather';
// Assuming you have 'react-native-vector-icons/MaterialCommunityIcons' for the card icon
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- Color Palette (Re-using from your existing code) ---
const colors = {
  white: "#FFFFFF",
  black: "#222222",
  primaryBrand: "#FF7A00",
  textBody: "#222222",
  textLight: "#9B9B9B",
  backgroundGray: "#F5F5F5",
  cardBlack: "#1A1A1A",
  help:'#DADADA',
};

// --- Add New Card Screen (As a Modal) ---
const AddNewCardModal = ({ isVisible, onClose }) => {
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('5546 8285 3693 3947');
  const [expiryDate, setExpiryDate] = useState('05/23');
  const [cvv, setCvv] = useState('567');
  const [setDefault, setSetDefault] = useState(true);

  // Helper to format card number (for display only)
  const formatCardNumber = (text) => {
    // Basic grouping of 4 digits
    return text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };
  
  // Custom header to mimic the top bar and title
  const ModalHeader = () => (
    <View style={modalStyles.header}>
      {/* Invisible element for spacing/alignment if needed, or a close icon */}
      <TouchableOpacity onPress={onClose} style={{ padding: 10 }}>
       
      </TouchableOpacity>
      <Text style={modalStyles.headerTitle}>Add new card</Text>
      <View style={{ width: 44 }} /> {/* Spacer */}
    </View>
  );

  return (
    // Use Modal to make the component appear over the current view
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {/* Modal View that mimics a bottom sheet by appearing from the bottom */}
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <SafeAreaView style={{ flex: 1 }}>
            
            {/* The Close button and Title are usually in a header */}
            <ModalHeader />

            {/* Input Fields */}
            <View style={modalStyles.inputContainer}>
              {/* Name on card */}
              <TextInput
                style={modalStyles.input}
                placeholder="Name on card"
                placeholderTextColor={colors.textLight}
                value={nameOnCard}
                onChangeText={setNameOnCard}
              />

              {/* Card number + Icon */}
              <View style={modalStyles.inputFieldRow}>
                <TextInput
                  style={modalStyles.inputRow}
                  placeholder="Card number"
                  placeholderTextColor={colors.textLight}
                  keyboardType="numeric"
                  value={formatCardNumber(cardNumber)}
                  onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                />
                {/* MasterCard Logo Placeholder */}
                {/* <MCIcon name="credit-card-chip-outline" size={24} color="#FF7F00" /> */}
                <Image
        source={require('../../../assets/user/mastercard.png')}
        style={{ width: 40, height: 40 }}
        resizeMode="contain"
        />
              </View>

              {/* Expire Date */}
              <TextInput
                style={modalStyles.input}
                placeholder="Expire Date"
                placeholderTextColor={colors.textLight}
                keyboardType="numeric"
                value={expiryDate}
                onChangeText={setExpiryDate}
              />

              {/* CVV + Help Icon */}
              <View style={modalStyles.inputFieldRow}>
                <TextInput
                  style={modalStyles.inputRow}
                  placeholder="CVV"
                  placeholderTextColor={colors.textLight}
                  keyboardType="numeric"
                  secureTextEntry={true}
                  value={cvv}
                  onChangeText={setCvv}
                />
                {/* CVV Help Icon */}
                <TouchableOpacity style={modalStyles.helpIcon}>
                  <Text style={modalStyles.helpIconText}>?</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Checkbox */}
            <TouchableOpacity
              style={modalStyles.checkboxRow}
              onPress={() => setSetDefault(!setDefault)}
            >
              <View
                style={[
                  modalStyles.checkbox,
                  setDefault ? modalStyles.checkboxChecked : modalStyles.checkboxUnchecked,
                ]}
              >
                {setDefault && <Icon name="check" size={14} color={colors.white} />}
              </View>
              <Text style={modalStyles.checkboxLabel}>
                Set as default payment method
              </Text>
            </TouchableOpacity>

            {/* Add Card Button (Fixed to bottom, similar to your image) */}
            <TouchableOpacity style={modalStyles.addButton} onPress={() => { console.log('Card Added'); onClose(); }}>
              <Text style={modalStyles.addButtonText}>ADD CARD</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

// --- Styles for the Modal/Bottom Sheet ---
const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns modal to the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay background
  },
  modalView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%', // Takes up 80% of the screen height (like a sheet)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
  },
  inputContainer: {
    paddingHorizontal: 10,
  },
  input: {
    borderColor:'#F9F9F9',
    borderWidth:2,
    backgroundColor: '#FFFFFF', // Light grey line
    fontSize: 16,
    paddingVertical: 15,
    paddingStart:15,
    marginBottom: 20,
    color: colors.black,
  },
  inputFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor:'#F9F9F9',
    borderWidth:2,
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingEnd:10,
    marginBottom: 20,
  },
  inputRow: {
    flex: 1,
    fontSize: 16,
    paddingStart:15,
    color: colors.black,
  },
  helpIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:colors.help,
    borderWidth:1,
    marginLeft: 10,
  },
  helpIconText: {
    color: colors.help,
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // Checkbox styles (Replicated from your original file)
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxUnchecked: {
    borderColor: colors.textLight,
    backgroundColor: colors.white,
  },
  checkboxChecked: {
    backgroundColor: colors.primaryBrand,
    borderColor: colors.primaryBrand,
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.textBody,
    fontWeight: '600',
  },

  // Button styles
  addButton: {
    backgroundColor: colors.primaryBrand,
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // Fixed positioning for the button within the modal view
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddNewCardModal;