import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';

import ExportNotification from '../../components/ExportNotification';
import {SafeAreaView} from 'react-native-safe-area-context';
import NoOrder from '../../components/NoOrder';
import OrderFilterModal from '../../components/OrderFilterModal';
import UpdateStatusModal from '../../components/UpdateStatusModal';
import {useNavigation} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import GenericNetworkConnectivityError from '../../components/GenericNetworkConnectivityError';
import Header from '../../components/Header';

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [showNoOrder, setShowNoOrder] = useState(true);
  const [orderFilterVisible, setOrderVisible] = useState(false);
  const [updateOrderVisible, setUpdateOrderVisible] = useState(false);
  const navigation = useNavigation();
  const [showNotification, setShowNotification] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNoOrder(false);
    }, 5000); // ⏱️ 5 seconds

    // cleanup timer if component unmounts early
    return () => clearTimeout(timer);
  }, []);

  const mockOrders = [
    {
      id: 'ORD-2024-001',
      status: 'Delivered',
      items: 3,
      total: '$249.99',
      date: 'Jan 15, 2024',
      paymentMethod: 'Visa',
      promotion: '10% OFF',
      customerEmail: 'john.doe@example.com',
      shippingAddress: '123 Main St, New York, NY 10001',
      notes: 'Leave at door',
      products: [
        {
          name: 'Wireless Headphones',
          sku: 'WH-001',
          price: '$99.99',
          quantity: 1,
        },
        {
          name: 'Phone Case',
          sku: 'PC-045',
          price: '$24.99',
          quantity: 2,
        },
      ],
    },
    {
      id: 'ORD-2024-002',
      status: 'Processing',
      items: 2,
      total: '$189.50',
      date: 'Jan 16, 2024',
      paymentMethod: 'Mastercard',
      customerEmail: 'jane.smith@example.com',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
      products: [
        {
          name: 'Smart Watch',
          sku: 'SW-023',
          price: '$149.99',
          quantity: 1,
        },
      ],
    },
    {
      id: 'ORD-2024-003',
      status: 'Pending',
      items: 5,
      total: '$459.95',
      date: 'Jan 17, 2024',
      paymentMethod: 'PayPal',
      promotion: '15% OFF',
      customerEmail: 'mike.johnson@example.com',
      shippingAddress: '789 Pine Rd, Chicago, IL 60601',
      products: [
        {
          name: 'Laptop Stand',
          sku: 'LS-034',
          price: '$79.99',
          quantity: 1,
        },
        {
          name: 'Keyboard',
          sku: 'KB-056',
          price: '$129.99',
          quantity: 1,
        },
      ],
    },
  ];

  const stats = [
    {
      label: 'Total Orders',
      value: '1,247',
      change: 12.5,
      isPositive: true,
      type: 'total',
    },
    {
      label: 'Pending',
      value: '89',
      change: -3.2,
      isPositive: false,
      type: 'Pending',
    },
    {
      label: 'Processing',
      value: '156',
      change: 8.7,
      isPositive: true,
      type: 'Processing',
    },
  ];

  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#2DD4BF';
      case 'processing':
        return '#FBBF24';
      case 'pending':
        return '#FB923C';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#9CA3AF';
    }
  };

  const toggleOrderSelection = orderId => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId],
    );
  };

  const toggleOrderExpansion = orderId => {
    setExpandedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId],
    );
  };

  const filteredOrders = mockOrders.filter(
    order =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderStatCard = ({item}) => (
    <View style={styles.statCard}>
      <Text
        style={[
          styles.statLabel,
          {
            color:
              item.type === 'Total'
                ? '#3D3A3A'
                : item.type === 'Pending'
                ? '#C8A825'
                : '#FFAF66',
          },
        ]}>
        {item.value}
      </Text>
      <View style={styles.statValueRow}>
        <Text style={styles.statValue}>{item.label}</Text>
        <View style={[styles.statChange]}>
          <Text
            style={[
              styles.statChangeText,
              {color: item.isPositive ? '#059669' : '#C8A825'},
            ]}>
            {item.isPositive ? '↑' : '↓'} {Math.abs(item.change)}%
          </Text>
        </View>
      </View>
    </View>
  );

  const renderOrderCard = ({item}) => {
    const isSelected = selectedOrders.includes(item.id);
    const isExpanded = expandedOrders.includes(item.id);

    // Helper to determine status color based on status text (implementation needed elsewhere)
    const getStatusColor = status => {
      switch (status.toLowerCase()) {
        case 'delivered':
          return '#43A3A3';
        case 'processing':
          return '#FFAF66';
        case 'pending':
          return '#C8A825';
        case 'cancelled':
          return '#EF4444';
        default:
          return '#9CA3AF';
      }
    };

    return (
      <View
        style={[
          styles.cardContainerNEW,
          isSelected && {borderColor: '#FF6B35', borderWidth: 2},
        ]}>
        {/* Top Header Row: Order ID, Status, More Icon */}
        <View style={styles.headerRowNEW}>
          <Text style={styles.orderIdTextNEW}>{item.id}</Text>
          <View style={styles.headerRightNEW}>
            <View
              style={[
                styles.statusPillNEW,
                {backgroundColor: getStatusColor(item.status)},
              ]}>
              <Text style={styles.statusTextNEW}>{item.status}</Text>
            </View>

            <Text style={styles.moreIconNEW}>⋮</Text>
          </View>
        </View>

        {/* Item Details and Total/Date Row */}
        <View style={styles.detailRowNEW}>
          <View style={styles.detailColumnLeftNEW}>
            <View style={styles.detailItemRowNEW}>
              <Text style={styles.labelNEW}>Items</Text>
              <Text style={styles.valueNEW}>{item.items}</Text>
            </View>
          </View>
          <View style={styles.detailColumnRightNEW}>
            <View style={styles.detailItemRowRightNEW}>
              <Text style={styles.labelNEW1}>Total</Text>
              <Text style={styles.totalValueNEW}>{item.total}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailRowNEW}>
          <View style={styles.detailColumnLeftNEW}>
            <View style={styles.detailItemRowNEW}>
              <Text style={styles.labelNEW}>Payment</Text>
              <View style={styles.paytmIcon}>
                <Image
                  source={require('../../../assets/images/ic_paypal_icon.png')}
                  style={{height: 14, width: 15, marginTop: 3}}
                  resizeMode="contain"></Image>
                <Text style={styles.paymentValueNEW}>PayPal</Text>
              </View>
            </View>

            {/* Promotion/Buy 2 Get 1 Badge */}
            <View style={styles.promotionBadgeNEW}>
              <Text style={styles.promotionTextNEW}>Buy 2 Get 1</Text>
            </View>
          </View>
          <View style={styles.detailColumnRightNEW}>
            <View style={styles.detailItemRowRightNEW}>
              <Text style={styles.labelNEW}>Date</Text>
              <Text style={styles.valueNEW}>May 11, 2025</Text>
              {item.id === 'ORD-2024-001' && (
                <Text style={styles.valueNEW1}>Tracking</Text>
              )}
              {item.id === 'ORD-2024-001' && (
                <Text style={styles.valueNEW1}>TRK789...</Text>
              )}
            </View>

            {/* Product Images (simplified placeholders) */}
            <View style={styles.productImagesContainerNEW}>
              {/* Assuming item.products is an array of images/placeholders */}
              <View
                style={[
                  styles.smallImagePlaceholderNEW,
                  {backgroundColor: '#f5e2d8'},
                ]}>
                <Image
                  source={require('../../../assets/images/ic_maggi.png')}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}></Image>
              </View>
              <View
                style={[
                  styles.smallImagePlaceholderNEW,
                  {backgroundColor: '#d8f5d8'},
                ]}>
                <Image
                  source={require('../../../assets/images/ic_maggi.png')}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}></Image>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionRowNEW}>
          <TouchableOpacity
            style={styles.updateStatusButtonNEW}
            onPress={() => setUpdateOrderVisible(true)}>
            <Text style={styles.buttonTextPrimaryNEW}>Update Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelOrderButtonNEW}>
            <Text style={styles.buttonTextSecondaryNEW}>View Invoice</Text>
          </TouchableOpacity>
        </View>

        {/* View More Details Section (Toggled at the bottom) */}
        <TouchableOpacity
          style={styles.viewMoreButtonNEW}
          onPress={() => navigation.navigate('OrderDetailsScreen')}>
          <Text style={styles.viewMoreTextNEW}>View More Details</Text>

          {isExpanded ? (
            <Image
              source={require('../../../assets/images/ic_small_drop_down.png')}
              styles={{height: 10, width: 10}}
              resizeMode="contain"
              style={styles.dropdownIconNEW}
            />
          ) : (
            <Image
              source={require('../../../assets/images/ic_small_drop_down.png')}
              style={styles.dropdownIconNEW}
            />
          )}
        </TouchableOpacity>

        {/* Expanded Details Section */}
        {isExpanded && <View style={styles.expandedSectionNEW}></View>}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {showNoOrder ? (
        <NoOrder />
      ) : (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

          {/* Header */}

          <Header onBackPress={true} title={'Orders'} />

          {/* <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../../assets/images/ic_back_btn.png')}
                style={{height: 16, width: 16, marginLeft: 20}}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Orders</Text>
            <TouchableOpacity style={styles.menuButton}></TouchableOpacity>
          </View> */}

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}>
            {/* Search Bar */}
            {showNotification && (
              <ExportNotification onClose={() => setShowNotification(false)} />
            )}

            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Image
                  source={require('../../../assets/images/ic_search_icon.png')}
                  style={{height: 20, width: 20}}></Image>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search order ID, email, SKU..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setOrderVisible(true)}>
                <Image
                  source={require('../../../assets/images/ic_filter_icon.png')}
                  style={{height: 48, width: 20}}
                  resizeMethod="contain"></Image>
              </TouchableOpacity>
            </View>

            {/*  when no internetconnection*/}
            <View style={{flex: 1}}>
              {!isConnected && <GenericNetworkConnectivityError />}
            </View>
            {/* Segment Control */}
            {showHeader && (
              <View style={styles.segmentControl}>
                <TouchableOpacity
                  style={[
                    styles.segmentButton,
                    activeTab === 'overview' && styles.segmentButtonActive,
                  ]}
                  onPress={() => setActiveTab('overview')}>
                  <Text
                    style={[
                      styles.segmentButtonText,
                      activeTab === 'overview' &&
                        styles.segmentButtonTextActive,
                    ]}>
                    Overview
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.segmentButton,
                    activeTab === 'returns' && styles.segmentButtonActive,
                  ]}
                  onPress={() => setActiveTab('returns')}>
                  <Text
                    style={[
                      styles.segmentButtonText,
                      activeTab === 'returns' && styles.segmentButtonTextActive,
                    ]}>
                    Returns
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {/* Stats Cards */}
            <FlatList
              data={stats}
              renderItem={renderStatCard}
              keyExtractor={item => item.label}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.statsContainer}
            />

            {/* Orders List */}
            <FlatList
              data={filteredOrders}
              renderItem={renderOrderCard}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.ordersContainer}
              scrollEnabled={false}
            />
          </ScrollView>

          {/* Action Bar */}
          {selectedOrders.length > 0 && (
            <View style={styles.actionBar}>
              <View style={styles.actionBarContent}>
                <View style={styles.actionBarLeft}>
                  <Text style={styles.actionBarText}>
                    {selectedOrders.length} order
                    {selectedOrders.length !== 1 ? 's' : ''} selected
                  </Text>
                  <TouchableOpacity onPress={() => setSelectedOrders([])}>
                    <Text style={styles.actionBarClear}>Clear</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.actionBarButtons}>
                  <TouchableOpacity style={styles.actionBarButton}>
                    <Text style={styles.actionBarButtonText}>🔄 Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBarButton}>
                    <Text style={styles.actionBarButtonText}>📥 Export</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBarButton}>
                    <Text
                      style={[styles.actionBarButtonText, {color: '#EF4444'}]}>
                      🗑️ Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          <OrderFilterModal
            isVisible={orderFilterVisible}
            onClose={() => setOrderVisible(false)}
            onApplyFilters={filters => console.log('Filters:', filters)}
          />

          <UpdateStatusModal
            isVisible={updateOrderVisible}
            onClose={() => setUpdateOrderVisible(false)}></UpdateStatusModal>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 10,
    position: 'relative', // Important for absolute title positioning
  },
  paytmIcon: {
    flexDirection: 'row',
  },
  dropdownIconNEW: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: '#000',
  },

  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },

  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  menuButton: {
    padding: 5,
  },

  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterIcon: {
    fontSize: 20,
  },
  segmentControl: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 16,
    marginTop: 16,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  segmentButtonActive: {
    backgroundColor: '#FF6B35',
  },
  segmentButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  segmentButtonTextActive: {
    color: '#FFFFFF',
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 6,
    minWidth: 130,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#3D3A3A',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  statValueRow: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '100',
    color: '#1F2937',
  },
  statChange: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statChangeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  ordersContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FF6B35',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#FF6B35',
  },
  orderHeaderInfo: {
    flex: 1,
  },
  orderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  orderDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  orderDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    minWidth: '45%',
  },
  detailLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  productImages: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  productImagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImageText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  expandedSection: {
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  expandedDetails: {
    gap: 12,
  },
  expandedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  expandedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  expandedLabel: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },
  expandedValue: {
    fontSize: 13,
    color: '#1F2937',
    flex: 1,
    textAlign: 'right',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  productImageSmall: {
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  productSku: {
    fontSize: 11,
    color: '#6B7280',
  },
  productPricing: {
    alignItems: 'flex-end',
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  productQuantity: {
    fontSize: 11,
    color: '#6B7280',
  },
  orderActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    color: '#1F2937',
    fontSize: 13,
    fontWeight: '600',
  },
  expandButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  expandButtonText: {
    color: '#1F2937',
    fontSize: 13,
    fontWeight: '600',
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  actionBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionBarText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  actionBarClear: {
    fontSize: 13,
    color: '#6B7280',
  },
  actionBarButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBarButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  actionBarButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },

  //new screen

  cardContainerNEW: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.005,
    shadowRadius: 2,
    elevation: 1,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },

  // --- Header Section ---
  headerRowNEW: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderIdTextNEW: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerRightNEW: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusPillNEW: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#FFAD60', // Orange for Processing
    marginRight: 8,
  },
  statusTextNEW: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  moreIconNEW: {
    fontSize: 20,
    color: '#999999',
  },

  // --- Details Section ---
  detailRowNEW: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailColumnLeftNEW: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 10,
  },
  detailColumnRightNEW: {
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  detailItemRowNEW: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailItemRowRightNEW: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 4,
    alignItems: 'flex-end',
  },
  labelNEW: {
    fontSize: 14,
    color: '#757575',
    marginRight: 8,
  },
  labelNEW1: {
    fontSize: 14,
    color: '#757575',

    textAlign: 'right', // <-- **ADDED THIS LINE**
  },
  valueNEW: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  valueNEW1: {
    fontSize: 14,
    color: '#5A5A5A',
    fontWeight: '200',
    marginTop: 3,
  },
  totalValueNEW: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  paymentValueNEW: {
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
  },

  // --- Promotion/Images ---
  promotionBadgeNEW: {
    backgroundColor: '#E5F3FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,

    borderColor: '#43A3A3',
    backgroundColor: '#EDF7F6',
  },
  promotionTextNEW: {
    color: '#43A3A3',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productImagesContainerNEW: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'flex-end',
  },
  smallImagePlaceholderNEW: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#D1D1D1',
    marginLeft: 4, // Aligns images to the right
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },

  // --- Action Buttons ---
  actionRowNEW: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  updateStatusButtonNEW: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#FF6B35', // Orange primary button
    paddingVertical: 12, // Increased padding to match image height
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelOrderButtonNEW: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#FFFFFF', // White secondary button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  buttonTextPrimaryNEW: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSecondaryNEW: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // --- View More Details ---
  viewMoreButtonNEW: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 16,
  },
  viewMoreTextNEW: {
    color: '#757575', // Gray color as seen in the image
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
    flex: 1,
  },

  // --- Expanded Section (Placeholder) ---
  expandedSectionNEW: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});

export default OrdersScreen;
