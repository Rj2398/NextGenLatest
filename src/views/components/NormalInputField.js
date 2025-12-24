// components/InputField.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the lock icon

const NormalInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  editable = true,
  locked = false, // New prop for lock icon
  message, // Optional message below input
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, !editable && styles.readOnlyInput]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={editable}
          placeholderTextColor="#999"
        />
        {locked && (
          <Icon name="lock" size={20} color="#888" style={styles.lockIcon} />
        )}
      </View>
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 50,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0, // Reset default padding
  },
  readOnlyInput: {
    backgroundColor: '#f9f9f9', // Slightly different background for non-editable
    color: '#777',
  },
  lockIcon: {
    marginLeft: 10,
  },
  message: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    paddingLeft: 5,
  },
});

export default NormalInputField;