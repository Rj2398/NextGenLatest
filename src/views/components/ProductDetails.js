import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// 🔸 Static colors
const PRIMARY_COLOR = '#f97316'; // Orange accent
const SECONDARY_COLOR = '#f3f4f6'; // Light gray background
const CARD_BG = '#ffffff'; // White card background
const DARK_TEXT = '#1f2937';
const GRAY_TEXT = '#555555'; // Darker gray for labels
const DEAL_BG = '#fef3c7'; // Light yellow/orange for deals tag

const {width: screenWidth} = Dimensions.get('window');

// --- New Sub-Component for Variant Rows ---
const VariantRow = ({label, value, color, dealTag}) => {
  return (
    <View style={styles.variantRow}>
      <Text style={styles.detailItemLabel}>{label}</Text>
      <Text style={[styles.variantValueText, {color: color || DARK_TEXT}]}>
        {value}
      </Text>
      {dealTag}
    </View>
  );
};

// 🔸 Reusable component for a single detail item (used for Main Product)
const DetailItem = ({label, value}) => {
  // Conditional rendering: hide if value is null, undefined, or empty string
  if (!value) return null;
  return (
    <View style={styles.detailItemContainer}>
      <Text style={styles.detailItemLabel}>{label}</Text>
      <Text style={styles.detailItemValue}>{value}</Text>
    </View>
  );
};

