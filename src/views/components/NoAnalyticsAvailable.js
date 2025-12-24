import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image, SafeAreaView, Dimensions } from 'react-native';

// Note: You must install this library in your React Native project:
// npm install react-native-vector-icons
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const NoAnalyticsAvailable = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.cardContainer}>
        
        {/* Icon Area */}
        <View style={styles.iconCircle}>
          <Image source={require('../../assets/images/ic_analytics_available.png')} style={{height:110,width:110}}
          resizeMode='contain'
          ></Image>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>No Analytics Available</Text>
        <Text style={styles.description}>
          There are no analytics data for the selected time period. Try adjusting your date range or check back later.
        </Text>

        {/* Action Buttons */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => console.log('Change Date Range clicked')}
        >
         
          <Image source={require('../../assets/images/ic_analytics_calendar.png')} style={{height:13,width:13,marginRight :6}}></Image>

          <Text style={styles.primaryButtonText}>Change Date Range</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => console.log('Refresh Data clicked')}
        >
          <Image source={require('../../assets/images/ic_analytics_refresh.png')} style={{height:13,width:13,marginRight :6}}></Image>
          <Text style={styles.secondaryButtonText}>Refresh Data</Text>
        </TouchableOpacity>

        {/* Support Link */}
        <View style={styles.supportContainer}>
          <Text style={styles.supportText}>
            Need help? Contact support or check our
          </Text>
          <TouchableOpacity onPress={() => console.log('Documentation clicked')}>
            <Text style={styles.documentationLink}>
              documentation
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    width: CARD_WIDTH,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6600',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 30,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF6600',
  },
  secondaryButtonText: {
    color: '#FF6600',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 10,
  },
  supportContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  supportText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  documentationLink: {
    fontSize: 12,
    color: '#FF6600',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default NoAnalyticsAvailable;