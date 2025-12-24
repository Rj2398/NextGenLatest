import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  BackgroundRectImg,
  InstituteIcon,
  Logo,
  MerchantIcon,
  UserIcon,
  WelcomeImg,
} from '../../assets/startUpImg';

import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, typography} from '../../theme';
import normalize from '../../utils/normalize';
import {useDispatch} from 'react-redux';
import {setUserType} from '../../store/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showErrorToast} from '../../config/Toast';
import {Toast, useToast} from 'react-native-toast-notifications';

const USER_TYPE_TEXT = 'User';
const ACADEMIA_TYPE_TEXT = 'Academia';
const MERCHANT_TYPE_TEXT = 'Merchant';
const ERROR_TITLE = 'Error';
const OK_BUTTON = 'OK';
const TITLE_TEXT = 'Select Your User Type';

const StartUpScreen = ({navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert(ERROR_TITLE, error, [
        {
          text: OK_BUTTON,
          onPress: () => {
            setError(null);
            setLoading(false);
          },
        },
      ]);
    }
  }, [error]);

  const handleUserTypeSelection = userType => {
    if (userType === USER_TYPE_TEXT || userType === MERCHANT_TYPE_TEXT) {
      showErrorToast(toast, 'Not Implemented Yet');
      return;
    }
    dispatch(setUserType(userType));
    AsyncStorage.setItem('UserTypeSet', userType);
    setLoading(true);
    navigation.navigate('LoginScreen', {userType});
    setLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Logo style={styles.icon} />

        <View style={styles.imageSection}>
          <ImageBackground
            source={BackgroundRectImg}
            style={styles.svgBackground}
            resizeMode="cover">
            <WelcomeImg style={styles.overlayImage} />
          </ImageBackground>
        </View>

        <View style={styles.textSection}>
          <Text style={styles.title}>{TITLE_TEXT}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.column, loading && styles.disabledButton]}
              onPress={() => handleUserTypeSelection(USER_TYPE_TEXT)}
              disabled={loading}
              accessible={true}
              accessibilityLabel={USER_TYPE_TEXT}
              accessibilityRole="button">
              <UserIcon width={44} height={70} />
              <Text style={styles.text}>{USER_TYPE_TEXT}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.column, loading && styles.disabledButton]}
              onPress={() => handleUserTypeSelection(ACADEMIA_TYPE_TEXT)}
              disabled={loading}
              accessible={true}
              accessibilityLabel={ACADEMIA_TYPE_TEXT}
              accessibilityRole="button">
              <InstituteIcon width={58} height={70} />
              <Text style={styles.text}>{ACADEMIA_TYPE_TEXT}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.columnFull, loading && styles.disabledButton]}
              onPress={() => handleUserTypeSelection(MERCHANT_TYPE_TEXT)}
              disabled={loading}
              accessible={true}
              accessibilityLabel={MERCHANT_TYPE_TEXT}
              accessibilityRole="button">
              <MerchantIcon width={98} height={68} />
              <Text
                style={[
                  styles.text,
                  {textAlign: 'left', marginLeft: normalize(52)},
                ]}>
                {MERCHANT_TYPE_TEXT}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: normalize(8),
  },
  icon: {
    height: 64,
    width: normalize(150),
    marginTop: normalize(16),
  },
  imageSection: {
    width: '100%',
    height: '40%',
    marginTop: normalize(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayImage: {
    alignSelf: 'center',
    zIndex: 1,
    width: '80%',
    height: '80%',
  },
  textSection: {
    marginTop: normalize(12),
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: normalize(8),
  },
  title: {
    fontFamily: typography.fontFamily.medium,
    fontSize: normalize(24),
    fontWeight: '500',
    marginBottom: normalize(8),
    color: colors.grey,
    lineHeight: normalize(28),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  column: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(16),
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  columnFull: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    backgroundColor: '#fff',
    paddingHorizontal: normalize(32),
    paddingVertical: normalize(32),
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginVertical: normalize(14),
  },
  text: {
    marginTop: 8,
    fontFamily: typography.fontFamily.bold,
    lineHeight: normalize(24),
    fontSize: normalize(16),
    textAlign: 'center',
    color: colors.policeBlue,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default StartUpScreen;
