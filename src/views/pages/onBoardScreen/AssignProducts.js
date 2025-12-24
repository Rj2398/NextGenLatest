import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';

// REQUIRED IMPORTS for Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';

// --- Centralized Color Palette ---
const Colors = {
  // Primary & CTA Colors
  primaryOrange: '#FF8719',
  lightOrangeBg: '#fbe2c8',

  // Text Colors
  darkText: '#3D3A3A',
  mediumText: '#858D9D',
  labelGray: '#858D9D',

  // Backgrounds & Borders
  white: '#fff',
  lightBg: '#f5f5f5',
  borderColor: '#ddd',

  // Status Colors
  activeGreen: '#D1FAE5',
  activeGreenText: '#2B947D',
  offerHighlight: '#FEEAD7',
  title: '#161B25',
  black: '#000000',
};

// --- Reusable Component for Dropdown Field ---
const DropdownInput = ({label, placeholder, value, isRequired, onPress}) => {
  return (
    <View style={assignStyles.inputContainer}>
      <Text style={assignStyles.label}>
        {label}
        {isRequired && <Text style={assignStyles.requiredStar}>*</Text>}
      </Text>
      {/* Touchable for simulating dropdown action */}
      <TouchableOpacity style={assignStyles.dropdownInput} onPress={onPress}>
        <Text style={assignStyles.dropdownText}>{value || placeholder}</Text>
        <Feather name="chevron-down" size={20} color={Colors.mediumText} />
      </TouchableOpacity>
    </View>
  );
};

// --- Reusable Component for Variant Selector (New Component) ---
const VariantSelector = ({label, selectedVariants, onPress}) => {
  return (
    <View style={assignStyles.inputContainer}>
      <Text style={assignStyles.label}>{label}</Text>
      <TouchableOpacity
        style={assignStyles.variantDropdownContainer}
        onPress={onPress}>
        <View style={assignStyles.variantTagsWrapper}>
          {selectedVariants.map((variant, index) => (
            <View key={index} style={assignStyles.variantTag}>
              <View
                style={[
                  assignStyles.variantColorDot,
                  {backgroundColor: variant.color},
                ]}
              />
              <Text style={assignStyles.variantTagText}>{variant.text}</Text>
              {/* Optionally add a close icon here if variants can be removed */}
            </View>
          ))}
        </View>
        <Feather name="chevron-down" size={20} color={Colors.mediumText} />
      </TouchableOpacity>
    </View>
  );
};

// --- Reusable Component for the Deal Summary Card ---
const DealSummaryCard = ({dealName, discountType, offer, validity, status}) => {
  return (
    <View style={assignStyles.card}>
      <View style={assignStyles.cardHeader}>
        <View>
          <Text style={assignStyles.dealName}>{dealName}</Text>
          <Text style={assignStyles.discountType}>{discountType}</Text>
        </View>
        {/* Options Menu Icon (three dots) */}
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color={Colors.darkText}
          />
        </TouchableOpacity>
      </View>

      <View style={assignStyles.cardBody}>
        <Text style={assignStyles.discountType}>Offer</Text>
        {/* Offer Tag */}
        <View style={assignStyles.offerTag}>
          <Text style={assignStyles.offerText}>{offer}</Text>
        </View>

        {/* Validity and Status */}
        <View style={assignStyles.validityRow}>
          <View style={{flex: 1}}>
            <Text style={assignStyles.validityLabel}>Validity</Text>
            <Text style={assignStyles.validityDates}>{validity}</Text>
          </View>

          <View style={assignStyles.statusBadge(status)}>
            <Text style={assignStyles.statusText(status)}>{status}</Text>
          </View>

          {/* Checkbox (Assumed selected state for this design) */}
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={24}
            color={Colors.primaryOrange}
            style={{marginLeft: 15}}
          />
        </View>
      </View>
    </View>
  );
};

// --- Main Component: AssignProducts ---
const AssignProducts = () => {
  // State for selected inputs
  const [selectedCategory, setSelectedCategory] = useState(
    'Ready To Eat Snacks',
  );
  const [selectedProduct, setSelectedProduct] = useState('Maggie');
  // State for variants (now an array of objects for color and text)
  const [selectedVariants, setSelectedVariants] = useState([
    {color: 'red', text: 'Size - S Q - 8'},
    {color: 'blue', text: 'Size - M Q - 12'},
  ]);

  const handleSaveChanges = () => {
    console.log('Saving Changes:', {
      selectedCategory,
      selectedProduct,
      selectedVariants,
    });
    // Logic to assign products to the deal
  };

  const handleCancel = () => {
    console.log('Assignment Cancelled');
    // Logic to dismiss the screen
  };

  // Placeholder function for dropdown/variant selection
  const openDropdown = type => {
    console.log(`Opening dropdown for: ${type}`);
    // In a real app, you'd open a modal or navigate to a selection screen
  };

  return (
    <SafeAreaView style={assignStyles.container}>
      {/* --- App Header (Back and Title) --- */}
      {/* <View style={assignStyles.appHeader}>
        <Ionicons name="arrow-back" size={24} color={Colors.darkText} />
        <Text style={assignStyles.screenTitle}>Assign Products</Text>
 
        <View style={{width: 24}} />
      </View> */}

      <Header title={'Assign Products'} onBackPress={true} />

      <ScrollView
        contentContainerStyle={assignStyles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {/* 1. Deal Summary Card */}
        <DealSummaryCard
          dealName="Summer Sale"
          discountType="Percentage Discount"
          offer="20% OFF"
          validity="From: Jan 1, 2025 - To Jan 31, 2025"
          status="Active"
        />

        {/* 2. Product Selection Area */}
        <View style={assignStyles.selectionCard}>
          {/* Select Category */}
          <DropdownInput
            label="Select Category"
            placeholder="Select Category"
            value={selectedCategory}
            isRequired={true}
            onPress={() => openDropdown('Category')}
          />

          {/* Select Product */}
          <DropdownInput
            label="Select Product"
            placeholder="Select Product"
            value={selectedProduct}
            isRequired={true}
            onPress={() => openDropdown('Product')}
          />

          {/* Variant Selection (Using the new VariantSelector component) */}
          <VariantSelector
            label="variant"
            selectedVariants={selectedVariants}
            onPress={() => openDropdown('Variant')}
          />
        </View>

        {/* 3. Action Buttons */}
        <View style={assignStyles.buttonRow}>
          <TouchableOpacity
            style={assignStyles.saveButton}
            onPress={handleSaveChanges}>
            <Text style={assignStyles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={assignStyles.cancelButton}
            onPress={handleCancel}>
            <Text style={assignStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Stylesheet for AssignProducts Component ---
const assignStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBg,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },

  // --- Header Styles ---
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.title,
  },

  // --- Card Styles (Used for both Deal Summary and Selection Area) ---
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
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
  selectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
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
    alignItems: 'flex-start',
  },
  dealName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.darkText,
  },
  discountType: {
    fontSize: 14,
    color: Colors.mediumText,
    marginBottom: 10,
  },
  cardBody: {
    marginTop: 10,
  },
  offerTag: {
    backgroundColor: Colors.offerHighlight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  offerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF7A00',
  },
  validityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  validityLabel: {
    fontSize: 12,
    color: Colors.mediumText,
  },
  validityDates: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5D6679',
    marginTop: 2,
  },
  statusBadge: status => ({
    backgroundColor:
      status === 'Active' ? Colors.activeGreen : Colors.inactiveGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginRight: 15,
  }),
  statusText: status => ({
    fontSize: 12,
    fontWeight: '600',
    color: status === 'Active' ? Colors.activeGreenText : Colors.darkText,
  }),

  // --- Input Field Styles ---
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.labelGray,
    marginBottom: 5,
  },
  requiredStar: {
    color: 'red',
    fontSize: 14,
  },

  // Default Dropdown styles
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 10 : 14,
    backgroundColor: Colors.white,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '400',
  },

  // New Variant Selector Styles
  variantDropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: 10, // Adjusted padding
    paddingVertical: Platform.OS === 'android' ? 5 : 10, // Adjusted padding for better fit with tags
    backgroundColor: Colors.white,
    minHeight: 50, // Ensure enough height even with few tags
  },
  variantTagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1, // Allow tags to take up available space
    alignItems: 'center',
  },
  variantTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white, // Tags are inside the white background of the dropdown
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 20,
    paddingVertical: 4, // Smaller padding for tags within the dropdown
    paddingHorizontal: 8,
    marginRight: 8, // Space between tags
    marginVertical: 4, // Vertical space for wrapping tags
  },
  variantColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  variantTagText: {
    fontSize: 13, // Slightly smaller text for tags
    color: '#48505E',
  },

  // --- Button Styles ---
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.primaryOrange,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFAF5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
});

