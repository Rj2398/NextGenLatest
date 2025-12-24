import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {KEYS, baseURL} from '../config/constant';
import {clearUser, setTokens} from '../store/slices/userSlice';
import store from '../store';

const api = axios.create({
  baseURL,
});

// --- Constants ---
const REFRESH_ENDPOINT = '/api/v1/Auth/refresh';

// --- State for Refresh Token Handling (Prevents race condition) ---
let isRefreshing = false;
let failedQueue = [];

// --- Helper function to process the queue ---
const processQueue = (error, accessToken = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(accessToken);
    }
  });
  failedQueue = [];
};

// =========================================================================
// 1. REQUEST Interceptor (UPDATED with Mandatory Headers)
// =========================================================================
api.interceptors.request.use(
  async config => {
    const {userInfo} = store.getState().user;
    let accessToken = userInfo?.accessToken;
    let userid = userInfo?.userId;

    // Get token from AsyncStorage as a fallback/initial load
    const savedUser = await AsyncStorage.getItem(KEYS.USER_INFO);
    console.log(savedUser, 'savedUser');
    const storedUser = savedUser ? JSON.parse(savedUser) : null;
    accessToken = storedUser?.accessToken || accessToken;
    userid = storedUser?.userId || userid;

    // 1. Set Mandatory Headers
    config.headers.Accept = 'text/plain';
    config.headers['Accept-Language'] = 'en';
    config.headers['X-Country-Code'] = 'AE';
    config.headers['X-User-Type'] = 'Academia';
    config.headers['X-User-Id'] = userid;

    // 2. Set Authorization Header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 3. Auto-detect Content-Type (remains correct)
    // if (config.data instanceof FormData) {
    //   config.headers['Content-Type'] = 'multipart/form-data';
    // } else {
    //   config.headers['Content-Type'] = 'application/json';
    // }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (!config.headers['Content-Type']) {
      // 👈 ADD THIS CHECK
      // ONLY set 'application/json' if Content-Type hasn't been set by the caller
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  error => Promise.reject(error),
);

// =========================================================================
// 2. RESPONSE Interceptor (Token Refresh Logic)
// =========================================================================
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // --- Check if it's an expired token (401) and not a retry attempt ---
    if (status === 401 && !originalRequest._retry) {
      const savedUser = await AsyncStorage.getItem(KEYS.USER_INFO);
      const storedUser = savedUser ? JSON.parse(savedUser) : null;
      const refreshToken = storedUser?.refreshToken;

      if (!refreshToken || originalRequest.url.includes(REFRESH_ENDPOINT)) {
        store.dispatch(clearUser());
        return Promise.reject({
          message: 'Session expired. Please log in again.',
        });
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        })
          .then(newAccessToken => {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            originalRequest._retry = true;
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        // --- API CALL TO REFRESH TOKEN (Using direct axios to avoid interception) ---
        const refreshResponse = await axios.post(
          `${baseURL}${REFRESH_ENDPOINT}`,
          {
            refreshToken: refreshToken,
          },
        );

        const {accessToken: newAccessToken, refreshToken: newRefreshToken} =
          refreshResponse.data;

        // Update the store/storage with new tokens
        const newStoredUser = {
          ...storedUser,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        };

        await AsyncStorage.setItem(
          KEYS.USER_INFO,
          JSON.stringify(newStoredUser),
        );
        store.dispatch(
          setTokens({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          }),
        );

        isRefreshing = false;
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);
        store.dispatch(clearUser());
        return Promise.reject({
          message: 'Session expired. Please log in again.',
        });
      }
    } // End of 401 handling

    // --- Handle Other Errors (Non-401) ---
    const customError = {
      message:
        error.response?.data?.data?.message ||
        'Something went wrong. Please try again later.',
      status: status,
    };
    return Promise.reject(customError);
  },
);

export {api};

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import {KEYS, baseURL} from '../config/constant';
// import {clearUser, setTokens} from '../store/slices/userSlice';
// import store from '../store';

// const api = axios.create({
//   baseURL,
// });

// // --- Constants ---
// const REFRESH_ENDPOINT = '/api/v1/Auth/refresh';

// // --- State for Refresh Token Handling (Prevents race condition) ---
// let isRefreshing = false;
// let failedQueue = [];

// // --- Helper function to process the queue ---
// const processQueue = (error, accessToken = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(accessToken);
//     }
//   });
//   failedQueue = [];
// };

// =========================================================================
// 1. REQUEST Interceptor (LOGS URL AND BODY)
// =========================================================================
// api.interceptors.request.use(
//   async config => {
//     // --- DEBUG LOGS: Request Start ---
//     const fullUrl = `${config.baseURL || ''}${config.url || ''}`;
//     console.log('==================== API REQUEST START ====================');
//     console.log(`METHOD: ${config.method.toUpperCase()}`);
//     console.log(`URL: ${fullUrl}`);

//     // Log Request Body/Data
//     if (config.data) {
//       if (config.data instanceof FormData) {
//         console.log(
//           'BODY:',
//           '[FormData - data structure not logged, check headers for Content-Type]',
//         );
//       } else {
//         console.log('BODY:', JSON.stringify(config.data, null, 2));
//       }
//     } else {
//       console.log('BODY: (No data sent)');
//     }
//     console.log('===========================================================');
//     // --- DEBUG LOGS: Request End ---

//     const {userInfo} = store.getState().user;
//     let accessToken = userInfo?.accessToken;
//     let userid = userInfo?.userId;
//     const savedUser = await AsyncStorage.getItem(KEYS.USER_INFO);
//     console.log(savedUser, 'savedUser');
//     const storedUser = savedUser ? JSON.parse(savedUser) : null;
//     accessToken = storedUser?.accessToken || accessToken;
//     userid = storedUser?.userId || userid;

