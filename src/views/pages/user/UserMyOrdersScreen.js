import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import UserHeader from '../../components/user/UserHeader';
import UserOrderFilterTab from '../../components/user/UserOrderFilterTab';
import UserOrderItemCard from '../../components/user/UserOrderItemCard';
import {useNavigation} from '@react-navigation/native';

// Mock Data
const mockOrders = [
  {
    id: 'SND7862',
    date: 'May 12, 2025',
    status: 'Delivered',
    items: [
      {
        name: 'SoundMix Pro Wireless Headphones',
        color: 'Blue',
        quantity: 1,
        price: 149.99,
        imageUrl: '🎧',
      },
    ],
    actions: ['Track', 'Return', 'Buy Again'],
  },
  {
    id: 'SND7845',
    date: 'May 8, 2025',
    status: 'Shipped',
    items: [
      {
        name: 'SoundMix Mini Bluetooth Speaker',
        color: 'Black',
        quantity: 1,
        price: 79.99,
        imageUrl: '🔊',
      },
    ],
    actions: ['Track', 'Cancel', 'Invoice'],
  },
  {
    id: 'SND7831',
    date: 'May 2, 2025',
    status: 'Processing',
    items: [
      {
        name: 'SoundMix True Wireless Earbuds',
        color: 'White',
        quantity: 1,
        price: 89.99,
        imageUrl: '👂',
      },
      {
        name: 'SoundMix Earbuds Case',
        color: 'Blue',
        quantity: 1,
        price: 19.99,
        imageUrl: '📦',
      },
    ],
    totalPrice: 109.98,
    actions: ['Track', 'Cancel', 'Invoice'],
  },
  {
    id: 'SND7789',
    date: 'April 25, 2025',
    status: 'Cancelled',
    items: [
      {
        name: 'SoundMix Noise Cancelling Headphones',
        color: 'Silver',
        quantity: 1,
        price: 199.99,
        imageUrl: '🎧',
      },
    ],
    actions: ['Buy Again', 'Support'],
  },
];

const UserMyOrdersScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All Orders');

  // In a real app, you'd filter `mockOrders` based on `activeTab` here
  const filteredOrders = mockOrders;
  const handleBackPress = () => {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <UserHeader title="My Orders" onBackPress={() => navigation.goBack()} />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        {/* Placeholder for Search Icon (Magnifying Glass) */}
        <Image
          source={require('../../../assets/images/ic_search_icon.png')}
          style={{height: 20, width: 20}}></Image>
        <TextInput
          style={styles.searchInput}
          placeholder="Search orders..."
          placeholderTextColor="#999"
        />
      </View>

      <UserOrderFilterTab activeTab={activeTab} onTabPress={setActiveTab} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredOrders.map(order => (
          <UserOrderItemCard key={order.id} order={order} />
        ))}
        {/* Padding at the bottom for the fixed tab bar */}
        <View style={{height: 60}} />
      </ScrollView>

      {/* Bottom Tab Bar Placeholder */}
      {/* <View style={styles.bottomTabBar}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={[styles.tabIcon, styles.activeTabIcon]}>🛍️</Text>
          <Text style={styles.tabIcon}>👤</Text>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderWidth: 1,
    marginTop: 15,
    borderColor: '#EFEFEF',
  },
  searchIcon: {
    fontSize: 18,
    color: '#999',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  scrollViewContent: {
    paddingBottom: 20,
    backgroundColor: 'F7F7F7',
  },
  // --- Bottom Tab Bar Styles ---
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 55,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingBottom: 5, // For better visual balance on some devices
  },
  tabIcon: {
    fontSize: 24,
    color: '#999',
    padding: 5,
  },
  activeTabIcon: {
    color: '#FF8C00', // Highlight color for active tab (Orders)
  },
});

export default UserMyOrdersScreen;
