import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Image,
  Modal, // 🟢 Added Modal for the Filter Window
} from 'react-native';
// 🟢 REQUIRED IMPORTS for Icons (Assuming react-native-vector-icons is used)
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {
  ArrowIconSvg,
  FilterIconSvg,
  SettingDot,
  SearchIcon,
  DrawerIcon,
} from '../../../assets/startUpImg';

// --- Centralized Color Palette ---
const Colors = {
  // Primary & CTA Colors
  primaryOrange: '#ff9933',
  lightOrangeBg: '#fbe2c8', // Text Colors
  darkText: '#3D3A3A',
  mediumText: '#555',
  lightText: '#999', // Backgrounds & Borders
  white: '#fff',
  lightBg: '#f5f5f5',
  borderColor: '#ddd', // Status Colors
  activeGreen: '#4CAF50', // Used for Active Tag text/border
  activeBg: '#E8F5E9', // Pale background for Active tag
  inactiveGray: '#eee', // Used for Inactive Tag background
  inputBorder: '#ccc', // Lighter border for inputs in the modal
  uncheck: '#D8D8D8', // Lighter border for inputs in the modal
};

// --- Reusable Component for Deal Card ---
const DealCard = ({title, type, offer, validity, status, isChecked}) => {
  // Determine status colors based on the design
  const statusBg = status === 'Active' ? Colors.activeBg : Colors.inactiveGray; // Pale green/Gray background
  const statusColor =
    status === 'Active' ? Colors.activeGreen : Colors.darkText; // Darker text/Active green text // Define the style for the active checkbox background (Orange if checked, White if not)

  const checkboxBg = isChecked ? Colors.primaryOrange : Colors.white; // State to control the visibility of the action menu

  const [isMenuVisible, setIsMenuVisible] = useState(false); // Action handler (placeholder)

  const handleAction = action => {
    console.log(`Action selected: ${action} for deal: ${title}`); // Close the menu after action
    setIsMenuVisible(false); // Implement actual navigation/API call here
  }; // --- Action Menu Component ---

  const ActionMenu = () => (
    <View style={styles.actionMenu}>
               
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleAction('Edit')}>
                        <Text style={styles.menuText}>Edit</Text>         
      </TouchableOpacity>
                  <View style={styles.menuDivider} />         
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleAction('Assign Product')}>
                        <Text style={styles.menuText}>Assign Product</Text>     
           
      </TouchableOpacity>
                  <View style={styles.menuDivider} />         
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleAction('Delete')}>
                     
        <Text style={[styles.menuText, styles.deleteText]}>Delete</Text>       
         
      </TouchableOpacity>
           
    </View>
  );

  return (
    <View style={[styles.card, {position: 'relative'}]}>
      {' '}
      {/* Added position: 'relative' for the absolute menu */}     
      <View style={styles.cardHeader}>
                  <Text style={styles.dealTitle}>{title}</Text>       
        {/* --- More Options / Settings Icon --- */}             
        <TouchableOpacity onPress={() => setIsMenuVisible(!isMenuVisible)}>
                           
          {/* <Feather name="more-vertical" size={24} color={Colors.mediumText} />  */}
          <SettingDot style={styles.filterImage} resizeMode="contain" />       
             
        </TouchableOpacity>
                        {/* Render Menu only if visible */}             
        {isMenuVisible && <ActionMenu />}     
      </View>
              <Text style={styles.dealType}>{type}</Text>     
      {/* Offer and Min/Max Row */}     
      <View style={styles.offerRow}>
               
        <View style={styles.offerBadge}>
                      <Text style={styles.offerText}>{offer}</Text>       
        </View>
               
        <Text style={styles.offerDetailsText}>
                      {/* Display minimum detail only if the deal is Active */} 
                    {status === 'Active' ? '' : ''}       
        </Text>
             
      </View>
                      {/* Validity and Checkbox Row */}     
      <View style={styles.statusRow}>
                            {/* 1. Validity Container (Two-line structure) */} 
             
        <View style={styles.validityContainerNew}>
                               
          {/* 🟢 TOP ROW: Validity Label and Status Badge (Horizontal) */}     
             
          <View style={styles.validityHeaderRow}>
                            <Text style={styles.validityLabel}>Validity</Text> 
                                       
            {/* Status Badge right next to the Validity label */}             
            {/* <View style={[styles.statusBadgeNew, {backgroundColor: statusBg}]}>
                                
              <Text style={[styles.statusText, {color: statusColor}]}>
                                        {status}                  
              </Text>
                          
            </View> */}
            <View
              style={{
                width: 100, // fixed width
                height: 30, // fixed height
                backgroundColor: statusBg,
                borderRadius: 10,
                justifyContent: 'center', // vertical center
                alignItems: 'center', // horizontal center
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: statusColor,
                  textAlign: 'center',
                }}>
                {status}
              </Text>
            </View>
                     
          </View>
                                  {/* 🟢 BOTTOM ROW: Date Text (Vertical) */}   
                  <Text style={styles.validityDateText}>{validity}</Text>       
                     
        </View>
                  {/* 2. Checkbox Implementation (Aligned to bottom-right) */} 
           
      </View>
      <View
        style={[
          styles.checkboxNew,
          {backgroundColor: checkboxBg, borderColor: '#D8D8D8'},
        ]}>
                 {/* Check icon is WHITE when checked, background is orange */} 
             
        {isChecked && <AntDesign name="check" size={16} color={Colors.white} />}
               
      </View>
         
    </View>
  );
};

