import {useDispatch} from 'react-redux';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  clearUser,
  setCreatedDepartment,
  setUserInfo,
} from '../store/slices/userSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {api} from '../utils/api';
import {KEYS} from '../config/constant';
import {useState} from 'react';

export default function useCreate() {
  const dispatch = useDispatch();
  const [manualLoading, setManualLoading] = useState(false);

  const {mutateAsync: CreateDepartment} = useMutation({
    mutationKey: ['CreateDepartment', 'academia'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('Department/createDepartment', payload);

        const {data} = response;
        if (data) {
          dispatch(setCreatedDepartment(data?.data));
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
  const {mutateAsync: CreateTeam} = useMutation({
    mutationKey: ['CreateTeam', 'academia'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post(
          'AcademiaStaff/createAcademiaStaff',
          payload,
        );

        const {data} = response;
        if (data) {
          dispatch(setCreatedDepartment(data?.data));
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

  //toggle departmment

  const {
    mutateAsync: UpdateDepartmentActive,
    isLoading: loadingUpdateDepartmentActive,
  } = useMutation({
    mutationKey: ['UpdateDepartmentActive', 'academia'],
    mutationFn: async ({department_id, payload}) => {
      try {
        setManualLoading(true);
        const response = await api.put(
          `Department/updateDepartment/${department_id}`,
          payload,
        );

        const {data} = response;
        // if (data) {
        //   dispatch(setCreatedDepartment(data?.data));
        // }

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

  const {mutateAsync: updateTeam, isLoading: loadingUpdateTeam} = useMutation({
    mutationKey: ['editAcademiaStaff', 'academia'],
    mutationFn: async ({team_Id, payload}) => {
      try {
        setManualLoading(true);
        const response = await api.post(
          `AcademiaStaff/editAcademiaStaff/${team_Id}`,
          payload,
        );

        const {data} = response;
        if (data) {
          dispatch(setCreatedDepartment(data?.data));
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
  }); //AcademiaStaff/
  const {mutateAsync: deleteStaff, isLoading: loadingStaff} = useMutation({
    mutationKey: ['AcademiaStaff', 'academia'],
    mutationFn: async delete_id => {
      try {
        setManualLoading(true);
        // Corrected: pass only the ID in the URL string
        const response = await api.delete(`AcademiaStaff/${delete_id}`);

        const {data} = response;

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
  const isLoading = manualLoading;
  return {
    CreateDepartment,
    isLoading, // Added isLoading for completeness
    CreateTeam,
    UpdateDepartmentActive,
    loadingUpdateDepartmentActive,
    updateTeam,
    loadingUpdateTeam,
    deleteStaff,
    loadingStaff,
  };
}
