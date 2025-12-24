// BackToSchoolBanner.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const BackToSchoolBanner = () => {
  // Component for the distinct blue "Back to School" banner
  return (
    <View style={styles.bannerContainer}>
        {/* Image covers the entire view */}
        <Image 
            source={require('../../../assets/user/school_static_banner.png') }
            style={styles.bannerImage}
            resizeMode="cover"
        />
        {/* Placeholder for text and graphics inside the banner */}
        {/* <View style={styles.contentOverlay}>
            <Text style={styles.callToAction}>BACK TO SCHOOL</Text>
        </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    // Blue banner style
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 10,
    overflow: 'hidden',
    height: 150, 
    backgroundColor: '#0047AB', // Deep blue color (as a fallback/primary background)
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8, // Slightly transparent overlay
  },
  contentOverlay: {
    // Position content on top of the image
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callToAction: {
    // Text style for "BACK TO SCHOOL"
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700', // Gold/yellow color for contrast
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default BackToSchoolBanner;