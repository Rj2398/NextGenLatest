import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

// 🎨 Centralized Color Palette
const COLORS = {
  background: '#FFFFFF',
  card: '#F9F9F9',
  border: '#E5E5E5',
  primary: '#FF8C00', // Orange CTA
  secondary: '#FFF3E9', // Light Orange Background
  textDark: '#1E1E1E',
  textLight: '#888888',
  white: '#FFFFFF',
  danger: '#FF4C4C',
  green: '#3DD598',
};

// 💅 Shared Styles (Kept separate for cleaner main component)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 15,
    paddingHorizontal: 5,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  sectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    backgroundColor: COLORS.white,
    fontSize: 16,
    color: COLORS.textDark,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    textAlignVertical: 'top',
    fontSize: 16,
    color: COLORS.textDark,
  },
  dimensionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 10,
  },
  dimensionInput: {
    flex: 1,
    marginRight: 8,
  },
});

// --- REUSABLE COMPONENTS ---

// 🖼️ Component for Product Image Upload Section
const ProductImageSection = () => (
  <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Product Images</Text>   {' '}
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
           {' '}
      <TouchableOpacity style={imageStyles.imageBox}>
                <Text style={imageStyles.plusText}>+</Text>     {' '}
      </TouchableOpacity>
            {/* Dummy Images */}     {' '}
      <Image
        source={{uri: 'https://i.ibb.co/ZdR2F41/nescafe.png'}}
        style={imageStyles.productImage}
        resizeMode="contain"
      />
           {' '}
      <Image
        source={{uri: 'https://i.ibb.co/ZdR2F41/nescafe.png'}}
        style={imageStyles.productImage}
        resizeMode="contain"
      />
         {' '}
    </View>
     {' '}
  </View>
);

// 🎨 Styles for Image Section
const imageStyles = StyleSheet.create({
  imageBox: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  plusText: {
    fontSize: 28,
    color: COLORS.textLight,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 8,
  },
});

// 📝 Component for all Product Info Inputs
const ProductInfoSection = ({state, handlers}) => (
  <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Product Description</Text>   {' '}
    <TextInput
      placeholder="Enter description"
      style={styles.textArea}
      multiline
    />
        {/* Product Title */}    <Text style={styles.label}>Product Title</Text>
       {' '}
    <TextInput
      value={state.productName}
      onChangeText={handlers.setProductName}
      placeholder="Product Name"
      style={styles.input}
    />
        {/* Brand */}    <Text style={styles.label}>Brand</Text>   {' '}
    <TextInput
      value={state.brand}
      onChangeText={handlers.setBrand}
      placeholder="Brand Name"
      style={styles.input}
    />
        {/* Unit */}    <Text style={styles.label}>Unit</Text>   {' '}
    <TextInput
      value={state.unit}
      onChangeText={handlers.setUnit}
      placeholder="500 units per product"
      style={styles.input}
    />
        {/* Threshold */}    <Text style={styles.label}>Threshold Value</Text> 
     {' '}
    <TextInput
      value={state.threshold}
      onChangeText={handlers.setThreshold}
      placeholder="25"
      style={styles.input}
      keyboardType="numeric"
    />
        {/* Selling Price */}    <Text style={styles.label}>Selling Price</Text>
       {' '}
    <TextInput
      value={state.price}
      onChangeText={handlers.setPrice}
      placeholder="350 per piece"
      style={styles.input}
      keyboardType="numeric"
    />
        {/* Expiry Date */}    <Text style={styles.label}>Expiry Date</Text>   {' '}
    <TextInput
      value={state.expiry}
      onChangeText={handlers.setExpiry}
      placeholder="3/3/2025"
      style={styles.input}
    />
        {/* Dimensions */}    <Text style={styles.label}>Dimensions</Text>   {' '}
    <View style={styles.dimensionRow}>
           {' '}
      <TextInput
        style={[styles.input, styles.dimensionInput]}
        value={state.length}
        onChangeText={handlers.setLength}
        placeholder="Length"
        keyboardType="numeric"
      />
           {' '}
      <TextInput
        style={[styles.input, styles.dimensionInput]}
        value={state.width}
        onChangeText={handlers.setWidth}
        placeholder="Width"
        keyboardType="numeric"
      />
           {' '}
      <TextInput
        style={[styles.input, styles.dimensionInput, {marginRight: 0}]}
        value={state.height}
        onChangeText={handlers.setHeight}
        placeholder="Height"
        keyboardType="numeric"
      />
         {' '}
    </View>
        {/* Weight */}    <Text style={styles.label}>Weight (kg)</Text>   {' '}
    <TextInput
      value={state.weight}
      onChangeText={handlers.setWeight}
      placeholder="1.2"
      style={styles.input}
      keyboardType="numeric"
    />
     {' '}
  </View>
);

