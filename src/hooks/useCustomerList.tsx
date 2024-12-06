import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const fetchCustomerList = async (search: string) => {
    console.log(process.env)
  const response = await apiClient.get("/business/list/user", {
    // params: { search },

  });
  return response.data;
};

export const useCustomerList = (search: string) => {
  return useQuery({
    queryKey: ["search"],
    queryFn: async () => fetchCustomerList(search),
    enabled: !search,
  });
};
