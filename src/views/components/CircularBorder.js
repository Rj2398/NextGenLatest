import React from 'react';
import { View, StyleSheet } from 'react-native';

const CircularBorder = ({
  size = 120,
  color = '#f97316',
  borderWidth = 1,
  children,
}) => {
  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderColor: color,
          borderWidth: borderWidth,
          borderRadius: size / 2,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional, makes the circle stand out
  },
});

export default CircularBorder;
