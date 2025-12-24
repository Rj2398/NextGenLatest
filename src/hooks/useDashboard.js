import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useMutation, useQuery} from '@tanstack/react-query';
import {api} from '../utils/api';

export default function useDashboard(productId) {
  const dispatch = useDispatch();
  const [manualLoading, setManualLoading] = useState(false);

  const {data: getDashboardList, isLoading: isLoadingDashboard} = useQuery({
    queryKey: ['/api/v1/Products/dashboard-kpis', 'user'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/Products/dashboard-kpis');
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

  const {data: getInventoryList, isLoading: isLoadingInventory} = useQuery({
    queryKey: ['/api/v1/Products?PageName=Inventory_Product_List', 'user'],
    queryFn: async () => {
      try {
        const response = await api.get(
          '/api/v1/Products?PageName=Inventory_Product_List',
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
  });

  //date-24-11-2025
  const {data: getPurchaseHistory, isLoading: isLoadingPurchaseHistory} =
    useQuery({
      // 1. IMPORTANT: Include productId in the queryKey so the query refetches when the ID changes.
      queryKey: ['purchaseHistory', 'user', productId],
      queryFn: async () => {
        try {
          // 2. FIX: Correct template literal syntax for embedding the variable
          const response = await api.get(
            `/api/v1/Products/${productId}/purchase-history`,
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
      // You may also want to disable this query if productId is null/undefined
      enabled: !!productId,
    });

  //

  const {data: getOverViewList, isLoading: isLoadingOverViewList} = useQuery({
    // IMPORTANT: Make sure the query key is unique for this specific query
    queryKey: ['productOverviewDetails', productId],
    queryFn: async () => {
      try {
        // FIX: Implement the required endpoint structure:
        // /api/v1/Products?PageName=Product_Details_Overview&ProductId=prod-123
        const response = await api.get(
          `/api/v1/Products?PageName=Product_Details_Overview&ProductId=${productId}`,
        );

        const {data} = response;
        return data.data;
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          'An unknown error occurred';

        if (error?.response?.data?.message === 'Unauthenticated.') {
          // LogoutError();
        }

        // toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    // Only run this query if a productId is provided
    enabled: !!productId,
  });
  ///api/v1/Pages/Inventory_Search_Filter
  const {data: filterUIApi, isLoading: isLoadingFilterUI} = useQuery({
    queryKey: ['/api/v1/Pages/Inventory_Search_Filter', 'user'],
    queryFn: async () => {
      try {
        const response = await api.get(`/api/v1/Pages/Inventory_Search_Filter`);

        const {data} = response;
        return data;
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          'An unknown error occurred';

        if (error?.response?.data?.message === 'Unauthenticated.') {
          // LogoutError();
        }

        // toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    // Only run this query if a productId is provided
  });
  //
  const isLoading = manualLoading;

  return {
    getDashboardList,
    isLoadingDashboard,
    getInventoryList,
    isLoadingInventory,

    //

    getPurchaseHistory,
    isLoadingPurchaseHistory,
    getOverViewList,
    isLoadingOverViewList,
    filterUIApi,
    isLoadingFilterUI,
  };
}
