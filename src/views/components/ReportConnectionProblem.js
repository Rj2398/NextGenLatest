import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ✅ Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const ConnectionProblemScreen = () => {
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  const toggleTroubleshooting = () => {
    // Smooth expand/collapse animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowTroubleshooting(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.cardContainer}>
        {/* Icon Area */}
        <View >
        
        <Image source={require('../../assets/images/ic_net_conn.png')} style={{height:120,width:120}}></Image>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>Connection Problem</Text>
        <Text style={styles.description}>
          Unable to load your analytics. Please check your internet connection and try again.
        </Text>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => console.log('Try Again clicked')}
        >
        
        <Image source={require('../../assets/images/ic_referesh_img.png')} style={{height:13,width:13,marginRight:6}}></Image>
          <Text style={styles.primaryButtonText}>Try Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => console.log('View Cached Reports clicked')}
        >
          <Text style={styles.secondaryButtonText}>View Cached Reports</Text>
        </TouchableOpacity>

        {/* Offline Status */}
        <View style={styles.statusContainer}>
            <View style={styles.statusLeft}>
          <View style={styles.statusDotOffline} />
          <Text style={styles.statusText}>Offline</Text>
          </View>
          <Text style={styles.syncText}>Last synced: 2 min ago</Text>
        </View>

        {/* Troubleshooting Tips Toggle */}
        <TouchableOpacity style={styles.troubleshootingHeader} onPress={toggleTroubleshooting}>
          <Text style={styles.troubleshootingHeaderText}>Troubleshooting Tips</Text>
          <Icon
            name={showTroubleshooting ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color="#666"
          />
        </TouchableOpacity>

        {/* Troubleshooting Content */}
        {showTroubleshooting && (
          <View style={styles.troubleshootingContent}>
            <Text style={styles.troubleshootingTip}>
              • Check your Wi-Fi or mobile data connection.
            </Text>
            <Text style={styles.troubleshootingTip}>• Restart your router or device.</Text>
            <Text style={styles.troubleshootingTip}>
              • Ensure app permissions for network access are enabled.
            </Text>
          </View>
        )}

        {/* Support Links */}
        <View style={styles.supportContainer}>
          <Text style={styles.supportText}>Need help? </Text>
          <TouchableOpacity onPress={() => console.log('Contact Support clicked')}>
            <Text style={styles.contactSupportLink}>Contact Support</Text>
          </TouchableOpacity>
          <Text style={styles.supportText}> or check our </Text>
          <TouchableOpacity onPress={() => console.log('Documentation clicked')}>
            <Text style={styles.documentationLink}>documentation</Text>
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
    backgroundColor: '#ffe8d9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffc299',
  },
  errorBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6600',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
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
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 25,
    width: '100%',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#FF7A00',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 10,
  },
  
  statusContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f9f9f9',
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 15,
  width: '100%',
  justifyContent: 'space-between', // 👈 separates left and right items
  marginBottom: 25,
  borderWidth: 1,
  borderColor: '#eee',
},
statusLeft: {
  flexDirection: 'row',
  alignItems: 'center',
},
  statusDotOffline: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff4d4f',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  syncText: {
    fontSize: 13,
    color: '#999',
  },
  troubleshootingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  troubleshootingHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  troubleshootingContent: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  troubleshootingTip: {
    fontSize: 13,
    color: '#555',
    marginBottom: 5,
    lineHeight: 18,
  },
  supportContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  supportText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  contactSupportLink: {
    fontSize: 12,
    color: '#FF7A00',
    fontWeight: '600',
  },
  documentationLink: {
    fontSize: 12,
    color: '#FF7A00',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default ConnectionProblemScreen;
