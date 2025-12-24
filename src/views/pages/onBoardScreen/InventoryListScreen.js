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
import InventoryListScreen from '../../components/InventoryList';
import {useSelector} from 'react-redux';

import {
  ArrowIconSvg,
  FilterIconSvg,
  SearchIcon,
} from '../../../assets/startUpImg';

const Dashboard = () => {
  // const {useTypeStore} = useSelector(({user}) => user);
  const useTypeStore = 'User';
  // console.log(useTypeStore, 'useTypeStoreuseTypeStore');

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
          <SearchIcon style={styles.searchImage} />
          <TextInput
            placeholder="Search Product or orders"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity onPress={openFilters} style={{padding: 1}}>
          <FilterIconSvg
            source={isFilterVisible ? ActiveFilterIcon : FilterIcon}
            style={styles.filterImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <BottomSheetFilter isVisible={isFilterVisible} onClose={closeFilters} />

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
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
            <Text style={styles.cardValue}>₹25000</Text>
            <Text style={styles.cardSub}>Last 7 Days</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Top Selling</Text>
            <Text style={styles.cardValue}>5</Text>
            <Text style={styles.cardSub}>Cost ₹5500</Text>
          </View>
        </View>

        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.card2Title}>Low Stock</Text>
            <Text style={styles.cardValue}>12</Text>
            <Text style={styles.cardSub}>20 Units ordered</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.card2Title}>Out of Stock</Text>
            <Text style={styles.cardValue}>0</Text>
            <Text style={styles.cardSub}>0 Units Left</Text>
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
          <ArrowIconSvg style={styles.arrowImage} resizeMode="contain" />
        </TouchableOpacity>
        <InventoryListScreen />
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
    marginTop: '20',
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',
    padding: 1,
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
    borderColor: '#FF8719',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  cardTitle: {
    fontSize: 13,
    color: '#FF7A00',
    fontFamily: 'Roboto',
    fontWeight: 600,
  },
  card2Title: {
    fontSize: 13,
    color: '#D24648',
    fontFamily: 'Roboto',
    fontWeight: 600,
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
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  orangeBtnLight: {
    backgroundColor: '#FF8719',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  uploadBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFAF66',
    padding: 18,
    borderRadius: 10,
    marginTop: 30,
  },
  btnText: {color: '#fff', fontWeight: '700', fontSize: 14},

  dealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFF',
    padding: 18,
    borderRadius: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  dealText: {fontWeight: '700', color: '#000', marginStart: 10},
});

// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Alert, // Added Alert for feedback
// } from 'react-native';
// import React, {useState, useMemo} from 'react';
// // Assuming these paths are correct
// import PriceVariantGroup from '../../components/PriceVariantGroup';
// import ProductImagePicker from '../../components/ProductImagePicker';
// import useProductModal from '../../../hooks/useProduct';
// import InputGroup from '../../components/InputGroup';
// import DescriptionInput from '../../components/DescriptionInput';
// import DropdownGroup from '../../components/DropdownGroup';
// import CheckboxGroup from '../../components/CheckBoxGroup';
// import NumberInputGroup from '../../components/NumberInputGroup';
// import Feather from 'react-native-vector-icons/Feather'; // For styling/icons if needed

// // --- API Configuration ---
// const PRODUCT_API_URLS = {
//   Ecommerce_Product_Basic:
//     'https://dev-backend.nextgenedus.com/api/v1/Products/basic-information',
//   Ecommerce_Product_Details:
//     'https://dev-backend.nextgenedus.com/api/v1/Products/details',
//   Ecommerce_Product_Variant:
//     'https://dev-backend.nextgenedus.com/api/v1/Products/variants',
//   Ecommerce_Product_Compliance:
//     'https://dev-backend.nextgenedus.com/api/v1/Products/compliance',
// };

// // --- API Payload Utility ---
// // ⚠️ NOTE: This function is complex due to the API's nested FormData requirement.
// // It is a necessary implementation based on the structure you provided.
// const createAPIFormData = (pageData, pageName, currentProductId) => {
//   const formData = new FormData();
//   formData.append('pageName', pageName);

//   if (currentProductId) {
//     formData.append('productId', currentProductId);
//   }

//   // --- Logic for Basic, Details, Compliance Pages (Simple fields[i].fieldName structure) ---
//   if (pageName !== 'Ecommerce_Product_Variant') {
//     let fieldIndex = 0;

