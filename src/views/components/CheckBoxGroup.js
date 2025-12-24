// components/CheckboxGroup.js

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const colors = {
  white: '#FFFFFF',
  textPrimary: '#6B7280',
  black: '#000000',
  primary: '#F89941',
  disabledBg: '#F5F5F5',
  error: 'red',
};

const CheckboxGroup = ({
  label, // ⬅️ REQUIRED: Added prop definition
  value,
  onChange,
  helpText,
  isRequired = false,
  isReadOnly = false,
}) => {
  // ... (rest of logic) ...
  const isChecked = !!value;

  const handleToggle = () => {
    if (!isReadOnly && onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.touchable, isReadOnly && styles.touchableReadOnly]}
        onPress={handleToggle}
        activeOpacity={isReadOnly ? 1 : 0.7}
        disabled={isReadOnly}>
        {/* Checkbox Icon */}
        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
          {isChecked && <Feather name="check" size={14} color={colors.white} />}
        </View>

        {/* Label Display */}
        <Text style={[styles.label]}>
          {label}
          {isRequired && <Text style={{color: colors.error}}>*</Text>}
        </Text>
      </TouchableOpacity>

      {/* Help Text */}
      {helpText && <Text style={styles.helpText}>{helpText}</Text>}
    </View>
  );
};

export default CheckboxGroup;

const styles = StyleSheet.create({
  // ... (styles remain the same) ...
  container: {
    marginBottom: 15,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  touchableReadOnly: {
    backgroundColor: colors.disabledBg,
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: colors.white,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '500',
    flex: 1,
  },
  helpText: {
    fontSize: 12,
    color: colors.textPrimary,
    marginTop: 2,
    marginLeft: 30,
  },
});
