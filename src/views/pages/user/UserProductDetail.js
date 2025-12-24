import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions, 
} from 'react-native';

// Get screen width for full-width slider items
const { width } = Dimensions.get('window');

// --- 🎨 COLOR CONSTANTS GROUPED HERE ---
// Grouping all color codes used in the component together
const ORANGE = '#FF7A00'; // Primary accent color for buttons and highlights
const GRAY_TEXT = '#9B9B9B';    // Used for secondary text, old prices, etc.
const BORDER_COLOR = '#ddd'; // General light border color

// --- Data Definitions ---

// Placeholder data for multiple product images
const PRODUCT_IMAGES = [
  { id: '1', uri: require('../../../assets/user/one.png')}, 
  { id: '2', uri: require('../../../assets/user/two.png') }, 
  { id: '3', uri: require('../../../assets/user/three.png') },
];

const SIZES = ['S', 'M', 'L', 'XL', '2XL'];
const COLORS = [
  { id: '1', hex: '#000000', name: 'Black' },
  { id: '2', hex: '#FFFFFF', name: 'White' },
  { id: '3', hex: '#E0B0FF', name: 'LightPurple' },
];

const RELATED_PRODUCTS_DATA = [
  { id: '1', name: 'Evening Dress', price: '12$', oldPrice: '15$', discount: '20%' },
  { id: '2', name: 'T-Shirt Sailing', price: '10$', oldPrice: null, discount: 'NEW' },
  { id: '3', 'name': 'Jeans', price: '9$', oldPrice: '10$', discount: 'NEW' },
];

// --- Sub-Components (Unchanged structure) ---
const SizeOption = ({ size, isSelected, onSelect }) => (
  <TouchableOpacity
    style={[
      styles.sizeButton,
      isSelected && styles.selectedSizeButton,
    ]}
    onPress={() => onSelect(size)}>
    <Text
      style={[
        styles.sizeText,
        isSelected && styles.selectedSizeText,
      ]}>
      {size}
    </Text>
  </TouchableOpacity>
);

const ColorSwatch = ({ color, isSelected, onSelect }) => (
  <TouchableOpacity
    style={[
      styles.colorSwatchContainer,
      isSelected && styles.selectedColorSwatchContainer,
    ]}
    onPress={() => onSelect(color.id)}>
    <View
      style={[
        styles.colorSwatch,
        { backgroundColor: color.hex },
        // Use BORDER_COLOR constant for the white swatch border
        color.hex === '#FFFFFF' && !isSelected && { borderColor: BORDER_COLOR, borderWidth: 1 },
      ]}
    />
  </TouchableOpacity>
);

const RelatedProductCard = ({ item }) => (
  <TouchableOpacity style={styles.relatedProductCard}>
    <View style={styles.relatedProductImagePlaceholder}>
      <Text style={styles.imagePlaceholderText}>
        {item.discount}
      </Text>
    </View>
    <View style={styles.relatedProductInfo}>
      <Text style={styles.relatedProductName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.relatedProductPrice}>
        <Text style={styles.currentPrice}>
          {item.price}
        </Text>
        {item.oldPrice && (
          <Text style={styles.oldPrice}> {item.oldPrice}</Text>
        )}
      </Text>
    </View>
  </TouchableOpacity>
);


// --- Main Component ---

/**
 * Main component displaying product details, including a multi-image slider with corrected header and price placement.
 */
