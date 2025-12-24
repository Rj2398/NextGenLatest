import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import trackIcon from '../../../assets/images/track.png';
import returnIcon from '../../../assets/images/return.png';
import buyAgainIcon from '../../../assets/images/buyAgain.png';
import cancelIcon from '../../../assets/images/cancel.png';
import invoiceIcon from '../../../assets/images/invoice.png';
import supportIcon from '../../../assets/images/support.png';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';

// Helper component for the action buttons at the bottom of the card
const ActionButton = ({icon, text, onPress}) => (
  <TouchableOpacity style={itemCardStyles.actionButton} onPress={onPress}>
    {/* <Text style={itemCardStyles.actionIcon}>{icon}</Text>
{ 
    <Image style={}></Image>
}   */}

    {icon && (
      <Image
        source={icon}
        style={itemCardStyles.actionImage}
        resizeMode="contain"
      />
    )}

    {
      <Text
        style={[
          itemCardStyles.actionText,
          text === 'Cancel' && {color: 'grey'},
        ]}>
        {text}
      </Text>
    }
  </TouchableOpacity>
);

// Helper component for the product details within the card
const ProductDetail = ({item}) => (
  <View style={itemCardStyles.productDetailRow}>
    <View style={itemCardStyles.itemImagePlaceholder}>
      <Text style={{fontSize: 30}}>{item.imageUrl}</Text>
    </View>
    <View style={itemCardStyles.itemInfo}>
      <Text style={itemCardStyles.itemName}>{item.name}</Text>
      <Text style={itemCardStyles.itemMeta}>
        {item.color} • {item.quantity} item
      </Text>
    </View>
    {/* Display price only if it's a single item purchase without a total override */}
    {!item.hidePrice && (
      <Text style={itemCardStyles.itemPrice}>${item.price.toFixed(2)}</Text>
    )}
  </View>
);

const UserOrderItemCard = ({order}) => {
  const navigation = useNavigation();
  // Dynamic style based on status
  const getStatusStyle = status => {
    switch (status) {
      case 'Delivered':
        return {backgroundColor: '#E6F8ED', color: '#1B9C45'};
      case 'Shipped':
        return {backgroundColor: '#FFFBEA', color: '#FFB800'};
      case 'Processing':
        return {backgroundColor: '#EBF6FF', color: '#007AFF'};
      case 'Cancelled':
        return {backgroundColor: '#FBEBEB', color: '#CC3333'};
      default:
        return {backgroundColor: '#F0F0F0', color: '#666'};
    }
  };

  const statusStyle = getStatusStyle(order.status);

  // Map action names to placeholder icons
  const actionIcons = {
    Track: trackIcon,
    Return: returnIcon,
    'Buy Again': buyAgainIcon,
    Cancel: cancelIcon,
    Invoice: invoiceIcon,
    Support: supportIcon,
  };

  return (
    <Pressable
      style={itemCardStyles.card}
      // onPress={() => navigation.navigate('UserOrderDetail')}>
      onPress={() => {
        navigation.navigate('Return');
      }}>
      <View style={itemCardStyles.cardHeader}>
        <Text style={itemCardStyles.headerText}>
          Order #{order.id}
          {'\n'}
          <Text style={itemCardStyles.dateText}>{order.date}</Text>
        </Text>
        <View
          style={[
            itemCardStyles.statusBadge,
            {backgroundColor: statusStyle.backgroundColor},
          ]}>
          <Text style={[itemCardStyles.statusText, {color: statusStyle.color}]}>
            {order.status}
          </Text>
        </View>
      </View>

      {order.items.map((item, index) => (
        <ProductDetail key={index} item={item} />
      ))}

      {/* Total Price Row (Only for multi-item or specific orders) */}
      {order.totalPrice && (
        <View style={itemCardStyles.totalRow}>
          <Text style={itemCardStyles.totalText}>
            Total: {order.items.length} items
          </Text>
          <Text style={itemCardStyles.totalPriceText}>
            ${order.totalPrice.toFixed(2)}
          </Text>
        </View>
      )}

      <View style={itemCardStyles.actionsContainer}>
        {order.actions.map(action => (
          <ActionButton
            key={action}
            icon={actionIcons[action]}
            text={action}
            onPress={() => console.log(`${action} pressed for ${order.id}`)}
          />
        ))}
      </View>
    </Pressable>
  );
};

const itemCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Product Detail Styles
  productDetailRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  itemImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F3F3F3',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    paddingRight: 10,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },

  itemMeta: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },

  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginBottom: 10,
  },
  totalText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  totalPriceText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '700',
  },

  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    paddingVertical: 5,
  },
  actionIcon: {
    fontSize: 16,
    color: '#FF8C00', // Orange color for icons
    marginRight: 4,
  },
  actionText: {
    fontSize: 13,
    color: '#F89941',
    fontWeight: '500',
  },

  actionImage: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
});

export default UserOrderItemCard;