export default AssignProducts;

//10-12-2025
// import React, { useState, useMemo, useEffect } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     Platform,
//     ScrollView,
//     ActivityIndicator,
//     Alert,
//     Modal,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// // --- Import the required hooks ---
// import useDealForm from '../../../hooks/useDealForm';
// import useDynamicForm from '../../../hooks/useDynamicForm';

// import DynamicScreen from './DynamicScreen.js/DynamicScreen';

// // --- Constants and Mock Components ---

// const mockGetAllProductModal =  {
//     "pageGroupName": "Deal_Creation",
//     "title": "Deal_Creation",
//     "description": "Complete deal and discount creation workflow with product assignment",
//     "pages": [
//       {
//         "pageId": 2,
//         "pageName": "Ecommerce_Deal_ProductAssignment",
//         "title": "Assign Product",
//         "subtitle": "Select products to apply this deal or discount",
//         "description": "Assign Product",
//         "order": 2,
//         "sections": [
//           {
//             "id": 4101,
//             "name": "DealSummaryCard",
//             "title": "Deal Summary",
//             "description": "Review deal information",
//             "order": 1,
//             "type": "cardwithaction",
//             "fields": [
//               {
//                 "id": 4101,
//                 "fieldName": "title_label",
//                 "fieldType": "Text",
//                 "label": "Title",
//                 "placeholder": null,
//                 "helpText": null,
//                 "displayName": "Title",
//                 "isRequired": false,
//                 "isReadOnly": true,
//                 "isVisible": true,
//                 "displayOrder": 1,
//                 "maxLength": null,
//                 "minLength": null,
//                 "regexPattern": null,
//                 "defaultValue": null,
//                 "fieldMetadata": {
//                   "dataType": "string",
//                   "inputType": "text",
//                   "accessibility": {
//                     "ariaLabel": "Deal title label",
//                     "ariaRequired": false
//                   }
//                 },
//                 "localization": {
//                   "languageCode": "EN",
//                   "countryCode": "AE",
//                   "localizedText": "Title",
//                   "localizedPlaceholder": null,
//                   "localizedHelpText": "Deal title"
//                 },
//                 "options": null,
//                 "actions": null,
//                 "isDefault": false
//               },
//               {
//                 "id": 4102,
//                 "fieldName": "subtitle_label",
//                 "fieldType": "Text",
//                 "label": "Subtitle",
//                 "placeholder": null,
//                 "helpText": null,
//                 "displayName": "Subtitle",
//                 "isRequired": false,
//                 "isReadOnly": true,
//                 "isVisible": true,
//                 "displayOrder": 2,
//                 "maxLength": null,
//                 "minLength": null,
//                 "regexPattern": null,
//                 "defaultValue": null,
//                 "fieldMetadata": {
//                   "dataType": "string",
//                   "inputType": "text",
//                   "accessibility": {
//                     "ariaLabel": "Deal subtitle label",
//                     "ariaRequired": false
//                   }
//                 },
//                 "localization": {
//                   "languageCode": "EN",
//                   "countryCode": "AE",
//                   "localizedText": "Subtitle",
//                   "localizedPlaceholder": null,
//                   "localizedHelpText": "Deal subtitle"
//                 },
//                 "options": null,
//                 "actions": null,
//                 "isDefault": false
//               },
//               {
//                 "id": 4103,
//                 "fieldName": "description_label",
//                 "fieldType": "Text",
//                 "label": "Description",
//                 "placeholder": null,
//                 "helpText": null,
//                 "displayName": "Description",
//                 "isRequired": false,
//                 "isReadOnly": true,
//                 "isVisible": true,
//                 "displayOrder": 3,
//                 "maxLength": null,
//                 "minLength": null,
//                 "regexPattern": null,
//                 "defaultValue": null,
//                 "fieldMetadata": {
//                   "dataType": "string",
//                   "inputType": "text",
//                   "accessibility": {
//                     "ariaLabel": "Deal description label",
//                     "ariaRequired": false
//                   }
//                 },
//                 "localization": {
//                   "languageCode": "EN",
//                   "countryCode": "AE",
//                   "localizedText": "Description",
//                   "localizedPlaceholder": null,
//                   "localizedHelpText": "Deal description"
//                 },
//                 "options": null,
//                 "actions": null,
//                 "isDefault": false
//               },
//               {
//                 "id": 4104,
//                 "fieldName": "labelchip1",
//                 "fieldType": "LabelChip",
//                 "label": "Offer",
//                 "placeholder": null,
//                 "helpText": null,
//                 "displayName": "Offer",
//                 "isRequired": false,
//                 "isReadOnly": true,
//                 "isVisible": true,
//                 "displayOrder": 4,
//                 "maxLength": null,
//                 "minLength": null,
//                 "regexPattern": null,
//                 "defaultValue": null,
//                 "fieldMetadata": {
//                   "dataType": "string",
//                   "inputType": "chip",
//                   "accessibility": {
//                     "ariaLabel": "Offer chip",
//                     "ariaRequired": false
//                   }
//                 },
//                 "localization": {
//                   "languageCode": "EN",
//                   "countryCode": "AE",
//                   "localizedText": "Offer",
//                   "localizedPlaceholder": null,
//                   "localizedHelpText": "Deal offer chip"
//                 },
//                 "options": null,
//                 "actions": null,
//                 "isDefault": false
//               },
//               {
//                 "id": 4105,
//                 "fieldName": "labelchip2",
//                 "fieldType": "Text",
//                 "label": "Validity",
//                 "placeholder": null,
//                 "helpText": null,
//                 "displayName": "Validity",
//                 "isRequired": false,
//                 "isReadOnly": true,
//                 "isVisible": true,
//                 "displayOrder": 5,
//                 "maxLength": null,
//                 "minLength": null,
//                 "regexPattern": null,
//                 "defaultValue": null,
//                 "fieldMetadata": {
//                   "dataType": "string",
//                   "inputType": "chip",
//                   "accessibility": {
//                     "ariaLabel": "Validity chip",
//                     "ariaRequired": false
//                   }
//                 },
//                 "localization": {
//                   "languageCode": "EN",
//                   "countryCode": "AE",
//                   "localizedText": "Validity",
//                   "localizedPlaceholder": null,
//                   "localizedHelpText": "Deal validity chip"
//                 },
//                 "options": null,
//                 "actions": null,
//                 "isDefault": false
//               },
//               {
//                 "id": 4106,
//                 "fieldName": "label1",
//                 "fieldType": "Text",
//                 "label": "From To",
//                 "placeholder": null,
//                 "helpText": null,
//                 "displayName": "From To",
//                 "isRequired": false,
//                 "isReadOnly": true,
//                 "isVisible": true,
//                 "displayOrder": 6,
//                 "maxLength": null,
//                 "minLength": null,
//                 "regexPattern": null,
//                 "defaultValue": null,
//                 "fieldMetadata": {
//                   "dataType": "string",
//                   "inputType": "text",
//                   "accessibility": {
//                     "ariaLabel": "From to date label",
//                     "ariaRequired": false
//                   }
//                 },
//                 "localization": {
//                   "languageCode": "EN",
//                   "countryCode": "AE",
//                   "localizedText": "From To",
//                   "localizedPlaceholder": null,
//                   "localizedHelpText": "Deal validity period from to dates"
//                 },
//                 "options": null,
//                 "actions": null,
//                 "isDefault": false
//               },
//               {
//                 "id": 4108,
//                 "fieldName": "btn_edit",
//                 "fieldType": "CardButton",
//                 "label": "Edit",
//                 "placeholder": null,
//                 "helpText": null,
//                 "displayName": "Edit",
//                 "isRequired": false,
//                 "isReadOnly": false,
//                 "isVisible": true,
//                 "displayOrder": 7,
//                 "maxLength": null,
//                 "minLength": null,
//                 "regexPattern": null,
//                 "defaultValue": null,
//                 "apiCallRequired": true,
//                 "method": "GET",
//                 "endpoint": "/api/v1/deals",
//                 "fieldMetadata": {
//                   "dataType": "string",
//                   "inputType": "button",
//                   "buttonType": "button_cardaction",
//                   "actionType": "edit",
//                   "accessibility": {
//                     "ariaLabel": "Edit deal button",
//                     "ariaRequired": false
//                   }
//                 },
//                 "localization": {
//                   "languageCode": "EN",
//                   "countryCode": "AE",
//                   "localizedText": "Edit",
//                   "localizedPlaceholder": null,
//                   "localizedHelpText": "Edit deal information"
//                 },
//                 "options": null,
//                 "actions": null,
//                 "isDefault": false
//               },
//               {
//                 "id": 4110,
//                 "fieldName": "btn_assign_product",
//                 "fieldType": "CardButton",
//                 "label": "Assign Product",
//                 "placeholder": null,
//                 "helpText": null,
//                 "displayName": "Assign Product",
//                 "isRequired": false,
//                 "isReadOnly": false,
//                 "isVisible": true,
//                 "displayOrder": 9,
//                 "maxLength": null,
//                 "minLength": null,
//                 "regexPattern": null,
//                 "defaultValue": null,
//                 "apiCallRequired": true,
//                 "method": "POST",
//                 "endpoint": "/api/v1/deals/products",
//                 "fieldMetadata": {
//                   "dataType": "string",
//                   "inputType": "button",
//                   "buttonType": "button_slidenext",
//                   "actionType": "assignproduct",
//                   "accessibility": {
//                     "ariaLabel": "Assign Product button",
//                     "ariaRequired": false
//                   }
//                 },
//                 "localization": {
//                   "languageCode": "EN",
//                   "countryCode": "AE",
//                   "localizedText": "Assign Product",
//                   "localizedPlaceholder": null,
//                   "localizedHelpText": "Assign products to deal"
//                 },
//                 "options": null,
//                 "actions": null,
//                 "isDefault": false
//               }
//             ],
//             "buttons": []
//           },
//           {
//             "id": 4102,
//             "name": "ProductAssignment",
//             "title": "Product Assignment",
//             "description": "Select category, products and variants",
//             "order": 2,
//             "type": "normal",
//             "fields": [
//               {
//                 "id": 4111,
//                 "fieldName": "category_id",
//                 "fieldType": "Select",
//                 "label": "Select Category*",
//                 "placeholder": "Ready To Eat Snacks",
//                 "helpText": "Select a category for this deal",
//                 "displayName": "Category",
//                 "isRequired": true,
//                 "isReadOnly": false,
//                 "isVisible": true,
//                 "displayOrder": 1,
//                 "maxLength": null,
//                 "minLength": null,
//                 "regexPattern": null,
//                 "defaultValue": null,
//                 "fieldMetadata": {
//                   "dataType": "string",
//                   "inputType": "select",
//                   "endpoint": "/api/v1/Category",
//                   "method": "GET",
//                   "searchable": true,
//                   "params": {
//                     "categoryId": "{category_id}"
//                   },
//                   "accessibility": {
//                     "ariaLabel": "Select category",
//                     "ariaRequired": true
//                   }
//                 },
//                 "localization": {
//                   "languageCode": "EN",
//                   "countryCode": "AE",
//                   "localizedText": "Select Category",
//                   "localizedPlaceholder": "Ready To Eat Snacks",
//                   "localizedHelpText": "Choose a product category"
//                 },
//                 "options": [
//                   {
//                     "value": "ready_to_eat_snacks",
//                     "label": "Ready To Eat Snacks"
//                   }
//                 ],
//                 "actions": null,
//                 "isDefault": false
//               },
//               {
//                 "id": 4112,
//                 "fieldName": "product_id",
//                 "fieldType": "Select",
//                 "label": "Select Product*",
//                 "placeholder": "Search and select product",
//                 "helpText": "Choose a product to apply this deal",
//                 "displayName": "Product",
//                 "isRequired": true,
//                 "isReadOnly": false,
//                 "isVisible": true,
//                 "displayOrder": 2,
//                 "maxLength": null,
//                 "minLength": null,
//                 "regexPattern": null,
//                 "defaultValue": null,
//                 "fieldMetadata": {
//                   "dataType": "string",
//                   "inputType": "select",
//                   "searchable": true,
//                   "endpoint": "/api/v1/Products",
//                   "method": "GET",
//                   "params": {
//                     "categoryId": "{category_id}"
//                   },
//                   "accessibility": {
//                     "ariaLabel": "Select product for deal",
//                     "ariaRequired": true,
//                     "ariaDescription": "Search and select a product"
//                   }
//                 },
//                 "localization": {
//                   "languageCode": "EN",
//                   "countryCode": "AE",
//                   "localizedText": "Select Product",
//                   "localizedPlaceholder": "Search and select product",
//                   "localizedHelpText": "Search by product name or SKU"
//                 },
//                 "options": [
//                   {
//                     "value": "maggie",
//                     "label": "Maggie"
//                   }
//                 ],
//                 "actions": null,
//                 "isDefault": false
//               },
//               {
//                 "id": 4113,
//                 "fieldName": "variant",
//                 "fieldType": "MultiSelect",
//                 "label": "Select Variants*",
//                 "placeholder": "Search and select variants",
//                 "helpText": "Choose one or more variants to apply this deal",
//                 "displayName": "Variants",
//                 "isRequired": true,
//                 "isReadOnly": false,
//                 "isVisible": true,
//                 "displayOrder": 3,
//                 "maxLength": null,
//                 "minLength": null,
//                 "regexPattern": null,
//                 "defaultValue": null,
//                 "fieldMetadata": {
//                   "dataType": "array",
//                   "inputType": "multiselect",
//                   "arrayItemType": "string",
//                   "searchable": true,
//                   "endpoint": "/api/v1/Products/variants",
//                   "method": "GET",
//                   "params": {
//                     "productId": "{product_id}",
//                     "categoryId": "{category_id}"
//                   },
//                   "accessibility": {
//                     "ariaLabel": "Select variants for deal",
//                     "ariaRequired": true,
//                     "ariaDescription": "Search and select multiple variants"
//                   }
//                 },
//                 "localization": {
//                   "languageCode": "EN",
//                   "countryCode": "AE",
//                   "localizedText": "Select Variants",
//                   "localizedPlaceholder": "Search and select variants",
//                   "localizedHelpText": "Search and select product variants"
//                 },
//                 "options": null,
//                 "actions": null,
//                 "isDefault": false
//               },
//               {
//                 "id": 4114,
//                 "fieldName": "btn_save_changes",
//                 "fieldType": "Button",
//                 "label": "Save Changes",
//                 "placeholder": null,
//                 "helpText": null,
//                 "displayName": "Save Changes",
//                 "isRequired": false,
//                 "isReadOnly": false,
//                 "isVisible": true,
//                 "displayOrder": 4,
//                 "maxLength": null,
//                 "minLength": null,
//                 "regexPattern": null,
//                 "defaultValue": null,
//                 "apiCallRequired": true,
//                 "method": "PUT",
//                 "endpoint": "/api/v1/deals",
//                 "fieldMetadata": {
//                   "dataType": "string",
//                   "inputType": "button",
//                   "buttonType": "button",
//                   "accessibility": {
//                     "ariaLabel": "Save Changes button",
//                     "ariaRequired": false
//                   }
//                 },
//                 "localization": {
//                   "languageCode": "EN",
//                   "countryCode": "AE",
//                   "localizedText": "Save Changes",
//                   "localizedPlaceholder": null,
//                   "localizedHelpText": "Save deal changes"
//                 },
//                 "options": null,
//                 "actions": null,
//                 "isDefault": false
//               },
//               {
//                 "id": 4115,
//                 "fieldName": "btn_cancel",
//                 "fieldType": "Button",
//                 "label": "Cancel",
//                 "placeholder": null,
//                 "helpText": null,
//                 "displayName": "Cancel",
//                 "isRequired": false,
//                 "isReadOnly": false,
//                 "isVisible": true,
//                 "displayOrder": 5,
//                 "maxLength": null,
//                 "minLength": null,
//                 "regexPattern": null,
//                 "defaultValue": null,
//                 "apiCallRequired": false,
//                 "method": null,
//                 "endpoint": null,
//                 "fieldMetadata": {
//                   "dataType": "string",
//                   "inputType": "button",
//                   "buttonType": "button",
//                   "accessibility": {
//                     "ariaLabel": "Cancel button",
//                     "ariaRequired": false
//                   }
//                 },
//                 "localization": {
//                   "languageCode": "EN",
//                   "countryCode": "AE",
//                   "localizedText": "Cancel",
//                   "localizedPlaceholder": null,
//                   "localizedHelpText": "Cancel and go back"
//                 },
//                 "options": null,
//                 "actions": null,
//                 "isDefault": false
//               }
//             ],
//             "buttons": []
//           }
//         ]
//       }
//     ]
//   };
//   const AssignProducts = ({route}) => {
//     const navigation = useNavigation();
//     const { selectedField } = route.params;
//      console.log("dealDetails",selectedField)

