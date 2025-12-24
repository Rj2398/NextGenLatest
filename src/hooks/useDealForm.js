import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useMutation, useQuery,useQueryClient} from '@tanstack/react-query';
import {api} from '../utils/api'; 

/**
 * 🛠️ Utility function to extract fields and actions for a specific page/section.
 * * This function specifically hunts for the page object (Deal_ProductAssignment) 
 * * within the 'pages' array inside the main dealFormData.
 * * @param {object} formData - The full deal form structure (which contains the 'pages' array).
 * @param {string} pageName - The name of the target page (e.g., 'Deal_ProductAssignment').
 * @param {string} sectionName - The name of the target section (e.g., 'ProductAssignmentDetails').
 * @returns {object} { fields: [], actions: [], pageTitle: string }
 */

const DEAL_BASE_ENDPOINT = 'deal';
const getPageData = (formData, pageName, sectionName = 'ProductAssignmentDetails') => {
    // 1. Check if formData or the 'pages' array exists
    if (!formData || !formData.pages || !Array.isArray(formData.pages)) {
        return { fields: [], pageTitle: '', actions: [],
        pageGroupName: formData?.pageGroupName || ''  };
    }

    const pageGroupName = formData.pageGroupName || ''; 

    // 2. Find the correct page object in the 'pages' array
    const page = formData.pages.find(p => p.pageName === pageName);
    
    if (!page || !page.sections || !Array.isArray(page.sections)) {
        console.warn(`Page "${pageName}" or its sections not found in form data.`);
        return { fields: [], pageTitle: page?.title || '', actions: [],
        pageGroupName: pageGroupName, };
    }
    
    // 3. Find the correct section object within the page's 'sections' array
    const section = page.sections.find(s => s.name === sectionName);
    
    // 4. Extract fields and actions
    let buttons = section?.buttons || [];
    
    // Adding a default Cancel button for robustness (if not provided by API)
    if (!buttons.find(b => b.buttonId === 'btn_cancel')) {
        buttons = [
            { buttonId: 'btn_cancel', label: 'Cancel', type: 'secondary', apiCallRequired: false, method: 'NONE', endpoint: null },
            ...buttons
        ];
    }

    return {
        fields: section?.fields || [],
        pageTitle: page.title || pageName,
        actions: buttons,
        pageGroupName: pageGroupName,
    };
};


