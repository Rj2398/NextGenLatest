import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const DescriptionInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  numberOfLines = 7, // default for textarea
  style,
  inputStyle,
  labelStyle,
  ...rest
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        style={[styles.input, multiline && styles.textArea, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...rest}
      />
    </View>
  );
};

export default DescriptionInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 150, // for roughly 7 lines
    textAlignVertical: 'top',
  },
});
