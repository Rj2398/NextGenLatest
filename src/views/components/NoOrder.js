import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// Import the icon libraries
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from './Header';

// --- Assets/Constants ---
// NOTE: Replace '...' with the actual source for your NEXTGEN logo and the cart illustration.
const NEXTGEN_LOGO_URL = '...';
const EMPTY_CART_ILLUSTRATION_URL = '...';
const PRIMARY_ORANGE = '#FF8C00';
const LIGHT_GRAY = '#F4F4F4';

// --- Main Screen Component ---
const NoOrdersScreen = () => {
  const [activeTab, setActiveTab] = useState('overview'); // State for the segmented control

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ScrollView for screens with content that might exceed the height */}
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 1. Header Section */}
        <Header title={'Orders'} onBackPress={true} />

        {/* 2. Search and Filter Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchInputWrapper}>
            <Feather
              name="search"
              size={20}
              color="#999"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search order ID, email, SKU..."
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Image
              source={require('../../assets/images/ic_filter_black.png')}></Image>
          </TouchableOpacity>
        </View>

        {/* 3. Segmented Control (Overview/Returns) */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'overview' && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab('overview')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'overview' && styles.activeTabText,
              ]}>
              Overview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'returns' && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab('returns')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'returns' && styles.tabInactiveText,
              ]}>
              Returns
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* 4. Empty State Content */}
        <View style={styles.emptyState}>
          <Image
            style={styles.illustration}
            source={require('../../assets/images/ic_no_oder_yet.png')}
          />
          <Text style={styles.emptyStateTitle}>No orders yet</Text>
          <Text style={styles.emptyStateDescription}>
            When customers start placing orders, they'll appear here. You can
            track, manage and fulfill all orders from this screen.
          </Text>

          {/* Action Buttons */}
          <TouchableOpacity style={styles.createOrderButton}>
            <Feather name="plus" size={22} color="#fff" />
            <Text style={styles.createOrderText}>Create Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.importOrdersButton}>
            <Image
              source={require('../../assets/images/ic_export_orders.png')}
              style={{height: 13, width: 15}}></Image>
            <Text style={styles.importOrdersText}>Import Orders</Text>
          </TouchableOpacity>

          {/* Help Links */}
          <Text style={styles.helpHeader}>Need help getting started?</Text>
          <View style={styles.helpLinksContainer}>
            <TouchableOpacity style={styles.helpLink}>
              <Image source={require('../../assets/images/ic_guide.png')} />
              <Text style={styles.helpLinkText}>Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpLink}>
              <Image
                source={require('../../assets/images/ic_video.png')}
                style={{height: 14, width: 14}}
              />
              <Text style={styles.helpLinkText}>Video Tutorial</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpLink}>
              <Image
                source={require('../../assets/images/ic_chat_support.png')}
                style={{height: 14, width: 14}}
              />
              <Text style={styles.helpLinkText}>Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 30, // Extra space at the bottom
  },

  // 1. Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 10,
    position: 'relative', // Important for absolute title positioning
  },

  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },

  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  menuButton: {
    padding: 5,
  },

  // 2. Search and Filter Bar Styles
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#333',
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: LIGHT_GRAY,
    padding: 10,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 3. Segmented Control Styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
    marginBottom: 20,
    padding: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: PRIMARY_ORANGE,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  tabInactiveText: {
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 30,
  },

  // 4. Empty State Styles
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  illustration: {
    width: 150, // Adjust size to match the design
    height: 150,
    resizeMode: 'contain',
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },

  // Action Button Styles
  createOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY_ORANGE,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  createOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  importOrdersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 40,
  },
  importOrdersText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },

  // Help Links Styles
  helpHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  helpLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25, // Space between links
  },
  helpLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpLinkText: {
    color: PRIMARY_ORANGE,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default NoOrdersScreen;
