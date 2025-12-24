import React, {use} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MerchantProfile from '../../components/MerchantProfile';
import CircularBorder from '../../components/CircularBorder';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import UserHeader from '../../components/user/UserHeader';
// --- 1. Menu Data ---
const menuData = [
  {
    id: '1',
    title: 'Institute Info',
    description: 'View and manage your store details.',
    iconPath: require('../../../assets/images/ic_store_info.png'),
    iconColor: '#FF8C00',
    iconBackground: '#fff2e6',
    onPress: () => alert('Store Info Pressed'),
  },
  {
    id: '2',
    title: 'Security',
    description: 'Manage password and privacy settings',
    iconPath: require('../../../assets/images/ic_security.png'),
    iconColor: '#4682B4',
    iconBackground: '#e6f0ff',
    onPress: () => alert('Security Pressed'),
  },
  {
    id: '3',
    title: 'Help & Support',
    description: 'Get help and contact support',
    iconPath: require('../../../assets/images/ic_help_support.png'),
    iconColor: '#8A2BE2',
    iconBackground: '#f0e6ff',
    onPress: () => alert('Help & Support Pressed'),
  },
  {
    id: '4',
    title: 'Terms and Policies',
    description: 'Privacy policy and terms of service',
    iconPath: require('../../../assets/images/ic_term_condition.png'),
    iconColor: '#FFA500',
    iconBackground: '#fff9e6',
    onPress: () => alert('Terms and Policies Pressed'),
  },
];

// --- 2. Profile Header Component ---
const ListHeaderComponent = () => (
  <View style={styles.profileCard}>
    <CircularBorder>
      <Image
        source={{uri: 'https://i.pravatar.cc/100'}}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 120 / 2,
          resizeMode: 'cover',
        }}
      />
    </CircularBorder>

    <View style={styles.profileInfo}>
      <Text style={styles.profileName}>Sarah Johnson</Text>
      <Text style={styles.profileEmail}>sarah.johnson@email.com</Text>
    </View>

    <TouchableOpacity onPress={() => alert('Edit Profile')}>
      <Image
        source={require('../../../assets/images/ic_edit_button_red.png')}
        style={{height: 29, width: 32}}
        resizeMode="contain"></Image>
    </TouchableOpacity>
  </View>
);

// --- 3. Main Screen ---
const MerchantProfileScreen = () => {
  const navigation = useNavigation();
  const {useTypeStore} = useSelector(({user}) => user);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => alert('Menu Pressed')}>
          <Image
            source={require('../../../assets/images/slider_icon.png')}
            style={{height: 16, width: 22}}></Image>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Merchant Profile</Text>
        <Image
          source={require('../../../assets/images/nextgenlogo.png')} // ✅ Fixed path
          style={styles.logo}
        />
      </View> */}
      <UserHeader
        title={
          useTypeStore === 'Merchant' ? 'Merchant Profile' : 'Academia Profile'
        }
        onBackPress={() => navigation.goBack()}
      />

      {/* Menu List */}
      <FlatList
        data={menuData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <MerchantProfile item={item} />} // ✅ Fixed: use MerchantProfile
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