//     pageData.forEach(field => {
//       const base = `fields[${fieldIndex}]`;
//       formData.append(`${base}.fieldName`, field.fieldName);

//       if (field.fieldType === 'File' || field.fieldType === 'imgpicker') {
//         // Assuming 'value' is an array of local image URIs
//         (field.value || []).forEach(uri => {
//           const fileExtension = uri.split('.').pop();
//           formData.append(`${base}.file`, {
//             uri: uri,
//             name: `${field.fieldName}-${Date.now()}.${fileExtension}`,
//             type: `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`,
//           });
//         });
//       } else {
//         // For Text, Number, Select, Checkbox (API expects string representation)
//         formData.append(`${base}.value`, String(field.value));
//       }
//       fieldIndex++;
//     });
//   }
//   // --- Logic for Variant Page (variants[i].pageData.fields[j].fieldName structure) ---
//   else {
//     // Find the variants array within pageData
//     const variantEntry = pageData.find(d => d.fieldName === 'variants');
//     const variants = variantEntry ? variantEntry.value : [];

//     variants.forEach((variant, vIndex) => {
//       const base = `variants[${vIndex}].pageData`;
//       formData.append(`${base}.pageName`, pageName);

//       // Loop through the fields INSIDE the variant object (which comes from PriceVariantGroup)
//       variant.fields.forEach((field, fIndex) => {
//         formData.append(`${base}.fields[${fIndex}].fieldName`, field.fieldName);
//         formData.append(`${base}.fields[${fIndex}].value`, String(field.value));
//       });

//       // Handle variant images/documents (simplified)
//       (variant.documents || []).forEach((doc, dIndex) => {
//         // Assuming doc.file is the local URI
//         const fileExtension = doc.file.split('.').pop();
//         formData.append(
//           `${base}.documents[${dIndex}].fieldName`,
//           doc.fieldName,
//         );
//         formData.append(`${base}.documents[${dIndex}].file`, {
//           uri: doc.file,
//           name: `${doc.fieldName}-${Date.now()}.${fileExtension}`,
//           type: `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`,
//         });
//       });
//     });
//   }

//   return formData;
// };

// const AddNewProduct = () => {
//   const {
//     getAllProductModal,
//     basicInformation,
//     productVariantApi,
//     productDetailapi,
//     ProductsCompliance,
//   } = useProductModal();

//   const [formData, setFormData] = useState({});
//   const [productVariants, setProductVariants] = useState([]);
//   const [currentProductId, setCurrentProductId] = useState(null); // State to track ID after Step 1
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // 1. REVISED LOGIC: Sort and Structure the form data for display (Same as before)
//   const structuredForm = useMemo(() => {
//     // ... (rest of sorting logic remains the same) ...
//     const rawPages = getAllProductModal?.pages || [];
//     const sortedPages = [...rawPages].sort((a, b) => a.order - b.order);
//     return sortedPages.map(page => {
//       const sortedSections = page.sections
//         ? [...page.sections].sort((a, b) => a.order - b.order)
//         : [];
//       const sectionsWithSortedFields = sortedSections.map(section => ({
//         ...section,
//         fields: section.fields
//           ? [...section.fields].sort((a, b) => a.displayOrder - b.displayOrder)
//           : [],
//       }));
//       return {...page, sections: sectionsWithSortedFields};
//     });
//   }, [getAllProductModal]);

//   // 2. NEW LOGIC: Group collected formData values by PageName for API submission
//   const dataGroupedByPage = useMemo(() => {
//     const groupedData = {};
//     const rawPages = getAllProductModal?.pages || [];

//     rawPages.forEach(page => {
//       const pageName = page.pageName;
//       groupedData[pageName] = [];

//       page.sections.forEach(section => {
//         section.fields.forEach(field => {
//           const fieldValue = formData[field.fieldName];

//           // Collect all necessary fields for submission payload
//           if (
//             fieldValue !== null &&
//             fieldValue !== undefined &&
//             fieldValue !== ''
//           ) {
//             groupedData[pageName].push({
//               fieldName: field.fieldName,
//               value: fieldValue,
//               fieldType: field.fieldType,
//             });
//           }
//         });
//       });
//     });

//     // Explicitly handle the 'variants' data under its designated page
//     if (productVariants.length > 0) {
//       groupedData['Ecommerce_Product_Variant'].push({
//         fieldName: 'variants',
//         value: productVariants, // Pass the entire structured array
//         fieldType: 'Array',
//       });
//     }

//     return groupedData;
//   }, [formData, productVariants, getAllProductModal]);

