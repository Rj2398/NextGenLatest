import axios from 'axios';
import {baseURL} from '../config/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEYS} from '../config/constant';

export const fetchChildCategories = async (endpoint, parentId, params) => {
  const savedUserJson = await AsyncStorage.getItem(KEYS.USER_INFO);

  if (!savedUserJson) {
    console.error('Authentication Error: User info not found in storage.');
    throw new Error('Authentication required.');
  }

  const savedUser = JSON.parse(savedUserJson);
  const token = savedUser?.accessToken;
  // console.log(token, 'Access Token Test********');

  if (!token) {
    console.error('Authentication Error: Access token is missing.');
    throw new Error('Authentication token missing.');
  }

  // 1. Construct the complete endpoint URL
  // FIX: Dynamically use the 'params' variable as the query key name.
  // Example: If params='rajan' and parentId='103', URL will be .../Category?rajan=103
  const fullurl = `${baseURL}${endpoint}?${params}=${parentId}`;

  // 2. Define the required headers
  const headers = {
    accept: 'application/json',
    'Accept-Language': 'en',
    'X-Country-Code': 'AE',
    'X-User-Type': 'Merchant',
    // Token is guaranteed to be a string here
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(fullurl, {headers});

    return response.data;
  } catch (error) {
    // Improved error logging
    console.error(
      'Failed to fetch child categories:',
      error.response?.data || error.message,
    );
    // Throw a new error to be caught by the caller
    throw new Error('Failed to load subcategories: API call failed.');
  }
};

//post

export const postDataWithAuth = async (endpoint, body, bodyType = 'json') => {
  // --- 1. Authentication and Token Retrieval (Unchanged) ---
  const savedUserJson = await AsyncStorage.getItem(KEYS.USER_INFO);

  if (!savedUserJson) {
    console.error('Authentication Error: User info not found in storage.');
    throw new Error('Authentication required.');
  }

  const savedUser = JSON.parse(savedUserJson);
  const token = savedUser?.accessToken;

  if (!token) {
    console.error('Authentication Error: Access token is missing.');
    throw new Error('Authentication token missing.');
  }

  // --- 2. URL and Base Headers ---
  const fullurl = `${baseURL}${endpoint}`;

  let headers = {
    'Accept-Language': 'en',
    'X-Country-Code': 'AE',
    'X-User-Type': 'Merchant',
    Authorization: `Bearer ${token}`,
  };

  if (bodyType === 'json') {
    headers['Content-Type'] = 'application/json';
    headers['accept'] = 'application/json';
  } else if (bodyType === 'formData') {
    headers['Content-Type'] = 'multipart/form-data';
    headers['accept'] = 'application/json';
  } else {
    // Default fallback
    headers['accept'] = 'application/json';
  }

  console.log(
    `POST Request to: ${fullurl} with Content-Type: ${
      headers['Content-Type'] || 'Default'
    }`,
  );

  try {
    // --- 4. Axios POST Call ---
    const response = await axios.post(fullurl, body, {headers});

    return response.data;
  } catch (error) {
    console.error(
      `API POST failed for ${endpoint}:`,
      error.response?.data || error.message,
    );
    const status = error.response?.status;
    throw new Error(`API POST failed with status ${status || 'N/A'}.`);
  }
};
