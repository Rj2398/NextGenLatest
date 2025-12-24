// OrderFilterModal.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';


// --- MOCK DATA ---
const ORDER_STATUSES = [
  { status: 'Pending', count: 23, color: '#C8A825' },
  { status: 'Processing', count: 45, color: '#FFAF66' },
  { status: 'Shipped', count: 67, color: '#4B5563' },
  { status: 'Delivered', count: 179, color: '#43A3A3' },
  { status: 'Cancelled', count: 12, color: '#EF4444' },
];

const DATE_RANGES = [
  { label: 'Today', key: 'today', count: 15 },
  { label: 'Last 7 days', key: 'last7days', count: 89 },
  { label: 'Last 30 days', key: 'last30days', count: 247 },
];

// simple helper
const calculateFilteredCount = (selectedStatuses, selectedDateRange) => {
  let statusCount = 0;
  if (selectedStatuses && selectedStatuses.length > 0) {
    statusCount = ORDER_STATUSES
      .filter(s => selectedStatuses.includes(s.status))
      .reduce((sum, s) => sum + s.count, 0);
  } else {
    statusCount = ORDER_STATUSES.reduce((sum, s) => sum + s.count, 0);
  }
  const dateCount = DATE_RANGES.find(d => d.key === selectedDateRange)?.count || 0;
  return dateCount || statusCount;
};

const OrderFilterModal = ({ isVisible = false, onClose = () => {}, onApplyFilters }) => {
  const [selectedStatuses, setSelectedStatuses] = useState(['Processing', 'Delivered']);
  const [selectedDateRange, setSelectedDateRange] = useState('last30days');

  const toggleStatus = (status) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handleClearAll = () => {
    setSelectedStatuses([]);
    setSelectedDateRange(null);
  };

  const handleApply = () => {
    const filters = { statuses: selectedStatuses, dateRange: selectedDateRange };
    if (typeof onApplyFilters === 'function') onApplyFilters(filters);
    onClose();
  };

  const filteredCount = calculateFilteredCount(selectedStatuses, selectedDateRange);

  return (
    <Modal
      visible={!!isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      scrolI
    >
      {/* Tap outside to close */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Bottom sheet container */}
      <View style={styles.containerWrapper}>
        <View style={styles.modalContainer}>
          {/* Small debug text — remove after verifying */}
         <SafeAreaView style={{ flex: 1 }}>
          
            <View style={styles.dragIndicatorContainer}>
              <View style={styles.dragIndicator} />
            </View>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Filter Orders</Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeButton}>{'\u00D7'}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}
             showsVerticalScrollIndicator={false}
            >
              {/* Order Status */}
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <Image source={require('../../assets/images/ic_order_status_icon.png')} style ={{width:13,height:13,marginRight:5}}></Image>
                  <Text style={styles.sectionTitle}>Order Status</Text>
                </View>
                {ORDER_STATUSES.map(item => {
                  const isChecked = selectedStatuses?.includes(item.status);
                  return (
                  <TouchableOpacity
  key={item.status}
  style={styles.itemRow}
  onPress={() => toggleStatus(item.status)}
>
  {/* ✅ Rectangular checkbox with tick icon */}
  <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
    {isChecked && <Text style={styles.checkmarkText}>✓</Text>}
  </View>

  {/* Status badge */}
  <View style={styles.statusBadgeContainer}>
    <View style={[styles.statusBadge, { backgroundColor: item.color }]}>
      <Text style={styles.statusBadgeText}>{item.status}</Text>
    </View>
  </View>

  {/* Count */}
  <Text style={styles.itemCount}>{item.count} orders</Text>
</TouchableOpacity>
                  );
                })}
              </View>

              {/* Date Range */}
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <Image source={require('../../assets/images/ic_date_icon.png')} style={{height:15,width:15,marginRight:10}} resizeMode='contain'></Image>
                  <Text style={styles.sectionTitle}>Date Range</Text>
                </View>
                {DATE_RANGES.map(item => {
                  const isSelected = selectedDateRange === item.key;
                  return (
                    <TouchableOpacity
                      key={item.key}
                      style={styles.itemRow}
                      onPress={() => setSelectedDateRange(item.key)}
                    >
                      <View style={styles.radio}>
                        {isSelected && <View style={styles.radioChecked} />}
                      </View>
                      <Text style={styles.dateLabel}>{item.label}</Text>
                      <Text style={styles.itemCount}>{item.count} orders</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              <View style={styles.matchRow}>
                <Text style={styles.matchText}>
                  <Text style={styles.matchCount}>{filteredCount}</Text> orders match your filters
                </Text>
                <TouchableOpacity onPress={handleClearAll}>
                  <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                    <Image source={require('../../assets/images/ic_tick_white_item.png')} style={{marginLeft:5}}></Image>
                  <Text style={styles.applyButtonText}> Apply Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

export default OrderFilterModal;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // full screen dark background
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  containerWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '85%',                // ensure visible height
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  debugText: {
    textAlign: 'center',
    color: 'red',
    paddingVertical: 6,
    fontWeight: '600',
  },
  dragIndicatorContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  closeButton: {
    fontSize: 28,
    color: '#757575',
    paddingHorizontal: 5,
  },
  scrollContent: {
    paddingVertical: 10,
    flexGrow: 1,
  },
  section: {
    marginBottom: 18,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemCount: {
    fontSize: 15,
    color: '#757575',
    marginLeft: 'auto',
  },
 checkbox: {
  width: 24,
  height: 24,
  borderRadius: 4, // rectangular corners
  borderWidth: 2,
  borderColor: '#C0C0C0',
  marginRight: 15,
  justifyContent: 'center',
  alignItems: 'center',
},
checkboxChecked: {
  backgroundColor: '#0075FF',
  borderColor: '#0075FF',
},
checkmarkText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 'bold',
  lineHeight: 16,
},
radio: {
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: '#C0C0C0',
  marginRight: 15,
  justifyContent: 'center',
  alignItems: 'center',
},
radioChecked: {
  width: 14,
  height: 14,
  borderRadius: 7,
  backgroundColor: '#FF6B35',
},
  dateLabel: {
    fontSize: 15,
    color: '#333',
  },
  statusBadgeContainer: {
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
  },
  footer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFF',
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  matchText: {
    fontSize: 15,
    color: '#757575',
  },
  matchCount: {
    fontWeight: '700',
    color: '#333',
  },
  clearAllText: {
    fontSize: 15,
    color: '#757575',
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyButton: {
    flex: 3,
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
    flexDirection:'row',
    justifyContent:'center'
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#757575',
    fontSize: 16,
    fontWeight: '600',
  },
});
