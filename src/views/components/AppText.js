// src/components/common/AppText.js
import React from 'react';
import {Text, StyleSheet} from 'react-native';

const AppText = ({children, style, ...rest}) => {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default AppText;