//     // Set Mandatory Headers
//     config.headers.Accept = 'text/plain';
//     config.headers['Accept-Language'] = 'en';
//     config.headers['X-Country-Code'] = 'AE';
//     config.headers['X-User-Type'] = 'Academia';
//     config.headers['X-User-Id'] = userid;

//     // Set Authorization Header
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     // Auto-detect Content-Type
//     if (config.data instanceof FormData) {
//       config.headers['Content-Type'] = 'multipart/form-data';
//     } else {
//       config.headers['Content-Type'] = 'application/json';
//     }

//     return config;
//   },
//   error => Promise.reject(error),
// );

// // =========================================================================
// // 2. RESPONSE Interceptor (LOGS RESPONSE DATA AND ERROR)
// // =========================================================================
// api.interceptors.response.use(
//   response => {
//     // --- DEBUG LOGS: Successful Response ---
//     const fullUrl = `${response.config.baseURL || ''}${
//       response.config.url || ''
//     }`;
//     console.log(
//       '✅ ==================== API RESPONSE SUCCESS ==================== ✅',
//     );
//     console.log(`URL: ${fullUrl}`);
//     console.log(`STATUS: ${response.status}`);
//     console.log('DATA:', JSON.stringify(response.data, null, 2));
//     console.log(
//       '===================================================================',
//     );
//     // --- DEBUG LOGS: Response End ---

//     return response;
//   },
//   async error => {
//     const originalRequest = error.config;
//     const status = error.response?.status;

//     // --- DEBUG LOGS: Error Response ---
//     const fullUrl = `${originalRequest.baseURL || ''}${
//       originalRequest.url || ''
//     }`;
//     console.log(
//       '❌ ==================== API RESPONSE ERROR ==================== ❌',
//     );
//     console.log(`URL: ${fullUrl}`);
//     console.log(`STATUS: ${status}`);
//     console.log('ERROR MESSAGE:', error.response?.data || error.message);
//     console.log(
//       '===================================================================',
//     );
//     // --- DEBUG LOGS: Error End ---

//     // --- Token Refresh Logic ---
//     if (status === 401 && !originalRequest._retry) {
//       const savedUser = await AsyncStorage.getItem(KEYS.USER_INFO);
//       const storedUser = savedUser ? JSON.parse(savedUser) : null;
//       const refreshToken = storedUser?.refreshToken;

//       if (!refreshToken || originalRequest.url.includes(REFRESH_ENDPOINT)) {
//         store.dispatch(clearUser());
//         return Promise.reject({
//           message: 'Session expired. Please log in again.',
//         });
//       }

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({resolve, reject});
//         })
//           .then(newAccessToken => {
//             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//             originalRequest._retry = true;
//             return api(originalRequest);
//           })
//           .catch(err => {
//             return Promise.reject(err);
//           });
//       }

//       isRefreshing = true;
//       originalRequest._retry = true;

//       try {
//         const refreshResponse = await axios.post(
//           `${baseURL}${REFRESH_ENDPOINT}`,
//           {
//             refreshToken: refreshToken,
//           },
//         );

//         const {accessToken: newAccessToken, refreshToken: newRefreshToken} =
//           refreshResponse.data;

//         const newStoredUser = {
//           ...storedUser,
//           accessToken: newAccessToken,
//           refreshToken: newRefreshToken,
//         };

//         await AsyncStorage.setItem(
//           KEYS.USER_INFO,
//           JSON.stringify(newStoredUser),
//         );
//         store.dispatch(
//           setTokens({
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken,
//           }),
//         );

//         isRefreshing = false;
//         processQueue(null, newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         isRefreshing = false;
//         processQueue(refreshError, null);
//         store.dispatch(clearUser());
//         return Promise.reject({
//           message: 'Session expired. Please log in again.',
//         });
//       }
//     } // End of 401 handling

//     // --- Handle Other Errors (Non-401) ---
//     const customError = {
//       message:
//         error.response?.data?.data?.message ||
//         'Something went wrong. Please try again later.',
//       status: status,
//     };
//     return Promise.reject(customError);
//   },
// );

// export {api};

//
//
//
//
//
//
//
//
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
//

//
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
////
//
//
//
//
//
//
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import {KEYS, baseURL} from '../config/constant';
// import {clearUser} from '../store/slices/userSlice';
// import store from '../store';

// const api = axios.create({
//   baseURL,
// });

// // Request Interceptor
// api.interceptors.request.use(
//   async config => {
//     const {userInfo} = store.getState().user;
//     let token = userInfo?.token;

//     const savedUser = await AsyncStorage.getItem(KEYS.USER_INFO);
//     const storedUser = savedUser ? JSON.parse(savedUser) : null;
//     token = storedUser?.access_token || token;

//     // ✅ Attach token if exists
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // ✅ Auto-detect FormData
//     if (config.data instanceof FormData) {
//       config.headers['Content-Type'] = 'multipart/form-data';
//     } else {
//       config.headers['Content-Type'] = 'application/json';
//     }

//     return config;
//   },
//   error => Promise.reject(error),
// );

// // Response Interceptor
// api.interceptors.response.use(
//   response => response,
//   error => {
//     const customError = {
//       message:
//         error.response?.data?.data?.message ||
//         'Something went wrong. Please try again later.',
//       status: error.response?.status,
//     };

//     // ✅ Auto logout on 401
//     if (error.response?.status === 401) {
//       store.dispatch(clearUser());
//     }

//     return Promise.reject(customError);
//   },
// );

// export {api};
//

//for refresh token code
