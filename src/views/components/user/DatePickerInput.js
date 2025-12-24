// components/DatePickerInput.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // For native date picker
import Icon from 'react-native-vector-icons/MaterialIcons'; // For calendar icon
import moment from 'moment'; // For date formatting

// Installation for DateTimePicker:
// npm install @react-native-community/datetimepicker
// or yarn add @react-native-community/datetimepicker

// Installation for moment (optional, but good for formatting):
// npm install moment
// or yarn add moment

const DatePickerInput = ({ label, value, onDateChange, placeholder, optional = false }) => {
  const [showPicker, setShowPicker] = useState(false);

  const displayDate = value ? moment(value).format('YYYY-MM-DD') : placeholder;

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios'); // Keep picker open on Android until selected/cancelled
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {optional && <Text style={styles.optionalText}>(Optional)</Text>}
        </Text>
      )}
      <TouchableOpacity
        style={styles.inputWrapper}
        onPress={() => setShowPicker(true)}>
        <Text style={[styles.dateText, !value && styles.placeholderText]}>
          {displayDate}
        </Text>
        <Icon name="calendar-today" size={20} color="#888" style={styles.calendarIcon} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value || new Date()} // Default to current date if none selected
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'} // 'spinner' for iOS, 'default' for Android
          onChange={handleDateChange}
          maximumDate={new Date()} // Prevent selecting future dates for DOB
        />
      )}
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
  optionalText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
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
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  calendarIcon: {
    marginLeft: 10,
  },
});

export default DatePickerInput;