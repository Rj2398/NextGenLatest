// src/components/common/OtpField.js
import React, {useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import AppButton from './AppButton';
import normalize from '../../utils/normalize';
import {colors} from '../../theme';

const OtpField = ({value = '', onChangeText, actionLabel, onActionPress}) => {
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = value?.split('');
    newOtp[index] = text?.slice(-1); // Keep only the last character entered
    const updated = newOtp?.join('');
    onChangeText(updated);

    // Auto-focus next input if text is entered
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Move to previous input on backspace if current field is empty
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {[0, 1, 2, 3].map(i => (
          <TextInput
            key={i}
            ref={el => (inputs.current[i] = el)}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={value[i] || ''}
            onChangeText={text => handleChange(text, i)}
            onKeyPress={e => handleKeyPress(e, i)}
            placeholderTextColor={colors.gray}
          />
        ))}
      </View>

      {actionLabel && (
        <AppButton
          title={actionLabel}
          onPress={onActionPress || (() => {})}
          style={styles.actionButton}
          // Button is disabled until all 4 digits are filled
          disabled={value.length < 4}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: normalize(12),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(16),
  },
  input: {
    width: normalize(60),
    height: normalize(60),
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: normalize(8),
    textAlign: 'center',
    fontSize: normalize(20),
    backgroundColor: colors.white,
    color: colors.black,
  },
  actionButton: {
    marginTop: normalize(10),
  },
});

export default OtpField;
