import {createSlice} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEYS} from '../../config/constant';

const initialState = {
  userInfo: null,
  useTypeStore: null,
  userDashboardModal: false,
  createdDepartment: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      // if (!state?.userInfo?.token || !state?.token) {
      //   AsyncStorage.removeItem(KEYS.USER_INFO);
      // }
    },
    setUserType: (state, action) => {
      state.useTypeStore = action.payload;
    },
    setUserDashboardModalToggle: (state, action) => {
      state.userDashboardModal = action.payload;
    },
    setCreatedDepartment: (state, action) => {
      state.createdDepartment = action.payload;
    },
    clearUser: state => {
      state.userInfo = null;
      state.firstTimeUser = null;
      state.storeEmailOrOtp = null;
      AsyncStorage.removeItem(KEYS.USER_INFO);
      AsyncStorage.removeItem('UserTypeSet');
    },
  },
});

export const {
  setUserInfo,
  clearUser,
  setUserType,
  setUserDashboardModalToggle,
  setCreatedDepartment,
} = userSlice.actions;

export default userSlice.reducer;
