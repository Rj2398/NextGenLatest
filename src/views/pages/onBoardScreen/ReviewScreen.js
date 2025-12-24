import {SafeAreaView} from 'react-native-safe-area-context';
// Mock data for reviews

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import FilterBottomSheet from '../../components/FilterBottomSheet';
import UserHeader from '../../components/user/UserHeader';

// Mock data
const mockReviews = [
  {
    id: '1',
    rating: 5,
    headline: 'Excellent course content and delivery',
    description:
      'The instructor explained complex concepts clearly and the practical examples were very helpful. Would definitely recommend this course to others...',
    isVerified: true,
    isFlagged: false,
    courseTitle: 'Advanced React Development',
    author: 'Sarah M.',
    timestamp: '2 days ago',
    helpfulCount: 24,
  },
  {
    id: '2',
    rating: 2,
    headline: 'Could be better organized',
    description:
      'The content jumps around too much and some sections are confusing. Expected more structured learning path...',
    isVerified: true,
    isFlagged: true,
    courseTitle: 'Python for Beginners',
    author: 'Mike R.',
    timestamp: '1 week ago',
    helpfulCount: 8,
  },
  {
    id: '3',
    rating: 4,
    headline: 'Great value for money',
    description:
      'Comprehensive coverage of UI/UX principles with hands-on projects. The instructor is knowledgeable and responsive to questions...',
    isVerified: true,
    isFlagged: false,
    courseTitle: 'UI/UX Design Fundamentals',
    author: 'Lisa K.',
    timestamp: '3 days ago',
    helpfulCount: 15,
  },
];

const ratingData = [
  {stars: 5, percentage: 65, count: 325},
  {stars: 4, percentage: 20, count: 100},
  {stars: 3, percentage: 8, count: 40},
  {stars: 2, percentage: 4, count: 20},
  {stars: 1, percentage: 3, count: 15},
];

