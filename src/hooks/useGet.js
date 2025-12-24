import {useQuery} from '@tanstack/react-query';
import {api} from '../utils/api';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

export default function useGet(academia_id, fieldQuery = {}) {
  const dispatch = useDispatch();
  const {data: getDepartmantList, isLoading: loadigDepartmentList} = useQuery({
    queryKey: ['Department?Dropdown=true&AcademiaId', 'user', academia_id],
    queryFn: async () => {
      try {
        const response = await api.get(
          `Department?Dropdown=true&AcademiaId=${academia_id}`,
        );
        const {data} = response;
        return data.data;
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          'An unknown error occurred';

        if (error?.response?.data?.message === 'Unauthenticated.') {
          LogoutError();
        }

        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !!academia_id,
  });
  //

  const {data: getRoles, isLoading: loadingRoles} = useQuery({
    queryKey: ['api/RoleManagement/roles ', 'user', academia_id],
    queryFn: async () => {
      try {
        console.log(academia_id, 'data111');
        const response = await api.get(`api/RoleManagement/roles `);
        const {data} = response;
        return data.data;
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          'An unknown error occurred';

        if (error?.response?.data?.message === 'Unauthenticated.') {
          LogoutError();
        }

        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  //

  //
  const {data: getDepartments, isLoading: loadingDepartments} = useQuery({
    queryKey: ['Department?AcademiaId= ', academia_id],
    queryFn: async () => {
      try {
        console.log(academia_id, 'data111');
        const response = await api.get(`Department?AcademiaId=${academia_id}`);
        const {data} = response;
        return data.data;
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          'An unknown error occurred';

        if (error?.response?.data?.message === 'Unauthenticated.') {
          LogoutError();
        }

        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !!academia_id,
  });

  //search advancd

  const {
    data: searchAdvanceDepartment,
    isLoading: loadingSearchAdvanceDepartment,
    isError,
  } = useQuery({
    queryKey: ['DepartmentSearch', academia_id, fieldQuery],
    queryFn: async () => {
      try {
        // Build final query object
        const finalQuery = {
          academiaId: academia_id,
          ...fieldQuery, // optional filters
        };

        const encodedQuery = encodeURIComponent(JSON.stringify(finalQuery));

        const response = await api.get(`Department?FieldQuery=${encodedQuery}`);

        return response?.data?.data;
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          'An unknown error occurred';

        if (error?.response?.data?.message === 'Unauthenticated.') {
          LogoutError();
        }

        throw new Error(errorMessage);
      }
    },
    enabled: !!academia_id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  //

  const {data: getTeams, isLoading: teamLoading} = useQuery({
    queryKey: ['cademiaStaff?PageName=Teams_Search&AcademiaId', academia_id],
    queryFn: async () => {
      try {
        const response = await api.get(
          `AcademiaStaff?PageName=Teams_Search&AcademiaId=${academia_id}&Page=1&PageSize=5`,
        );
        const {data} = response;

        console.log(data?.data, 'filter by all');
        return data.data;
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          'An unknown error occurred';

        if (error?.response?.data?.message === 'Unauthenticated.') {
          LogoutError();
        }

        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !!academia_id,
  });
  //

  //

  const {data: FliterData, isLoading: loadingFilter} = useQuery({
    queryKey: ['DepartmentSearch', academia_id, fieldQuery],
    queryFn: async () => {
      try {
        // Build final query object
        // const finalQuery = {
        //   ...fieldQuery,
        // };

        // const encodedQuery = encodeURIComponent(JSON.stringify(finalQuery));

        const encodedQuery = encodeURIComponent(JSON.stringify(fieldQuery));
        console.log(
          encodedQuery,
          'encodedQueryencodedQueryencodedQuery',
          academia_id,
        );
        const response = await api.get(
          `AcademiaStaff?PageName=Teams_Search&AcademiaId=${academia_id}&FieldQuery=${encodedQuery}`,
        );
        console.log(response?.data?.data, 'filter by tabs');

        return response?.data?.data;
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          'An unknown error occurred';

        if (error?.response?.data?.message === 'Unauthenticated.') {
          LogoutError();
        }

        throw new Error(errorMessage);
      }
    },
    enabled: !!academia_id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  const {data: FilterBySearch, isLoading: searchLoading} = useQuery({
    queryKey: ['FilterBySearch', academia_id, fieldQuery],
    queryFn: async () => {
      try {
        const {status, ...searchQuery} = fieldQuery || {};

        const encodedQuery = encodeURIComponent(JSON.stringify(searchQuery));

        // console.log(searchQuery, 'filter by search params');

        const response = await api.get(
          `AcademiaStaff?PageName=Teams_Search&AcademiaId=${academia_id}&FieldQuery=${encodedQuery}`,
        );
        console.log(response?.data?.data, 'filter by search');
        return response?.data?.data;
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          'An unknown error occurred';

        if (error?.response?.data?.message === 'Unauthenticated.') {
          LogoutError();
        }

        throw new Error(errorMessage);
      }
    },
    enabled: !!academia_id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  //
  return {
    getDepartmantList,
    loadigDepartmentList,
    getDepartments,
    loadingDepartments,
    searchAdvanceDepartment,
    loadingSearchAdvanceDepartment,
    getTeams,
    teamLoading,
    FliterData,
    loadingFilter,
    FilterBySearch,
    searchLoading,
  };
}
