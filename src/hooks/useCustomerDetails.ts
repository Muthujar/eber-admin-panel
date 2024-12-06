import { useQuery } from '@tanstack/react-query';
import apiClient from "../services/apiClient";

const fetchCustomerDetails = async (identifier: string) => {
  const response = await apiClient.get('/integration/user/show', {
    params: { email: identifier }, // or phone: identifier
  });
  return response.data;
};

// export const useCustomerDetail = (identifier: string) => {
//   return useQuery(['customerDetails', identifier], () => fetchCustomerDetails(identifier));
// };

export const useCustomerDetails = (identifier: string) => {
    return useQuery({
      queryKey: ["customerDetails"],
      queryFn: async () => fetchCustomerDetails(identifier),
    });
  };
  