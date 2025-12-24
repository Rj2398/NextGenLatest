import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";
import { useState } from "react";

const PROFILE_ENDPOINT = "/api/v1/Profile";

export default function useProfile() {
  // 🔵 GET PROFILE (with loader)
  const useFetchProfile = () => {
    const [isLoading, setIsLoading] = useState(false);

    const query = useQuery({
      queryKey: ["profile"],
      queryFn: async () => {
        try {
          setIsLoading(true); // start loader
          const response = await api.get(PROFILE_ENDPOINT);
          return response.data.data; // return API data
        } catch (error) {
          console.log("API ERROR:", error); // log error in Logcat
          const msg =
            error?.response?.data?.message ||
            error.message ||
            "Error fetching profile";
          throw new Error(msg); // let react-query handle error state
        } finally {
          setIsLoading(false); // stop loader
        }
      },
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });

    return { ...query, isLoading }; // return loader along with query
  };

  return {
    useFetchProfile,
  };
}