// 🏷️ Component for Product Variants
const VariantSection = ({variantColors, variantSizes}) => (
  <View style={styles.sectionCard}>
       {' '}
    <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Variants</Text>     {' '}
      <TouchableOpacity style={variantStyles.addButton}>
                <Text style={variantStyles.addButtonText}>+ Add</Text>     {' '}
      </TouchableOpacity>
         {' '}
    </View>
        {/* Colours */}    <Text style={styles.label}>Colours</Text>   {' '}
    <View style={variantStyles.chipContainer}>
           {' '}
      {variantColors.map((color, index) => (
        <View key={index} style={variantStyles.chip}>
                    <Text style={variantStyles.chipText}>{color}</Text>       {' '}
        </View>
      ))}
         {' '}
    </View>
        {/* Size */}    <Text style={styles.label}>Select Size</Text>   {' '}
    <TextInput
      value={variantSizes.join(', ')}
      placeholder="S, M, L"
      style={styles.input}
    />
        {/* Price */}    <Text style={styles.label}>Price</Text>
        <TextInput placeholder="15, 25, 45" style={styles.input} /> {' '}
  </View>
);

// 🎨 Styles for Variant Section
const variantStyles = StyleSheet.create({
  addButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  addButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
  },
  chip: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: COLORS.textDark,
    fontSize: 14,
  },
});

// 💾 Component for Save/Cancel Buttons
const ActionButtons = ({onSave, onCancel}) => (
  <View style={actionStyles.buttonRow}>
       {' '}
    <TouchableOpacity style={actionStyles.saveButton} onPress={onSave}>
            <Text style={actionStyles.saveText}>Save Changes</Text>   {' '}
    </TouchableOpacity>
       {' '}
    <TouchableOpacity style={actionStyles.cancelButton} onPress={onCancel}>
            <Text style={actionStyles.cancelText}>Cancel</Text>   {' '}
    </TouchableOpacity>
     {' '}
  </View>
);

// 🎨 Styles for Action Buttons
const actionStyles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  saveText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelText: {
    color: COLORS.textDark,
    fontWeight: '700',
    fontSize: 16,
  },
});

// 🧩 Main Component (Controller)
const AddNewProduct = () => {
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [unit, setUnit] = useState('');
  const [threshold, setThreshold] = useState('');
  const [price, setPrice] = useState('');
  const [expiry, setExpiry] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [variantColors, setVariantColors] = useState(['Green', 'Red', 'Blue']);
  const [variantSizes, setVariantSizes] = useState(['S', 'M', 'L']);

  // State object for ProductInfoSection
  const productState = {
    productName,
    brand,
    unit,
    threshold,
    price,
    expiry,
    length,
    width,
    height,
    weight,
  };
  // Handlers object for ProductInfoSection
  const productHandlers = {
    setProductName,
    setBrand,
    setUnit,
    setThreshold,
    setPrice,
    setExpiry,
    setLength,
    setWidth,
    setHeight,
    setWeight,
  };

  // 🧠 Function to handle form submission
  const handleSave = () => {
    console.log('Product Saved:', productState);
    // API call logic here
  }; // 🧠 Function to reset all fields

  const handleCancel = () => {
    setProductName('');
    setBrand('');
    setUnit('');
    setThreshold('');
    setPrice('');
    setExpiry('');
    setLength('');
    setWidth('');
    setHeight('');
    setWeight('');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}     {' '}
      <Text style={styles.headerTitle}>Add New Product</Text>     {' '}
      {/* 1. Product Images Section */}
            <ProductImageSection />     {' '}
      {/* 2. Product Info & Description Section */}     {' '}
      <ProductInfoSection state={productState} handlers={productHandlers} />   
        {/* 3. Variants Section */}     {' '}
      <VariantSection
        variantColors={variantColors}
        variantSizes={variantSizes}
      />
            {/* 4. Save/Cancel Buttons */}
            <ActionButtons onSave={handleSave} onCancel={handleCancel} />   {' '}
    </ScrollView>
  );
};

