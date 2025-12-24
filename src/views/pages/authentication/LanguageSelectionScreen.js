// src/screens/Auth/LanguageSelectionScreen.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import normalize from '../../../utils/normalize';

import {typography, colors} from '../../../theme';
import {useNavigation} from '@react-navigation/native';

export const LanguageSelectionScreen = () => {
  const navigation = useNavigation();
  const handlNavigation = () => {
    navigation.navigate('Onboarding');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your language</Text>

      <TouchableOpacity
        style={[styles.button, styles.filled]}
        onPress={() => handlNavigation()}>
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.filled]}
        onPress={() => handlNavigation()}>
        <Text style={styles.buttonText}>العربية</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(20),
  },
  title: {
    fontSize: normalize(20),
    fontFamily: typography.fontFamily.bold,
    marginBottom: normalize(40),
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: normalize(14),
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: normalize(10),
  },
  filled: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: normalize(16),
    color: colors.white,
    fontFamily: typography.fontFamily.bold,
  },
});
