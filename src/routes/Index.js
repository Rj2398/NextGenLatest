import React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- Import all components ---
import TabsComponent from './TabsComponent';
import LoginScreen from '../views/pages/authentication/LoginScreen';
import SignupScreen from '../views/pages/authentication/SignupScreen';
import ForgotScreen from '../views/pages/authentication/ForgotScreen';
import Verification from '../views/pages/authentication/Verification';
import DealsDiscountScreen from '../views/pages/onBoardScreen/DealsDiscountScreen';
import CreateDeal from '../views/pages/onBoardScreen/CreateDeal';
import AssignProducts from '../views/pages/onBoardScreen/AssignProducts';
import BulkUpload from '../views/pages/onBoardScreen/BulkUpload';
import AddNewProduct from '../views/pages/onBoardScreen/AddNewProduct';

//Add by Rajan

import HelpSupport from '../views/pages/onBoardScreen/HelpSupport';
import CreateTicket from '../views/pages/onBoardScreen/CreateTicket';
import ViewTicket from '../views/pages/onBoardScreen/ViewTicket';
import Security from '../views/pages/onBoardScreen/Security';
import Terms from '../views/pages/onBoardScreen/TeamSupport';
import TeamSupport from '../views/pages/onBoardScreen/TeamSupport';
import CreateOperator from '../views/pages/onBoardScreen/CreateOperator';
import CreateUser from '../views/pages/onBoardScreen/CreateUser';
import MyPost from '../views/pages/onBoardScreen/MyPost';
import CreatePost from '../views/pages/onBoardScreen/CreatePost';
import EditPost from '../views/pages/onBoardScreen/EditPost';
import CreateDepartment from '../views/pages/onBoardScreen/CreateDepartment';

import CreateAd from '../views/pages/onBoardScreen/CreateAd';
import ReportsScreen from '../views/pages/onBoardScreen/ReportsScreen';
import OrdersScreen from '../views/pages/onBoardScreen/OrdersScreen';
import OrderDetailsScreen from '../views/pages/onBoardScreen/OrderDetailsScreen';
import ReviewScreen from '../views/pages/onBoardScreen/ReviewScreen';
import ReviewDetailScreen from '../views/pages/onBoardScreen/ReviewDetailScreen';
import MerchantProfileScreen from '../views/pages/onBoardScreen/MerchantProfileScreen';
import Account from '../views/pages/onBoardScreen/Account';
import InventoryScreen from '../views/pages/onBoardScreen/InventoryScreen';
import Bazar from '../views/pages/user/Bazar';
import AllBazar from '../views/pages/user/AllBaazar';
import UserProductDetail from '../views/pages/user/UserProductDetail';
import UserRating from '../views/pages/user/UserRating';
import MyCart from '../views/pages/user/MyCart';
import CheckoutScreen from '../views/pages/user/CheckoutScreen';
import ConfirmationScreen from '../views/pages/user/ConfirmationScreen';
import PaymentMethod from '../views/pages/user/PaymentMethod';
import ShippingAddressScreen from '../views/pages/user/ShippingAddressScreen';
import AddShippingAddressScreen from '../views/pages/user/AddShippingAddressScreen';
import AccountSettingsScreen from '../views/pages/user/AccountSettingsScreen';
import StartUpScreen from '../views/pages/StartUpScreen';
import InstituteListScreen from '../views/pages/user/InstitueListScreen';
import UserDeleteAccountScreen from '../views/pages/user/UserDeleteAccountScreen';
import UserEmailSuccessScreen from '../views/pages/user/UserEmailSuccessScreen';
import UserEmailSupportScreen from '../views/pages/user/UserEmailSupport';
import UserMyOrdersScreen from '../views/pages/user/UserMyOrdersScreen';
import UserOrderDetail from '../views/pages/user/UserOrderDetail';
import UserOrderDetailRefund from '../views/pages/user/UserOrderDetailRefund';
import PaymentHelpScreen from '../views/pages/user/UserPaymentHelp';
import UserRatingReviewsScreen from '../views/pages/user/UserRatingReviewsScreen';
import UsersWriteReviewScreen from '../views/pages/user/UsersWriteReviewScreen';
import ConfirmPickup from '../views/pages/user/ConfirmPickup';
import Return from '../views/pages/user/Return';
import Students from '../views/pages/user/Students';
import StudentDetails from '../views/pages/user/StudentDetails';
import AssociatedInstitutes from '../views/pages/user/AssociatedInstitutes';
import DeliveryTracking from '../views/pages/user/DeliveryTracking';
import HelpCenter from '../views/pages/user/HelpCenter';
import CustomMenuButton from '../views/components/DrawerHeader/CustomMenuButton';
import {setUserDashboardModalToggle} from '../store/slices/userSlice';
import {colors} from '../config/colors';
import {OnboardingScreen} from '../views/pages/authentication/OnboardingScreen';
import {LanguageSelectionScreen} from '../views/pages/authentication/LanguageSelectionScreen';
import EmailSentScreen from '../views/pages/authentication/EmailSentScreen';
import CreatePasswordScreen from '../views/pages/authentication/CreatePasswordScreen';

