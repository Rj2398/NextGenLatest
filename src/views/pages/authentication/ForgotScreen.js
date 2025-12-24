// src/screens/Auth/ForgetPasswordScreen.js
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

const ForgetPasswordScreen = ({route}) => {
  const navigation = useNavigation();
  const {userType} = route.params;
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Logo style={styles.icon} />

      <View style={styles.childContainer}>
        <ImageBackground
          source={BackgroundRectImgBg}
          style={styles.svgBackground}
          resizeMode="cover">
          <View style={styles.childContainer1}>
            {/* Avatar / Icon Wrapper */}
            <View style={styles.avatarWrapper}>
              <SvgRenderer name="userIcon" width={64} height={70} />
            </View>

            <AppText style={styles.title}>{userType}</AppText>

            <View style={styles.form}>
              <InputField
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                type="email"
              />

              <AppButton
                title="Send"
                onPress={() =>
                  navigation.replace('EmailSentScreen', {userType})
                }
              />
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
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(-50),
    width: '100%',
    height: '100%',
    // position: 'absolute',
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
});

export default ForgetPasswordScreen;