//     return (
//       <View style={{flex: 1}}>
//         <DynamicScreen apiResponsedata={mockGetAllProductModal} btnTitle={"Save Changes"}
//         headerTitle={mockGetAllProductModal.title}
//         navigation={navigation} />
//       </View>
//     );
//   };

//   const styles = StyleSheet.create({});

// // // --- Centralized Color Palette ---
// // const Colors = {
// //     primaryOrange: '#FF8719',
// //     lightOrangeBg: '#fbe2c8',
// //     darkText: '#3D3A3A',
// //     mediumText: '#858D9D',
// //     labelGray: '#858D9D',
// //     white: '#fff',
// //     lightBg: '#f5f5f5',
// //     borderColor: '#ddd',
// //     activeGreen: '#D1FAE5',
// //     activeGreenText: '#2B947D',
// //     offerHighlight: '#FEEAD7',
// //     title:'#161B25',
// //     black:'#000000',
// //     inactiveGray: '#eee',
// //     modalBackground: 'rgba(0, 0, 0, 0.5)',
// // };

// // // --- Reusable Component for MultiSelect Modal (Omitted for brevity, assumed unchanged) ---
// // const MultiSelectModal = ({ isVisible, onClose, options, selectedValues, onSave, label }) => {
// //     // Local state to manage selections temporarily inside the modal
// //     const [tempSelectedValues, setTempSelectedValues] = useState(selectedValues || []);

