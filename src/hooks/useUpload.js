// useUpload.js

import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
// NOTE: Make sure the path to your API instance is correct
import {api} from '../utils/api'; 

// --- API Endpoints ---
const CONFIG_QUERY_KEY = '/api/v1/PageGroup/Inventory_BulkUpload';

/**
 * Custom hook to manage fetching the Bulk Upload configuration using React Query.
 */
export default function useUpload() {
  // We remove manualLoading state as we rely purely on useQuery state

  // =====================================================================
  // 1. QUERY: Fetch Bulk Upload Configuration
  // =====================================================================
  const {data: bulkUploadConfig, isLoading: isLoadingConfig, error: configError} = useQuery({
    queryKey: [CONFIG_QUERY_KEY, 'bulk-upload-config'],
    queryFn: async () => {
      try {
        // Only fetching the configuration
        const response = await api.get(CONFIG_QUERY_KEY);
        const {data} = response;
        
        // Return the core configuration data structure
        data = {
            "success": true,
            "data": {
                "pageGroupName": "Inventory_BulkUpload",
                "title": "Inventory_BulkUpload",
                "description": "Bulk upload products using CSV files",
                "pages": [
                    {
                        "pageId": 128,
                        "pageName": "Inventory_BulkUpload",
                        "title": "Bulk Upload",
                        "subtitle": "",
                        "description": "",
                        "order": 1,
                        "sections": [
                            {
                                "id": 220,
                                "name": "UploadFiles",
                                "title": "Upload Files",
                                "description": "Click to upload or drag and drop CSV files to upload",
                                "order": 1,
                                "fields": [
                                    {
                                        "id": 683,
                                        "fieldName": "csv_file",
                                        "fieldType": "File",
                                        "isRequired": true,
                                        "isReadOnly": false,
                                        "displayOrder": 1,
                                        "isVisible": true,
                                        "label": "CSV File*",
                                        "placeholder": "Click to upload or drag and drop CSV files to upload",
                                        "helpText": "Max size Limit: 50 MB, Single File only",
                                        "displayName": "",
                                        "regexPattern": "",
                                        "defaultValue": null,
                                        "maxLength": null,
                                        "minLength": null,
                                        "otpLength": null,
                                        "options": null,
                                        "fileConfig": {
                                            "maxFiles": 1,
                                            "allowedExtensions": [
                                                "csv"
                                            ],
                                            "minFileSize": null,
                                            "maxFilesPerField": 0,
                                            "allowMultipleFiles": false,
                                            "requireFileExtension": false,
                                            "validateFileContent": false,
                                            "required": false,
                                            "fileType": [],
                                            "maxFileSize": 52428800,
                                            "maxFileSizeMB": null,
                                            "validation": ""
                                        },
                                        "actions": [],
                                        "fieldMetadata": null,
                                        "localization": {
                                            "languageCode": "en",
                                            "countryCode": "AE",
                                            "localizedText": "CSV File",
                                            "localizedPlaceholder": null,
                                            "localizedHelpText": null
                                        },
                                        "isDefault": false,
                                        "isOpenView": false
                                    },
                                    {
                                        "id": 684,
                                        "fieldName": "file_name",
                                        "fieldType": "Text",
                                        "isRequired": false,
                                        "isReadOnly": false,
                                        "displayOrder": 2,
                                        "isVisible": true,
                                        "label": "File Name",
                                        "placeholder": "",
                                        "helpText": "Name of the uploaded file",
                                        "displayName": "",
                                        "regexPattern": "",
                                        "defaultValue": null,
                                        "maxLength": null,
                                        "minLength": null,
                                        "otpLength": null,
                                        "options": null,
                                        "fileConfig": null,
                                        "actions": [],
                                        "fieldMetadata": null,
                                        "localization": {
                                            "languageCode": "en",
                                            "countryCode": "AE",
                                            "localizedText": "File Name",
                                            "localizedPlaceholder": null,
                                            "localizedHelpText": null
                                        },
                                        "isDefault": false,
                                        "isOpenView": false
                                    },
                                    {
                                        "id": 685,
                                        "fieldName": "file_size",
                                        "fieldType": "Text",
                                        "isRequired": false,
                                        "isReadOnly": false,
                                        "displayOrder": 3,
                                        "isVisible": true,
                                        "label": "File Size",
                                        "placeholder": "",
                                        "helpText": "Size of the uploaded file",
                                        "displayName": "",
                                        "regexPattern": "",
                                        "defaultValue": null,
                                        "maxLength": null,
                                        "minLength": null,
                                        "otpLength": null,
                                        "options": null,
                                        "fileConfig": null,
                                        "actions": [],
                                        "fieldMetadata": null,
                                        "localization": {
                                            "languageCode": "en",
                                            "countryCode": "AE",
                                            "localizedText": "File Size",
                                            "localizedPlaceholder": null,
                                            "localizedHelpText": null
                                        },
                                        "isDefault": false,
                                        "isOpenView": false
                                    },
                                    {
                                        "id": 686,
                                        "fieldName": "upload_progress",
                                        "fieldType": "Text",
                                        "isRequired": false,
                                        "isReadOnly": false,
                                        "displayOrder": 4,
                                        "isVisible": true,
                                        "label": "Upload Progress",
                                        "placeholder": "",
                                        "helpText": "Current upload progress (e.g., 2 MB of 12 MB)",
                                        "displayName": "",
                                        "regexPattern": "",
                                        "defaultValue": null,
                                        "maxLength": null,
                                        "minLength": null,
                                        "otpLength": null,
                                        "options": null,
                                        "fileConfig": null,
                                        "actions": [],
                                        "fieldMetadata": null,
                                        "localization": {
                                            "languageCode": "en",
                                            "countryCode": "AE",
                                            "localizedText": "Upload Progress",
                                            "localizedPlaceholder": null,
                                            "localizedHelpText": null
                                        },
                                        "isDefault": false,
                                        "isOpenView": false
                                    },
                                    {
                                        "id": 687,
                                        "fieldName": "upload_status",
                                        "fieldType": "Text",
                                        "isRequired": false,
                                        "isReadOnly": false,
                                        "displayOrder": 5,
                                        "isVisible": true,
                                        "label": "Upload Status",
                                        "placeholder": "",
                                        "helpText": "Current upload status (e.g., Uploading...)",
                                        "displayName": "",
                                        "regexPattern": "",
                                        "defaultValue": null,
                                        "maxLength": null,
                                        "minLength": null,
                                        "otpLength": null,
                                        "options": null,
                                        "fileConfig": null,
                                        "actions": [],
                                        "fieldMetadata": null,
                                        "localization": {
                                            "languageCode": "en",
                                            "countryCode": "AE",
                                            "localizedText": "Upload Status",
                                            "localizedPlaceholder": null,
                                            "localizedHelpText": null
                                        },
                                        "isDefault": false,
                                        "isOpenView": false
                                    },
                                    {
                                        "id": 688,
                                        "fieldName": "downloadTemplate",
                                        "fieldType": "Button",
                                        "isRequired": false,
                                        "isReadOnly": false,
                                        "displayOrder": 6,
                                        "isVisible": true,
                                        "label": "Download Template",
                                        "placeholder": "",
                                        "helpText": "Download CSV template file",
                                        "displayName": "",
                                        "regexPattern": "",
                                        "defaultValue": null,
                                        "maxLength": null,
                                        "minLength": null,
                                        "otpLength": null,
                                        "options": null,
                                        "fileConfig": null,
                                        "actions": [
                                            {
                                                "id": "download_template_action",
                                                "label": "Download Template",
                                                "type": "api_call",
                                                "apiCallRequired": false,
                                                "method": "GET",
                                                "endpoint": "/api/v1/Product/bulk-upload/template",
                                                "params": "{}",
                                                "chainedActions": null,
                                                "mapResponseToFields": "{}"
                                            }
                                        ],
                                        "fieldMetadata": null,
                                        "localization": {
                                            "languageCode": "en",
                                            "countryCode": "AE",
                                            "localizedText": "Download Template",
                                            "localizedPlaceholder": null,
                                            "localizedHelpText": null
                                        },
                                        "isDefault": false,
                                        "isOpenView": false
                                    },
                                    {
                                        "id": 689,
                                        "fieldName": "uploadFile",
                                        "fieldType": "Button",
                                        "isRequired": false,
                                        "isReadOnly": false,
                                        "displayOrder": 7,
                                        "isVisible": true,
                                        "label": "Upload",
                                        "placeholder": "",
                                        "helpText": "Upload the CSV file",
                                        "displayName": "",
                                        "regexPattern": "",
                                        "defaultValue": null,
                                        "maxLength": null,
                                        "minLength": null,
                                        "otpLength": null,
                                        "options": null,
                                        "fileConfig": null,
                                        "actions": [
                                            {
                                                "id": "upload_file_action",
                                                "label": "Upload",
                                                "type": "api_call",
                                                "apiCallRequired": true,
                                                "method": "POST",
                                                "endpoint": "/api/v1/Product/bulk-upload",
                                                "params": "{\"file\":\"{csv_file}\"}",
                                                "chainedActions": null,
                                                "mapResponseToFields": "{}"
                                            }
                                        ],
                                        "fieldMetadata": null,
                                        "localization": {
                                            "languageCode": "en",
                                            "countryCode": "AE",
                                            "localizedText": "Upload",
                                            "localizedPlaceholder": null,
                                            "localizedHelpText": null
                                        },
                                        "isDefault": false,
                                        "isOpenView": false
                                    },
                                    {
                                        "id": 690,
                                        "fieldName": "cancelUpload",
                                        "fieldType": "Button",
                                        "isRequired": false,
                                        "isReadOnly": false,
                                        "displayOrder": 8,
                                        "isVisible": true,
                                        "label": "Cancel",
                                        "placeholder": "",
                                        "helpText": "Cancel the upload operation",
                                        "displayName": "",
                                        "regexPattern": "",
                                        "defaultValue": null,
                                        "maxLength": null,
                                        "minLength": null,
                                        "otpLength": null,
                                        "options": null,
                                        "fileConfig": null,
                                        "actions": [],
                                        "fieldMetadata": null,
                                        "localization": {
                                            "languageCode": "en",
                                            "countryCode": "AE",
                                            "localizedText": "Cancel",
                                            "localizedPlaceholder": null,
                                            "localizedHelpText": null
                                        },
                                        "isDefault": false,
                                        "isOpenView": false
                                    }
                                ],
                                "buttons": []
                            }
                        ],
                        "data": null
                    }
                ]
            },
            "message": "Pages retrieved successfully",
            "timestamp": "2025-11-12T06:36:46.7107414Z",
            "error": null
        }
        return data; 
      } catch (error) {
        // Use a generic error message from the interceptor/error object
        const errorMessage = error?.message || 'Failed to load bulk upload configuration.';
        
        throw new Error(errorMessage);
      }
    },
    // Standard query settings
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
  });


  return {
    // Configuration Data and State
    config: bulkUploadConfig, 
    isLoadingConfig,
    configError, // Error from configuration query
  };
}