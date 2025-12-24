// components/DateTimePickerInput.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// --- Local consistent color palette (same as InputGroup) ---
const colors = {
  white: '#FFFFFF',
  black: '#000000',
  background: '#FFFFFF',
  border: '#E0E0E0',
  textPrimary: '#858D9D',
  placeholder: '#A0A0A0',
};

// --- Helper function to format Date to "DD/MM/YYYY" for display ---
const formatDisplayDate = date => {
  if (!date || !(date instanceof Date) || isNaN(date)) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// --- Helper function to format Date for API (YYYY-MM-DD) ---
const formatAPIDate = date => {
  if (!date || !(date instanceof Date) || isNaN(date)) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

/**
 * Reusable DateTime Picker Input (Styled like InputGroup)
 */
const DateTimePickerInput = ({
  label,
  value,
  onChange,
  mode = 'date',
  isRequired = false,
  placeholder = 'DD/MM/YYYY',
  minimumDate,
  maximumDate,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      // Format before passing to parent
      const formatted = formatAPIDate(selectedDate);
      onChange(formatted);
    }
  };

  const openPicker = () => {
    if (Platform.OS === 'web') {
      Alert.alert('Date Picker', 'Native date picker is not supported on web.');
      return;
    }
    setShowPicker(true);
  };

  return (
    <View style={styles.inputGroup}>
      {label ? (
        <Text style={styles.label}>
          {label}
          {isRequired && <Text style={styles.required}> *</Text>}
        </Text>
      ) : null}

      <TouchableOpacity style={styles.inputBox} onPress={openPicker}>
        <Text
          style={[
            styles.inputText,
            !value && { color: colors.placeholder },
          ]}>
          {value ? formatDisplayDate(new Date(value)) : placeholder}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

export default DateTimePickerInput;

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  required: {
    color: 'red',
  },
  inputBox: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputText: {
    fontSize: 14,
    color: colors.black,
  },
});