export default function useDealForm() {
    const [manualLoading, setManualLoading] = useState(false);

    // --- 1. GET Deal Creation Form Data ---
    const {
        data: dealFormData, 
        isLoading: isLoadingDealForm, 
        error: dealFormError
    } = useQuery({
        queryKey: ['PageGroup/Deal_Creation'], 
        queryFn: async () => {
            try {
                const response = await api.get('PageGroup/Deal_Creation'); 
                const {data} = response;    

                return data.data; 
            } catch (error) {
                const errorMessage =
                    error?.response?.data?.message ||
                    error.message ||
                    'Error fetching deal form structure';

                console.error(errorMessage);
                throw new Error(errorMessage);
            }
        },
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });


    const useDeleteDeal = () => {
        const queryClient = useQueryClient(); // This line requires the provider context!
        return useMutation({
            mutationKey: ['deleteDeal'],
            // The mutation function receives the deal ID (e.g., '4j6l3346-4192-17kl-611i-l74mi8m67hl4')
            mutationFn: async (dealId) => {
                // Construct the DELETE endpoint: Deal/{dealId}
                console.log("dealId",dealId)
                const endpoint = `${DEAL_BASE_ENDPOINT}/${dealId.dealId}`; 

               // console.log("",endpoint)
                
                // Use the configured api.delete, which handles tokens/headers/refresh
                const response = await api.delete(endpoint);
                
                // Return data or success message
                return response.data || { message: "Deal deleted successfully." };
            },
            // On successful deletion, invalidate the deals list query to force a UI refresh.
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['dealsList'] });
            },
            onError: (error) => {
                // Re-throw the error for component-level handling (Alert, Toast)
                const errorMessage = error.response?.data?.message || error.message || 'Deletion failed.';
                console.log("$$$$$$",errorMessage)
                throw error;
            }
        });
    };

    
    // ------------------------------------

    // --- 2. POST Deal Submission Mutation (UPDATED to handle FormData and dynamic endpoint) ---
    const {mutateAsync: createNewDeal} = useMutation({
        mutationKey: ['createNewDeal', 'user'],
        // Receive payload (containing fields array) and endpoint
        mutationFn: async ({payload, endpoint}) => { 
            try {
                setManualLoading(true);

                //  1. Create FormData object
                const formData = new FormData();
                formData.append('pageName', payload.pageName);
                
                //  2. Append fields in the required fields[n].fieldName format
                payload.fields.forEach((field, index) => {
                    formData.append(`fields[${index}].fieldName`, field.fieldName);
                    formData.append(`fields[${index}].value`, field.value);
                });
                console.log("*************", payload);
                //  3. Use the dynamic endpoint for the POST request
                const finalEndpoint =  'deal'; //endpoint ||
                console.log("*************", finalEndpoint);
                const response = await api.post(finalEndpoint, formData, {
                    headers: {
                        // This header is essential for multipart/form-data
                        'Content-Type': 'multipart/form-data', 
                    },
                }); 

                const {data} = response;

                return {
                    ...data,
                    message: data?.message || 'Deal created successfully.',
                };
            } catch (error) {
                const errorMessage = error.message || 'Deal creation failed';
                throw new Error(errorMessage);
            } finally {
                setManualLoading(false);
            }
        },
    });


    // --- 3. GET Deals List with Pagination (Uses Dynamic Query Params) ---
    /**
     * Custom hook to fetch the list of deals with pagination and filters.
     * @param {number} page - Current page number (Default: 1).
     * @param {number} pageSize - Number of items per page (Default: 10).
     * @param {object} filters - Additional filters to apply (e.g., status, search term).
     */
    const useFetchDeals = (page = 1, pageSize = 10, filters = {}) => {
        // Query key will change when page, pageSize, or filters change, triggering a refetch.
        const queryKey = ['dealsList', page, pageSize, filters]; 

        return useQuery({
            queryKey: queryKey,
            queryFn: async () => {
                try {
                    // 1. Construct query parameters dynamically
                    const params = new URLSearchParams({ 
                        page: page, 
                        pageSize: pageSize, 
                        ...filters 
                    }).toString();

                    const endpoint = `Deal?${params}`;
                    
                    // 2. API call
                    // We DO NOT need to pass headers here (X-Country-Code, X-User-Type, Auth, etc.) 
                    // because they are automatically handled by the api.js Request Interceptor.
                    
                    const response = await api.get(endpoint);

                    // Assuming the response structure is { success: true, data: { items: [...], total: ... } }
                    return response.data.data; 

                } catch (error) {
                    // Error is caught here, but 401 errors are likely handled by api.js retry logic first.
                    const errorMessage = error.message || 'Error fetching deal list.';
                    console.error("Deal List API Error:", errorMessage, error);
                    throw new Error(errorMessage);
                }
            },
            // Configuration for smooth pagination
            staleTime: 1000 * 60, 
            cacheTime: 1000 * 60 * 5, 
            keepPreviousData: true, // Smooth UI transition during page changes
            refetchOnWindowFocus: false,
        });
    };
    // ------------------------------------
    
    // Combined Loading State
    const isLoading = isLoadingDealForm || manualLoading;

    return {
        dealFormData, // The main data to build the form UI
        isLoading,
        dealFormError,
        createNewDeal, // Function to submit the form
        getPageData, // Utility to extract pages from dealFormData
        useFetchDeals, // New hook to fetch the list of deals
        useDeleteDeal,
    };
}