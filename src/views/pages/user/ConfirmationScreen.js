import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
// Assuming UserHeader is available in your project structure for consistent header styling
import UserHeader from '../../components/user/UserHeader';
import PaymentSuccessPopup from '../../components/user/PaymentSuccessPopup';

// --- Color Palette (Defined outside StyleSheet.create) ---
const colors = {
  white: '#FFFFFF',
  black: '#000000',
  primaryOrange: '#FF7A00', // Main action button color (View Details)
  secondaryOrange: '#FF7A00', // Used for 'Need Help?' button
  successGreen: '#43A3A3', // Success Checkmark color
  textTitle: '#3D3A3A', // For major titles and item names
  textBody: '#3D3A3A', // For order detail labels and total amount value
  textLight: '#5A5A5A', // For small notes and delivery info
  textGrayDark: '#3D3A3A', // Used for Total Amount label
  badgeBackground: '#E5E7EB', // Light orange background for 'Processing' badge
  badgeText: '#5A5A5A', // Orange text for 'Processing' badge
  borderLight: '#EEEEEE', // For dividers and light borders
  backgroundGray: '#F5F5F5', // Background color for the scroll view
  iconContainerGray: '#F0F0F0', // Background for item icons
};

// --- Icon components (Placeholder - replace with actual icons like from react-native-vector-icons) ---

// Large Checkmark Icon for success message
const SuccessCheckIcon = () => (
  <View style={styles.checkContainer}>
    <Text style={styles.checkMark}>✓</Text>
  </View>
);

// Delivery Truck Icon
const DeliveryTruckIcon = () => (
//   <Text style={styles.deliveryIcon}>🚚</Text>
        <Image
        source={require('../../../assets/user/div.png')}
        style={{ width: 40, height: 40 }}
        />
);

// Item Icons (Using Emojis as placeholders)
const HeadphoneIcon = () => <Text style={styles.itemIcon}>🎧</Text>;
const PhoneIcon = () => <Text style={styles.itemIcon}>📱</Text>;
const ShoeIcon = () => <Text style={styles.itemIcon}>👟</Text>;

// Help Icon for the footer button
const HelpIcon = () => {
{/* <Text style={styles.helpIcon}>🙋</Text> */}
return (
    <Image
      source={require('../../../assets/user/need_help.png')}
      style={{ width: 18, height: 18 }}
    />
  );
};

// ----------------------------------------------------------------------------------------------------

