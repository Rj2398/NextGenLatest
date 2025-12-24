import React, {useState, useCallback, memo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import DocumentDownloadCard from '../../components/user/DocumentDownloadCard';
import InputField from '../../components/user/InputField';
import UploadButton from '../../components/user/UploadButton';
import DropdownField from '../../components/user/DropdownField';
import CircularBorder from '../../components/CircularBorder';
import {useNavigation} from '@react-navigation/native';

const Account = () => {
  const navigation = useNavigation();
  const [expandedSections, setExpandedSections] = useState({
    basicInfo: true,
    address: false,
    details: false,
    uploadDocument: false,
    bankingDetail: false,
  });

  const bankData = [
    {id: '1', name: 'State Bank of India'},
    {id: '2', name: 'HDFC Bank'},
    {id: '3', name: 'ICICI Bank'},
  ];

  const [selectedBankName, setSelectedBankName] = useState('');

  // Function to handle the selection change
  const handleBankSelection = (name, id) => {
    setSelectedBankName(name);
  };

  const documents = [
    {id: '1', title: 'Trade License'},
    {id: '2', title: 'Business Permit'},
    {id: '3', title: 'GST Certificate'},
    {id: '4', title: 'Company Registration'},
    {id: '5', title: 'Company Registration'},
  ];

  const handleDownload = title => {
    console.log(`Downloading ${title}...`);
  };
  const handleUpload = () => {};

  const [messagingEnabled, setMessagingEnabled] = useState(true);

  const [fields, setFields] = useState({
    onboardingName: 'Ecom Inc',
    onboardingCategory: 'Fashion Clothing',
    mapped: '',
    businessName: '',
    streetName: '456 Avenue, Baker Street',
    businessCategory: '',
    city: 'South London',
    postcode: '',
    taxCollector: '',
    coverageNumber: '',
    onboardingNumber: '',
    phoneNumber: '',
    financeRoom: '',
    employeeName: '',
    feedback: '',
  });

  const handleChange = useCallback(
    key => value => setFields(prev => ({...prev, [key]: value})),
    [],
  );

  const inputConfig = [
    {key: 'onboardingName', label: 'Business Name', placeholder: 'Enter name'},
    {
      key: 'onboardingCategory',
      label: 'Business Category',
      placeholder: 'Enter category',
    },
    {key: 'mapped', label: 'Mapped To', placeholder: 'Enter mapping info'},
    {
      key: 'businessName',
      label: 'Registered Name',
      placeholder: 'Enter registered name',
    },
    {key: 'streetName', label: 'Street Name', placeholder: 'Enter street name'},
    {
      key: 'businessCategory',
      label: 'Business Type',
      placeholder: 'Enter business type',
    },
    {key: 'city', label: 'City', placeholder: 'Enter city'},
    {key: 'postcode', label: 'Postcode', placeholder: 'Enter postcode'},

    {
      key: 'coverageNumber',
      label: 'Coverage Number',
      placeholder: 'Enter coverage number',
    },
    {
      key: 'onboardingNumber',
      label: 'Onboarding Number',
      placeholder: 'Enter onboarding number',
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Enter phone number',
    },
    {
      key: 'financeRoom',
      label: 'Finance Room',
      placeholder: 'Enter finance room',
    },
    {
      key: 'employeeName',
      label: 'Employee Name',
      placeholder: 'Enter employee name',
    },
    {
      key: 'feedback',
      label: 'Feedback',
      placeholder: 'Enter feedback',
      multiline: true,
    },
    {
      key: 'accountHolderName',
      label: 'Account Holder Name',
      placeholder: 'Enter Payee Name',
      multiline: true,
    },

    {
      key: 'bankAccountNumber',
      label: 'Bank Account Number',
      placeholder: '12 Digit Account Number',
      multiline: false,
    },
    {
      key: 'bankAccountNumber',
      label: 'IBAN Number',
      placeholder: 'gbhsgfyhsgd',
      multiline: false,
    },
    {
      key: 'swiftCode',
      label: 'Swift Code',
      placeholder: 'gbhsgfyhsgd',
      multiline: false,
    },
    {
      key: 'IFSC Code',
      label: 'Swift Code',
      placeholder: 'gbhsgfyhsgd',
      multiline: false,
    },
  ];

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const SectionHeader = ({title, section}) => (
    <TouchableOpacity
      style={styles.sectionHeader}
      onPress={() => toggleSection(section)}
      activeOpacity={0.7}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
      <Image
        source={require('../../../assets/images/ic_white_icon_dropdown.png')}
        style={{height: 13, width: 12}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/img_back_icon.png')}
            style={{height: 14, width: 20}}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Store Info</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // padding works better on iOS
          style={{flex: 1}}>
          <ScrollView
            style={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <View style={styles.section}>
                <SectionHeader title="Business Info" section="basicInfo" />

                {expandedSections.basicInfo && (
                  <>
                    <View style={styles.cardImage}>
                      <CircularBorder>
                        <Image
                          source={require('../../../assets/images/ic_img_with_portfolio.png')}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 120 / 2,
                            resizeMode: 'cover',
                          }}></Image>
                      </CircularBorder>
                    </View>

                    {inputConfig.slice(0, 3).map(field => (
                      <InputField
                        key={field.key}
                        label={field.label}
                        value={fields[field.key]}
                        placeholder={field.placeholder}
                        multiline={field.multiline}
                        onChangeText={handleChange(field.key)}
                      />
                    ))}
                  </>
                )}
              </View>
            </View>

            {/* Business Address Section */}
            <View style={styles.card}>
              <View style={styles.section}>
                <SectionHeader title="Business Address" section="address" />
                {expandedSections.address &&
                  inputConfig
                    .slice(3, 8)
                    .map(field => (
                      <InputField
                        key={field.key}
                        label={field.label}
                        value={fields[field.key]}
                        placeholder={field.placeholder}
                        multiline={field.multiline}
                        onChangeText={handleChange(field.key)}
                      />
                    ))}
              </View>
            </View>

            {/* Contact Details Section */}
            <View style={styles.card}>
              <View style={styles.section}>
                <SectionHeader title="Contact Details" section="details" />
                {expandedSections.details && (
                  <View style={styles.sectionContent}>
                    {inputConfig.slice(8, 12).map(field => (
                      <InputField
                        key={field.key}
                        label={field.label}
                        value={fields[field.key]}
                        placeholder={field.placeholder}
                        multiline={field.multiline}
                        onChangeText={handleChange(field.key)}
                        require={false}
                        redColor={true}
                      />
                    ))}

                    <View style={styles.infoBox}>
                      <Image
                        source={require('../../../assets/images/ic_minature.png')}
                        style={{
                          height: 20,
                          width: 20,
                          marginRight: 10,
                          marginTop: 5,
                        }}></Image>
                      <Text style={styles.infoText}>
                        We keep your data private and never share it with
                        third-parties.
                      </Text>
                    </View>

                    <TouchableOpacity style={styles.addButton}>
                      <Text style={styles.addButtonText}>+ Add new Link</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.saveButton}>
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            {/* Upload Document */}
            <View style={styles.card}>
              <View style={styles.section}>
                <SectionHeader
                  title="Upload Documents"
                  section="uploadDocument"
                />
                {expandedSections.uploadDocument &&
                  documents.map(doc => (
                    <DocumentDownloadCard
                      key={doc.id}
                      title={doc.title}
                      onDownload={() => handleDownload(doc.title)}
                    />
                  ))}

                <TouchableOpacity>
                  <UploadButton onPress={handleUpload}></UploadButton>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Banking Details */}
            <View style={styles.card}>
              <View style={styles.section}>
                <SectionHeader
                  title="Banking Details"
                  section="bankingDetail"
                />
                {expandedSections.bankingDetail && (
                  <View style={styles.sectionContent}>
                    <DropdownField
                      data={bankData}
                      placeholder="Select Bank"
                      label="Select Bank Name"
                      onSelect={handleBankSelection}
                    />

                    {inputConfig.slice(13, 18).map(field => (
                      <InputField
                        key={field.key}
                        label={field.label}
                        value={fields[field.key]}
                        placeholder={field.placeholder}
                        multiline={field.multiline}
                        onChangeText={handleChange(field.key)}
                        require={false}
                        redColor={true}
                      />
                    ))}

                    <UploadButton
                      onPress={handleUpload}
                      label={'IBAN Statement'}></UploadButton>

                    <DocumentDownloadCard
                      key={2}
                      title={'July-Statement'}
                      onDownload={() =>
                        handleDownload('July-Statement')
                      }></DocumentDownloadCard>
                    <TouchableOpacity style={styles.saveButton}>
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', marginTop: 30},

  cardUploadDoc: {
    marginHorizontal: 13,
    marginVertical: 10,
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#fff',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.02,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 2,
    // Height wraps content automatically
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFB366',
  },
  text1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  wrapper: {
    borderRadius: 12,
    overflow: 'hidden', // keeps child corners rounded
  },
  dashedBox: {
    borderWidth: 2,
    borderColor: '#f97316',
    borderStyle: 'dashed',
    padding: 16,
    backgroundColor: '#fff',
  },

  card: {
    marginHorizontal: 13,
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: 'stretch',
  },
  cardImage: {
    marginHorizontal: 13,
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },

  card1: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
    marginVertical: 15,
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  backButton: {marginRight: 16, padding: 4},
  headerTitleContainer: {flex: 1, alignItems: 'center'},
  headerTitle: {fontSize: 18, fontWeight: '600', color: '#333'},
  scrollView: {flex: 1},
  section: {marginTop: 8},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFB366',
  },
  sectionHeaderText: {fontSize: 16, fontWeight: '600', color: '#fff'},
  sectionContent: {padding: 16},
  avatarContainer: {
    marginVertical: 10,
    height: 210,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarIcon: {fontSize: 40},
  avatarLabel: {fontSize: 16, color: '#000', fontWeight: 'bold'},
  inputContainer: {marginBottom: 16},
  label: {fontSize: 12, color: '#999', marginBottom: 6, fontWeight: '600'},
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  multilineInput: {height: 80, textAlignVertical: 'top'},
  saveButton: {
    backgroundColor: '#F89941BF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {color: '#fff', fontSize: 16, fontWeight: '600'},
  cancelButton: {
    backgroundColor: '#FFF9F2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#FFF9F2',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {backgroundColor: '#4CAF50'},
  checkboxIcon: {color: '#fff', fontSize: 14, fontWeight: 'bold'},
  checkboxLabel: {fontSize: 14, color: '#333'},
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  infoIcon: {fontSize: 18, marginRight: 8},
  infoText: {flex: 1, fontSize: 12, color: '#333'},
  addButton: {
    borderWidth: 1,
    borderColor: '#FFB366',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {color: '#000000', fontWeight: 'bold', fontSize: 14},
});

export default Account;

//10-12-2025
// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   TextInput,
//   Platform,
//   Image,
//   Alert,
// } from 'react-native';
// import Header from '../../components/Header';
// import account from '../../../hooks/account';
// import {generateSectionWiseObject} from '../../../utils/modal/customCodeModal';
// import Loader from '../../components/Loader';
// import ImagePicker from 'react-native-image-crop-picker';

// // --- Colors (kept same) ---
// const PRIMARY_COLOR = '#FFAF66';
// const SURFACE_COLOR = '#FFFFFF';
// const BACKGROUND_COLOR = '#F5F5F5';
// const TEXT_COLOR = '#1F2937';
// const PLACEHOLDER_COLOR = '#ADAEBC';
// const BORDER_COLOR = '#E5E7EB';
// const ACCENT_TEXT_COLOR = '#6B7280';

// // Reusable small components (kept same)
// const CustomTextInput = ({
//   label,
//   placeholder,
//   value,
//   onChangeText,
//   multiline,
//   keyboardType,
//   required,
//   style,
// }) => (
//   <View style={[styles.inputContainer, style]}>
//     {label && (
//       <Text style={styles.label}>
//         {label} {required && <Text style={{color: '#1F2937'}}></Text>}
//       </Text>
//     )}
//     <TextInput
//       style={[
//         styles.input,
//         multiline && styles.multilineInput,
//         {borderColor: BORDER_COLOR},
//       ]}
//       placeholder={placeholder}
//       placeholderTextColor={PLACEHOLDER_COLOR}
//       value={value}
//       onChangeText={onChangeText}
//       multiline={multiline}
//       keyboardType={keyboardType || 'default'}
//     />
//   </View>
// );

// const InstituteTypeSelect = ({
//   value,
//   onValueChange,
//   label,
//   required,
//   placeholder,
//   options,
// }) => {
//   const [open, setOpen] = useState(false);
//   const dropdownOptions =
//     Array.isArray(options) && options.length > 0
//       ? options
//       : ['Academia', 'Merchant'];

//   return (
//     <View style={styles.inputContainer}>
//       <Text style={[styles.label, {color: '#1F2937'}]}>
//         {label} {required && <Text style={{color: '#1F2937'}}></Text>}
//       </Text>

//       <TouchableOpacity
//         style={[styles.pickerContainer, {borderColor: BORDER_COLOR}]}
//         onPress={() => setOpen(!open)}>
//         <Text style={styles.pickerText}>{value || placeholder}</Text>
//         <Image
//           source={require('../../../assets/down_arrow_black.png')}
//           style={styles.downImage}
//           resizeMode="contain"
//         />
//       </TouchableOpacity>

//       {open && (
//         <View style={styles.dropdownMock}>
//           {dropdownOptions.map((item, index) => (
//             <Text
//               key={index}
//               style={styles.dropdownOption}
//               onPress={() => {
//                 onValueChange(item);
//                 setOpen(false);
//               }}>
//               {item}
//             </Text>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// const CollapsibleSection = ({title, children, expanded: initialExpanded}) => {
//   const [expanded, setExpanded] = useState(initialExpanded);
//   return (
//     <View style={styles.sectionContainer}>
//       <TouchableOpacity
//         style={[
//           styles.sectionHeader,
//           {backgroundColor: PRIMARY_COLOR},
//           {margin: 15},
//         ]}
//         onPress={() => setExpanded(!expanded)}>
//         <Text style={styles.sectionTitle}>{title}</Text>
//         <Image
//           source={require('../../../assets/down_arrow.png')}
//           style={styles.downImage}
//           resizeMode="contain"
//         />
//       </TouchableOpacity>
//       {expanded && <View style={styles.sectionContent}>{children}</View>}
//     </View>
//   );
// };

// const validateSectionFields = (sectionFields, formState) => {
//   for (const key in sectionFields) {
//     const field = sectionFields[key];

//     // skip buttons, non visible fields
//     if (field.fieldType === 'Button' || field.isVisible === false) continue;

//     if (field.isRequired) {
//       const value = formState[key];

//       // CASE 1: value missing entirely
//       if (value === undefined || value === null) {
//         return {
//           valid: false,
//           message: `${field.label} is required`,
//         };
//       }

//       // CASE 2: String based value
//       if (typeof value === 'string' && value.trim() === '') {
//         return {
//           valid: false,
//           message: `${field.label} is required`,
//         };
//       }

//       // CASE 3: Number based value (0 is allowed)
//       if (typeof value === 'number' && isNaN(value)) {
//         return {
//           valid: false,
//           message: `${field.label} is required`,
//         };
//       }

//       // CASE 4: File upload (must have uri)
//       if (field.fieldType === 'File') {
//         if (!value?.uri) {
//           return {
//             valid: false,
//             message: `${field.label} is required`,
//           };
//         }
//       }

//       // CASE 5: Select dropdown — must have non-empty string
//       if (field.fieldType === 'Select') {
//         if (!value || value === '') {
//           return {
//             valid: false,
//             message: `${field.label} is required`,
//           };
//         }
//       }
//     }
//   }
//   return {valid: true};
// };

// const Account = () => {
//   // states
//   const [instituteName, setInstituteName] = useState('');
//   const [instituteType, setInstituteType] = useState('');
//   const [establishmentYear, setEstablishmentYear] = useState('');
//   const [description, setDescription] = useState('');

//   const [streetAddress, setStreetAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [stateVal, setStateVal] = useState(''); // renamed 'stateVal' to avoid conflict with JS 'state'
//   const [zip, setZip] = useState('');
//   const [country, setCountry] = useState('');

//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [website, setWebsite] = useState('');
//   const [linkedin, setLinkedin] = useState('');

//   const [selectedLogo, setSelectedLogo] = useState(null); // will store { uri, type, name }
//   const [isInitialized, setIsInitialized] = useState(false);

//   // hooks
//   const {useAccount, useUpdateMainInfo} = account(); // call the hook factory
//   const {data, isError, error, isLoading, refetch} = useAccount(); // default pageName used in hook
//   const updateHook = useUpdateMainInfo();
//   const {mutate} = updateHook || {};

//   // prepare section data safely
//   const sectionWiseData = generateSectionWiseObject(
//     data?.schema ?? {sections: []},
//     data?.items ?? {},
//   );
//   console.log('SECTION DATA:', sectionWiseData);

//   const MainInformation = sectionWiseData['MainInformation'] ?? {
//     title: 'Main Information',
//     fields: {},
//   };
//   const InstituteAddress = sectionWiseData['InstituteAddress'] ?? {
//     title: 'Institute Address',
//     fields: {},
//   };
//   const ContactDetails = sectionWiseData['ContactDetails'] ?? {
//     title: 'Contact Details',
//     fields: {},
//   };

//   // Image picker
//   const handleAddImage = async () => {
//     try {
//       const img = await ImagePicker.openPicker({
//         multiple: false,
//         mediaType: 'photo',
//       });

//       // Normalize to { uri, type, name }
//       const uri = img.path || img.uri;
//       const type = img.mime || img.type || 'image/jpeg';
//       const name = img.filename || uri.split('/').pop() || 'image.jpg';

//       setSelectedLogo({uri, type, name});
//     } catch (err) {
//       if (err?.code === 'E_PICKER_CANCELLED') {
//         console.log('Image picker cancelled by user.');
//       } else {
//         Alert.alert(
//           'Error selecting image',
//           'Failed to access gallery. Check app permissions.',
//         );
//         console.error('Image Picker Error:', err);
//       }
//     }
//   };

//   // initial populate - only once after data loads
//   useEffect(() => {
//     if (!data?.items || isInitialized) return;
//     const items = data.items;

//     setInstituteName(items.institute_name ?? '');
//     setInstituteType(items.institute_type ?? '');
//     setEstablishmentYear(
//       items.establishment_year ? String(items.establishment_year) : '',
//     );
//     setDescription(items.description ?? '');

//     setStreetAddress(items.street_address ?? '');
//     setCity(items.city ?? '');
//     setStateVal(items.state ?? '');
//     setZip(items.zip_code ?? '');
//     setCountry(items.country ?? '');

//     setEmail(items.email ?? '');
//     setPhone(items.phone ?? '');
//     setWebsite(items.website ?? '');
//     setLinkedin(items.linkedin ?? '');

//     // if API gave a logo URL, keep it as selectedLogo uri so preview shows
//     if (items.institute_logo) {
//       setSelectedLogo({
//         uri: items.institute_logo,
//         type: 'image/jpeg',
//         name: items.institute_logo.split('/').pop(),
//       });
//     }

//     setIsInitialized(true);
//   }, [data, isInitialized]);

//   // debug: ensure mutate exists
//   useEffect(() => {
//     console.log('MUTATE AVAILABLE?:', !!mutate);
//   }, [mutate]);

//   // submit handler
//   const handleSubmit = () => {
//     console.log(
//       'Submit clicked values:',
//       instituteName,
//       instituteType,
//       establishmentYear,
//       description,
//       selectedLogo,
//     );

//     // Build formState object that matches API keys
//     const formState = {
//       institute_name: instituteName,
//       institute_type: instituteType,
//       establishment_year: establishmentYear,
//       description: description,
//       institute_logo: selectedLogo,
//     };

//     console.log('PAYLOAD:', MainInformation?.fields);

//     // validate form)
//     // 1️⃣ VALIDATION BASED ON API SCHEMA
//     const validation = validateSectionFields(
//       MainInformation?.fields,
//       formState,
//     );

//     if (!validation.valid) {
//       Alert.alert('Validation Error', validation.message);
//       return; // ❌ Stop submission
//     }

//     if (!mutate) {
//       console.warn('mutate not available');
//       return;
//     }

//     // Build payload that matches server expectations
//     const payload = {
//       InstituteName: instituteName,
//       InstituteType: instituteType,
//       EstablishmentYear: establishmentYear,
//       Description: description,
//       InstituteLogo: selectedLogo, // mutate function will convert to FormData in hook
//     };

//     mutate(payload, {
//       onSuccess: res => {
//         console.log('UPDATE SUCCESS:', res);
//         Alert.alert('Success', res?.message || 'Updated successfully');
//         // refetch data and allow re-init if you want to refill with fresh values
//         setIsInitialized(false);
//         refetch();
//       },
//       onError: err => {
//         console.log('UPDATE ERROR:', err);
//         Alert.alert('Error', err?.message || 'Something went wrong');
//       },
//     });
//   };

//   // loader while fetching profile
//   if (isLoading) return <Loader />;

//   return (
//     <View style={styles.container}>
//       <Header
//         title={data?.schema?.title || 'Institute Info'}
//         onBackPress={true}
//       />

//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <CollapsibleSection
//           title={MainInformation?.title || 'Main Information'}
//           expanded={true}>
//           <TouchableOpacity
//             style={styles.profileContainer}
//             onPress={handleAddImage}>
//             <Image
//               source={
//                 selectedLogo
//                   ? {uri: selectedLogo.uri} // local object or API url
//                   : require('../../../assets/account_place.png')
//               }
//               style={styles.profileImage}
//               resizeMode="cover"
//             />
//             <Text style={styles.avatarText}>
//               {MainInformation?.fields?.institute_logo?.label ||
//                 'Institute Logo'}
//             </Text>
//           </TouchableOpacity>

//           <CustomTextInput
//             label={
//               MainInformation?.fields?.institute_name?.label || 'Institute Name'
//             }
//             required={MainInformation?.fields?.institute_name?.isRequired}
//             value={instituteName} // <-- bind to local state
//             onChangeText={setInstituteName}
//             placeholder={
//               MainInformation?.fields?.institute_name?.placeholder ||
//               'Enter institute name'
//             }
//           />

//           <InstituteTypeSelect
//             label={
//               MainInformation?.fields?.institute_type?.label || 'Institute Type'
//             }
//             placeholder={
//               MainInformation?.fields?.institute_type?.placeholder ||
//               'Select Institute Type'
//             }
//             required
//             value={instituteType} // <-- bind to local state
//             onValueChange={setInstituteType}
//             options={MainInformation?.fields?.institute_type?.options}
//           />

//           <CustomTextInput
//             label={
//               MainInformation?.fields?.establishment_year?.label ||
//               'Establishment Year'
//             }
//             value={establishmentYear}
//             onChangeText={setEstablishmentYear}
//             keyboardType="numeric"
//             placeholder={
//               MainInformation?.fields?.establishment_year?.placeholder || 'YYYY'
//             }
//             required={MainInformation?.fields?.establishment_year?.isRequired}
//           />

//           <Text style={styles.helperText}>
//             When was your institute established?
//           </Text>

//           <CustomTextInput
//             label={MainInformation?.fields?.description?.label || 'Description'}
//             value={description}
//             onChangeText={setDescription}
//             multiline
//             style={styles.descriptionInput}
//             required={MainInformation?.fields?.description?.isRequired}
//             placeholder={
//               MainInformation?.fields?.description?.placeholder ||
//               'Write a brief description of your institute...'
//             }
//           />

//           <View style={styles.buttonGroup}>
//             <TouchableOpacity
//               style={[styles.button, {backgroundColor: '#F89941'}]}
//               onPress={handleSubmit}>
//               <Text style={styles.buttonText}>
//                 {MainInformation?.fields?.save_main_info?.label || 'Save'}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 styles.outlineButton,
//                 {borderColor: '#E2E2E2', backgroundColor: '#FFF9F2'},
//               ]}
//               onPress={() => {
//                 // reset to initial API values (optional)
//                 setIsInitialized(false);
//                 refetch();
//               }}>
//               <Text style={[styles.buttonTextcencel, {color: '#000000'}]}>
//                 {MainInformation?.fields?.cancel_main_info?.label || 'Cancel'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </CollapsibleSection>

//         <CollapsibleSection
//           title={InstituteAddress?.title || 'Institute Address'}
//           expanded={true}>
//           <CustomTextInput
//             label={
//               InstituteAddress?.fields?.street_address?.label ||
//               'Street Address'
//             }
//             required={MainInformation?.fields?.street_address?.isRequired}
//             value={streetAddress}
//             onChangeText={setStreetAddress}
//             placeholder={
//               InstituteAddress?.fields?.street_address?.placeholder ||
//               'Enter street address'
//             }
//           />

//           <View style={styles.row}>
//             <CustomTextInput
//               label={InstituteAddress?.fields?.city?.label || 'City'}
//               required={MainInformation?.fields?.city?.isRequired}
//               value={city}
//               onChangeText={setCity}
//               placeholder={
//                 InstituteAddress?.fields?.city?.placeholder || 'City'
//               }
//               style={styles.halfInput}
//             />
//             <CustomTextInput
//               label={InstituteAddress?.fields?.state?.label || 'State'}
//               required={MainInformation?.fields?.state?.isRequired}
//               value={stateVal}
//               onChangeText={setStateVal}
//               placeholder={
//                 InstituteAddress?.fields?.state?.placeholder || 'State'
//               }
//               style={styles.halfInput}
//             />
//           </View>

//           <View style={styles.row}>
//             <CustomTextInput
//               label={InstituteAddress?.fields?.zip_code?.label || 'ZIP Code'}
//               required={MainInformation?.fields?.zip_code?.isRequired}
//               value={zip}
//               onChangeText={setZip}
//               keyboardType="numeric"
//               placeholder={
//                 InstituteAddress?.fields?.zip_code?.placeholder || 'ZIP'
//               }
//               style={styles.halfInput}
//             />

//             <View style={[styles.halfInput, {marginTop: 0}]}>
//               <InstituteTypeSelect
//                 label={InstituteAddress?.fields?.country?.label || 'Country'}
//                 placeholder={
//                   InstituteAddress?.fields?.country?.placeholder ||
//                   'Select Country'
//                 }
//                 required
//                 value={country}
//                 onValueChange={setCountry}
//                 options={InstituteAddress?.fields?.country?.options}
//               />
//             </View>
//           </View>

//           <View style={styles.buttonGroup}>
//             <TouchableOpacity
//               style={[styles.button, {backgroundColor: '#F89941'}]}
//               onPress={() => console.log('Save Address')}>
//               <Text style={styles.buttonText}>
//                 {InstituteAddress?.fields?.save_address?.label || 'Save'}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 styles.outlineButton,
//                 {borderColor: '#E2E2E2', backgroundColor: '#FFF9F2'},
//               ]}
//               onPress={() => {
//                 console.log('Cancel Address');
//               }}>
//               <Text style={[styles.buttonTextcencel, {color: '#000000'}]}>
//                 {InstituteAddress?.fields?.cancel_address?.label || 'Cancel'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </CollapsibleSection>

//         <CollapsibleSection
//           title={ContactDetails?.title || 'Contact Details'}
//           expanded={true}>
//           {[
//             {
//               icon: 'account',
//               stateValue: email,
//               setter: setEmail,
//               placeholder:
//                 ContactDetails?.fields?.email?.placeholder || 'email',
//             },
//             {
//               icon: 'phone',
//               stateValue: phone,
//               setter: setPhone,
//               placeholder:
//                 ContactDetails?.fields?.phone?.placeholder || 'phone',
//             },
//             {
//               icon: 'web',
//               stateValue: website,
//               setter: setWebsite,
//               placeholder:
//                 ContactDetails?.fields?.website?.placeholder || 'website',
//             },
//             {
//               icon: 'link',
//               stateValue: linkedin,
//               setter: setLinkedin,
//               placeholder:
//                 ContactDetails?.fields?.linkedin?.placeholder || 'linkedin',
//             },
//           ].map((item, index) => (
//             <View key={index} style={styles.contactRow}>
//               <Image
//                 source={localIcons[item.icon]}
//                 style={{width: 40, height: 40}}
//                 resizeMode="contain"
//               />
//               <TextInput
//                 placeholder={item.placeholder}
//                 value={item.stateValue} // <-- bind to local state
//                 onChangeText={item.setter}
//                 style={styles.inputcontact}
//                 placeholderTextColor={PLACEHOLDER_COLOR}
//               />
//             </View>
//           ))}

//           <TouchableOpacity style={styles.addMoreLink}>
//             <Text style={{color: '#F97316', fontSize: 14}}>
//               {ContactDetails?.fields?.add_more_link?.label ||
//                 '+ Add more link'}
//             </Text>
//           </TouchableOpacity>
//         </CollapsibleSection>

//         <View style={{height: 30}} />
//       </ScrollView>
//     </View>
//   );
// };

// // localIcons kept as-is
// const localIcons = {
//   account: require('../../../assets/account_email.png'),
//   web: require('../../../assets/web.png'),
//   phone: require('../../../assets/phone.png'),
//   link: require('../../../assets/link.png'),
// };

// export default Account;

// /* Styles (unchanged) */
// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: BACKGROUND_COLOR},
//   scrollViewContent: {padding: 16, paddingBottom: 50},
//   downImage: {width: 15, height: 15, marginEnd: 5},
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 5,
//     overflow: 'hidden',
//   },
//   headerIconContainer: {padding: 8},
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: TEXT_COLOR,
//     textAlign: 'center',
//     flex: 1,
//   },
//   sectionContainer: {
//     backgroundColor: SURFACE_COLOR,
//     borderRadius: 8,
//     marginBottom: 20,
//     overflow: 'hidden',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: {width: 0, height: 1},
//         shadowOpacity: 0.2,
//         shadowRadius: 1.41,
//       },
//       android: {elevation: 2},
//     }),
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     color: '#FFAF66',
//     borderRadius: 8,
//     padding: 15,
//   },
//   sectionTitle: {color: '#FFF', fontWeight: '500', fontSize: 16},
//   sectionContent: {padding: 15},
//   profileContainer: {
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderColor: '#E5E7EB',
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 12,
//   },
//   avatar: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: BACKGROUND_COLOR,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 5,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   avatarText: {fontSize: 12, fontWeight: '600', color: ACCENT_TEXT_COLOR},
//   inputContainer: {marginBottom: 15},
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginBottom: 4,
//     marginTop: 10,
//     color: '#1F2937',
//   },
//   input: {
//     borderWidth: 1,
//     borderRadius: 4,
//     paddingHorizontal: 12,
//     minHeight: 56,
//     fontSize: 16,
//     color: TEXT_COLOR,
//     backgroundColor: SURFACE_COLOR,
//   },
//   inputcontact: {
//     flex: 1,
//     borderWidth: 1,
//     borderRadius: 4,
//     paddingHorizontal: 12,
//     minHeight: 56,
//     fontSize: 16,
//     color: '#ADAEBC',
//     borderColor: '#E5E7EB',
//     marginStart: 10,
//     backgroundColor: '#FFFFFF',
//   },
//   multilineInput: {minHeight: 100, paddingTop: 12, textAlignVertical: 'top'},
//   helperText: {
//     marginTop: -15,
//     marginBottom: 10,
//     fontSize: 12,
//     color: ACCENT_TEXT_COLOR,
//   },
//   descriptionInput: {marginBottom: 0},
//   pickerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     padding: 12,
//     borderRadius: 4,
//     minHeight: 56,
//   },
//   pickerText: {fontSize: 16, color: TEXT_COLOR},
//   dropdownMock: {
//     position: 'absolute',
//     top: 60,
//     left: 0,
//     right: 0,
//     backgroundColor: SURFACE_COLOR,
//     borderWidth: 1,
//     borderColor: '#CCC',
//     zIndex: 10,
//     borderRadius: 4,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: {width: 0, height: 1},
//         shadowOpacity: 0.2,
//         shadowRadius: 1.41,
//       },
//       android: {elevation: 2},
//     }),
//   },
//   dropdownOption: {padding: 10, fontSize: 16, color: TEXT_COLOR},
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   halfInput: {width: '48%', marginBottom: 0},
//   buttonGroup: {flexDirection: 'column', marginTop: 10},
//   button: {
//     padding: 12,
//     borderRadius: 4,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   outlineButton: {borderWidth: 1, backgroundColor: 'transparent'},
//   buttonText: {color: SURFACE_COLOR, fontWeight: 'bold', fontSize: 16},
//   buttonTextcencel: {color: '#000000', fontWeight: 'bold', fontSize: 16},
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     paddingVertical: 5,
//   },
//   contactIcon: {marginRight: 10},
//   contactInput: {
//     flex: 1,
//     backgroundColor: SURFACE_COLOR,
//     paddingHorizontal: 0,
//     fontSize: 16,
//     height: 40,
//     marginStart: 10,
//     color: TEXT_COLOR,
//   },
//   addMoreLink: {
//     borderWidth: 1,
//     borderColor: '#F97316',
//     borderStyle: 'dashed',
//     borderRadius: 10,
//     paddingVertical: 15,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginStart: 10,
//     justifyContent: 'center',
//   },
// });