// --- Filter Modal Component ---
const FilterModal = ({isVisible, onClose, onApply, onReset}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={onReset}>
              <Text style={styles.resetText}>Reset all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Category Filter */}
            <Text style={styles.filterSectionTitle}>Category</Text>
            <View style={styles.filterInputContainer}>
              <Text style={styles.filterPlaceholderText}>All Categories</Text>
              <Feather name="chevron-down" size={20} color={Colors.darkText} />
            </View>

            {/* Suppliers Filter */}
            <Text style={styles.filterSectionTitle}>Suppliers</Text>
            <View style={styles.filterInputContainer}>
              <Text style={styles.filterPlaceholderText}>Suppliers</Text>
              <Feather name="chevron-down" size={20} color={Colors.darkText} />
            </View>

            {/* Price Row */}
            <View style={styles.priceRow}>
              <View style={{flex: 1, marginRight: 10}}>
                <Text style={styles.filterSectionTitle}>Min. Price</Text>
                <View style={styles.filterInputContainer}>
                  <Text style={styles.filterPlaceholderText}>Min. Price</Text>
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={Colors.darkText}
                  />
                </View>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.filterSectionTitle}>Max. Price</Text>
                <View style={styles.filterInputContainer}>
                  <Text style={styles.filterPlaceholderText}>Max. Price</Text>
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={Colors.darkText}
                  />
                </View>
              </View>
            </View>

            {/* Date Filter */}
            <Text style={styles.filterSectionTitle}>Select Date</Text>
            <View style={styles.filterInputContainer}>
              <Text style={styles.filterPlaceholderText}>Select Date</Text>
              <Feather name="chevron-down" size={20} color={Colors.darkText} />
            </View>
            {/* Extra space to push the Apply button up */}
            <View style={{height: 100}} />
          </ScrollView>

          {/* Apply Button (Positioned at the bottom) */}
          <TouchableOpacity style={styles.applyButton} onPress={onApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}; // --- Main Deals and Discount Screen ---
