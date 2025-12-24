import {useDispatch} from 'react-redux';
import {useMutation} from '@tanstack/react-query';
import {clearUser, setUserInfo} from '../store/slices/userSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {api} from '../utils/api';
import {KEYS} from '../config/constant';
import {useState} from 'react';

export default function useAuth() {
  const dispatch = useDispatch();

  const [manualLoading, setManualLoading] = useState(false);

  const {mutateAsync: loginUser} = useMutation({
    mutationKey: ['login', 'Academia'],
    mutationFn: async payload => {
      try {
        console.log('call transfer***');
        setManualLoading(true);
        const response = await api.post('Auth/login', payload);

        const {data} = response;

        // --- CHANGE START: Extracting and saving refreshToken ---
        const accessToken = data?.data?.accessToken;
        const refreshToken = data?.data?.refreshToken; // <--- EXTRACT REFRESH TOKEN
        console.log(data?.data, 'data comes from, auth ');
        const userId = data?.data?.userId;
        // --- CHANGE END ---

        if (accessToken && refreshToken && userId) {
          //
          await AsyncStorage.setItem(
            KEYS.USER_INFO,
            JSON.stringify(data?.data),
          );

          setTimeout(() => {
            dispatch(setUserInfo(data?.data));
          }, 1000);
        }

        return {
          ...data,
          message: data?.message,
        };
      } catch (error) {
        const errorMessage = error.message || 'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {mutateAsync: RegisterApi} = useMutation({
    mutationKey: ['register', 'Academia'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post(
          'Academia/onboarding/contact-verification',
          payload,
        );

        const {data} = response;

        // --- CHANGE START: Extracting and saving refreshToken ---
        const accessToken = data?.data?.accessToken;
        // const refreshToken = data?.data?.refreshToken; //
        console.log(data?.data, 'data comes from, auth ');
        const userId = data?.data?.userId;
        // --- CHANGE END ---

        if (accessToken && userId) {
          //
          await AsyncStorage.setItem(
            KEYS.USER_INFO,
            JSON.stringify(data?.data),
          );

          // setTimeout(() => {
          //   dispatch(setUserInfo(data?.data));
          // }, 1000);
        }

        return {
          ...data,
          message: data?.message,
        };
      } catch (error) {
        const errorMessage = error.message || 'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //Auth/otp/send

  const {mutateAsync: sendOtp} = useMutation({
    mutationKey: ['Auth/otp/send', 'Academia'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('Auth/otp/send', payload);

        const {data} = response;

        // --- CHANGE START: Extracting and saving refreshToken ---
        // const accessToken = data?.data?.accessToken;
        // const refreshToken = data?.data?.refreshToken; //
        // console.log(data?.data, 'data comes from, auth ');
        // const userId = data?.data?.userId;
        // // --- CHANGE END ---

        // if (accessToken && userId) {
        //   //
        //   await AsyncStorage.setItem(
        //     KEYS.USER_INFO,
        //     JSON.stringify(data?.data),
        //   );

        //   setTimeout(() => {
        //     dispatch(setUserInfo(data?.data));
        //   }, 1000);
        // }

        // setTimeout(() => {
        //   dispatch(setUserInfo(data?.data));
        // }, 1000);

        return {
          ...data,
          message: data?.message,
        };
      } catch (error) {
        const errorMessage = error.message || 'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  // Auth/otp/verify

  const {mutateAsync: verifyOtp} = useMutation({
    mutationKey: ['Auth/otp/verify', 'Academia'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('Auth/otp/verify', payload);

        const {data} = response;

        // setTimeout(() => {
        //   dispatch(setUserInfo(data?.data));
        // }, 1000);

        return {
          ...data,
          message: data?.message,
        };
      } catch (error) {
        const errorMessage = error.message || 'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //

  const {mutateAsync: setUpPassword} = useMutation({
    mutationKey: ['Academia/onboarding/password-setup', 'Academia'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post(
          'Academia/onboarding/password-setup',
          payload,
        );

        const {data} = response;

        // setTimeout(() => {
        //   dispatch(setUserInfo(data?.data));
        // }, 1000);

        return {
          ...data,
          message: data?.message,
        };
      } catch (error) {
        const errorMessage = error.message || 'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  const isLoading = manualLoading;
  return {
    loginUser,
    isLoading, // Added isLoading for completeness
    RegisterApi,
    sendOtp,
    verifyOtp,
    setUpPassword,
  };
}