export default AddNewProduct;

// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Platform,
// } from 'react-native';
// import FormData from 'form-data';
// import React, {useState, useMemo, useEffect} from 'react';
// // Assuming these are all in ../../../components
// import PriceVariantGroup from '../../../components/PriceVariantGroup';
// import ProductImagePicker from '../../../components/ProductImagePicker';
// import InputGroup from '../../../components/InputGroup';
// import DescriptionInput from '../../../components/DescriptionInput';
// import DropdownGroup from '../../../components/DropdownGroup';
// import CheckboxGroup from '../../../components/CheckBoxGroup';
// import NumberInputGroup from '../../../components/NumberInputGroup';

// import {fetchChildCategories} from '../../../../utils/apiFunction';
// import Header from '../../../components/Header';
// import Loader from '../../../components/Loader';
// import useProductModal from '../../../../hooks/useProduct';
// import CardWithAction from '../../../components/CreateDeals/CardWithAction';

// // Utility to find the name of the page that is a collection (isCollection: true)
// const findCollectionPageName = apiMap => {
//   const collectionPage = apiMap.find(config => config.isCollection === true);
//   return collectionPage ? collectionPage.pageName : null;
// };

// // =========================================================================
// // REWRITTEN: Data Transformation Logic
// // It now uses the isCollection flag from the API map
// // =========================================================================
// const transformFormDataForSubmission = (formData, apiMap) => {
//   const submissionBody = {};

//   // 1. Find the collection page configuration using isCollection: true
//   const collectionPageConfig = apiMap.find(
//     config => config.isCollection === true,
//   );
//   const COLLECTION_KEY = collectionPageConfig
//     ? collectionPageConfig.pageName
//     : null;
//   const collectionData = COLLECTION_KEY ? formData[COLLECTION_KEY] || [] : [];

//   // 2. Process Non-Collection Pages (Standard Fields)
//   for (const pageConfig of apiMap) {
//     const isCollectionPage = pageConfig.isCollection === true;

//     if (isCollectionPage) {
//       continue;
//     }

//     // Iterate through sections and fields
//     for (const sectionConfig of pageConfig.sections) {
//       for (const fieldConfig of sectionConfig.fields) {
//         const fieldName = fieldConfig.fieldName;
//         const value = formData[fieldName];

//         if (value !== undefined) {
//           const key = `${pageConfig.pageName}.${sectionConfig.name}.${fieldName}`;

//           submissionBody[key] =
//             typeof value === 'boolean' ? String(value) : value;
//         }
//       }
//     }
//   }

//   // 3. Process Collection Pages (Array of Objects) - formerly Variant Pages
//   if (COLLECTION_KEY && collectionPageConfig) {
//     // Collect all static fieldNames from all collection sections
//     let staticCollectionFieldNames = [];
//     collectionPageConfig.sections.forEach(section => {
//       section.fields.forEach(field => {
//         staticCollectionFieldNames.push(field.fieldName);
//       });
//     });

//     // We assume the first section contains the main fields for indexing
//     const SECTION_KEY = collectionPageConfig.sections[0].name;

//     collectionData.forEach((collectionItem, index) => {
//       // Combine static fields with dynamically added fields (like 'color' or 'size')
//       const allCollectionFieldNames = new Set([
//         ...staticCollectionFieldNames,
//         ...Object.keys(collectionItem),
//       ]);

