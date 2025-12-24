// src/screens/Auth/SignupScreen.js
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Platform,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import {BackgroundRectImgBg, Logo} from '../../../assets/startUpImg';
import normalize from '../../../utils/normalize';
import {colors, typography} from '../../../theme';
import SvgRenderer from '../../components/SvgRenderer';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import TextField from '../../components/TextField';
import Footer from '../../components/Footer';
import {useNavigation} from '@react-navigation/native';
import OtpField from '../../components/OtpField';
import {useToast} from 'react-native-toast-notifications';
import useAuth from '../../../hooks/useAuth';
import {showErrorToast, showSuccessToast} from '../../../config/Toast';
import Loader from '../../components/Loader';

const SignupScreen = ({route}) => {
  const toast = useToast();
  const {RegisterApi, sendOtp, verifyOtp, isLoading} = useAuth();
  const navigation = useNavigation();
  const params = route?.params || {};
  const [showOtp, setShowOtp] = useState(false);
  // Local state for the static fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  // 1. Add the handleVerify function

  const handleVerify = async () => {
    if (!phone.trim()) {
      showErrorToast(toast, 'Please enter your phone!');
      return;
    }

    const formdata = new FormData();
    formdata.append(
      'Otp_ContactVerification.ContactVerification.contact_number',
      phone,
    );

    try {
      const response = await sendOtp(formdata);

      if (response.data) {
        showSuccessToast(toast, 'Otp sent successfully!');
        setShowOtp(true);
        console.log(response.data, 'otp api message comes');
      }
    } catch (error) {
      console.log(error, 'error comes otp send api');
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) {
      showErrorToast(toast, 'Please enter 4 digit valid OTP!');
      return;
    }

    // 2. Prepare Data
    const formdata = new FormData();
    formdata.append('Otp_ContactVerification.ContactVerification.otp', otp);

    try {
      const response = await verifyOtp(formdata);

      if (response && response.data) {
        showSuccessToast(toast, 'OTP Verified Successfully!');

        setShowOtp(false);
        setTimeout(() => {
          navigation.navigate('CreatePassword', {
            userType: params.userType,
          });
        }, 1000);
      } else {
        showErrorToast(toast, response?.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Verify OTP Error:', error);
      showErrorToast(toast, 'Invalid otp!!');
    }
  };

  const handleNext = async () => {
    // 1. Validation Logic
    if (!fullName.trim()) {
      showErrorToast(toast, 'Please enter your fullName!');
      return;
    }
    if (!email.trim()) {
      showErrorToast(toast, 'Please enter your email!');
      return;
    }
    if (!phone.trim()) {
      showErrorToast(toast, 'Please enter your phone!');
      return;
    }
    // Ensure the user actually entered the OTP they verified
    // if (!otp.trim()) {
    //   showErrorToast(toast, 'Please verify your Otp first!');
    //   return;
    // }

    // 2. Prepare Form Data with specific API keys
    const formdata = new FormData();
    formdata.append(
      'Academia_ContactVerification.ContactVerification.full_name',
      fullName,
    );
    formdata.append(
      'Academia_ContactVerification.ContactVerification.email_address',
      email,
    );
    formdata.append(
      'Academia_ContactVerification.ContactVerification.contact_number',
      phone,
    );

    try {
      // 3. API Call
      const response = await RegisterApi(formdata);

      if (response && response.data) {
        showSuccessToast(toast, 'Account created successfully!');
        // Navigate to the next screen (e.g., Dashboard or Success Screen)
        // navigation.navigate('SuccessScreen');
      } else {
        showErrorToast(toast, response?.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      showErrorToast(toast, 'A network error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Loader visible={isLoading} />
      <Logo style={styles.icon} />

      <View style={styles.childContainer}>
        <ImageBackground
          source={BackgroundRectImgBg}
          style={styles.svgBackground}
          resizeMode="cover">
          <View style={styles.childContainer1}>
            {/* Dynamic Avatar Header */}
            <View style={styles.iconView}>
              <SvgRenderer
                name={
                  params.userType === 'merchant'
                    ? 'merchantIcon'
                    : params.userType === 'Academia'
                    ? 'instituteIcon'
                    : 'userIcon'
                }
                width={64}
                height={70}
              />
            </View>

            <ScrollView
              bounces={false}
              style={styles.form}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}>
              <AppText style={styles.title}>Create Account</AppText>

              {/* Static Input Fields */}
              <TextField
                label="Full Name"
                value={fullName}
                placeholder="John Doe"
                onChangeText={setFullName}
              />

              <TextField
                label="Email"
                value={email}
                placeholder="email@example.com"
                type="email"
                onChangeText={setEmail}
              />

              {/* PHONE AND VERIFY BUTTON IN ONE ROW */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.inlineRow}>
                  <TextInput
                    style={[styles.baseInput, {flex: 1, marginBottom: 0}]}
                    placeholder="50XXXXXXX"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    placeholderTextColor={colors.gray}
                  />
                  <TouchableOpacity
                    style={styles.customVerifyBtn}
                    onPress={handleVerify}
                    activeOpacity={0.7}>
                    <Text style={styles.verifyText}>Verify Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {showOtp && (
                <View style={{marginTop: normalize(20)}}>
                  <Text style={styles.label}>Enter Verification Code</Text>
                  <OtpField
                    value={otp}
                    onChangeText={setOtp} // This must be a function!
                    actionLabel="Confirm Code"
                    onActionPress={handleVerifyOtp}
                  />
                </View>
              )}

              {/* <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.inlineRow}>
                  <TextInput
                    style={[styles.baseInput, {flex: 1, marginBottom: 0}]}
                    placeholder="50XXXXXXX"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    placeholderTextColor={colors.gray}
                  />
                  <TouchableOpacity
                    style={styles.customVerifyBtn}
                    onPress={handleVerify}
                    activeOpacity={0.7}>
                    <Text style={styles.verifyText}>Verify Now</Text>
                  </TouchableOpacity>
                </View>
              </View> */}

              <View style={styles.buttonWrapper}>
                <AppButton
                  title="Next"
                  type="primary"
                  onPress={() => handleNext()}
                  style={{marginVertical: normalize(10)}}
                />
              </View>

              <Footer
                text="Already have an account?"
                linkText="Login"
                onPressLink={() =>
                  navigation.replace('LoginScreen', {
                    userType: params.userType,
                  })
                }
              />
            </ScrollView>
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
  contentContainer: {
    paddingBottom: normalize(100),
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
  iconView: {
    alignItems: 'center',
    marginBottom: normalize(20),
    backgroundColor: colors.white,
    borderRadius: normalize(35),
    width: normalize(126),
    height: normalize(126),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.lightOrange,
    zIndex: 1,
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
    fontSize: normalize(18),
    lineHeight: normalize(24),
    fontWeight: '500',
    marginBottom: normalize(16),
    textAlign: 'center',
    color: colors.primary,
  },
  buttonWrapper: {
    marginTop: normalize(20),
  },

  inputGroup: {
    marginBottom: normalize(15),
    width: '100%',
  },
  label: {
    fontSize: normalize(12),
    color: colors.gray,
    marginBottom: normalize(5),
    fontFamily: typography.fontFamily.regular,
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center', // Ensures vertical centering between input and button
    width: '100%',
  },
  baseInput: {
    height: normalize(44),
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: normalize(8),
    paddingHorizontal: normalize(12),
    fontSize: normalize(14),
    color: colors.black,
    backgroundColor: colors.white,
    // flex: 1 is applied inline in your JSX to take up remaining space
  },
  customVerifyBtn: {
    marginLeft: normalize(10),
    height: normalize(44), // Matches baseInput height exactly
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: normalize(8),
    paddingHorizontal: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyText: {
    color: colors.primary,
    fontSize: normalize(12),
    fontWeight: 'bold',
    // fontFamily: typography.fontFamily.medium,
  },
});

export default SignupScreen;

// // src/screens/Auth/SignupScreen.js
// import React, {useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   ImageBackground,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import {BackgroundRectImgBg, Logo} from '../../../assets/startUpImg';
// import normalize from '../../../utils/normalize';
// import {colors, typography} from '../../../theme';
// import SvgRenderer from '../../components/SvgRenderer';
// import AppText from '../../components/AppText';
// import AppButton from '../../components/AppButton';
// import TextField from '../../components/TextField';
// import Footer from '../../components/Footer';
// import {useNavigation} from '@react-navigation/native';

// // Mock data to visualize the UI
// const MOCK_SECTION = {
//   title: 'Create Account',
//   fields: [
//     {
//       id: 1,
//       fieldName: 'full_name',
//       label: 'Full Name',
//       fieldType: 'Text',
//       placeholder: 'John Doe',
//     },
//     {
//       id: 2,
//       fieldName: 'email',
//       label: 'Email',
//       fieldType: 'Email',
//       placeholder: 'email@example.com',
//     },
//     {
//       id: 3,
//       fieldName: 'password',
//       label: 'Password',
//       fieldType: 'Password',
//       placeholder: '******',
//     },
//   ],
//   buttons: [{id: 'next', label: 'Next', type: 'primary'}],
//   footer: {
//     text: 'Already have an account?',
//     linkText: 'Login',
//   },
// };

// const SignupScreen = ({route}) => {
//   const navigation = useNavigation();
//   const params = route?.params || {};
//   const [fieldValues, setFieldValues] = useState({});

//   const handleChange = (field, value) => {
//     setFieldValues(prev => ({...prev, [field]: value}));
//   };

//   return (
//     <View style={styles.container}>
//       <Logo style={styles.icon} />

//       <View style={styles.childContainer}>
//         <ImageBackground
//           source={BackgroundRectImgBg}
//           style={styles.svgBackground}
//           resizeMode="cover">
//           <View style={styles.childContainer1}>
//             {/* Avatar Header */}
//             <View style={styles.iconView}>
//               <SvgRenderer
//                 name={
//                   params.userType === 'merchant'
//                     ? 'merchantIcon'
//                     : params.userType === 'Academia'
//                     ? 'instituteIcon'
//                     : 'userIcon'
//                 }
//                 width={64}
//                 height={70}
//               />
//             </View>

//             <ScrollView
//               bounces={false}
//               style={styles.form}
//               contentContainerStyle={styles.contentContainer}
//               showsVerticalScrollIndicator={false}>
//               <AppText style={styles.title}>{MOCK_SECTION.title}</AppText>

//               {MOCK_SECTION.fields.map(field => (
//                 <TextField
//                   key={field.id}
//                   label={field.label}
//                   value={fieldValues[field.fieldName] || ''}
//                   placeholder={field.placeholder || ''}
//                   secureTextEntry={field.fieldType === 'Password'}
//                   onChangeText={text => handleChange(field.fieldName, text)}
//                 />
//               ))}

//               <View style={styles.buttonWrapper}>
//                 {MOCK_SECTION.buttons.map(btn => (
//                   <AppButton
//                     key={btn.id}
//                     title={btn.label}
//                     type={btn.type === 'secondary' ? 'secondary' : 'primary'}
//                     onPress={() => console.log(`${btn.label} pressed`)}
//                     style={{marginVertical: normalize(10)}}
//                   />
//                 ))}
//               </View>

//               <Footer
//                 text={MOCK_SECTION.footer.text}
//                 linkText={MOCK_SECTION.footer.linkText}
//                 onPressLink={() =>
//                   navigation.replace('LoginScreen', {
//                     userType: params.userType,
//                   })
//                 }
//               />
//             </ScrollView>
//           </View>
//         </ImageBackground>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     marginTop: Platform.OS === 'android' ? normalize(2) : normalize(40),
//     backgroundColor: colors.white,
//   },
//   contentContainer: {
//     paddingBottom: normalize(100),
//   },
//   childContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: normalize(70),
//     width: '100%',
//     height: '100%',
//   },
//   childContainer1: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: normalize(70),
//     width: '100%',
//     height: '100%',
//     position: 'absolute',
//     top: -120,
//     left: 0,
//   },
//   svgBackground: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//   },
//   iconView: {
//     alignItems: 'center',
//     marginBottom: normalize(20),
//     backgroundColor: colors.white,
//     borderRadius: normalize(35),
//     width: normalize(126),
//     height: normalize(126),
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: colors.lightOrange,
//     zIndex: 1,
//   },
//   icon: {
//     height: 64,
//     marginTop: normalize(20),
//   },
//   form: {
//     flex: 1,
//     paddingHorizontal: normalize(32),
//     paddingVertical: normalize(14),
//     width: '100%',
//   },
//   title: {
//     fontFamily: typography.fontFamily.medium,
//     fontSize: normalize(18),
//     lineHeight: normalize(24),
//     fontWeight: '500',
//     marginBottom: normalize(16),
//     textAlign: 'center',
//     color: colors.primary,
//   },
//   buttonWrapper: {
//     marginTop: normalize(20),
//   },
// });

// export default SignupScreen;
