import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  LogBox,
} from 'react-native';
import React, {useState} from 'react';
import BottomSheetFilter from './BottomSheetFilter';
import DealsDiscountScreen from './DealsDiscountScreen';

const FilterIcon = require('../../../assets/filter_icon.png');
const ActiveFilterIcon = require('../../../assets/filter_fill.png');
import {useNavigation} from '@react-navigation/native';

const Dashboard = () => {
  // 1. STATE: Create state to control Modal visibility
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  // Functions to handle the modal lifecycle
  const openFilters = () => setIsFilterVisible(true);
  const closeFilters = () => setIsFilterVisible(false);
  const navigation = useNavigation();
  const handleApply = filters => {
    console.log('Filters Applied:', filters);
    closeFilters();
    // Logic to refetch data based on new filters goes here
  };
  const handlePress = () => {
    // Navigate to the 'DealsDiscountScreen'.
    // NOTE: The screen name 'DealsDiscount' must match the name
    // defined in your Stack Navigator setup (Step 3).
    console.log('--- Component Mounted ---');
    navigation.navigate('DealsDiscountScreen');
  };
  const handlePressBulk = () => {
    // Navigate to the 'DealsDiscountScreen'.
    // NOTE: The screen name 'DealsDiscount' must match the name
    // defined in your Stack Navigator setup (Step 3).
    console.log('--- Component Mounted ---');
    navigation.navigate('BulkUpload');
  };
  const handlePressAddProduct = () => {
    // Navigate to the 'DealsDiscountScreen'.
    // NOTE: The screen name 'DealsDiscount' must match the name
    // defined in your Stack Navigator setup (Step 3).
    console.log('--- Component Mounted ---');
    navigation.navigate('AddNewProduct');
  };
  return (
    // <View style={styles.container}>
    //   <Text>Dashboard</Text>
    // </View>
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Image
            source={require('../../../assets/search_icon.png')}
            style={styles.searchImage}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Search Product or orders"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity onPress={openFilters}>
          <Image
            source={isFilterVisible ? ActiveFilterIcon : FilterIcon}
            style={styles.filterImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <BottomSheetFilter isVisible={isFilterVisible} onClose={closeFilters} />

      <ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Overall Inventory</Text>

        {/* Cards Grid */}
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Categories</Text>
            <Text style={styles.cardValue}>40</Text>
            <Text style={styles.cardSub}>Last 7 Days</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Products</Text>
            <Text style={styles.cardValue}>40</Text>
            <Text style={styles.cardSub}>Last 7 Days</Text>
          </View>
        </View>

        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Revenue</Text>
            <Text style={styles.cardValue}>₹25,000</Text>
            <Text style={styles.cardSub}>Last 7 Days</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Top Selling</Text>
            <Text style={styles.cardValue}>5</Text>
            <Text style={styles.cardSub}>Cost: ₹5500</Text>
          </View>
        </View>

        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.card2Title}>Low Stock</Text>
            <Text style={styles.cardValue}>12</Text>
            <Text style={styles.cardSub}>20 Units Ordered</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.card2Title}>Out of Stock</Text>
            <Text style={styles.cardValue}>0</Text>
            <Text style={styles.cardSub}>9 Units Left</Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.orangeBtn}
          onPress={handlePressAddProduct}>
          <Image
            source={require('../../../assets/plus_icon.png')}
            style={styles.uploadImage}
            resizeMode="contain"
          />
          <Text style={[styles.btnText, {marginStart: 5}]}>
            Add New Products
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.orangeBtnLight}>
          <Text style={styles.btnText}>View all Products</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadBtn} onPress={handlePressBulk}>
          <Image
            source={require('../../../assets/upload_icon.png')}
            style={styles.uploadImage}
            resizeMode="contain"
          />
          <Text style={[styles.btnText, {marginLeft: 6}]}>Bulk Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dealCard} onPress={handlePress}>
          <Image
            source={require('../../../assets/cuppons_icon.png')}
            style={styles.discountImage}
            resizeMode="contain"
          />
          <Text style={styles.dealText}>Deals & Discount</Text>
          <Image
            source={require('../../../assets/arrow_icon.png')}
            style={styles.arrowImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // 1. Must take up the entire screen space
//     justifyContent: 'center', // 2. Centers children vertically
//     alignItems: 'center', // 3. Centers children horizontally
//     backgroundColor: '#fff', // Optional: Set a background color
//   },
// });
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 16},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  logoText: {fontWeight: '700', fontSize: 18, color: '#000'},
  logoImage: {width: 100, height: 50, marginBottom: 5},
  filterImage: {width: 50, height: 50, marginStart: 5, marginTop: 5},
  searchImage: {width: 25, height: 25, marginStart: 5},
  draImage: {width: 25, height: 50, marginBottom: 5},
  uploadImage: {width: 15, height: 15},
  discountImage: {width: 15, height: 15},
  arrowImage: {width: 15, height: 15, marginStart: 25, marginTop: 3},

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderRadius: 8,
    borderColor: '#D7D7D7',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#000',
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#000',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff7f0',
    borderColor: '#F89941',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  cardTitle: {
    fontSize: 13,
    color: '#FF7A00',
    fontFamily: 'Roboto',
    fontWeight: 500,
  },
  card2Title: {
    fontSize: 13,
    color: '#D24648',
    fontFamily: 'Roboto',
    fontWeight: 500,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginVertical: 4,
  },
  cardSub: {
    fontSize: 10,
    color: '#5F6368',
    fontFamily: 'Roboto',
    fontWeight: 500,
  },

  orangeBtn: {
    backgroundColor: '#FF8719',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  orangeBtnLight: {
    backgroundColor: '#FF8719',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  uploadBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFAF66',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: {color: '#fff', fontWeight: '600', fontSize: 14},

  dealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFF',
    padding: 14,
    borderRadius: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  dealText: {fontWeight: '600', color: '#000', marginStart: 10},
});
