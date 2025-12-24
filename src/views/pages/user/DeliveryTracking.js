import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
// Removed: TextInput (no longer used in the shown JSX)
import React, {useState, useCallback} from 'react';
import UserHeader from '../../components/user/UserHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Data (FAQ is the only data used in the shown JSX) ---
const FAQS = [
  {
    id: '1',
    question: 'How can I track my order?',
    answer:
      'After placing your order, you will receive a tracking number via email. Enter this number in the "Track Your Shipment" section above to get real-time status updates.',
  },
  {
    id: '2',
    question: 'What if I’m not home for delivery?',
    answer:
      'The courier will typically attempt re-delivery the next business day or leave a note with instructions to pick up the package at a local station. You can also contact the courier using the tracking number.',
  },
  {
    id: '3',
    question: 'Can I change my delivery address?',
    answer:
      'We can only change the delivery address before the order is shipped. Please contact support immediately if you need to make changes.',
  },
  {
    id: '4',
    question: 'Do you deliver internationally?',
    answer:
      'Yes, we currently deliver to over 50 countries. Shipping costs and delivery times will be calculated at checkout based on your location.',
  },
];

// --- 3. Collapsible FAQ Item Component (Individual Card) ---
const CollapsibleFAQItem = ({faq, activeId, setActiveId, isLast}) => {
  const isExpanded = activeId === faq.id;

  const toggleExpansion = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveId(isExpanded ? null : faq.id);
  }, [isExpanded, faq.id, setActiveId]);

  return (
    <TouchableOpacity
      style={[
        styles.cardBase,
        styles.faqItemCard,
        !isLast && {marginBottom: 10},
      ]}
      onPress={toggleExpansion}
      activeOpacity={0.8}>
      <View style={styles.faqHeader}>
        <Text style={styles.faqText}>{faq.question}</Text>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#666"
        />
      </View>
      {isExpanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{faq.answer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// --- 4. Main Screen Component ---
const DeliveryTracking = () => {
  const navigation = useNavigation();

  const [activeFaqId, setActiveFaqId] = useState(null);

  return (
    // Set the main background to match the design (light peach/off-white)
    <SafeAreaView style={{flex: 1, backgroundColor: '#fdf7f4'}}>
      {/* Assuming UserHeader is the top bar with 'Delivery & Tracking' title */}
      <UserHeader
        title={'Delivery & Tracking'}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* FAQ Header as a distinct Card */}
        <View style={[styles.faqHeaderCard]}>
          <Icon
            name="help-circle"
            size={20}
            color="#ff8c42"
            style={styles.faqHeaderIcon}
          />
          <Text style={styles.faqHeaderTitle}>Frequently Asked Questions</Text>
        </View>

        {/* Individual Collapsible FAQ Cards */}
        {FAQS.map((faq, index) => (
          <CollapsibleFAQItem
            key={faq.id}
            faq={faq}
            activeId={activeFaqId}
            setActiveId={setActiveFaqId}
            isLast={index === FAQS.length - 1}
          />
        ))}

        {/* Need Help Button */}
        <TouchableOpacity
          style={styles.needHelpButton}
          onPress={() => {
            // navigation.navigate('AssociatedInstitutes');
          }}>
          <Icon
            name="chat-outline"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Text style={styles.needHelpButtonText}>Need Help?</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryTracking;

// --- 5. Final Updated Stylesheet ---
const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // --- Core Card Style ---
  cardBase: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  // --- FAQ Header Card (New distinct card style) ---
  faqHeaderCard: {
    backgroundColor: '#ffe7d9', // Background of the header itself is light orange
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Space before the first FAQ item card
  },
  faqHeaderIcon: {
    marginRight: 10,
  },
  faqHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  // --- Individual Collapsible FAQ Card ---
  faqItemCard: {
    padding: 15,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  faqText: {
    fontSize: 15,
    color: '#333',
    flexShrink: 1,
    paddingRight: 10,
  },
  answerContainer: {
    width: '100%',
    paddingTop: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: 5,
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  // --- Need Help Button (Unchanged) ---
  needHelpButton: {
    backgroundColor: '#ff8c42',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonIcon: {
    marginRight: 5,
  },
  needHelpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