// //     // Effect to reset local state when modal opens or selectedValues change externally
// //     useEffect(() => {
// //         setTempSelectedValues(selectedValues || []);
// //     }, [selectedValues, isVisible]);

// //     const handleToggleSelect = (value) => {
// //         setTempSelectedValues(prev => {
// //             if (prev.includes(value)) {
// //                 // Deselect
// //                 return prev.filter(v => v !== value);
// //             } else {
// //                 // Select
// //                 return [...prev, value];
// //             }
// //         });
// //     };

// //     const handleSave = () => {
// //         onSave(tempSelectedValues);
// //     };

// //     return (
// //         <Modal
// //             animationType="slide"
// //             transparent={true}
// //             visible={isVisible}
// //             onRequestClose={onClose}
// //         >
// //             <View style={assignStyles.modalOverlay}>
// //                 <View style={assignStyles.modalView}>

// //                     {/* Modal Header */}
// //                     <View style={assignStyles.modalHeader}>
// //                         <Text style={assignStyles.modalTitle}>Select {label}</Text>
// //                         <TouchableOpacity onPress={onClose} style={assignStyles.closeButton}>
// //                             <Ionicons name="close" size={24} color={Colors.darkText} />
// //                         </TouchableOpacity>
// //                     </View>

// //                     {/* Options List */}
// //                     <ScrollView style={assignStyles.modalList}>
// //                         {options.length > 0 ? options.map((option) => {
// //                             const isSelected = tempSelectedValues.includes(option.value);
// //                             return (
// //                                 <TouchableOpacity
// //                                     key={option.value}
// //                                     style={assignStyles.modalItem}
// //                                     onPress={() => handleToggleSelect(option.value)}
// //                                 >
// //                                     <Text style={assignStyles.modalItemText}>{option.label}</Text>
// //                                     <Ionicons
// //                                         name={isSelected ? "checkbox" : "square-outline"}
// //                                         size={24}
// //                                         color={isSelected ? Colors.primaryOrange : Colors.mediumText}
// //                                     />
// //                                 </TouchableOpacity>
// //                             );
// //                         }) : (
// //                             <Text style={assignStyles.infoText}>No options available.</Text>
// //                         )}
// //                     </ScrollView>

