import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Icon Import
import Ionicons from 'react-native-vector-icons/Ionicons';

import Reports from '../views/pages/onBoardScreen/Reports';
import Manage from '../views/pages/onBoardScreen/Manage';
import Dashboard from '../views/pages/onBoardScreen/Dashboard';
import Inventory from '../views/pages/onBoardScreen/Inventory';
import CreateAd from '../views/pages/onBoardScreen/CreateAd';
import MyAds from '../views/pages/onBoardScreen/MyAds';
import Billing from '../views/pages/onBoardScreen/Billing';
import ReportsScreen from '../views/pages/onBoardScreen/ReportsScreen';
import OrdersScreen from '../views/pages/onBoardScreen/OrdersScreen';
import ReviewScreen from '../views/pages/onBoardScreen/ReviewScreen';
import InventoryListScreen from '../views/pages/onBoardScreen/InventoryListScreen';
import MerchantProfileScreen from '../views/pages/onBoardScreen/MerchantProfileScreen';

import {
  clearUser,
  setUserDashboardModalToggle,
  setUserInfo,
} from '../store/slices/userSlice';

import {useDispatch, useSelector} from 'react-redux';
import InstituteListScreen from '../views/pages/user/InstitueListScreen';
import CustomMenuButton from '../views/components/DrawerHeader/CustomMenuButton';
import {useNavigation} from '@react-navigation/native';
import Bazar from '../views/pages/user/Bazar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// --- Centralized Color Definitions ---
const colors = {
  white: '#FFFFFF',
  primaryOrange: '#FF7A00', // active icon/text
  secondaryOrange: '#FF7A00',
  textDark: '#333',
  textMedium: '#5F6368',
  textLight: '#757575',
  roleDark: '#1E1E1E',
  borderLight: '#ddd',
  activeBackground: '#FFFAF5', // active background pill
};

const localIcons = {
  drawer_click: require('./../assets/drawer_click.png'),
  nextlogo: require('./../assets/nextlogo.png'),
  dashboard: require('./../assets/dashboard.png'),
  inventory: require('./../assets/inventory.png'),
  ads: require('./../assets/ads.png'),
  manage: require('./../assets/manage.png'),
  orders: require('./../assets/orders.png'),
  reports: require('./../assets/reports.png'),
  billing: require('./../assets/billing.png'),
  // fallback icon keys for Ionicons usage
  'home-outline': 'home-outline',
  'list-outline': 'list-outline',
  'bar-chart-outline': 'bar-chart-outline',
  'settings-outline': 'settings-outline',
  'log-out-outline': 'log-out-outline',
};

// Map screen names to their visible titles and preferred icons
const screenMap = [
  {name: 'DashboardHome', title: 'Dashboard', iconKey: 'dashboard'},
  {name: 'Inventory', title: 'Inventory', iconKey: 'inventory'},
  {name: 'Reports', title: 'Reports', iconKey: 'reports'},
  {name: 'Orders', title: 'Orders', iconKey: 'orders'},
  {name: 'Manage', title: 'Manage', iconKey: 'manage'},
  {name: 'Teams', title: 'Teams', iconKey: 'orders'},
  {name: 'ReviewsAndRatings', title: 'Reviews and Ratings', iconKey: 'manage'},
  {
    name: 'ReportsAndAnalytics',
    title: 'Reports and Analytics',
    iconKey: 'bar-chart-outline',
  },
  {name: 'Billing', title: 'Billing', iconKey: 'billing'},
  {name: 'Ads', title: 'Ads', iconKey: 'ads'},
];

// --- CustomDrawerItem ---
const CustomDrawerItem = ({
  title,
  iconKey,
  onPress,
  active,
  isIonicons = false,
}) => {
  const {useTypeStore} = useSelector(({user}) => user);
  const isActive = !!active;
  const iconColor = isActive ? colors.primaryOrange : colors.textDark;
  const textColor = isActive ? colors.primaryOrange : colors.textMedium;

  const renderIcon = () => {
    const ioniconsFallbacks = [
      'home-outline',
      'list-outline',
      'bar-chart-outline',
      'settings-outline',
      'log-out-outline',
    ];
    if (isIonicons || ioniconsFallbacks.includes(iconKey)) {
      return <Ionicons name={iconKey} size={22} color={iconColor} />;
    } else if (localIcons[iconKey]) {
      return (
        <Image
          source={localIcons[iconKey]}
          style={{
            width: 22,
            height: 22,
            tintColor: iconColor,
          }}
          resizeMode="contain"
        />
      );
    } else {
      return <Ionicons name="ellipse" size={22} color={iconColor} />;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.menuItem, isActive ? styles.activeMenu : null]}
      onPress={onPress}
      activeOpacity={0.7}>
      {renderIcon()}
      <Text style={[styles.menuText, {color: textColor}]}>
        {useTypeStore === 'User'
          ? title === 'Inventory'
            ? 'My Posts'
            : title
          : title}
      </Text>
    </TouchableOpacity>
  );
};

