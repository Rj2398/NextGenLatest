// AppHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image} from 'react-native';

// --- Color Palette defined together as requested ---
const Colors = {
    // Standard colors used in this component
    White: '#fff',
    Black: '#000',
};
// ---------------------------------------------------

const UserHomeHeader = () => {
  // Functional component for the top header
  return (
    <View style={styles.headerContainer}>
      {/* 1. Left side: Hamburger Menu Icon */}
      <TouchableOpacity style={styles.leftContainer}>
        <Text style={styles.iconText}>☰</Text> 
      </TouchableOpacity>

      {/* 2. Center: App Name (Now absolutely positioned) */}
      <Text style={styles.appName}>Bazar</Text>

      {/* 3. Right side: App Logo/User Icon */}
      <View style={styles.rightContainer}>
        <Image
            source={require('../../../assets/nextlogo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // Basic styling for the fixed header
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Keep space-between for side elements
    paddingHorizontal: 15,           // Increased padding for better look
    paddingVertical: 10,
    backgroundColor: Colors.White, // Using defined color constant
    height: 50, // Added a fixed height for consistency
  },

  // --- NEW STYLES FOR ALIGNMENT ---
  appName: {
    // Styling for the 'Bazar' text in the center
    position: 'absolute', 
    left: 0,
    right: 0,
    textAlign: 'center', 
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Black, // Using defined color constant
    lineHeight: 30, // Adjust this based on header height if needed
  },
  leftContainer: {
    // Explicitly set a small width for the left container (optional, but good practice)
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightContainer: {
    // Explicitly set width for the right container, matching the logo size
    width: 135, // 125 (logo) + 10 (padding)
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  // --- END NEW STYLES ---

  iconText: {
    fontSize: 24,
    color: Colors.Black, // Using defined color constant
  },
  logoImage: {
    width: 115,
    height: 30,
  }
});

export default UserHomeHeader;