const Stack = createNativeStackNavigator();

// --- AuthLoadingScreen: Ensures history is cleared ---
// const AuthLoadingScreen = () => {
//   const navigation = useNavigation();
//   const {userInfo} = useSelector(({user}) => user);

//   React.useEffect(() => {
//     const destination = userInfo ? 'Dashboard' : 'LoginScreen';
//     // ✅ FIX: Use replace() to remove AuthLoadingScreen from the stack.
//     navigation.replace(destination);
//   }, [userInfo, navigation]);

//   return (
//     <View style={loadingStyles.loadingContainer}>
//       <ActivityIndicator size="large" color="#ED8A00" />
//     </View>
//   );
// };
// --------------------------------------------------------

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

// const customHeaderOptions = ({navigation}) => ({
//   headerShown: true,
//   headerLeft: () => <CustomMenuButton navigation={navigation} />,
//   headerTitle: () => (
//     <View
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       <Image
//         source={require('../assets/images/nextgenlogo.png')}
//         style={{
//           width: 110, // Adjust size
//           height: 30,
//         }}
//         resizeMode="contain"
//       />
//     </View>
//   ),
//   headerRight: () => (
//     <TouchableOpacity
//       onPress={() => {
//         dispatch(setUserDashboardModalToggle(true));
//       }}
//       style={{
//         padding: 6,
//         marginRight: 10,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: '#ddd',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       <Ionicons name="swap-horizontal-outline" size={24} color={'#333'} />
//     </TouchableOpacity>
//   ),
//   headerStyle: {},
//   headerTitleAlign: 'center',
// });

