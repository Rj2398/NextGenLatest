import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import UserHeader from '../../components/user/UserHeader';

// ------- All Colors in One Place -------
const Colors = {
  screenBg: '#f7f7f7',
  white: '#ffffff',
  black: '#000000',
  grey: '#5A5A5A',
  lightGrey: '#f0f0f0',
  primary: '#FF7A00',
  cardBg: '#ffffff',
  textcolor:'#3D3A3A',
  qytcolor:'#FF7A00',
};

const MyCart = ({navigation}) => {

  // -------- Cart Products Data --------
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Sony WH-1000XM4 Wireless Headphones',
      color: 'Black',
      price: 24990,
      quantity: 2,
   //   image: require('../assets/sony.png'),
    },
    {
      id: 2,
      name: 'iPhone 14 Pro Max',
      color: 'Space Black',
      storage: '256GB',
      price: 139900,
      quantity: 1,
   //   image: require('../assets/iphone.png'),
    },
    {
      id: 3,
      name: 'Nike Air Jordan 1 Retro High',
      color: 'White/Red',
      size: '9',
      price: 12795,
      quantity: 1,
    //  image: require('../assets/jordan.png'),
    },
  ]);

  const increaseQty = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updated);
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
         <UserHeader
                title="My Cart"
                onBackPress={() => navigation.goBack()}
            />
      <ScrollView>

        {cartItems.map(item => (
          <View key={item.id} style={styles.card}>
            
            <Image source={item.image} style={styles.productImage} />

            <View style={styles.detailsBox}>
              <Text style={styles.productName}>{item.name}</Text>

              <Text style={styles.productColor}>
                {item.color}
                {item.size ? ` | Size: ${item.size}` : ''} 
                {item.storage ? ` | Storage: ${item.storage}` : ''}
              </Text>
              <View style={styles.priceQtyRow}>
              <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>

                <View style={styles.qtyContainer}>
                <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.qtyBtn}>
                    <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyNumber}>{item.quantity}</Text>

                <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.qtyBtn}>
                    <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
                </View>
                </View>
             
            </View>
          </View>
        ))}

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Order Payment Details</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Order Amount ({cartItems.length} items)</Text>
            <Text style={styles.summaryValue}>₹{totalAmount.toLocaleString()}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={[styles.summaryValue, { color: '#43A3A3' }]}>Free</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Order Total</Text>
            <Text style={styles.totalText}>₹{totalAmount.toLocaleString()}</Text>
          </View>
        </View>

      </ScrollView>

      <TouchableOpacity style={styles.checkoutBtn}
       onPress={() => navigation.navigate('CheckoutScreen')}>
        <Text style={styles.checkoutText}>Checkout Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyCart;



// ---------------------- STYLES ----------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBg,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBg,
    padding: 12,
    marginHorizontal: 10,
    marginTop: 12,
    borderRadius: 10,
    elevation: 2,
  },

  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  detailsBox: {
    marginLeft: 12,
    flex: 1,
  },

  productName: {
    fontSize: 15,
    color:Colors.textcolor,
    fontWeight: '600',
  },

  productColor: {
    color: Colors.grey,
    marginTop: 3,
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color:Colors.textcolor,
    marginVertical: 6,
  },

  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyText: {
    fontSize: 18,
    color:Colors.qytcolor,
    fontWeight: 'bold',
  },

  qtyNumber: {
    marginHorizontal: 10,
    fontSize: 16,
  },

  summaryBox: {
    backgroundColor: Colors.white,
    margin: 12,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color:Colors.textcolor,
    marginBottom: 10,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  summaryLabel: {
    fontSize: 14,
    color: Colors.grey,
  },

  summaryValue: {
    fontSize: 14,
    color:Colors.textcolor,
    fontWeight: '600',
  },

  totalText: {
    fontSize: 16,
    fontWeight: '700',
  },

  checkoutBtn: {
    backgroundColor: Colors.primary,
    margin: 15,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },

  checkoutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  priceQtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
});