// --- Custom Drawer Content ---
// NOTE: changed to track local selectedRoute. Initially null => no selection shown.
// Only set when user taps an item.
function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const {userInfo, userTypeStore} = useSelector(({user}) => user);
  // local state — starts null to avoid any default active selection
  const [selectedRoute, setSelectedRoute] = useState(
    userTypeStore !== 'User' ? 'Inventory' : 'My Posts',
  );

  // Filter items to only show the screens defined in the Drawer.Navigator
  const navigableRoutes = props.state.routes.map(route => route.name);
  const displayedItems = screenMap.filter(item =>
    navigableRoutes.includes(item.name),
  );

  // Logout item
  const logoutItem = {
    name: 'Logout',
    title: 'Logout',
    iconKey: 'log-out-outline',
    isIonicons: true,
    onPress: () => {
      // do logout
      dispatch(setUserInfo(null));
      // clear any selected highlight if you want
      setSelectedRoute(null);
      dispatch(clearUser());
    },
  };

  // handle press: set selected route and navigate
  const handlePress = name => {
    setSelectedRoute(name); // <-- only set when user taps
    props.navigation.navigate(name);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop: 0}}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.statusAndAmountRow}>
          {/* <Image
            source={localIcons.drawer_click}
            style={styles.drawerIcon}
            resizeMode="contain"
          /> */}
          <View style={{flex: 1, marginHorizontal: 20, margin: 9}}>
            <Image
              source={localIcons.nextlogo}
              style={styles.centerLogo}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.profileRow}>
          <Image
            source={{uri: 'https://i.pravatar.cc/100'}}
            style={styles.avatar}
          />
          <View style={[styles.textContainer, {marginStart: 10}]}>
            <Text style={styles.name}>{userInfo?.name || 'Jane Doe'}</Text>
            <Text style={styles.role}>{userInfo?.role || 'Store Admin'}</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {displayedItems.map((item, index) => (
          <CustomDrawerItem
            key={index}
            title={item.title}
            iconKey={item.iconKey}
            active={item.name === selectedRoute} // use local selectedRoute only
            onPress={() => handlePress(item.name)}
          />
        ))}

        {/* Divider + Logout */}
        <View style={styles.divider} />
        <CustomDrawerItem
          title={logoutItem.title}
          iconKey={logoutItem.iconKey}
          onPress={logoutItem.onPress}
          isIonicons={true}
        />
      </View>
    </DrawerContentScrollView>
  );
}

// --- Dashboard Stack ---
const DashboardStack = () => {
  const navigation = useNavigation();
  const {useTypeStore} =
    useSelector(({user}) => user) || AsyncStorage.getItem('userType');
  console.log(navigation, 'navigationnavigation');

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {useTypeStore === 'User' ? (
        <>
          <Stack.Screen
            name="InstituteListScreen"
            component={InstituteListScreen}
          />
          {/* <Stack.Screen name="Bazar" component={Bazar} /> */}
        </>
      ) : (
        <Stack.Screen name="Inventory" component={InventoryListScreen} />
      )}
    </Stack.Navigator>
  );
};