//       for (const fieldName of allCollectionFieldNames) {
//         const value = collectionItem[fieldName];

//         if (fieldName === COLLECTION_KEY || value === undefined) continue;

//         // Construct the final key: PageName[index].SectionName.fieldName
//         const key = `${COLLECTION_KEY}[${index}].${SECTION_KEY}.${fieldName}`;

//         submissionBody[key] =
//           typeof value === 'boolean' ? String(value) : value;
//       }
//     });
//   }

//   console.log('✅ Final API Submission Body (Object):', submissionBody);
//   return submissionBody;
// };

// const DynamicScreen = ({apiResponsedata, postapiEndpoints, selectedItem}) => {
//   const [subcategories, setSubcategories] = useState([]);
//   const [VariantUI, setVariantUI] = useState(null); // Dynamic attributes UI
//   const [categoryId, setCategoryId] = useState('');

//   const {
//     basicInformation,
//     getCategory,
//     isLoadinAllModal,
//     isLoading: isSubmitting,
//   } = useProductModal();

//   // Use the static mock JSON data
//   const getAllProductModal = apiResponsedata;

//   const [formData, setFormData] = useState(selectedItem ? selectedItem : {});
//   console.log(formData, 'Formdata*****');
//   const [productVariants, setProductVariants] = useState([]); // Not used, but kept for context
//   // State to manage dynamically added collection pages
//   const [collectionPages, setCollectionPages] = useState([]);

//   // Use this constant for the name of the collection page
//   const COLLECTION_PAGE_NAME = useMemo(
//     () => findCollectionPageName(getAllProductModal?.pages || []),
//     [getAllProductModal],
//   );

//   // 1. Refactor useMemo to perform all **sorting** and page extraction
//   const {nonCollectionPages, collectionPageTemplate} = useMemo(() => {
//     const rawPages = getAllProductModal?.pages || [];
//     // 1. Sort pages by 'order'
//     const sortedPages = [...rawPages].sort((a, b) => a.order - b.order);

//     const nonCollectionPages = [];
//     let collectionTemplate = null;

//     sortedPages.forEach(page => {
//       // Deep copy to ensure safe manipulation
//       const pageCopy = JSON.parse(JSON.stringify(page));

//       // 2. Sort sections within each page by 'order'
//       pageCopy.sections.sort((a, b) => a.order - b.order);

//       pageCopy.sections.forEach(section => {
//         // 3. Sort fields within each section by 'displayOrder'
//         if (section.fields) {
//           section.fields.sort((a, b) => a.displayOrder - b.displayOrder);
//         }
//       });
//       // End sorting logic

//       // REPLACED: pageCopy.pageName === 'Ecommerce_Product_Variant'
//       const isTargetPage = pageCopy.isCollection === true;

//       if (isTargetPage) {
//         collectionTemplate = pageCopy;
//       } else {
//         nonCollectionPages.push(pageCopy);
//       }
//     });

//     return {
//       nonCollectionPages,
//       collectionPageTemplate: collectionTemplate,
//     };
//   }, [getAllProductModal]);

//   // 2. Initialize the dynamic pages when the template is ready
//   useEffect(() => {
//     if (collectionPageTemplate && collectionPages.length === 0) {
//       // Add the first instance of the collection page with a unique ID
//       setCollectionPages([{...collectionPageTemplate, uniqueId: Date.now()}]);
//     }
//   }, [collectionPageTemplate, collectionPages.length]);

//   // 3. Handler to add a new collection page instance
//   const handleAddNewCollectionPage = () => {
//     if (!collectionPageTemplate) {
//       Alert.alert('Error', 'Collection page template not loaded.');
//       return;
//     }

//     // Create a new unique instance of the template page
//     const newPageInstance = {
//       ...JSON.parse(JSON.stringify(collectionPageTemplate)), // Deep copy sections and fields
//       uniqueId: Date.now() + Math.random(), // Ensure a unique key
//     };