//   const handleFieldChange = (fieldName, value) => {
//     setFormData(prev => ({...prev, [fieldName]: value}));
//   };

//   const renderField = field => {
//     // ... (renderField logic remains the same for component rendering) ...
//     const commonProps = {
//       key: field.id,
//       label: field.label,
//       placeholder: field.placeholder,
//       isRequired: field.isRequired,
//       isReadOnly: field.isReadOnly,
//       helpText: field.helpText,
//       maxLength: field.maxLength,
//       regexPattern: field.regexPattern,
//       value: formData[field.fieldName] || field.defaultValue,
//       onChangeText: text => handleFieldChange(field.fieldName, text),
//       onChange: value => handleFieldChange(field.fieldName, value),
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
//       case 'Select':
//         return (
//           <DropdownGroup
//             {...commonProps}
//             options={field.options || []}
//             onSelect={commonProps.onChange}
//             onChangeText={() => {}}
//           />
//         );
//       case 'imgpicker':
//       case 'File':
//         return (
//           <ProductImagePicker
//             key={field.id}
//             images={formData[field.fieldName] || []}
//             setImages={commonProps.onChange}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   // --- 3. SEQUENTIAL SUBMISSION HANDLER ---
//   const handleSubmit = async () => {
//     if (isSubmitting) return;

//     const pageNamesToSubmit = [
//       'Ecommerce_Product_Basic',
//       'Ecommerce_Product_Details',
//       'Ecommerce_Product_Variant',
//       'Ecommerce_Product_Compliance',
//     ];

//     setIsSubmitting(true);
//     let tempProductId = currentProductId;

//     try {
//       for (const pageName of pageNamesToSubmit) {
//         const endpoint = PRODUCT_API_URLS[pageName];
//         const pageData = dataGroupedByPage[pageName];

//         if (!endpoint || !pageData || pageData.length === 0) {
//           console.warn(
//             `Skipping submission for ${pageName}: No data or endpoint.`,
//           );
//           continue;
//         }

//         // Create API-specific FormData payload
//         const apiPayload = createAPIFormData(pageData, pageName, tempProductId);

//         // ⚠️ Replace with your actual authentication token and headers
//         const response = await fetch(endpoint, {
//           method: 'POST',
//           // Ensure you set Authorization header here
//           // headers: { 'Authorization': `Bearer YOUR_TOKEN` },
//           body: apiPayload,
//         });

//         const result = await response.json();

//         if (!response.ok) {
//           throw new Error(
//             `[${pageName}] Failed: ${result.message || response.statusText}`,
//           );
//         }

//         // CRUCIAL: Capture the Product ID from the first step
//         if (
//           pageName === 'Ecommerce_Product_Basic' &&
//           result.data &&
//           result.data.productId
//         ) {
//           tempProductId = result.data.productId;
//           setCurrentProductId(tempProductId);
//         }
//       }

//       Alert.alert(
//         'Success',
//         `Product creation completed! Product ID: ${tempProductId}`,
//       );
//       // Reset form or navigate away here
//       setFormData({});
//     } catch (error) {
//       Alert.alert('Submission Failed', error.message);
//       console.error('Submission sequence failed:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.contentContainer}>
//       <Text style={styles.header}>Add New Product</Text>

//       {/* 2. RENDERING: Map over the sorted structured data */}
//       {structuredForm.map(page => (
//         <View key={page.pageId}>
//           <Text style={styles.pageTitle}>{page.title}</Text>

//           {page.sections.map(section => (
//             <View key={section.id} style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>{section.title}</Text>
//               {section.description && (
//                 <Text style={styles.sectionDescription}>
//                   {section.description}
//                 </Text>
//               )}

//               {/* Render sorted fields within the section */}
//               {section.fields.map(
//                 field => field.isVisible !== false && renderField(field),
//               )}
//             </View>
//           ))}
//         </View>
//       ))}

//       {/* Fixed Components (outside the dynamic sections) */}
//       <Text style={styles.sectionTitle}>Price & Variants</Text>
//       <PriceVariantGroup onVariantsChange={setProductVariants} />

//       <TouchableOpacity
//         style={[
//           styles.submitButton,
//           isSubmitting && styles.submitButtonDisabled,
//         ]}
//         onPress={handleSubmit}
//         disabled={isSubmitting}>
//         <Text style={styles.submitButtonText}>
//           {isSubmitting ? 'SAVING...' : 'SAVE PRODUCT'}
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default AddNewProduct;