// //                     {/* Action Buttons */}
// //                     <View style={assignStyles.modalActionRow}>
// //                         <TouchableOpacity style={assignStyles.modalCancelBtn} onPress={onClose}>
// //                             <Text style={assignStyles.cancelButtonText}>Cancel</Text>
// //                         </TouchableOpacity>
// //                         <TouchableOpacity style={assignStyles.modalSaveBtn} onPress={handleSave}>
// //                             <Text style={assignStyles.saveButtonText}>Save ({tempSelectedValues.length})</Text>
// //                         </TouchableOpacity>
// //                     </View>
// //                 </View>
// //             </View>
// //         </Modal>
// //     );
// // };

// // // --- MultiSelectInput Component (Omitted for brevity, assumed unchanged) ---
// // const MultiSelectInput = ({ label, options, selectedValues, onSelect, placeholder }) => {

// //     // Map selectedValues (array of IDs) to display labels
// //     const selectedDisplayItems = options.filter(option =>
// //         selectedValues && selectedValues.includes(option.value)
// //     );

// //     return (
// //         <View style={assignStyles.inputContainer}>
// //             <Text style={assignStyles.label}>{label}</Text>
// //             {/* The onSelect function opens the Modal */}
// //             <TouchableOpacity
// //                 style={assignStyles.variantDropdownContainer}
// //                 onPress={onSelect}
// //                 activeOpacity={0.7}
// //             >
// //                 <View style={assignStyles.variantTagsWrapper}>
// //                     {selectedDisplayItems.length > 0 ? selectedDisplayItems.map((variant, index) => (
// //                         <View key={index} style={assignStyles.variantTag}>
// //                             {/* Display option.label */}
// //                             <Text style={assignStyles.variantTagText}>{variant.label}</Text>
// //                         </View>
// //                     )) : (
// //                         <Text style={[assignStyles.dropdownText, {color: Colors.mediumText}]}>
// //                             {placeholder || 'Select value'}
// //                         </Text>
// //                     )}
// //                 </View>
// //                 <Feather name="chevron-down" size={20} color={Colors.mediumText} />
// //             </TouchableOpacity>
// //         </View>
// //     );
// // };

// // // --- Reusable Component for the Deal Summary Card (Omitted for brevity, assumed unchanged) ---
// // const DealSummaryCard = ({ dealName, discountType, offer, validity, status }) => {
// //     const getStatusStyle = useMemo(() => {
// //         const is_Active = status === 'Active';
// //         return {
// //             badge: {
// //                 backgroundColor: is_Active ? Colors.activeGreen : Colors.inactiveGray,
// //                 paddingHorizontal: 8,
// //                 paddingVertical: 4,
// //                 borderRadius: 6,
// //                 alignSelf: 'flex-start',
// //                 marginRight: 15,
// //             },
// //             text: {
// //                 fontSize: 12,
// //                 fontWeight: '600',
// //                 color: is_Active ? Colors.activeGreenText : Colors.darkText,
// //             }
// //         };
// //     }, [status]);