//     setCollectionPages(prev => [...prev, newPageInstance]);
//   };

//   // =========================================================================
//   // REWRITTEN: Field Change Handler
//   // It now relies on the pageName argument to determine if it's a collection field
//   // =========================================================================
//   const handleFieldChange = (
//     fieldName,
//     value,
//     pageName = null, // This will be COLLECTION_PAGE_NAME if it's a collection field
//     pageIndex = null,
//   ) => {
//     // Check if the pageName passed matches the identified Collection page name
//     if (pageName === COLLECTION_PAGE_NAME && pageIndex !== null) {
//       setFormData(prev => {
//         const currentCollectionItems = prev[COLLECTION_PAGE_NAME] || [];
//         const targetCollectionItem = {
//           ...(currentCollectionItems[pageIndex] || {}),
//         };

//         targetCollectionItem[fieldName] = value;

//         const newCollectionItems = [...currentCollectionItems];
//         newCollectionItems[pageIndex] = targetCollectionItem;

//         return {
//           ...prev,
//           [COLLECTION_PAGE_NAME]: newCollectionItems,
//         };
//       });
//     } else {
//       // Handle non-collection pages (basic information)
//       setFormData(prev => ({...prev, [fieldName]: value}));
//     }
//   };

//   // =========================================================================
//   // REWRITTEN: Render Field Function
//   // It uses the COLLECTION_PAGE_NAME constant and checks against the arguments
//   // =========================================================================
//   const renderField = (field, pageName = null, pageIndex = null) => {
//     let fieldValue;

//     if (pageName === COLLECTION_PAGE_NAME && pageIndex !== null) {
//       fieldValue =
//         formData[COLLECTION_PAGE_NAME]?.[pageIndex]?.[field.fieldName];
//     } else {
//       fieldValue = formData[field.fieldName];
//     }

//     fieldValue = fieldValue ?? field.defaultValue;

//     const commonProps = {
//       key: field.id,
//       label: field.label,
//       placeholder: field.placeholder,
//       isRequired: field.isRequired,
//       options: field.options,
//       value: fieldValue,
//       // Pass the collection context only if pageName and pageIndex are available
//       onChange: value =>
//         handleFieldChange(field.fieldName, value, pageName, pageIndex),
//       onChangeText: text =>
//         handleFieldChange(field.fieldName, text, pageName, pageIndex),
//     };

//     switch (field.fieldType) {
//       case 'Text':
//         return <InputGroup {...commonProps} />;

//       case 'Number':
//         return <NumberInputGroup {...commonProps} />;
//       case 'Checkbox':
//         return (
//           <CheckboxGroup {...commonProps} onChange={commonProps.onChange} />
//         );
//       case 'TextArea':
//         return <DescriptionInput {...commonProps} />;

//       case 'MultiSelect':
//         return <PriceVariantGroup {...commonProps} />;

//       case 'Page':
//         const endpoint = field.endpoint;

//         // UNSAFE: This async call inside renderField should be refactored to useEffect,
//         // but we keep the logic structure as is for requested code rewrite.
//         if (categoryId && !VariantUI) {
//           (async () => {
//             try {
//               const categoryData = await fetchChildCategories(
//                 endpoint,
//                 categoryId,
//                 'categoryId',
//               );
//               setVariantUI(categoryData?.data);
//             } catch (e) {
//               console.error("Fetch failed in 'Page' case:", e);
//             }
//           })();
//         }

//         if (field.fieldType === 'Page') {
//           // Renders the entire VariantUI block (sections + fields) here
//           return VariantUI?.sections ? (
//             <View key={field.id} style={styles.variantAttributesBlock}>
//               <Text style={styles.variantBlockTitle}>
//                 {VariantUI.title || field.label}
//               </Text>

