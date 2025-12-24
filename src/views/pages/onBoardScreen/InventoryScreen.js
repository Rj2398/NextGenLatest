import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import PurchaseNewOrderCard from '../../components/PurchaseNewOrderCard';
import ProductDetails from '../../components/ProductDetails';
import {
  extractFieldLabelMap,
  mapApiResponseToFormData,
} from '../../../utils/modal/customCodeModal';
import useDashboard from '../../../hooks/useDashboard';
import Loader from '../../components/Loader';
import {useNavigation} from '@react-navigation/native';
import {fetchChildCategories} from '../../../utils/apiFunction';
import Header from '../../components/Header';

const {width} = Dimensions.get('window');

//
const getPurchaseHistory = {
  schema: {
    pages: [
      {
        sections: [
          {
            fields: [
              {
                fieldName: 'product_name',
                localization: {localizedText: 'Product Name'},
              },
              {
                fieldName: 'product_image',
                localization: {localizedText: 'Product Image'},
              },
              {
                fieldName: 'order_date',
                localization: {localizedText: 'Ordered On'},
              },
              {
                fieldName: 'quantity',
                localization: {localizedText: 'Quantity'},
              },
              {
                fieldName: 'payment_method',
                localization: {localizedText: 'Paid Via'},
              },
              {fieldName: 'weight', localization: {localizedText: 'Weight'}},
              {
                fieldName: 'weight_unit',
                localization: {localizedText: 'Weight Unit'},
              },
              {
                fieldName: 'total_amount',
                localization: {localizedText: 'Amount'},
              },
              {
                fieldName: 'currency_code',
                localization: {localizedText: 'Currency'},
              },
            ],
          },
        ],
      },
    ],
  },
  data: {
    purchase_history: [
      {
        product_name: 'Maggie Large',
        product_image: 'https://example.com/images/maggie-large.jpg',
        order_date: '2025-03-25T00:00:00',
        quantity: 12,
        payment_method: 'Card *********567',
        weight: 850,
        weight_unit: 'Gm',
        total_amount: 320,
        currency_code: 'INR',
      },
      {
        product_name: 'Maggie Large',
        product_image: 'https://example.com/images/maggie-large.jpg',
        order_date: '2025-02-15T00:00:00',
        quantity: 8,
        payment_method: 'Card *********123',
        weight: 850,
        weight_unit: 'Gm',
        total_amount: 480,
        currency_code: 'INR',
      },
    ],
  },
};
//

const getOverViewList = {
  productBasicFields: {
    id: 1,
    product_name: 'Maggi Masala Noodles',
    product_image: 'https://picsum.photos/200',
    open_stock: 120,
    rem_stock: 85,
    theshold_Value: 20,
    on_the_way: 50,
    sp: 12,
    weight: 70,
  },
  productVariants: [
    {
      id: 101,
      variant_image: 'https://picsum.photos/201',
      variant_color: 'Red',
      variant_size: 'Large',
      variant_quantity: 10,
      variant_price: 15,
      variant_deals: '10% Off',
    },
    {
      id: 102,
      variant_image: 'https://picsum.photos/202',
      variant_color: 'Blue',
      variant_size: 'Medium',
      variant_quantity: 8,
      variant_price: 14,
      variant_deals: '5% Off',
    },
  ],
};

// --- Theme Constants
const PRIMARY_COLOR = '#f97316';
const SECONDARY_COLOR = '#f3f4f6';
const CARD_BG = '#ffffff';
const DARK_TEXT = '#1f2937';
const GRAY_TEXT = '#000000';

