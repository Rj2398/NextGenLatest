import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import UserHeader from '../../components/user/UserHeader';

// --- Imports updated to use react-native-vector-icons ---
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
// --- Library for OTP input ---
import OtpTextInput from 'react-native-otp-textinput';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Define the component
const ConfirmPickup = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');

  // --- Data Mockup (Same as previous response) ---
  const pickupDetails = {
    returnId: 'RMA-12345',
    date: 'Today, Nov 1',
    timeSlot: '2:00 PM - 6:00 PM',
    address: 'Apt 402, Marina Heights\nDubai Marina, Dubai',
    last4Mobile: '***67',
  };

  const itemDetails = {
    name: 'Premium Wireless Headphones',
    color: 'Black',
    qty: 1,
    price: 299, // AED
    refundAmount: 299, // AED
    refundTo: 'NextGen Wallet',
    imageUri: 'https://signatize.in/wp-content/uploads/2024/05/1-47.jpg',
  };

  const courierInstructions = [
    'Share this OTP with the courier agent',
    'Ensure items are properly packaged',
    'Keep your order receipt handy',
    'Get pickup confirmation receipt',
  ];

  // --- Helper Components (Same as previous response) ---

  const DetailRow = ({label, value}) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  const InstructionItem = ({text}) => (
    <View style={styles.instructionItem}>
      <View style={styles.bullet} />
      <Text style={styles.instructionText}>{text}</Text>
    </View>
  );

  // --- Validation Logic ---
  // The button should be highlighted/enabled when 6 digits are entered
  const isOtpValid = otp.length === 6;

  // --- Main Render ---
  return (
    <SafeAreaView style={styles.container}>
      <UserHeader
        title={'Confirm Pickup'}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* === 1. Pickup Scheduled Section === */}
        <View style={styles.card}>
          <View style={styles.iconContainerOrange}>
            <MaterialCommunityIcons name="truck-fast" size={24} color="#FFF" />
          </View>
          <Text style={styles.sectionTitle}>Pickup Scheduled</Text>
          <Text style={styles.returnIdText}>
            Return #{pickupDetails.returnId}
          </Text>
          <View style={styles.separator} />
          <DetailRow label="Pickup Date" value={pickupDetails.date} />
          <DetailRow label="Time Slot" value={pickupDetails.timeSlot} />
          <DetailRow label="Address" value={pickupDetails.address} />
        </View>

        {/* === 2. Enter Verification Code Section === */}
        <View style={styles.card}>
          <View style={styles.iconContainerLight}>
            <AntDesign name="questioncircleo" size={24} color="#55C7A9" />
          </View>
          <Text style={styles.sectionTitle}>Enter Verification Code</Text>
          <Text style={styles.otpMessage}>
            We've sent a 6-digit code to your registered mobile number ending
            with{' '}
            <Text style={styles.boldText}>{pickupDetails.last4Mobile}</Text>
          </Text>

          {/* OTP Input Field - handleTextChange updates the OTP state */}
          <OtpTextInput
            inputCount={6}
            handleTextChange={setOtp}
            containerStyle={styles.otpContainer}
            textInputStyle={styles.otpInputStyle}
            tintColor="#FF7A3F"
            offTintColor="#D9D9D9"
            keyboardType="number-pad"
          />

          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
        </View>

        {/* === 3. Courier Instructions Section === */}
        <View style={[styles.card, styles.instructionCard]}>
          <View style={styles.instructionHeader}>
            <View style={styles.instructionDot} />
            <Text style={styles.instructionTitle}>Courier Instructions</Text>
          </View>
          {courierInstructions.map((instruction, index) => (
            <InstructionItem key={index} text={instruction} />
          ))}
        </View>

        {/* === 4. Items for Return Section === */}
        <View style={styles.itemsCard}>
          <Text style={styles.itemsTitle}>Items for Return</Text>
          <View style={styles.itemRow}>
            <Image
              source={{uri: itemDetails.imageUri}}
              style={styles.itemImage}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{itemDetails.name}</Text>
              <Text style={styles.itemDetails}>
                {itemDetails.color} • Qty: {itemDetails.qty}
              </Text>
            </View>
            <Text style={styles.itemPrice}>AED {itemDetails.price}</Text>
          </View>
          <View style={styles.refundRow}>
            <View>
              <Text style={styles.refundLabel}>Refund Amount</Text>
              <Text style={styles.refundToText}>To {itemDetails.refundTo}</Text>
            </View>
            <Text style={styles.refundAmountText}>
              AED {itemDetails.refundAmount}
            </Text>
          </View>
        </View>
        <View style={{height: 100}} />
      </ScrollView>

      {/* === Fixed Footer Buttons with Conditional Styling === */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel Pickup</Text>
        </TouchableOpacity>

        {/* CONFIRM PICKUP BUTTON: Styles and disabled prop are conditional */}
        <TouchableOpacity
          style={[
            styles.confirmButton,
            isOtpValid
              ? styles.confirmButtonActive
              : styles.confirmButtonDisabled,
          ]}
          disabled={!isOtpValid} // Prevents pressing if OTP is incomplete
          onPress={() => {
            if (isOtpValid) {
              console.log('Pickup Confirmed with OTP:', otp);
              // Add navigation/API call logic here
              navigation.navigate('UserOrderDetail');
            }
          }}>
          <Text style={styles.confirmButtonText}>Confirm Pickup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmPickup;

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 0,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainerOrange: {
    backgroundColor: '#FF7A3F',
    borderRadius: 50,
    padding: 10,
    marginBottom: 8,
  },
  iconContainerLight: {
    backgroundColor: '#F0FFFD',
    borderColor: '#55C7A9',
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  returnIdText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    width: '100%',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'right',
    flex: 1,
  },
  otpMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  otpContainer: {
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
    marginRight: 50,
  },
  otpInputStyle: {
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    borderColor: '#D9D9D9',
  },
  resendButton: {
    marginTop: 10,
  },
  resendText: {
    color: '#FF7A3F',
    fontSize: 14,
    fontWeight: '600',
  },
  instructionCard: {
    backgroundColor: '#FFF8F4',
    alignItems: 'flex-start',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  instructionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF7A3F',
    marginRight: 8,
  },
  instructionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    paddingLeft: 10,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666',
    marginTop: 7,
    marginRight: 8,
  },
  instructionText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  itemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  itemDetails: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  refundRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  refundLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  refundToText: {
    fontSize: 12,
    color: '#888',
  },
  refundAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#55C7A9',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 14,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // New styles for dynamic state
  confirmButtonDisabled: {
    backgroundColor: '#D9D9D9', // Gray when less than 6 digits
  },
  confirmButtonActive: {
    backgroundColor: '#FF7A3F', // Orange when 6 digits are filled
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
