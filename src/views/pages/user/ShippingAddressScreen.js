import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView 
} from 'react-native';
import UserHeader from '../../components/user/UserHeader';
import Icon from "react-native-vector-icons/Feather";

// NOTE: ICONS ARE COMMENTED OUT AS PER USER'S INPUT.


// --- CONSOLIDATED COLOR CONSTANTS ---
const COLORS = {
  primaryOrange: '#FF7A00', // Used for Edit text, Checkbox, and FAB
  backgroundGray: '#F5F5F5', // Screen background
  lightBorderGray: '#EDEDED', // Header bottom border
  cardWhite: 'white', 
  darkText: '#222222', // Header title, Name text
  mediumText: '#222222', // Address text, Checkbox label
  black: '#222222', // Shadow
};

// --- Address Card Component ---
const AddressCard = ({ name, address, isDefault }) => (
  <View style={styles.card}>
    {/* Card Header: Name and Edit button */}
    <View style={styles.cardHeader}>
      <Text style={styles.nameText}>{name}</Text>
      <TouchableOpacity onPress={() => console.log('Edit clicked')}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
    
    {/* Address Details */}
    <Text style={styles.addressText}>{address}</Text>
    
    {/* Checkbox for setting as shipping address */}
    <View style={styles.checkboxContainer}>
      {/* Note: A real checkbox component should be used here. An icon is used for simplicity. */}
      <TouchableOpacity style={styles.checkbox}>
        {/* Checkbox Icon placeholder */}
        <Icon 
          name={isDefault ? "check-square" : "square"} // Icon changes based on selection
          size={20} 
          color={COLORS.primaryOrange} 
        />
      </TouchableOpacity>
      <Text style={styles.checkboxLabel}>Use as the shipping address</Text>
    </View>
  </View>
);

// --- Main Component: Shipping Address Screen ---
const ShippingAddressScreen = ({navigation}) => {
  // Mock data for the list of addresses
  const addresses = [
    { 
      id: 1, 
      name: "Jane Doe", 
      address: "3 Newbridge Court\nChino Hills, CA 91709, United States", 
      isDefault: true 
    },
    { 
      id: 2, 
      name: "Jane Doe", 
      address: "3 Newbridge Court\nChino Hills, CA 91709, United States", 
      isDefault: false 
    },
    { 
      id: 3, 
      name: "Jane Doe", 
      address: "3 Newbridge Court\nChino Hills, CA 91709, United States", 
      isDefault: false 
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header Section */}
      <UserHeader
        title="Shipping Address"
        onBackPress={() => navigation.goBack()}
      />

      {/* Scrollable Container for Address Cards */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {addresses.map(addr => (
          <AddressCard 
            key={addr.id}
            name={addr.name}
            address={addr.address}
            isDefault={addr.isDefault}
          />
        ))}
           {/* Floating Add Button */}
           <TouchableOpacity style={styles.fab} 
       onPress={() => navigation.navigate('AddShippingAddressScreen')}>
        <Icon name="plus" size={24} color={COLORS.cardWhite} />
      </TouchableOpacity>
      </ScrollView>

      
    </SafeAreaView>
  );
};

// --- Stylesheets ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray, // Light gray background for the screen
  },
  // NOTE: 'header' and 'headerTitle' styles were removed as 'UserHeader' is now used.
  scrollContent: {
    padding: 15,
    paddingBottom: 80, // Space for the FAB
  },
  card: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    // Soft Shadow - iOS
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Soft Shadow - Android
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkText,
  },
  editText: {
    fontSize: 14,
    color: COLORS.primaryOrange, // Orange 'Edit' text
    fontWeight: '500',
  },
  addressText: {
    fontSize: 14,
    color: COLORS.mediumText,
    lineHeight: 20,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: COLORS.mediumText,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: COLORS.primaryOrange, // Orange FAB background
    borderRadius: 28,
    // Shadow
    elevation: 6,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default ShippingAddressScreen;