// //     return (
// //         <View style={assignStyles.card}>
// //             <View style={assignStyles.cardHeader}>
// //                 <View>
// //                     <Text style={assignStyles.dealName}>{dealName}</Text>
// //                     <Text style={assignStyles.discountType}>{discountType}</Text>
// //                 </View>
// //                 <TouchableOpacity>
// //                     <MaterialCommunityIcons name="dots-vertical" size={24} color={Colors.darkText} />
// //                 </TouchableOpacity>
// //             </View>

// //             <View style={assignStyles.cardBody}>
// //                 <Text style={assignStyles.discountType}>Offer</Text>
// //                 <View style={assignStyles.offerTag}>
// //                     <Text style={assignStyles.offerText}>{offer}</Text>
// //                 </View>

// //                 <View style={assignStyles.validityRow}>
// //                     <View style={{ flex: 1 }}>
// //                         <Text style={assignStyles.validityLabel}>Validity</Text>
// //                         <Text style={assignStyles.validityDates}>{validity}</Text>
// //                     </View>

// //                     <View style={getStatusStyle.badge}>
// //                         <Text style={getStatusStyle.text}>{status}</Text>
// //                     </View>

// //                     <MaterialCommunityIcons
// //                       name={status !== 'Inactive' ? "checkbox-marked" : "checkbox-blank-outline"}
// //                         size={24}
// //                         color={status !== 'Inactive' ? Colors.primaryOrange : Colors.gray}
// //                         style={{ marginLeft: 15 }}
// //                     />
// //                 </View>
// //             </View>
// //         </View>
// //     );
// // };

// // // --- Main Component: AssignProducts ---
// // const AssignProducts = ({ route }) => {
// //     const navigation = useNavigation();
// //     const { dealFormData, isLoading: isLoadingFormSchema, getPageData } = useDealForm();

// //     const { dealDetails } = route.params || {};

// //     const { selectedField } = route.params;

// //     console.log("dealDetails",selectedField)

// //     // 1. Dynamic Data Extraction
// //     const productPageData = useMemo(() => {
// //         // Look for the specific section's data from the deal form schema
// //         return getPageData(dealFormData, 'Deal_ProductAssignment', 'ProductSelection');
// //     }, [dealFormData, getPageData]);

// //     console.log("GGGGG",dealFormData)

// //     // 2. Define API Field Mapping DYNAMICALLY
// //     // This mapping translates frontend keys (snake_case) to API keys (camelCase)
// //     // based on the logcat example you provided.
// //     const API_FIELD_MAPPING = useMemo(() => {
// //         // Base mapping for Deal Details fields (from previous form steps, using snake_case keys)
// //         const baseMapping = {
// //             deal_name: 'dealName',
// //             deal_description: 'dealDescription',
// //             discount_type: 'discountType',
// //             discount_value: 'discountValue',
// //             currency_code: 'currencyCode',
// //             start_date: 'startDate',
// //             end_date: 'endDate',
// //             is_active: 'isActive',
// //         };

// //         if (!productPageData?.fields) return baseMapping;

// //         // Dynamically add mappings for fields on this page (e.g., product selection).
// //         // If the fieldName is 'selected_products' (frontend), the API needs 'productIds'.
// //         // This is a common requirement and must be explicitly defined here or driven by an 'apiName' property in the schema.
// //         return productPageData.fields.reduce((acc, field) => {
// //             // Check for the specific custom product field
// //             if (field.fieldName === 'selected_products') {
// //                 acc[field.fieldName] = 'productIds'; // Custom mapping confirmed
// //             } else {
// //                 // For other dynamic fields, assume snake_case matches an 'apiName' property if available,
// //                 // otherwise, it might need to default or use a convention.
// //                 // Sticking to the essential, confirmed mappings:
// //                 const apiName = field.apiName || field.fieldName;
// //                 acc[field.fieldName] = apiName;
// //             }
// //             return acc;
// //         }, baseMapping);

// //     }, [productPageData]);

// //     // 3. Use the global dynamic form hook
// //     // We pass the dynamic form schema and the existing dealDetails as initial/base data
// //     const {
// //         formData,
// //         handleChange,
// //         handleFormSubmission,
// //         isSubmitting
// //     } = useDynamicForm(productPageData, dealDetails);

// //     // 4. Prepare data for Summary Card (using data from route.params)
// //     const discountTypeLower = dealDetails?.discount_type?.toLowerCase();
// //     const isPercentage = discountTypeLower === 'percentage';
// //     const rawDiscountType = isPercentage ? '%' : (dealDetails?.currency_code || 'Flat');
// //     const displayDiscountType = isPercentage ? 'Percentage Discount' : 'Fixed Discount';

// //     const dealName = dealDetails?.deal_name || 'New Deal';
// //     const discountValue = dealDetails?.discount_value || '0';
// //     const offer = `${discountValue} ${rawDiscountType} OFF`;
// //     const validity = `From: ${dealDetails?.start_date || 'N/A'} - To ${dealDetails?.end_date || 'N/A'}`;
// //     const status = dealDetails?.is_active ? 'Active' : 'Inactive';

// //     // --- Modal State and Handlers ---
// //     const [isModalVisible, setIsModalVisible] = useState(false);
// //     const [currentMultiSelectField, setCurrentMultiSelectField] = useState(null);

// //     const handleMultiSelectOpen = (field) => {
// //         setCurrentMultiSelectField(field);
// //         setIsModalVisible(true);
// //     };

// //     const handleMultiSelectClose = () => {
// //         setIsModalVisible(false);
// //         setCurrentMultiSelectField(null);
// //     };

// //     const handleMultiSelectSave = (selectedItems) => {
// //         if (currentMultiSelectField) {
// //             // Use the generic handleChange from the hook
// //             const fieldName = currentMultiSelectField.fieldName;
// //             handleChange(fieldName, selectedItems);
// //         }
// //         handleMultiSelectClose();
// //     };
// //     // --------------------------------------------------------

// //     // 5. Action Handlers (Delegating submission logic to the hook)
// //     const handleActionClick = async (action) => {
// //         if (!action) return;

// //         // Handle navigation actions (Back/Cancel)
// //         if (action.buttonId === 'btn_cancel' || action.buttonId === 'btn_back' || action.method === 'GET' || action.method === 'NONE') {
// //             navigation.goBack();
// //             return;
// //         }

// //         // Handle submission actions (POST)
// //         if (action.apiCallRequired && action.method === 'POST' && action.endpoint) {

