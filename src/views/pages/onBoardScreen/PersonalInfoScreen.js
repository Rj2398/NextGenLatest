// screens/PersonalInfoScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/MaterialIcons'; 
// Import custom components
import InputField from '../../components/user/NormalInputField';
import DatePickerInput from '../../components/user/DatePickerInput';
import DropdownSelect from '../../components/user/DropdownSelect';
import CircularBorder from '../../components/user/CircularBorder';

// ✅ Gender options for the dropdown
const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

// ✅ Helper function for date formatting (replaces moment)
const formatDate = (date) => {
  if (!(date instanceof Date)) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts at 0
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const PersonalInfoScreen = () => {
  const [fullName, setFullName] = useState('Sarah Johnson');
  const [email, setEmail] = useState('sarah.johnson@email.com');
  const [phoneNumber, setPhoneNumber] = useState('+1 234 567 8900');
  const [dob, setDob] = useState(new Date('1990-05-15')); // Initial date
  const [gender, setGender] = useState('female');
  const [streetAddress, setStreetAddress] = useState('123 Main Street, Apt 4B');
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('New York');
  const [zipCode, setZipCode] = useState('10001');

  const handleSaveChanges = () => {
    // ✅ Using our native formatDate instead of moment
    Alert.alert('Changes Saved', 'Your personal information has been updated!', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
    console.log({
      fullName,
      email,
      phoneNumber,
      dob: formatDate(dob),
      gender,
      streetAddress,
      city,
      state,
      zipCode,
    });
  };

  const handleCancel = () => {
    Alert.alert('Cancelled', 'Changes were not saved.', [
      { text: 'OK', onPress: () => console.log('Cancel OK') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
     <StatusBar barStyle="dark-content" />
    
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert('Go Back')}>
          <Icon name="arrow-back-ios" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Info</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>
<KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // padding works better on iOS
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Image Section */}
        <View style={styles.profileImageContainer}>
          <CircularBorder >
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.profileImage}
          />
          </CircularBorder>
          <TouchableOpacity style={styles.cameraIconContainer}>
            <Icon name="camera-alt" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Profile Details Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Icon name="person" size={20} color="#FF8C00" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Profile Details</Text>
          </View>
          
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />
          <InputField
            label="Email Address"
            placeholder="your.email@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={false}
            locked={true}
            message="Email cannot be changed"
          />
          <InputField
            label="Phone Number"
            placeholder="+1 234 567 8900"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <DatePickerInput
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            value={dob}
            onDateChange={setDob}
            optional={true}
          />
          <DropdownSelect
            label="Gender"
            placeholder="Select Gender"
            data={genderOptions}
            onSelect={setGender}
            selectedValue={gender}
          />
        </View>

        {/* Address Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Icon name="location-on" size={20} color="#FF8C00" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Address</Text>
          </View>
          <InputField
            label="Street Address"
            placeholder="123 Main Street, Apt 4B"
            value={streetAddress}
            onChangeText={setStreetAddress}
          />
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <InputField
                label="City"
                placeholder="New York"
                value={city}
                onChangeText={setCity}
              />
            </View>
            <View style={styles.rowItem}>
              <InputField
                label="State"
                placeholder="New York"
                value={state}
                onChangeText={setState}
              />
            </View>
          </View>
          <InputField
            label="PIN / ZIP Code"
            placeholder="10001"
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="number-pad"
          />
        </View>
      
      </ScrollView>
  </KeyboardAvoidingView>
     
      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    padding: 15,
    
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
   
          width: '100%',
          height: '100%',
          borderRadius: 120 / 2,
          resizeMode: 'cover',
     
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#FF8C00',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 3,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: {
    flex: 1,
    marginRight: 10,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginHorizontal:20
    
 },
  cancelButton: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingVertical: 15,
    marginRight: 10,
    alignItems: 'center',

  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    paddingVertical: 15,
    marginLeft: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PersonalInfoScreen;