//               {VariantUI.sections.map(section => (
//                 <View key={section.id} style={styles.sectionContainer}>
//                   <Text style={styles.sectionTitle}>{section.title}</Text>
//                   {/* Fields within the VariantUI section are rendered here */}
//                   {section.fields
//                     .sort((a, b) => a.displayOrder - b.displayOrder)
//                     .map(
//                       attributeField =>
//                         attributeField.isVisible !== false &&
//                         // IMPORTANT: Pass the context of the main collection page instance
//                         renderField(attributeField, pageName, pageIndex),
//                     )}
//                 </View>
//               ))}
//             </View>
//           ) : (
//             <Text style={styles.loadingText}>
//               Select a Category to load dynamic attributes...
//             </Text>
//           );
//         }
//         return null;

//       case 'Select':
//         // --- Data Mapping (For the initial parent category dropdown) ---
//         const rawCategoryItems = getCategory?.items ?? [];
//         const mappedCategoryOptions = rawCategoryItems
//           .filter(item => item && item.id && item.name)
//           .map(item => ({
//             value: String(item.id),
//             label: item.name,
//           }));

//         // --- Handler to Fetch Children and Update State ---
//         const handleCategorySelect = async selectedId => {
//           // 1. Update the form state for the currently selected dropdown
//           commonProps.onChange(selectedId);
//           setCategoryId(selectedId);
//           try {
//             // 2. Fetch the child data (Subcategories)
//             const response = await fetchChildCategories(
//               'Category',
//               selectedId,
//               'parentId', // Query key is 'parentId'
//             );

//             const subcategoryItems = response?.data?.items ?? [];
//             setSubcategories(subcategoryItems);
//           } catch (error) {
//             console.error('Failed to fetch data:', error);
//             setSubcategories([]);
//           }
//         };

//         // --- Subcategory Options Mapping ---
//         const mappedSubcategoryOptions = subcategories
//           .filter(item => item && item.id && item.name)
//           .map(item => ({
//             value: String(item.id),
//             label: item.name,
//           }));

//         // --- RENDERING LOGIC ---
//         if (field?.fieldName === 'category_id') {
//           return (
//             <DropdownGroup
//               {...commonProps}
//               options={mappedCategoryOptions}
//               onSelect={handleCategorySelect} // Triggers fetch
//               onChangeText={() => {}}
//             />
//           );
//         } else if (field?.fieldName === 'subcategory_id') {
//           return (
//             <DropdownGroup
//               {...commonProps}
//               options={mappedSubcategoryOptions}
//               onSelect={commonProps.onChange}
//               onChangeText={() => {}}
//             />
//           );
//         }

//         // For all other 'Select' fields
//         return (
//           <DropdownGroup
//             {...commonProps}
//             options={field.options ?? []}
//             onSelect={commonProps.onChange}
//             onChangeText={() => {}}
//           />
//         );

//       case 'File':
//         return (
//           <ProductImagePicker
//             {...commonProps}
//             key={field.id}
//             // If it's a collection, read from the variant object. Otherwise, read from formData.
//             images={
//               (pageName === COLLECTION_PAGE_NAME && pageIndex !== null
//                 ? formData[COLLECTION_PAGE_NAME]?.[pageIndex]?.[field.fieldName]
//                 : formData[field.fieldName]) || []
//             }
//             setImages={commonProps.onChange}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   // --- 4. SUBMISSION HANDLER ---
//   const handleSubmit = async () => {
//     // 1. Transform the formData into the API's required structure
//     const submissionData = transformFormDataForSubmission(
//       formData,
//       apiResponsedata?.pages,
//     );
//     // 2. Create a FormData object (required for multipart/form-data)

//     const formPayload = new FormData();

//     // Append all key-value pairs to FormData
//     for (const key in submissionData) {
//       if (Object.prototype.hasOwnProperty.call(submissionData, key)) {
//         const value = submissionData[key];
//         formPayload.append(key, value);
//       }
//     }

//       // 3. Log the payload (for debugging) and submit
//       console.log('Final Submission Payload (Object):', formPayload);

//     try {
//       // API call goes here: e.g., await submitProductData(formPayload);
//       Alert.alert('Success', 'Product submitted successfully!');
//     } catch (error) {
//       console.error('Submission failed:', error);
//       Alert.alert('Error', 'Failed to submit product data.');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.contentContainer}>
//       <Header title={'Add New Product'} onBackPress={true} />
//       {/* <Loader visible={isLoadinAllModal || isSubmitting} /> */}

