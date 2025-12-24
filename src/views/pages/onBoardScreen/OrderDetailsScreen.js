import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
 
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


// --- MOCK DATA (Structured to match the screen sections) ---
const MOCK_ORDER_DETAILS = {
  id: '#ORD-2025-1742',
  status: 'Delivered',
  datePlaced: 'May 12, 2025 at 5:40 PM',
  promo: '15% OFF',

  shipping: {
    recipient: 'John Smith',
    address: '123 Broadway Street, Apt 4B\nNew York, NY 10001\nUnited States',
    carrier: 'UPS Express',
    tracking: 'TRK789456123',
  },

  payment: {
    method: '**** 4242',
    transactionId: 'TXN-2025-789456',
    paymentDate: 'May 12, 2025',
    processor: 'Stripe',
    status: 'Paid',
  },

  products: [
    { name: 'Wireless Headphones', details: 'Color: Black | SKU: WH-BLK-001', price: 79.99, quantity: 1, imageUrl: 'https://via.placeholder.com/50/000000/FFFFFF?text=HP', promotion: null, lineTotal: 79.99 },
    { name: 'Phone Case', details: 'Type: Clear | SKU: PC-CLR-002', price: 19.99, quantity: 2, imageUrl: 'https://via.placeholder.com/50/4CAF50/FFFFFF?text=PC', promotion: '15% OFF Applied', lineTotal: 39.98 },
    { name: 'Screen Protector', details: 'Type: Tempered Glass | SKU: SP-TG-003', price: 12.99, quantity: 1, imageUrl: 'https://via.placeholder.com/50/2196F3/FFFFFF?text=SP', promotion: null, lineTotal: 12.99 },
  ],

  pricing: {
    subtotal: 132.96,
    shipping: 8.99,
    tax: 11.32,
    discount: -19.94,
    total: 128.50,
  },

  timeline: [
    { status: 'Delivered', time: 'May 15, 2025 at 2:30 PM', description: 'Package delivered to recipient' },
    { status: 'Out for Delivery', time: 'May 15, 2025 at 8:00 AM', description: 'Package is out for delivery' },
    { status: 'Shipped', time: 'May 13, 2025 at 4:15 PM', description: 'Package shipped via UPS Express' },
    { status: 'Processing', time: 'May 13, 2025 at 11:20 AM', description: 'Order is being prepared for shipment' },
    { status: 'Order Placed', time: 'May 12, 2025 at 5:40 PM', description: 'Order received and confirmed' },
  ],
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered': return '#43A3A3';
    case 'Processing': return '#FF9800';
    case 'Shipped': return '#2196F3';
    case 'Cancelled': return '#F44336';
    default: return '#9E9E9E';
  }
};

// --- Renderer Helpers ---

const renderTimelineItem = (item, index, array) => {
  const isLast = index === array.length - 1;
  const isDelivered = item.status === 'Delivered';
  
  return (
    <View key={index} style={detail_styles.detail_timelineRow}>
      <View style={detail_styles.detail_timelineIndicatorContainer}>
        {/* The dot */}
        <View style={[
          detail_styles.detail_timelineDot, 
          { backgroundColor: isDelivered ? getStatusColor('Delivered') : '#333333' }
        ]} />
        {/* The line */}
        {!isLast && <View style={detail_styles.detail_timelineLine} />}
      </View>
      <View style={detail_styles.detail_timelineContent}>
        <Text style={[
          detail_styles.detail_timelineStatus,
          { color: isDelivered ? getStatusColor('Delivered') : '#333333' }
        ]}>{item.status}</Text>
        <Text style={detail_styles.detail_timelineTime}>{item.time}</Text>
        <Text style={detail_styles.detail_timelineDescription}>{item.description}</Text>
      </View>
    </View>
  );
};

const renderProductItem = (product, index) => (
  <View key={index} style={detail_styles.detail_productRow}>
    <View style={detail_styles.detail_productImagePlaceholder}>
        <Text style={detail_styles.detail_productImageText}>IMG</Text>
        { <Image source={require('../../../assets/images/ic_maggi.png')} style={detail_styles.detail_productImage} />}
    </View>
    <View style={detail_styles.detail_productInfo}>
      <Text style={detail_styles.detail_productName}>{product.name}</Text>
      <Text style={detail_styles.detail_productDetails}>{product.details}</Text>
      <Text style={detail_styles.detail_productPriceQty}>
        ${product.price.toFixed(2)} x {product.quantity}
      </Text>
      {product.promotion && (
        <Text style={detail_styles.detail_productPromoText}>{product.promotion}</Text>
      )}
    </View>
    <Text style={detail_styles.detail_productLineTotal}>
      ${product.lineTotal.toFixed(2)}
    </Text>
  </View>
);


// --- Main Component ---
const OrderDetailsScreen = ({ order = MOCK_ORDER_DETAILS, onBack, onDownload, onEdit }) => {
  
  var navigation = useNavigation()
  
  const backHandler =()=>{
  navigation.goBack()
   }

  return (
    <SafeAreaView style={detail_styles.detail_safeArea}>
      
      {/* Fixed Header */}
      <View style={detail_styles.detail_fixedHeader}>
        <TouchableOpacity onPress={backHandler} style={detail_styles.detail_backButton}>
            <Image source={require('../../../assets/images/ic_back_btn.png')} style={{width:17,height:17}}></Image>
        </TouchableOpacity>
        <Text style={detail_styles.detail_headerTitle}>{order.id}</Text>
        <View style={detail_styles.detail_headerActions}>
          <TouchableOpacity onPress={onDownload} style={detail_styles.detail_actionButton}>
           <Image source={require('../../../assets/images/ic-download_icon_1.png')} style={{width:17,height:17}}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={onEdit} style={detail_styles.detail_actionButton}>
            <Image source={require('../../../assets/images/ic_edit_option.png')} style={{width:17,height:17}}></Image>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={detail_styles.detail_scrollViewContent}>
        
        {/* 1. Order Summary Card */}
        <View style={detail_styles.detail_card}>
          <View style={detail_styles.detail_cardHeader}>
            <Text style={detail_styles.detail_cardTitle}>Order Summary</Text>
            <View style={[
              detail_styles.detail_statusBadge,
              { backgroundColor: getStatusColor(order.status) }
            ]}>
              <Text style={detail_styles.detail_statusText}>{order.status}</Text>
            </View>
          </View>
          <View style={detail_styles.detail_promoRow}>
            <View style={detail_styles.detail_promoBadge}>
              <Text style={detail_styles.detail_promoText}>{order.promo}</Text>
            </View>
            <View style={detail_styles.active_indicator}>
            <Image source={require('../../../assets/images/ic_green_active_dot.png')} style={{height:7,width:7,marginTop:5}} 
             resizeMode='contain'
            ></Image>  
            <Text style={detail_styles.detail_activeOfferText}>Active Offer</Text>
            </View>
          </View>
          <Text style={detail_styles.detail_placedText}>
            Placed on: {order.datePlaced}
          </Text>
        </View>

        {/* 2. Shipping Information Card */}
        <View style={detail_styles.detail_card}>
          <Text style={detail_styles.detail_cardTitle}>Shipping Information</Text>
          <Text style={detail_styles.detail_shippingRecipient}>{order.shipping.recipient}</Text>
          <Text style={detail_styles.detail_shippingAddress}>{order.shipping.address}</Text>
          
          <View style={detail_styles.detail_shippingInfoRow}>
            <View>
              <Text style={detail_styles.detail_infoLabel}>Carrier</Text>
              <Text style={detail_styles.detail_infoValue}>{order.shipping.carrier}</Text>
            </View>
            <View style={detail_styles.detail_trackingBox}>
              <Text style={detail_styles.detail_infoLabel}>Tracking</Text>
             <View style={detail_styles.active_indicator1}>

              <Text style={detail_styles.detail_trackingValue}>
                {order.shipping.tracking}
              </Text>
              <Image style={require('../../../assets/images/ic_tracking.png')}></Image>
              
              </View>
            </View>
          </View>
        </View>

        {/* 3. Payment Information Card */}
        <View style={detail_styles.detail_card}>
          <Text style={detail_styles.detail_cardTitle}>Payment Information</Text>
          <View style={detail_styles.detail_paymentMethodRow}>
            <View>
              <Text style={detail_styles.detail_infoLabel}>Method</Text>
              <Text style={detail_styles.detail_infoValue}>{order.payment.method}</Text>
            </View>
            <View style={[
              detail_styles.detail_paymentStatusBadge,
              { backgroundColor: getStatusColor('Delivered') } // Use green for Paid
            ]}>
              <Text style={detail_styles.detail_paymentStatusText}>{order.payment.status}</Text>
            </View>
          </View>
          
          <View style={detail_styles.detail_paymentInfoRow}>
            <View>
              <Text style={detail_styles.detail_infoLabel}>Transaction ID</Text>
              <Text style={detail_styles.detail_infoValue}>{order.payment.transactionId}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={detail_styles.detail_infoLabel}>Payment Date</Text>
              <Text style={detail_styles.detail_infoValue}>{order.payment.paymentDate}</Text>
            </View>
          </View>
          <Text style={detail_styles.detail_processorText}>
            Processed via {order.payment.processor}
          </Text>
        </View>

        {/* 4. Order Items Card */}
        <View style={detail_styles.detail_card}>
          <Text style={detail_styles.detail_cardTitle}>Order Items</Text>
          {order.products.map(renderProductItem)}
          
          <View style={detail_styles.detail_pricingContainer}>
            <View style={detail_styles.detail_pricingRow}>
              <Text style={detail_styles.detail_pricingLabel}>Subtotal</Text>
              <Text style={detail_styles.detail_pricingValue}>
                ${order.pricing.subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={detail_styles.detail_pricingRow}>
              <Text style={detail_styles.detail_pricingLabel}>Shipping</Text>
              <Text style={detail_styles.detail_pricingValue}>
                ${order.pricing.shipping.toFixed(2)}
              </Text>
            </View>
            <View style={detail_styles.detail_pricingRow}>
              <Text style={detail_styles.detail_pricingLabel}>Tax</Text>
              <Text style={detail_styles.detail_pricingValue}>
                ${order.pricing.tax.toFixed(2)}
              </Text>
            </View>
            <View style={detail_styles.detail_pricingRow}>
              <Text style={detail_styles.detail_pricingLabel}>Discount ({order.promo})</Text>
              <Text style={detail_styles.detail_discountValue}>
                -${Math.abs(order.pricing.discount).toFixed(2)}
              </Text>
            </View>
            <View style={detail_styles.detail_totalRow}>
              <Text style={detail_styles.detail_totalLabel}>Total</Text>
              <Text style={detail_styles.detail_totalValue}>
                ${order.pricing.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* 5. Order Timeline Card */}
        <View style={detail_styles.detail_card}>
          <Text style={detail_styles.detail_cardTitle}>Order Timeline</Text>
          {order.timeline.map(renderTimelineItem)}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};



const detail_styles = StyleSheet.create({
  detail_safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  detail_fixedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  detail_backButton: {
    padding: 5,
  },
  detail_backIcon: {
    fontSize: 24,
    color: '#333333',
  },
  detail_headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  detail_headerActions: {
    flexDirection: 'row',
  },
  detail_actionButton: {
    marginLeft: 15,
  },
  detail_actionIcon: {
    fontSize: 18,
    color: '#757575',
  },
  detail_scrollViewContent: {
    padding: 15,
  },
  detail_card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detail_cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detail_cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  detail_statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  detail_statusText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  
  // Order Summary Specific
  detail_promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detail_promoBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#B3FF6B35',
  },
  detail_promoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  active_indicator:{
     flexDirection:'row',
     gap:2
  },
   active_indicator1:{
     flexDirection:'row',
  
  },
  detail_activeOfferText: {
    fontSize: 12,
    color: '#43A3A3', // Green for 'Active Offer'
    fontWeight: '500',
  },
  detail_placedText: {
    fontSize: 14,
    color: '#757575',
  },
  
  // Shipping & Payment Common Styles
  detail_shippingRecipient: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginTop: 5,
    marginBottom: 5,
  },
  detail_shippingAddress: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 15,
  },
  detail_shippingInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail_trackingBox: {
    alignItems: 'flex-end',
  },
  detail_infoLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 2,
  },
  detail_infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },

  // Payment Specific
  detail_paymentMethodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  detail_paymentStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  detail_paymentStatusText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  detail_paymentInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detail_processorText: {
    fontSize: 12,
    color: '#757575',
  },
  
  // Order Items Specific
  detail_productRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  detail_productImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    overflow: 'hidden',
  },
  detail_productImageText: {
    fontSize: 10,
    color: '#9E9E9E',
  },
  detail_productInfo: {
    flex: 1,
    marginRight: 10,
  },
  detail_productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
  },
  detail_productDetails: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 2,
  },
  detail_productPriceQty: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  detail_productPromoText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
    marginTop: 2,
  },
  detail_productLineTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
  },
  
  // Pricing/Totals
  detail_pricingContainer: {
    paddingTop: 15,
  },
  detail_pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detail_pricingLabel: {
    fontSize: 14,
    color: '#555555',
  },
  detail_pricingValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  detail_discountValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F44336', // Red for discounts
  },
  detail_totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  detail_totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  detail_totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35', // Primary color for total
  },

  // Timeline Specific
  detail_timelineRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detail_timelineIndicatorContainer: {
    width: 20,
    alignItems: 'center',
    marginRight: 15,
  },
  detail_timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 1,
  },
  detail_timelineLine: {
    position: 'absolute',
    top: 12,
    bottom: -15,
    width: 2,
    backgroundColor: '#E0E0E0',
  },
  detail_timelineContent: {
    flex: 1,
    paddingBottom: 5,
  },
  detail_timelineStatus: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  detail_timelineTime: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 5,
  },
  detail_timelineDescription: {
    fontSize: 14,
    color: '#555555',
  },
});

export default OrderDetailsScreen;