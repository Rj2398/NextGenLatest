// src/components/common/TextField.js
import React from 'react';
import InputField from './InputField';
import normalize from '../../utils/normalize';

const TextField = ({
  label,
  value,
  placeholder,
  onChangeText,
  error,
  showError,
  type,
}) => {
  return (
    <InputField
      label={label}
      value={value}
      type={type}
      placeholder={placeholder}
      onChangeText={onChangeText}
      containerStyle={{marginBottom: normalize(6)}}
      showError={showError}
      error={error}
    />
  );
};

export default TextField;
