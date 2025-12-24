import React from 'react';
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
import HeaderTitle from '../../components/DrawerHeader/HeaderTitle';
// --- 1. Menu Data ---
const menuData = [
  {
    id: '1',
    title: 'My Order',
    description: 'View and manage your store details.',
    iconPath: require('../../../assets/images/ic_store_info.png'),
    iconColor: '#FF8C00',
    iconBackground: '#fff2e6',
    onPress: () => alert('Store Info Pressed'),
  },
  {
    id: '2',
    title: 'Asso Institute',
    description: 'Manage password and privacy settings',
    iconPath: require('../../../assets/images/ic_security.png'),
    iconColor: '#4682B4',
    iconBackground: '#e6f0ff',
    onPress: () => alert('Security Pressed'),
  },
  {
    id: '3',
    title: 'Account Settings',
    description: 'Get help and contact support',
    iconPath: require('../../../assets/images/ic_help_support.png'),
    iconColor: '#8A2BE2',
    iconBackground: '#f0e6ff',
    onPress: () => alert('Help & Support Pressed'),
  },
  {
    id: '4',
    title: 'Payments',
    description: 'Privacy policy and terms of service',
    iconPath: require('../../../assets/images/ic_term_condition.png'),
    iconColor: '#FFA500',
    iconBackground: '#fff9e6',
    onPress: () => alert('Terms and Policies Pressed'),
  },
  {
    id: '5',
    title: 'Help and supports',
    description: 'Privacy policy and terms of service',
    iconPath: require('../../../assets/images/ic_term_condition.png'),
    iconColor: '#FFA500',
    iconBackground: '#fff9e6',
    onPress: () => alert('Terms and Policies Pressed'),
  },
  {
    id: '6',
    title: 'Terms and Policy',
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

    {/* <TouchableOpacity onPress={() => alert('Edit Profile')}>
      <Image
        source={require('../../../assets/images/ic_edit_button_red.png')}
        style={{height: 29, width: 32}}
        resizeMode="contain"></Image>
    </TouchableOpacity> */}
  </View>
);

// --- 3. Main Screen ---
const UserProfile = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => alert('Menu Pressed')}>
          <Image
            source={require('../../../assets/images/slider_icon.png')}
            style={{height: 16, width: 22}}></Image>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Profile</Text>
        <Image
          source={require('../../../assets/images/nextgenlogo.png')} // ✅ Fixed path
          style={styles.logo}
        />
      </View> */}
      <HeaderTitle
        navigation={navigation}
        centerText={'User Profile'}
        rightImage={true}
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

export default UserProfile;
