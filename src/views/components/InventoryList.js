import {useNavigation} from '@react-navigation/native';
import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
// import useProductModal from '../../../hooks/useProduct'; // 🗑️ External hook not accessible

// --- 1. 🚀 Dynamic Product Data (Added isActive field for filtering demo) ---
const rawProductData = [
  {
    id: '1',
    producttitle: 'iPhone 15 Pro Max 256GB Titanium Natural',
    description:
      'The most advanced iPhone with titanium design, A17 Pro chip, and professional camera system.',
    categoryid: '1',
    brand: 'Apple',
    isActive: true, // 🚀 Added isActive: true
    subcategoryid: '1',
    isreturnable: true,
    returnwindowdays: 14,
    hasvariants: true,
    variationtheme: 'Color',
    gender: 'Unisex',
    variants: [
      {
        sku: 'IPHONE15PM-256-TN',
        color: 'Titanium Natural',
        variantPrice: 4499.0,
        variantQuantity: 25,
        weightUnit: 'g',
        weight: 221,
      },
    ],
  },
  {
    id: '2',
    producttitle: 'Samsung Galaxy S24 Ultra 512GB',
    description: 'Flagship Android phone with S Pen and 200MP camera.',
    categoryid: '1',
    brand: 'Samsung',
    isActive: false, // 🚀 Added isActive: false (This item will be filtered out)
    subcategoryid: '1',
    isreturnable: true,
    returnwindowdays: 14,
    hasvariants: true,
    variationtheme: 'Color',
    gender: 'Unisex',
    variants: [
      {
        sku: 'S24U-512-BL',
        color: 'Black',
        variantPrice: 4999.0,
        variantQuantity: 10,
        weightUnit: 'g',
        weight: 232,
      },
    ],
  },
  {
    id: '3',
    producttitle: 'Nike Air Max 90 White Leather Running Shoes',
    description:
      'Classic running shoe with Air Max cushioning and timeless design.',
    categoryid: '2',
    brand: 'Nike',
    isActive: true, // 🚀 Added isActive: true
    subcategoryid: '3',
    variants: [
      {
        sku: 'NIKE-AM90-WHITE-40',
        size: '40',
        variantPrice: 439.0,
        variantQuantity: 8,
        weightUnit: 'g',
        weight: 350,
      },
    ],
  },
];

