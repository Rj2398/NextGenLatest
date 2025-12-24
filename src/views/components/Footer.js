// src/components/common/Footer.js
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import AppText from './AppText';
import normalize from '../../utils/normalize';
import {colors} from '../../theme';

const Footer = ({text, linkText, onPressLink}) => {
  return (
    <View style={styles.container}>
      <AppText>{text}</AppText>
      <TouchableOpacity onPress={onPressLink}>
        <AppText style={styles.link}>{linkText}</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: normalize(20),
    justifyContent: 'center',
  },
  link: {
    color: colors.primary,
    marginLeft: normalize(5),
    fontWeight: 'bold', // Added slight weight for better visibility
  },
});

export default Footer;
