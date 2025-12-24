import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
  ProgressBarAndroid, // For Android progress bar
} from 'react-native';

// REQUIRED IMPORTS for Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'; // For Upload icon
import {useNavigation} from '@react-navigation/native';

// --- Centralized Color Palette ---
const Colors = {
  // Primary & CTA Colors
  primaryOrange: '#F89941',
  lightOrangeBg: '#FF8719',

  // Text Colors
  darkText: '#161B25',
  mediumText: '#AEAEAE',
  lightText: '#B1B1B1',
  labelGray: '#858D9D',
  errorRed: '#dc3545',
  uploadLink: '#F89941', // Orange-ish link color
  black: '#000000',

  // Backgrounds & Borders
  white: '#fff',
  lightBg: '#f5f5f5',
  borderColor: '#ddd',

  // Upload Colors
  uploadBorder: '#E6E6E6', // Light orange border for drag/drop area
  uploadBg: '#fff',
};

// Dummy data for the currently uploading file
const initialFile = {
  fileName: 'Orders July 2025',
  sizeMB: 2,
  totalMB: 12,
  progress: 0.15, // 15% uploaded
  isUploading: true,
};

// --- Reusable Component for the File Upload Area ---
const FileUploadArea = ({onUploadPress}) => {
  return (
    <TouchableOpacity style={bulkStyles.uploadBox} onPress={onUploadPress}>
      {/* <AntDesign name="cloudupload" size={40} color={Colors.primaryOrange} /> */}
      <Image
        source={require('../../../assets/upload_bulk.png')}
        style={{width: 40, height: 40}}
        resizeMode="contain"
      />
      <Text style={{fontSize: 12, color: Colors.darkText}}>
        {'Upload Files'}
      </Text>
      <Text style={bulkStyles.uploadText}>
        <Text style={bulkStyles.uploadLinkText}>Click to upload</Text>
        {' or drag and drop CSV files to upload'}
      </Text>
      <Text style={bulkStyles.uploadLimit}>
        {'Max size Limit: 50 MB, Single File only'}
      </Text>
    </TouchableOpacity>
  );
};

