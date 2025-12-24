import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

// Note: No icon libraries are used, as requested. We use Text components for icons/symbols.

// == Color Palette (Centralized) ==
const colors = {
  primary: '#FF8719', // Orange
  white: '#FFFFFF',
  black: '#000000',
  background: '#FFFFFF', // Light screen background
  screebg: '#FFFBF980',
  surface: '#FFFFFF', // White card background
  border: '#E0E0E0', // Standard border
  borderLight: '#272020', // Light border for dashed lines
  textPrimary: '#858D9D', // Dark text
  textSecondary: '#555', // Lighter text for icons/placeholders
  danger: '#FF0000', // Red for delete buttons

  // Variant Tag specific colors from images
  tagDefault: '#E0E0E0',
  tagLightGreen: '#CAECC5',
  tagLightRed: '#F8AEB7',
  tagLightBlue: '#E2EAF6',
  tagLightPink: '#FFD0E0',
  mediumText: '#98A2B3',
  darkText: '#3D3A3A',
  title: '#161B25',
  labelGray: '#858D9D',
  borderColor: '#ddd',
};

// == Helper Components ==

const DeleteButton = () => (
  <TouchableOpacity style={styles.deleteVariantButton}>
    {/* <Text style={{color: colors.textSecondary, fontSize: 18}}>🗑️</Text> */}
    <Image
      source={require('../../../assets/product_delete.png')}
      style={{width: 18, height: 18}}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

const VariantTag = ({text, tagColor}) => (
  <View style={[styles.variantTag, {backgroundColor: tagColor}]}>
    <Text style={styles.variantTagText}>{text}</Text>
    <Text style={styles.variantTagDelete}>×</Text>
  </View>
);

const InventoryTag = ({size, quantity, tagColor}) => (
  <View style={[styles.inventoryTag, {backgroundColor: tagColor}]}>
    <Text style={styles.inventoryTagText}>
      {size} - Q - {quantity}
    </Text>
  </View>
);
// Placeholder function for dropdown/variant selection
const openDropdown = type => {
  console.log(`Opening dropdown for: ${type}`);
  // In a real app, you'd open a modal or navigate to a selection screen
};

const VariantRow = ({label, children}) => (
  <View style={styles.variantRowContainer}>
    <View style={styles.variantRowHeader}>
      <Text style={styles.label}>{label}</Text>
      <DeleteButton />
    </View>
    {children}
  </View>
);

const InputGroup = ({label, value, placeholder, keyboardType = 'default'}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
    />
  </View>
);

const DropdownGroup = ({label, value}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.dropdown}>
      <Text style={styles.dropdownText}>{value}</Text>
      {/* Down Arrow Fixed */}
      {/* <Text style={styles.dropdownIcon}>&#8964;</Text>  */}
      <Feather name="chevron-down" size={20} color={colors.black} style={{}} />
    </TouchableOpacity>
  </View>
);

// We keep the old Tag component just in case, though not used in the final version's variants.
const Tag = ({text, color}) => (
  <View
    style={[
      styles.tag,
      color ? {backgroundColor: color} : {backgroundColor: colors.tagDefault},
    ]}>
    <Text style={styles.tagText}>{text}</Text>
  </View>
);

// --- Reusable Component for Variant Selector (New Component) ---
const VariantSelector = ({label, selectedVariants, onPress}) => {
  return (
    <View style={styles.inputContainer}>
      {/* <Text style={styles.label}>{label}</Text> */}
      <TouchableOpacity
        style={styles.variantDropdownContainer}
        onPress={onPress}>
        <View style={styles.variantTagsWrapper}>
          {selectedVariants.map((variant, index) => (
            <View key={index} style={styles.variantTag}>
              <View
                style={[
                  styles.variantColorDot,
                  {backgroundColor: variant.color},
                ]}
              />
              <Text style={styles.variantTagText}>{variant.text}</Text>
              {/* Optionally add a close icon here if variants can be removed */}
            </View>
          ))}
        </View>
        {/* <Feather name="chevron-down" size={20} color={colors.mediumText} /> */}
      </TouchableOpacity>
    </View>
  );
};