// --- Main Drawer Component ---
const DrawerComponent = () => {
  const {useTypeStore} = useSelector(({user}) => user);
  const dispatch = useDispatch();

  return (
    <Drawer.Navigator
      id="MainDrawer"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colors.primaryOrange,
        drawerInactiveTintColor: colors.textMedium,
        drawerActiveBackgroundColor: colors.activeBackground,
        drawerItemStyle: {marginVertical: 0, paddingHorizontal: 0},
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Inventory"
        component={DashboardStack}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => <CustomMenuButton navigation={navigation} />,
          headerTitle: () => (
            <>
              {useTypeStore === 'User' && (
                <View style={styles.centerContainer}>
                  <Image
                    source={localIcons.nextlogo}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
              )}
            </>
          ),
          headerRight: () => (
            <>
              {useTypeStore === 'User' ? (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setUserDashboardModalToggle(true));
                  }}
                  style={styles.rightButton}>
                  <Ionicons
                    name="swap-horizontal-outline"
                    size={24}
                    color={'#333'}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.centerContainer}>
                  <Image
                    source={localIcons.nextlogo}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
              )}
            </>
          ),
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          },
          headerTitleAlign: 'center',
        })}
      />

      {useTypeStore !== 'User' ? (
        <>
          <Drawer.Screen
            name="Ads"
            component={MyAds}
            options={{
              title: 'Ads',
              drawerIcon: ({color}) => (
                <Image
                  source={localIcons.ads}
                  style={{width: 22, height: 22, tintColor: color}}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="Orders"
            component={OrdersScreen}
            options={{
              title: 'Orders',
              headerShown: false,
              drawerIcon: ({color}) => (
                <Ionicons name="list-outline" size={22} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="Reports"
            component={ReportsScreen}
            options={{
              title: 'Reports',
              headerShown: false,
              drawerIcon: ({color}) => (
                <Ionicons name="bar-chart-outline" size={22} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="Billing"
            component={Billing}
            options={{
              title: 'Billing',
              headerShown: false,
              drawerIcon: ({color}) => (
                <Ionicons name="bar-chart-outline" size={22} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="Manage"
            component={Manage}
            options={{
              title: 'Manage',
              drawerIcon: ({color}) => (
                <Ionicons name="settings-outline" size={22} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="ReviewsAndRatings"
            component={ReviewScreen}
            options={{
              title: 'Reviews and Ratings',
              drawerIcon: ({color}) => (
                <Ionicons name="settings-outline" size={22} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="MerchantProfile"
            component={MerchantProfileScreen}
            options={{
              drawerItemStyle: {display: 'none'},
            }}
          />
        </>
      ) : null}
    </Drawer.Navigator>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: colors.borderLight,
  },
  centerLogo: {
    width: 100,
    height: 40,
  },
  drawerIcon: {
    width: 24,
    height: 24,
    marginStart: 20,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  statusAndAmountRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginStart: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    marginStart: 10,
    borderColor: colors.secondaryOrange,
    borderWidth: 1,
    borderRadius: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: '400',
    marginTop: 5,
    color: colors.textLight,
  },
  role: {
    fontSize: 15,
    color: colors.roleDark,
    fontWeight: '700',
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    marginStart: 32,
    paddingBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  activeMenu: {
    backgroundColor: colors.activeBackground,
    borderRadius: 10,
  },
  menuText: {
    fontSize: 17,
    marginLeft: 15,
    color: colors.textMedium,
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 110,
    height: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  rightButton: {
    padding: 6,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DrawerComponent;

// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';

// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// // Icon Import (Assuming you have Ionicons installed)
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Orders from '../views/pages/onBoardScreen/Orders';
// import Reports from '../views/pages/onBoardScreen/Reports';
// import Manage from '../views/pages/onBoardScreen/Manage';
// import Dashboard from '../views/pages/onBoardScreen/Dashboard';
// import Inventory from '../views/pages/onBoardScreen/Inventory';
// import CreateAd from '../views/pages/onBoardScreen/CreateAd';
// import MyAds from '../views/pages/onBoardScreen/MyAds';
// import Billing from '../views/pages/onBoardScreen/Billing';
// import ReportsScreen from '../views/pages/onBoardScreen/ReportsScreen';
// import OrdersScreen from '../views/pages/onBoardScreen/OrdersScreen';
// import ReviewScreen from '../views/pages/onBoardScreen/ReviewScreen';
// import InventoryListScreen from '../views/pages/onBoardScreen/InventoryListScreen';
// import MerchantProfileScreen from '../views/pages/onBoardScreen/MerchantProfileScreen';
// import {
//   clearUser,
//   setUserDashboardModalToggle,
//   setUserInfo,
// } from '../store/slices/userSlice';
// import {useDispatch, useSelector} from 'react-redux';
// import InstituteListScreen from '../views/pages/user/InstitueListScreen';
// import CustomMenuButton from '../views/components/DrawerHeader/CustomMenuButton';
// import {useNavigation} from '@react-navigation/native';
// import Bazar from '../views/pages/user/Bazar';

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

// // --- Centralized Color Definitions (From DrawerScreen.js) ---
// const colors = {
//   white: '#FFFFFF',
//   primaryOrange: '#FF8719', // Active Menu Text/Icon
//   secondaryOrange: '#FF7A00', // Avatar Border
//   textDark: '#333', // Inactive Menu Icon
//   textMedium: '#5F6368', // Inactive Menu Text
//   textLight: '#757575', // Name Text
//   roleDark: '#1E1E1E', // Role Text
//   borderLight: '#ddd', // Header Border
//   activeBackground: '#FFF6EE', // Active Menu Item Background
// };

// const localIcons = {
//   drawer_click: require('./../assets/drawer_click.png'),
//   nextlogo: require('./../assets/nextlogo.png'),
//   dashboard: require('./../assets/dashboard.png'),
//   inventory: require('./../assets/inventory.png'),
//   ads: require('./../assets/ads.png'),
//   manage: require('./../assets/manage.png'),
//   orders: require('./../assets/orders.png'),
//   reports: require('./../assets/reports.png'),
//   billing: require('./../assets/billing.png'),
//   'home-outline': 'home-outline',
//   'list-outline': 'list-outline',
//   'bar-chart-outline': 'bar-chart-outline',
//   'settings-outline': 'settings-outline',
//   'log-out-outline': 'log-out-outline',
// };

// // Map screen names to their visible titles and preferred icons from the old design
// const screenMap = [
//   // Mapped to React Navigation Screens
//   {name: 'DashboardHome', title: 'Dashboard', iconKey: 'dashboard'},
//   {name: 'Inventory', title: 'Inventory', iconKey: 'inventory'},
//   {name: 'Reports', title: 'Reports', iconKey: 'reports'},
//   {name: 'Orders', title: 'Orders', iconKey: 'orders'},
//   {name: 'Manage', title: 'Manage', iconKey: 'manage'},
//   // Additional items from the old design that don't have a screen defined (Placeholder items)
//   {name: 'Teams', title: 'Teams', iconKey: 'orders'}, // Reusing 'orders' icon
//   {name: 'ReviewsAndRatings', title: 'Reviews and Ratings', iconKey: 'manage'}, // Using Ionicons fallback
//   {
//     name: 'ReportsAndAnalytics',
//     title: 'Reports and Analytics',
//     iconKey: 'bar-chart-outline',
//   }, // Using Ionicons fallback
//   {name: 'Billing', title: 'Billing', iconKey: 'billing'},
//   {name: 'Ads', title: 'Ads', iconKey: 'ads'},
// ];

// const CustomDrawerItem = ({
//   route,
//   title,
//   iconKey,
//   onPress,
//   active,
//   isIonicons = false,
//   dispatch,
// }) => {
//   const isActive = active || false;
//   const iconColor = isActive ? colors.primaryOrange : colors.textDark;

//   const renderIcon = () => {
//     if (isIonicons) {
//       return <Ionicons name={iconKey} size={22} color={iconColor} />;
//     } else if (localIcons[iconKey]) {
//       return (
//         <Image
//           source={localIcons[iconKey]}
//           style={{
//             width: 22,
//             height: 22,
//             tintColor: iconColor,
//           }}
//           resizeMode="contain"
//         />
//       );
//     }
//     // Placeholder if no icon is found
//     return <View style={{width: 22, height: 22}} />;
//   };

//   return (
//     <TouchableOpacity
//       style={[styles.menuItem, isActive ? styles.activeMenu : null]}
//       onPress={onPress}
//       activeOpacity={0.7}>
//       {renderIcon()}
//       <Text
//         style={[
//           styles.menuText,
//           {color: isActive ? colors.primaryOrange : colors.textMedium},
//         ]}>
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// // --- Custom Drawer Content ---
// function CustomDrawerContent(props) {
//   const dispatch = useDispatch();
//   // const {useTypeStore} = useSelector(({user}) => user);
//   // const {useTypeStore} = useSelector(({user}) => user);

//   const {userInfo, userTypeStore} = useSelector(({user}) => user);
//   console.log(userInfo, 'userInfo');
//   // Get the current active route name
//   const currentRouteName = props.state.routeNames[props.state.index];

//   // Filter items to only show the screens defined in the Drawer.Navigator
//   const navigableRoutes = props.state.routes.map(route => route.name);

//   // Combine the defined screens with the custom look from screenMap
//   const displayedItems = screenMap.filter(item =>
//     navigableRoutes.includes(item.name),
//   );

//   // Add Logout item separately
//   const logoutItem = {
//     name: 'Logout',
//     title: 'Logout',
//     iconKey: 'log-out-outline',
//     isIonicons: true,
//     onPress: () => dispatch(setUserInfo(null)),
//   };

//   return (
//     <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop: 0}}>
//       {/* Header with logo and profile (from DrawerScreen.js) */}
//       <View style={styles.header}>
//         <View style={styles.statusAndAmountRow}>
//           <Image
//             source={localIcons.drawer_click}
//             style={styles.drawerIcon}
//             resizeMode="contain"
//           />
//           <View style={{flex: 1, alignItems: 'center'}}>
//             <Image
//               source={localIcons.nextlogo}
//               style={styles.centerLogo}
//               resizeMode="contain"
//             />
//           </View>
//         </View>

//         <View style={styles.profileRow}>
//           <Image
//             source={{uri: 'https://i.pravatar.cc/100'}}
//             style={styles.avatar}
//           />
//           <View style={[styles.textContainer, {marginStart: 10}]}>
//             <Text style={styles.name}>Jane Doe</Text>
//             <Text style={styles.role}>Store Admin</Text>
//           </View>
//         </View>
//       </View>

//       {/* Menu Items (Custom Styled List) */}
//       <View style={styles.menuContainer}>
//         {displayedItems.map((item, index) => (
//           <CustomDrawerItem
//             key={index}
//             title={item.title}
//             iconKey={item.iconKey}
//             active={item.name === currentRouteName}
//             onPress={() => props.navigation.navigate(item.name)}
//           />
//         ))}

//         {/* Custom Styled Logout Item */}
//         <View style={styles.divider} />
//         <CustomDrawerItem
//           title={logoutItem.title}
//           iconKey={logoutItem.iconKey}
//           onPress={logoutItem.onPress}
//           isIonicons={true}
//         />
//       </View>
//     </DrawerContentScrollView>
//   );
// }

// // --- Dashboard Stack (Wraps the main Dashboard view) ---
// const DashboardStack = () => {
//   const navigation = useNavigation();
//   const {useTypeStore} = useSelector(({user}) => user);
//   console.log(navigation, 'navigationnavigation');
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}

//       {useTypeStore === 'User' ? (
//         <>
//           <Stack.Screen
//             name="InstituteListScreen"
//             component={InstituteListScreen}
//           />
//         </>
//       ) : (
//         <Stack.Screen name="Inventory" component={InventoryListScreen} />
//       )}
//     </Stack.Navigator>
//   );
// };

// // --- Main Drawer Component ---
// const DrawerComponent = () => {
//   const {useTypeStore} = useSelector(({user}) => user);
//   const dispatch = useDispatch();
//   return (
//     <Drawer.Navigator
//       id="MainDrawer"
//       screenOptions={{
//         headerShown: false,
//         drawerActiveTintColor: colors.primaryOrange,
//         drawerInactiveTintColor: colors.textMedium,
//         drawerActiveBackgroundColor: '#FFE8D1',
//         drawerItemStyle: {marginVertical: 0, paddingHorizontal: 0},
//       }}
//       drawerContent={props => <CustomDrawerContent {...props} />}>
//       <Drawer.Screen
//         name="Inventory"
//         component={DashboardStack}
//         options={({navigation}) => ({
//           headerShown: true,
//           headerLeft: () => <CustomMenuButton navigation={navigation} />,
//           headerTitle: () => (
//             <>
//               {useTypeStore === 'User' && (
//                 <View style={styles.centerContainer}>
//                   {/* --- OPTION A: LOGO (As seen in your image) --- */}
//                   <Image
//                     source={localIcons.nextlogo} // Assuming `localIcons.nextlogo` is the correct path
//                     style={styles.logo}
//                     resizeMode="contain"
//                   />
//                 </View>
//               )}
//             </>
//           ),

//           // 4. RIGHT SIDE: Text or Icon/Logo
//           headerRight: () => (
//             <>
//               {useTypeStore === 'User' ? (
//                 <TouchableOpacity
//                   onPress={() => {
//                     dispatch(setUserDashboardModalToggle(true));
//                   }}
//                   style={styles.rightButton}>
//                   {/* --- OPTION A: ICON (The swap icon from your image) --- */}
//                   <Ionicons
//                     name="swap-horizontal-outline"
//                     size={24}
//                     color={'#333'}
//                   />
//                 </TouchableOpacity>
//               ) : (
//                 <View style={styles.centerContainer}>
//                   {/* --- OPTION A: LOGO (As seen in your image) --- */}
//                   <Image
//                     source={localIcons.nextlogo} // Assuming `localIcons.nextlogo` is the correct path
//                     style={styles.logo}
//                     resizeMode="contain"
//                   />
//                 </View>
//               )}
//             </>
//           ),

//           // 5. Header Styling
//           headerStyle: {
//             backgroundColor: colors.white,
//             borderBottomWidth: 1, // Add separation line
//             borderBottomColor: '#eee',
//           },
//           // Crucial for centering the headerTitle component
//           headerTitleAlign: 'center',
//         })}
//       />
//       {useTypeStore !== 'User' ? (
//         <>
//           <Drawer.Screen
//             name="Ads"
//             component={MyAds} // Use PlaceholderScreen since the actual component path is not provided
//             options={{
//               title: 'Ads',
//               drawerIcon: ({color}) => (
//                 <Image
//                   source={localIcons.ads}
//                   style={{width: 22, height: 22, tintColor: color}}
//                 />
//               ),
//             }}
//           />

//           <Drawer.Screen
//             name="Orders"
//             component={OrdersScreen}
//             options={{
//               title: 'Orders',
//               headerShown: false,
//               drawerIcon: ({color}) => (
//                 <Ionicons name="list-outline" size={22} color={color} />
//               ),
//             }}
//           />
//           <Drawer.Screen
//             name="Reports"
//             component={ReportsScreen}
//             options={{
//               title: 'Reports',
//               headerShown: false,
//               drawerIcon: ({color}) => (
//                 <Ionicons name="bar-chart-outline" size={22} color={color} />
//               ),
//             }}
//           />

//           <Drawer.Screen
//             name="Billing"
//             component={Billing}
//             options={{
//               title: 'Billing',
//               headerShown: false,
//               drawerIcon: ({color}) => (
//                 <Ionicons name="bar-chart-outline" size={22} color={color} />
//               ),
//             }}
//           />

//           <Drawer.Screen
//             name="Manage"
//             component={Manage}
//             options={{
//               title: 'Manage',
//               drawerIcon: ({color}) => (
//                 <Ionicons name="settings-outline" size={22} color={color} />
//               ),
//             }}
//           />

//           <Drawer.Screen
//             name="ReviewsAndRatings"
//             component={ReviewScreen}
//             options={{
//               title: 'Reviews and Ratings',
//               drawerIcon: ({color}) => (
//                 <Ionicons name="settings-outline" size={22} color={color} />
//               ),
//             }}
//           />

//           <Drawer.Screen
//             name="MerchantProfile"
//             component={MerchantProfileScreen}
//             options={{
//               drawerItemStyle: {display: 'none'}, // Drawer menu me nahi dikhana
//             }}
//           />
//         </>
//       ) : null}
//     </Drawer.Navigator>
//   );
// };

// // --- Stylesheet using Centralized Colors (From DrawerScreen.js) ---
// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: colors.white,
//     paddingVertical: 20,
//     alignItems: 'center',
//     borderBottomWidth: 0.3,
//     borderColor: colors.borderLight,
//   },
//   centerLogo: {
//     width: 100,
//     height: 40,
//   },
//   drawerIcon: {
//     width: 24,
//     height: 24,
//     marginStart: 20,
//   },
//   textContainer: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
//   statusAndAmountRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     marginTop: 10,
//   },
//   profileRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     width: '100%',
//     marginTop: 10,
//     marginStart: 20,
//   },
//   avatar: {
//     width: 35,
//     height: 35,
//     marginStart: 10,
//     borderColor: colors.secondaryOrange,
//     borderWidth: 1,
//     borderRadius: 30,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '400',
//     marginTop: 5,
//     color: colors.textLight,
//   },
//   role: {
//     fontSize: 13,
//     color: colors.roleDark,
//     fontWeight: '700',
//   },
//   menuContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 15,
//     marginStart: 32,
//     paddingBottom: 30,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 8,
//     borderRadius: 8,
//     marginVertical: 4, // Added a small vertical margin for separation
//   },
//   activeMenu: {
//     backgroundColor: colors.activeBackground,
//   },
//   menuText: {
//     fontSize: 20,
//     marginLeft: 15,
//     color: colors.textMedium,
//     fontFamily: 'Roboto',
//     fontWeight: '500',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: colors.borderLight,
//     marginVertical: 10,
//     width: '90%',
//     alignSelf: 'center',
//   },

//   //12-12-2025
//   centerContainer: {
//     // Style the container for the logo/text
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     width: 110, // Adjust size
//     height: 30, // Adjust size
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: colors.textDark,
//   },
//   rightButton: {
//     // Styling the right button to match the rounded box in your image
//     padding: 6,
//     marginRight: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default DrawerComponent;
// //

//

// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';

// // React Navigation Imports
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// // Icon Import
// import Ionicons from 'react-native-vector-icons/Ionicons';

// // --- Screen Imports ---
// import Orders from '../views/pages/onBoardScreen/Orders';
// import Reports from '../views/pages/onBoardScreen/Reports';
// import Manage from '../views/pages/onBoardScreen/Manage';
// import Dashboard from '../views/pages/onBoardScreen/Dashboard';
// import Inventory from '../views/pages/onBoardScreen/Inventory';
// import CreateAd from '../views/pages/onBoardScreen/CreateAd';
// import MyAds from '../views/pages/onBoardScreen/MyAds';
// import Billing from '../views/pages/onBoardScreen/Billing';
// import ReportsScreen from '../views/pages/onBoardScreen/ReportsScreen';
// import OrdersScreen from '../views/pages/onBoardScreen/OrdersScreen';
// import ReviewScreen from '../views/pages/onBoardScreen/ReviewScreen';
// import InventoryListScreen from '../views/pages/onBoardScreen/InventoryListScreen';
// import MerchantProfileScreen from '../views/pages/onBoardScreen/MerchantProfileScreen';

// import {clearUser, setUserInfo} from '../store/slices/userSlice';
// import {useDispatch, useSelector} from 'react-redux';

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

// // --- Centralized Colors ---
// const colors = {
//   white: '#FFFFFF',
//   primaryOrange: '#FF8719',
//   secondaryOrange: '#FF7A00',
//   textDark: '#333',
//   textMedium: '#5F6368',
//   textLight: '#757575',
//   roleDark: '#1E1E1E',
//   borderLight: '#ddd',
//   activeBackground: '#FFF6EE',
// };

// // --- Local Icons ---
// const localIcons = {
//   drawer_click: require('./../assets/drawer_click.png'),
//   nextlogo: require('./../assets/nextlogo.png'),
//   dashboard: require('./../assets/dashboard.png'),
//   inventory: require('./../assets/inventory.png'),
//   ads: require('./../assets/ads.png'),
//   manage: require('./../assets/manage.png'),
//   orders: require('./../assets/orders.png'),
//   reports: require('./../assets/reports.png'),
//   billing: require('./../assets/billing.png'),
//   // Ionicons fallbacks (strings only)
//   'home-outline': 'home-outline',
//   'list-outline': 'list-outline',
//   'bar-chart-outline': 'bar-chart-outline',
//   'settings-outline': 'settings-outline',
//   'log-out-outline': 'log-out-outline',
// };

// const screenMap = [
//   {name: 'Inventory', title: 'Inventory', iconKey: 'inventory'},
//   {name: 'Reports', title: 'Reports', iconKey: 'reports'},
//   {name: 'Orders', title: 'Orders', iconKey: 'orders'},
//   {name: 'Manage', title: 'Manage', iconKey: 'manage'},
//   {name: 'Teams', title: 'Teams', iconKey: 'orders'},
//   {name: 'ReviewsAndRatings', title: 'Reviews and Ratings', iconKey: 'manage'},
//   {
//     name: 'ReportsAndAnalytics',
//     title: 'Reports and Analytics',
//     iconKey: 'bar-chart-outline',
//   },
//   {name: 'Billing', title: 'Billing', iconKey: 'billing'},
//   {name: 'Ads', title: 'Ads', iconKey: 'ads'},
// ];

// // --- Custom Drawer Content ---
// function CustomDrawerContent(props) {
//   // Get current route name properly
//   const currentRouteName = props.state.routeNames[props.state.index];

//   return (
//     <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop: 0}}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.statusAndAmountRow}>
//           <Image
//             source={localIcons.drawer_click}
//             style={styles.drawerIcon}
//             resizeMode="contain"
//           />
//           <View style={{flex: 1, alignItems: 'center'}}>
//             <Image
//               source={localIcons.nextlogo}
//               style={styles.centerLogo}
//               resizeMode="contain"
//             />
//           </View>
//         </View>

//         <View style={styles.profileRow}>
//           <Image
//             source={{uri: 'https://i.pravatar.cc/100'}}
//             style={styles.avatar}
//           />
//           <View style={[styles.textContainer, {marginStart: 10}]}>
//             <Text style={styles.name}>Jane Doe</Text>
//             <Text style={styles.role}>Store Admin</Text>
//           </View>
//         </View>

//         <View style={styles.menuContainer}>
//           {screenMap.map((item, index) => {
//             const isActive = currentRouteName === item.name;

//             return (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => props.navigation.navigate(item.name)}
//                 style={[styles.menuItem, isActive && styles.activeMenu]}>
//                 {/* ICON HANDLING */}
//                 {localIcons[item.iconKey] ? (
//                   <Image
//                     source={localIcons[item.iconKey]}
//                     style={{
//                       width: 22,
//                       height: 22,
//                       tintColor: isActive
//                         ? colors.primaryOrange
//                         : colors.textMedium,
//                     }}
//                   />
//                 ) : (
//                   <Ionicons
//                     name={item.iconKey}
//                     size={22}
//                     color={isActive ? colors.primaryOrange : colors.textMedium}
//                   />
//                 )}

//                 <Text
//                   style={[
//                     styles.menuText,
//                     {
//                       color: isActive
//                         ? colors.primaryOrange
//                         : colors.textMedium,
//                     },
//                   ]}>
//                   {item.title}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </View>
//     </DrawerContentScrollView>
//   );
// }

// // --- Dashboard Stack (example - you had only one screen, fixed it) ---
// const DashboardStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="InventoryList" component={InventoryListScreen} />
//       {/* Add other stack screens here if needed */}
//     </Stack.Navigator>
//   );
// };

// // --- Main Drawer Component ---
// const DrawerComponent = () => {
//   return (
//     <Drawer.Navigator
//       id="MainDrawer"
//       screenOptions={{
//         headerShown: true,
//         drawerActiveTintColor: colors.primaryOrange,
//         drawerInactiveTintColor: colors.textMedium,
//         drawerItemStyle: {marginVertical: 0, paddingHorizontal: 0},
//       }}
//       drawerContent={props => <CustomDrawerContent {...props} />}>
//       {/* Example drawer screen - you only had Inventory before */}
//       <Drawer.Screen
//         name="Inventory"
//         component={InventoryListScreen} // or DashboardStack if you want nested stack
//         options={{
//           title: 'Inventory',
//           drawerIcon: ({color}) => (
//             <Image
//               source={localIcons.inventory}
//               style={{width: 22, height: 22, tintColor: color}}
//             />
//           ),
//         }}
//       />

//       {/* Add other drawer screens here if you want them in the drawer */}
//       {/* <Drawer.Screen name="Reports" component={ReportsScreen} ... /> */}
//     </Drawer.Navigator>
//   );
// };

// // --- Styles ---
// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: colors.white,
//     paddingVertical: 20,
//     alignItems: 'center',
//     borderBottomWidth: 0.3,
//     borderColor: colors.borderLight,
//   },
//   centerLogo: {
//     width: 100,
//     height: 40,
//   },
//   drawerIcon: {
//     width: 24,
//     height: 24,
//     marginStart: 20,
//   },
//   textContainer: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
//   statusAndAmountRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     marginTop: 10,
//   },
//   profileRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     width: '100%',
//     marginTop: 10,
//     marginStart: 20,
//   },
//   avatar: {
//     width: 35,
//     height: 35,
//     marginStart: 10,
//     borderColor: colors.secondaryOrange,
//     borderWidth: 1,
//     borderRadius: 30,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '400',
//     marginTop: 5,
//     color: colors.textLight,
//   },
//   role: {
//     fontSize: 13,
//     color: colors.roleDark,
//     fontWeight: '700',
//   },
//   menuContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 15,
//     marginStart: 32,
//     paddingBottom: 30,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 8,
//     borderRadius: 8,
//     marginVertical: 4,
//   },
//   activeMenu: {
//     backgroundColor: colors.activeBackground,
//   },
//   menuText: {
//     fontSize: 20,
//     marginLeft: 15,
//     color: colors.textMedium,
//     fontFamily: 'Roboto',
//     fontWeight: '500',
//   },
// });

// export default DrawerComponent;