const DealsDiscountScreen = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false); // 🟢 State for Filter Modal visibility // Sample Data (data representing the list items)

  const dealsData = [
    {
      title: 'Summer Sale',
      type: 'Percentage Discount',
      offer: '20% OFF',
      validity: 'From: Jan 1, 2025 - To Jan 31, 2025',
      status: 'Active',
      isChecked: true,
    },
    {
      title: 'Fall Sale',
      type: 'Amount Discount',
      offer: '10 INR OFF',
      validity: 'From: Feb 1, 2025 - To Jan 7, 2025',
      status: 'Inactive',
      isChecked: false,
    },
    {
      title: 'Winter Discount',
      type: 'Bogo discount',
      offer: '50% OFF',
      validity: 'From: Feb 1, 2025 - To Jan 7, 2025',
      status: 'Inactive',
      isChecked: false,
    },
  ];

  const handleApplyFilters = () => {
    // Implement filter application logic here
    setIsFilterVisible(false);
  };

  const handleResetFilters = () => {
    // Implement filter reset logic here
    console.log('Filters Reset!');
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
              {/* --- App Header (Back, Title, Menu) --- */}     
      <View style={styles.appHeader}>
               
        <Ionicons
          name="arrow-back"
          size={24}
          color={Colors.darkText}
          onPress={() => navigation.goBack()}
        />
                  <Text style={styles.screenTitle}>Deals</Text>
        {/*           <Feather name="menu" size={24} color={Colors.darkText} />      */}
        {/* <DrawerIcon
          source={require('../../../assets/doc_icon.png')}
          style={{width: 24, height: 24}}
          resizeMode="contain"
        /> */}
      </View>
             
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
                            {/* --- Search and Filter Row --- */}       
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <SearchIcon style={styles.searchImage} />
            <TextInput
              placeholder="Search Product or orders"
              placeholderTextColor="#888"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={{padding: 1}}>
            <FilterIconSvg style={styles.filterImage} resizeMode="contain" />
          </TouchableOpacity>
        </View>
                    {/* --- Section Title and CTA Button --- */}       
        <View style={styles.sectionHeader}>
                      {/* Placeholder for the image icon */}
                   
          <Image
            source={require('../../../assets/cuppons_icon.png')}
            style={styles.searchImage}
            resizeMode="contain"
          />
                      <Text style={styles.sectionTitle}>Deals & Discount</Text> 
               
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateDeal')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../../assets/discount_icon.png')}
              style={{width: 20, height: 20, marginRight: 8}}
              resizeMode="contain"
            />
            <Text style={styles.createButtonText}>Create Deals</Text>
          </View>
        </TouchableOpacity>
                    {/* --- Deals List --- */}       
        <View style={styles.dealsList}>
                   
          {dealsData.map((deal, index) => (
            <DealCard key={index} {...deal} />
          ))}
                 
        </View>
               
      </ScrollView>
      {/* 🟢 Filter Modal Implementation */}
      {/* <FilterModal
            isVisible={isFilterVisible}
            onClose={() => setIsFilterVisible(false)}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
        /> */}
         
    </View>
  );
}; // --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBg,
  },
  filterImage: {width: 55, height: 55, marginStart: 5, marginTop: 5},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20',
    marginBottom: 12,
  },
  scrollView: {
    paddingHorizontal: 20,
  }, // --- Header Styles ---
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 50, // Safe area padding
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.darkText,
    marginLeft: 130,
  }, // --- Search Row Styles ---
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
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
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.darkText,
  },
  filterButton: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  searchImage: {width: 24, height: 24, marginStart: 5}, // --- Section Title and CTA ---
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 8,
  },
  createButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryOrange,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    marginLeft: 8,
  }, // --- Deal Card Styles ---
  dealsList: {
    paddingBottom: 30, // Extra space at the bottom of the list
  },
  card: {
    position: 'relative', // IMPORTANT for actionMenu
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15, // Unified shadow for iOS and Android
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.darkText,
  },
  dealType: {
    fontSize: 14,
    color: Colors.mediumText,
    marginBottom: 10,
  },
  offerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  offerBadge: {
    backgroundColor: Colors.lightOrangeBg,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 10,
  },
  offerText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primaryOrange,
  },
  offerDetailsText: {
    fontSize: 12,
    color: Colors.mediumText,
  },

  // --- Deal Card Menu Styles ---
  actionMenu: {
    position: 'absolute',
    top: 35,
    right: 15,
    zIndex: 10,
    width: 150,
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingVertical: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 14,
    color: Colors.darkText,
  },
  deleteText: {
    color: 'red',
    fontWeight: '600',
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.borderColor,
    marginHorizontal: 10,
  }, // *** CORRECTED VALIDITY/CHECKBOX STYLES ***
  statusRow: {
    // Main row holding the validity block (left) and checkbox (right)
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end', // Aligns items to the bottom, pushing checkbox to the corner
    marginTop: 10,
    paddingTop: 10,
  },
  validityContainerNew: {
    flex: 1, // Allows it to take the necessary space
    flexDirection: 'column', // Stacks the header row and date text
  },
  validityHeaderRow: {
    flexDirection: 'row', // KEY: Puts Validity label and Active tag horizontally
    alignItems: 'center',
    justifyContent: 'space-between', // 👈 left & right alignment
    alignItems: 'center', // 👈 vertically centered
    marginBottom: 8, // Space between header row and date text
  },
  validityLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.darkText, // Changed to dark text for better visibility
    marginRight: 10, // Space between 'Validity' and the Status Badge
  },
  validityDateText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.darkText,
  },

  statusBadgeNew: {
    width: 100, // fixed width
    height: 30, // fixed height
    backgroundColor: '#D9F7E8',
    borderRadius: 10,
    justifyContent: 'center', // vertical center
    alignItems: 'center', // horizontal center
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0A8F5A',
    textAlign: 'center',
    lineHeight: 30, // exactly same as container height
  },
  checkboxNew: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.primaryOrange, // Border is always orange
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  // --- MODAL (Filter Window) STYLES ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'flex-end', // Aligns modal to the right (common for filters)
    justifyContent: 'flex-start', // Starts from the top
  },
  modalContent: {
    width: '85%', // Width of the modal window
    height: '100%', // Full height
    backgroundColor: Colors.white,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 50,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.darkText,
  },
  resetText: {
    fontSize: 14,
    color: Colors.mediumText,
    fontWeight: '500',
  },
  filterSectionTitle: {
    fontSize: 14,
    color: Colors.darkText, // Changed to darkText for section title
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 18,
  },
  filterInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  filterPlaceholderText: {
    fontSize: 14,
    color: Colors.mediumText, // Placeholder text color
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: Colors.primaryOrange,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    // Pushes the button to the bottom using position: 'absolute'
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    marginBottom: Platform.OS === 'android' ? 20 : 40,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});
export default DealsDiscountScreen;

