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
import CircularBorder from '../../components/user/CircularBorder';
import {useNavigation} from '@react-navigation/native';

const AccountInfoMerchant = () => {
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
        <TouchableOpacity style={styles.backButton}>
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

export default AccountInfoMerchant;
