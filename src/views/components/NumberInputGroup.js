// components/NumberInputGroup.js

import React from 'react';
import InputGroup from './InputGroup'; // Assuming InputGroup is in the same directory structure

const NumberInputGroup = props => {
  const handleNumericChange = text => {
    const numericValue = text.trim();

    if (props.onChangeText) {
      // 1. Pass the raw string back for display in the TextInput (InputGroup handles this)
      props.onChangeText(numericValue);
    }

    if (props.onChange) {
      // 2. Convert to a Number (or null) for form data submission (API payload)
      let finalValue = null;
      if (numericValue !== '') {
        // Use parseFloat to handle potential decimal numbers (like weight or dimensions)
        finalValue = parseFloat(numericValue);
      }

      // Call the main handler for state update (which uses the 'onChange' prop for number/boolean types)
      props.onChange(finalValue);
    }
  };

  return (
    <InputGroup
      {...props}
      // Force numeric keyboard
      keyboardType="numeric"
      // Override onChangeText to handle numeric conversion
      onChangeText={handleNumericChange}
      // Ensure the 'value' displayed is always a string, as required by TextInput
      value={
        props.value !== null && props.value !== undefined
          ? String(props.value)
          : ''
      }
    />
  );
};

export default NumberInputGroup;
