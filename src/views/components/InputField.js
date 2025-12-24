// src/components/common/InputField.js
import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import normalize from '../../utils/normalize';
import {colors, typography} from '../../theme';

const InputField = ({
  label,
  value,
  onChangeText,
  type,
  error,
  showError,
  placeholder,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || label}
        secureTextEntry={type === 'password'}
        keyboardType={type === 'email' ? 'email-address' : 'default'}
        autoCapitalize="none"
        placeholderTextColor={colors.gray}
        style={[styles.input, showError && error ? styles.errorBorder : {}]}
      />
      {showError && error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontWeight: '400',
    marginBottom: normalize(8),
    fontSize: normalize(12),
    fontFamily: typography.fontFamily.regular,
    color: colors.gray,
    lineHeight: normalize(18),
  },
  input: {
    height: normalize(44),
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: normalize(8),
    paddingHorizontal: normalize(12),
    fontFamily: typography.fontFamily.medium,
    fontSize: normalize(14),
    color: colors.black,
    backgroundColor: colors.white,
    lineHeight: normalize(20),
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});

export default InputField;