//date-10-12-2025
// import React, { useMemo, useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     TextInput,
//     ScrollView,
//     Platform,
//     Image,
//     Modal,
// } from 'react-native';

// import Feather from 'react-native-vector-icons/Feather';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useNavigation } from '@react-navigation/native';
// import Header from '../../components/Header';

// import useDeal from '../../../hooks/useDeal';
// import { extractFieldLabels, formatDisplayFields } from '../../../utils/modal/customCodeModal';

// import Loader from '../../components/Loader';
// import FilterBottomSheet from '../../components/CreateDeals/FilterBottomSheet';

// const Colors = {
//     primaryOrange: '#ff9933',
//     lightOrangeBg: '#fbe2c8',
//     darkText: '#3D3A3A',
//     mediumText: '#555',
//     lightText: '#999',
//     white: '#fff',
//     lightBg: '#f5f5f5',
//     borderColor: '#ddd',
//     activeGreen: '#4CAF50',
//     activeBg: '#E8F5E9',
//     inactiveGray: '#eee',
//     inputBorder: '#ccc',
// };

// // ====================================================================
// // Action Menu
// // ====================================================================
// const ActionMenu = ({ labelsMap, onClose }) => {
//     const handleAction = (action) => {
//         onClose();
//     };

//     return (
//         <View style={styles.actionMenu}>
//             <TouchableOpacity style={styles.menuItem} onPress={() => handleAction('Edit')}>
//                 <Text style={styles.menuText}>{labelsMap.context1 || "Edit"}</Text>
//             </TouchableOpacity>

//             <View style={styles.menuDivider} />

//             <TouchableOpacity style={styles.menuItem} onPress={() => handleAction('Delete')}>
//                 <Text style={styles.menuText}>{labelsMap.context2 || "Delete"}</Text>
//             </TouchableOpacity>

//             <View style={styles.menuDivider} />

//             <TouchableOpacity style={styles.menuItem} onPress={() => handleAction('Assign Product')}>
//                 <Text style={styles.menuText}>{labelsMap.context3 || "Assign Product"}</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// // ====================================================================
// // Deal Card Component
// // ====================================================================
// const DealCardComponent = ({ title, type, offer, validity, status, isChecked, item, labelsMap, currencyCode }) => {

//     const displayFields = useMemo(() => formatDisplayFields(item, labelsMap), [item, labelsMap]);

//     const [isMenuVisible, setIsMenuVisible] = useState(false);

//     let formattedOffer = null;

//     if (offer) {
//         const offerStr = String(offer).trim();
//         formattedOffer = type === "FixedAmount" ? `${offerStr} ${currencyCode} off` : `${offerStr}% off`;
//     }

//     const statusBg = status === "Active" ? Colors.activeBg : Colors.inactiveGray;
//     const statusColor = status === "Active" ? Colors.activeGreen : Colors.darkText;
//     const checkboxBg = isChecked ? Colors.primaryOrange : Colors.white;

//     return (
//         <View style={[styles.card, { position: "relative" }]}>
//             <View style={styles.cardHeader}>
//                 <Text style={styles.dealTitle}>{title}</Text>

//                 <TouchableOpacity onPress={() => setIsMenuVisible(!isMenuVisible)}>
//                     <Feather name="more-vertical" size={24} color={Colors.mediumText} />
//                 </TouchableOpacity>

//                 {isMenuVisible && (
//                     <ActionMenu labelsMap={labelsMap} onClose={() => setIsMenuVisible(false)} />
//                 )}
//             </View>