const InventoryScreen = ({route}) => {
  const navigation = useNavigation();
  const {id} = route?.params;
  const {
    // getPurchaseHistory,
    isLoadingPurchaseHistory,
    // getOverViewList,
    isLoadingOverViewList,
  } = useDashboard(id);

  // console.log(getOverViewList?.productBasicFields, 'overView loading****');

  const [productDetails, setProductDetails] = useState(null);

  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 4;

  // --- Filter and paginate ---
  const purchaseHistory = getPurchaseHistory?.data?.purchase_history || [];
  const filteredPurchaseOrders = purchaseHistory.filter(item =>
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredPurchaseOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPurchaseItems = filteredPurchaseOrders.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const fetchData = async item => {
    console.log(item);
    const productId = item;
    if (!productId) return;

    // A. START LOADING: Set the ID of the item being loaded
    setLoading(true);

    try {
      const response = await fetchChildCategories(
        '/api/v1/Products',
        productId,
        'PageName=Ecommerce_Product_Basic&ProductId',
      );
      console.log(JSON.stringify(response?.data, null, 2), 'overview page');
      setProductDetails(response.data);
      const normalizedFormData = mapApiResponseToFormData(response.data);

      navigation.navigate('AddNewProduct', {
        item: {
          ...normalizedFormData,
          ProductId: productId, // merged here
        },
        isEdit: true,
      });
      // navigation.navigate('InventoryScreen', {item: response?.data?.items});
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    } finally {
      // C. STOP LOADING: Reset the loading state after API call completes (success or failure)
      setLoading(false);
    }
  };
  const handleEdit = item => {
    navigation.navigate('AddNewProduct');
    if (id) {
      fetchData(id);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <Header title={'Inventory'} onBackPress={true} />

        {/* Search */}
        {/* <View style={styles.searchFilterContainer}>
          <View style={styles.searchBar}>
            <Image
              source={require('../../../assets/images/ic_search_icon.png')}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search order"
              placeholderTextColor={GRAY_TEXT}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/images/ic_filter_icon.png')}
              style={{height: 48, width: 48, marginInlineStart: 8}}
            />
          </TouchableOpacity>
        </View> */}

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <Loader visible={loading} />
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Overview' ? styles.activeTab : styles.passiveTab,
            ]}
            onPress={() => setActiveTab('Overview')}>
            <Text
              style={
                activeTab === 'Overview'
                  ? styles.activeTabText
                  : styles.passiveTabText
              }>
              Overview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Purchase' ? styles.activeTab : styles.passiveTab,
            ]}
            onPress={() => setActiveTab('Purchase')}>
            <Text
              style={
                activeTab === 'Purchase'
                  ? styles.activeTabText
                  : styles.passiveTabText
              }>
              Purchase
            </Text>
          </TouchableOpacity>
        </View>

        {/* Overview Tab */}
        {activeTab === 'Overview' ? (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Loader visible={isLoadingOverViewList} />
            <ProductDetails
              item={getOverViewList?.productBasicFields}
              varientList={getOverViewList?.productVariants}
              onEdit={v => handleEdit(v)}
              onDelete={() => {}}
            />
          </ScrollView>
        ) : (
          // ✅ Purchase Section
          <View key="purchase-content" style={styles.purchaseContentContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Loader visible={isLoadingPurchaseHistory} />
              {currentPurchaseItems.length > 0 ? (
                currentPurchaseItems.map((item, index) => (
                  <PurchaseNewOrderCard
                    key={index}
                    item={item}
                    // fieldLabelMap={fieldLabelMap}
                  />
                ))
              ) : (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>
                    No purchase orders match your search.
                  </Text>
                </View>
              )}
              <View style={{height: 20}} />
            </ScrollView>

            {/* Pagination */}
            {totalPages > 1 && (
              <View style={styles.paginationContainer}>
                <TouchableOpacity
                  style={styles.paginationButton}
                  onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}>
                  <Text style={styles.paginationButtonText}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.paginationText}>
                  Page {currentPage} of {totalPages}
                </Text>
                <TouchableOpacity
                  style={styles.paginationButton}
                  onPress={() =>
                    setCurrentPage(prev => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}>
                  <Text style={styles.paginationButtonText}>{'>'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: CARD_BG},
  container: {flex: 1, backgroundColor: SECONDARY_COLOR},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: CARD_BG,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    position: 'relative',
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK_TEXT,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: CARD_BG,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: DARK_TEXT,
    marginLeft: 10,
    paddingVertical: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: CARD_BG,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
    marginTop: 20,
  },
  activeTab: {backgroundColor: PRIMARY_COLOR, elevation: 5},
  activeTabText: {fontSize: 16, fontWeight: '700', color: CARD_BG},
  passiveTab: {
    backgroundColor: SECONDARY_COLOR,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginLeft: 8,
  },
  passiveTabText: {fontSize: 16, fontWeight: '600', color: DARK_TEXT},
  contentContainer: {paddingHorizontal: 16, paddingTop: 8},
  noResults: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    marginTop: 16,
  },
  noResultsText: {fontSize: 18, color: GRAY_TEXT},
  purchaseContentContainer: {flex: 1},
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: CARD_BG,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  paginationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  paginationButtonText: {fontSize: 18, color: DARK_TEXT, fontWeight: 'bold'},
  paginationText: {fontSize: 16, color: DARK_TEXT, fontWeight: '600'},
});

