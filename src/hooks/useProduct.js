import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useMutation, useQuery} from '@tanstack/react-query';
import {api} from '../utils/api';

export default function useProductModal() {
  const dispatch = useDispatch();
  const [manualLoading, setManualLoading] = useState(false);

  const {data: getAllProductModal, isLoading: isLoadinAllModal} = useQuery({
    queryKey: ['PageGroup/Ecommerce_Product', 'user'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/PageGroup/Ecommerce_Product');
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
  const {data: getCategory, isLoading: loadingCategory} = useQuery({
    queryKey: ['/api/v1/Category', 'user'],
    queryFn: async () => {
      try {
        const response = await api.get('/api/v1/Category');
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

  //get product

  //

  const {mutateAsync: completeProduct, isLoading: loadingSubmission} =
    useMutation({
      mutationKey: ['/api/v1/Products/complete', 'user'],
      mutationFn: async payload => {
        try {
          setManualLoading(true);
          const response = await api.post('/api/v1/Products/complete', payload);

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
  //update products

  const {mutateAsync: updateProducts, isLoading: loadingUpdateProduct} =
    useMutation({
      mutationKey: ['/api/v1/Product/update', 'user'],
      mutationFn: async payload => {
        try {
          setManualLoading(true);
          const response = await api.post('/api/v1/Product/update', payload);

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

  const isLoading = manualLoading;

  return {
    getAllProductModal,
    isLoadinAllModal,
    isLoading,
    completeProduct,
    loadingSubmission,
    updateProducts,
    loadingUpdateProduct,
    getCategory,
    loadingCategory,
  };
}
