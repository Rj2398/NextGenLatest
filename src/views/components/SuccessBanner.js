import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

const SuccessBanner = ({ message }) => {
  const displayMessage = message || 'Export started successfully!';

  return (
    <View style={styles.bannerContainer}>
      {/* Icon (emoji used here, replace with a proper icon if needed) */}
      <Image source={require('../../assets/images/ic_white_tick_icon.png')}  
      styles={{marginRight:15,marginHorizontal:15}}
      ></Image>

      {/* Dynamic text message */}
      <Text style={styles.bannerText}>{displayMessage}</Text>
    </View>
  );
};

export default SuccessBanner;

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#38A7A0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius:20,

  },
  checkIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 10,
  },
  bannerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
});