//             {type && <Text style={styles.dealType}>{type}</Text>}

//             {formattedOffer && (
//                 <View style={styles.offerRow}>
//                     <View style={styles.offerBadge}>
//                         <Text style={styles.offerText}>{formattedOffer}</Text>
//                     </View>
//                 </View>
//             )}

//             {(validity || status || isChecked) && (
//                 <View style={styles.statusRow}>
//                     {validity && (
//                         <View style={styles.validityContainerNew}>
//                             <View style={styles.validityHeaderRow}>
//                                 <Text style={styles.validityLabel}>{labelsMap?.validity || "Validity"}</Text>

//                                 <View style={[styles.statusBadgeNew, { backgroundColor: statusBg }]}>
//                                     <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
//                                 </View>
//                             </View>

//                             <Text style={styles.validityDateText}>{validity}</Text>
//                         </View>
//                     )}

//                     <View style={[styles.checkboxNew, { backgroundColor: checkboxBg }]}>
//                         {isChecked && <AntDesign name="check" size={16} color={Colors.white} />}
//                     </View>
//                 </View>
//             )}
//         </View>
//     );
// };

// // ====================================================================
// // Search & Filter
// // ====================================================================
// const SearchFilterSection = ({ labelsMap, onSearchResults, filterSection }) => {
//     const [searchText, setSearchText] = useState("");
//     const [isFilterVisible, setIsFilterVisible] = useState(false);

//     const { useSearchDeals } = useDeal();
//     const { data: searchResults ,isLoading:searchLoading } = useSearchDeals(searchText);

//     const [filterValues, setFilterValues] = useState(null);

//     // 🌟 FILTER APPLY HANDLER (Yahi pe log aayega)
//     const applyFilter = (values) => {
//         console.log("📌 FILTER APPLIED VALUES:", values);  // Logcat me show
//         setFilterValues(values);
//         // NOTE: Here you would call your API for filtering results
//         // Example: useFilterDeals(values);
//     };

//     useEffect(() => {
//         // Only update results if search is not loading (optional, depends on desired UX)
//         if (!searchLoading) {
//              onSearchResults(searchResults?.items || []);
//         }
//     }, [searchResults, searchLoading]);

//     return (
//         <View>
//             <View style={styles.searchRow}>
//                 <View style={styles.searchBox}>
//                     <Feather name="search" size={20} color={Colors.lightText} />
//                     <TextInput
//                         placeholder={labelsMap.search_query || "Search Deals"}
//                         placeholderTextColor={Colors.lightText}
//                         style={styles.searchInput}
//                         value={searchText}
//                         onChangeText={(txt) => setSearchText(txt)}
//                     />
//                 </View>

//                 <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterVisible(true)}>
//                     <Feather name="filter" size={24} color={Colors.darkText} />
//                 </TouchableOpacity>
//             </View>
//             {/* If you want a loader specifically for search, you can add it here: */}
//             {/* {searchLoading && <Loader />} */}

//             <FilterBottomSheet
//                 visible={isFilterVisible}
//                 onClose={() => setIsFilterVisible(false)}
//                 schema={filterSection}
//                  onApply={(values) => {
//                     setFilterValues(values);
//                     applyFilter(values); // Pass values to applyFilter function
//                     setIsFilterVisible(false);
//             }}
//             />
//         </View>
//     );
// };

// // ====================================================================
// // Pagination Component
// // ====================================================================
// const Pagination = ({ totalPages = 10, onPageChange, isPaginating }) => { // isPaginating prop added
//     const [currentPage, setCurrentPage] = useState(1);

//     const goNext = () => {
//         if (currentPage < totalPages && !isPaginating) {
//             const newPage = currentPage + 1;
//             setCurrentPage(newPage);
//             onPageChange(newPage); // API CALL TRIGGER
//         }
//     };

//     const goBack = () => {
//         if (currentPage > 1 && !isPaginating) {
//             const newPage = currentPage - 1;
//             setCurrentPage(newPage);
//             onPageChange(newPage); // API CALL TRIGGER
//         }
//     };

//     return (
//         <View style={styles.paginationContainer}>

//             {/* BACK BUTTON */}
//             <TouchableOpacity
//                 style={currentPage === 1 || isPaginating ? styles.arrowBtnDisabled : styles.arrowBtn}
//                 disabled={currentPage === 1 || isPaginating}
//                 onPress={goBack}
//             >
//                 <Feather
//                     name="chevron-left"
//                     size={22}
//                     color={currentPage === 1 || isPaginating ? "#BFBFBF" : "#ED8A00"}
//                 />
//             </TouchableOpacity>