// == Main Component ==
const AddNewProduct = () => {
  // State for variants (now an array of objects for color and text)
  const [selectedVariants, setSelectedVariants] = useState([
    {color: '#CAECC4', text: 'Size - S Q - 8'},
    {color: '#F8AEB7', text: 'Size - M Q - 12'},
    {color: '#E2EAF6', text: 'Size - M Q - 12'},
  ]);
  const navigation = useNavigation();
  const handleBackPress = () => {
    console.log('Back pressed');
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* == Header == */}
      <View style={styles.appHeader}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color={colors.darkText} />
        </TouchableOpacity>

        <Text style={styles.screenTitle}>Add Product</Text>
        {/* Placeholder for alignment */}
        <View style={{width: 24}} />
      </View>
      <ScrollView style={styles.container}>
        {/* == Product Images Section == */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Images</Text>
          <View style={styles.imageRow}>
            {/* Add Image Button */}
            <TouchableOpacity style={styles.addImageButton}>
              <Text style={styles.plusIcon}>+</Text>
            </TouchableOpacity>

            {/* Image Previews */}
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{uri: 'https://via.placeholder.com/150'}}
                style={styles.imagePreview}
              />
              <TouchableOpacity style={styles.deleteIcon}>
                <Text style={styles.deleteIconText}>×</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{uri: 'https://via.placeholder.com/150'}}
                style={styles.imagePreview}
              />
              <TouchableOpacity style={styles.deleteIcon}>
                <Text style={styles.deleteIconText}>×</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* == Product Description Section (Updated Toolbar) == */}
        <View style={styles.section}>
          <Text style={styles.label}>Product Description</Text>
          {/* Toolbar updated to match the new image */}
          <View style={styles.toolbar}>
            <View style={{flexDirection: 'row'}}>
              {/* Font size dropdown */}
              <TouchableOpacity style={styles.toolbarButton}>
                <Text>14</Text>
                {/* Small Down Arrow Fixed */}
                <Feather
                  name="chevron-down"
                  size={10}
                  color={colors.mediumText}
                  style={{marginStart: 8}}
                />
              </TouchableOpacity>

              {/* Formatting buttons */}
              <TouchableOpacity style={styles.toolbarButton}>
                <Text style={styles.toolbarTextBold}>B</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolbarButton}>
                <Text style={styles.toolbarTextItalic}>I</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolbarButton}>
                <Text style={styles.toolbarTextUnderline}>U</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolbarButton}>
                <Text style={styles.toolbarTextStrikethrough}>S</Text>
              </TouchableOpacity>

              {/* Alignment buttons */}
              <TouchableOpacity style={styles.toolbarButton}>
                <Text>=</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolbarButton}>
                <Text>≡</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolbarButton}>
                <Text>☰</Text>
              </TouchableOpacity>

              {/* List and Link icons */}
              <TouchableOpacity style={styles.toolbarButton}>
                <Text>•=</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolbarButton}>
                <Text>1=</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolbarButton}>
                <Text>🔗</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            style={[styles.input, styles.textArea, {marginBottom: 5}]}
            multiline
            placeholder=""
          />
          <InputGroup label="Product Title" value="Product Name" />
          {/* <InputGroup label="Product Name" value="Hilsakate" /> */}
          <InputGroup label="Brand" value="Nescafe" />
          <InputGroup label="Unit" value="500 units per product" />
          <InputGroup
            label="threshold value"
            value="25"
            keyboardType="numeric"
          />
          <InputGroup
            label="Selling Price"
            value="350 per piece "
            keyboardType="numeric"
          />
          <InputGroup
            label="Expiry Date"
            value="3/3/2025"
            keyboardType="numeric"
          />

          {/* Dimensions */}
          <Text style={styles.label}>Dimensions</Text>
          <View style={styles.dimensionRow}>
            <TextInput
              style={[styles.input, styles.dimensionInput]}
              placeholder="Length"
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, styles.dimensionInput]}
              placeholder="Width"
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, styles.dimensionInput]}
              placeholder="Height"
              keyboardType="numeric"
            />
          </View>

          <InputGroup label="Weight(kg)" value="1.2" keyboardType="numeric" />
          <DropdownGroup label="Returnable" value="yes" />
          <InputGroup label="Refundable Policy " value="2" />
          <DropdownGroup
            label="Refundable Policy"
            value="Select Refundable policy"
          />
          <DropdownGroup label="Gender" value="Male" />
        </View>

        {/* == Main Form Fields == */}
        {/* <View style={styles.section}>
         
        </View> */}

        {/* == Variants Section (Updated to Detailed Design) == */}
        <View style={styles.section}>
          <View style={styles.variantsHeader}>
            <Text style={styles.sectionTitle}>Variants</Text>
            {/* + Add button */}
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>

          {/* 1. Colours Row (Tag Input Look) */}
          <VariantRow label="Colours">
            <View style={styles.variantInputBox}>
              <View style={styles.tagRowStyle}>
                <VariantTag text="Green" tagColor={colors.tagLightGreen} />
                <VariantTag text="red" tagColor={colors.tagLightRed} />
                <VariantTag text="blue" tagColor={colors.tagLightBlue} />
                {/* <TextInput style={styles.hiddenTextInput} placeholder="Add color..." /> */}
              </View>
            </View>
          </VariantRow>

          {/* 2. Select Size Row (Dropdown Look) */}
          <VariantRow label="Select Size">
            <TouchableOpacity style={styles.dropdownVariantInput}>
              <Text style={styles.dropdownVariantText}>S, M, L</Text>
              {/* <Text style={styles.dropdownPlusIcon}>+</Text> */}
              {/* Down Arrow Fixed */}
              <Feather
                name="chevron-down"
                size={20}
                color={colors.black}
                style={{}}
              />
            </TouchableOpacity>
          </VariantRow>

          {/* 3. Price Row (Dropdown Look) */}
          <VariantRow label="Price">
            <TouchableOpacity style={styles.dropdownVariantInput}>
              <Text style={styles.dropdownVariantText}>15, 25, 45</Text>
              {/* Down Arrow Fixed */}
              <Feather
                name="chevron-down"
                size={20}
                color={colors.black}
                style={{}}
              />
            </TouchableOpacity>
          </VariantRow>

          {/* Inventory Tags at the bottom */}
          {/* <View style={styles.inventoryTagContainer}>
            <InventoryTag size="Size - M" quantity="10" tagColor={colors.tagLightGreen} />
            <InventoryTag size="Size - M" quantity="25" tagColor={colors.tagLightPink} />
            <InventoryTag size="Size - L" quantity="55" tagColor={colors.tagLightBlue} />
          </View> */}
          {/* Variant Selection (Using the new VariantSelector component) */}
          <VariantSelector
            label="variant"
            selectedVariants={selectedVariants}
            onPress={() => openDropdown('Variant')}
          />
        </View>

        {/* == Action Buttons == */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// == Stylesheet ==
const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.title,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.screebg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  headerBackIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3D3A3A',
    marginBottom: 12,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#EFEFEF',
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  plusIcon: {
    fontSize: 30,
    color: colors.borderLight,
  },
  imagePreviewContainer: {
    position: 'relative',
    backgroundColor: '#FFFAF5',
    borderRadius: 8,
    marginRight: 10,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  deleteIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: colors.black,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIconText: {
    color: colors.white,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontWeight: 600,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.black,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  // == Toolbar Styles ==
  toolbar: {
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#F2F4F7',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 4,
    marginBottom: 8,
  },
  toolbarButton: {
    paddingHorizontal: 6.5,
    paddingVertical: 5,
    marginHorizontal: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownIconSmall: {
    fontSize: 10,
    marginLeft: 2,
    color: colors.textSecondary,
  },
  toolbarTextBold: {
    fontWeight: '900',
  },
  toolbarTextItalic: {
    fontStyle: 'italic',
  },
  toolbarTextUnderline: {
    textDecorationLine: 'underline',
  },
  toolbarTextStrikethrough: {
    textDecorationLine: 'line-through',
  },
  // == End Toolbar Styles ==

  dimensionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dimensionInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: 600,
  },
  dropdownIcon: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  variantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },

  // == Variant Detail Styles ==
  variantRowContainer: {
    marginBottom: 15,
  },
  variantRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  deleteVariantButton: {
    padding: 5,
  },
  variantInputBox: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 8,
    minHeight: 45,
  },
  tagRowStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  variantTagText: {
    fontSize: 14,
    color: '#48505E',
    fontWeight: 400,
    marginRight: 5,
  },
  variantTagDelete: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
  hiddenTextInput: {
    height: 30,
    padding: 0,
    flex: 1,
    minWidth: 80,
  },
  dropdownVariantInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.surface,
  },
  dropdownVariantText: {
    flex: 1,
    fontSize: 14,
    color: colors.black,
    fontWeight: 600,
  },
  dropdownPlusIcon: {
    fontSize: 18,
    color: colors.textPrimary,
    marginRight: 10,
  },
  inventoryTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 10,
  },
  inventoryTag: {
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  inventoryTagText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  // == End Variant Detail Styles ==

  buttonContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between', // 👈 buttons left & right
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFAF5',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: colors.border,
  },
  cancelButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: colors.white,
    elevation: 2,
    borderBottomColor: colors.borderColor,
  },
  // --- Input Field Styles ---
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.labelGray,
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
    borderColor: colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 10 : 14,
    backgroundColor: colors.white,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '400',
  },

  // New Variant Selector Styles
  variantDropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'android' ? 8 : 13, // Adjusted padding for better fit with tags
    backgroundColor: colors.white,
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
    backgroundColor: '#FFB76614', // Tags are inside the white background of the dropdown
    borderWidth: 1,
    borderColor: colors.borderColor,
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
});

