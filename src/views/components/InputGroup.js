import {View, Text, TextInput, StyleSheet} from 'react-native';

// Only keep the colors used in this file, defined locally for independence.
const colors = {
  white: '#FFFFFF',
  black: '#000000',
  background: '#FFFFFF',
  border: '#E0E0E0',
  textPrimary: '#858D9D',
};

const InputGroup = ({
  label,
  value,
  placeholder,
  keyboardType = 'default',
  onChangeText,
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      placeholderTextColor={colors.black}
      // Note: fontWeight should be string (e.g., '600') in React Native StyleSheet
    />
  </View>
);

export default InputGroup;

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    // Change to string if this causes a warning: fontWeight: '600',
    paddingVertical: 10,
    fontSize: 14,
    color: colors.black,
  },
});
