import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
// import CustomCheckbox from '../../components/CustomCheckBox';
import DropdownSelect from '../../components/DropdownSelect';


const InputField = ({
  label,
  value,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  isEmailField = false,
  onChangeText,
}) => {      
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
const [agreeToTerms, setAgreeToTerms] = useState(false);
  return (
    
    <View style={styles.fieldContainer}>
     
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={styles.inputWrapper}>
       
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          editable={!isEmailField}
        />

        { secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Image
              source={require('../../../assets/images/ic_eye_icon.png')}
              style={{ width: 22, height: 22, tintColor: '#999' }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


const UserDeleteAccountScreen = () => {
  const [email] = useState('user@example.com');
  const [password, setPassword] = useState('');
  const [reason, setReason] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
   const [isAgreed, setIsAgreed] = useState(false);

  const handleDeleteAccount = () => {




    if (!isConfirmed || password.length === 0) {
      Alert.alert(
        'Action Required',
        'Please enter your password and confirm the permanent action.'
      );
      return;
    }

    Alert.alert(
      'Confirm Deletion',
      `Are you absolutely sure you want to delete the account linked to ${email}? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'DELETE',
          style: 'destructive',
          onPress: () => console.log('Account Deletion Initiated...'),
        },
      ]
    );
  };

  const handleCancel = () => console.log('Cancel Delete Account action');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.fullScreen}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/images/ic_back_press.png')}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Delete Account</Text>

          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          {/* Warning Block */}
          <View style={styles.warningBlock}>
            <Image
              source={require('../../../assets/images/ic_warning_icon.png')}
              style={{ width: 32, height: 32, tintColor: '#EA5858' }}
            />

            <Text style={styles.warningHeader}>
              Are you sure you want to delete your account?
            </Text>

            <Text style={styles.warningText}>
              Deleting your account will permanently remove your data, saved
              addresses, and tickets. This action cannot be undone.
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.sectionHeader}>
              To continue, please confirm your details.
            </Text>

            <InputField
              label="Email"
              value={email}
              placeholder="user@example.com"
              isEmailField={true}
              onChangeText={() => {}}
            />

            <InputField
              label="Password"
              value={password}
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={setPassword}
            />

            <DropdownSelect
              label="Reason for leaving (optional)"
              placeholder="Select a reason"
              selectedValue={reason}
            />

            {/* Confirmation Checkbox */}
            {/* <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => setChecked(!checked)} style={styles.checkbox}>
                  {checked && <View style={styles.innerCheck} />}
              </TouchableOpacity>

              <Text style={styles.checkboxLabel}>
                I understand that this action is permanent and cannot be
                reversed.
              </Text>
            </View> */}
          {/* <CustomCheckbox
              label="I agree to Terms and Conditions"
              isChecked={agreeToTerms}
              onToggle={() => setAgreeToTerms(!agreeToTerms)}
            ></CustomCheckbox> */}
          </View>
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.deleteButton,
              (!isConfirmed || password.length === 0) &&
                styles.disabledDeleteButton,
            ]}
            onPress={handleDeleteAccount}
            disabled={!isConfirmed || password.length === 0}
          >
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// ----------------------
// STYLES
// ----------------------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  fullScreen: { flex: 1, backgroundColor: '#F7F7F7' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: { fontSize: 18, fontWeight: '600' },

  container: {
    padding: 20,
    paddingBottom: 100,
  },

  warningBlock: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  warningHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
  warningText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 20,
  },

  formSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
  },

  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },

  fieldContainer: { marginBottom: 15 },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    height: 50,
  },

  input: { flex: 1, fontSize: 16, color: '#333' },
  eyeIcon: { paddingLeft: 10 },

  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    height: 50,
  },

  dropdownText: { fontSize: 16 },
  placeholderText: { color: '#999' },
  selectedText: { color: '#333' },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },

  customCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 3,
  },

  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },

  checkbox: {
  width: 22,
  height: 22,
  borderWidth: 2,
  borderColor: '#333',
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
},
innerCheck: {
  width: 12,
  height: 12,
  backgroundColor: '#EA5858',
  borderRadius: 3,
},

  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 15,
    justifyContent: 'space-between',
  },

  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },

  deleteButton: {
    flex: 1,
    marginLeft: 10,
    padding: 15,
    backgroundColor: '#EA5858',
    borderRadius: 8,
    alignItems: 'center',
  },

  deleteButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  disabledDeleteButton: {
    backgroundColor: '#F5B0B0',
  },
});

export default UserDeleteAccountScreen;