export default AddNewProduct;

//Comment By Shrawan 12-12-2025

// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import DynamicScreen from './DynamicScreen.js/DynamicScreen';
// import PriceVariantGroup from '../../components/PriceVariantGroup';
// const mockGetAllProductModal = {
//   pageGroupName: 'Ecommerce_Product',
//   title: 'Ecommerce_Product',
//   description: 'Product creation workflow for merchants (UAE-first)',
//   pages: [
//     {
//       pageId: 151,
//       pageName: 'Ecommerce_Product_Basic',
//       title: 'New Product — Basic Information',
//       subtitle: '',
//       description: '',
//       order: 1,
//       sections: [
//         {
//           id: 260,
//           name: 'BasicInformation',
//           title: 'Basic Information',
//           description: 'Title, description, category, brand and subcategory',
//           order: 1,
//           fields: [
//             {
//               id: 1040,
//               fieldName: 'product_title',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 1,
//               isVisible: true,
//               label: 'Product Title*',
//               placeholder: 'Enter product title',
//               helpText: 'Title of the product',
//               displayName: '',
//               regexPattern: "^[A-Za-z0-9\\s\\-\\&'\\.,()]{2,200}$",
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Product Title',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1041,
//               fieldName: 'description',
//               fieldType: 'TextArea',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 2,
//               isVisible: true,
//               label: 'Description*',
//               placeholder: 'Enter product description',
//               helpText: 'Product description',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Description',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1042,
//               fieldName: 'category_id',
//               fieldType: 'Select',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 3,
//               isVisible: true,
//               label: 'Category*',
//               placeholder: 'Select category',
//               helpText: 'Filter products by category',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: [
//                 {
//                   value: 'electronics',
//                   label: 'Electronics',
//                   localizations: null,
//                 },
//                 {
//                   value: 'clothing',
//                   label: 'Clothing',
//                   localizations: null,
//                 },
//                 {
//                   value: 'books',
//                   label: 'Books',
//                   localizations: null,
//                 },
//                 {
//                   value: 'home',
//                   label: 'Home & Garden',
//                   localizations: null,
//                 },
//                 {
//                   value: 'sports',
//                   label: 'Sports & Outdoors',
//                   localizations: null,
//                 },
//                 {
//                   value: 'toys',
//                   label: 'Toys & Games',
//                   localizations: null,
//                 },
//                 {
//                   value: 'beauty',
//                   label: 'Beauty & Personal Care',
//                   localizations: null,
//                 },
//                 {
//                   value: 'automotive',
//                   label: 'Automotive',
//                   localizations: null,
//                 },
//                 {
//                   value: 'stationery',
//                   label: 'Stationery',
//                   localizations: null,
//                 },
//               ],
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Category',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1043,
//               fieldName: 'brand',
//               fieldType: 'Select',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 4,
//               isVisible: true,
//               label: 'Brand*',
//               placeholder: 'Select brand',
//               helpText: 'Filter products by brand',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Brand',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1044,
//               fieldName: 'subcategory_id',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 5,
//               isVisible: true,
//               label: 'Subcategory*',
//               placeholder: 'Enter subcategory ID',
//               helpText: 'Product subcategory',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: [
//                 {
//                   value: 'smartphones',
//                   label: 'Smartphones',
//                   localizations: null,
//                 },
//                 {
//                   value: 'laptops',
//                   label: 'Laptops',
//                   localizations: null,
//                 },
//                 {
//                   value: 'tablets',
//                   label: 'Tablets',
//                   localizations: null,
//                 },
//                 {
//                   value: 'headphones',
//                   label: 'Headphones',
//                   localizations: null,
//                 },
//                 {
//                   value: 'cameras',
//                   label: 'Cameras',
//                   localizations: null,
//                 },
//                 {
//                   value: 'mens_clothing',
//                   label: "Men's Clothing",
//                   localizations: null,
//                 },
//                 {
//                   value: 'womens_clothing',
//                   label: "Women's Clothing",
//                   localizations: null,
//                 },
//                 {
//                   value: 'kids_clothing',
//                   label: "Kids' Clothing",
//                   localizations: null,
//                 },
//                 {
//                   value: 'shoes',
//                   label: 'Shoes',
//                   localizations: null,
//                 },
//                 {
//                   value: 'accessories',
//                   label: 'Accessories',
//                   localizations: null,
//                 },
//               ],
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Subcategory',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//           ],
//           buttons: [
//             {
//               id: 'discard',
//               buttonId: 'discard',
//               label: 'Discard',
//               type: 'secondary',
//               layout: 'default layout',
//               apiCallRequired: false,
//               method: 'GET',
//               endpoint: '',
//               submitSectionId: null,
//               navigateTo: '',
//               params: '{}',
//             },
//             {
//               id: 'next',
//               buttonId: 'next',
//               label: 'Next',
//               type: 'primary',
//               layout: 'default layout',
//               apiCallRequired: false,
//               method: 'POST',
//               endpoint: '/api/v1/Product/basic',
//               submitSectionId: null,
//               navigateTo: '',
//               params: '{}',
//             },
//           ],
//         },
//       ],
//       data: null,
//     },
//     {
//       pageId: 152,
//       pageName: 'Ecommerce_Product_Details',
//       title: 'New Product — Additional Details',
//       subtitle: '',
//       description: '',
//       order: 2,
//       sections: [
//         {
//           id: 261,
//           name: 'Policies',
//           title: 'Policies',
//           description: 'Default Section Description',
//           order: 1,
//           fields: [
//             {
//               id: 1045,
//               fieldName: 'is_returnable',
//               fieldType: 'Checkbox',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 0,
//               isVisible: true,
//               label: 'Returnable*',
//               placeholder: '',
//               helpText: '',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Returnable',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1046,
//               fieldName: 'return_window_days',
//               fieldType: 'Number',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 1,
//               isVisible: true,
//               label: 'Return Window (days)*',
//               placeholder: 'e.g., 7',
//               helpText: '',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Return Window (days)',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1047,
//               fieldName: 'has_variants',
//               fieldType: 'Checkbox',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 2,
//               isVisible: true,
//               label: 'Products with Variants*',
//               placeholder: '',
//               helpText: 'Show only products with variants',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Products with Variants',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1048,
//               fieldName: 'variation_theme',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 3,
//               isVisible: true,
//               label: 'Variation Theme*',
//               placeholder: 'Select variation theme',
//               helpText: '',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Variation Theme',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//           ],
//           buttons: [],
//         },
//         {
//           id: 262,
//           name: 'ProductAttributes',
//           title: 'Product Attributes',
//           description: 'Default Section Description',
//           order: 2,
//           fields: [
//             {
//               id: 1049,
//               fieldName: 'gender',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 0,
//               isVisible: true,
//               label: 'Gender*',
//               placeholder: 'Select gender',
//               helpText: '',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Gender',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//           ],
//           buttons: [],
//         },
//         {
//           id: 263,
//           name: 'IdentifiersSEO',
//           title: 'Identifiers & SEO',
//           description: 'Default Section Description',
//           order: 3,
//           fields: [
//             {
//               id: 1050,
//               fieldName: 'external_product_type',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 0,
//               isVisible: true,
//               label: 'External Product Type*',
//               placeholder: 'Select external product type',
//               helpText: '',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'External Product Type',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1051,
//               fieldName: 'external_product_id',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 1,
//               isVisible: true,
//               label: 'External Product ID*',
//               placeholder: 'Enter external product ID',
//               helpText: '8–14 digits',
//               displayName: '',
//               regexPattern: '^[0-9]{8,14}$',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'External Product ID',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1052,
//               fieldName: 'mpn',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 2,
//               isVisible: true,
//               label: 'MPN*',
//               placeholder: 'Enter MPN',
//               helpText: '',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'MPN',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1053,
//               fieldName: 'model_number',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 3,
//               isVisible: true,
//               label: 'Model Number*',
//               placeholder: 'Enter model number',
//               helpText: '',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Model Number',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1054,
//               fieldName: 'country_of_origin',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 4,
//               isVisible: true,
//               label: 'Country of Origin*',
//               placeholder: 'Select country',
//               helpText: '',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Country of Origin',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1055,
//               fieldName: 'is_searchable',
//               fieldType: 'Checkbox',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 5,
//               isVisible: true,
//               label: 'Searchable*',
//               placeholder: '',
//               helpText: '',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Searchable',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1056,
//               fieldName: 'slug',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 6,
//               isVisible: true,
//               label: 'Brand Slug*',
//               placeholder: 'brand-slug (auto-generated)',
//               helpText:
//                 'URL-friendly identifier (auto-generated from name if empty)',
//               displayName: '',
//               regexPattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Brand Slug',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//           ],
//           buttons: [
//             {
//               id: 'default_button',
//               buttonId: 'default_button',
//               label: 'Back',
//               type: 'secondary',
//               layout: 'default layout',
//               apiCallRequired: false,
//               method: 'GET',
//               endpoint: '',
//               submitSectionId: null,
//               navigateTo: '',
//               params: '{}',
//             },
//             {
//               id: 'default_button',
//               buttonId: 'default_button',
//               label: 'Next',
//               type: 'primary',
//               layout: 'default layout',
//               apiCallRequired: false,
//               method: 'POST',
//               endpoint: '/api/v1/Product/details',
//               submitSectionId: null,
//               navigateTo: '',
//               params: '{}',
//             },
//           ],
//         },
//       ],
//       data: null,
//     },
//     {
//       pageId: 153,
//       pageName: 'Ecommerce_Product_Variant',
//       title: 'Variant Configuration',
//       subtitle: '',
//       description: '',
//       isCollection: true,
//       order: 3,
//       sections: [
//         {
//           id: 264,
//           name: 'VariantDetails',
//           title: 'Variant Details',
//           description: 'Default Section Description',
//           order: 1,
//           fields: [
//             {
//               id: 1040,
//               fieldName: 'attributes',
//               fieldType: 'Page', // This is the placeholder that triggers VariantUI rendering
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 1,
//               isVisible: true,
//               label: 'Product Attributes*',
//               placeholder: 'Enter product attributes',
//               helpText: 'Attributes of the product',
//               displayName: '',
//               regexPattern: "^[A-Za-z0-9\\s\\-\\&'\\.,()]{2,200}$",
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               endpoint: 'Products/variant-page-with-attributes',
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Product Attributes',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1057,
//               fieldName: 'sku',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 0,
//               isVisible: true,
//               label: 'SKU*',
//               placeholder: 'Enter SKU',
//               helpText: 'Stock keeping unit identifier',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'SKU',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1058,
//               fieldName: 'serial_number',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 1,
//               isVisible: true,
//               label: 'Serial Number*',
//               placeholder: 'Enter serial number',
//               helpText: 'Unique serial number for this variant',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Serial Number',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1059,
//               fieldName: 'add_category_attributes',
//               fieldType: 'Button',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 4,
//               isVisible: true,
//               label: 'Add Category Attributes*',
//               placeholder: '',
//               helpText:
//                 'Load dynamic category attributes based on selected category',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [
//                 {
//                   id: 'get_variant_page_with_attributes',
//                   label: 'Get Variant Page with Attributes',
//                   type: 'api_call',
//                   apiCallRequired: true,
//                   method: 'GET',
//                   endpoint: '/api/v1/Product/variant-page-with-attributes',
//                   params: '{"categoryId":"{category_id}"}',
//                   chainedActions: null,
//                   mapResponseToFields: '{}',
//                 },
//               ],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Add Category Attributes',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1060,
//               fieldName: 'is_active',
//               fieldType: 'Checkbox',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 5,
//               isVisible: true,
//               label: 'Active*',
//               placeholder: 'Default Placeholder',
//               helpText: 'Enable to activate deal immediately',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Active',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//           ],
//           buttons: [],
//         },
//         {
//           id: 265,
//           name: 'PhysicalSpecifications',
//           title: 'Physical Specifications',
//           description: 'Default Section Description',
//           order: 2,
//           fields: [
//             {
//               id: 1061,
//               fieldName: 'dimension_unit',
//               fieldType: 'Select',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 0,
//               isVisible: true,
//               label: 'Dimension Unit*',
//               placeholder: 'Select unit',
//               helpText: '',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Dimension Unit',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1062,
//               fieldName: 'width',
//               fieldType: 'Number',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 1,
//               isVisible: true,
//               label: 'Width*',
//               placeholder: 'Enter width',
//               helpText: 'Variant-specific width dimension',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Width',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1063,
//               fieldName: 'height',
//               fieldType: 'Number',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 2,
//               isVisible: true,
//               label: 'Height*',
//               placeholder: 'Enter height',
//               helpText: 'Variant-specific height dimension',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Height',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1064,
//               fieldName: 'length',
//               fieldType: 'Number',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 3,
//               isVisible: true,
//               label: 'Length*',
//               placeholder: 'Enter length',
//               helpText: 'Variant-specific length dimension',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Length',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1065,
//               fieldName: 'weight_unit',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 4,
//               isVisible: true,
//               label: 'Weight Unit*',
//               placeholder: 'Enter weight unit (e.g., Gm, Kg)',
//               helpText: 'Unit of weight measurement',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Weight Unit',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1066,
//               fieldName: 'weight',
//               fieldType: 'Number',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 5,
//               isVisible: true,
//               label: 'Weight*',
//               placeholder: 'Enter weight',
//               helpText: 'Product weight',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Weight',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//           ],
//           buttons: [],
//         },
//         {
//           id: 266,
//           name: 'PackageDimensions',
//           title: 'Package Dimensions',
//           description: 'Default Section Description',
//           order: 3,
//           fields: [
//             {
//               id: 1067,
//               fieldName: 'package_dimension_unit',
//               fieldType: 'Select',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 0,
//               isVisible: true,
//               label: 'Package Dimension Unit*',
//               placeholder: 'Select unit',
//               helpText: 'Unit for package measurements',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Package Dimension Unit',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1068,
//               fieldName: 'package_width',
//               fieldType: 'Number',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 1,
//               isVisible: true,
//               label: 'Package Width*',
//               placeholder: 'Enter package width',
//               helpText: 'Shipping package width',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Package Width',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1069,
//               fieldName: 'package_height',
//               fieldType: 'Number',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 2,
//               isVisible: true,
//               label: 'Package Height*',
//               placeholder: 'Enter package height',
//               helpText: 'Shipping package height',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Package Height',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1070,
//               fieldName: 'package_length',
//               fieldType: 'Number',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 3,
//               isVisible: true,
//               label: 'Package Length*',
//               placeholder: 'Enter package length',
//               helpText: 'Shipping package length',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Package Length',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1071,
//               fieldName: 'package_weight',
//               fieldType: 'Number',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 4,
//               isVisible: true,
//               label: 'Package Weight*',
//               placeholder: 'Enter package weight',
//               helpText: 'Total shipping package weight',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Package Weight',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//           ],
//           buttons: [],
//         },
//         {
//           id: 267,
//           name: 'VariantPrice',
//           title: 'Variant Price',
//           description: 'Default Section Description',
//           order: 4,
//           fields: [
//             {
//               id: 1072,
//               fieldName: 'variant_price',
//               fieldType: 'Number',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 0,
//               isVisible: true,
//               label: 'Variant Price*',
//               placeholder: 'Enter variant price (optional)',
//               helpText: '',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Variant Price',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1073,
//               fieldName: 'variant_currency_code',
//               fieldType: 'Select',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 1,
//               isVisible: true,
//               label: 'Currency*',
//               placeholder: 'Select currency',
//               helpText: '',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Currency',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1074,
//               fieldName: 'variant_quantity',
//               fieldType: 'Number',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 2,
//               isVisible: true,
//               label: 'Quantity*',
//               placeholder: 'Enter stock quantity',
//               helpText: '',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Quantity',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//           ],
//           buttons: [],
//         },
//         {
//           id: 268,
//           name: 'VariantImages',
//           title: 'Variant Images',
//           description: 'Default Section Description',
//           order: 5,
//           fields: [
//             {
//               id: 1075,
//               fieldName: 'variant_images',
//               fieldType: 'File',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 0,
//               isVisible: true,
//               label: 'Variant Images*',
//               placeholder: 'Upload images',
//               helpText: 'JPG/PNG up to 6 files, 5 MB each',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: {
//                 maxFiles: 1,
//                 allowedExtensions: ['.jpg', '.jpeg', '.png'],
//                 minFileSize: 1024,
//                 maxFilesPerField: 6,
//                 allowMultipleFiles: true,
//                 requireFileExtension: true,
//                 validateFileContent: true,
//                 required: true,
//                 fileType: ['image/jpeg', 'image/png'],
//                 maxFileSize: 5242880,
//                 maxFileSizeMB: '5',
//                 validation: '',
//               },
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Variant Images',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//           ],
//           buttons: [
//             {
//               id: 'default_button',
//               buttonId: 'default_button',
//               label: 'Back',
//               type: 'secondary',
//               layout: 'default layout',
//               apiCallRequired: false,
//               method: 'GET',
//               endpoint: '',
//               submitSectionId: null,
//               navigateTo: '',
//               params: '{}',
//             },
//             {
//               id: 'default_button',
//               buttonId: 'default_button',
//               label: 'Save Variant',
//               type: 'primary',
//               layout: 'default layout',
//               apiCallRequired: false,
//               method: 'POST',
//               endpoint: '/api/v1/Product/variants',
//               submitSectionId: null,
//               navigateTo: '',
//               params: '{}',
//             },
//           ],
//         },
//       ],
//       data: null,
//     },
//     {
//       pageId: 154,
//       pageName: 'Ecommerce_Product_Compliance',
//       title: 'New Product — Safety & Compliance',
//       subtitle: '',
//       description: '',
//       order: 4,
//       sections: [
//         {
//           id: 269,
//           name: 'hazmat',
//           title: 'Hazardous Materials',
//           description: 'Dangerous goods and hazmat classification',
//           order: 1,
//           fields: [
//             {
//               id: 1076,
//               fieldName: 'is_hazmat',
//               fieldType: 'Checkbox',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 0,
//               isVisible: true,
//               label: 'Contains hazardous materials*',
//               placeholder: '',
//               helpText: 'Check if product contains dangerous goods or hazmat',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Contains hazardous materials',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//           ],
//           buttons: [],
//         },
//         {
//           id: 270,
//           name: 'batteries',
//           title: 'Battery Information',
//           description: 'Battery content and specifications',
//           order: 2,
//           fields: [
//             {
//               id: 1077,
//               fieldName: 'contains_batteries',
//               fieldType: 'Checkbox',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 0,
//               isVisible: true,
//               label: 'Contains batteries*',
//               placeholder: '',
//               helpText: 'Check if product contains or requires batteries',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Contains batteries',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1078,
//               fieldName: 'battery_type',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 1,
//               isVisible: true,
//               label: 'Battery Type*',
//               placeholder: 'Select battery type',
//               helpText: 'Type of battery included or required',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: [
//                 {
//                   value: 'AAA',
//                   label: 'AAA',
//                   localizations: null,
//                 },
//                 {
//                   value: 'AA',
//                   label: 'AA',
//                   localizations: null,
//                 },
//                 {
//                   value: 'C',
//                   label: 'C',
//                   localizations: null,
//                 },
//                 {
//                   value: 'D',
//                   label: 'D',
//                   localizations: null,
//                 },
//                 {
//                   value: '9V',
//                   label: '9V',
//                   localizations: null,
//                 },
//                 {
//                   value: 'CR2032',
//                   label: 'CR2032 (Coin)',
//                   localizations: null,
//                 },
//                 {
//                   value: 'Lithium',
//                   label: 'Lithium Ion',
//                   localizations: null,
//                 },
//                 {
//                   value: 'LiPo',
//                   label: 'Lithium Polymer',
//                   localizations: null,
//                 },
//                 {
//                   value: 'NiMH',
//                   label: 'NiMH',
//                   localizations: null,
//                 },
//                 {
//                   value: 'Other',
//                   label: 'Other',
//                   localizations: null,
//                 },
//               ],
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Battery Type',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//           ],
//           buttons: [],
//         },
//         {
//           id: 271,
//           name: 'ageRestrictions',
//           title: 'Age Restrictions',
//           description: 'Minimum and maximum age recommendations',
//           order: 3,
//           fields: [
//             {
//               id: 1079,
//               fieldName: 'age_min',
//               fieldType: 'Number',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 0,
//               isVisible: true,
//               label: 'Minimum Age*',
//               placeholder: 'Enter minimum age',
//               helpText: 'Minimum recommended age in years (e.g., 3)',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Minimum Age',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1080,
//               fieldName: 'age_max',
//               fieldType: 'Number',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 1,
//               isVisible: true,
//               label: 'Maximum Age*',
//               placeholder: 'Enter maximum age',
//               helpText: 'Maximum recommended age in years (e.g., 12)',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Maximum Age',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//           ],
//           buttons: [],
//         },
//         {
//           id: 272,
//           name: 'certifications',
//           title: 'Certifications & Safety',
//           description: 'Safety certifications and compliance notes',
//           order: 4,
//           fields: [
//             {
//               id: 1081,
//               fieldName: 'certification_codes',
//               fieldType: 'Text',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 0,
//               isVisible: true,
//               label: 'Certification Codes*',
//               placeholder: 'e.g., CE, FCC, UL, ASTM F963',
//               helpText:
//                 'Safety and quality certification codes (comma-separated)',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Certification Codes',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//             {
//               id: 1082,
//               fieldName: 'safety_notes',
//               fieldType: 'TextArea',
//               isRequired: true,
//               isReadOnly: false,
//               displayOrder: 1,
//               isVisible: true,
//               label: 'Safety Notes*',
//               placeholder:
//                 'Enter safety warnings, precautions, or instructions',
//               helpText:
//                 'Important safety information, warnings, and precautions',
//               displayName: '',
//               regexPattern: '',
//               defaultValue: null,
//               maxLength: null,
//               minLength: null,
//               otpLength: null,
//               options: null,
//               fileConfig: null,
//               actions: [],
//               fieldMetadata: null,
//               localization: {
//                 languageCode: 'en',
//                 countryCode: 'AE',
//                 localizedText: 'Safety Notes',
//                 localizedPlaceholder: null,
//                 localizedHelpText: null,
//               },
//               isDefault: false,
//               isOpenView: false,
//             },
//           ],
//           buttons: [
//             {
//               id: 'back',
//               buttonId: 'back',
//               label: 'Back',
//               type: 'secondary',
//               layout: 'default layout',
//               apiCallRequired: false,
//               method: 'GET',
//               endpoint: '',
//               submitSectionId: null,
//               navigateTo: '',
//               params: '{}',
//             },
//             {
//               id: 'next',
//               buttonId: 'next',
//               label: 'Next',
//               type: 'secondary',
//               layout: 'default layout',
//               apiCallRequired: false,
//               method: 'POST',
//               endpoint: '/api/v1/Product/compliance',
//               submitSectionId: null,
//               navigateTo: '',
//               params: '{}',
//             },
//             {
//               id: 'fullSubmit',
//               buttonId: 'fullSubmit',
//               label: 'Submit Complete Product',
//               type: 'primary',
//               layout: 'default layout',
//               apiCallRequired: true,
//               method: 'POST',
//               endpoint: '/api/v1/Product/complete',
//               submitSectionId: null,
//               navigateTo: '',
//               params: '{}',
//             },
//           ],
//         },
//       ],
//       data: null,
//     },
//   ],
// };
// const AddNewProduct = () => {
//   return (
//     <View style={{flex: 1}}>
//       <DynamicScreen apiResponsedata={mockGetAllProductModal} btnTitle={"Save Product"}
//       headerTitle={mockGetAllProductModal.title}/>
//     </View>
//   );
// };

// export default AddNewProduct;

// const styles = StyleSheet.create({});
