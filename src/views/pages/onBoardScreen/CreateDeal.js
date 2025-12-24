import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Switch} from 'react-native';

// --- Centralized Color Palette (Copied from previous component for consistency) ---
const Colors = {
  // Primary & CTA Colors
  primaryOrange: '#ff9933',
  lightOrangeBg: '#fbe2c8', // Text Colors
  darkText: '#858D9D',
  mediumText: '#555',
  lightText: '#000000', // Backgrounds & Borders
  white: '#fff',
  lightBg: '#f5f5f5',
  borderColor: '#ddd', // Status Colors
  activeGreen: '#4CAF50',
  inactiveGray: '#eee',
  inputBorder: '#ccc',
};

// --- Reusable Component for Labeled Input Field ---
const FormInput = ({label, placeholder, isRequired, value, onChangeText}) => {
  return (
    <View style={formStyles.inputContainer}>
      <Text style={formStyles.label}>
        {label}
        {isRequired && <Text style={formStyles.requiredStar}>*</Text>}
      </Text>
      <TextInput
        style={formStyles.textInput}
        placeholder={placeholder}
        placeholderTextColor={Colors.lightText}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

// --- Reusable Component for Date Picker Field ---
const DatePickerInput = ({label, value, onPressHandler}) => {
  // This function is called when the date input is pressed.
  const handlePress = () => {
    if (onPressHandler) {
      onPressHandler();
    } else {
      // Placeholder log to indicate that the date picker should open here.
      console.log(`Placeholder: Date picker should open for ${label}`);
    }
  };
  return (
    <View style={formStyles.datePickerContainer}>
      <Text style={formStyles.label}>{label}</Text>
      <TouchableOpacity style={formStyles.dateInput} onPress={handlePress}>
        <Ionicons name="calendar-outline" size={20} color={Colors.mediumText} />
        <Text style={formStyles.dateText}>{value}</Text>
        <Feather name="chevron-down" size={20} color={Colors.mediumText} />
      </TouchableOpacity>
    </View>
  );
};

// --- Main Component: CreateDeal ---
const CreateDeal = () => {
  // 🟢 State for Form Fields
  const [dealName, setDealName] = useState('');
  const [discountType, setDiscountType] = useState(''); // Assuming initial value
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('Start Date'); // Placeholder
  const [endDate, setEndDate] = useState('Start Date'); // Placeholder (Note: Screenshot shows 'Start Date' for both 'From' and 'To')
  const [isActive, setIsActive] = useState(true); // State for the toggle switch

  const handleCreateDeal = () => {
    // Implement deal creation logic here
    console.log('Deal Name:', dealName);
    console.log('Discount Type:', discountType);
    console.log('Amount:', amount);
    console.log('Status:', isActive ? 'Active' : 'Disable');
    // Close modal/navigate back after API call
  };
  // Placeholder function to open the date picker for the start date
  const openStartDatePicker = () => {
    // In a real application, you would use a library like
    // @react-native-community/datetimepicker or a custom modal here.
    console.log('Start Date Picker opened!');
    // Example: showDatePicker({ date: new Date(), onChange: (event, date) => setStartDate(date) })
  };
  const navigation = useNavigation();
  return (
    <View style={formStyles.container}>
      {/* --- App Header (Back and Title) --- */}
      <View style={formStyles.appHeader}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={''}
          onPress={() => navigation.goBack()}
        />
        <Text style={formStyles.screenTitle}>Create Deals</Text>
        {/* Placeholder for alignment */}
        <View style={{width: 24}} />
      </View>

      <ScrollView
        contentContainerStyle={formStyles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <View style={formStyles.card}>
          {/* 1. Deal Name Input */}
          <FormInput
            label="Deal Name"
            placeholder="Summer Sale"
            isRequired={true}
            value={dealName}
            onChangeText={setDealName}
          />

          {/* 2. Discount Type Input (Dropdown style) */}
          <FormInput
            label="Discount Type"
            placeholder="Amount"
            value={discountType} // Value from state
            isRequired={true}
            isDropdown={false}
            // You'd typically open a selection modal here
          />

          {/* 3. Amount Input */}
          <FormInput
            label="Amount"
            placeholder="Enter Amount"
            isRequired={true}
            value={amount}
            onChangeText={setAmount}
          />

          {/* 4. Date Row (From and To) */}
          <View style={formStyles.dateRow}>
            <DatePickerInput
              label="From"
              value={startDate}
              onPressHandler={openStartDatePicker}
            />
            <DatePickerInput
              label="To"
              value={endDate}
              onPressHandler={openStartDatePicker}
            />
          </View>

          {/* 5. Active / Disable Toggle */}
          <View style={formStyles.toggleRow}>
            <Text style={formStyles.toggleLabel}>Active / Disable</Text>
            <View style={formStyles.toggleSwitchContainer}>
              <Switch
                trackColor={{
                  false: Colors.inactiveGray,
                  true: Colors.primaryOrange,
                }}
                thumbColor={Colors.white}
                onValueChange={setIsActive}
                value={isActive}
              />
              <Text style={formStyles.toggleStatus}>
                {isActive ? 'Active' : 'Disable'}
              </Text>
            </View>
          </View>

          {/* 6. Action Buttons */}
          <View style={formStyles.buttonRow}>
            <TouchableOpacity
              style={formStyles.assignButton}
              onPress={() => navigation.navigate('AssignProducts')}>
              <Text style={formStyles.assignButtonText}>Assign Product</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={formStyles.cancelButton}
              onPress={() => console.log('Cancel')}>
              <Text style={formStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// --- Stylesheet for CreateDeal Component ---
const formStyles = StyleSheet.create({
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
    color: '#161B25',
  },

  // --- Card Styles ---
  card: {
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

  // --- Input Field Styles ---
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.darkText,
    marginBottom: 5,
  },
  requiredStar: {
    color: 'red',
    fontSize: 14,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 8 : 12,
    fontSize: 16,
    color: Colors.darkText,
    backgroundColor: Colors.white,
  },

  // Dropdown specific styles
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
    color: Colors.darkText,
    fontWeight: '400',
  },

  // --- Date Picker Styles ---
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  datePickerContainer: {
    flex: 1,
    marginRight: 10,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'android' ? 8 : 12,
    backgroundColor: Colors.white,
  },
  dateText: {
    fontSize: 15,
    color: Colors.darkText,
    fontWeight: '400',
  },

  // --- Toggle Styles ---
  toggleRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 10,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.darkText,
  },
  toggleSwitchContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  toggleStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.darkText,
    marginLeft: 10,
  },

  // --- Button Styles ---
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  assignButton: {
    flex: 1,
    backgroundColor: Colors.primaryOrange,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  assignButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.white,
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
    color: Colors.mediumText,
  },
});

export default CreateDeal;

//10-12-2025
// import React, { useState, useMemo } from 'react';
// import {
//     View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, Platform,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// // Import necessary components and hook
// // NOTE: Assuming useDealForm is a wrapper around the dynamic submission logic
// import useDealForm from '../../../hooks/useDealForm';
// import FormInput from '../../components/CreateDeals/FormInput';
// import CustomSwitchButton from '../../components/CreateDeals/CustomSwitchButton';
// import BothButtons from '../../components/CreateDeals/BothButtons';
// import Header from '../../components/Header';

// import DynamicScreen from './DynamicScreen.js/DynamicScreen';

// // --- Constants and Mock Components ---

// const mockGetAllProductModal = {
//   "pageGroupName": "Deal_Creation",
//   "title": "Deal_Creation",
//   "description": "Complete deal and discount creation workflow with product assignment",
//   "pages": [
//     {
//       "pageId": 1,
//       "pageName": "Ecommerce_Deal_BasicInformation",
//       "title": "Create Deals",
//       "subtitle": "Configure deal name, discount type, amount, and validity period",
//       "description": "Create Deals",
//       "order": 1,
//       "sections": [
//         {
//           "id": 4001,
//           "name": "DealBasicInformation",
//           "title": "Deal Basic Information",
//           "description": "Basic deal information and settings",
//           "order": 1,
//           "type": "normal",
//           "fields": [
//             {
//               "id": 4001,
//               "fieldName": "deal_name",
//               "fieldType": "Text",
//               "label": "Deal Name*",
//               "placeholder": "Summer Sale",
//               "helpText": "A descriptive name for this deal or discount offer",
//               "displayName": "Deal Name",
//               "isRequired": true,
//               "isReadOnly": false,
//               "isVisible": true,
//               "displayOrder": 1,
//               "maxLength": 200,
//               "minLength": 3,
//               "regexPattern": null,
//               "defaultValue": null,
//               "fieldMetadata": {
//                 "dataType": "string",
//                 "inputType": "text",
//                 "autocomplete": "off",
//                 "accessibility": {
//                   "ariaLabel": "Deal name",
//                   "ariaRequired": true
//                 }
//               },
//               "localization": {
//                 "languageCode": "EN",
//                 "countryCode": "AE",
//                 "localizedText": "Deal Name",
//                 "localizedPlaceholder": "Summer Sale",
//                 "localizedHelpText": "Provide a clear name for this deal"
//               },
//               "options": null,
//               "actions": null,
//               "isDefault": false
//             },
//             {
//               "id": 4002,
//               "fieldName": "discount_type",
//               "fieldType": "Select",
//               "label": "Discount Type*",
//               "placeholder": "Select discount type",
//               "helpText": "Choose the discount type",
//               "displayName": "Discount Type",
//               "isRequired": true,
//               "isReadOnly": false,
//               "isVisible": true,
//               "displayOrder": 2,
//               "maxLength": null,
//               "minLength": null,
//               "regexPattern": null,
//               "defaultValue": null,
//               "fieldMetadata": {
//                 "dataType": "string",
//                 "inputType": "select",
//                 "accessibility": {
//                   "ariaLabel": "Discount type",
//                   "ariaRequired": true
//                 }
//               },
//               "localization": {
//                 "languageCode": "EN",
//                 "countryCode": "AE",
//                 "localizedText": "Discount Type",
//                 "localizedPlaceholder": "Select type",
//                 "localizedHelpText": "Choose discount type"
//               },
//               "options": [
//                 {
//                   "value": "Offer",
//                   "label": "Offer"
//                 },
//                 {
//                   "value": "20% OFF",
//                   "label": "20% OFF"
//                 }
//               ],
//               "actions": null,
//               "isDefault": false
//             },
//             {
//               "id": 4003,
//               "fieldName": "amount",
//               "fieldType": "Number",
//               "label": "Amount",
//               "placeholder": "Enter Amount",
//               "helpText": "Enter the discount amount",
//               "displayName": "Amount",
//               "isRequired": false,
//               "isReadOnly": false,
//               "isVisible": true,
//               "displayOrder": 3,
//               "maxLength": null,
//               "minLength": null,
//               "regexPattern": null,
//               "defaultValue": null,
//               "fieldMetadata": {
//                 "dataType": "decimal",
//                 "inputType": "number",
//                 "decimalPlaces": 2,
//                 "min": 0,
//                 "step": 0.01,
//                 "accessibility": {
//                   "ariaLabel": "Amount",
//                   "ariaRequired": false
//                 }
//               },
//               "localization": {
//                 "languageCode": "EN",
//                 "countryCode": "AE",
//                 "localizedText": "Amount",
//                 "localizedPlaceholder": "Enter Amount",
//                 "localizedHelpText": "Discount amount value"
//               },
//               "options": null,
//               "actions": null,
//               "isDefault": false
//             }
//           ],
//           "buttons": []
//         },
//         {
//           "id": 4002,
//           "name": "ValidityPeriod",
//           "title": "Validity Period",
//           "description": "Select the validity period for this deal",
//           "order": 2,
//           "type": "inline",
//           "fields": [
//             {
//               "id": 4004,
//               "fieldName": "from_date",
//               "fieldType": "DateTime",
//               "label": "From Date",
//               "placeholder": "Select from date",
//               "helpText": "Deal start date",
//               "displayName": "From Date",
//               "isRequired": true,
//               "isReadOnly": false,
//               "isVisible": true,
//               "displayOrder": 1,
//               "maxLength": null,
//               "minLength": null,
//               "regexPattern": null,
//               "defaultValue": null,
//               "fieldMetadata": {
//                 "dataType": "datetime",
//                 "inputType": "datetime-local",
//                 "accessibility": {
//                   "ariaLabel": "From date",
//                   "ariaRequired": true
//                 }
//               },
//               "localization": {
//                 "languageCode": "EN",
//                 "countryCode": "AE",
//                 "localizedText": "From Date",
//                 "localizedPlaceholder": "Select from date",
//                 "localizedHelpText": "Deal start date and time"
//               },
//               "options": null,
//               "actions": null,
//               "isDefault": false
//             },
//             {
//               "id": 4005,
//               "fieldName": "to_date",
//               "fieldType": "DateTime",
//               "label": "To Date",
//               "placeholder": "Select to date",
//               "helpText": "Deal end date",
//               "displayName": "To Date",
//               "isRequired": true,
//               "isReadOnly": false,
//               "isVisible": true,
//               "displayOrder": 2,
//               "maxLength": null,
//               "minLength": null,
//               "regexPattern": null,
//               "defaultValue": null,
//               "fieldMetadata": {
//                 "dataType": "datetime",
//                 "inputType": "datetime-local",
//                 "dependsOn": "from_date",
//                 "accessibility": {
//                   "ariaLabel": "To date",
//                   "ariaRequired": true,
//                   "ariaDescription": "Must be after from date"
//                 }
//               },
//               "localization": {
//                 "languageCode": "EN",
//                 "countryCode": "AE",
//                 "localizedText": "To Date",
//                 "localizedPlaceholder": "Select to date",
//                 "localizedHelpText": "Deal expiration date and time"
//               },
//               "options": null,
//               "actions": null,
//               "isDefault": false
//             }
//           ],
//           "buttons": []
//         },
//         {
//           "id": 4003,
//           "name": "ActiveStatus",
//           "title": "Active Status",
//           "description": "Enable or disable this deal",
//           "order": 3,
//           "type": "normal",
//           "fields": [
//             {
//               "id": 4006,
//               "fieldName": "is_active",
//               "fieldType": "Checkbox",
//               "label": "Active",
//               "placeholder": null,
//               "helpText": "Enable or disable this deal immediately",
//               "displayName": "Active",
//               "isRequired": false,
//               "isReadOnly": false,
//               "isVisible": true,
//               "displayOrder": 1,
//               "maxLength": null,
//               "minLength": null,
//               "regexPattern": null,
//               "defaultValue": "true",
//               "fieldMetadata": {
//                 "dataType": "boolean",
//                 "inputType": "checkbox",
//                 "accessibility": {
//                   "ariaLabel": "Active or disable deal",
//                   "ariaRequired": false,
//                   "ariaDescription": "Toggle deal activation status"
//                 }
//               },
//               "localization": {
//                 "languageCode": "EN",
//                 "countryCode": "AE",
//                 "localizedText": "Active",
//                 "localizedPlaceholder": null,
//                 "localizedHelpText": "Enable to activate deal immediately"
//               },
//               "options": null,
//               "actions": null,
//               "isDefault": false
//             }
//           ],
//           "buttons": []
//         },
//         {
//           "id": 4004,
//           "name": "NavigationActions",
//           "title": "",
//           "description": "",
//           "order": 4,
//           "type": "inline",
//           "fields": [
//             {
//               "id": 4007,
//               "fieldName": "btn_assign_product",
//               "fieldType": "Button",
//               "label": "Assign Product",
//               "placeholder": null,
//               "helpText": null,
//               "displayName": "Assign Product",
//               "isRequired": false,
//               "isReadOnly": false,
//               "isVisible": true,
//               "displayOrder": 1,
//               "maxLength": null,
//               "minLength": null,
//               "regexPattern": null,
//               "defaultValue": null,
//               "apiCallRequired": false,
//               "method": null,
//               "endpoint": null,
//               "fieldMetadata": {
//                 "dataType": "string",
//                 "inputType": "button",
//                 "buttonType": "button_slidenext",
//                 "accessibility": {
//                   "ariaLabel": "Assign Product button",
//                   "ariaRequired": false
//                 }
//               },
//               "localization": {
//                 "languageCode": "EN",
//                 "countryCode": "AE",
//                 "localizedText": "Assign Product",
//                 "localizedPlaceholder": null,
//                 "localizedHelpText": "Navigate to assign products"
//               },
//               "options": null,
//               "actions": null,
//               "isDefault": false
//             },
//             {
//               "id": 4008,
//               "fieldName": "btn_cancel",
//               "fieldType": "Button",
//               "label": "Cancel",
//               "placeholder": null,
//               "helpText": null,
//               "displayName": "Cancel",
//               "isRequired": false,
//               "isReadOnly": false,
//               "isVisible": true,
//               "displayOrder": 2,
//               "maxLength": null,
//               "minLength": null,
//               "regexPattern": null,
//               "defaultValue": null,
//               "apiCallRequired": false,
//               "method": null,
//               "endpoint": null,
//               "fieldMetadata": {
//                 "dataType": "string",
//                 "inputType": "button",
//                 "buttonType": "button",
//                 "accessibility": {
//                   "ariaLabel": "Cancel button",
//                   "ariaRequired": false
//                 }
//               },
//               "localization": {
//                 "languageCode": "EN",
//                 "countryCode": "AE",
//                 "localizedText": "Cancel",
//                 "localizedPlaceholder": null,
//                 "localizedHelpText": "Cancel and go back"
//               },
//               "options": null,
//               "actions": null,
//               "isDefault": false
//             }
//           ],
//           "buttons": []
//         }
//       ]
//     },

//   ]
// };
//   const CreateDeal = () => {
//     const navigation = useNavigation();
//     return (
//       <View style={{flex: 1}}>
//         <DynamicScreen apiResponsedata={mockGetAllProductModal} btnTitle={"Save Changes"}
//         headerTitle={mockGetAllProductModal.title}
//         navigation={navigation} />
//       </View>
//     );
//   };

//   export default CreateDeal;

//   const styles = StyleSheet.create({});

// // const Colors = {
// //     darkText: '#161B25', mediumText: '#555', lightBg: '#f5f5f5',
// //     white: '#fff', borderColor: '#ddd', primary: '#FF5722'
// // };
// // const DateTimePicker = ({ isVisible, mode, value, onChange }) => {
// //     if (!isVisible) return null;
// //     Alert.alert("Native Date Picker Triggered", `Date Picker should appear now.`, [{ text: "Cancel", style: 'cancel', onPress: () => onChange(null, null) }, { text: "Select Date (Mock)", onPress: () => { onChange(null, new Date()); } }]);
// //     return null;
// // };
// // const formatDate = (date) => {
// //     // Only return formatted date if 'date' is a valid date object
// //     if (date && date instanceof Date && !isNaN(date)) {
// //         const day = String(date.getDate()).padStart(2, '0');
// //         const month = String(date.getMonth() + 1).padStart(2, '0');
// //         const year = date.getFullYear();
// //         return `${day}/${month}/${year}`;
// //     }
// //     return ''; // Return empty string if date is invalid/null
// // };
// // // ------------------------------------

// // const CreateDeal = () => {
// //     const navigation = useNavigation();
// //     // Use the provided hook, assuming 'createNewDeal' is the submission function
// //     const { dealFormData, isLoading, dealFormError, createNewDeal } = useDealForm();

// //     // --- Data Parsing: Extract fields and dynamic buttons from the first page ---
// //     const pageData = useMemo(() => {
// //         if (!dealFormData || !dealFormData.pages) return { fields: [], pageTitle: 'Create Deal', actions: [] };

// //         // Target: Page 'Deal_BasicInformation', Section 'DealDetails'
// //         const page = dealFormData.pages.find(p => p.pageName === 'Deal_BasicInformation');
// //         const section = page?.sections.find(s => s.name === 'DealDetails');

// //         let buttons = section?.buttons || [];

// //         // Manually adding the 'Cancel' button (Secondary type)
// //         if (!buttons.find(b => b.buttonId === 'btn_cancel')) {
// //             buttons = [
// //                 { buttonId: 'btn_cancel', label: 'Cancel', type: 'secondary', apiCallRequired: false, method: 'NONE', endpoint: null },
// //                 ...buttons
// //             ];
// //         }

// //         return {
// //             fields: section?.fields || [],
// //             pageTitle: page?.title || 'Deal Basic Information',
// //             actions: buttons,
// //         };
// //     }, [dealFormData]);

// //     console.log("dealFormData",dealFormData)

// //     // --- State & Initialization ---
// //     const initialState = useMemo(() => {
// //        return pageData.fields.reduce((acc, field) => {
// //            let defaultValue = ''; // Start with empty string
// //             if (field.fieldName === 'is_active') {
// //                 // Ensure boolean fields are initialized as boolean
// //                 defaultValue = field.defaultValue !== null ? !!field.defaultValue : true;
// //             } else if (field.fieldType === 'DateTime') {
// //                 defaultValue = '';
// //             } else if (field.fieldType === 'Select' && !defaultValue) {
// //                 defaultValue = 'Select value';
// //             } else {
// //                  // For all others, attempt to use defaultValue as string, or empty string
// //                  defaultValue = field.defaultValue !== null && field.defaultValue !== undefined ? String(field.defaultValue) : '';
// //             }
// //             acc[field.fieldName] = defaultValue;
// //             return acc;
// //         }, {});
// //     }, [pageData.fields]);

// //     const [formData, setFormData] = useState(initialState);
// //     const [isDatePickerVisible, setDatePickerVisible] = useState(false);
// //     const [currentDateField, setCurrentDateField] = useState(null);
// //     const [selectedDateValue, setSelectedDateValue] = useState(new Date());

// //     React.useEffect(() => { setFormData(initialState); }, [initialState]);

// //     const handleChange = (fieldName, value) => setFormData(prev => ({ ...prev, [fieldName]: value }));

// //     // --- DYNAMIC BUTTON CLICK HANDLER (Endpoint Logic) ---
// //     const handleActionClick = async (action) => {

// //         // 1. Handle local 'Cancel' action
// //         if (action.buttonId === 'btn_cancel' || action.method === 'NONE') {
// //             navigation.goBack();
// //             return;
// //         }

// //         // --- 🚨 2. VALIDATION CHECK START 🚨 ---

// //         const requiredFields = pageData.fields.filter(field => field.isRequired);
// //         let validationError = false;
// //         let missingFieldName = '';

// //         for (const field of requiredFields) {
// //             const value = formData[field.fieldName];

// //             // Handle array/multiselect validation if needed (e.g., if array length is 0)
// //             if (Array.isArray(value) && value.length === 0) {
// //                  validationError = true;
// //                  missingFieldName = field.localization?.localizedText || field.label || field.fieldName;
// //                  break;
// //             }

// //             // Trimmed value check for strings/other types
// //             if (!Array.isArray(value) && (value === null || value === undefined || (typeof value === 'string' && value.trim() === ''))) {
// //                 validationError = true;
// //                 missingFieldName = field.localization?.localizedText || field.label || field.fieldName;
// //                 break;
// //             }

// //             // If field type is 'Decimal', check for non-numeric or zero (based on your original requirement)
// //             if (field.fieldType === 'Decimal' && (isNaN(Number(value)) || Number(value) === 0)) {
// //                  validationError = true;
// //                  missingFieldName = field.localization?.localizedText || field.label || field.fieldName;
// //                  break;
// //             }
// //         }

// //         if (validationError) {
// //             Alert.alert(
// //                 "Validation Error",
// //                 `Please fill in the required field: **${missingFieldName}** before proceeding.`,
// //                 [{ text: "OK" }]
// //             );
// //             return; // Stop further processing if validation fails
// //         }

// //         // --- 🚨 2. VALIDATION CHECK END 🚨 ---

// //         // Define the next page route name based on API data structure
// //         const nextScreen = 'AssignProducts';

// //         // 3. Submission Logic: Check if 'endpoint' is defined or empty

// //         console.log("&&&&&&&",formData)

// //         if (action.endpoint && action.endpoint !== "") {
// //             // B. ENDPOINT IS NOT EMPTY -> PERFORM API CALL

// //             try {
// //                 // Call the submission function from the hook
// //                 // The hook will take action (button ID, endpoint) and formData,
// //                 // apply the mapping (Deal_BasicInformation.DealDetails.deal_name=...),
// //                 // and perform the API call.
// //                 await createNewDeal(
// //                     action,
// //                     {
// //                         externalBaseData: {}, // No additional external data needed here
// //                         onSuccessNavigation: () => {
// //                             // Navigate to the next page on successful API response
// //                             navigation.navigate(nextScreen, { dealDetails: formData });
// //                         }
// //                     }
// //                 );
// //                 // Success Alert is handled by the hook's useMutation

// //             } catch (e) {
// //                 // Error Alert is also handled by the hook's useMutation onError
// //                 console.error("API Submission Error:", e);
// //                 // Re-throw if necessary, but typically error handling stops here
// //             }

// //         } else {
// //             // A. ENDPOINT IS EMPTY/NULL -> PERFORM LOCAL NAVIGATION

// //             console.log("Navigating to next screen with current form data:", formData);
// //             // Navigate to the next page, passing the current form data as a prop
// //             navigation.navigate(nextScreen, { dealDetails: formData });

// //         }
// //     };
// //     // -----------------------------------------------------

// //     // --- Render Form Fields (Logic remains the same) ---
// //     const renderFormFields = () => {
// //         const fields = pageData.fields;

// //         const elements = fields.map((field, index) => {
// //             const fieldName = field.fieldName;
// //             const fieldType = field.fieldType;
// //             const label = field.localization?.localizedText || field.label;
// //             const placeholder = field.localization?.localizedPlaceholder || field.placeholder || '';
// //             const isRequired = field.isRequired;
// //             const value = formData[fieldName];

// //             const totalFields = fields.length;
// //             const inputZIndex = totalFields - index;

// //             // 1. Handle BOOLEAN/SWITCH field type (e.g., 'is_active')
// //             if (fieldType === 'Boolean' || fieldName === 'is_active') {
// //                 return (
// //                     <CustomSwitchButton
// //                         key={fieldName}
// //                         label={label}
// //                         value={value} // value is expected to be boolean
// //                         onValueChange={(switchValue) => handleChange(fieldName, switchValue)}
// //                     />
// //                 );
// //             }

// //             // 2. Handle DATE/DATETIME field type
// //             if (fieldType === 'DateTime' || fieldType === 'Date') {
// //                 return (
// //                     <View key={fieldName} style={styles.datePickerContainerSingle}>
// //                         <FormInput
// //                             fieldType={fieldType}
// //                             label={label}
// //                             placeholder={'DD/MM/YYYY'}
// //                             isRequired={isRequired}
// //                             // Display the date value stored in formData (which is a formatted string)
// //                             value={value}
// //                             onSelectPress={() => {
// //                                 setDatePickerVisible(true);
// //                                 setCurrentDateField(fieldName);
// //                                 setSelectedDateValue(value ? new Date(value) : new Date()); // Set picker to current value or today
// //                             }}
// //                         />
// //                     </View>
// //                 );
// //             }

// //             // 3. Handle all other field types (Text, Decimal, Select, Currency, etc.)
// //             const isSelectField = fieldType === 'Select' || fieldName === 'currency_code';

// //             return (
// //                 <FormInput
// //                     key={fieldName}
// //                     fieldType={fieldType}
// //                     label={label}
// //                     placeholder={placeholder}
// //                     isRequired={isRequired}
// //                     value={value}
// //                     options={isSelectField ? field.options : []}
// //                     inputZIndex={inputZIndex}
// //                     onChangeText={(text) => handleChange(fieldName, text)}
// //                     keyboardType={fieldType === 'Decimal' ? 'numeric' : 'default'}
// //                     // Note: 'Select' fields handle onSelectPress/Modal inside the FormInput component
// //                 />
// //             );
// //         });

// //         return elements;
// //     };

// //     // --- Loading and Error UI ---
// //     if (isLoading) {
// //         return (
// //             <View style={styles.centerContainer}>
// //                 <ActivityIndicator size="large" color={Colors.primary} />
// //                 <Text style={styles.loadingText}>Fetching Deal Form...</Text>
// //             </View>
// //         );
// //     }

// //     if (dealFormError || !dealFormData || pageData.fields.length === 0) {
// //         return (
// //             <View style={styles.centerContainer}>
// //                 <Text style={styles.errorText}>Error loading form data or no fields found.</Text>
// //             </View>
// //         );
// //     }
// //     // ----------------------------

// //     return (
// //         <View style={styles.container}>

// //             <Header title={pageData.pageTitle || "Create Deals"} onBackPress={() => handleActionClick({ buttonId: 'btn_cancel', method: 'NONE' })} />

// //             <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
// //                 <View style={styles.card}>

// //                     {renderFormFields()}

// //                     {/* Renders buttons dynamically based on API data and sorting */}
// //                     <BothButtons
// //                         actions={pageData.actions}
// //                         onActionClick={handleActionClick}
// //                     />
// //                 </View>
// //             </ScrollView>

// //             {/* Native Date Picker Component */}
// //             {isDatePickerVisible && (
// //                     <DateTimePicker
// //                         isVisible={true}
// //                         mode="date"
// //                         // Picker needs a Date object for its value
// //                         value={selectedDateValue}
// //                         onChange={(event, date) => {
// //                             setDatePickerVisible(false);
// //                             if (date) {
// //                                 // Store the formatted string in formData
// //                                 handleChange(currentDateField, formatDate(date));
// //                             }
// //                         }}
// //                     />
// //             )}

// //         </View>
// //     );
// // };

// // export default CreateDeal;

// // // --- STYLESHEETS (Remains the same) ---
// // const styles = StyleSheet.create({
// //     container: { flex: 1, backgroundColor: Colors.lightBg },
// //     scrollViewContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10 },
// //     card: {
// //         backgroundColor: Colors.white, borderRadius: 12, padding: 20,
// //         ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }, android: { elevation: 3 } }),
// //     },
// //     centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightBg },
// //     loadingText: { marginTop: 10, fontSize: 16, color: Colors.darkText },
// //     errorText: { fontSize: 18, color: 'red', fontWeight: 'bold', marginBottom: 10 },
// //     datePickerContainerSingle: {
// //         marginBottom: 15, // Add bottom margin for spacing
// //     },
// // });
