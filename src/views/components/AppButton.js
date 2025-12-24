// src/components/common/AppButton.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors, typography} from '../../theme';
import normalize from '../../utils/normalize';

const AppButton = ({title, onPress, type = 'primary', style, textStyle}) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'secondary':
        return [styles.secondaryButton, styles.outlineButton];
      case 'outline':
        return styles.outlineButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.baseButton, getButtonStyle(), style]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: normalize(8),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.extraLightOrange,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  primaryText: {
    color: colors.white,
    fontSize: normalize(16),
    fontFamily: typography.fontFamily.medium,
  },
  secondaryText: {
    color: colors.black,
    fontSize: normalize(16),
    fontFamily: typography.fontFamily.medium,
  },
  outlineText: {
    color: colors.primary,
    fontSize: normalize(16),
    fontFamily: typography.fontFamily.medium,
  },
});

export default AppButton;