//       {/* 2. RENDERING: Map over the non-collection pages */}
//       {/* {nonCollectionPages.map(page => (
//         <View key={page.pageId}>
//           <View style={styles.headerContainer}>
//             <Text style={styles.pageTitle}>{page.title}</Text>
//           </View>

//           {page.sections.map(section => (
//             <View key={section.id} style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>{section.title}</Text>
//               {section.description && (
//                 <Text style={styles.sectionDescription}>
//                   {section.description}
//                 </Text>
//               )}

//               {section.fields.map(
//                 field => field.isVisible !== false && renderField(field),
//               )}
//             </View>
//           ))}
//         </View>
//       ))} */}

//       {/* 3. RENDERING: Dynamic Collection Pages (formerly Variant Pages) */}
//       {/* {collectionPages.map((page, index) => {
//         const titleSuffix = index > 0 ? ` (Instance ${index + 1})` : '';
//         const isFirstInstance = index === 0;

//         // Use the dynamic pageName from the instance
//         const currentPageName = page.pageName;

//         return (
//           <View key={page.uniqueId} style={styles.variantPageWrapper}>
//             <View style={styles.headerContainer}>
//               <Text style={styles.pageTitle}>
//                 {page.title}
//                 {titleSuffix}
//               </Text>

//               {/* Conditional "Add New" button using isCollection=true logic */}
//       {/* {isFirstInstance && page.isCollection === true && (
//                 <TouchableOpacity
//                   style={styles.addButton}
//                   onPress={handleAddNewCollectionPage}>
//                   <Text style={styles.addButtonText}>+ Add New</Text>
//                 </TouchableOpacity>
//               )}
//             </View> */}

//       {/* {page.sections.map(section => (
//               <View key={section.id} style={styles.sectionContainer}>
//                 <Text style={styles.sectionTitle}>{section.title}</Text>
//                 {section.description && (
//                   <Text style={styles.sectionDescription}>
//                     {section.description}
//                   </Text>
//                 )}

//                 {section.fields.map(
//                   field =>
//                     field.isVisible !== false &&
//                     // PASS current pageName and index to correctly handle state access
//                     renderField(field, currentPageName, index),
//                 )}
//               </View>
//             ))} */}
//       {/* </View> */}
//       {/* ); */}
//       {/* })} */}

//       {/* 2. RENDERING: Map over the non-collection pages */}
//       {nonCollectionPages.map(page => (
//         <View key={page.pageId}>
//           <View style={styles.headerContainer}>
//             <Text style={styles.pageTitle}>{page.title}</Text>
//           </View>

//           {page.sections.map(section => {
//             const SectionContent =
//               // Map fields for all section types
//               section.fields.map(
//                 field => field.isVisible !== false && renderField(field),
//               );

//             // Conditional rendering based on section.type
//             if (section.type === 'cardwithaction') {
//               return (
//                 <CardWithAction
//                   key={section.id}
//                   title={section.title}
//                   description={section.description}>
//                   {SectionContent}
//                 </CardWithAction>
//               );
//             }

//             // Default rendering for "normal" and other types
//             return (
//               <View key={section.id} style={styles.sectionContainer}>
//                 <Text style={styles.sectionTitle}>{section.title}</Text>
//                 {section.description && (
//                   <Text style={styles.sectionDescription}>
//                     {section.description}
//                   </Text>
//                 )}
//                 {SectionContent}
//               </View>
//             );
//           })}
//         </View>
//       ))}

//       {/* 3. RENDERING: Dynamic Collection Pages (formerly Variant Pages) */}
//       {collectionPages.map((page, index) => {
//         const titleSuffix = index > 0 ? ` (Instance ${index + 1})` : '';
//         const isFirstInstance = index === 0;

//         // Use the dynamic pageName from the instance
//         const currentPageName = page.pageName;

