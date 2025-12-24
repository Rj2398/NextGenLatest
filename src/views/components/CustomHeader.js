// components/CustomHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

// 🎨 Header Colors ko ek jagah define kiya gaya hai
const HEADER_COLORS = {
  background: '#fff',
  border: '#f0f0f0',
  title: '#161B25',
};

const CustomHeader = ({ title }) => {
  // Use useNavigation to get the navigation object
  const navigation = useNavigation(); 

  return (
    <View style={styles.header}>
      {/* The goBack() function is used in onPress */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
              source={require('./../assets/back_screen_icon.png')}
              style={styles.arrowImage}
              resizeMode="contain"
            />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {/* This ensures the title remains centered */}
      <View style={styles.rightPlaceholder} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    // 🎨 Border Color yahan hai
    borderBottomColor: HEADER_COLORS.border, 
    // 🎨 Background Color yahan hai
    backgroundColor: HEADER_COLORS.background, 
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    // 'medium' was provided in your code, but '500' is used in RN for medium weight
    fontWeight: '500', 
    fontFamily:'Roboto', 
    // 🎨 Title Color yahan hai
    color: HEADER_COLORS.title, 
  },
  // To keep the title centered when no right-side button exists
  rightPlaceholder: {
    width: 15 + 16, 
  },
  arrowImage: { width: 15, height: 15},
});

export default CustomHeader;