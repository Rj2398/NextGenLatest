import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
   
  TouchableOpacity 
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const GenericNetworkConnectivityError = ({ onTryAgain ,message=' Unable to load your posts. Please check your internet connection and try again.' }) => {
  return (
    <SafeAreaView style={styles.safeArea}>

      {/* --- Header --- */}
      <View style={styles.header}>
        <Text style={styles.logoText}>NEXTGEN</Text>
        <Text style={styles.menuIcon}>☰</Text>
      </View>

      {/* --- Main Content Area --- */}
      <View style={styles.contentWrapper}>
        <View style={styles.errorCard}>

          <Image 
            source={require('../../assets/images/ic_connectivity_issue.png')} 
            style={{ height: 60, width: 60, marginBottom: 15 }}
            resizeMode='contain'
          />

          <Text style={styles.title}>Connection Problem</Text>

          <Text style={styles.description}>
            Unable to load your posts. Please check your internet connection and try again.
          </Text>

          <TouchableOpacity 
            style={styles.tryAgainButton}
            onPress={onTryAgain}
          >
            <Text style={styles.buttonIcon}>⟳</Text>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>

        </View>
      </View>

    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuIcon: {
    fontSize: 24,
    color: '#333',
  },

  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorCard: {
    backgroundColor: 'white',
    // borderRadius: 10,
    padding: 30,
    width: '100%',
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // elevation: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },

  tryAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 18,
    color: 'white',
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default GenericNetworkConnectivityError;