// //             // Define Success callback (specific to AssignProducts)
// //             const onSuccessNavigation = (combinedData) => {
// //                 // combinedData contains all the final data sent to the API, including product IDs
// //                 //navigation.navigate('DealReview', { dealDetails: combinedData });
// //            //     navigation.navigate('DealsDiscountScreen');
// //             };

// //             // Call the generic submission function from the hook
// //             try {
// //                 await handleFormSubmission(action, {
// //                     externalBaseData: dealDetails, // The initial deal info (used as part of the payload)
// //                     apiFieldMapping: API_FIELD_MAPPING, // Passing the dynamically generated mapping
// //                     onSuccessNavigation: onSuccessNavigation // The navigation action after success
// //                 });
// //             } catch (error) {
// //                 // Error handled in hook's onError, but the catch block remains for local error handling if needed
// //                 console.error("Local Form Submission Error:", error);
// //             }
// //         }
// //     };

// //     // 6. Dynamic Field Renderer
// //     const renderProductFields = () => {
// //         if (!productPageData.fields || productPageData.fields.length === 0) {
// //             return (
// //                 <View style={assignStyles.infoBox}>
// //                     <Text style={assignStyles.infoText}>
// //                         <Ionicons name="alert-circle-outline" size={16} color={Colors.darkText} />
// //                         No product selection fields found in the 'ProductSelection' section.
// //                     </Text>
// //                 </View>
// //             );
// //         }

// //         return productPageData.fields.map((field) => {
// //             const fieldLabel = field.localization?.localizedText || field.label;

// //             // Render MultiSelect field
// //             if (field.fieldName === 'selected_products' && field.fieldType === 'MultiSelect') {
// //                 return (
// //                     <MultiSelectInput
// //                         key={field.fieldName}
// //                         label={fieldLabel}
// //                         placeholder={field.localization?.localizedPlaceholder || field.placeholder || 'Select Products'}
// //                         // Use actual form data from the hook
// //                         selectedValues={formData[field.fieldName] || []}
// //                         options={field.options || []}
// //                         // Open the modal on press, passing the field data
// //                         onSelect={() => handleMultiSelectOpen(field)}
// //                     />
// //                 );
// //             }
// //             return null;
// //         });
// //     };

// //     // 7. Loading UI & Dynamic Buttons
// //     if (isLoadingFormSchema) {
// //         return (
// //             <View style={assignStyles.centerContainer}>
// //                 <ActivityIndicator size="large" color={Colors.primaryOrange} />
// //                 <Text style={assignStyles.loadingText}>Loading Product Assignment Form...</Text>
// //             </View>
// //         );
// //     }

// //     // Default actions if not provided by API
// //     const defaultCreateDealAction = {
// //         buttonId: 'btn_create_deal', label: 'Create Deal', type: 'primary',
// //         apiCallRequired: true, method: 'POST', endpoint: '/api/v1/deal'
// //     };

// //     const primaryAction = productPageData.actions.find(a => a.type === 'primary') || defaultCreateDealAction;
// //     const secondaryAction = productPageData.actions.find(a => a.buttonId === 'btn_save_draft') || { buttonId: 'btn_save_draft', label: 'Save Draft', type: 'secondary', apiCallRequired: true, method: 'POST', endpoint: '/api/v1/deal/draft' };
// //     const backAction = productPageData.actions.find(a => a.buttonId === 'btn_back') || { buttonId: 'btn_back', label: 'Back', type: 'secondary', method: 'GET' };

// //     return (
// //         <View style={assignStyles.container}>

// //             {/* --- App Header --- */}
// //             <View style={assignStyles.appHeader}>
// //                 <TouchableOpacity onPress={() => handleActionClick(backAction)}>
// //                     <Ionicons name="arrow-back" size={24} color={Colors.darkText} />
// //                 </TouchableOpacity>
// //                 <Text style={assignStyles.screenTitle}>{productPageData.pageTitle}</Text>
// //                 <View style={{ width: 24 }} />
// //             </View>

// //             <ScrollView contentContainerStyle={assignStyles.scrollViewContent} showsVerticalScrollIndicator={false}>

// //                 {/* 1. Deal Summary Card */}
// //                 <DealSummaryCard
// //                     dealName={dealName}
// //                     discountType={displayDiscountType}
// //                     offer={offer}
// //                     validity={validity}
// //                     status={status}
// //                 />

// //                 {/* 2. Product Selection Area (Dynamic Fields) */}
// //                 <View style={assignStyles.selectionCard}>
// //                     <Text style={assignStyles.sectionTitle}>Product Selection</Text>
// //                     {renderProductFields()}
// //                 </View>

// //                 {/* 3. Action Buttons (Using isSubmitting state from hook) */}
// //                 <View style={assignStyles.buttonRow}>

// //                     {/* Secondary/Back Button */}
// //                     <TouchableOpacity
// //                         style={[assignStyles.cancelButton, isSubmitting && { opacity: 0.5 }]}
// //                         onPress={() => handleActionClick(backAction)}
// //                         disabled={isSubmitting}
// //                     >
// //                         <Text style={assignStyles.cancelButtonText}>{backAction.label}</Text>
// //                     </TouchableOpacity>

// //                     {/* Save Draft Button (Middle) */}
// //                     <TouchableOpacity
// //                         style={[assignStyles.cancelButton, {flex: 1.2, marginHorizontal: 10}, isSubmitting && { opacity: 0.5 }]}
// //                         onPress={() => handleActionClick(secondaryAction)}
// //                         disabled={isSubmitting}
// //                     >
// //                         {isSubmitting && secondaryAction.buttonId === 'btn_save_draft' ? (<ActivityIndicator color={Colors.black} />) : (<Text style={assignStyles.cancelButtonText}>{secondaryAction.label}</Text>)}
// //                     </TouchableOpacity>

// //                     {/* Primary/Create Deal Button */}
// //                     <TouchableOpacity
// //                         style={[assignStyles.saveButton, {flex: 1.5, marginLeft: 0}, isSubmitting && { opacity: 0.5 }]}
// //                         onPress={() => handleActionClick(primaryAction)}
// //                         disabled={isSubmitting}
// //                     >
// //                         {isSubmitting && primaryAction.buttonId === 'btn_create_deal' ? (<ActivityIndicator color={Colors.white} />) : (<Text style={assignStyles.saveButtonText}>{primaryAction.label}</Text>)}
// //                     </TouchableOpacity>
// //                 </View>
// //             </ScrollView>