const ProductDetails = ({item, varientList, onEdit, onDelete}) => {
  const [showVariants, setShowVariants] = useState(false);

  // 🔸 Helper to get the product name
  const getProductName = (product, isVariant) => {
    if (isVariant) {
      return `Variant Details`; // Using a placeholder as the main title is outside the card in the variant
    }
    return product.product_name || 'Product Details';
  };

  // 🔸 Render a single card (used for both main and variant)
  const renderProductCard = (product, isVariant = false) => {
    // --- MAPPING DATA PROPERTIES ---
    const productName = getProductName(product, isVariant);

    // Shared/Variant data fields
    const productSP = product.sp || product.variant_price;
    const productDeals = product.variant_deals;

    // Determine the image source
    const imageSource =
      product.product_image || product.variant_image
        ? {uri: product.product_image || product.variant_image}
        : require('../../assets/images/ic_maggi.png');

    return (
      <View
        key={product.id || productName}
        style={[
          styles.card,
          isVariant && styles.variantCard,
          {opacity: isVariant ? 0.8 : 1},
        ]}>
        {/* FIX: Use specific styles for variant card top section */}
        <View
          style={[styles.topSection, isVariant && styles.variantTopSection]}>
          {/* FIX 1: Variant Image on the left for text wrapping effect */}
          {isVariant && (
            <Image
              source={imageSource}
              style={styles.variantImageLeft}
              resizeMode="cover"
            />
          )}

          {/* LEFT/MAIN CONTENT (Product Details) */}
          <View style={styles.detailsContainer}>
            {/* Main Product Title (Shown only on main card) */}
            {!isVariant && (
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{product.product_name}</Text>
              </View>
            )}

            {/* Main Product Details (3-column layout) */}
            {!isVariant && (
              <View style={styles.detailsGridMain}>
                <DetailItem label="Open Stock" value={product.open_stock} />
                <DetailItem label="Rem. Stock" value={product.rem_stock} />
                <DetailItem
                  label="Threshold value"
                  value={product.theshold_Value}
                />
                <DetailItem label="On the way" value={product.on_the_way} />
                <DetailItem
                  label="SP"
                  value={productSP ? `₹${productSP}` : null}
                />
                <DetailItem
                  label="Weight"
                  value={product.weight ? `${product.weight}gm` : null}
                />
              </View>
            )}

            {/* FIX 2: Variant Details (Specific 2-column, 3-row layout) */}
            {isVariant && (
              <View style={styles.detailsGridVariant}>
                {/* Column 1: Color, Quantity, Deals Label */}
                <View style={styles.variantColumn}>
                  {product.variant_color && (
                    <VariantRow
                      label="Color:"
                      value={product.variant_color}
                      color={PRIMARY_COLOR}
                    />
                  )}
                  {product.variant_quantity && (
                    <VariantRow
                      label="Quantity:"
                      value={product.variant_quantity}
                    />
                  )}
                  {/* Deals label is explicitly needed here for alignment */}
                  {/* <VariantRow label="Deals:" value={''} /> */}

                  {product.variant_quantity && (
                    <VariantRow
                      label="Deals:"
                      dealTag={
                        productDeals ? (
                          <View style={styles.dealsTag}>
                            <Text style={styles.dealsText}>{productDeals}</Text>
                          </View>
                        ) : null
                      }
                    />
                  )}
                </View>

                {/* Column 2: Size, Price, Deals Tag */}
                <View style={styles.variantColumn}>
                  {product.variant_size && (
                    <VariantRow label="Size:" value={product.variant_size} />
                  )}

                  {/* Price with Deals Tag */}
                  {productSP && <VariantRow label="Price:" value={productSP} />}

                  {/* Empty row to maintain vertical alignment with the "Deals:" label */}
                  <VariantRow label={''} value={''} />
                </View>
              </View>
            )}
          </View>

          {/* Main Product Image (Always on the right of text block) */}
          {!isVariant && (
            <Image
              source={imageSource}
              style={styles.productImage}
              resizeMode="cover"
            />
          )}
        </View>

        {/* 🔹 Actions (same for both) */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => onEdit?.(product)}>
            <Image
              source={require('../../assets/images/ic_edit_button.png')}
              style={{width: 20, height: 20, marginRight: 6}}
            />
            <Text style={styles.editButtonText}>Edit Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => onDelete(product)}>
            <Image
              source={require('../../assets/images/ic_delete_icon.png')}
              style={{width: 20, height: 20, marginRight: 6}}
            />
            <Text style={styles.deleteButtonText}>Delete Item</Text>
          </TouchableOpacity>
        </View>

        {/* 🔸 Variant toggle (show only on the main product card) */}
        {!isVariant && varientList?.length > 0 && (
          <TouchableOpacity
            onPress={() => setShowVariants(prev => !prev)}
            style={[
              styles.viewMoreButton,
              showVariants && styles.viewMoreButtonOpen,
            ]}
            activeOpacity={0.7}>
            <Text style={styles.viewMoreText}>
              {showVariants ? 'Product Variants' : 'Product Variants'}
            </Text>
            <Feather
              name={showVariants ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#000"
              style={{marginLeft: 6}}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View>
      {/* 🔹 Main Product */}
      {item && renderProductCard(item, false)}

      {/* 🔹 Variants */}
      {showVariants && varientList?.length > 0 && (
        <FlatList
          data={varientList}
          keyExtractor={(v, i) => v.variant_image || `${i}`}
          renderItem={({item}) => renderProductCard(item, true)}
          contentContainerStyle={{paddingTop: 0}}
        />
      )}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  variantCard: {
    paddingBottom: 16, // Variants do not have the toggle button below actions
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 10,
  },
  // FIX: Style for the variant top section to align image left and text block right
  variantTopSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  detailsContainer: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  // FIX: Variant image is placed outside the details grid, aligning it left
  variantImageLeft: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginRight: 12, // Space between image and text
    alignSelf: 'flex-start',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK_TEXT,
    flex: 1,
    paddingRight: 10,
  },

  // --- Detail Grid for Main Product (3-column wrap) ---
  detailsGridMain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItemContainer: {
    width: screenWidth > 400 ? '33.333%' : '50%',
    marginBottom: 8,
    paddingRight: 8,
  },
  detailItemLabel: {
    fontSize: 12,
    color: GRAY_TEXT,
    marginBottom: 2,
  },
  detailItemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_TEXT,
  },

  // --- Detail Grid for Variant Product (2-column strict layout) ---
  detailsGridVariant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  variantColumn: {
    width: '48%', // Ensures two columns fit with spacing
  },
  variantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // Vertical spacing between rows
    minHeight: 20, // Ensure empty rows maintain height for alignment
  },
  variantValueText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: DARK_TEXT, // Default to dark text for all values
    marginLeft: 4,
    // Override color for specific fields like 'Color'
  },

  // Deals Tag Styling
  dealsTag: {
    backgroundColor: DEAL_BG, // Light orange background
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 6,
    alignSelf: 'center',
  },
  dealsText: {
    fontSize: 12,
    fontWeight: '900',
    color: PRIMARY_COLOR,
  },

  // --- Action Buttons ---
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 4,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    height: 48,
    marginHorizontal: 4,
  },
  editButton: {
    backgroundColor: PRIMARY_COLOR,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: CARD_BG,
  },
  deleteButton: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },

  // --- Variant Toggle Button ---
  viewMoreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  viewMoreButtonOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  viewMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   Dimensions,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';

// // 🔸 Static colors
// const PRIMARY_COLOR = '#f97316'; // Orange accent
// const SECONDARY_COLOR = '#f3f4f6'; // Light gray background
// const CARD_BG = '#ffffff'; // White card background
// const DARK_TEXT = '#1f2937';
// const GRAY_TEXT = '#000000';

// const {width} = Dimensions.get('window');

// const ProductDetails = ({item, varientList}) => {
//   const [showVariants, setShowVariants] = useState(false);

//   // 🔸 Render a single card (used for both main and variant)
//   const renderProductCard = (product, isVariant = false) => (
//     <View
//       key={product.id}
//       style={[
//         styles.card,
//         isVariant && {backgroundColor: '#f9fafb', marginTop: 8},
//       ]}>
//       <View style={styles.topSection}>
//         {/* LEFT CONTENT */}
//         <View style={{flex: 1, paddingRight: 12}}>
//           <View style={styles.cardHeader}>
//             <Text style={styles.cardTitle}>{product.name}</Text>