// const styles = StyleSheet.create({
//   contentContainer: {
//     padding: 20,
//     backgroundColor: '#fff',
//     minHeight: '100%',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: '800',
//     marginBottom: 20,
//     color: '#333',
//   },
//   pageTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginBottom: 15,
//     borderBottomWidth: 2,
//     borderBottomColor: '#FF8719',
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
//     backgroundColor: '#FF8719',
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
// });

// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   Dimensions,
//   ActivityIndicator,
// } from 'react-native';
// import React, {useState, useMemo, useEffect, useRef} from 'react';
// import BottomSheetFilter from './BottomSheetFilter';
// import DealsDiscountScreen from './DealsDiscountScreen';

// const FilterIcon = require('../../../assets/filter_icon.png');
// const ActiveFilterIcon = require('../../../assets/filter_fill.png');
// import {useNavigation} from '@react-navigation/native';
// import useDashboard from '../../../hooks/useDashboard';
// import InventoryList from '../../components/InventoryList';
// import {extractFieldLabelMapForPage} from '../../../utils/modal/customCodeModal';
// import {fetchChildCategories} from '../../../utils/apiFunction';

// // --- Dimensions for Card Width Calculation ---
// const {width} = Dimensions.get('window');
// const CARD_MARGIN = 8;

// // --- Utility to convert a readable name to a machine key (e.g., "Low Stock" -> "low_stock") ---
// const toKpiKey = name => {
//   if (!name) return '';
//   return name.toLowerCase().replace(/\s/g, '_');
// };

// // --- KPI Value Formatting Function (Updated to use kpi_name/kpi_value) ---
// function formatKpiValue(kpi) {
//   const value = kpi.kpi_value;
//   const kpiKey = toKpiKey(kpi.kpi_name);

//   // Since explicit type metadata is missing, we infer currency for these keys
//   if (kpiKey === 'revenue' || kpiKey === 'cost') {
//     const formattedValue = parseFloat(value).toLocaleString(undefined, {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//     // Assuming AED as per typical context, or you can use '$'
//     const currencySymbol = 'AED';
//     return `${currencySymbol} ${formattedValue}`;
//   } else if (!isNaN(parseFloat(value))) {
//     const formattedValue = parseFloat(value).toLocaleString(undefined, {
//       maximumFractionDigits: 0,
//     });
//     return formattedValue;
//   }
//   return value;
// }

// // --- KpiCard Component Definition (Updated to use kpi_name/kpi_value) ---
// const KpiCard = ({item}) => {
//   // Derive kpiKey from kpi_name for styling logic
//   const kpiKey = toKpiKey(item.kpi_name);

//   // Use the derived kpiKey for secondary styling
//   const isSecondaryStyle =
//     kpiKey === 'low_stock' || kpiKey === 'out_of_stock' || kpiKey === 'cost';

//   // Pass the entire item object (with kpi_value) to formatter
//   const formattedValue = formatKpiValue(item);
//   const cardStyle = isSecondaryStyle ? styles.card2 : styles.card;
//   const titleStyle = isSecondaryStyle ? styles.card2Title : styles.cardTitle;

//   // Use kpi_period or fallback to kpi_description
//   const subText = item.kpi_period || item.kpi_description || 'Overall';

//   return (
//     <View
//       style={[
//         cardStyle,
//         {width: width / 2 - 24, marginHorizontal: CARD_MARGIN / 2},
//       ]}>
//       <Text style={titleStyle} numberOfLines={1}>
//         {item.kpi_name} {/* 👈 Reading kpi_name */}
//       </Text>
//       <Text style={styles.cardValue}>{formattedValue}</Text>
//       <Text style={styles.cardSub} numberOfLines={1}>
//         {subText} {/* 👈 Reading kpi_period/kpi_description */}
//       </Text>
//     </View>
//   );
// };
// // --- END KpiCard Component ---

// const InventoryListScreen = () => {
//   const {
//     getDashboardList,
//     isLoadingDashboard,
//     getStuctDashboard,
//     isLoadignStuctDashboard,
//     filterUIApi,
//     isLoadingFilterUI,
//   } = useDashboard();
//   const isFirstRender = useRef(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const filterDynamicLabel = extractFieldLabelMapForPage(filterUIApi);

//   const [dataList, setDataList] = useState([]);
//   console.log(dataList, 'exported data');

//   const navigation = useNavigation();
//   const dashboardData = getDashboardList?.items || [];

//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       SearchProduct(searchQuery); // 🔥 instant API on mount
//       return;
//     }