// //             {/* 4. MultiSelect Modal */}
// //             <MultiSelectModal
// //                 isVisible={isModalVisible}
// //                 onClose={handleMultiSelectClose}
// //                 label={currentMultiSelectField?.localization?.localizedText || currentMultiSelectField?.label || 'Items'}
// //                 options={currentMultiSelectField?.options || []}
// //                 selectedValues={formData[currentMultiSelectField?.fieldName] || []}
// //                 onSave={handleMultiSelectSave}
// //             />

// //         </View>
// //     );
// // };

// // // --- Stylesheet (Omitted for brevity, assumed unchanged) ---
// // const assignStyles = StyleSheet.create({
// //     container: { flex: 1, backgroundColor: Colors.lightBg },
// //     centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightBg },
// //     loadingText: { marginTop: 10, fontSize: 16, color: Colors.darkText },
// //     scrollViewContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10 },

// //     // Header Styles
// //     appHeader: {
// //         flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
// //         paddingTop: Platform.OS === 'android' ? 40 : 50, paddingHorizontal: 20, paddingBottom: 15,
// //         backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.borderColor,
// //     },
// //     screenTitle: { fontSize: 18, fontWeight: '500', color: Colors.title },

// //     // Card Styles
// //     card: {
// //         backgroundColor: Colors.white, borderRadius: 12, padding: 20, marginBottom: 15,
// //         elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
// //     },
// //     selectionCard: {
// //         backgroundColor: Colors.white, borderRadius: 12, padding: 20,
// //         elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
// //     },
// //     sectionTitle: { fontSize: 16, fontWeight: '600', color: Colors.darkText, marginBottom: 15 },
// //     infoBox: {
// //         backgroundColor: Colors.lightOrangeBg,
// //         padding: 15,
// //         borderRadius: 8,
// //         marginVertical: 10,
// //     },
// //     infoText: {
// //         color: Colors.darkText,
// //         fontSize: 14,
// //         fontWeight: '500',
// //     },
// //     cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
// //     dealName: { fontSize: 18, fontWeight: '600', color: Colors.darkText },
// //     discountType: { fontSize: 14, color: Colors.mediumText, marginBottom: 10 },
// //     cardBody: { marginTop: 10 },
// //     offerTag: {
// //         backgroundColor: Colors.offerHighlight, paddingHorizontal: 8, paddingVertical: 4,
// //         borderRadius: 6, alignSelf: 'flex-start', marginBottom: 10,
// //     },
// //     offerText: { fontSize: 14, fontWeight: '600', color: '#FF7A00' },
// //     validityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
// //     validityLabel: { fontSize: 12, color: Colors.mediumText },
// //     validityDates: { fontSize: 14, fontWeight: '500', color: '#5D6679', marginTop: 2 },

// //     // Variant/MultiSelect Selector Styles
// //     inputContainer: { marginBottom: 15 },
// //     label: { fontSize: 14, fontWeight: '500', color: Colors.labelGray, marginBottom: 5 },
// //     dropdownText: { fontSize: 16, color: Colors.black, fontWeight: '400' },
// //     variantDropdownContainer: {
// //         flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
// //         borderWidth: 1, borderColor: Colors.borderColor, borderRadius: 8,
// //         paddingHorizontal: 10, paddingVertical: Platform.OS === 'android' ? 5 : 10,
// //         backgroundColor: Colors.white, minHeight: 50,
// //     },
// //     variantTagsWrapper: { flexDirection: 'row', flexWrap: 'wrap', flex: 1, alignItems: 'center' },
// //     variantTag: {
// //         flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.lightBg,
// //         borderWidth: 1, borderColor: Colors.borderColor, borderRadius: 20,
// //         paddingVertical: 4, paddingHorizontal: 8, marginRight: 8, marginVertical: 4,
// //     },
// //     variantTagText: { fontSize: 13, color: '#48505E' },

// //     // Button Styles
// //     buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
// //     saveButton: {
// //         flex: 1, backgroundColor: Colors.primaryOrange, paddingVertical: 14,
// //         borderRadius: 8, alignItems: 'center', marginLeft: 10,
// //     },
// //     saveButtonText: { fontSize: 16, fontWeight: '700', color: Colors.white },
// //     cancelButton: {
// //         flex: 1, backgroundColor: '#FFFAF5', paddingVertical: 14,
// //         borderRadius: 8, alignItems: 'center', marginRight: 10,
// //         borderWidth: 1, borderColor: Colors.borderColor,
// //     },
// //     cancelButtonText: { fontSize: 16, fontWeight: '700', color: Colors.black },

// //     // --- Modal Styles ---
// //     modalOverlay: {
// //         flex: 1,
// //         backgroundColor: Colors.modalBackground,
// //         justifyContent: 'flex-end',
// //     },
// //     modalView: {
// //         backgroundColor: Colors.white,
// //         borderTopLeftRadius: 20,
// //         borderTopRightRadius: 20,
// //         paddingHorizontal: 20,
// //         height: '75%', // Modal takes up 75% of the screen height
// //         elevation: 5,
// //         shadowColor: '#000',
// //         shadowOffset: { width: 0, height: -2 },
// //         shadowOpacity: 0.25,
// //         shadowRadius: 4,
// //     },
// //     modalHeader: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         paddingVertical: 15,
// //         borderBottomWidth: 1,
// //         borderBottomColor: Colors.borderColor,
// //     },
// //     modalTitle: {
// //         fontSize: 18,
// //         fontWeight: '600',
// //         color: Colors.darkText,
// //     },
// //     closeButton: {
// //         padding: 5,
// //     },
// //     modalList: {
// //         flex: 1,
// //         paddingVertical: 10,
// //     },
// //     modalItem: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         paddingVertical: 15,
// //         borderBottomWidth: 1,
// //         borderBottomColor: Colors.lightBg,
// //     },
// //     modalItemText: {
// //         fontSize: 16,
// //         color: Colors.darkText,
// //         flex: 1,
// //     },
// //     modalActionRow: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         paddingVertical: 15,
// //         borderTopWidth: 1,
// //         borderTopColor: Colors.borderColor,
// //     },
// //     modalSaveBtn: {
// //         flex: 1,
// //         backgroundColor: Colors.primaryOrange,
// //         paddingVertical: 14,
// //         borderRadius: 8,
// //         alignItems: 'center',
// //         marginLeft: 10,
// //     },
// //     modalCancelBtn: {
// //         flex: 1,
// //         backgroundColor: Colors.lightBg,
// //         paddingVertical: 14,
// //         borderRadius: 8,
// //         alignItems: 'center',
// //         marginRight: 10,
// //         borderWidth: 1,
// //         borderColor: Colors.borderColor,
// //     },
// // });

// export default AssignProducts;