//             <Text style={styles.pageText}>
//                 Page {currentPage} Of {totalPages}
//             </Text>

//             {/* NEXT BUTTON */}
//             <TouchableOpacity
//                 style={currentPage === totalPages || isPaginating ? styles.arrowBtnDisabled : styles.arrowBtn}
//                 disabled={currentPage === totalPages || isPaginating}
//                 onPress={goNext}
//             >
//                 <Feather
//                     name="chevron-right"
//                     size={22}
//                     color={currentPage === totalPages || isPaginating ? "#BFBFBF" : "#ED8A00"}
//                 />
//             </TouchableOpacity>

//         </View>
//     );
// };

// // ====================================================================
// // Main Screen
// // ====================================================================
// const DealsDiscountScreen = ({ navigation }) => {
//     const { useFetchDeals } = useDeal();
//     // Initial data fetch loading state
//     const { data, isLoading } = useFetchDeals();

//     // ⬅️ NEW STATE: State for pagination loading
//     const [isPaginating, setIsPaginating] = useState(false);

//     const labelsMap = useMemo(() => {
//         return data?.schema ? extractFieldLabels(data.schema) : {};
//     }, [data]);

//     const [searchedDeals, setSearchedDeals] = useState([]);

//     // ---------------- SAFE ITEMS ----------------
//     const items = useMemo(() => {
//         if (searchedDeals?.length > 0) {
//             return searchedDeals;
//         }
//         if (Array.isArray(data?.items)) {
//             return data.items;
//         }
//         return []; // FALLBACK → always return array
//     }, [searchedDeals, data]);

//     // ---------------- SAFE FILTER SECTION ----------------
//     const filterSection = useMemo(() => {
//         return data?.schema?.pages?.[0]?.sections?.find(
//             (s) => s?.name === "Filters"
//         ) || null;
//     }, [data]);

//     const totalPages = 10;

//     // ⬅️ UPDATED FUNCTION: Handles API call and loading state for pagination
//     const fetchDeals = async (page) => {
//         console.log("API CALL — PAGE:", page);

//         // 1. START LOADING
//         setIsPaginating(true);

//         // 2. SIMULATE API CALL (Replace with your actual API call: e.g., await getDealsList(page))
//         // This is just a delay to show the loader
//         await new Promise(resolve => setTimeout(resolve, 1500));

//         // 3. Update data state here after successful fetch (e.g., setData(newDeals))
//         // NOTE: Since we are not updating `data` state in this example, the list content will not change visually.
//         // In a real app, you would update the state that `items` relies on.

//         // 4. STOP LOADING
//         setIsPaginating(false);
//     };

//     return (
//         <View style={styles.container}>

//             {/* HEADER */}
//             <Header title={labelsMap?.schema_title || "Deals"} onBackPress={true} />

//             {/* LOADING for initial fetch (useFetchDeals) */}
//             {isLoading ? (
//                 <Loader />
//             ) : (
//                 <ScrollView style={styles.scrollView}>

//                     {/* SEARCH + FILTER SECTION */}
//                     <SearchFilterSection
//                         labelsMap={labelsMap}
//                         onSearchResults={(list) => setSearchedDeals(list)}
//                         filterSection={filterSection}
//                     />

//                     {/* SECTION TITLE */}
//                     <View style={styles.sectionHeader}>
//                         <Image
//                             source={require('../../../assets/cuppons_icon.png')}
//                             style={styles.searchImage}
//                         />
//                         <Text style={styles.sectionTitle}>
//                             {labelsMap?.deals_discount_title || "Deals & Discount"}
//                         </Text>
//                     </View>

//                     {/* CREATE BUTTON */}
//                     <TouchableOpacity
//                         style={styles.createButton}
//                         onPress={() => navigation.navigate("CreateDeal")}
//                     >
//                         <Text style={styles.createButtonText}>
//                             {labelsMap?.btn_create || "Create Deals"}
//                         </Text>
//                     </TouchableOpacity>

