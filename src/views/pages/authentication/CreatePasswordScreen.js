// src/screens/Auth/CreatePasswordScreen.js
import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Platform} from 'react-native';
import {BackgroundRectImgBg, Logo} from '../../../assets/startUpImg';
import normalize from '../../../utils/normalize';

import {colors, typography} from '../../../theme';
import SvgRenderer from '../../components/SvgRenderer';
import AppButton from '../../components/AppButton';
import InputField from '../../components/InputField';
import AppText from '../../components/AppText';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../components/Loader';
import {showErrorToast, showSuccessToast} from '../../../config/Toast';

const CreatePasswordScreen = ({route}) => {
  const toast = useToast();
  const {setUpPassword, isLoading} = useAuth();

  const navigation = useNavigation();
  const params = route?.params || {};
  const userType = params?.userType || 'User';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreatePassword = async () => {
    // 1. Basic Validation
    if (!password.trim()) {
      showErrorToast(toast, 'Please enter your password!');
      return;
    }
    if (!confirmPassword.trim()) {
      showErrorToast(toast, 'Please enter your confirmPassword!');
      return;
    }

    // 2. Logic Validation: Check if passwords match
    if (password !== confirmPassword) {
      showErrorToast(toast, 'Passwords do not match!');
      return;
    }

    // 3. Prepare Form Data with exact API keys
    const formdata = new FormData();
    formdata.append('Academia_PasswordSetup.PasswordSetup.password', password);
    formdata.append(
      'Academia_PasswordSetup.PasswordSetup.confirmPassword',
      confirmPassword,
    );

    try {
      // 4. API Call (Replace 'CreatePasswordApi' with your actual service function)
      const response = await setUpPassword(formdata);

      if (response && response.data) {
        showSuccessToast(toast, 'Password set successfully!');
        // Usually, you navigate to Login or a Success screen here
        navigation.replace('LoginScreen', {userType});
      } else {
        showErrorToast(toast, response?.message || 'Failed to set password');
      }
    } catch (error) {
      console.error('Create Password Error:', error);
      showErrorToast(toast, 'Network error. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Logo style={styles.icon} />
      <Loader visible={isLoading} />
      <View style={styles.childContainer}>
        <ImageBackground
          source={BackgroundRectImgBg}
          style={styles.svgBackground}
          resizeMode="cover">
          <View style={styles.childContainer1}>
            {/* Avatar / Icon Wrapper */}
            <View style={styles.avatarWrapper}>
              <SvgRenderer
                name={
                  userType === 'merchant'
                    ? 'merchantIcon'
                    : userType === 'Academia'
                    ? 'instituteIcon'
                    : 'userIcon'
                }
                width={64}
                height={70}
              />
            </View>

            <AppText style={styles.title}>Setup Password</AppText>

            <View style={styles.form}>
              <InputField
                label="New Password"
                value={password}
                onChangeText={setPassword}
                placeholder="********"
                secureTextEntry={true}
              />

              <InputField
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="********"
                secureTextEntry={true}
              />

              <View style={styles.buttonSpacing}>
                <AppButton title="Submit" onPress={handleCreatePassword} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? normalize(2) : normalize(40),
    backgroundColor: colors.white,
  },
  childContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(70),
    width: '100%',
    height: '100%',
  },
  childContainer1: {
    alignItems: 'center',
    marginTop: normalize(-50),
    width: '100%',
    height: '100%',
  },
  svgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: normalize(20),
    backgroundColor: colors.white,
    borderRadius: normalize(35),
    width: normalize(126),
    height: normalize(126),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.lightOrange,
  },
  icon: {
    height: 64,
    marginTop: normalize(20),
  },
  form: {
    paddingHorizontal: normalize(32),
    paddingVertical: normalize(14),
    width: '100%',
  },
  title: {
    fontFamily: typography.fontFamily.medium,
    fontSize: normalize(18),
    lineHeight: normalize(24),
    fontWeight: '700',
    marginBottom: normalize(16),
    textAlign: 'center',
    color: colors.primary,
  },
  buttonSpacing: {
    marginTop: normalize(10),
  },
});

export default CreatePasswordScreen;
