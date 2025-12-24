import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';

import UserHeader from '../../components/user/UserHeader';
import Search from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');
const SPACING = 16;
const CARD_MARGIN = 5; // Used for spacing between grid items

// 1. ⬆️ IMPORT ALL SIX STATIC IMAGES HERE
// 🛑 IMPORTANT: Replace these paths with the actual paths to your image files
const OrderRelatedIcon = require('../../../assets/user/order_user.png');
const ReturnsIcon = require('../../../assets/user/return_user.png');
const PaymentIcon = require('../../../assets/user/pymt_user.png');
const DeliveryIcon = require('../../../assets/user/delivey_user.png');
const AccountIcon = require('../../../assets/user/account_user.png');
const OtherTopicsIcon = require('../../../assets/user/chat_user.png');

// --- Mock Data ---

// Data for the 2-column grid section
const HELP_OPTIONS = [
  {
    id: '1',
    title: 'Order Related',
    description: 'Track, modify or cancel orders',
    icon: OrderRelatedIcon,
  },
  {
    id: '2',
    title: 'Returns',
    description: 'Return process & refunds',
    icon: ReturnsIcon,
  },
  {
    id: '3',
    title: 'Payment',
    description: 'Payment methods & issues',
    icon: PaymentIcon,
  },
  {
    id: '4',
    title: 'Delivery',
    description: 'Shipping & tracking',
    icon: DeliveryIcon,
  },
  {
    id: '5',
    title: 'Account',
    description: 'Settings & security',
    icon: AccountIcon,
  },
  {
    id: '6',
    title: 'Other Topics',
    description: 'Additional help topics',
    icon: OtherTopicsIcon,
  },
];

// Data for the "Popular Articles" section
const POPULAR_ARTICLES = [
  {
    id: 'a1',
    title: 'How to track your order?',
    content:
      'Learn how to track your order in real-time and get delivery updates directly on your phone.',
  },
  {
    id: 'a2',
    title: 'Return policy explained',
    content:
      'Understand our return policy, eligibility criteria, and how to initiate a return request.',
  },
  {
    id: 'a3',
    title: 'Payment methods we accept!',
    content:
      'View all available payment systems including credit cards, digital wallets, and more.',
  },
];

// --- Grid Item Component ---

const renderGridItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => {
        navigation.navigate('DeliveryTracking');
      }}>
      <View style={styles.gridIconContainer}>
        {typeof item.icon === 'string' ? (
          <Text style={styles.gridIcon}>{item.icon}</Text>
        ) : (
          <Image
            source={item.icon}
            style={styles.gridImage}
            resizeMode="contain"
          />
        )}
      </View>
      <Text style={styles.gridTitle}>{item.title}</Text>
      <Text style={styles.gridDescription}>{item.description}</Text>
    </TouchableOpacity>
  );
};

// --- Main Component (remains the same) ---

const HelpCenter = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <UserHeader
        title={'Help Center'}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>
            <Search size={24} color="#888" name="search" />
          </Text>
          <TextInput
            placeholder="Search payment issues..."
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
        </View>

        {/* Recent Issue Card */}
        <View style={styles.recentIssueCard}>
          <Text style={styles.sectionTitle}>Recent issues with this order</Text>
          <TouchableOpacity style={styles.recentIssueRow}>
            <View>
              <Text style={{fontSize: 14, color: '#333'}}>
                I have an issue with the return
              </Text>
              <Text style={styles.recentIssueStatus}>
                <Text style={styles.statusOpen}>Open</Text> | Resolution pending
              </Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 2-Column Grid (FlatList with numColumns=2) */}
        <FlatList
          data={HELP_OPTIONS}
          renderItem={item => renderGridItem({...item, navigation})}
          // renderItem={item => renderGridItem(item, navigation)}
          keyExtractor={item => item.id}
          numColumns={2} // The requested 2-column layout
          scrollEnabled={false} // Disable inner scrolling since it's inside a ScrollView
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.gridListContainer}
        />

        {/* Popular Articles Header */}
        <Text style={styles.sectionTitleCenter}>Popular Articles</Text>

        {/* Popular Articles List */}
        <View style={styles.articleList}>
          {POPULAR_ARTICLES.map(article => (
            <TouchableOpacity key={article.id} style={styles.articleCard}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleContent}>{article.content}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Padding to prevent content from being hidden by the fixed footer */}
        <View style={{height: 100}} />
        <View style={styles.contactSupportContainer}>
          <TouchableOpacity style={styles.contactSupportButton}>
            <Text style={styles.contactSupportText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Contact Support Button (Fixed Footer) */}
    </SafeAreaView>
  );
};

export default HelpCenter;

// --- Stylesheet ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background color for the screen
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING,
    paddingTop: 10,
    paddingBottom: 20, // Add some bottom padding
  },

  // --- Search Bar ---
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 44,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    fontSize: 18,
    color: '#888',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: 0,
  },

  // --- Recent Issue Card ---
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  recentIssueCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recentIssueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  recentIssueStatus: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  statusOpen: {
    color: '#ff6600', // Using the main support color for visibility
    fontWeight: 'bold',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#ccc',
  },

  // --- Grid (FlatList) ---
  gridListContainer: {
    // FlatList container needs no extra padding as it's handled by ScrollView
  },
  // This style manages the space between rows and ensures no horizontal margin bleed
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: SPACING / 2,
    marginHorizontal: -CARD_MARGIN, // Negative margin to counter gridItem margin
  },
  gridItem: {
    flex: 1, // Crucial for 2 columns to take equal width
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: CARD_MARGIN, // Space between items
    minHeight: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  gridIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#ffedd5', // Light orange background for icon area
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  // Style for emoji icons (will not be used now, but kept for robustness)
  gridIcon: {
    fontSize: 20,
  },
  // Style for the imported static Image file
  gridImage: {
    width: 50,
    height: 50,
  },
  gridTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  gridDescription: {
    fontSize: 12,
    color: '#666',
  },

  // --- Popular Articles ---
  sectionTitleCenter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
    textAlign: 'left',
  },
  articleList: {
    marginBottom: 10,
  },
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  articleContent: {
    fontSize: 13,
    color: '#666',
  },

  // --- Fixed Contact Support Footer ---
  contactSupportContainer: {
    paddingHorizontal: SPACING,
    paddingTop: 10,
    paddingBottom: 20, // Add padding for better spacing above the button
    backgroundColor: '#f5f5f5', // Matches screen background
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  contactSupportButton: {
    backgroundColor: '#ff6600', // Orange color from the image
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactSupportText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
