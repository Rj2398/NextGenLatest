import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const CARD_BG = '#ffffff';
const SECONDARY_COLOR = '#f3f4f6';
const DARK_TEXT = '#1f2937';
const GRAY_TEXT = '#525252'; // Made GRAY_TEXT slightly lighter for better readability
const ACCENT_COLOR = '#1a1f71';

// Function to extract the last four digits from the payment method string
const getLastFourDigits = paymentMethod => {
  if (typeof paymentMethod === 'string') {
    const match = paymentMethod.match(/(\d{4})$/);
    return match ? match[0] : null;
  }
  return null;
};

const PurchaseNewOrderCard = ({item: propItem}) => {
  const item = propItem;

  const lastFourDigits = getLastFourDigits(item.payment_method);

  // Helper to format the date (optional, but good practice)
  const formattedDate = item.order_date
    ? new Date(item.order_date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown Date';

  return (
    <View style={styles.purchaseCard}>
      <View style={styles.purchaseCardContent}>
        {/* Product Image - Keep in mind this image path is relative */}
        <Image
          source={require('../../assets/images/ic_maggi.png')}
          style={styles.purchaseProductImage}
          resizeMode="contain"
        />

        {/* Left Details */}
        <View style={styles.purchaseDetails}>
          {/* 1. Corrected property name from item.name to item.product_name */}
          {item.product_name && (
            <Text style={styles.purchaseProductName}>{item.product_name}</Text>
          )}

          {/* 2. Quantity - Conditionally rendered */}
          {item.quantity !== undefined && (
            <Text style={styles.purchaseDetailText}>
              <Text style={{fontWeight: 'bold'}}>Quantity: </Text>
              {item.quantity}
            </Text>
          )}

          {/* 3. Weight - Conditionally rendered and added unit if available */}
          {item.weight !== undefined && (
            <Text style={styles.purchaseDetailText}>
              <Text style={{fontWeight: 'bold'}}>Weight: </Text>
              {item.weight} {item.weight_unit || ''}
            </Text>
          )}
        </View>

        {/* Right Section */}
        <View style={styles.purchaseRightSection}>
          {/* 4. Order Date - Conditionally rendered and formatted */}
          {item.order_date && (
            <Text style={styles.purchaseOrderDate}>
              Ordered on {formattedDate}
            </Text>
          )}

          {/* 5. Payment Method - Conditionally rendered and parsed */}
          {item.payment_method && lastFourDigits && (
            <Text style={styles.purchasePayment}>
              {/* Conditional rendering for the "VISA" part using a new property */}
              {item.show_visa_logo && (
                <Text style={{fontWeight: 'bold', color: ACCENT_COLOR}}>
                  VISA{' '}
                </Text>
              )}
              Paid via Card ************{lastFourDigits}
            </Text>
          )}

          {/* 6. Total Amount - Conditionally rendered */}
          {item.total_amount !== undefined && (
            <Text style={styles.purchaseAmount}>
              <Text style={{fontWeight: 'bold'}}>Amount: </Text>
              {item.total_amount} {item.currency_code || 'INR'}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  purchaseCard: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  purchaseCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  purchaseProductImage: {
    width: 70,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
  },
  purchaseDetails: {
    flex: 1,
    marginRight: 10,
  },
  purchaseRightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  purchaseProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DARK_TEXT,
    marginBottom: 4,
  },
  purchaseDetailText: {
    fontSize: 13,
    color: GRAY_TEXT,
    marginBottom: 2,
  },
  purchaseOrderDate: {
    fontSize: 13,
    color: GRAY_TEXT,
    marginBottom: 4,
  },
  purchasePayment: {
    fontSize: 13,
    color: GRAY_TEXT,
    marginBottom: 4,
  },
  purchaseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DARK_TEXT,
  },
});

export default PurchaseNewOrderCard;