//     const timeout = setTimeout(() => {
//       if (searchQuery !== '') {
//         SearchProduct(searchQuery);
//       }
//     }, 500); // ⏳ 500ms debounce

//     return () => clearTimeout(timeout);
//   }, [searchQuery]);

//   const SearchProduct = async query => {
//     try {
//       setLoading(true);

//       const response = await fetchChildCategories(
//         '/api/v1/Products',
//         query,
//         'PageName=Inventory_Product_List&Q',
//       );

//       setDataList(response?.data?.items || []);
//     } catch (err) {
//       setDataList([]); // reset list on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     SearchProduct();
//   }, []);

//   const openFilters = () => setIsFilterVisible(true);
//   const closeFilters = () => setIsFilterVisible(false);

//   const handlePressBulk = () => {
//     navigation.navigate('BulkUpload');
//   };
//   const handlePressAddProduct = () => {
//     navigation.navigate('AddNewProduct', {});
//   };
//   const handlePressDeals = () => {
//     navigation.navigate('DealsDiscountScreen');
//   };

//   const renderKpiItem = ({item}) => <KpiCard item={item} />;

//   return (
//     <View style={styles.container}>
//       {/* Search */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchBox}>
//           <Image
//             source={require('../../../assets/search_icon.png')}
//             style={styles.searchImage}
//             resizeMode="contain"
//           />
//           <TextInput
//             placeholder={filterDynamicLabel?.search_query_placeholder}
//             placeholderTextColor="#888"
//             style={styles.searchInput}
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//         </View>
//         <TouchableOpacity onPress={openFilters}>
//           <Image
//             source={isFilterVisible ? ActiveFilterIcon : FilterIcon}
//             style={styles.filterImage}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       </View>

//       <BottomSheetFilter
//         isVisible={isFilterVisible}
//         onClose={closeFilters}
//         exportData={setDataList}
//       />

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}>
//         <Text style={styles.sectionTitle}>Overall Inventory</Text>

//         {/* Cards Grid - FlatList Implementation */}
//         <FlatList
//           data={dashboardData} // Using the FILTERED data
//           keyExtractor={item => item.kpi_name} // 👈 Using kpi_name for key
//           renderItem={renderKpiItem}
//           numColumns={2}
//           scrollEnabled={false}
//           columnWrapperStyle={styles.cardRow}
//           ListEmptyComponent={() =>
//             !isLoadingDashboard &&
//             dashboardData.length === 0 && (
//               <Text style={styles.emptyText}>
//                 {searchQuery
//                   ? `No results found for "${searchQuery}".`
//                   : 'No inventory data available.'}
//               </Text>
//             )
//           }
//         />

//         {isLoadingDashboard && (
//           <ActivityIndicator
//             size="large"
//             color="#FF8719"
//             style={{marginTop: 20}}
//           />
//         )}

//         {/* Buttons and Deals Card... (rest of the component) */}
//         <TouchableOpacity
//           style={styles.orangeBtn}
//           onPress={handlePressAddProduct}>
//           <Image
//             source={require('../../../assets/plus_icon.png')}
//             style={styles.uploadImage}
//             resizeMode="contain"
//           />
//           <Text style={[styles.btnText, {marginStart: 5}]}>
//             Add New Products
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.orangeBtnLight}>
//           <Text style={styles.btnText}>View all Products</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.uploadBtn} onPress={handlePressBulk}>
//           <Image
//             source={require('../../../assets/upload_icon.png')}
//             style={styles.uploadImage}
//             resizeMode="contain"
//           />
//           <Text style={[styles.btnText, {marginLeft: 6}]}>Bulk Upload</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.dealCard} onPress={handlePressDeals}>
//           <Image
//             source={require('../../../assets/cuppons_icon.png')}
//             style={styles.discountImage}
//             resizeMode="contain"
//           />
//           <Text style={styles.dealText}>Deals & Discount</Text>
//           <Image
//             source={require('../../../assets/arrow_icon.png')}
//             style={styles.arrowImage}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>

//         <InventoryList dataList={dataList} loading={loading} />
//       </ScrollView>
//     </View>
//   );
// };

// export default InventoryListScreen;

// // --- Stylesheet (Kept for completeness) ---
// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 16},
//   scrollContent: {
//     paddingBottom: 100,
//   },

//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   searchBox: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffff',
//     borderRadius: 8,
//     borderColor: '#D7D7D7',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     color: '#000',
//     fontSize: 12,
//   },

