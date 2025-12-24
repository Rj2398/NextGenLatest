// RatingReviewsScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserReviewItem from '../../components/user/UserReviewItem';
import {SafeAreaView} from 'react-native-safe-area-context';
// --- Sample Data ---
const MOCK_REVIEWS = [
  {
    id: 1,
    name: 'Kim Shine',
    avatar: require('../../../assets/images/ic_maggi.png'), // Replace path
    rating: 4,
    date: 'August 13, 2019',
    content:
      "I loved this dress so much as soon as I tried it on I knew I had to buy it in another color. I am 5'3 about 155lbs and I carry all my weight in my upper body. When I put it on I felt like it thinned me put and I got so many compliments.",
    photos: [
      require('../../../assets/images/ic_maggi.png'), // Replace path
      require('../../../assets/images/ic_maggi.png'), // Replace path
      require('../../../assets/images/ic_maggi.png'), // Replace path
    ],
    hasPhoto: true,
  },
  {
    id: 2,
    name: 'Matilda Brown',
    avatar: require('../../../assets/images/ic_maggi.png'), // Replace path
    rating: 3,
    date: 'August 14, 2019',
    content:
      "I loved this dress so much as soon as I tried it on I knew I had to buy it in another color. I am 5'3 about 155lbs and I carry all my weight in my upper body. When I put it on I felt like it thinned me put and I got so many compliments.",
    photos: [
      require('../../../assets/images/ic_maggi.png'), // Replace path
      require('../../../assets/images/ic_maggi.png'), // Replace path
      require('../../../assets/images/ic_maggi.png'), // Replace path
    ],
    hasPhoto: true,
  },
  // Add more mock data as needed
];

const UserRatingReviewsScreen = () => {
  const [showOnlyWithPhoto, setShowOnlyWithPhoto] = useState(false);

  const filteredReviews = MOCK_REVIEWS.filter(
    review => !showOnlyWithPhoto || review.hasPhoto,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => Alert.alert('Navigate', 'Go back')}>
          <Icon name="arrow-left" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Rating and reviews</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Summary and Filter */}
        <View style={styles.summaryRow}>
          <Text style={styles.reviewCount}>
            <Text style={{fontWeight: 'bold'}}>{MOCK_REVIEWS.length}</Text>{' '}
            reviews
          </Text>

          <View style={styles.photoFilter}>
            <Text style={styles.filterText}>With photo</Text>
            {/* The design uses a square checkbox, but a Switch/Toggle is more common for filtering */}
            <Switch
              trackColor={{false: '#ccc', true: '#FFA500'}}
              thumbColor={showOnlyWithPhoto ? '#fff' : '#fff'}
              onValueChange={setShowOnlyWithPhoto}
              value={showOnlyWithPhoto}
            />
            {/* For a true checkbox look, you would use a Pressable + Icon component */}
          </View>
        </View>

        {/* Reviews List */}
        {filteredReviews.map(review => (
          <UserReviewItem key={review.id} review={review} />
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar (Placeholder based on design) */}
      <View style={styles.bottomNav}>
        <Icon name="chat-outline" size={28} color="#999" />
        <Icon name="shopping-bag-outline" size={28} color="#999" />
        <Icon name="account-outline" size={28} color="#999" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // --- Header ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  // --- Summary and Filter ---
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reviewCount: {
    fontSize: 22,
    color: '#333',
  },
  photoFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    marginRight: 5,
  },
  // --- Bottom Navigation ---
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
});

export default UserRatingReviewsScreen;
