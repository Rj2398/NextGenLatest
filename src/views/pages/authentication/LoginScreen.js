import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {
  BackgroundRectImgBg,
  Logo,
  UserLogo,
  InstituteLogo,
  MerchantLogo,
} from '../../../assets/startUpImg';
import {useNavigation} from '@react-navigation/native';
import useAuth from '../../../hooks/useAuth';
import {showErrorToast, showSuccessToast} from '../../../config/Toast';
import {useToast} from 'react-native-toast-notifications';
import normalize from '../../../utils/normalize';
import {colors} from '../../../theme';

const {width} = Dimensions.get('window');

const LoginScreen = ({route}) => {
  const {userType} = route.params;
  const navigation = useNavigation();
  const toast = useToast();
  const {loginUser} = useAuth();

  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!usernameEmail.trim()) {
      showErrorToast(toast, 'Please enter your email');
      return;
    }
    if (!password.trim()) {
      showErrorToast(toast, 'Please enter your password');
      return;
    }

    try {
      const response = await loginUser({
        usernameOrEmail: usernameEmail,
        password,
      });
      if (response)
        showSuccessToast(toast, response?.message || 'Login successful!');
    } catch (error) {
      showErrorToast(toast, error.message || 'Login failed');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.logoContainer}>
          <Logo style={styles.logo} />
        </View>
      </View>
      <ImageBackground
        source={BackgroundRectImgBg}
        style={styles.background}
        resizeMode="cover">
        <SafeAreaView style={styles.container}>
          <View
            style={[
              styles.avatarCircle,
              {borderRadius: userType === 'User' ? 65 : 15},
            ]}>
            <Image
              source={
                userType === 'User'
                  ? UserLogo
                  : userType === 'Academia'
                  ? InstituteLogo
                  : MerchantLogo
              }
              style={styles.avatarIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>
            {userType == 'User'
              ? 'User'
              : userType == 'Academia'
              ? 'Academia'
              : 'Merchant'}{' '}
            Login
          </Text>

          {/* Email Field */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>
              Enter Username / Email <Text style={styles.asterisk}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              placeholderTextColor="#aaa"
              value={usernameEmail}
              onChangeText={setUsernameEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Field */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>
              Password <Text style={styles.asterisk}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>

          {/* Register Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              New here ?{' '}
              <Text
                style={styles.registerLink}
                onPress={() => navigation.navigate('SignupScreen', {userType})}>
                Register Now
              </Text>
            </Text>
          </View>
          <View style={[styles.footer, {marginTop: 15}]}>
            <Text style={styles.footerText}>
              <Text
                style={styles.registerLink}
                onPress={() => navigation.replace('ForgotScreen', {userType})}>
                Forget Password
              </Text>
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Top Logo
  logoContainer: {position: 'absolute', top: 70, alignItems: 'center'},
  logo: {resizeMode: 'contain'},
  tagline: {marginTop: 6, fontSize: 13, color: '#FF8719', fontWeight: '600'},

  // Main Card

  // Orange Circle Avatar
  avatarCircle: {
    alignItems: 'center',
    marginBottom: normalize(20),
    backgroundColor: colors.white,
    borderRadius: normalize(35),
    width: normalize(126),
    height: normalize(126),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.lightOrange,
    top: -70,
    position: 'absolute',
    zIndex: 9,
  },
  avatarIcon: {width: 86, height: 86},

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FF8719',
    marginBottom: 32,
  },

  inputWrapper: {width: '80%', marginBottom: 20},
  label: {fontSize: 14, color: '#555', marginBottom: 8, fontWeight: '500'},
  asterisk: {color: '#FF3B30'},
  input: {
    height: 52,
    backgroundColor: '#F8F8F8',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },

  loginBtn: {
    width: '80%',
    backgroundColor: '#FF8719',
    height: 56,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#FF8719',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 12,
  },
  loginBtnText: {color: '#FFF', fontSize: 18, fontWeight: '700'},

  footer: {marginTop: 28},
  footerText: {fontSize: 14.5, color: '#777'},
  registerLink: {color: '#FF8719', fontWeight: '700'},
});

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   Alert,
//   Modal,
//   FlatList,
//   StatusBar,
// } from 'react-native';

// import {BackgroundRectImgBg, Logo} from '../../../assets/startUpImg'; // Adjust the path as necessary

// import {useToast} from 'react-native-toast-notifications';

// // Note: useNavigation must be imported from '@react-navigation/native'
// import {useNavigation} from '@react-navigation/native';
// import useAuth from '../../../hooks/useAuth';
// import {showErrorToast, showSuccessToast} from '../../../config/Toast';
// // import { t } from '../i18n'; // <-- REMOVED

// // ✅ Custom Dropdown Without External Library
// const CustomDropdown = ({label, value, options, onValueChange}) => {
//   const [visible, setVisible] = useState(false);

//   return (
//     <View style={styles.dropdownContainer}>
//       <Text style={styles.inputLabel}>
//         {label} {/* Removed t() */}
//         <Text style={styles.requiredAsterisk}>*</Text>
//       </Text>

//       <TouchableOpacity
//         style={styles.dropdownInput}
//         onPress={() => setVisible(true)}>
//         <Text style={styles.dropdownValue}>
//           {value || 'Select option'} {/* Removed t() */}
//         </Text>
//         <Text style={styles.dropdownArrow}>▼</Text>
//       </TouchableOpacity>

//       {/* Modal dropdown */}
//       <Modal
//         visible={visible}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setVisible(false)}>
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPressOut={() => setVisible(false)}>
//           <View style={styles.modalBox}>
//             <FlatList
//               data={options}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({item}) => (
//                 <TouchableOpacity
//                   style={styles.optionItem}
//                   onPress={() => {
//                     onValueChange(item.value);
//                     setVisible(false);
//                   }}>
//                   <Text style={styles.optionText}>{item.label}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// };

// // --- Main Functional Component: LoginScreen ---
// const LoginScreen = ({route}) => {
//   const {userType} = route.params;
//   // 🔑 Access navigation hook
//   const navigation = useNavigation();
//   const toast = useToast();
//   const {loginUser} = useAuth();

//   // 🔑 Use useState for state management
//   const [loginAs, setLoginAs] = useState('Merchant');
//   const [usernameEmail, setUsernameEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const loginOptions = [
//     {label: 'Merchant', value: 'Merchant'},
//     {label: 'Academia', value: 'Academia'},
//   ];

//   // --- Core Function: Handles Login Success and Navigation ---

//   const handleLogin = async () => {
//     if (!usernameEmail.trim()) {
//       showErrorToast(toast, 'Please enter your username or email.');
//       return;
//     }
//     if (!password.trim()) {
//       showErrorToast(toast, 'Please enter your password.');
//       return;
//     }
//     console.log('call transfer***');
//     //  navigation.replace('Dashboard');
//     try {
//       const response = await loginUser({
//         usernameOrEmail: usernameEmail,
//         password: password,
//       });
//       if (response) {
//         showSuccessToast(toast, response?.message);
//       } else {
//         showErrorToast(
//           toast,
//           response.message || 'Invalid username or password.',
//         );
//       }
//     } catch (error) {
//       showErrorToast(
//         toast,
//         error.message || 'Login failed. Please check your connection.',
//       );
//     }
//   };
//   //

//   const handleRegister = () => {
//     // navigation.navigate('GenRegister');
//     Alert.alert('Navigation', 'Navigate to Registration Screen'); // Removed t()
//   };

//   const handleForgotPassword = () => {
//     // navigation.navigate('ForgotScreen');
//     Alert.alert('Navigation', 'Navigate to Forgot Password Screen'); // Removed t()
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         {/* 👇 Change Status Bar Color using Colors.PRIMARY */}
//         <StatusBar
//           backgroundColor={styles.Colors.PRIMARY}
//           barStyle="light-content"
//         />
//         <View style={styles.logoContainer}>
//           <Image
//             source={require('../../../assets/nextlogo.png')}
//             style={styles.logoImage}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.welcomeText}>Welcome Back</Text>{' '}
//           {/* Removed t('welcome_back') */}
//           {/* ✅ Custom Dropdown */}
//           <CustomDropdown
//             label="Login as" // Hardcoded label
//             value={loginAs}
//             options={loginOptions}
//             onValueChange={setLoginAs}
//           />
//           {/* Username/Email */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>
//               Enter Username / Email {/* Removed t() */}
//               <Text style={styles.requiredAsterisk}>*</Text>
//             </Text>
//             <TextInput
//               style={styles.textInput}
//               placeholder={'Email or Mobile'} // Replaced with a common placeholder
//               placeholderTextColor={styles.Colors.BLACK}
//               value={usernameEmail}
//               onChangeText={setUsernameEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>
//           {/* Password */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>
//               Password {/* Removed t() */}
//               <Text style={styles.requiredAsterisk}>*</Text>
//             </Text>
//             <TextInput
//               style={styles.textInput}
//               placeholder={'Enter Password'} // Removed t()
//               placeholderTextColor={styles.Colors.BLACK}
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//           </View>
//           {/* --- Link to Forgot Password --- */}
//           <TouchableOpacity
//             style={styles.forgotPasswordContainer}
//             onPress={handleForgotPassword}>
//             <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>{' '}
//             {/* Removed t() */}
//           </TouchableOpacity>
//           {/* Login Button */}
//           <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//             <Text style={styles.loginButtonText}>Login</Text>{' '}
//             {/* Removed t() */}
//           </TouchableOpacity>
//           {/* Register Link */}
//           <View style={styles.registerContainer}>
//             <Text style={styles.registerText}>
//               New here ? {/* Removed t() */}
//               <Text style={styles.registerLink} onPress={handleRegister}>
//                 Register Now {/* Removed t() */}
//               </Text>
//             </Text>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// // ✅ Styles remain unchanged, including the Colors object
// const styles = StyleSheet.create({
//   // 🎨 COLOR PALETTE DEFINITION
//   Colors: {
//     PRIMARY: '#FF8719', // Main Brand Orange
//     LINK_ORANGE: '#ff9933', // Lighter Orange for links
//     BACKGROUND_WHITE: '#FBFAF9', // Light off-white background
//     CARD_WHITE: '#fff', // Pure White card/modal background
//     BLACK: '#000000', // Black text/placeholder
//     DARK_GREY: '#333', // Dark text
//     MEDIUM_GREY: '#555', // Secondary text/Arrow color
//     LIGHT_GREY_BORDER: '#ddd', // Input border
//     LIGHTEST_GREY: '#eee', // Separator line in modal
//     RED_ERROR: 'red', // Asterisk
//     TRANSPARENT_OVERLAY: 'rgba(0,0,0,0.5)', // Modal overlay
//   },

//   safeArea: {
//     flex: 1,
//     backgroundColor: '#FBFAF9',
//   },
//   container: {
//     flex: 1,
//     paddingTop: 40,
//     alignItems: 'center',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   logoImage: {
//     width: 125,
//     height: 50,
//     marginBottom: 5,
//   },
//   card: {
//     width: '90%',
//     maxWidth: 400,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     elevation: 3,
//   },
//   welcomeText: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: 20,
//     color: '#000000',
//     fontFamily: 'Roboto',
//     width: 500,
//   },
//   inputLabel: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 5,
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     borderRadius: 5,
//     fontSize: 16,
//     color: '#000000',
//     fontFamily: 'Roboto',
//     fontWeight: '600',
//   },
//   dropdownContainer: {
//     marginBottom: 15,
//   },
//   dropdownInput: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
//   dropdownValue: {
//     fontSize: 16,
//     color: '#333',
//   },
//   dropdownArrow: {
//     fontSize: 12,
//     color: '#555',
//   },
//   requiredAsterisk: {
//     color: 'red',
//     fontWeight: 'bold',
//   },
//   forgotPasswordContainer: {
//     alignItems: 'flex-end',
//     marginBottom: 10,
//   },
//   forgotPasswordLink: {
//     color: '#555',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   loginButton: {
//     backgroundColor: '#FF8719',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   registerContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   registerText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   registerLink: {
//     color: '#ff9933',
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalBox: {
//     backgroundColor: '#fff',
//     marginHorizontal: 40,
//     borderRadius: 8,
//     paddingVertical: 10,
//     maxHeight: 250,
//   },
//   optionItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   optionText: {
//     fontSize: 16,
//     color: '#000',
//   },
// });
