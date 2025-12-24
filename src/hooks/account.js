import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";
import { useState ,Alert } from "react";

const PROFILE_ENDPOINT = "/api/v1/Profile";

export default function account() {
     const [isLoading, setIsLoading] = useState(false);
  // 🔵 GET PROFILE (with loader)
  const useAccount = (pageName = "InstituteProfile") => {
   

    const query = useQuery({
      queryKey: ["profile", pageName], // different pages → different cache
      queryFn: async () => {
        try {
          setIsLoading(true);

          // 🔥 Add PageName as query parameter
          const response = await api.get(
            `${PROFILE_ENDPOINT}?PageName=${pageName}`
          );

         // console.log("API RESPONSE:", response.data); // Logcat

          return response?.data?.data; // return API data
        } catch (error) {
          console.log("API ERROR:", error); // log error in Logcat

          const msg =
            error?.response?.data?.message ||
            error.message ||
            "Error fetching profile";

          throw new Error(msg);
        } finally {
          setIsLoading(false);
        }
      },
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });

    return { ...query, isLoading };
  };

// 🔵 UPDATE MAIN INFO (with custom loader)
  const useUpdateMainInfo = () => {

    const mutation = useMutation({
      mutationFn: async (formData) => {
        try {
        //  setIsLoading(true);

          let data = new FormData();

          data.append("InstituteName", formData.InstituteName);
          data.append("InstituteType", formData.InstituteType);
          data.append("EstablishmentYear", formData.EstablishmentYear);
          data.append("Description", formData.Description);

          if (formData.InstituteLogo) {
            data.append("InstituteLogo", {
              uri: formData.InstituteLogo.uri,
              type: formData.InstituteLogo.type,
              name: formData.InstituteLogo.fileName,
            });
          }
            console.log("FORM-DATA SENT:", data);
          const response = await api.post(
            `${PROFILE_ENDPOINT}/institute/main-info`,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        console.log("RESPONSEgjfgjfgjfgjfgj:", response.data);
          return response.data;
       
        } catch (error) {
          console.log("UPDATE API ERROR:", error);
          throw new Error(
            error?.response?.data?.message ||
              error.message ||
              "Error updating profile"
          );
        } finally {
          setIsLoading(false);
        }
      },
    });

    

    return { ...mutation, isLoading };
  };

  return {
    useAccount,
    useUpdateMainInfo,
  };
}
