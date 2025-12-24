// src/screens/Auth/EmailSentScreen.js
import React from 'react';
import {View, StyleSheet, ImageBackground, Platform} from 'react-native';
import {BackgroundRectImgBg, Logo} from '../../../assets/startUpImg';
import normalize from '../../../utils/normalize';
import {useNavigation} from '@react-navigation/native';
import {colors, typography} from '../../../theme';
import SvgRenderer from '../../components/SvgRenderer';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';

const EmailSentScreen = ({route}) => {
  const {userType} = route.params;
  const navigation = useNavigation();

  const onLoginPress = () => {
    navigation.navigate('LoginScreen', {userType});
  };

  return (
    <View style={styles.container}>
      <Logo style={styles.icon} />
      <View style={styles.childContainer}>
        <ImageBackground
          source={BackgroundRectImgBg}
          style={styles.svgBackground}
          resizeMode="cover">
          <View style={styles.childContainer1}>
            <View style={styles.avatarWrapper}>
              <SvgRenderer name={'mailIcon'} width={64} height={70} />
            </View>

            <View style={styles.form}>
              <AppText style={styles.title}>Email Sent Successfully</AppText>
              <AppText style={styles.description}>
                We have sent a password recovery link to your email address.
              </AppText>

              <View style={styles.instructionContainer}>
                <AppText style={styles.instruction}>Instructions:</AppText>

                <View style={styles.labelContainer}>
                  <SvgRenderer name={'tickIcon'} width={16} height={16} />
                  <AppText style={styles.instructionLabel}>Check your </AppText>
                  <AppText style={styles.instructionLabel1}>Inbox</AppText>
                </View>

                <View style={styles.labelContainer}>
                  <SvgRenderer name={'tickIcon'} width={16} height={16} />
                  <AppText style={styles.instructionLabel}>Check your </AppText>
                  <AppText style={styles.instructionLabel1}>
                    Spam folder
                  </AppText>
                </View>

                <View style={styles.labelContainer}>
                  <SvgRenderer name={'tickIcon'} width={16} height={16} />
                  <AppText style={styles.instructionLabel}>Click the </AppText>
                  <AppText style={styles.instructionLabel1}>Reset Link</AppText>
                </View>
              </View>

              <AppButton
                title="Back to Login"
                onPress={onLoginPress}
                style={{marginBottom: normalize(10)}}
              />
              <AppButton
                title="Resend Email"
                type="outline"
                onPress={() => console.log('Resend Email')}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(70),
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: -120,
    left: 0,
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
    borderRadius: normalize(70),
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
    flex: 1,
    paddingHorizontal: normalize(32),
    paddingVertical: normalize(14),
    width: '100%',
  },
  title: {
    fontFamily: typography.fontFamily.medium,
    fontSize: normalize(16),
    lineHeight: normalize(18.3),
    fontWeight: '600',
    marginBottom: normalize(16),
    textAlign: 'center',
    color: colors.black,
  },
  description: {
    fontFamily: typography.fontFamily.regular,
    fontSize: normalize(16),
    lineHeight: normalize(18.3),
    fontWeight: '400',
    marginBottom: normalize(16),
    textAlign: 'center',
    color: colors.gray,
  },
  instructionContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(36),
  },
  instruction: {
    fontFamily: typography.fontFamily.medium,
    fontSize: normalize(16),
    lineHeight: normalize(18.3),
    fontWeight: '600',
    marginTop: normalize(16),
    color: colors.black,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: normalize(12),
  },
  instructionLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: normalize(12),
    color: colors.grey,
    paddingLeft: normalize(6),
  },
  instructionLabel1: {
    fontFamily: typography.fontFamily.medium,
    fontSize: normalize(12),
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default EmailSentScreen;