// --- Reusable Component for File Progress/Status ---
const FileProgressItem = ({file, onRemove}) => {
  // Calculate progress as a ratio (0.0 to 1.0)
  const progressRatio = file.sizeMB / file.totalMB;

  return (
    <View style={bulkStyles.fileItemContainer}>
      {/* <MaterialCommunityIcons name="file-document-outline" size={30} color="#4CAF50" /> */}
      <Image
        source={require('../../../assets/csv_icon.png')}
        style={{width: 37, height: 37}}
        resizeMode="contain"
      />
      <View style={bulkStyles.fileInfo}>
        <Text style={bulkStyles.fileName}>{file.fileName}</Text>
        {/* Status/Size Text */}
        <View style={bulkStyles.fileStatusRow}>
          <Text style={bulkStyles.fileSizeText}>
            {`${file.sizeMB} MB of ${file.totalMB} MB`}
          </Text>
          {file.isUploading && (
            <Text style={bulkStyles.fileStatusText}>Uploading...</Text>
          )}
        </View>
        {/* Progress Bar (Platform specific) */}
        <View style={bulkStyles.progressBarContainer}>
          {Platform.OS === 'ios' ? (
            <View style={bulkStyles.iosProgressTrack}>
              <View
                style={[
                  bulkStyles.iosProgressFill,
                  {width: `${progressRatio * 100}%`},
                ]}
              />
            </View>
          ) : (
            <ProgressBarAndroid
              style={bulkStyles.androidProgressBar}
              styleAttr="Horizontal"
              indeterminate={false}
              progress={progressRatio}
              color={Colors.primaryOrange}
            />
          )}
        </View>
      </View>

      {/* Remove/Cancel Button */}
      <TouchableOpacity onPress={onRemove}>
        <Image
          source={require('../../../assets/upload_cross.png')}
          style={{width: 7, height: 7, marginBottom: 45}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

// --- Main Component: BulkUpload ---
const BulkUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(initialFile);
  const navigation = useNavigation();

  // --- Handlers ---

  const handleUploadPress = async () => {
    try {
      // DocumentPicker.pick({ ... })
      const result = await DocumentPicker.pick({
        type: [types.csv, types.plainText],
        allowMultiSelection: false,
      });

      const file = result[0];

      console.log('Selected File:', file);

      setUploadedFile({
        fileName: file.name,
        sizeMB: (file.size / (1024 * 1024)).toFixed(2), // Byte to MB conversion
        totalMB: (file.size / (1024 * 1024)).toFixed(2), // Initial size is total size
        progress: 0.05, // Start progress
        isUploading: true,
        uri: file.uri,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled file picker');
      } else {
        // Unknown error
        console.error('DocumentPicker Error:', err);
      }
    }
  };

  const handleRemoveFile = () => {
    console.log(`Removing file: ${uploadedFile.fileName}`);
    setUploadedFile(null);
  };

  const handleDownloadTemplate = () => {
    console.log('Downloading template...');
    // Logic to initiate file download
  };

  const handleCancel = () => {
    console.log('Bulk Upload Cancelled');
    // Logic to dismiss the screen
  };

  return (
    <View style={bulkStyles.container}>
      {/* --- App Header (Back and Title) --- */}
      <View style={bulkStyles.appHeader}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={Colors.darkText}
          onPress={() => navigation.goBack()}
        />
        <Text style={bulkStyles.screenTitle}>Bulk Upload</Text>
        {/* Placeholder for alignment */}
        <View style={{width: 24}} />
      </View>

      <ScrollView
        contentContainerStyle={bulkStyles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <View style={bulkStyles.card}>
          {/* 1. Upload Area */}
          <FileUploadArea onUploadPress={handleUploadPress} />

          {/* 2. Uploading File Status */}
          {uploadedFile && (
            <FileProgressItem file={uploadedFile} onRemove={handleRemoveFile} />
          )}
        </View>

        {/* 3. Action Buttons */}
        <View style={bulkStyles.buttonContainer}>
          <TouchableOpacity
            style={bulkStyles.downloadButton}
            onPress={handleDownloadTemplate}>
            <Feather
              name="download"
              size={20}
              color={Colors.white}
              style={{marginRight: 8}}
            />
            {/* <Image
                        source={require('../../../assets/doc_icon.png')}
                        style={{ width: 20, height: 20 }}
                        resizeMode="contain"
                        /> */}
            <Text style={bulkStyles.downloadButtonText}>Download Template</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={bulkStyles.cancelButton}
            onPress={handleCancel}>
            <Text style={bulkStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// --- Stylesheet for BulkUpload Component ---
const bulkStyles = StyleSheet.create({
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
    color: Colors.darkText,
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

  // --- Upload Box Styles ---
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.uploadBorder,
    backgroundColor: Colors.uploadBg,
    borderRadius: 8,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 14,
    color: Colors.mediumText,
    marginTop: 10,
    textAlign: 'center',
  },
  uploadLinkText: {
    color: Colors.uploadLink,
    fontWeight: '600',
  },
  uploadLimit: {
    fontSize: 12,
    color: Colors.lightText,
    marginTop: 5,
  },

  // --- File Item Styles ---
  fileItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  fileInfo: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 5,
  },
  fileStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  fileSizeText: {
    fontSize: 12,
    color: Colors.mediumText,
  },
  fileStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.mediumText,
  },

  // Progress Bar Styles
  progressBarContainer: {
    height: 5,
    borderRadius: 2,
    overflow: 'hidden', // Required for iOS progress bar
  },
  // iOS custom progress bar styles
  iosProgressTrack: {
    backgroundColor: Colors.inactiveGray,
    height: '100%',
    borderRadius: 2,
  },
  iosProgressFill: {
    backgroundColor: Colors.primaryOrange,
    height: '100%',
    borderRadius: 2,
  },
  // Android progress bar style
  androidProgressBar: {
    height: 5,
  },

  // --- Button Styles ---
  buttonContainer: {
    marginTop: 30,
  },
  downloadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryOrange,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 15,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  cancelButton: {
    backgroundColor: Colors.white,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.mediumText,
  },
});

export default BulkUpload;

//10-12-2025
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     Platform,
//     ScrollView,
//     // Image, // Removed or replaced actual Image imports since assets path is unknown
//     ProgressBarAndroid,
//     ActivityIndicator,
//     Alert,
// } from 'react-native';

// // REQUIRED IMPORTS for Icons
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Header from '../../components/Header';
// //import DocumentPicker, { types } from 'react-native-document-picker';
// import { RNFileAccess } from 'react-native-file-access';
// // ------------------------------------------------------------------
// // MOCK DATA AND HOOKS (Simulating API Response)
// // ------------------------------------------------------------------

// // 1. JSON Configuration (Using the structure from our previous conversation)
// const API_CONFIG_JSON = {
//     "success": true,
//     "data": {
//         "pageGroupName": "Inventory_BulkUpload",
//         "title": "Inventory_BulkUpload",
//         "description": "Bulk upload products using CSV files",
//         "pages": [
//             {
//                 "pageId": 128,
//                 "pageName": "Inventory_BulkUpload",
//                 "title": "Bulk Upload Inventory", // Changed title slightly for clarity
//                 "subtitle": "",
//                 "description": "",
//                 "order": 1,
//                 "sections": [
//                     {
//                         "id": 220,
//                         "name": "UploadFiles",
//                         "title": "Upload Files",
//                         "description": "Click to upload or drag and drop CSV files to upload. Note: Ensure data integrity.",
//                         "order": 1,
//                         "fields": [
//                             {
//                                 "id": 683,
//                                 "fieldName": "csv_file",
//                                 "fieldType": "File",
//                                 "isRequired": true,
//                                 "label": "CSV File*",
//                                 "placeholder": "Click to upload or drag and drop CSV files to upload",
//                                 "helpText": "Max size Limit: 50 MB, Single File only",
//                                 "fileConfig": {
//                                     "maxFiles": 1,
//                                     "allowedExtensions": ["csv"],
//                                     "maxFileSize": 52428800 // 50 MB
//                                 }
//                             },
//                             { "id": 688, "fieldName": "downloadTemplate", "fieldType": "Button", "label": "Download Template", "helpText": "Download CSV template file", "actions": [{ "id": "download_template_action", "method": "GET", "endpoint": "/api/v1/Product/bulk-upload/template" }] },
//                             { "id": 689, "fieldName": "uploadFile", "fieldType": "Button", "label": "Upload", "helpText": "Upload the CSV file", "actions": [{ "id": "upload_file_action", "method": "POST", "endpoint": "/api/v1/Product/bulk-upload", "params": "{\"file\":\"{csv_file}\"}" }] },
//                             { "id": 690, "fieldName": "cancelUpload", "fieldType": "Button", "label": "Cancel", "helpText": "Cancel the upload operation" }
//                         ]
//                     }
//                 ],
//                 "data": null
//             }
//         ]
//     },
//     "message": "Pages retrieved successfully",
//     "timestamp": "2025-11-12T06:36:46.7107414Z",
//     "error": null
// };
// const types = {
//     csv: 'text/csv',
//     plainText: 'text/plain',
//     excel: 'application/vnd.ms-excel',
//     allFiles: Platform.select({ ios: 'public.content', android: '*/*' }),
// };

// // 2. Mock useUpload Hook
// const useUpload = (useMock) => {
//     const [isLoadingConfig, setIsLoadingConfig] = useState(true);
//     const [config, setConfig] = useState(null);
//     const [configError, setConfigError] = useState(null);

//     useEffect(() => {
//         if (useMock) {
//             // Simulate API call delay
//             setTimeout(() => {
//                 setConfig(API_CONFIG_JSON);
//                 setIsLoadingConfig(false);
//             }, 500);
//         }
//     }, [useMock]);

//     return { config, isLoadingConfig, configError, mockApiData: API_CONFIG_JSON };
// };

// // 3. Mock DocumentPicker
// // const DocumentPicker = {
// //     pick: async () => [{
// //         name: 'TestFile.csv',
// //         size: 5 * 1024 * 1024, // 5 MB
// //         uri: 'mock/uri/TestFile.csv',
// //         type: 'text/csv'
// //     }],
// //     isCancel: (err) => err && err.message === 'User cancelled document picker',
// //     types: {
// //         csv: 'text/csv',
// //         plainText: 'text/plain',
// //         excel: 'application/vnd.ms-excel',
// //         allFiles: Platform.select({ ios: 'public.content', android: '*/*' }),
// //     },
// // };
// // const types = DocumentPicker.types;

// // ------------------------------------------------------------------
// // CENTRALIZED STYLING AND HELPERS
// // ------------------------------------------------------------------

// const Colors = {
//     primaryOrange: '#F89941',
//     lightOrangeBg: '#FF8719',
//     darkText: '#161B25',
//     mediumText: '#AEAEAE',
//     lightText: '#B1B1B1',
//     errorRed: '#dc3545',
//     uploadLink: '#F89941',
//     black:'#000000',
//     white: '#fff',
//     lightBg: '#f5f5f5',
//     borderColor: '#ddd',
//     inactiveGray: '#eee',
//     uploadBorder: '#E6E6E6',
//     uploadBg: '#fff',
// };

// // Applies styles based on the button's label (Type logic)
// const getButtonStyle = (label, styles) => {
//     const isPrimary = label === 'Upload' || label === 'Download Template';

//     return isPrimary
//         ? styles.downloadButton // Primary style (Orange background)
//         : styles.cancelButton;  // Secondary style (White background, border)
// };

// const getButtonTextStyle = (label, styles) => {
//     const isPrimary = label === 'Upload' || label === 'Download Template';

//     return isPrimary
//         ? styles.downloadButtonText
//         : styles.cancelButtonText;
// };

// const initialFile = null;

// // ------------------------------------------------------------------
// // REUSABLE COMPONENTS
// // ------------------------------------------------------------------

// // FileUploadArea Component
// const FileUploadArea = ({ onUploadPress, config, isLoadingConfig, configError }) => {

//     const fileField = config?.fileField;
//     const uploadSection = config?.uploadSection;

//     const maxSizeMB = fileField?.maxSizeMB || 50;
//     const allowedExtensions = fileField?.allowedExtensions || ['csv'];
//     const fileTypesDisplay = allowedExtensions?.map(ext => ext.toUpperCase()).join(' or ') || 'CSV files';

//     const instructionsText = fileField?.helpText || `Max size Limit: ${maxSizeMB} MB, Single File only`;

//     if (isLoadingConfig) {
//         return (
//             <View style={[bulkStyles.uploadBox, {height: 150}]}>
//                 <ActivityIndicator size="large" color={Colors.primaryOrange} />
//                 <Text style={{ marginTop: 10, color: Colors.mediumText }}>Loading Configuration...</Text>
//             </View>
//         );
//     }

//     if (configError) {
//         return (
//             <View style={[bulkStyles.uploadBox, {height: 150}]}>
//                 <Ionicons name="warning-outline" size={30} color={Colors.errorRed} />
//                 <Text style={{ marginTop: 10, color: Colors.errorRed, textAlign: 'center' }}>
//                     Error loading config. Please try again.
//                 </Text>
//             </View>
//         );
//     }

//     return (
//         <View>
//             <TouchableOpacity
//                 style={bulkStyles.uploadBox}
//                 onPress={onUploadPress}
//                 disabled={!config}
//             >
//                 {/* Simulated Image of file upload icon */}
//                 <AntDesign name="cloudupload" size={40} color={Colors.primaryOrange} />

//                 <Text style={{ fontSize: 12, color: Colors.darkText, marginTop: 10 }}>
//                     {uploadSection?.title || 'Upload Files'}
//                 </Text>
//                 <Text style={bulkStyles.uploadText}>
//                     <Text style={bulkStyles.uploadLinkText}>Click to upload</Text>
//                     {` or drag and drop ${fileTypesDisplay} to upload`}
//                 </Text>
//                 <Text style={bulkStyles.uploadLimit}>
//                     {instructionsText}
//                 </Text>
//             </TouchableOpacity>

//             {/* Instructions box driven by API response */}
//             {uploadSection?.description && (
//                 <View style={bulkStyles.instructionsBox}>
//                     <AntDesign name="infocirlceo" size={14} color={Colors.darkText} style={{marginRight: 8, marginTop: 2}} />
//                     <Text style={bulkStyles.instructionsText}>
//                         {uploadSection.description}
//                     </Text>
//                 </View>
//             )}
//         </View>
//     );
// };

// // FileProgressItem Component
// const FileProgressItem = ({ file, onRemove }) => {
//     // Progress is based on the simulated value (0.05 on selection)
//     const progressRatio = file.isUploading ? file.progress : 0.05;

//     return (
//         <View style={bulkStyles.fileItemContainer}>
//             {/* Simulated Image of csv icon */}
//             <AntDesign name="filetext1" size={37} color={Colors.mediumText} />

//             <View style={bulkStyles.fileInfo}>
//                 <Text style={bulkStyles.fileName}>{file.fileName}</Text>
//                 <View style={bulkStyles.fileStatusRow}>
//                     <Text style={bulkStyles.fileSizeText}>
//                         {`${file.sizeMB} MB`}
//                     </Text>
//                     <Text style={bulkStyles.fileStatusText}>
//                         {file.isUploading ? 'Uploading...' : 'Ready to Upload'}
//                     </Text>
//                 </View>
//                 <View style={bulkStyles.progressBarContainer}>
//                     {/* Platform-specific progress bar rendering */}
//                     {Platform.OS === 'ios' ? (
//                         <View style={bulkStyles.iosProgressTrack}>
//                             <View style={[bulkStyles.iosProgressFill, { width: `${progressRatio * 100}%` }]} />
//                         </View>
//                     ) : (
//                         <ProgressBarAndroid
//                             style={bulkStyles.androidProgressBar}
//                             styleAttr="Horizontal"
//                             indeterminate={false}
//                             progress={progressRatio}
//                             color={Colors.primaryOrange}
//                         />
//                     )}
//                 </View>
//             </View>

//             <TouchableOpacity onPress={onRemove}>
//                 {/* Simulated Image of close icon */}
//                 <AntDesign name="closecircleo" size={18} color={Colors.mediumText} />
//             </TouchableOpacity>
//         </View>
//     );
// };

// // ------------------------------------------------------------------
// // MAIN COMPONENT: BulkUpload
// // ------------------------------------------------------------------

// const BulkUpload = () => {
//     const [uploadedFile, setUploadedFile] = useState(initialFile);
//     const { config, isLoadingConfig, configError } = useUpload(true);

//     // --- Data Parsing based on the provided API structure ---
//     const parsedConfig = useMemo(() => {
//         if (!config || configError) return {};

//         const page = config.data?.pages?.[0];
//         const section = page?.sections?.[0];

//         if (!section || !section.fields) return {};

//         // Find the file upload field for configurations
//         const fileField = section.fields.find(f => f.fieldName === 'csv_file');

//         // Calculate max size in MB (API sends it in bytes)
//         const maxFileSizeByte = fileField?.fileConfig?.maxFileSize;
//         const maxSizeMB = maxFileSizeByte ? (maxFileSizeByte / (1024 * 1024)).toFixed(0) : 50;

//         return {
//             title: page?.title || 'Bulk Upload',
//             uploadSection: {
//                 title: section.title,
//                 description: section.description,
//             },
//             fileField: {
//                 ...fileField,
//                 maxSizeMB: parseInt(maxSizeMB, 10),
//                 allowedExtensions: fileField?.fileConfig?.allowedExtensions || ['csv'],
//             },
//             // Filter fields for buttons
//             buttons: section.fields.filter(field => field.fieldType === 'Button'),
//         };
//     }, [config, configError]);

//     // ------------------------------------------------------------------
//     // HANDLERS
//     // ------------------------------------------------------------------

//     const handleDownloadTemplate = () => {
//         const downloadButton = parsedConfig.buttons.find(b => b.fieldName === 'downloadTemplate');
//         const downloadAction = downloadButton?.actions?.[0];

//         const endpoint = downloadAction?.endpoint || '/api/v1/Product/bulk-upload/template';

//         Alert.alert("Download Initiated", `Downloading template from: ${endpoint}`);
//         console.log(`Downloading template via API: ${endpoint}`);
//     };

//     const handleUploadFile = () => {
//         const uploadButton = parsedConfig.buttons.find(b => b.fieldName === 'uploadFile');
//         const uploadAction = uploadButton?.actions?.[0];

//         if (!uploadedFile) {
//             Alert.alert("Error", "Please select a file first.");
//             return;
//         }

//         const endpoint = uploadAction?.endpoint || '/api/v1/Product/bulk-upload';

//         // Simulating upload process
//         setUploadedFile(prev => ({
//             ...prev,
//             isUploading: true,
//             progress: 0.1 // Start progress
//         }));

//         // Actual upload logic (fetch, axios, etc.) would go here

//         // Simulation: Update progress and complete
//         let currentProgress = 0.1;
//         const interval = setInterval(() => {
//             currentProgress += 0.2;
//             if (currentProgress >= 1.0) {
//                 clearInterval(interval);
//                 setUploadedFile(prev => ({ ...prev, isUploading: false, progress: 1.0 }));
//                 Alert.alert("Success", `File upload completed to ${endpoint}`);
//             } else {
//                 setUploadedFile(prev => ({ ...prev, progress: currentProgress }));
//             }
//         }, 300);

//         console.log(`Uploading file ${uploadedFile.fileName} to: ${endpoint}`);
//     };

//     const handleCancel = () => {
//         console.log('Bulk Upload Cancelled (UI action)');
//         setUploadedFile(null);
//         Alert.alert("Cancelled", "Upload operation was cancelled.");
//     };

//     // Function to handle file selection and validation
//     // const handleFileSelection= async () => {
//     //     const allowedExtensions = parsedConfig.fileField?.allowedExtensions || ['csv'];
//     //     const allowedTypes = allowedExtensions.map(ext => types[ext] || `.${ext}`);
//     //     const maxSizeMB = parsedConfig.fileField?.maxSizeMB || 50;

//     //     try {
//     //         // Note: If DocumentPicker.types does not contain the extension, you must use the platform-specific MIME type or extension string.
//     //         const result = await DocumentPicker.pick({
//     //             type: allowedTypes,
//     //             allowMultiSelection: false,
//     //         });

//     //         const file = result[0];
//     //         const fileSizeMB = file.size / (1024 * 1024);

//     //         if (fileSizeMB > maxSizeMB) {
//     //             Alert.alert(
//     //                 "File Too Large",
//     //                 `The selected file size (${fileSizeMB.toFixed(2)} MB) exceeds the maximum limit of ${maxSizeMB} MB.`
//     //             );
//     //             return;
//     //         }

//     //         // Set state to show progress item
//     //         setUploadedFile({
//     //             fileName: file.name,
//     //             sizeMB: fileSizeMB.toFixed(2),
//     //             totalMB: fileSizeMB.toFixed(2),
//     //             progress: 0.05, // Initial progress value
//     //             isUploading: false,
//     //             uri: file.uri,
//     //         });

//     //     }
//     //      catch (err) {
//     //         if (DocumentPicker.isCancel(err)) {
//     //             console.log('User cancelled file picker');
//     //         } else {
//     //             console.error('DocumentPicker Error:', err);
//     //             Alert.alert("Upload Error", "Failed to select file. Please try again.");
//     //         }
//     //     }
//     // };

//     const handleFileSelection = async () => {
//         // Get allowed extensions from config, defaulting to 'csv'
//         const allowedExtensions = parsedConfig.fileField?.allowedExtensions || ['csv'];

//         // Map extensions to MIME types, as required by RNFileAccess
//         const allowedMimeTypes = allowedExtensions.map(ext => types[ext] || `.${ext}`);
//         const maxSizeMB = parsedConfig.fileField?.maxSizeMB || 50;

//         try {

//             // Use RNFileAccess.pickFile to open the file picker
//             const result = await RNFileAccess.pickFile({
//                 type: allowedMimeTypes, // Pass MIME types here
//                 allowMultiSelection: false,
//             });

//             // The result is a single file object, not an array
//             const file = result;
//             const fileSizeMB = file.size / (1024 * 1024); // Calculate size in MB

//             // Validation: Check if file size exceeds the max limit
//             if (fileSizeMB > maxSizeMB) {
//                 Alert.alert(
//                     "File Too Large",
//                     `The selected file size (${fileSizeMB.toFixed(2)} MB) exceeds the maximum limit of ${maxSizeMB} MB.`
//                 );
//                 return;
//             }

//             // Set state to show progress item with file details
//             setUploadedFile({
//                 // RNFileAccess provides the full path, extract the file name
//                 fileName: file.name.split('/').pop(),
//                 sizeMB: fileSizeMB.toFixed(2),
//                 totalMB: fileSizeMB.toFixed(2),
//                 progress: 0.05, // Initial progress value
//                 isUploading: false,
//                 uri: file.path, // Use file.path for the URI/local path
//             });

//         }
//         catch (err) {
//             // Handle user cancellation or other errors
//             if (err.message && err.message.includes('Canceled')) {
//                 console.log('User cancelled file picker');
//             } else {
//                 console.error('FilePicker Error:', err);
//                 Alert.alert("Upload Error", "Failed to select file. Please try again.");
//             }
//         }
//     };

//     const handleRemoveFile = () => {
//         console.log(`Removing file: ${uploadedFile?.fileName}`);
//         setUploadedFile(null);
//     };

//     // Mapping of API handler names (fieldName) to actual component functions
//     const buttonHandlers = {
//         downloadTemplate: handleDownloadTemplate,
//         uploadFile: handleUploadFile,
//         cancelUpload: handleCancel,
//     };

//     const isReady = !isLoadingConfig && !configError;
//     const buttonsToRender = parsedConfig.buttons || [];

//     // ------------------------------------------------------------------

//     return (
//         <View style={bulkStyles.container}>
//             {/* --- App Header (Back and Title) --- */}

//             <Header
//             title={parsedConfig.title || 'Bulk Upload'}
//             onBackPress={true}>

//             </Header>

//             <ScrollView contentContainerStyle={bulkStyles.scrollViewContent} showsVerticalScrollIndicator={false}>
//                 <View style={bulkStyles.card}>

//                     {/* 1. File Upload Area (Dynamic) */}
//                     <FileUploadArea
//                         onUploadPress={handleFileSelection}
//                         config={parsedConfig}
//                         isLoadingConfig={isLoadingConfig}
//                         configError={configError}
//                     />

//                     {/* 2. Uploading File Status */}
//                     {uploadedFile && (
//                         <FileProgressItem
//                             file={uploadedFile}
//                             onRemove={handleRemoveFile}
//                         />
//                     )}

//                 </View>

//                 {/* 3. Dynamic Action Buttons (Renders based on filtered API fields) */}
//                 {isReady && buttonsToRender.length > 0 && (
//                     <View style={bulkStyles.buttonContainer}>
//                         {buttonsToRender.map(button => (
//                             <TouchableOpacity
//                                 key={button.id || button.fieldName}
//                                 style={getButtonStyle(button.label, bulkStyles)}
//                                 onPress={buttonHandlers[button.fieldName] || (() => Alert.alert('Error', `Handler for ${button.fieldName} not found`))}
//                                 // Disable upload button if no file is selected
//                                 disabled={button.fieldName === 'uploadFile' && !uploadedFile}
//                             >
//                                 <Text style={getButtonTextStyle(button.label, bulkStyles)}>
//                                     {button.label}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 )}
//             </ScrollView>
//         </View>
//     );
// };

// // --- Stylesheet for BulkUpload Component (Unchanged) ---
// const bulkStyles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.lightBg,
//     },
//     scrollViewContent: {
//         paddingHorizontal: 20,
//         paddingBottom: 40,
//         paddingTop: 10,
//     },
//     appHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingTop: Platform.OS === 'android' ? 40 : 50,
//         paddingHorizontal: 20,
//         paddingBottom: 15,
//         backgroundColor: Colors.white,
//         borderBottomWidth: 1,
//         borderBottomColor: Colors.borderColor,
//     },
//     screenTitle: {
//         fontSize: 18,
//         fontWeight: '500',
//         color: Colors.darkText,
//     },
//     card: {
//         backgroundColor: Colors.white,
//         borderRadius: 12,
//         padding: 20,
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
//     instructionsBox: {
//         flexDirection: 'row',
//         alignItems: 'flex-start',
//         backgroundColor: Colors.lightBg,
//         padding: 15,
//         borderRadius: 8,
//         borderLeftWidth: 3,
//         borderLeftColor: Colors.primaryOrange,
//         marginTop: 10,
//         marginBottom: 20,
//     },
//     instructionsText: {
//         flex: 1,
//         fontSize: 12,
//         color: Colors.darkText,
//         lineHeight: 18,
//     },
//     uploadBox: {
//         borderWidth: 1,
//         borderStyle: 'dashed',
//         borderColor: Colors.uploadBorder,
//         backgroundColor: Colors.uploadBg,
//         borderRadius: 8,
//         padding: 30,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: 20,
//     },
//     uploadText: {
//         fontSize: 14,
//         color: Colors.mediumText,
//         marginTop: 10,
//         textAlign: 'center',
//     },
//     uploadLinkText: {
//         color: Colors.uploadLink,
//         fontWeight: '600',
//     },
//     uploadLimit: {
//         fontSize: 12,
//         color: Colors.lightText,
//         marginTop: 5,
//     },
//     fileItemContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: Colors.white,
//         borderWidth: 1,
//         borderColor: Colors.borderColor,
//         borderRadius: 8,
//         padding: 15,
//         marginBottom: 10,
//         justifyContent: 'space-between',
//     },
//     fileInfo: {
//         flex: 1,
//         marginLeft: 10,
//         marginRight: 10,
//     },
//     fileName: {
//         fontSize: 14,
//         fontWeight: '500',
//         color: Colors.black,
//         marginBottom: 5,
//     },
//     fileStatusRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom:5,
//     },
//     fileSizeText: {
//         fontSize: 12,
//         color: Colors.mediumText,
//     },
//     fileStatusText: {
//         fontSize: 12,
//         fontWeight: '600',
//         color: Colors.mediumText,
//     },
//     progressBarContainer: {
//         height: 5,
//         borderRadius: 2,
//         overflow: 'hidden',
//     },
//     iosProgressTrack: {
//         backgroundColor: Colors.inactiveGray,
//         height: '100%',
//         borderRadius: 2,
//     },
//     iosProgressFill: {
//         backgroundColor: Colors.primaryOrange,
//         height: '100%',
//         borderRadius: 2,
//     },
//     androidProgressBar: {
//         height: 5,
//     },
//     buttonContainer: {
//         marginTop: 30,
//     },
//     downloadButton: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: Colors.primaryOrange,
//         paddingVertical: 14,
//         borderRadius: 8,
//         marginBottom: 15,
//     },
//     downloadButtonText: {
//         fontSize: 16,
//         fontWeight: '700',
//         color: Colors.white,
//     },
//     cancelButton: {
//         backgroundColor: Colors.white,
//         paddingVertical: 14,
//         borderRadius: 8,
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: Colors.borderColor,
//         marginBottom: 15,
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
//     cancelButtonText: {
//         fontSize: 16,
//         fontWeight: '700',
//         color: Colors.darkText,
//     },
// });

// export default BulkUpload;