//         return (
//           <View key={page.uniqueId} style={styles.variantPageWrapper}>
//             <View style={styles.headerContainer}>
//               <Text style={styles.pageTitle}>
//                 {page.title}
//                 {titleSuffix}
//               </Text>

//               {/* ✅ CORRECTED: RESTORED BUTTONS LOCATION */}
//               <View style={styles.buttonGroup}>
//                 {/* 1. Add New Button (Only on the first instance) */}
//                 {isFirstInstance && page.isCollection === true && (
//                   <TouchableOpacity
//                     style={styles.addButton}
//                     onPress={handleAddNewCollectionPage}>
//                     <Text style={styles.addButtonText}>+ Add New</Text>
//                   </TouchableOpacity>
//                 )}

//                 {/* 2. Remove Button (On all subsequent instances) */}
//                 {!isFirstInstance && page.isCollection === true && (
//                   <TouchableOpacity
//                     style={styles.removeButton} // Assuming you defined this style
//                     onPress={
//                       () => handleRemoveCollectionPage(page.uniqueId, index) // Assuming this handler exists
//                     }>
//                     <Text style={styles.removeButtonText}>Remove</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//               {/* END RESTORED BUTTONS LOCATION */}
//             </View>

//             {/* Now we map over the sections, respecting the type */}
//             {page.sections.map(section => {
//               const SectionContent = section.fields.map(
//                 field =>
//                   field.isVisible !== false &&
//                   renderField(field, currentPageName, index),
//               );

//               if (section.type === 'cardwithaction') {
//                 return (
//                   <CardContainer
//                     key={section.id}
//                     title={section.title}
//                     description={section.description}>
//                     {SectionContent}
//                   </CardContainer>
//                 );
//               }

//               // Default rendering for "normal" and other types
//               return (
//                 <View key={section.id} style={styles.sectionContainer}>
//                   <Text style={styles.sectionTitle}>{section.title}</Text>
//                   {section.description && (
//                     <Text style={styles.sectionDescription}>
//                       {section.description}
//                     </Text>
//                   )}
//                   {SectionContent}
//                 </View>
//               );
//             })}
//           </View>
//         );
//       })}

//       <TouchableOpacity
//         style={[
//           styles.submitButton,
//           isSubmitting && styles.submitButtonDisabled,
//         ]}
//         onPress={handleSubmit}
//         disabled={isSubmitting}>
//         <Text style={styles.submitButtonText}>
//           {isSubmitting ? 'Loading...' : 'SAVE PRODUCT'}
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default DynamicScreen;

// // =========================================================================
// const styles = StyleSheet.create({
//   contentContainer: {
//     padding: 20,
//     backgroundColor: '#fff',
//     minHeight: '100%',
//   },
//   variantPageWrapper: {
//     marginBottom: 30, // Space between dynamically added pages
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   addButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   addButton: {
//     backgroundColor: '#F89941',
//     borderRadius: 5,
//     width: 100, // Slightly wider to fit "Add New Variant"
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pageTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//     paddingBottom: 5,
//     color: '#333',
//   },
//   sectionContainer: {
//     marginBottom: 25,
//     paddingBottom: 15,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: '#ccc',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: 4,
//   },
//   sectionDescription: {
//     fontSize: 14,
//     color: '#888',
//     marginBottom: 15,
//   },
//   submitButton: {
//     backgroundColor: '#F89941',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 30,
//     marginBottom: 50,
//   },
//   submitButtonDisabled: {
//     backgroundColor: '#FFA07A',
//     opacity: 0.7,
//   },
//   submitButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   // Styles for Variant Attributes Block
//   variantAttributesBlock: {
//     marginTop: 20,
//     padding: 15,
//     borderRadius: 8,
//     backgroundColor: '#F9FAFB', // Light gray background
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   variantBlockTitle: {
//     fontSize: 18,
//     fontWeight: '800',
//     color: '#333',
//     marginBottom: 15,
//   },
//   loadingText: {
//     fontSize: 14,
//     color: '#999',
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//     textAlign: 'center',
//   },
// });
