import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import UserHeader from '../../components/user/UserHeader';

// --- Icon components (Placeholder - replace with actual icons like from react-native-vector-icons) ---
const BackIcon = () => (
  <Text style={styles.headerIcon}>{'<'}</Text> // A simple placeholder for the back arrow
);
const AddIcon = () => (
  <Text style={styles.addIcon}>+</Text>
);
const CreditCardIcon = () => (
  <Text style={styles.paymentIcon}>💳</Text>
);
const BankIcon = () => (
  <Text style={styles.paymentIcon}>🏛️</Text>
);
const RadioButton = ({ isSelected }) => (
  <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
    {isSelected && <View style={styles.radioInner} />}
  </View>
);
// ----------------------------------------------------------------------------------------------------

const CheckoutScreen = ({navigation}) => {
  // State to manage the selected payment method
  const [selectedPayment, setSelectedPayment] = useState('credit'); // 'credit' or 'netbanking'

  

  // Component for the Delivery Address section
  const renderDeliveryAddress = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.addressHeader}>
        <Text style={styles.sectionTitleAdd}>Delivery Address</Text>
        <TouchableOpacity onPress={() => console.log('Change Address')}>
          <Text style={styles.changeLink}>Change</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.addressName}>Rahul Kumar</Text>
      <Text style={styles.addressDetails}>Building No. 42, Apartment 3B</Text>
      <Text style={styles.addressDetails}>MG Road, Connaught Place</Text>
      <Text style={styles.addressDetails}>New Delhi - 110001</Text>
      <Text style={styles.addressDetails}>Phone: +91 98765 43210</Text>
      <TouchableOpacity
        style={styles.addAddressButton}
        onPress={() => console.log('Add New Address')}>
        <AddIcon />
        <Text style={styles.addAddressText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );

  // Component for the Order Summary section
  const renderOrderSummary = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Items (4)</Text>
        <Text style={styles.summaryValue}>₹1,77,685</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Delivery Fee</Text>
        <Text style={styles.freeText}>Free</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Includes taxes</Text>
        <Text style={styles.summaryValue}>₹15,234</Text>
      </View>
      {/* Separator line */}
      <View style={styles.divider} />
      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalValue}>₹1,77,685</Text>
      </View>
    </View>
  );

  // Component for the Payment Method section
  const renderPaymentMethods = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Select Payment Method</Text>
      {/* Credit/Debit Card Option */}
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedPayment === 'credit' && styles.paymentOptionSelected,
        ]}
        onPress={() => setSelectedPayment('credit')}>
        <RadioButton isSelected={selectedPayment === 'credit'} />
        <CreditCardIcon />
        <Text style={styles.paymentText}>Credit/Debit Card</Text>
      </TouchableOpacity>

      {/* Net Banking Option */}
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedPayment === 'netbanking' && styles.paymentOptionSelected,
          styles.paymentOptionMargin, // Add margin to separate from the previous option
        ]}
        onPress={() => setSelectedPayment('netbanking')}>
        <RadioButton isSelected={selectedPayment === 'netbanking'} />
        <BankIcon />
        <Text style={styles.paymentText}>Net Banking</Text>
      </TouchableOpacity>
    </View>
  );

  // Component for the Sticky Footer (Total and Place Order button)
  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerTotalValue}>Total:₹1,77,685</Text>
      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={() => navigation.navigate('Confirmation')}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Optional: Status bar configuration */}
      <StatusBar barStyle="dark-content" backgroundColor={styles.colors.white} />
      <UserHeader
                title="Checkout"
                onBackPress={() => navigation.goBack()}
            />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderDeliveryAddress()}
        {renderOrderSummary()}
        {renderPaymentMethods()}
        {/* Add some padding at the bottom for the scroll view */}
        <View style={{ height: 100 }} />
      </ScrollView>
      {renderFooter()}
    </View>
  );
};

// --- StyleSheet with all colors and styles ---
const styles = StyleSheet.create({

  // --- Color Palette (All colors grouped here) ---
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    textDark: '#333333',
    textGray: '#666666',
    lightGray: '#F5F5F5',
    orangePrimary: '#FF9933',
    redSecondary: '#FF3B30',
    borderGray: '#DDDDDD',
    radioBlue: '#007AFF',
    addressOrange: '#FF7A00',
    freeGreen: '#43A3A3',
    paymentBg: '#f9f9f9',
    selectedBg: '#FFFBEA',
    divider: '#eee',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },

  // Header Style
  headerIcon: {
    fontSize: 24,
    color: '#000',
    fontWeight: '300',
  },

  // Address
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitleAdd: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3D3A3A',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 15,
    color: '#3D3A3A',
  },
  changeLink: {
    color: '#FFAF66',
    fontSize: 14,
    fontWeight: '500',
  },
  addressName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3D3A3A',
    paddingHorizontal: 15,
    marginTop: 5,
  },
  addressDetails: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    paddingHorizontal: 15,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 15,
  },
  addIcon: {
    fontSize: 18,
    color: '#FF7A00',
    marginRight: 5,
    fontWeight: 'bold',
  },
  addAddressText: {
    fontSize: 14,
    color: '#FF7A00',
    fontWeight: '500',
  },

  // Order Summary
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#484848',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  freeText: {
    fontSize: 14,
    color: '#43A3A3',
    fontWeight: '500',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3D3A3A',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3D3A3A',
  },

  // Payment
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginTop: 10,
  },
  paymentOptionMargin: {
    marginBottom: 5,
  },
  paymentOptionSelected: {
    borderColor: '#FF9933',
    backgroundColor: '#FFFBEA',
  },
  paymentIcon: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },

  // Radio
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#FF9933',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#FF9933',
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    
  },
  footerTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    position: 'absolute',
    left: 16,
    bottom: 75,
    paddingVertical: 5,
  },
  placeOrderButton: {
    backgroundColor: '#FF7A00',
    paddingVertical: 12,
    borderRadius: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    flex: 1,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});


export default CheckoutScreen;