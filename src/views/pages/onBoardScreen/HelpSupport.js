import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../config/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserHeader from '../../components/user/UserHeader';

// --- Constants and Data ---s
const PRIMARY_COLOR = colors.PRIMARY_COLOR;
const BORDER_COLOR = colors.BORDER_COLOR;

const faqData = [
  {
    id: '1',
    // Using simple descriptive identifiers now
    iconName: 'help-circle-outline',
    title: 'How do I reset my Password?',
    summary: 'Go to login screen, tap **Forgot Password**, enter your email...',
    iconSet: 'MCI', // MaterialCommunityIcons
  },
  {
    id: '2',
    iconName: 'credit-card-outline',
    title: 'How do I update my payment method?',
    summary: 'Navigate to Settings > Payment Methods to add or update...',
    iconSet: 'MCI',
  },
  {
    id: '3',
    iconName: 'shield-lock-outline',
    title: 'Is my data secure?',
    summary:
      'Yes, we use industry-standard encryption and security measures...',
    iconSet: 'MCI',
  },
  {
    id: '4',
    iconName: 'bell-outline',
    title: 'How do I manage notifications?',
    summary: 'Go to Settings > Notifications to customize your preferences...',
    iconSet: 'MCI',
  },
];

// --- FAQ Card Component ---
const FAQCard = ({item}) => {
  // A simple function to determine which Icon component to render
  const Icon = item.iconSet === 'MCI' ? MaterialCommunityIcons : '';

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {/* ✅ FIX: The Icon is now correctly resolved and rendered as a component. 
                  If using the standard react-native-vector-icons, they MUST be imported
                  correctly as shown at the top of the file.
                  */}
        <View style={styles.iconContainer}>
          <Icon name={item.iconName} size={24} color={PRIMARY_COLOR} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSummary}>{item.summary}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.readMoreButton}>
        <Text style={styles.readMoreText}>Read more</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Main Screen Component (HelpSupport) ---
const HelpSupport = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <UserHeader
        title={'Help & Support'}
        onBackPress={() => navigation.goBack()}
      />
      {/* Ask Us Anything Section */}
      <View style={styles.askUsSection}>
        <Text style={styles.sectionTitle}>Ask us anything</Text>
        <Text style={styles.sectionSubtitle}>
          Have any questions? We're here to assist you.
        </Text>
        <View style={styles.searchBox}>
          {/* Using Feather for search icon */}
          <Feather
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search here"
            placeholderTextColor="gray"
          />
          {/* Using AntDesign for clear icon */}
          <TouchableOpacity style={styles.clearButton}>
            <AntDesign name="closecircleo" size={16} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Frequently Asked Questions Section */}
      <Text style={styles.faqHeading}>Frequently Asked Questions</Text>
      <View style={styles.faqList}>
        {/* Mapping over the data to create cards */}
        {faqData.map(item => (
          <FAQCard key={item.id} item={item} />
        ))}
      </View>
      {/* Still Have Questions Section */}
      <View style={styles.stillHaveQuestionsSection}>
        <View>
          <Text style={styles.stillQuestionsTitle}>Still have questions?</Text>
          <Text style={styles.stillQuestionsSubtitle}>
            We're here to help you out!
          </Text>
        </View>
        <TouchableOpacity
          style={styles.getInTouchButton}
          onPress={() => navigation.navigate('CreateTick')}>
          <Text style={styles.getInTouchText}>Get in touch</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.viewTicketsButton}
        onPress={() => navigation.navigate('ViewTicket')}>
        <Text style={styles.viewTicketsText}>View support tickets</Text>
      </TouchableOpacity>
      <View style={{height: 50}} /> {/* Spacer */}
    </ScrollView>
  );
};

export default HelpSupport;

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingTop: 20,
  },
  askUsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  faqHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  faqList: {
    marginHorizontal: 15,
  },
  card: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#FFF4E8',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cardSummary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    marginLeft: 45,
  },
  readMoreText: {
    color: PRIMARY_COLOR,
    fontSize: 14,
    fontWeight: '600',
  },
  stillHaveQuestionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 8,
  },
  stillQuestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  stillQuestionsSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  getInTouchButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  getInTouchText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  viewTicketsButton: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  viewTicketsText: {
    color: PRIMARY_COLOR,
    fontSize: 14,
    fontWeight: '600',
  },
});