const UserProductDetail = ({ navigation }) => {
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColorId, setSelectedColorId] = useState('1'); 
  const [activeIndex, setActiveIndex] = useState(0); 

  /**
   * Updates the active index when the user scrolls the image flat list.
   * @param {object} event - Scroll event object.
   */
  const onScroll = (event) => {
    // Calculate the index of the visible item based on scroll position
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveIndex(index);
  };

  /**
   * Renders a single image item for the FlatList (Slider).
   * Note: The source uses `item.uri` directly as per your requirement for `require()` based paths.
   * @param {object} item - Image data.
   */
  const renderImageItem = ({ item }) => (
    <Image
      source={ item.uri }
      style={styles.mainImage}
      resizeMode="contain"
    />
  );

  return (
    <ScrollView style={styles.container}>
      
      {/* 1. Image Slider Area with Back Arrow */}
      <View style={styles.imageSliderContainer}>
        {/* Back Arrow Icon (Top Left) - Implemented as a circle with text for simplicity */}
        <TouchableOpacity style={styles.backArrowContainer} onPress={() => console.log("Back Pressed")}>
            {/* <Text style={styles.backArrowText}>{'<'}</Text> */}
            <Image
            source={require('../../../assets/back_screen_icon.png')}
            style={{ width: 15, height: 15 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        <FlatList
          data={PRODUCT_IMAGES}
          renderItem={renderImageItem}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled // Allows snapping to the next item
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll} // Track scroll position
          scrollEventThrottle={16} // Optimize scroll updates
        />
        
        {/* Indicators (Dots) */}
        <View style={styles.indicatorContainer}>
          {PRODUCT_IMAGES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                // Highlight the active dot
                activeIndex === index && styles.activeIndicator, 
              ]}
            />
          ))}
        </View>
      </View>

      {/* 2. Brand, Name, and PRICE (Moved here) */}
      <View style={[styles.sectionPadding, styles.priceAndRatingSection]}>
        <View>
            <Text style={styles.brandName}>H&M</Text>
            <Text style={styles.productName}>Regular School Bag</Text>
            {/* Star Rating Section */}
            <View style={styles.ratingStars}>
                <Text style={styles.stars}>⭐⭐⭐⭐</Text> 
                <Text style={styles.ratingCount}>(10)</Text>
            </View>
        </View>
        
        {/* Price Tag (Moved and styled for inline display) */}
        <View style={styles.inlinePriceTag}>
            <Text style={styles.oldPriceTag}>21$</Text>
            <Text style={styles.currentPriceTagBig}>14$</Text>
        </View>
      </View>

      {/* 3. Variant/Thumbnail Selector (Orange & Pink) */}
      <View style={[styles.variantSelector, styles.sectionPadding]}>
        <View style={styles.variantOptions}>
          {/* Orange Variant Thumbnail */}
          <TouchableOpacity style={styles.variantThumbnail}>
      
            <Image
              source={ require('../../../assets/user/one.png')}
              style={styles.variantImage}
            />
            <Text style={styles.variantText}>Orange</Text>
          </TouchableOpacity>
          {/* Pink Variant Thumbnail */}
          <TouchableOpacity style={styles.variantThumbnail}>
            <Image
              source={ require('../../../assets/user/two.png')}
              style={styles.variantImage}
            />
            <Text style={styles.variantText}>Pink</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. Size Selector */}
      <View style={[styles.section, styles.sectionPadding]}>
        <Text style={styles.sectionTitle}>Size</Text>
        <View style={styles.sizeOptions}>
          {SIZES.map(size => (
            <SizeOption
              key={size}
              size={size}
              isSelected={selectedSize === size}
              onSelect={setSelectedSize}
            />
          ))}
        </View>
      </View>

      {/* 5. Color Swatch Selector (Grouped together as requested) */}
      <View style={[styles.section, styles.sectionPadding]}>
        <Text style={styles.sectionTitle}>Color</Text>
        <View style={styles.colorOptions}>
          {COLORS.map(color => (
            <ColorSwatch
              key={color.id}
              color={color}
              isSelected={selectedColorId === color.id}
              onSelect={setSelectedColorId}
            />
          ))}
        </View>
      </View>

      {/* 6. Description */}
      <View style={[styles.section, styles.sectionPadding]}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          This Nike Throwback Pullover Hoodie is made from premium french terry fabric that blends a performance feel. 
          <Text style={styles.readMore}> Read More...</Text>
        </Text>
      </View>

      {/* 7. Add to Cart Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton}
     onPress={() => navigation.navigate('MyCart')}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Separator before Reviews */}
      <View style={styles.separator} />

      {/* 8. Reviews */}
      <View style={[styles.section, styles.sectionPadding]}>
        <View style={styles.reviewHeader}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <TouchableOpacity onPress={() =>    navigation.navigate('UserRating')}>
              <Text style={styles.viewCount}>View All</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.reviewCard}>
          <View style={styles.reviewerImage} />
          <View style={styles.reviewContent}>
            <View style={styles.reviewMeta}>
              <Text style={styles.reviewerName}>Ronald Richards</Text>
              <Text style={styles.reviewDate}>19 May, 2020</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>4.8 rating</Text>
              <Text style={styles.stars}>⭐⭐⭐⭐</Text> 
            </View>
          </View>
        </View>
        <Text style={styles.reviewText} numberOfLines={3}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae amet...
        </Text>
      </View>

      {/* 9. Related Products ("You can also like this") */}
      <View style={styles.sectionPadding}>
        <Text style={styles.sectionTitle}>You can also like this</Text>
        <FlatList
          data={RELATED_PRODUCTS_DATA}
          renderItem={({ item }) => <RelatedProductCard item={item} />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.relatedProductsList}
        />
      </View>
      
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