//                     {/* DEALS LIST & PAGINATION LOADER */}
//                     {isPaginating ? (
//                         // ⬅️ Show loader while paginating
//                         <View style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
//                             <Loader />
//                         </View>
//                     ) : (
//                         // ⬅️ Show list when loading is complete
//                         <View style={styles.dealsList}>
//                             {(items ?? []).map((deal, index) => (
//                                 <DealCardComponent
//                                     key={index}
//                                     title={deal?.dealName}
//                                     type={deal?.discountType}
//                                     offer={deal?.discountValue}
//                                     validity={`${deal?.startDate || ""} - ${deal?.endDate || ""}`}
//                                     status={deal?.status}
//                                     isChecked={deal?.isActive}
//                                     item={deal}
//                                     labelsMap={labelsMap}
//                                     currencyCode={deal?.currencyCode}
//                                 />
//                             ))}
//                         </View>
//                     )}

//                     {/* ASSIGN PRODUCTS */}
//                     <TouchableOpacity style={styles.assignCard}>
//                         <Feather name="box" size={24} color="#000" />
//                         <Text style={styles.assignText}>
//                             {labelsMap?.assign_products || "Assign Products (1)"}
//                         </Text>
//                         <Feather name="chevron-right" size={24} color="#000" />
//                     </TouchableOpacity>

//                     {/* PAGINATION */}
//                     <Pagination
//                         totalPages={totalPages}
//                         onPageChange={fetchDeals}
//                         isPaginating={isPaginating} // ⬅️ Pass loading state
//                     />

//                 </ScrollView>
//             )}
//         </View>
//     );
// };

// export default DealsDiscountScreen;

// // --- Stylesheet (Kept here as requested) ---
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.lightBg,
//     },
//     scrollView: {
//         paddingHorizontal: 20,
//     },

//     // --- Search Row Styles ---
//     searchRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 15,
//         marginBottom: 15,
//     },
//     searchBox: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: Colors.white,
//         borderRadius: 8,
//         paddingHorizontal: 15,
//         paddingVertical: Platform.OS === 'android' ? 5 : 10,
//         marginRight: 10,
//         borderWidth: 1,
//         borderColor: Colors.borderColor,
//     },
//     searchInput: {
//         flex: 1,
//         marginLeft: 10,
//         fontSize: 16,
//         fontWeight: '400',
//         color: Colors.darkText,
//     },
//     filterButton: {
//         padding: 10,
//         backgroundColor: Colors.white,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: Colors.borderColor,
//     },
//     searchImage: {
//         width: 24,
//         height: 24,
//     },

//     // --- Section Title and CTA ---
//     sectionHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#000000',
//         marginLeft: 8,
//     },
//     createButton: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: Colors.primaryOrange,
//         paddingVertical: 12,
//         borderRadius: 8,
//         marginBottom: 20,
//     },
//     createButtonText: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: Colors.white,
//         marginLeft: 8,
//     },

//     // --- Deal Card Styles ---
//     dealsList: {
//         paddingBottom: 30, // Extra space at the bottom of the list
//     },
//     card: {
//         position: 'relative', // IMPORTANT for actionMenu
//         backgroundColor: Colors.white,
//         borderRadius: 12,
//         padding: 15,
//         marginBottom: 15,
//         // Unified shadow for iOS and Android
//         ...Platform.select({
//             ios: {
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 4,
//             },
//             android: {
//                 elevation: 3,
//             },
//         }),
//     },
//     cardHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 5,
//     },
//     dealTitle: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: Colors.darkText,
//     },
//     dealType: {
//         fontSize: 14,
//         color: Colors.mediumText,
//         marginBottom: 10,
//     },
//     offerRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     offerBadge: {
//         backgroundColor: Colors.lightOrangeBg,
//         borderRadius: 4,
//         paddingHorizontal: 6,
//         paddingVertical: 3,
//         marginRight: 10,
//     },
//     offerText: {
//         fontSize: 14,
//         fontWeight: '700',
//         color: Colors.primaryOrange,
//     },

//     // --- Deal Card Menu Styles ---
//     actionMenu: {
//         position: 'absolute',
//         top: 35,
//         right: 15,
//         zIndex: 10,
//         width: 150,
//         backgroundColor: Colors.white,
//         borderRadius: 8,
//         paddingVertical: 5,
//         ...Platform.select({
//             ios: {
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.15,
//                 shadowRadius: 5,
//             },
//             android: {
//                 elevation: 6,
//             },
//         }),
//     },
//     menuItem: {
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//     },
//     menuText: {
//         fontSize: 14,
//         color: Colors.darkText,
//     },
//     deleteText: {
//         color: 'red',
//         fontWeight: '600',
//     },
//     menuDivider: {
//         height: 1,
//         backgroundColor: Colors.borderColor,
//         marginHorizontal: 10,
//     },