//             {/* <View
//               style={{
//                 width: 24,
//                 height: 24,
//                 borderRadius: 12,
//                 backgroundColor: `#${product.color}`,
//                 borderWidth: 1,
//                 borderColor: '#e5e7eb',
//               }}
//             /> */}
//           </View>

//           <View style={styles.detailsGrid}>
//             <View style={styles.detailItemContainer}>
//               <Text style={styles.detailItemLabel}>Open Stock</Text>
//               <Text style={styles.detailItemValue}>{product.openStock}</Text>
//             </View>
//             <View style={styles.detailItemContainer}>
//               <Text style={styles.detailItemLabel}>Remaining Stock</Text>
//               <Text style={styles.detailItemValue}>
//                 {product.remainingStock}
//               </Text>
//             </View>
//             <View style={styles.detailItemContainer}>
//               <Text style={styles.detailItemLabel}>Threshold</Text>
//               <Text style={styles.detailItemValue}>{product.threshold}</Text>
//             </View>
//             <View style={styles.detailItemContainer}>
//               <Text style={styles.detailItemLabel}>On The Way</Text>
//               <Text style={styles.detailItemValue}>{product.onTheWay}</Text>
//             </View>
//             <View style={styles.detailItemContainer}>
//               <Text style={styles.detailItemLabel}>SP</Text>
//               <Text style={styles.detailItemValue}>₹{product.sp}</Text>
//             </View>
//             <View style={styles.detailItemContainer}>
//               <Text style={styles.detailItemLabel}>Weight</Text>
//               <Text style={styles.detailItemValue}>{product.weight}</Text>
//             </View>
//           </View>
//         </View>

//         {/* RIGHT IMAGE */}
//         <Image
//           source={require('../../assets/images/ic_maggi.png')}
//           style={styles.productImage}
//           resizeMode="contain"
//         />
//       </View>

//       {/* 🔹 Actions */}
//       <View style={styles.actionButtonsContainer}>
//         <TouchableOpacity style={[styles.button, styles.editButton]}>
//           <Image
//             source={require('../../assets/images/ic_edit_button.png')}
//             style={{width: 20, height: 20, marginRight: 6}}
//           />
//           <Text style={styles.editButtonText}>Edit Item</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={[styles.button, styles.deleteButton]}>
//           <Image
//             source={require('../../assets/images/ic_delete_icon.png')}
//             style={{width: 20, height: 20, marginRight: 6}}
//           />
//           <Text style={styles.deleteButtonText}>Delete Item</Text>
//         </TouchableOpacity>
//       </View>

//       {/* 🔸 Variant toggle */}
//       {!isVariant && (
//         <TouchableOpacity
//           onPress={() => setShowVariants(prev => !prev)}
//           style={styles.viewMoreButton}>
//           <Text style={styles.viewMoreText}>
//             {showVariants ? 'Hide Product Variants' : 'Product Variants'}
//           </Text>
//           <Feather
//             name={showVariants ? 'chevron-up' : 'chevron-down'}
//             size={18}
//             color="#000"
//             style={{marginLeft: 6}}
//           />
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   return (
//     <View>
//       {/* 🔹 Main Product */}
//       {renderProductCard(item)}

//       {/* 🔹 Variants */}
//       {showVariants && varientList?.length > 0 && (
//         <FlatList
//           data={varientList}
//           keyExtractor={(v, i) => `${v.id}-${i}`}
//           renderItem={({item}) => renderProductCard(item, true)}
//           contentContainerStyle={{paddingTop: 8}}
//         />
//       )}
//     </View>
//   );
// };

// export default ProductDetails;

// const {width: screenWidth} = Dimensions.get('window');

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: CARD_BG,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   topSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'stretch',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 12,
//   },
//   productImage: {
//     width: 100,
//     height: '100%',
//     borderRadius: 8,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: DARK_TEXT,
//     flex: 1,
//     paddingRight: 10,
//   },
//   detailsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 16,
//     paddingBottom: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f3f4f6',
//   },
//   detailItemContainer: {
//     width: screenWidth > 400 ? '33.333%' : '50%',
//     marginBottom: 8,
//     paddingRight: 8,
//   },
//   detailItemLabel: {
//     fontSize: 12,
//     color: GRAY_TEXT,
//     marginBottom: 2,
//   },
//   detailItemValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: DARK_TEXT,
//   },
//   viewMoreButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 10,
//     backgroundColor: SECONDARY_COLOR,
//     borderRadius: 8,
//     marginTop: 8,
//     flexDirection: 'row',
//   },
//   viewMoreText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
//   actionButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     marginTop: 4,
//   },
//   button: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 8,
//     paddingVertical: 12,
//     height: 48,
//     marginHorizontal: 4,
//   },
//   editButton: {
//     backgroundColor: PRIMARY_COLOR,
//     shadowColor: PRIMARY_COLOR,
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   editButtonText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: CARD_BG,
//   },
//   deleteButton: {
//     backgroundColor: SECONDARY_COLOR,
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//   },
//   deleteButtonText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#000000',
//   },
// });

//