const ConfirmationScreen = ({ navigation }) => {
  // --- Data Mockup (as per screenshot) ---
  const orderData = {
    orderId: '#ORD-240892',
    orderDate: 'Nov 2, 2024',
    totalItems: '4 items',
    totalAmount: '₹1,77,685',
    estimatedDelivery: 'Nov 5-7, 2024 (3-5 business days)',
    items: [
      { id: 1, name: 'Sony WH-1000XM4 Wireless Headphones', qty: 2, Icon: HeadphoneIcon },
      { id: 2, name: 'iPhone 14 Pro Max', qty: 1, Icon: PhoneIcon },
      { id: 3, name: 'Nike Air Jordan 1 Retro High', qty: 1, Icon: ShoeIcon },
    ],
  };
  const [showPopup, setShowPopup] = useState(false);
  // Component for the Success Message
  const renderSuccessMessage = () => (
    <View style={styles.successMessageContainer}>
      <SuccessCheckIcon />
      <Text style={styles.successTitle}>Order Placed Successfully!</Text>
      <Text style={styles.successSubtitle}>
        Thank you for your purchase. We'll send you updates on your order.
      </Text>
    </View>
  );

  // Component for Order Details
  const renderOrderDetails = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.detailsHeader}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        <Text style={styles.processingBadge}>Processing</Text>
      </View>

      {/* Order ID */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Order ID</Text>
        <Text style={styles.detailValue}>{orderData.orderId}</Text>
      </View>

      {/* Order Date */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Order Date</Text>
        <Text style={styles.detailValue}>{orderData.orderDate}</Text>
      </View>

      {/* Total Items */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Total Items</Text>
        <Text style={styles.detailValue}>{orderData.totalItems}</Text>
      </View>

      {/* Total Amount (Bottom row with emphasis) */}
      <View style={[styles.detailRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalValue}>{orderData.totalAmount}</Text>
      </View>
    </View>
  );

  // Component for Delivery Information
  const renderDeliveryInformation = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Delivery Information</Text>
      <View style={styles.deliveryRow}>
        <DeliveryTruckIcon />
        <View style={styles.deliveryTextContainer}>
          <Text style={styles.deliveryEstimated}>Estimated Delivery</Text>
          <Text style={styles.deliveryDate}>{orderData.estimatedDelivery}</Text>
          <Text style={styles.deliveryNote}>
            Your order will be delivered to your registered address
          </Text>
        </View>
      </View>
    </View>
  );

  // Component for Items in Your Order
  const renderItemsInYourOrder = () => (
    <View style={[styles.sectionContainer, styles.itemsContainer]}>
      <Text style={styles.sectionTitle}>Items in Your Order</Text>
      {orderData.items.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <View style={styles.itemIconContainer}>
            <item.Icon />
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQty}>Qty: {item.qty}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  // Component for the Fixed Footer Buttons
  const renderFooterButtons = () => (
    <View style={styles.footer}>
    

      {/* View Order Details Button */}
      <TouchableOpacity
        style={[styles.actionButton, styles.viewDetailsButton]}
        onPress={() => navigation.navigate('PaymentMethod')}>
        <Text style={styles.actionButtonText}>View Order Details</Text>
      </TouchableOpacity>

      {/* Continue Shopping Button */}
      <TouchableOpacity
        style={[styles.actionButton, styles.continueShoppingButton]}
        onPress={() => setShowPopup(true)}>
        <Text style={styles.continueShoppingText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* StatusBar now uses the external 'colors' object */}
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {/* Custom Header with Back button and Title */}
      <UserHeader
        title="Order Confirmation"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderSuccessMessage()}
        {renderOrderDetails()}
        {renderDeliveryInformation()}
        {renderItemsInYourOrder()}
         {/* Need Help Button */}
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => console.log('Need Help Pressed')}>
        <HelpIcon />
        <Text style={styles.helpButtonText}>Need Help?</Text>
      </TouchableOpacity>
        {/* Extra spacing for the fixed footer */}
        <View style={{ height: 240 }} />
      </ScrollView>
      {renderFooterButtons()}

      <PaymentSuccessPopup
        visible={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </View>
  );
};

// --- StyleSheet with all styles, referencing the external 'colors' object ---
const styles = StyleSheet.create({
  // --- Layout and General Styles ---
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGray, // Light gray background
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  sectionContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    // Soft shadow effect
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textTitle,
  },

  // --- Success Message Styles ---
  successMessageContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  checkContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.successGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  checkMark: {
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textTitle,
    marginBottom: 5,
  },
  successSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 20,
  },

  // --- Order Details Styles ---
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  processingBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.badgeText,
    backgroundColor: colors.badgeBackground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textBody,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textBody,
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textGrayDark,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textGrayDark,
  },

  // --- Delivery Information Styles ---
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  deliveryIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  deliveryTextContainer: {
    flex: 1,
    marginStart:10,
  },
  deliveryEstimated: {
    fontSize: 12,
    color: colors.textLight,
  },
  deliveryDate: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textBody,
    marginBottom: 5,
  },
  deliveryNote: {
    fontSize: 13,
    color: colors.textLight,
  },

  // --- Items in Your Order Styles ---
  itemsContainer: {
    paddingBottom: 5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: colors.iconContainerGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  itemIcon: {
    fontSize: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textTitle,
  },
  itemQty: {
    fontSize: 13,
    color: colors.textLight,
  },

  // --- Footer Button Styles (Fixed to Bottom) ---
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingBottom: 20, // Adjust for mobile safe area
    paddingTop: 10,
    // Soft shadow at the top
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryOrange,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  helpIcon: {
    fontSize: 18,
    color: colors.white,
    marginRight: 8,
  },
  helpButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    marginStart:10,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetailsButton: {
    backgroundColor: colors.primaryOrange, // Primary Orange
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  continueShoppingButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  continueShoppingText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textBody,
  },
});

export default ConfirmationScreen;