// Bazar.js (The primary screen component, as requested)
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import AppHeader from '../../components/user/UserHomeHeader';
import SearchBar from '../../components/user/SearchBar';
import CategoryList from '../../components/user/CategoryList';
import BannerCarousel from '../../components/user/BannerCarousel';
import ProductCard from '../../components/user/ProductCard';
import BackToSchoolBanner from '../../components/user/BackToSchoolBanner';
import {useNavigation} from '@react-navigation/native';
import HeaderTitle from '../../components/DrawerHeader/HeaderTitle';

// Sample data for Product Cards
const productData = [
  {
    id: 'p1',
    name: 'Pencil colors long name for testing wrapping',
    imageUrl: 'https://via.placeholder.com/150/f0f0f0?text=Pencil',
    currentPrice: '₹120',
    originalPrice: '₹200',
    discount: '40% OFF',
    rating: '4.5',
    reviews: '100',
  },
  {
    id: 'p2',
    name: 'Spiral Notebook',
    imageUrl: 'https://via.placeholder.com/150/f0f0f0?text=Notebook',
    currentPrice: '₹299',
    originalPrice: '₹399',
    discount: '25% OFF',
    rating: '4.7',
    reviews: '250',
  },
  {
    id: 'p3',
    name: 'School Bag',
    imageUrl: 'https://via.placeholder.com/150/f0f0f0?text=Bag',
    currentPrice: '₹599',
    originalPrice: '₹999',
    discount: '40% OFF',
    rating: '4.5',
    reviews: '100',
  },
  {
    id: 'p4',
    name: '2 Pencil colors',
    imageUrl: 'https://via.placeholder.com/150/f0f0f0?text=Pencil',
    currentPrice: '₹150',
    originalPrice: '₹180',
    discount: '17% OFF',
    rating: '4.0',
    reviews: '80',
  },
  // Add more products to see the scrolling effect
];

// FlatList render item function for the product grid
const renderProduct = ({item}) => <ProductCard product={item} />;

// Renaming the main component to Bazar to match the file name convention
const Bazar = () => {
  const navigation = useNavigation();

  return (
    // Main View container
    <SafeAreaView style={styles.container}>
      <HeaderTitle
        navigation={navigation}
        centerText={'Bazar'}
        rightImage={true}
      />

      {/* Scrollable content area */}
      <ScrollView style={styles.scrollViewContent}>
        {/* 2. Search Bar Component */}
        <SearchBar />

        {/* 3. Category List Component (Horizontal Scroll) */}
        <CategoryList />

        {/* 4. Top Banner Carousel Component */}
        <BannerCarousel />

        {/* 5. Product Grid Section */}
        <View style={styles.productGrid}>
          {/* Using FlatList for the single-line horizontal product scroll */}
          <FlatList
            data={productData}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            horizontal={true}
            // 💡 FIX: Removed scrollEnabled={false} (or set it to true)
            // to allow the horizontal list to scroll and reveal all items.
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.horizontalListContent}
            style={styles.horizontalList}
          />
          {/* 💡 FIX: Arrow icon for the second horizontal list */}
          <TouchableOpacity
            style={styles.horizontalArrowContainer}
            onPress={() => navigation.navigate('AllBazar')}>
            <Text style={styles.horizontalArrowIcon}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 6. Back to School Banner Component */}
        <BackToSchoolBanner />

        {/* 5. School Grid Section */}
        <View style={styles.productGrid}>
          {/* Using FlatList for the single-line horizontal product scroll */}
          <FlatList
            data={productData}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            horizontal={true}
            // 💡 FIX: Removed scrollEnabled={false} (or set it to true)
            // to allow the horizontal list to scroll and reveal all items.
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.horizontalListContent}
            style={styles.horizontalList}
          />
          {/* 💡 FIX: Arrow icon for the second horizontal list */}
          <TouchableOpacity
            style={styles.horizontalArrowContainer}
            onPress={() => navigation.navigate('AllBazar')}>
            <Text style={styles.horizontalArrowIcon}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 7. Another Banner Carousel (Repeating promotional banner) */}
        <BannerCarousel />

        {/* Add padding at the bottom for spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Note: Bottom navigation bar is omitted as per user instructions. */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
  },
  scrollViewContent: {
    flex: 1,
  },
  productGrid: {
    // This container itself should not have horizontal padding if the FlatList handles it
    // The previous paddingHorizontal: 7 is removed here to prevent double padding issues.
  },
  row: {
    // This style is not used for horizontal FlatList, but kept for future reference if vertical grid returns.
    justifyContent: 'space-around',
  },
  bottomSpacer: {
    // Space at the very bottom of the scroll view
    height: 50,
  },
  horizontalListContent: {
    // Use padding to ensure the scrollable content starts and ends nicely
    paddingHorizontal: 8,
    paddingTop: 5,
    paddingBottom: 5,
  },
  horizontalList: {
    // Explicit height is necessary for nested horizontal FlatLists
    height: 270,
  },
  // --- NEW STYLES FOR HORIZONTAL ARROW ---
  horizontalArrowContainer: {
    position: 'absolute',
    right: 5, // Position slightly inside the screen edge
    top: 90, // Position vertically in the middle of the cards (approx. 270/2 - 30)
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderBlockColor: '#FF7A00',
    borderWidth: 2,
    backgroundColor: '#FFFF', // Orange color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Android shadow
  },
  horizontalArrowIcon: {
    fontSize: 22,
    color: '#FF7A00',
    fontWeight: 'bold',
    lineHeight: 25,
    // Adjusting for better visual centering of the arrow symbol
    marginLeft: 2,
    marginTop: -2,
  },
});

// Exporting the component as Bazar.js
export default Bazar;