const filterOptions = ['Flagged', 'Low Rated', 'Verified', 'With Comments'];
const filters = [
  'Flagged',
  'Low Rated',
  'Verified',
  'With Comments',
  'High Rated',
  'New',
];
export default function ReviewScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [reviews, setReviews] = useState(mockReviews);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handlePressDetails = item => {
    // You should pass parameters here, e.g., the rating filter
    navigation.navigate('ReviewDetailScreen');
  };

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // State to store applied filters
  const [appliedFilters, setAppliedFilters] = useState({});

  // Open BottomSheet
  const openFilterSheet = () => setIsFilterVisible(true);

  // Close BottomSheet
  const closeFilterSheet = () => setIsFilterVisible(false);

  // Apply filters callback
  const handleApplyFilters = filters => {
    setAppliedFilters(filters);
    setIsFilterVisible(false); // Close bottom sheet
    console.log('Applied Filters:', filters);
  };

  const toggleFilter = filter => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  //newly added

  const [selectedFilters, setSelectedFilters] = React.useState([
    'Flagged',
    'Verified',
  ]);

  const FilterChip = ({text, isSelected, onPress, chipStyles}) => {
    // Determine the specific styles to apply based on selection and text
    const {chipStyle, textStyle} = chipStyles(text, isSelected);

    return (
      <TouchableOpacity style={[styles.chipBase, chipStyle]} onPress={onPress}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const handlePress = filter => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter],
    );
  };

  const filters = ['Flagged', 'Low Rated', 'Verified', 'With Comments'];

  // Helper function to apply specific styles based on the chip's text
  const getChipStyles = (text, isSelected) => {
    if (isSelected) {
      if (text === 'Verified') {
        return {
          chipStyle: styles.chipVerifiedSelected,
          textStyle: styles.chipTextSelectedWhite,
        };
      }
      if (text === 'Flagged') {
        return {
          chipStyle: styles.chipFlaggedSelected,
          textStyle: styles.chipTextSelectedWhite,
        };
      }

      return {
        chipStyle: styles.chipDefaultSelected,
        textStyle: styles.chipTextSelectedWhite,
      };
    }

    return {
      chipStyle: styles.chipUnselected,
      textStyle: styles.chipTextDefault,
    };
  };

  const loadMoreReviews = () => {
    const newReviews = [...mockReviews].map((r, i) => ({
      ...r,
      id: `${r.id}-${Date.now()}-${i}`,
    }));
    setReviews([...reviews, ...newReviews]);
  };

  const renderStars = rating => {
    // return Array.from({ length: 5 }).map((_, index) => (
    //   <Text key={index} style={styles.star}>
    //     {index < rating ? '⭐' : '☆'}
    //   </Text>
    // ));

    return Array.from({length: 5}).map((_, index) => (
      <Image
        key={index}
        source={
          index < rating
            ? require('../../../assets/images/ic_filled_icon.png')
            : require('../../../assets/images/ic_empty_icon.png')
        }
        style={styles.starImage}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}

      <View style={styles.header}>
        <UserHeader
          title={'Reviews & Ratings'}
          onBackPress={() => navigation.goBack()}
        />
        {/* <TouchableOpacity>
          <Image
            source={require('../../../assets/images/nextgenlogo.png')}
            style={{width: 65, height: 40}}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.brandText}>Reviews & Ratings</Text>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={openFilterSheet}></TouchableOpacity> */}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {/* Total Reviews Card */}
            <View style={styles.statCard}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>📊</Text>
              </View>
              <View style={styles.statContent}>
                <View style={styles.valueRow}>
                  <Text style={styles.value}>1,247</Text>
                  <Text style={[styles.trend, {color: '#4CAF50'}]}>+12%</Text>
                </View>
                <Text style={styles.subtitle}>Total reviews</Text>
              </View>
            </View>

            {/* Average Rating Card */}
            <View style={styles.statCard}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../../../assets/images/ic_star_icon_yellow.png')}
                />
              </View>

              <View style={styles.statContent}>
                <View style={styles.valueRow}>
                  <Text style={styles.value}>4.3</Text>
                </View>
                <Text style={styles.subtitle}>Average Rating</Text>
              </View>
            </View>

            {/* New Reviews Card */}
            <View style={styles.statCard}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../../../assets/images/ic_flag_icon_green.png')}
                  style={{height: 40, width: 40}}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.statContent}>
                <View style={styles.row}>
                  <Text style={styles.boldNumber}>23</Text>
                  <Text style={styles.subText}>Flagged Reviews</Text>
                </View>
                <Text style={styles.subtitle}>3 new today</Text>
              </View>
            </View>

            {/* Rating Trends */}
            <View style={styles.trendsContainer}>
              <View style={styles.trendsHeader}>
                <Text style={styles.trendsTitle}>Rating Trends</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Last 30 days</Text>
                </View>
              </View>

              <View style={styles.ratingsContainer}>
                {ratingData.map(item => (
                  <TouchableOpacity
                    key={item.stars}
                    style={styles.ratingRow}
                    onPress={() => navigation.navigate('ReviewDetailScreen')}>
                    <View style={styles.starContainer}>
                      <Text style={styles.starNumber}>{item.stars}</Text>
                      <Image
                        source={require('../../../assets/images/ic_star_icon_yellow.png')}
                        style={{width: 13, height: 13}}
                      />
                    </View>
                    <View style={styles.progressBarContainer}>
                      <View style={styles.progressBarBackground}>
                        <View
                          style={[
                            styles.progressBarFill,
                            {width: `${item.percentage}%`},
                          ]}
                        />
                      </View>
                    </View>
                    <Text style={styles.percentage}>{item.percentage}%</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Search and Filters */}
            <View style={styles.searchFilterContainer}>
              <View style={styles.searchContainer}>
                <Image
                  source={require('../../../assets/images/ic_search_icon.png')}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by keyword, user, or product"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#999999"
                />
              </View>

              {/* Dropdowns */}
              <View style={styles.dropdownsContainer}>
                <View style={styles.dropdown}>
                  <Text style={styles.dropdownText}>All Ratings</Text>
                  <Image
                    source={require('../../../assets/images/ic_small_drop_down.png')}
                    style={{height: 6, width: 12}}
                  />
                </View>
                <View style={styles.dropdown}>
                  <Text style={styles.dropdownText}>All Status</Text>
                  <Image
                    source={require('../../../assets/images/ic_small_drop_down.png')}
                    style={{height: 6, width: 12}}
                  />
                </View>
              </View>

              {/* Filter Chips */}

              <View style={styles.filtersContainer}>
                {/* The View container with flexWrap is the key for the wrapping layout */}
                <View style={styles.chipRowWrapper}>
                  {filters.map(filter => (
                    <FilterChip
                      key={filter}
                      text={filter}
                      isSelected={selectedFilters.includes(filter)}
                      onPress={() => handlePress(filter)}
                      chipStyles={getChipStyles}
                    />
                  ))}
                </View>
              </View>
            </View>

            {/* Reviews List */}
            <View style={styles.reviewsContainer}>
              {reviews.map(review => (
                <TouchableOpacity
                  key={review.id}
                  style={styles.reviewCard}
                  onPress={() => {
                    console.log('call', 'Call');
                    navigation.navigate('ReviewDetailScreen');
                  }}>
                  {/* Review Header */}
                  <View style={styles.reviewHeader}>
                    <View style={styles.starsContainer}>
                      {renderStars(review.rating)}
                    </View>
                    {/* {review.isFlagged && (
                    <View style={styles.flaggedBadge}>
                      <Text style={styles.flaggedText}>🚩 Flagged</Text>
                    </View>
                  )} */}
                    <TouchableOpacity style={styles.menuButton}>
                      <Text style={styles.menuIcon}>⋮</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Review Headline */}
                  <Text style={styles.headline}>{review.headline}</Text>

                  {/* Verified Badge */}

                  {review.isVerified && !review.isFlagged ? (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>Verified Purchase</Text>
                    </View>
                  ) : review.isVerified && review.isFlagged ? (
                    <View style={styles.row1}>
                      <View style={styles.flaggedBadge}>
                        <Text style={styles.flaggedText}>Flagged</Text>
                      </View>

                      <View style={styles.verifiedBadge}>
                        <Text style={styles.verifiedText}>
                          Verified Purchase
                        </Text>
                      </View>
                    </View>
                  ) : null}

                  {/* Review Description */}
                  <Text style={styles.description} numberOfLines={3}>
                    {review.description}
                  </Text>

                  {/* Review Footer */}
                  <View style={styles.reviewFooter}>
                    <View style={styles.courseInfo}>
                      <Text style={styles.courseTitle}>
                        {review.courseTitle}
                      </Text>
                      <Text style={styles.authorInfo}>
                        {review.author} • {review.timestamp}
                      </Text>
                    </View>
                    <View style={styles.helpfulContainer}>
                      <Text style={styles.helpfulText}>
                        Helpful ({review.helpfulCount})
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Load More Button */}
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={loadMoreReviews}>
              <Text style={styles.loadMoreText}>Load More Reviews</Text>
            </TouchableOpacity>
          </View>

          <FilterBottomSheet
            visible={isFilterVisible}
            onClose={closeFilterSheet}
            onApply={handleApplyFilters}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },

  row: {
    flexDirection: 'row', // put items side by side
    alignItems: 'center', // vertical centering
  },
  row1: {
    flexDirection: 'row', // put items side by side
    alignItems: 'center',
    gap: 4, // vertical centering
  },

  boldNumber: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    marginRight: 6, // small space before text
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: '#FF9800',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  brandText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  menuButton: {
    padding: 8,
  },
  menuLine: {
    width: 24,
    height: 3,
    backgroundColor: '#333333',
    marginVertical: 2,
    borderRadius: 2,
  },

  // Stats Cards Styles
  statsContainer: {
    marginBottom: 24,
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  statCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  statContent: {
    flex: 1,
    justifyContent: 'center',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 8,
  },
  trend: {
    fontSize: 14,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },

  // Rating Trends Styles
  trendsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trendsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  trendsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  badge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderColor: '#E5E7EB',
  },
  badgeText: {
    fontSize: 12,
    color: '#757575',
  },
  ratingsContainer: {
    gap: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  starNumber: {
    fontSize: 17,
    fontWeight: '500',
    color: '#333333',
    marginRight: 4,
  },
  starIcon: {
    fontSize: 16,
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF9800',
    borderRadius: 4,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    width: 45,
    textAlign: 'right',
  },

  // Search and Filter Styles
  searchFilterContainer: {
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333333',
  },
  dropdownsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  dropdown: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333333',
  },
  dropdownIcon: {
    fontSize: 10,
    color: '#757575',
  },
  filtersScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterChipActive: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  filterChipFlagged: {
    backgroundColor: '#FFC107',
    borderColor: '#FFC107',
  },
  filterChipText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },

  // Reviews List Styles
  reviewsContainer: {
    marginBottom: 24,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  star: {
    fontSize: 16,
    marginRight: 2,
  },
  flaggedBadge: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  flaggedText: {
    fontSize: 11,
    color: '#856404',
    fontWeight: '500',
  },
  menuIcon: {
    fontSize: 20,
    color: '#757575',
  },
  headline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },

  flaggedBadge: {
    backgroundColor: '#C8A825',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  flaggedText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '500',
  },

  verifiedBadge: {
    backgroundColor: '#43A3A3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  verifiedText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
  },
  courseInfo: {
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FF9800',
    marginBottom: 4,
  },
  authorInfo: {
    fontSize: 12,
    color: '#757575',
  },
  helpfulContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 12,
    color: '#757575',
  },

  // Load More Button Styles
  loadMoreButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },

  filtersContainer: {
    // 🔑 KEY CHANGE: These styles enable wrapping
    flexDirection: 'row',
    flexWrap: 'wrap',

    // General layout padding/margin

    marginTop: 10,
  },

  filtersContainer: {
    paddingTop: 20,
    backgroundColor: '#fff',
    // Layout padding
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  chipRowWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },

  // Base style shared by all chips (padding, margin, border radius)
  chipBase: {
    marginRight: 8,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // --- Unselected/Default Style (e.g., "Low Rated", "With Comments") ---
  chipUnselected: {
    backgroundColor: '#f0f0f0',
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  chipTextDefault: {
    color: '#4a4a4a',
    fontWeight: '500',
  },

  // --- Specific Selected Styles ---

  // 🟢 Verified Selected (The user's requested Green/Teal)
  chipVerifiedSelected: {
    backgroundColor: '#43A3A3', // A nice teal/verified green color
    borderWidth: 1,
    borderColor: '#43A3A3',
  },

  // 🟡 Flagged Selected (Matches the gold/yellow from the screenshot)
  chipFlaggedSelected: {
    backgroundColor: '#E6B300', // Gold/Yellow color
    borderWidth: 1,
    borderColor: '#E6B300',
  },

  // ⚪ Default Selected (Applied to Low Rated, Comments, etc., if selected)
  chipDefaultSelected: {
    // Re-using the Verified color, or you could make it another distinct primary color
    backgroundColor: '#4472C4', // Example: a primary blue color
    borderWidth: 1,
    borderColor: '#4472C4',
  },

  // White text for all selected chips
  chipTextSelectedWhite: {
    color: 'white',
    fontWeight: 'bold',
  },

  starImage: {
    width: 20,
    height: 20,
    marginRight: 4,
    resizeMode: 'contain',
  },
});