export default function Routes({navigationRef, isReadyRef}) {
  const {userInfo, useTypeStore} = useSelector(({user}) => user);
  console.log(userInfo, 'user info of the **');

  console.log(useTypeStore, 'Test*******22');
  const isLoggedIn = !!userInfo?.userId;
  // const isLoggedIn = !!userInfo;
  console.log(isLoggedIn, 'isLoggedIn', userInfo?.userId);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={theme}
      initialRouteName="StartUpScreen">
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        //   initialRouteName="LoginScreen"
        // screenOptions={customHeaderOptions}
      >
        {!isLoggedIn ? (
          <>
            {/* 2. Authentication Flow Screens */}

            <Stack.Screen
              name="LanguageSelection"
              component={LanguageSelectionScreen}
            />

            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="StartUpScreen" component={StartUpScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="EmailSentScreen" component={EmailSentScreen} />
            <Stack.Screen
              name="SignupScreen"
              component={SignupScreen}
              // options={{
              //   headerShown: false,
              // }}
            />
            <Stack.Screen
              name="ForgotScreen"
              component={ForgotScreen}
              // options={{
              //   headerShown: false,
              // }}
            />
            <Stack.Screen
              name="Verification"
              component={Verification}
              // options={{
              //   headerShown: false,
              // }}
            />
            <Stack.Screen
              name="CreatePassword"
              component={CreatePasswordScreen}
            />
          </>
        ) : (
          <>
            {/* 3. Main Application Flow Target */}
            {/* This screen name 'Dashboard' is the target for navigation.replace() */}
            <Stack.Screen name="Dashboard" component={TabsComponent} />

            <Stack.Screen
              name="DealsDiscountScreen"
              component={DealsDiscountScreen}
            />
            <Stack.Screen name="CreateDeal" component={CreateDeal} />
            <Stack.Screen name="AssignProducts" component={AssignProducts} />
            <Stack.Screen name="BulkUpload" component={BulkUpload} />
            <Stack.Screen name="AddNewProduct" component={AddNewProduct} />

            <Stack.Screen
              name="CreateDepartment"
              component={CreateDepartment}
            />

            <Stack.Screen name="CreateAd" component={CreateAd} />

            <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
            <Stack.Screen name="OrdersScreen" component={OrdersScreen} />

            <Stack.Screen
              name="OrderDetailsScreen"
              component={OrderDetailsScreen}
            />

            <Stack.Screen name="ReviewScreen" component={ReviewScreen} />

            <Stack.Screen
              name="ReviewDetailScreen"
              component={ReviewDetailScreen}
            />

            <Stack.Screen
              name="MerchantProfileScreen"
              component={MerchantProfileScreen}
            />

            <Stack.Screen name="Accounts" component={Account} />

            <Stack.Screen name="HelpSupport" component={HelpSupport} />
            <Stack.Screen name="InventoryScreen" component={InventoryScreen} />
            <Stack.Screen name="Team" component={TeamSupport} />
            <Stack.Screen name="CreateUsers" component={CreateUser} />
            <Stack.Screen name="CreateOperat" component={CreateOperator} />
            <Stack.Screen name="Securit" component={Security} />
            <Stack.Screen name="CreateTick" component={CreateTicket} />
            <Stack.Screen name="ViewTicket" component={ViewTicket} />
            {/* Add by Rajan*/}
            {/* 
   
            <Stack.Screen name="MyPost" component={MyPost} />
           <Stack.Screen name="CreatePost" component={CreatePost} />
            <Stack.Screen name="EditPost" component={EditPost} /> */}

            {/* User Module*/}
            <Stack.Screen name="Bazar" component={Bazar} />
            <Stack.Screen name="AllBazar" component={AllBazar} />
            <Stack.Screen
              name="UserProductDetail"
              component={UserProductDetail}
            />
            <Stack.Screen name="UserRating" component={UserRating} />
            <Stack.Screen name="MyCart" component={MyCart} />
            <Stack.Screen
              name="CheckoutScreen"
              component={CheckoutScreen}></Stack.Screen>
            <Stack.Screen
              name="Confirmation"
              component={ConfirmationScreen}></Stack.Screen>
            <Stack.Screen
              name="PaymentMethod"
              component={PaymentMethod}></Stack.Screen>
            <Stack.Screen
              name="ShippingAddress"
              component={ShippingAddressScreen}
            />
            <Stack.Screen
              name="AddShippingAddressScreen"
              component={AddShippingAddressScreen}
            />
            <Stack.Screen
              name="AccountSettingsScreen"
              component={AccountSettingsScreen}
            />

            <Stack.Screen
              name="UserDeleteAccountScreen"
              component={UserDeleteAccountScreen}
            />
            <Stack.Screen
              name="UserEmailSuccessScreen"
              component={UserEmailSuccessScreen}
            />
            <Stack.Screen
              name="UserEmailSupportScreen"
              component={UserEmailSupportScreen}
            />
            <Stack.Screen
              name="UserMyOrdersScreen"
              component={UserMyOrdersScreen}
            />
            <Stack.Screen name="UserOrderDetail" component={UserOrderDetail} />
            <Stack.Screen
              name="UserOrderDetailRefund"
              component={UserOrderDetailRefund}
            />
            <Stack.Screen
              name="PaymentHelpScreen"
              component={PaymentHelpScreen}
            />
            <Stack.Screen
              name="UserRatingReviewsScreen"
              component={UserRatingReviewsScreen}
            />
            <Stack.Screen
              name="UsersWriteReviewScreen"
              component={UsersWriteReviewScreen}
            />
            {/* rajan */}
            <Stack.Screen name="HelpCenter" component={HelpCenter} />

            <Stack.Screen
              name="DeliveryTracking"
              component={DeliveryTracking}
            />
            <Stack.Screen
              name="AssociatedInstitutes"
              component={AssociatedInstitutes}
            />
            <Stack.Screen name="StudentDetails" component={StudentDetails} />

            <Stack.Screen name="Students" component={Students} />
            <Stack.Screen name="Return" component={Return} />

            <Stack.Screen name="ConfirmPickup" component={ConfirmPickup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const loadingStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  //12-12-2025
  centerContainer: {
    // Style the container for the logo/text
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 110, // Adjust size
    height: 30, // Adjust size
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: colors.textDark,
  },
  rightButton: {
    // Styling the right button to match the rounded box in your image
    padding: 6,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
