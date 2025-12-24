import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import UserOrderTimeline from '../../components/user/UserOrderTimeline';

const Header = ({onBack}) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <Image
        source={require('../../../assets/images/ic_back_press.png')}
        style={{height: 20, width: 20}}></Image>
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Order Details</Text>
    <View style={styles.headerSpacer} />
  </View>
);

// Status Badge Component
const StatusBadge = ({status}) => (
  <View style={styles.statusBadge}>
    <Text style={styles.statusText}>{status}</Text>
  </View>
);

// Info Row Component
const InfoRow = ({label, value, isBold = false}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, isBold && styles.boldText]}>{value}</Text>
  </View>
);

// Product Card Component
const ProductCard = ({name, color, quantity, price}) => (
  <View style={styles.productCard}>
    <View style={styles.productImage}>
      {/* <View style={styles.imagePlaceholder}>
        <Text style={styles.imageIcon}>🎧</Text>
      </View> */}
      <View style={styles.imagePlaceholder}>
        <Image
          source={require('../../../assets/images/ic_maggi.png')}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
    </View>
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productMeta}>
        {color} • {quantity}
      </Text>
      <Text style={styles.productPrice}>{price}</Text>
    </View>
  </View>
);

// Button Component
const Button = ({title, onPress, variant = 'primary'}) => {
  const icon =
    variant === 'primary'
      ? require('../../../assets/images/ic_referesh_img.png')
      : require('../../../assets/images/ic_cart_icon.png');

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary,
      ]}
      onPress={onPress}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />

      <Text
        style={[
          styles.buttonText,
          variant === 'primary'
            ? styles.buttonTextPrimary
            : styles.buttonTextSecondary,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Main Component
const UserOrderDetail = () => {
  const navigation = useNavigation();

  const orderStatuses = [
    {
      id: '1',
      status: 'Delivered',
      date: 'May 16, 2025',
      time: '10:24 AM',
      description: 'Your order has been delivered',
      completed: true,
    },
    {
      id: '2',
      status: 'Out for Delivery',
      date: 'May 16, 2025',
      time: '08:15 AM',
      description: 'Your order is out for delivery',
      completed: true,
    },
    {
      id: '3',
      status: 'Shipped',
      date: 'May 14, 2025',
      time: '02:30 PM',
      description: 'Your order has been shipped',
      completed: true,
    },
    {
      id: '4',
      status: 'Order Confirmed',
      date: 'May 12, 2025',
      time: '11:45 AM',
      description: 'Your order has been confirmed',
      completed: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Order Header */}
        <View style={styles.section}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderId}>Order #SND7862</Text>
              <Text style={styles.orderDate}>Placed on May 12, 2025</Text>
            </View>
            <StatusBadge status="Delivered" />
          </View>
        </View>

        {/* Payment Info */}
        <View style={styles.section}>
          <View style={styles.paymentRow}>
            <View>
              <Text style={styles.sectionLabel}>Payment Method</Text>
              <View style={styles.paymentMethod}>
                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>💳</Text>
                </View>
                <Text style={styles.cardNumber}>•••• 4582</Text>
              </View>
            </View>

            <View style={styles.totalAmount}>
              <Text style={styles.sectionLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>$149.99</Text>
            </View>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <Image
              source={require('../../../assets/images/ic_location_user.png')}
              resizeMode="contain"
              style={{height: 20, width: 20, marginEnd: 10}}></Image>
            <View style={styles.addressInfo}>
              <Text style={styles.addressName}>John Doe</Text>
              <Text style={styles.addressText}>123 Main Street, Apt 4B</Text>
              <Text style={styles.addressText}>New York, NY 10001</Text>
              <Text style={styles.addressText}>United States</Text>
              <Text style={styles.addressPhone}>+1 (555) 123-4567</Text>
            </View>
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <ProductCard
            name="SoundMix Pro Wireless Headphones"
            color="Blue"
            quantity="1 Item"
            price="$149.99"
          />
        </View>

        {/* Price Breakdown */}
        <View style={styles.section}>
          <InfoRow label="Subtotal" value="$149.99" />
          <InfoRow label="Shipping" value="$0.00" />
          <InfoRow label="Tax" value="$12.06" />
          <View style={styles.divider} />
          <InfoRow label="Total" value="$161.99" isBold />
        </View>

        {/* Tracking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipment Tracking</Text>
          <View style={styles.trackingList}>
            <UserOrderTimeline statuses={orderStatuses} />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.actionButtons}>
          <View style={{flex: 1, marginRight: 12}}>
            <Button
              title="Return Item"
              variant="primary"
              onPress={() => navigation.navigate('UserOrderDetailRefund')}
            />
          </View>

          <View style={{flex: 1}}>
            <Button
              title="Buy Again"
              variant="secondary"
              onPress={() => console.log('Buy again')}
            />
          </View>
        </View>

        {/* Review Button */}
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => navigation.navigate('UsersWriteReviewScreen')}>
          <Text style={styles.reviewButtonText}>Write a Review</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F8F9FA'},

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  backButton: {padding: 8},
  backIcon: {fontSize: 24, color: '#000'},
  headerTitle: {fontSize: 18, fontWeight: '600', color: '#000'},
  headerSpacer: {width: 40},

  scrollView: {flex: 1},

  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },

  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  orderId: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  orderDate: {fontSize: 14, color: '#6B7280'},

  statusBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 6,
    maxHeight: 30,
  },
  statusText: {color: '#059669', fontSize: 12, fontWeight: '500'},

  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  sectionLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },

  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardIcon: {
    width: 24,
    height: 16,
    backgroundColor: '#1E40AF',
    borderRadius: 2,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIconText: {fontSize: 10, color: '#fff'},

  cardNumber: {fontSize: 14, color: '#000'},

  totalAmount: {alignItems: 'flex-start'},
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    alignItems: 'flex-start',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },

  addressCard: {
    flexDirection: 'row',
  },

  addressIcon: {
    fontSize: 20,
    marginRight: 12,
  },

  addressInfo: {flex: 1},

  addressName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  addressText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  addressPhone: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
  },

  productCard: {
    flexDirection: 'row',
  },

  imagePlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  icon: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },

  imageIcon: {fontSize: 32},

  productInfo: {flex: 1},

  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },

  productMeta: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },

  productPrice: {fontSize: 16, fontWeight: '600'},

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  infoLabel: {fontSize: 14, color: '#6B7280'},
  infoValue: {fontSize: 14},
  boldText: {fontSize: 16, fontWeight: '700'},

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 12,
  },

  trackingList: {marginTop: 8},

  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
  },

  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  buttonPrimary: {
    backgroundColor: '#FF8C00',
  },

  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF8C00',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  buttonTextPrimary: {color: '#FFFFFF'},
  buttonTextSecondary: {color: '#FF8C00'},

  reviewButton: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 24,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },

  reviewButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },

  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 12,
    justifyContent: 'space-around',
  },

  navItem: {padding: 8},
  navIcon: {fontSize: 24},
});

export default UserOrderDetail;
