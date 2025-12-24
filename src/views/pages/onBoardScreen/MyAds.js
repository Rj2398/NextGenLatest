import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- Imports (Maintaining your specified paths) ---
import Header from '../../components/Header';
import SearchBar from '../../components/Ads/SearchBar';
import PrimaryButton from '../../components/PrimaryButton';
import AdItemCard from '../../components/Ads/AdItemCard';
import {SafeAreaView} from 'react-native-safe-area-context';
// -------------------------------------------------

// --- COLORS ---
const color = {
  white: '#FFFFFF',
  black: '#000000',
  greyBackground: '#F5F5F5',
  orangePrimary: '#FF8719',
  textDark: '#1E1E1E',
  textGrey: '#757575',
  borderLight: '#E0E0E0',
};

// --- Mock Data (for Ad List) ---
const mockAds = [
  // ... (Your mock ad data remains the same)
  {
    id: 1,
    title: 'Maggi masala 2 in one Flavours',
    price: '150',
    location: 'New York, NY',
    imageUri: 'https://picsum.photos/200/200?random=maggi',
    status: 'Live',
    isBoosted: false,
  },
  {
    id: 2,
    title: 'Vintage Leather Jacket - Size M',
    price: '89',
    location: 'Brooklyn, NY',
    imageUri: 'https://picsum.photos/200/200?random=jacket',
    status: 'Boosted',
    isBoosted: true,
  },
  {
    id: 3,
    title: 'iPhone 14 Pro Max - 256GB',
    price: '899',
    location: 'Manhattan, NY',
    imageUri: 'https://picsum.photos/200/200?random=iphone',
    status: 'Expiring Soon',
    isBoosted: false,
  },
  {
    id: 4,
    title: 'Gaming Chair - Ergonomic design',
    price: '249',
    location: 'Queens, NY',
    imageUri: 'https://picsum.photos/200/200?random=chair',
    status: 'Live',
    isBoosted: false,
  },
  {
    id: 5,
    title: 'Nike Air Jordan 1 - Size 10',
    price: '180',
    location: 'Bronx, NY',
    imageUri: 'https://picsum.photos/200/200?random=shoe',
    status: 'Live',
    isBoosted: false,
  },
];

const MyAds = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Boosted', 'Unboosted', 'Expiring Soon'];

  // --- Filter Logic ---
  const filteredAds = mockAds.filter(ad => {
    const matchesSearch = ad.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Boosted') return ad.isBoosted && matchesSearch;
    if (activeFilter === 'Unboosted') return !ad.isBoosted && matchesSearch;
    if (activeFilter === 'Expiring Soon')
      return ad.status === 'Expiring Soon' && matchesSearch;

    return matchesSearch;
  });

  const handleAction = (action, adId) => {
    console.log(`${action} action triggered for Ad ID: ${adId}`);
    // Navigation logic
  };

  return (
    // Main container must have flex: 1 to fill the screen
    <SafeAreaView style={styles.container}>
      {/* 1. Header (Fixed at the top) */}
      <Header title="My Ads" onBackPress={() => navigation.goBack()} />

      {/* 2. Search and Filter (Fixed below the Header) */}

      <SearchBar
        placeholder="Search ads"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onFilterPress={() => console.log('Filter Pressed')}
      />

      {/* 3. Horizontal Filter Buttons (Fixed below SearchBar) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
        // marginBottom added to push it off the ad list slightly
        style={styles.filterBarFixed}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.activeFilterButton,
            ]}
            onPress={() => setActiveFilter(filter)}>
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText,
              ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 4. Ad List (Only this part scrolls, filling the remaining space) */}
      <ScrollView style={styles.adListContainer}>
        {filteredAds.map(ad => (
          <AdItemCard
            key={ad.id}
            id={ad.id}
            title={ad.title}
            price={ad.price}
            location={ad.location}
            imageUri={ad.imageUri}
            status={ad.status}
            isBoosted={ad.isBoosted}
            onBoost={() => handleAction('Boost', ad.id)}
            onEdit={() => handleAction('Edit', ad.id)}
            onView={() => handleAction('View', ad.id)}
            onDelete={() => handleAction('Delete', ad.id)}
          />
        ))}

        {filteredAds.length === 0 && (
          <Text style={styles.noResultsText}>
            No ads found matching '{searchTerm}' in the '{activeFilter}' filter.
          </Text>
        )}
        {/* Extra padding at the bottom of the list */}
        <View style={{height: 100}} />
      </ScrollView>

      {/* 5. Floating Action Button (FAB - Absolute Position) */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => navigation.navigate('CreateAd')}>
        <Ionicons name="add" size={30} color={color.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// --- STYLESHEET (Updated for fixed layout) ---
const styles = StyleSheet.create({
  container: {
    flex: 1, // Crucial for filling the screen
    backgroundColor: color.greyBackground,
  },

  // Non-scrolling sections
  searchBarWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: color.white, // Ensure background is white under SearchBar
    zIndex: 1, // Keep it above the list when scrolling
  },
  filterBarFixed: {
    marginBottom: 5, // Space between filter bar and ad list
  },
  filterScroll: {
    paddingHorizontal: 10,
    paddingVertical: 5, // Slightly less padding here as searchBarWrapper has padding
    alignItems: 'center',
    marginBottom: 20,
    height: 50,
  },

  // Scrolling Section
  adListContainer: {
    // flex: 1, // Takes up the rest of the vertical space
    marginTop: 10,
  },

  // Filter Button Styles (Fixed/Corrected)
  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: color.orangePrimary,
    borderColor: color.orangePrimary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: color.textDark,
    lineHeight: 18,
  },
  activeFilterText: {
    color: color.white,
  },

  // Other Styles
  noResultsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: color.textGrey,
  },
  fabButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: color.orangePrimary,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: color.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10, // Must be higher than the list
  },
});

export default MyAds;