// --- Stylesheet (Colors are now referenced from constants above) ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionPadding: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  // 1. Image Slider & Indicators
  imageSliderContainer: {
    height: 450, 
    width: '100%',
    position: 'relative',
  },
  mainImage: {
    width: width, 
    height: '100%',
  },
  
  // Back Arrow Styling
  backArrowContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with transparency
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backArrowText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -2,
  },
  
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: ORANGE, // Referenced ORANGE constant
  },
  
  // 2. Brand, Name, and Price (Updated Section)
  priceAndRatingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productName: {
    fontSize: 14,
    color: GRAY_TEXT, // Referenced GRAY_TEXT constant
    marginBottom: 5,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingCount: {
    fontSize: 12,
    color: GRAY_TEXT, // Referenced GRAY_TEXT constant
    marginLeft: 5,
    marginTop: 2,
  },

  // Inline Price Tag Styling
  inlinePriceTag: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  oldPriceTag: {
    color: GRAY_TEXT, // Referenced GRAY_TEXT constant
    textDecorationLine: 'line-through',
    marginRight: 8,
    fontSize: 16,
  },
  currentPriceTagBig: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },

  // 3. Variant/Thumbnail Selector
  variantOptions: {
    flexDirection: 'row',
  },
  variantThumbnail: {
    marginRight: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER_COLOR, // Referenced BORDER_COLOR constant
    borderRadius: 8,
    padding: 5,
  },
  variantImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  variantText: {
    fontSize: 12,
    marginTop: 4,
  },

  // 4. Size Selector
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR, // Referenced BORDER_COLOR constant
    backgroundColor: '#f9f9f9',
  },
  selectedSizeButton: {
    backgroundColor: ORANGE, // Referenced ORANGE constant
    borderColor: ORANGE,     // Referenced ORANGE constant
  },
  sizeText: {
    color: '#333',
    fontWeight: '600',
  },
  selectedSizeText: {
    color: '#fff',
  },

  // 5. Color Swatch Selector
  colorOptions: {
    flexDirection: 'row',
    marginTop: 5,
  },
  colorSwatchContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  selectedColorSwatchContainer: {
    borderWidth: 2,
    borderColor: ORANGE, // Referenced ORANGE constant
    padding: 0,
  },
  colorSwatch: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },

  // 6. Description
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  readMore: {
    color: ORANGE, // Referenced ORANGE constant
    fontWeight: 'bold',
  },

  // 7. Add to Cart Button
  buttonContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  addToCartButton: {
    backgroundColor: ORANGE, // Referenced ORANGE constant
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // 8. Reviews
  separator: {
    height: 8,
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewCount: {
    fontSize: 14,
    color: GRAY_TEXT, // Referenced GRAY_TEXT constant
  },
  reviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BORDER_COLOR, // Referenced BORDER_COLOR constant
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewMeta: {
    flexDirection: 'column',
  },
  reviewerName: {
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
    color: GRAY_TEXT, // Referenced GRAY_TEXT constant
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stars: {
    color: ORANGE, // Referenced ORANGE constant
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    paddingLeft: 50,
  },

  // 9. Related Products
  relatedProductsList: {
    paddingRight: 15,
    paddingVertical: 10,
  },
  relatedProductCard: {
    width: 140,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: BORDER_COLOR, // Referenced BORDER_COLOR constant
    backgroundColor: '#fff',
  },
  relatedProductImagePlaceholder: {
    height: 120,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 5,
    position: 'relative',
  },
  imagePlaceholderText: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#FF0000',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 5,
    borderRadius: 3,
    fontWeight: 'bold',
  },
  relatedProductInfo: {
    padding: 8,
  },
  relatedProductName: {
    fontSize: 12,
    color: '#333',
    marginBottom: 2,
  },
  relatedProductPrice: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  oldPrice: {
    fontSize: 12,
    color: GRAY_TEXT, // Referenced GRAY_TEXT constant
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
});

export default UserProductDetail;