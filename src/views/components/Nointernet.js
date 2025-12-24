// NoInternet.js (Fixed)
import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Assuming you import styles from './styles' which defines styles.contentContainer
// import styles from './styles'; // Make sure this is imported if you want to keep the original styles.

const {width, height} = Dimensions.get('window');

const Nointernet = ({resetToSplashScreen}) => {
  // Using PascalCase for component name
  return (
    <View style={componentStyles.overlayContainer}>
      {/* Outer view is fine with flex: 1 */}
      <View style={{flex: 1}}>
        {/* 🔥 FIX APPLIED HERE: Centering the content vertically and horizontally */}
        <View style={componentStyles.contentCenterContainer}>
          {/* Header Text Block */}
          <Text style={componentStyles.centeredHeadingText}>
            No Internet{'\n'}
            <Text style={{fontSize: 16, fontWeight: '400', marginTop: 10}}>
              Please make sure you're connected to internet
            </Text>
          </Text>

          {/* Image Block */}
          <View style={{marginTop: 30}}>
            <Image
              source={require('../../assets/nointernet.png')}
              style={{width: 200, height: 200}}
            />
          </View>
        </View>

        {/* Button Block remains positioned absolutely at the bottom */}
        <View style={componentStyles.buttonContainer}>
          <TouchableOpacity
            onPress={resetToSplashScreen}
            style={[/* styles.buttonTag, */ componentStyles.defaultButton]}
            activeOpacity={0.7}>
            <Text
              style={[/* styles.buttonText, */ componentStyles.buttonLabel]}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Nointernet;

// ---
// Updated StyleSheet with the centering fixes
const componentStyles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    width: width,
    height: height,
  },

  // 🔥 NEW STYLE: Replaces styles.contentContainer for centering
  contentCenterContainer: {
    flex: 1, // Takes up all available space
    justifyContent: 'center', // CENTERS CONTENT VERTICALLY
    alignItems: 'center', // CENTERS CONTENT HORIZONTALLY
    paddingHorizontal: 20,
    marginTop: -50, // Optional: Adjust up slightly to account for button space
  },

  // Added basic style for centered text (assuming styles.headingText doesn't center)
  centeredHeadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: width,
    alignItems: 'center',
  },
  defaultButton: {
    backgroundColor: '#ED8A00',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