// --- 4. Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logo: {
    width: 80,
    height: 30,
    resizeMode: 'contain',
  },
  flatListContainer: {
    padding: 15,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  editButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 25,
    padding: 10,
    marginLeft: 10,
    shadowColor: '#FF8C00',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default MerchantProfileScreen;

//10-12-2025
// import React ,{useMemo}from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//
//   Image,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MerchantProfile from '../../components/MerchantProfile';
// import CircularBorder from '../../components/CircularBorder';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { DrawerActions,useNavigation } from '@react-navigation/native';
// import useProfile from '../../../hooks/useProfile';
// import { extractFieldLabels, extractSectionFieldLabels } from '../../../utils/modal/customCodeModal';
// import Loader from '../../components/Loader';

// // --- 1. Menu Data ---
// const menudefaultMenuData = [
//   {
//     id: '1',
//     iconPath: require('../../../assets/images/ic_store_info.png'),
//     iconColor: '#FF8C00',
//     type:"",
//     iconBackground: '#fff2e6',

//   },
//   {
//     id: '2',
//
//     iconPath: require('../../../assets/images/ic_security.png'),
//     iconColor: '#4682B4',
//     type:"",
//     iconBackground: '#e6f0ff',
//
//   },
//   {
//     id: '3',
//
//     iconPath: require('../../../assets/images/ic_help_support.png'),
//     iconColor: '#8A2BE2',
//     type:"",
//     iconBackground: '#f0e6ff',
//
//   },
//   {
//     id: '4',
//    iconPath: require('../../../assets/images/ic_term_condition.png'),
//     iconColor: '#FFA500',
//     type:"",
//     iconBackground: '#fff9e6',
//
//   },
// ];

// // --- 2. Profile Header Component ---
// const ListHeaderComponent = ({savedItem,title}) => (

//   // Renders the user's profile card at the top of the list
//   <View style={styles.profileCard}>
//     {savedItem?.user_image ? (
//       <CircularBorder>
//         <Image
//           source={{ uri: savedItem?.user_image }}
//           style={{
//             width: '100%',
//             height: '100%',
//             borderRadius: 120 / 2,
//             resizeMode: 'cover',
//           }}
//         />
//       </CircularBorder>
//     ) : (
//       // Placeholder for image while loading or if URL is missing
//       <View style={styles.imagePlaceholder} />
//     )}

//     <View style={styles.profileInfo}>
//       <Text style={styles.profileName}>{savedItem?.name || "User Name"}</Text>
//       <Text style={styles.profileEmail}>{savedItem?.email || "user@example.com"}</Text>
//     </View>

//     {/*    {title === "Merchant Profile" && ( */}
//       <TouchableOpacity onPress={() => alert('Edit Profile')}>
//         <Image
//           source={require('../../../assets/images/ic_edit_button_red.png')}
//           style={{ height: 29, width: 32 }}
//           resizeMode="contain"
//         />
//       </TouchableOpacity>
//     {/* )} */}
//   </View>
// );

// // --- 3. Main Screen ---
// const MerchantProfileScreen = () => {
//   const navigation = useNavigation();
//   const { useFetchProfile } = useProfile();
//   const { data, isError, error, isLoading   } = useFetchProfile();

//   const labelsMap = useMemo(() => {
//     return data?.schema ? extractSectionFieldLabels(data.schema) : {};
//   }, [data]);

//   // Extract profile data item
//   const savedItem = data?.items?.profile_card || null;
//    const savedSection = data?.schema?.sections || null;

//    const savedInstitutename = data?.items?.institute_info || null;
//    console.log("data",savedInstitutename)

//       // Map API data to menu cards while keeping default icons/colors
//     const menuData = savedSection?.filter((item) => item.title !== 'Profile Card') // skip Profile Card
//     .map((item, index) => {
//       const defaultItem = menudefaultMenuData[index] || {};
//       // --- 🎯 Check if Institute Info ---
//     const isInstituteInfo = item.title === "Institute Info";
//       return {
//         id: item.id || defaultItem.id || `${index}`,
//          type: item.type || defaultItem.type || `${index}`,
//        title: isInstituteInfo
//         ? savedInstitutename?.title || item.title || ""
//         : item.title || "",

//       description: isInstituteInfo
//         ? savedInstitutename?.description || item.description || ""
//         : item.description || "",
//         iconPath: defaultItem.iconPath,
//         iconColor: defaultItem.iconColor,
//         iconBackground: defaultItem.iconBackground,
//         onPress: () => alert(`${item.title || 'Menu'} Pressed`),
//       };
//     }) || [];

//   // ⬅️ LOADER LOGIC: Show loader while data is being fetched (isLoading is true)
//   if (isLoading) {
//     return <Loader />;
//   }

//   // Optional: Handle case where data fails to load after loading is complete
//   if (!data) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>Failed to load profile data.</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }
// const openDrawer = () => {
//   console.log("*******")
//  // navigation.getParent("MainDrawer")?.dispatch(DrawerActions.openDrawer());
//    navigation.dispatch(DrawerActions.openDrawer());
// };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => openDrawer()}>
//           <Image
//             source={require('../../../assets/images/slider_icon.png')}
//             style={{ height: 16, width: 22 }}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>
//           {labelsMap.schema_title || 'Merchant Profile'}
//         </Text>
//         <Image
//           source={require('../../../assets/images/nextgenlogo.png')}
//           style={styles.logo}
//         />
//       </View>

//       {/* Profile + Menu List */}
//       <FlatList
//         data={menuData}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <MerchantProfile item={item} savedSection={savedSection} />}
//         ListHeaderComponent={() => <ListHeaderComponent savedItem={savedItem}
//         title={labelsMap.schema_title} />}
//         contentContainerStyle={styles.flatListContainer}
//       />
//     </SafeAreaView>
//   );
// };

// // --- 4. Styles ---
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   logo: {
//     width: 80,
//     height: 30,
//     resizeMode: 'contain',
//   },
//   flatListContainer: {
//     padding: 15,
//   },
//   profileCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   profileInfo: {
//     flex: 1,
//     marginLeft: 15,
//   },
//   profileName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   profileEmail: {
//     fontSize: 14,
//     color: '#777',
//     marginTop: 2,
//   },
//   editButton: {
//     backgroundColor: '#FF8C00',
//     borderRadius: 25,
//     padding: 10,
//     marginLeft: 10,
//     shadowColor: '#FF8C00',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.5,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   imagePlaceholder: {
//     width: 120, // Should match CircularBorder size
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#eee', // Placeholder background
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   errorText: {
//     fontSize: 16,
//     color: '#888',
//   },
// });

// export default MerchantProfileScreen;