const InventoryListScreen = () => {
  const navigation = useNavigation();

  // 🗑️ COMMENTED OUT: External hook not accessible and not necessary for the data display requirement.
  // const {getCategory, isLoadingProducts} = useProductModal();

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());

  // 🚀 2. Use useMemo to filter raw data and then transform it
  const inventoryItems = useMemo(() => {
    // 🚀 STEP 1: Filter the raw data to include ONLY products where isActive is true
    const activeProducts = rawProductData.filter(
      product => product.isActive === true,
    );

    // 🚀 STEP 2: Map the filtered data to the InventoryCard format
    return activeProducts.map(product => {
      const totalQuantity = product.variants.reduce(
        (sum, variant) => sum + variant.variantQuantity,
        0,
      );
      const firstVariant = product.variants[0] || {};

      return {
        id: product.id,
        name: product.producttitle,
        description: product.description,
        // Stock metrics mapped from product data
        openStock: totalQuantity,
        remainingStock: totalQuantity,
        thresholdValue: 10, // Static placeholder
        onTheWay: 0, // Static placeholder
        sellingPrice: firstVariant.variantPrice || 0,
        weight: `${firstVariant.weight || ''}${firstVariant.weightUnit || ''}`,
        // NOTE: You need a dynamic image URL in your JSON to make this dynamic
        imageUrl: 'https://placehold.co/60x60/DBEAFE/FFFFFF/png',
      };
    });
  }, []);

  // --- Utility functions (Unchanged) ---
  const toggleExpanded = itemId => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleEdit = itemId => {
    // Alert.alert('Edit Item', `Edit item ${itemId}`);
    navigation.navigate('AddNewProduct');
  };

  const handleDelete = (itemId, itemName) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${itemName}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log('Item deleted'),
        },
      ],
    );
  };

  const handleViewDetails = itemData => {
    // Pass the full dynamic data object
    navigation.navigate('InventoryScreen', {item: itemData});

    // navigation.navigate('ItemDetailsScreen', {item: itemData});
  };

  const handleFilter = () => {
    Alert.alert('Filter', 'Filter functionality will be implemented here');
  };

  const handleMenu = () => {
    Alert.alert('Menu', 'Menu functionality will be implemented here');
  };

  const handleSearchImageClick = () => {
    Alert.alert('Searching here', `Search for the text ${searchQuery}`);
  };

  const renderInventoryCard = ({item}) => (
    <InventoryCard
      key={item.id}
      item={item}
      isExpanded={expandedItems.has(item.id)}
      onToggleExpand={() => toggleExpanded(item.id)}
      onEdit={() => handleEdit(item.id)}
      onDelete={() => handleDelete(item.id, item.name)}
      onViewDetails={() => handleViewDetails(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={{flex: 1}}>
        {/* FlatList uses the filtered inventoryItems */}
        <FlatList
          data={inventoryItems}
          keyExtractor={item => item.id}
          renderItem={renderInventoryCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        />
      </View>
    </SafeAreaView>
  );
};

// --- InventoryCard Component (Unchanged) ---

const InventoryCard = ({
  item,
  isExpanded,
  onToggleExpand,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  return (
    <View style={styles.card}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Image
          style={styles.itemImage}
          resizeMode="contain"
          source={require('../../assets/images/ic_maggi.png')}
        />
      </View>

      {/* Metrics Grid */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Open Stock</Text>
          <Text style={styles.metricValue}>{item.openStock}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Rem. Stock</Text>
          <Text style={styles.metricValue}>{item.remainingStock}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Threshold value</Text>
          <Text style={styles.metricValue}>{item.thresholdValue}</Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>On the way</Text>
          <Text style={styles.metricValue}>{item.onTheWay}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>SP</Text>
          <Text style={styles.metricValue}>AED {item.sellingPrice}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Weight</Text>
          <Text style={styles.metricValue}>{item.weight}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={onEdit}
          activeOpacity={0.8}>
          <Image
            source={require('../../assets/images/ic_edit_button.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
          <Text style={styles.editButtonText}>Edit Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
          activeOpacity={0.8}>
          <Image
            source={require('../../assets/images/ic_delete_icon.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
          <Text style={styles.deleteButtonText}>Delete Item</Text>
        </TouchableOpacity>
      </View>

      {/* View More Details Button */}
      <TouchableOpacity
        style={styles.viewMoreButton}
        onPress={onViewDetails}
        activeOpacity={0.8}>
        <Text style={styles.viewMoreText}>View More Details</Text>
        <Image
          source={require('../../assets/images/ic_drop_down_white.png')}
          style={{width: 12, height: 11}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

// --- STYLES (Unchanged) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  logo: {
    width: 80,
    height: 32,
  },

  menuButton: {
    padding: 8,
  },
  iconText: {
    fontSize: 20,
    color: '#111827',
  },

  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 60,
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  itemImage: {
    width: 60,
    height: 60,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FDB462',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  deleteButtonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  viewMoreButton: {
    backgroundColor: '#FF8C00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  viewMoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default InventoryListScreen;

// import React, {useMemo, useRef, useState} from 'react';
// import {View, FlatList, StyleSheet, Text} from 'react-native';
// import InventoryCard from './InventoryCard'; // ✅ import your card
// import useDashboard from '../../hooks/useDashboard';
// import {useNavigation} from '@react-navigation/native';
// import {
//   extractFieldLabelMap,
//   mapApiResponseToFormData,
// } from '../../utils/modal/customCodeModal';
// import Loader from './Loader';
// import {fetchChildCategories} from '../../utils/apiFunction';

// const InventoryListScreen = ({dataList, loading}) => {
//   const navigation = useNavigation();
//   const [productDetails, setProductDetails] = useState(null);
//   const {getInventoryList, isLoadingInventory} = useDashboard();
//   const [loadingItemId, setLoadingItemId] = useState(null);
//   const fetchData = async item => {
//     const productId = item?.id;
//     if (!productId) return;

//     // A. START LOADING: Set the ID of the item being loaded
//     setLoadingItemId(productId);

//     try {
//       const response = await fetchChildCategories(
//         '/api/v1/Products',
//         productId,
//         'PageName=Ecommerce_Product_Basic&ProductId',
//       );
//       console.log(JSON.stringify(response?.data, null, 2), 'product details');
//       setProductDetails(response.data);
//       const normalizedFormData = mapApiResponseToFormData(response.data);

//       navigation.navigate('AddNewProduct', {
//         item: {
//           ...normalizedFormData,
//           ProductId: productId, // merged here
//         },
//         isEdit: true,
//       });
//       // navigation.navigate('InventoryScreen', {item: response?.data?.items});
//     } catch (error) {
//       console.error('Failed to fetch product details:', error);
//     } finally {
//       // C. STOP LOADING: Reset the loading state after API call completes (success or failure)
//       setLoadingItemId(null);
//     }
//   };

//   // ✅ Event handlers
//   const handleEdit = item => {
//     if (item.id) {
//       fetchData(item);
//     }
//   };
//   const handleDelete = item => console.log('Delete:', item.product_title);

//   const handleViewDetails = item => {
//     if (item.id) {
//       navigation.navigate('InventoryScreen', {id: item.id});
//     }
//   };

//   const renderItem = ({item}) => (
//     <InventoryCard
//       item={item}
//       onEdit={handleEdit}
//       onDelete={handleDelete}
//       onViewDetails={handleViewDetails}
//       isLoading={item.id === loadingItemId}
//     />
//   );

//   return (
//     <View style={styles.container}>
//       <Loader visible={loading} />
//       {dataList.length > 0 ? (
//         <FlatList
//           data={dataList}
//           keyExtractor={item => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         />
//       ) : (
//         <Text style={styles.noDataText}>No inventory items found.</Text>
//       )}
//     </View>
//   );
// };

// export default InventoryListScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//   },
//   scrollContent: {
//     padding: 16,
//   },
//   noDataText: {
//     textAlign: 'center',
//     marginTop: 50,
//     fontSize: 16,
//     color: '#6B7280',
//   },
// });
