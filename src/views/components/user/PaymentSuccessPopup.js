import React from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';

const PaymentSuccessPopup = ({ visible, onClose }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>

        <View style={styles.popup}>

          {/* Celebration Image */}
          <View style={styles.imageWrapper}>
            <Image
               source={require('../../../assets/user/payment_successfull.png')}  // change path as per your project
              style={styles.image}
            />
          </View>

          {/* Message */}
          <Text style={styles.title}>Your Payment Is  Successful</Text>
          

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Back To Shopping</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default PaymentSuccessPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  popup: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },

  imageWrapper: {
    padding: 20,
    borderRadius: 100,
    marginBottom: 20,
  },

  image: {
    width: 100,
    height: 100,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A2530',
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#ff8c00',
    width: '80%',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
