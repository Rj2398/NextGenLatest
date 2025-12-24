import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const InventoryCard = ({item, onEdit, onDelete, onViewDetails, isLoading}) => {
  // Helper function to render only non-null fields
  const renderField = (label, value) => {
    if (value === null || value === undefined || value === '') return null;
    return (
      <View style={styles.metricItem}>
        <Text style={styles.metricLabel}>{label}</Text>
        <Text style={styles.metricValue}>{String(value)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        {item?.product_title ? (
          <Text style={styles.itemName}>{item.product_title}</Text>
        ) : null}

        {item?.product_image ? (
          <Image
            style={styles.itemImage}
            resizeMode="contain"
            source={{uri: item.product_image}}
          />
        ) : (
          <Image
            style={styles.itemImage}
            resizeMode="contain"
            source={require('../../assets/images/ic_maggi.png')}
          />
        )}
      </View>

      {/* Details Grid (auto hides missing fields) */}
      <View style={styles.metricsGrid}>
        {renderField('Brand', item?.brand)}
        {renderField('Category ID', item?.category_id)}
        {renderField('Subcategory ID', item?.subcategory_id)}
      </View>

      <View style={styles.metricsGrid}>
        {renderField('Open Stock', item?.open_stock)}
        {renderField('Remaining', item?.remaining_stock)}
        {renderField('Threshold', item?.threshold_value)}
      </View>

      <View style={styles.metricsGrid}>
        {renderField('Weight', item?.weight ? `${item.weight}g` : null)}
        {renderField('Price', item?.price ? `AED ${item.price}` : null)}
        {renderField(
          'Product ID',
          item?.id ? `${item.id.slice(0, 6)}...` : null,
        )}
      </View>

      {/* Buttons */}
      <View style={styles.actionButtons}>
        {/* <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit?.(item)}
          activeOpacity={0.8}>
          <Image
            source={require('../../assets/images/ic_edit_button.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
          <Text style={styles.editButtonText}>Edit Item</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[
            styles.editButton,
            // Visually dim the button when loading
            isLoading && {opacity: 0.7},
          ]}
          onPress={() => onEdit?.(item)}
          activeOpacity={0.8}
          // DISABLE: Prevent clicks while fetching
          disabled={isLoading}>
          {isLoading ? (
            // Show "Loading..." text when loading
            <Text style={styles.editButtonText}>Loading...</Text>
          ) : (
            <>
              {/* Only show the icon if NOT loading */}
              <Image
                source={require('../../assets/images/ic_edit_button.png')}
                style={{width: 20, height: 20}}
                resizeMode="contain"
              />
              <Text style={styles.editButtonText}>Edit Item</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete?.(item)}
          activeOpacity={0.8}>
          <Image
            source={require('../../assets/images/ic_delete_icon.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
          <Text style={styles.deleteButtonText}>Delete Item</Text>
        </TouchableOpacity>
      </View>

      {/* View More */}
      {/* View More Button */}
      {/* <TouchableOpacity
        style={[
          styles.viewMoreButton,
          isLoading && {opacity: 0.7}, // Visually dim the button when loading
        ]}
        onPress={() => onViewDetails?.(item)}
        activeOpacity={0.8}
        disabled={isLoading} // 4. DISABLE: Prevent multiple clicks while fetching
      >
        <Text style={styles.viewMoreText}>
          {isLoading
            ? // 5. TEXT CHANGE: Show "Loading..." when isLoading is true
              'Loading...'
            : 'View More Details'}
        </Text> */}

      {/* 6. ICON CHANGE: Only show the dropdown icon if NOT loading */}
      {/* {!isLoading && (
          <Image
            source={require('../../assets/images/ic_drop_down_white.png')}
            style={{width: 12, height: 11}}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.viewMoreButton} // Removed style array and opacity
        onPress={() => onViewDetails?.(item)}
        activeOpacity={0.8}
        // Removed disabled={isLoading}
      >
        <Text style={styles.viewMoreText}>
          View More Details {/* Removed conditional text */}
        </Text>
        <Image
          source={require('../../assets/images/ic_drop_down_white.png')}
          style={{width: 12, height: 11}}
          resizeMode="contain"
        />
        {/* Removed conditional icon rendering */}
      </TouchableOpacity>
    </View>
  );
};

export default InventoryCard;

const styles = StyleSheet.create({
  card: {
    width: '110%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    padding: 15,
    alignSelf: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  itemImage: {
    width: 60,
    height: 60,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  metricItem: {
    flex: 1,
    minWidth: '30%',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FDB462',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  deleteButtonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  viewMoreButton: {
    backgroundColor: '#FF8C00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  viewMoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