export default InventoryScreen;

// import {SafeAreaView} from 'react-native-safe-area-context';
// import React, {useState, useMemo} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Image,
//   Dimensions,
// } from 'react-native';
// import PurchaseNewOrderCard from '../../components/PurchaseNewOrderCard';
// import ProductDetails from '../../components/ProductDetails';
// import {extractFieldLabelMap} from '../../../utils/modal/customCodeModal';

// const {width} = Dimensions.get('window');

// // --- Theme Constants
// const PRIMARY_COLOR = '#f97316';
// const SECONDARY_COLOR = '#f3f4f6';
// const CARD_BG = '#ffffff';
// const DARK_TEXT = '#1f2937';
// const GRAY_TEXT = '#000000';

// const InventoryScreen = () => {
//   const [activeTab, setActiveTab] = useState('Overview');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;

//   // --- API mock data ---
//   const purchaseData = {
//     schema: {
//       pages: [
//         {
//           sections: [
//             {
//               fields: [
//                 {
//                   fieldName: 'product_name',
//                   localization: {localizedText: 'Product Name'},
//                 },
//                 {
//                   fieldName: 'product_image',
//                   localization: {localizedText: 'Product Image'},
//                 },
//                 {
//                   fieldName: 'order_date',
//                   localization: {localizedText: 'Ordered On'},
//                 },
//                 {
//                   fieldName: 'quantity',
//                   localization: {localizedText: 'Quantity'},
//                 },
//                 {
//                   fieldName: 'payment_method',
//                   localization: {localizedText: 'Paid Via'},
//                 },
//                 {fieldName: 'weight', localization: {localizedText: 'Weight'}},
//                 {
//                   fieldName: 'weight_unit',
//                   localization: {localizedText: 'Weight Unit'},
//                 },
//                 {
//                   fieldName: 'total_amount',
//                   localization: {localizedText: 'Amount'},
//                 },
//                 {
//                   fieldName: 'currency_code',
//                   localization: {localizedText: 'Currency'},
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     data: {
//       purchase_history: [
//         {
//           product_name: 'Maggie Large',
//           product_image: 'https://example.com/images/maggie-large.jpg',
//           order_date: '2025-03-25T00:00:00',
//           quantity: 12,
//           payment_method: 'Card *********567',
//           weight: 850,
//           weight_unit: 'Gm',
//           total_amount: 720,
//           currency_code: 'INR',
//         },
//         {
//           product_name: 'Maggie Large',
//           product_image: 'https://example.com/images/maggie-large.jpg',
//           order_date: '2025-02-15T00:00:00',
//           quantity: 8,
//           payment_method: 'Card *********123',
//           weight: 850,
//           weight_unit: 'Gm',
//           total_amount: 480,
//           currency_code: 'INR',
//         },
//       ],
//     },
//   };

//   // ✅ Global function builds fieldLabelMap
//   const fieldLabelMap = useMemo(() => {
//     return extractFieldLabelMap(purchaseData?.schema);
//   }, [purchaseData]);

//   console.log(fieldLabelMap, 'TEST TESTE STEST');
//   // --- Filter and paginate ---
//   const purchaseHistory = purchaseData?.data?.purchase_history || [];
//   const filteredPurchaseOrders = purchaseHistory.filter(item =>
//     item.product_name.toLowerCase().includes(searchTerm.toLowerCase()),
//   );
//   const totalPages = Math.ceil(filteredPurchaseOrders.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentPurchaseItems = filteredPurchaseOrders.slice(
//     startIndex,
//     startIndex + itemsPerPage,
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Image source={require('../../../assets/images/nextgenlogo.png')} />
//           <Text style={styles.headerTitle}>Inventory</Text>
//           <Image
//             source={require('../../../assets/images/slider_icon.png')}
//             style={{width: 25, height: 18}}
//           />
//         </View>

//         {/* Search */}
//         <View style={styles.searchFilterContainer}>
//           {/* <View style={styles.searchBar}>
//             <Image
//               source={require('../../../assets/images/ic_search_icon.png')}
//             />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search order"
//               placeholderTextColor={GRAY_TEXT}
//               value={searchTerm}
//               onChangeText={setSearchTerm}
//             />
//           </View> */}
//           {/* <TouchableOpacity>
//             <Image
//               source={require('../../../assets/images/ic_filter_icon.png')}
//               style={{height: 48, width: 48, marginInlineStart: 8}}
//             />
//           </TouchableOpacity> */}
//         </View>

//         {/* Tabs */}
//         <View style={styles.tabContainer}>
//           <TouchableOpacity
//             style={[
//               styles.tabButton,
//               activeTab === 'Overview' ? styles.activeTab : styles.passiveTab,
//             ]}
//             onPress={() => setActiveTab('Overview')}>
//             <Text
//               style={
//                 activeTab === 'Overview'
//                   ? styles.activeTabText
//                   : styles.passiveTabText
//               }>
//               Overview
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.tabButton,
//               activeTab === 'Purchase' ? styles.activeTab : styles.passiveTab,
//             ]}
//             onPress={() => setActiveTab('Purchase')}>
//             <Text
//               style={
//                 activeTab === 'Purchase'
//                   ? styles.activeTabText
//                   : styles.passiveTabText
//               }>
//               Purchase
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Overview Tab */}
//         {activeTab === 'Overview' ? (
//           <ScrollView contentContainerStyle={styles.contentContainer}>
//             <ProductDetails
//               item={{product_name: 'meggie masala'}}
//               varientList={{}}
//               onEdit={v => handleEdit(v)}
//               onDelete={() => {}}
//             />
//           </ScrollView>
//         ) : (
//           // ✅ Purchase Section
//           <View key="purchase-content" style={styles.purchaseContentContainer}>
//             <ScrollView contentContainerStyle={styles.contentContainer}>
//               {currentPurchaseItems.length > 0 ? (
//                 currentPurchaseItems.map((item, index) => (
//                   <PurchaseNewOrderCard
//                     key={index}
//                     item={item}
//                     fieldLabelMap={fieldLabelMap}
//                   />
//                 ))
//               ) : (
//                 <View style={styles.noResults}>
//                   <Text style={styles.noResultsText}>
//                     No purchase orders match your search.
//                   </Text>
//                 </View>
//               )}
//               <View style={{height: 20}} />
//             </ScrollView>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <View style={styles.paginationContainer}>
//                 <TouchableOpacity
//                   style={styles.paginationButton}
//                   onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                   disabled={currentPage === 1}>
//                   <Text style={styles.paginationButtonText}>{'<'}</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.paginationText}>
//                   Page {currentPage} of {totalPages}
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.paginationButton}
//                   onPress={() =>
//                     setCurrentPage(prev => Math.min(totalPages, prev + 1))
//                   }
//                   disabled={currentPage === totalPages}>
//                   <Text style={styles.paginationButtonText}>{'>'}</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {flex: 1, backgroundColor: CARD_BG},
//   container: {flex: 1, backgroundColor: SECONDARY_COLOR},
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: CARD_BG,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb',
//     position: 'relative',
//   },
//   headerTitle: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: DARK_TEXT,
//   },
//   searchFilterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: CARD_BG,
//   },
//   searchBar: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: SECONDARY_COLOR,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 48,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: DARK_TEXT,
//     marginLeft: 10,
//     paddingVertical: 0,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: CARD_BG,
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//   },
//   tabButton: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   activeTab: {backgroundColor: PRIMARY_COLOR, elevation: 5},
//   activeTabText: {fontSize: 16, fontWeight: '700', color: CARD_BG},
//   passiveTab: {
//     backgroundColor: SECONDARY_COLOR,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     marginLeft: 8,
//   },
//   passiveTabText: {fontSize: 16, fontWeight: '600', color: DARK_TEXT},
//   contentContainer: {paddingHorizontal: 16, paddingTop: 8},
//   noResults: {
//     backgroundColor: CARD_BG,
//     borderRadius: 12,
//     padding: 30,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   noResultsText: {fontSize: 18, color: GRAY_TEXT},
//   purchaseContentContainer: {flex: 1},
//   paginationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 16,
//     backgroundColor: CARD_BG,
//     borderTopWidth: 1,
//     borderTopColor: '#e5e7eb',
//   },
//   paginationButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: SECONDARY_COLOR,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 8,
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//   },
//   paginationButtonText: {fontSize: 18, color: DARK_TEXT, fontWeight: 'bold'},
//   paginationText: {fontSize: 16, color: DARK_TEXT, fontWeight: '600'},
// });

// export default InventoryScreen;
