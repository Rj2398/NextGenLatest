import React, { memo } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputField = memo(
  ({
    label,
    value,
    placeholder,
    onChangeText,
    multiline = false,
    redColor = false,
    required = true,
  }) => {
    return (
      <View style={styles.inputContainer}>
        {/* Label + * (if required) */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={{ color: "red", marginLeft: 2 }}>*</Text>}
        </View>

        {/* Input field */}
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={redColor ? "#FF7A00" : "#999"}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          blurOnSubmit={false}
        />
      </View>
    );
  }
);

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 12,
    color: "#999",
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    color: "#000000",
    fontWeight: "bold",
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
  },
});