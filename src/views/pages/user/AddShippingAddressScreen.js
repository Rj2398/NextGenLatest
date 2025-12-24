import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  TextInput // New component for input fields
} from 'react-native';
import UserHeader from '../../components/user/UserHeader';
// Icon is not needed in this specific screen, but keeping the import for consistency
// import Icon from 'react-native-vector-icons/AntDesign'; 


// --- CONSOLIDATED COLOR CONSTANTS (from previous screen) ---
const COLORS = {
  primaryOrange: '#FF7A00', 
  backgroundGray: '#F5F5F5', 
  cardWhite: 'white', // Used for input background
  darkText: '#9B9B9B', 
  mediumText: '#9B9B9B', 
  black: '#222222', 
};

// --- CUSTOM TEXT INPUT COMPONENT ---
// Reusable component to apply the styling shown in the image (raised white background)
const CustomTextInput = ({ label, placeholder, value, onChangeText, multiline = false }) => (
  <View style={styles.inputContainer}>
    {label && <Text style={styles.inputLabel}>{label}</Text>}
    <TextInput
      style={[
        styles.inputField, 
        multiline && styles.multilineInput // Apply extra height for Address
      ]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={COLORS.mediumText}
      multiline={multiline}
    />
  </View>
);

// --- Main Component: Adding Shipping Address Screen ---
const AddShippingAddressScreen = ({ navigation }) => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    fullName: 'Jane Doe',
    address: '3 Newbridge Court', // Pre-filled data from image
    city: 'Chino Hills',
    state: 'California',
    zipCode: '91709',
    country: 'United States',
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    navigation.navigate('AccountSettingsScreen')
    console.log('Saving Address:', formData);
    // Add navigation logic here, e.g., navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header Section: "Adding Shipping Address" */}
      <UserHeader
        title="Adding Shipping Address"
        onBackPress={() => navigation.goBack()}/>

      {/* Scrollable Form Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        
        {/* Full Name Input */}
        <CustomTextInput
          label="Full name"
          value={formData.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
          // Label is empty in the image, so we pass it as placeholder
        />
        
        {/* Address Input */}
        <CustomTextInput
          label="Address"
          value={formData.address}
          onChangeText={(text) => handleChange('address', text)}
          multiline={false} 
        />

        {/* City Input */}
        <CustomTextInput
          label="City"
          value={formData.city}
          onChangeText={(text) => handleChange('city', text)}
        />
        
        {/* State/Region Input */}
        <CustomTextInput
          label="State/Province/Region"
          value={formData.state}
          onChangeText={(text) => handleChange('state', text)}
        />
        
        {/* Zip Code Input */}
        <CustomTextInput
          label="Zip Code (Postal Code)"
          value={formData.zipCode}
          onChangeText={(text) => handleChange('zipCode', text)}
        />

        {/* Country Input */}
        <CustomTextInput
          label="Country"
          value={formData.country}
          onChangeText={(text) => handleChange('country', text)}
        />
        {/* Fixed Button at the bottom */}
        <View style={styles.buttonContainer}>
                <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSave}
                >
                <Text style={styles.saveButtonText}>Save Address</Text>
                </TouchableOpacity>
            </View>
      </ScrollView>

     
    </SafeAreaView>
  );
};

// --- Stylesheets ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray, 
  },
  scrollContent: {
    padding: 15,
  },
  // --- Input Styles matching the image design ---
  inputContainer: {
    marginBottom: 15,
    backgroundColor: COLORS.cardWhite, // White input container
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingTop: 8, // Space for the floating label
    // Shadow to mimic the raised card look
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 60, // Minimum height for standard inputs
  },
  inputLabel: {
    fontSize: 12,
    color: COLORS.mediumText,
    opacity: 0.8,
  },
  inputField: {
    fontSize: 16,
    color: COLORS.black,
    paddingVertical: 5,
    paddingLeft: 0,
    width: '100%',
  },
  multilineInput: {
    minHeight: 80, 
    textAlignVertical: 'top',
  },
  // --- Button Styles ---
  buttonContainer: {
    marginTop:15,
    backgroundColor: COLORS.backgroundGray, // Match screen background
    borderTopColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: COLORS.primaryOrange,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddShippingAddressScreen;