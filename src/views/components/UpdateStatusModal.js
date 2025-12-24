import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';

const MOCK_ORDER = {
  id: '#ORD-2025-1741',
  customerName: 'Sarah Johnson',
  total: '$89.99',
  currentStatus: 'Processing',
};

const STATUS_OPTIONS = [
  { status: 'Placed', description: 'Order has been placed and confirmed', icon: require('../../assets/images/ic_placed.png') },
  { status: 'Processing', description: 'Order is being prepared for shipment', icon: require('../../assets/images/ic_processing.png') },
  { status: 'Shipped', description: 'Order has been shipped to customer', icon: require('../../assets/images/ic_shipment.png') },
  { status: 'Delivered', description: 'Order has been delivered successfully', icon: require('../../assets/images/ic_delivered.png') },
  { status: 'Cancelled', description: 'Order has been cancelled', icon: require('../../assets/images/ic_canceled.png') },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Processing': return '#FFAF66';
    case 'Delivered': return '#4CAF50';
    case 'Shipped': return '#2196F3';
    case 'Cancelled': return '#F44336';
    default: return '#9E9E9E';
  }
};

const UpdateStatusModal = ({ isVisible, onClose, order = MOCK_ORDER }) => {
  const [newStatus, setNewStatus] = useState(order.currentStatus);
  const [internalNote, setInternalNote] = useState('');
  const [notifyCustomer, setNotifyCustomer] = useState(true);

  const handleSaveStatus = () => {
    console.log({
      orderId: order.id,
      newStatus,
      internalNote,
      notifyCustomer,
    });
    onClose();
  };

  const renderStatusItem = (option) => {
    const isSelected = newStatus === option.status;
    return (
      <TouchableOpacity
        key={option.status}
        style={[styles.statusItem, isSelected && styles.statusItemSelected]}
        onPress={() => setNewStatus(option.status)}
      >
        <View style={styles.radio}>
          {isSelected && <View style={styles.radioChecked} />}
        </View>
        <View style={{ flex: 1 }}>
          <Text   style={[
    styles.statusTitle,
    option.status === 'Cancelled' && { color: '#F44336' }, // red color for Cancelled
  ]}>{option.status}</Text>
          <Text style={styles.statusDesc}>{option.description}</Text>
        </View>
    <Image source={option.icon} style={styles.statusIconImage} resizeMode="contain" />

      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false} 
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.fullScreenContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Update Order Status</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeBtn}>×</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator
        >
          {/* Order Info */}
          <View style={styles.orderBox}>
            <View>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.orderSub}>{order.customerName} • {order.total}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(order.currentStatus) },
              ]}
            >
              <Text style={styles.statusBadgeText}>{order.currentStatus}</Text>
            </View>
          </View>

          {/* Select Status */}
          <Text style={styles.sectionTitle}>Select New Status</Text>
          {STATUS_OPTIONS.map(renderStatusItem)}

          {/* Internal Note */}
          <Text style={styles.sectionTitle}>Internal Note (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Add note for team..."
            placeholderTextColor="#999"
            multiline
            value={internalNote}
            onChangeText={setInternalNote}
          />

          {/* Notify Customer */}
          <TouchableOpacity
            style={styles.notifyRow}
            onPress={() => setNotifyCustomer(!notifyCustomer)}
          >
            <View>
              <Text style={styles.notifyTitle}>Notify Customer</Text>
              <Text style={styles.notifySub}>Send email notification</Text>
            </View>
          <TouchableOpacity onPress={() => setNotifyCustomer(!notifyCustomer)}>
  <View style={notifyCustomer ? styles.checkboxChecked : styles.checkbox}>
    {notifyCustomer && (
      <Image
        source={require('../../assets/images/ic_tick_white_item.png')}
        style={{ width: 16, height: 16, tintColor: '#FFF' }}
        resizeMode="contain"
      />
    )}
  </View>
</TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSaveStatus}>
            <Image source={require('../../assets/images/ic_tick_white_item.png')}></Image>
            <Text style={styles.saveBtnText}>Save Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default UpdateStatusModal;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#333' },
  closeBtn: { fontSize: 26, color: '#999' },
  orderBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderId: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  orderSub: { fontSize: 14, color: '#777' },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusBadgeText: { color: '#3D3A3A', fontWeight: '600', fontSize: 12 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
  },
  statusIconImage: {
  width: 20,
  height: 20,
  marginLeft: 10,
},
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: '#F9F9F9',
  },
  statusItemSelected: {
    backgroundColor: '#FFAF661A',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioChecked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0075FF',
  },
  statusTitle: { fontSize: 15, fontWeight: '600', color: '#333' },
  statusDesc: { fontSize: 13, color: '#777' },
  statusIcon: { fontSize: 20, marginLeft: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  notifyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  notifyTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  notifySub: { fontSize: 13, color: '#777' },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#0075FF',
    backgroundColor:'#FFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:2
  },
    checkboxChecked: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#0075FF',
    backgroundColor:'#0075FF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:2
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  saveBtn: {
    flex: 3,
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center'
  },
  saveBtnText: { color: '#FFF', fontWeight: '700', fontSize: 16 ,alignItems:'center',marginLeft:10},
  cancelBtn: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cancelBtnText: { color: '#777', fontSize: 16, fontWeight: '600' },
});  
