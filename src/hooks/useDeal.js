import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';
import { useState } from 'react';

const DEAL_ENDPOINT = '/api/v1/deal';

export default function useDeal() {
  // 🔵 GET ALL DEALS (with loader)
  const useFetchDeals = () => {
    const [isLoading, setIsLoading] = useState(false);

    const query = useQuery({
      queryKey: ['dealsList'],
      queryFn: async () => {
        try {
          setIsLoading(true);
          const response = await api.get(DEAL_ENDPOINT);
          console.log('ALL DEALS RESPONSE:', response);
          return response.data.data;
        } catch (error) {
          console.log('API ERROR:', error);
          const msg =
            error?.response?.data?.message ||
            error.message ||
            'Error fetching deals';
          throw new Error(msg);
        } finally {
          setIsLoading(false);
        }
      },
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });

    return { ...query, isLoading }; // include loader
  };

  // 🔵 SEARCH DEALS
  const useSearchDeals = (queryText) => {
   // const [isLoading, setIsLoading] = useState(false);

    const query = useQuery({
      queryKey: ['searchDeals', queryText],
      queryFn: async () => {
        try {
       //   setIsLoading(true);
          const response = await api.get(DEAL_ENDPOINT, { params: { Q: queryText } });
          console.log('SEARCH RESULT:', response);
          return response.data.data;
        } catch (error) {
          console.log('SEARCH API ERROR:', error);
          const msg =
            error?.response?.data?.message ||
            error.message ||
            'Error searching deals';
          throw new Error(msg);
        } finally {
        //  setIsLoading(false);
        }
      },
      enabled: !!queryText,
      refetchOnWindowFocus: false,
    });

    return { ...query };
  };

  // 🔵 FILTER DEALS
  const useFilterDeals = (filters = {}) => {
    const [isLoading, setIsLoading] = useState(false);

    const query = useQuery({
      queryKey: ['filterDeals', filters],
      queryFn: async () => {
        try {
          setIsLoading(true);
          const fieldQuery = JSON.stringify(filters);
          const response = await api.get(DEAL_ENDPOINT, { params: { fieldQuery } });
          return response.data.data;
        } catch (error) {
          console.log('FILTER API ERROR:', error);
          const msg =
            error?.response?.data?.message ||
            error.message ||
            'Error filtering deals';
          throw new Error(msg);
        } finally {
          setIsLoading(false);
        }
      },
      enabled: !!filters && Object.keys(filters).length > 0,
      refetchOnWindowFocus: false,
    });

    return { ...query, isLoading };
  };

  return {
    useFetchDeals,
    useSearchDeals,
    useFilterDeals,
  };
}