//     // *** CORRECTED VALIDITY/CHECKBOX STYLES ***
//     statusRow: {
//         // Main row holding the validity block (left) and checkbox (right)
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-end', // Aligns items to the bottom, pushing checkbox to the corner
//         marginTop: 10,
//         borderTopWidth: 1,
//         borderTopColor: Colors.borderColor,
//         paddingTop: 10,
//     },
//     validityContainerNew: {
//         flex: 1, // Allows it to take the necessary space
//         flexDirection: 'column', // Stacks the header row and date text
//     },
//     validityHeaderRow: {
//         flexDirection: 'row', // KEY: Puts Validity label and Active tag horizontally
//         alignItems: 'center',

//         justifyContent: 'flex-start',
//         marginBottom: 8, // Space between header row and date text
//     },
//     validityLabel: {
//         fontSize: 14,
//         fontWeight: '500',
//         color: Colors.darkText, // Changed to dark text for better visibility
//         marginRight: 10, // Space between 'Validity' and the Status Badge
//     },
//     validityDateText: {
//         fontSize: 14,
//         fontWeight: '500',
//         color: Colors.darkText,
//     },
//     statusBadgeNew: {
//         borderRadius: 4, // More square look for the tag
//         paddingHorizontal: 6,
//         paddingVertical: 3,
//     },
//     statusText: {
//         fontSize: 12,
//         fontWeight: '600',
//         paddingHorizontal: 3,
//     },
//     checkboxNew: {
//         width: 24,
//         height: 24,
//         borderRadius: 4,
//         borderWidth: 1,
//         borderColor: Colors.primaryOrange, // Border is always orange
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     // --- MODAL (Filter Window) STYLES ---
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         alignItems: 'flex-end', // Aligns modal to the right (common for filters)
//         justifyContent: 'flex-start', // Starts from the top
//     },
//     modalContent: {
//         width: '85%', // Width of the modal window
//         height: '100%', // Full height
//         backgroundColor: Colors.white,
//         padding: 20,
//         paddingTop: Platform.OS === 'android' ? 40 : 50,
//     },
//     modalHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: '700',
//         color: Colors.darkText,
//     },
//     resetText: {
//         fontSize: 14,
//         color: Colors.mediumText,
//         fontWeight: '500',
//     },
//     filterSectionTitle: {
//         fontSize: 14,
//         color: Colors.darkText, // Changed to darkText for section title
//         fontWeight: '500',
//         marginBottom: 8,
//         marginTop: 18,
//     },
//     filterInputContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: Colors.borderColor,
//         borderRadius: 8,
//         paddingHorizontal: 15,
//         paddingVertical: 12,
//         backgroundColor: Colors.white,
//     },
//     filterPlaceholderText: {
//         fontSize: 14,
//         color: Colors.mediumText, // Placeholder text color
//     },
//     priceRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     applyButton: {
//         backgroundColor: Colors.primaryOrange,
//         paddingVertical: 15,
//         borderRadius: 8,
//         alignItems: 'center',
//         // Pushes the button to the bottom using position: 'absolute'
//         position: 'absolute',
//         bottom: 0,
//         left: 20,
//         right: 20,
//         marginBottom: Platform.OS === 'android' ? 20 : 40,
//     },
//     applyButtonText: {
//         fontSize: 16,
//         fontWeight: '700',
//         color: Colors.white,
//     },
//     /* Assign Product */
//     assignCard: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#FFF7EB",
//         padding: 16,
//         borderRadius: 12,
//         elevation: 2,
//         marginBottom: 30, // Added margin for spacing
//     },
//     assignText: {
//         flex: 1,
//         fontSize: 16,
//         marginLeft: 12,
//         fontWeight: "600",
//         color: "#000",
//     },
//     /* Pagination */
//     paginationContainer: {
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 20,
//         marginBottom: 30, // Added margin for spacing
//     },
//     arrowBtn: {
//         width: 40,
//         height: 40,
//         borderRadius: 8,
//         backgroundColor: "#FFF",
//         justifyContent: "center",
//         alignItems: "center",
//         elevation: 2,
//     },
//     arrowBtnDisabled: {
//         width: 40,
//         height: 40,
//         borderRadius: 8,
//         backgroundColor: "#FFF",
//         justifyContent: "center",
//         alignItems: "center",
//         elevation: 2,
//         opacity: 0.5,
//     },

//     pageText: {
//         marginHorizontal: 20,
//         fontSize: 15,
//         color: "#6F7285",
//         fontWeight: "600",
//     },
// });