//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginVertical: 10,
//     color: '#000',
//   },

//   cardRow: {
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },

//   card: {
//     backgroundColor: '#fff7f0',
//     borderColor: '#FF8719',
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 12,
//     height: 100,
//     justifyContent: 'space-around',
//   },
//   card2: {
//     backgroundColor: '#ffedee',
//     borderColor: '#D24648',
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 12,
//     height: 100,
//     justifyContent: 'space-around',
//   },
//   cardTitle: {
//     fontSize: 13,
//     color: '#FF7A00',
//     fontWeight: '500',
//   },
//   card2Title: {
//     fontSize: 13,
//     color: '#D24648',
//     fontWeight: '500',
//   },
//   cardValue: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#000',
//     marginVertical: 4,
//   },
//   cardSub: {
//     fontSize: 10,
//     color: '#5F6368',
//     fontWeight: '500',
//   },

//   orangeBtn: {
//     backgroundColor: '#FF8719',
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   orangeBtnLight: {
//     backgroundColor: '#FFAF66',
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   uploadBtn: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFAF66',
//     padding: 14,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   btnText: {color: '#fff', fontWeight: '600', fontSize: 14},

//   dealCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFF',
//     padding: 14,
//     borderRadius: 10,
//     marginTop: 12,
//     borderWidth: 1,
//     borderColor: '#E2E2E2',
//   },
//   dealText: {fontWeight: '600', color: '#000', marginStart: 10},
//   emptyText: {
//     textAlign: 'center',
//     color: '#888',
//     marginTop: 20,
//   },
//   filterImage: {width: 50, height: 50, marginStart: 5, marginTop: 5},
//   searchImage: {width: 25, height: 25, marginStart: 5},
//   uploadImage: {width: 15, height: 15},
//   discountImage: {width: 15, height: 15},
//   arrowImage: {width: 15, height: 15, marginStart: 25, marginTop: 3},
// });

// import {useNavigation} from '@react-navigation/native';
// import React, {useState, useMemo} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   StatusBar,
//   TextInput,
//   FlatList,
//   Alert,
// } from 'react-native';

// import {SafeAreaView} from 'react-native-safe-area-context';
// // import useProductModal from '../../../hooks/useProduct'; // 🗑️ External hook not accessible

// // --- 1. 🚀 Dynamic Product Data (Added isActive field for filtering demo) ---
// const rawProductData = [
//   {
//     id: '1',
//     producttitle: 'iPhone 15 Pro Max 256GB Titanium Natural',
//     description:
//       'The most advanced iPhone with titanium design, A17 Pro chip, and professional camera system.',
//     categoryid: '1',
//     brand: 'Apple',
//     isActive: true, // 🚀 Added isActive: true
//     subcategoryid: '1',
//     isreturnable: true,
//     returnwindowdays: 14,
//     hasvariants: true,
//     variationtheme: 'Color',
//     gender: 'Unisex',
//     variants: [
//       {
//         sku: 'IPHONE15PM-256-TN',
//         color: 'Titanium Natural',
//         variantPrice: 4499.0,
//         variantQuantity: 25,
//         weightUnit: 'g',
//         weight: 221,
//       },
//     ],
//   },
//   {
//     id: '2',
//     producttitle: 'Samsung Galaxy S24 Ultra 512GB',
//     description: 'Flagship Android phone with S Pen and 200MP camera.',
//     categoryid: '1',
//     brand: 'Samsung',
//     isActive: false, // 🚀 Added isActive: false (This item will be filtered out)
//     subcategoryid: '1',
//     isreturnable: true,
//     returnwindowdays: 14,
//     hasvariants: true,
//     variationtheme: 'Color',
//     gender: 'Unisex',
//     variants: [
//       {
//         sku: 'S24U-512-BL',
//         color: 'Black',
//         variantPrice: 4999.0,
//         variantQuantity: 10,
//         weightUnit: 'g',
//         weight: 232,
//       },
//     ],
//   },
//   {
//     id: '3',
//     producttitle: 'Nike Air Max 90 White Leather Running Shoes',
//     description:
//       'Classic running shoe with Air Max cushioning and timeless design.',
//     categoryid: '2',
//     brand: 'Nike',
//     isActive: true, // 🚀 Added isActive: true
//     subcategoryid: '3',
//     variants: [
//       {
//         sku: 'NIKE-AM90-WHITE-40',
//         size: '40',
//         variantPrice: 439.0,
//         variantQuantity: 8,
//         weightUnit: 'g',
//         weight: 350,
//       },
//     ],
//   },
// ];

// const InventoryListScreen = () => {
//   const navigation = useNavigation();

//   // 🗑️ COMMENTED OUT: External hook not accessible and not necessary for the data display requirement.
//   // const {getCategory, isLoadingProducts} = useProductModal();

//   const [searchQuery, setSearchQuery] = useState('');
//   const [expandedItems, setExpandedItems] = useState(new Set());

//   // 🚀 2. Use useMemo to filter raw data and then transform it
//   const inventoryItems = useMemo(() => {
//     // 🚀 STEP 1: Filter the raw data to include ONLY products where isActive is true
//     const activeProducts = rawProductData.filter(
//       product => product.isActive === true,
//     );

//     // 🚀 STEP 2: Map the filtered data to the InventoryCard format
//     return activeProducts.map(product => {
//       const totalQuantity = product.variants.reduce(
//         (sum, variant) => sum + variant.variantQuantity,
//         0,
//       );
//       const firstVariant = product.variants[0] || {};

//       return {
//         id: product.id,
//         name: product.producttitle,
//         description: product.description,
//         // Stock metrics mapped from product data
//         openStock: totalQuantity,
//         remainingStock: totalQuantity,
//         thresholdValue: 10, // Static placeholder
//         onTheWay: 0, // Static placeholder
//         sellingPrice: firstVariant.variantPrice || 0,
//         weight: `${firstVariant.weight || ''}${firstVariant.weightUnit || ''}`,
//         // NOTE: You need a dynamic image URL in your JSON to make this dynamic
//         imageUrl: 'https://placehold.co/60x60/DBEAFE/FFFFFF/png',
//       };
//     });
//   }, []);

//   // --- Utility functions (Unchanged) ---
//   const toggleExpanded = itemId => {
//     setExpandedItems(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(itemId)) {
//         newSet.delete(itemId);
//       } else {
//         newSet.add(itemId);
//       }
//       return newSet;
//     });
//   };

//   const handleEdit = itemId => {
//     Alert.alert('Edit Item', `Edit item ${itemId}`);
//   };

//   const handleDelete = (itemId, itemName) => {
//     Alert.alert(
//       'Delete Item',
//       `Are you sure you want to delete "${itemName}"?`,
//       [
//         {text: 'Cancel', style: 'cancel'},
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => console.log('Item deleted'),
//         },
//       ],
//     );
//   };

//   const handleViewDetails = itemData => {
//     // Pass the full dynamic data object
//     navigation.navigate('ItemDetailsScreen', {item: itemData});
//   };

//   const handleFilter = () => {
//     Alert.alert('Filter', 'Filter functionality will be implemented here');
//   };

//   const handleMenu = () => {
//     Alert.alert('Menu', 'Menu functionality will be implemented here');
//   };

//   const handleSearchImageClick = () => {
//     Alert.alert('Searching here', `Search for the text ${searchQuery}`);
//   };

//   const renderInventoryCard = ({item}) => (
//     <InventoryCard
//       key={item.id}
//       item={item}
//       isExpanded={expandedItems.has(item.id)}
//       onToggleExpand={() => toggleExpanded(item.id)}
//       onEdit={() => handleEdit(item.id)}
//       onDelete={() => handleDelete(item.id, item.name)}
//       onViewDetails={() => handleViewDetails(item)}
//     />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       {/* Header (Unchanged) */}
//       <View style={styles.header}>
//         <Image
//           source={require('../../../assets/images/nextgenlogo.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//         <Text style={styles.headerTitle}>Inventory</Text>
//         <TouchableOpacity onPress={handleMenu}>
//           <Image
//             source={require('../../../assets/images/slider_icon.png')}
//             style={{width: 20, height: 20}}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar (Unchanged) */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchInputWrapper}>
//           <TouchableOpacity onPress={handleSearchImageClick}>
//             <Image
//               source={require('../../../assets/images/ic_search_icon.png')}
//               style={{width: 23, height: 23}}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>

//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search Inventory"
//             placeholderTextColor="#9CA3AF"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//         </View>
//         <TouchableOpacity onPress={handleFilter}>
//           <Image
//             source={require('../../../assets/images/ic_filter_icon.png')}
//             style={styles.filterButton}
//             resizeMode="cover"></Image>
//         </TouchableOpacity>
//       </View>

//       <View style={{flex: 1}}>
//         {/* FlatList uses the filtered inventoryItems */}
//         <FlatList
//           data={inventoryItems}
//           keyExtractor={item => item.id}
//           renderItem={renderInventoryCard}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// // --- InventoryCard Component (Unchanged) ---

// const InventoryCard = ({
//   item,
//   isExpanded,
//   onToggleExpand,
//   onEdit,
//   onDelete,
//   onViewDetails,
// }) => {
//   return (
//     <View style={styles.card}>
//       {/* Card Header */}
//       <View style={styles.cardHeader}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <Image
//           style={styles.itemImage}
//           resizeMode="contain"
//           source={require('../../../assets/images/ic_maggi.png')}
//         />
//       </View>

//       {/* Metrics Grid */}
//       <View style={styles.metricsGrid}>
//         <View style={styles.metricItem}>
//           <Text style={styles.metricLabel}>Open Stock</Text>
//           <Text style={styles.metricValue}>{item.openStock}</Text>
//         </View>
//         <View style={styles.metricItem}>
//           <Text style={styles.metricLabel}>Rem. Stock</Text>
//           <Text style={styles.metricValue}>{item.remainingStock}</Text>
//         </View>
//         <View style={styles.metricItem}>
//           <Text style={styles.metricLabel}>Threshold value</Text>
//           <Text style={styles.metricValue}>{item.thresholdValue}</Text>
//         </View>
//       </View>

//       <View style={styles.metricsGrid}>
//         <View style={styles.metricItem}>
//           <Text style={styles.metricLabel}>On the way</Text>
//           <Text style={styles.metricValue}>{item.onTheWay}</Text>
//         </View>
//         <View style={styles.metricItem}>
//           <Text style={styles.metricLabel}>SP</Text>
//           <Text style={styles.metricValue}>AED {item.sellingPrice}</Text>
//         </View>
//         <View style={styles.metricItem}>
//           <Text style={styles.metricLabel}>Weight</Text>
//           <Text style={styles.metricValue}>{item.weight}</Text>
//         </View>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.actionButtons}>
//         <TouchableOpacity
//           style={styles.editButton}
//           onPress={onEdit}
//           activeOpacity={0.8}>
//           <Image
//             source={require('../../../assets/images/ic_edit_button.png')}
//             style={{width: 20, height: 20}}
//             resizeMode="contain"
//           />
//           <Text style={styles.editButtonText}>Edit Item</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={onDelete}
//           activeOpacity={0.8}>
//           <Image
//             source={require('../../../assets/images/ic_delete_icon.png')}
//             style={{width: 20, height: 20}}
//             resizeMode="contain"
//           />
//           <Text style={styles.deleteButtonText}>Delete Item</Text>
//         </TouchableOpacity>
//       </View>

//       {/* View More Details Button */}
//       <TouchableOpacity
//         style={styles.viewMoreButton}
//         onPress={onViewDetails}
//         activeOpacity={0.8}>
//         <Text style={styles.viewMoreText}>View More Details</Text>
//         <Image
//           source={require('../../../assets/images/ic_drop_down_white.png')}
//           style={{width: 12, height: 11}}
//           resizeMode="contain"
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// // --- STYLES (Unchanged) ---
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   logo: {
//     width: 80,
//     height: 32,
//   },
//   headerTitle: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//   },

//   menuButton: {
//     padding: 8,
//   },
//   iconText: {
//     fontSize: 20,
//     color: '#111827',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#FFFFFF',
//     gap: 9,
//   },
//   searchInputWrapper: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F9FAFB',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     height: 60,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#111827',
//   },
//   filterButton: {
//     width: 55,
//     height: 60,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 16,
//     gap: 16,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     marginBottom: 16,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//     flex: 1,
//   },
//   itemImage: {
//     width: 60,
//     height: 60,
//     backgroundColor: '#FEF3C7',
//     borderRadius: 8,
//   },
//   metricsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   metricItem: {
//     flex: 1,
//   },
//   metricLabel: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   metricValue: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     gap: 12,
//     marginTop: 16,
//     marginBottom: 12,
//   },
//   editButton: {
//     flex: 1,
//     backgroundColor: '#FDB462',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 8,
//     gap: 6,
//   },
//   editButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   deleteButton: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     gap: 6,
//   },
//   deleteButtonText: {
//     color: '#111827',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   viewMoreButton: {
//     backgroundColor: '#FF8C00',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 14,
//     borderRadius: 8,
//     gap: 8,
//   },
//   viewMoreText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
// });

// export default InventoryListScreen;
